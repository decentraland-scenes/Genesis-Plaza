import { Dispenser, idDispenser } from 'src/claiming-dropin/booth/dispenser';
import { Logger, LoggerFactory } from 'src/claiming-dropin/logging/logging';
import { dispenserInstRecord, dispenserRefIdInstRecord } from 'src/claiming-dropin/claiming/claimResources';
import { CampaignSchedule } from './claimSchedule';
import { CampaignDayType, ShowMatchRangeResult } from './types';
import { CONFIG } from 'src/config';


export let adminList = ["ADMIN_LIST_ADDRESS_1", "ADMIN_LIST_ADDRESS_2", "ADMIN_LIST_ADDRESS_3"]


export class ClaimSchedulerSystem implements ISystem{

  campaignSchedule:CampaignSchedule
  logger:Logger
  currentlyPlaying?:CampaignDayType

  intermissionStarted = false
  countdownStarted = false
  lastShowIdx = -1

  timeLapse = 0
  checkIntervalSeconds = 1

  enabled:boolean = true

  lastShowMatch:ShowMatchRangeResult = {} //cache to avoid creating new objects over and over 

  //day:any

  constructor(showSchedule:CampaignSchedule){
      //this.days= days 
      this.campaignSchedule = showSchedule
      //this.showsSorted = this.showMgr.showSchedule.shows//showData.shows.sort((a, b) => (a.startTime < b.startTime) ? -1 : 1);
      this.logger = LoggerFactory.getLogger("ClaimSchedulerSystem")
  }
  reset(){
    this.lastShowIdx = 0
    this.timeLapse = 0
  }
  pause(){
    this.enabled = false
  }
  play(){
    this.enabled = true
  }
  update(dt:number){
    //log("scheduler called")
    if(!this.enabled) return
    
    this.timeLapse += dt
    
    if(this.timeLapse < this.checkIntervalSeconds){
      return
    }
    this.timeLapse -= this.checkIntervalSeconds

    let activeCount = 0
    //FIND NEAREST SHOW THAT HAS NOT STARTED
    //FIND SHOW THAT STARTED
    //IF NO SHOWS NOT STARTED, END
    //IF NEAREST NOT ST
    //
 
    const date = new Date()
    
    const showMatch = this.lastShowMatch = this.campaignSchedule.findShowToPlayByDateInPlace( this.lastShowMatch, date,this.lastShowIdx )

    //log("showMatch",showMatch) 

    if(showMatch && showMatch.lastShow && showMatch.lastShow.show && showMatch.lastShow.index !== undefined){
      //update index for faster checking
      this.lastShowIdx = showMatch.lastShow.index
    }

    this.processShow(showMatch)
    
  }
  processShow(showMatch:ShowMatchRangeResult){
    const METHOD_NAME="processShow"
    if(!showMatch){
      return
    }
    if(showMatch.currentShow && showMatch.currentShow.show){
      ///this.started = true
      //this.intermissionStarted = false
      //this.countdownStarted = false

      if((!this.currentlyPlaying) || showMatch.currentShow.show.refId !== this.currentlyPlaying.refId){
        this.logger.info(METHOD_NAME,'starting show', showMatch)
        const showToPlay = showMatch.currentShow.show
        //const currentlyPlaying = this.showMgr.isCurrentlyPlaying(showToPlay)
        //if(!currentlyPlaying){
          this.startShow(showToPlay)
        //}else{
        //  this.logger.trace(METHOD_NAME,'did not play show, already playing or was null',this.currentlyPlaying,showToPlay)
        //}
      }else{
        //log('already running show', showMatch)
      } 
    }else{
      if(showMatch.nextShow && showMatch.nextShow.show){
        this.logger.trace(METHOD_NAME,'waiting till show start',showMatch)
          //this.intermissionStarted = true
          this.onNoShowToPlay(showMatch)
      }
 
      //this.showMgr.startCountdown(closestNotStartedShow.startTime)
      
    }
    
    if(showMatch === undefined || 
        ((showMatch.currentShow === undefined || showMatch.currentShow.show === undefined) && (showMatch.nextShow === undefined || showMatch.nextShow.show === undefined))){
      this.onOutOfShowsToPlay()
    }
  }
  startShow(showToPlay:CampaignDayType){
    const METHOD_NAME="startShow"
    //this.logger.trace(METHOD_NAME,'ENTRY',showToPlay)
    log(METHOD_NAME,'ENTRY',showToPlay)

    this.currentlyPlaying = showToPlay
    /*const currentlyPlaying = this.showMgr.isDefaultVideoPlaying()
    if(!currentlyPlaying){
      this.showMgr.playDefaultVideo()
    }else{
      this.logger.trace(METHOD_NAME,'did not play default show, already playing or was null',currentlyPlaying)
    }*/
    for(const p in showToPlay.campaigns){
      const camp = showToPlay.campaigns[p]
      const instArr = dispenserRefIdInstRecord[camp.refId]
      if(instArr){
        for(const p in instArr){
          const inst = instArr[p]
          log(METHOD_NAME,'found',camp.refId,"to update",camp,inst)
          inst.dispData.claimConfig.campaign = camp.campaignId
          inst.dispData.claimConfig.campaignKeys = {key1:camp.campaignKey}

          inst.dispData.claimData.campaign = camp.campaignId
          inst.dispData.claimData.campaign_key = camp.campaignKey 
          
          let onPointerDownObj:OnPointerDown|undefined
          if(idDispenser(inst.entity)){
            ///if(){
              onPointerDownObj = inst.entity.getOnPointerDown()
            //}
          }else if(inst.entity instanceof Entity){
            if(inst.entity.hasComponent(OnPointerDown)){
              onPointerDownObj = inst.entity.getComponent(OnPointerDown)
            }
          }
          if(onPointerDownObj !== undefined){
            if(CONFIG.CLAIM_TESTING_ENABLED){
              if(inst.dispData.dispenserUI !== undefined && inst.dispData.dispenserUI.hoverText){
                onPointerDownObj.hoverText = inst.dispData.dispenserUI.hoverText + "(" + showToPlay.refId +"!)"
              }else{
                onPointerDownObj.hoverText += "(" + showToPlay.refId +"!)"
              }
            }
            
          }
        }
      }else{
        this.logger.error(METHOD_NAME,'WARNING! could not find',camp.refId,"to update",camp)
      }
    }
  }

  onNoShowToPlay(showMatch:ShowMatchRangeResult){
    const METHOD_NAME="onNoShowToPlay"
    log(METHOD_NAME,'ENTRY',showMatch,this.lastShowMatch,this.lastShowIdx)
    /*const currentlyPlaying = this.showMgr.isDefaultVideoPlaying()
    if(!currentlyPlaying){
      this.showMgr.playDefaultVideo()
    }else{
      this.logger.trace(METHOD_NAME,'did not play default show, already playing or was null',currentlyPlaying)
    }*/
     
  }

  onOutOfShowsToPlay(){
    const METHOD_NAME="onOutOfShowsToPlay"
    log(METHOD_NAME,'ENTRY')
    log("no more days, stop system")
    engine.removeSystem(this)
    /*if(!this.intermissionStarted){
      this.intermissionStarted = true
      this.showMgr.playDefaultVideo()
    }*/
  }
}
