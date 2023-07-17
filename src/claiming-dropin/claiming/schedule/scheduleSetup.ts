import { ClaimConfig } from "src/claiming-dropin/claiming/loot-config"
import { ClaimSchedulerSystem } from "./claimSchedulerSystem"
import { CampaignDataType, CampaignDayType } from "./types"
import { dispenserSchedule } from "src/claiming-dropin/claiming/claimResources"
import { CONFIG } from "src/config"


export let FAKING_LOCALLY: boolean = false
// Video to display as background while no show is playing
export const DEFAULT_VIDEO =
  'https://player.vimeo.com/external/637531989.m3u8?s=0a75c635933b3588464fcbee094839bf08f9c252'

// Video schedule     

//const sharedCampaignId = ClaimConfig.campaign.EMOTE.campaign

const defaultShow:CampaignDayType = {
  refId: "dayFallback",
  //"startTimeMS": 1661331600000,//just to make it happy
  startTime: -1, 
  length: 60 * 60 * 24, //full day in seconds
  campaigns:[
    //{ refId: ClaimConfig.campaign.TEST_STAGE1.refId, campaignId: ClaimConfig.campaign.TEST_STAGE1.campaign, campaignKey: ClaimConfig.campaign.TEST_STAGE1.campaignKeys.key1 },
    //{ refId: ClaimConfig.campaign.TEST_STAGE2.refId, campaignId: ClaimConfig.campaign.TEST_STAGE1.campaign, campaignKey: ClaimConfig.campaign.TEST_STAGE1.campaignKeys.key1 },
  ]
}
  
//showing how a show can be mid play, and show will skip to it correct starting point
const testStartTime = new Date(Date.now() + (5 *1000)).getTime() / 1000   
 
const testStartTime2 = new Date(Date.now() + ((5+10) *1000)).getTime() / 1000   
   
//const testStartTime3 = new Date(Date.now() + ((5+10+10) *1000)).getTime() / 1000   
 
//const startTimeStr = "2022-05-09T16:39:00-04:00"
//log("the.time.is",new Date(testStartTime).toLocaleString())

/**
 * artnet
 * burton
 * dcl_artweek
 * dcl_artweek_px
 */

const SECOND_IN_MILLIS = 1000

const full24HourDayInMilliseconds = CONFIG.CLAIM_DATE_TESTING_ENABLED ? SECOND_IN_MILLIS * 15  : SECOND_IN_MILLIS * 60 * 60 * 24 //
export const full24HourDayInSeconds = full24HourDayInMilliseconds / SECOND_IN_MILLIS
  
//06/11	06/12	06/13	06/14	06/15	06/16	06/17	06/18	06/19	06/20	06/21	06/22	06/23	06/24	06/25	06/26	06/27	06/28	06/29	06/30
 
//all start times set for first second of each day in milliseconds UTC
//from there we can shift forward or backwards
//was asked for 6PM UTC rollover which is 18 hours forward
export const offsetInSeconds = CONFIG.CLAIM_DATE_TESTING_ENABLED ? 1 : (60 * 60 * -6) // seconds * minutes * hours
  
const testingStartDate = new Date();
log("testingStartTimex",testingStartDate.toLocaleString(),testingStartDate.getTime()) 
//testingStartDate.setHours(0,0,0,0);  
const testintShiftTime = (-1 * full24HourDayInMilliseconds)
const testingStartTime = (testingStartDate.getTime() +  testintShiftTime) / SECOND_IN_MILLIS
      
log("testingStartTimey",testintShiftTime,testingStartTime,(testingStartDate.getTime() +  testintShiftTime),new Date(testingStartTime*SECOND_IN_MILLIS).toLocaleString())

//special value for when we start
export const startingDayOfMonth = 11 //the day of month we start
//06/11 - 06/11 == 1654905600
export const firstDayStartTime = CONFIG.CLAIM_DATE_TESTING_ENABLED ?  testingStartTime : 1654905600
   
log("firstDayStartTime",firstDayStartTime,new Date(firstDayStartTime*SECOND_IN_MILLIS).toLocaleString())
  

//06/11 is start day
export const officialStartDay = CONFIG.CLAIM_DATE_TESTING_ENABLED ?  testingStartTime : 1654905600 
//export const officialStartTime = 1654905600

function getStartTimeForDayInSeconds(day:number,startDay:number){
  return (((day-startDay ) ) * full24HourDayInSeconds)   + (officialStartDay)  + (offsetInSeconds)
}


const SHIFT = -1* 60*60*12 //shift backwards 12 hours

export const campaigns: CampaignDayType[] = [
  /*
  //START TEST DATA
  {  //
  refId: "scheduleRef.06.11",
  startTime: firstDayStartTime, 
  //startTimeMS: firstDayStartTime * 1000,
  length: (getStartTimeForDayInSeconds(12,startingDayOfMonth)-firstDayStartTime), //dynamic calculate this one
  campaigns:[
    { refId: ClaimConfig.campaign.TEST_STAGE1.refId, campaignId: sharedCampaignId, campaignKey: "mvfw.06.11" }
  ]
}, 
{ 
  refId: "scheduleRef.06.12",
  startTime: getStartTimeForDayInSeconds(12,startingDayOfMonth), 
  //startTimeMS: getStartTimeForDayInSeconds(12,startingDayOfMonth) * 1000, 
  length: full24HourDayInSeconds, 
  campaigns:[
    { refId: ClaimConfig.campaign.TEST_STAGE1.refId, campaignId: sharedCampaignId, campaignKey: "mvfw.06.12" }
  ]
},
{   
  refId: "scheduleRef.06.13",
  startTime: getStartTimeForDayInSeconds(13,startingDayOfMonth), 
  //startTimeMS:  getStartTimeForDayInSeconds(13,startingDayOfMonth) * 1000, 
  length: full24HourDayInSeconds, 
  campaigns:[
    { refId: ClaimConfig.campaign.TEST_STAGE1.refId, campaignId: sharedCampaignId, campaignKey: "mvfw.06.13" }
  ]
}
//END TEST DATA*
  


,
defaultShow*/
]


/*
//mass shifting times
for(const p in campaigns){
  campaigns[p].startTime += SHIFT
}
 */
  
log("CLAIM_SCHEDULE",campaigns)


export const campaignData: CampaignDataType = {
  defaultShow:defaultShow,
  shows: campaigns
}

export function initCampaignData(){

}

let claimSchedulerSystem:ClaimSchedulerSystem

export function initDispenserScheduler():ClaimSchedulerSystem{
  dispenserSchedule.setData( campaignData )

  claimSchedulerSystem = new ClaimSchedulerSystem(dispenserSchedule) 

  return claimSchedulerSystem
}
export function startDispenserScheduler(){
  log("startDispenserScheduler")
  if(!claimSchedulerSystem) throw new Error("claimSchedulerSystem not initialized yet!!!")
  engine.addSystem(claimSchedulerSystem) 
}
