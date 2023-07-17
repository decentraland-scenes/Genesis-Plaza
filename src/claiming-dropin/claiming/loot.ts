import * as ui from '@dcl/ui-scene-utils'
import * as utils from '@dcl/ecs-scene-utils'
import { signedFetch } from '@decentraland/SignedFetch'
import { ImageSection } from 'node_modules/@dcl/ui-scene-utils/dist/utils/types'
import resources,  { setSection } from 'src/dcl-scene-ui-workaround/resources'
import { custUiAtlas, dispenserInstRecord, dispenserRefIdInstRecord, dispenserSchedule, sharedClaimBgTexture } from 'src/claiming-dropin/claiming/claimResources'
import { CampaignSchedule } from 'src/claiming-dropin/claiming/schedule/claimSchedule'
import { CampaignDayType, ShowResultType } from 'src/claiming-dropin/claiming/schedule/types'
import { CaptchaResponse, ChainId, ChallengeData, ChallengeDataStatus, ClaimCodes, ClaimConfigCampaignType, ClaimState, ClaimTokenRequestArgs, ClaimUIConfig, ClaimUiType, ItemData, RewardData } from './claimTypes'
import { getAndSetUserData, getRealmDataFromLocal, getUserDataFromLocal,setRealm } from 'src/claiming-dropin/claiming/userData'
import { WearableEnum, WearableEnumInst } from './loot-config'
import { closeDialogSound, openDialogSound } from '../booth/sounds'
import { CONFIG } from 'src/config'
import { testForExpression, testForWearable } from './utils'
import { IClaimProvider, doClaim } from './defaultClaimProvider'
     
//let bgTexture = new Texture('images/claim/WearablePopUp.png')

export let ClaimMessageConfig={
  OK_PROMPT_BIGGER_THREASHOLD: 95,//4
  OUT_OF_STOCK: "We apologize for the inconvenience.  All items of this type have been claimed.\nThanks for playing!"
}

//export let claimJson: any = null



export type ClaimTokenOptions={
  
}

export type HandleClaimTokenCallbacks={
  onAcknowledge?: (type:ClaimUiType,claimResult:ClaimTokenResult) => void
  //onOK?: (type:string,options:any) => void
  onOpenUI?: (type:ClaimUiType,claimResult?:ClaimTokenResult) => void
  onCloseUI?: (type:ClaimUiType,claimResult?:ClaimTokenResult) => void
  onRetry?: (type:ClaimUiType,claimResult?:ClaimTokenResult) => void
}

/*
export type HandleUICallbacks={
  onOK?: (type:string,options:any) => void
  onOpenUI?: (type:string,options:any) => void
  onCloseUI?: (type:string,options:any) => void
}*/
export class ClaimTokenResult { 

  json: any
  success: boolean = false
  exception: any
  claimCode: any
  requestArgs?: ClaimTokenRequestArgs

  getClaimCode(): any {
    const claimJson = this.json
    if(this.claimCode && this.claimCode !== undefined){
      return this.claimCode
    }else if (claimJson !== null && claimJson !== undefined) {
      return claimJson.code
    } else {
      return 'unknown'
    }
  }

  isClaimJsonSuccess() {
    return _isClaimJsonSuccess(this.json)
  }
  isClaimJsonOutOfStock(){
    return _isOutOfStock(this.json)
  }
}
export class ClaimTokenRequest{
  claimServer: string
  campaign: string
  campaign_key: string
  claimResult:ClaimTokenResult
  claimConfig?: ClaimConfigCampaignType
  challenge?: ChallengeData
  
  constructor(args:ClaimTokenRequestArgs){
    this.claimServer = args.claimServer
    this.campaign = args.campaign
    this.campaign_key = args.campaign_key
    this.claimResult = new ClaimTokenResult()
    this.claimConfig = args.claimConfig
    this.challenge = args.challenge
  }

  onFetchError(err:any){
    this.claimResult.success = false
    this.claimResult.exception = err
    
    /*
    let p = new ui.OkPrompt(
      'An unexpected error occurred',
      () => {
        p.close()
        //   representation.vanish()
        PlayCloseSound()
      },
      'OK',
      true
    )*/
  }

  async validate(){
    let userData = getUserDataFromLocal()
    if (userData === undefined) {
      userData = await getAndSetUserData()
    }
    if (!getRealmDataFromLocal()) {
      await setRealm()
    }
  
    if (userData === undefined || userData === null || !userData.hasConnectedWeb3) {
      this.claimResult.success = false
      this.claimResult.claimCode = ClaimCodes.BENEFICIARY_WEB3_CONNECTED
 
      this.onMissingConnectedWeb3()

      return false;
    }

    return true;
  }

  onMissingConnectedWeb3(){
    /*
    PlayOpenSound()
      let p = new ui.OkPrompt(
        'You need an in-browser Ethereum wallet (eg: Metamask) to claim this item.',
        () => {
          p.close()
          // representation?.vanish()
          PlayCloseSound()
        },
        'OK',
        true
      )*/
  }

  isCaptchaEnabled(){
    return CONFIG.CLAIM_CAPTCHA_ENABLED
  }

  
  async getCaptcha(): Promise<CaptchaResponse|undefined> {
    const serverURL = ensureFormat(this.claimServer)

    const captchaUUIDQuery = await signedFetch(`https://${serverURL}/api/captcha`, {
      method: 'POST'
    })
    const json = captchaUUIDQuery && captchaUUIDQuery.text ? JSON.parse(captchaUUIDQuery.text) as CaptchaResponse : undefined
    return json //"botdetect3-captcha-ancientmosaic.jpg" //
  }


  async processResponse(response:any){
    log('Reward received resp: ', response)

    if (!response || !response.text) {
      throw new Error('Invalid response')
    }
    let json: RewardData = await JSON.parse(response.text) //SIGNED FETCH VERSION
    
    log('Reward received json: ', json)

    //json = {ok:true,data:[]}
    //log('Reward changed  json: ', json)

    this.claimResult.json = json
    
    this.claimResult.success = this.claimResult.isClaimJsonSuccess()

  }

  async claimToken() {
    const METHOD_NAME = "claimToken"
    const claimResult = this.claimResult = new ClaimTokenResult() 
    this.claimResult.requestArgs = {claimServer:this.claimServer,campaign:this.campaign,campaign_key:this.campaign_key}
    
    let userData = getUserDataFromLocal()
    if (userData === undefined) {
      userData = await getAndSetUserData()
    }
    
    let playerRealm = getRealmDataFromLocal()
    if (playerRealm === undefined) {
      
      await setRealm()
      
      playerRealm = getRealmDataFromLocal()
    }
    

    const isValid = await this.validate()
    if(!isValid){
      return this.claimResult 
    }
  
    const url = this.claimServer + '/api/campaigns/' + this.campaign + '/rewards'
    log(METHOD_NAME,'sending req to: ', url) 
  
    const hasCaptcha = this.challenge !== undefined
    let body = JSON.stringify({
      campaign_key: this.campaign_key,
      catalyst: playerRealm ? playerRealm.domain : "",
      beneficiary: userData ? userData.publicKey : "",
      captcha_id: hasCaptcha ? this.challenge?.challenge.data.id : undefined,
      captcha_value: hasCaptcha ? this.challenge?.answer : undefined,
    })
  
    try {
      let response = null
      log(METHOD_NAME,'signedFetch')
      response = await signedFetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body,
      })
      
      log(METHOD_NAME,'Reward received resp: ', response)
  
      this.processResponse(response)
    } catch (error) {
      log(METHOD_NAME,'error fetching from token server ', url)
  
      this.onFetchError(error)
      log(METHOD_NAME,"error",error)
  
    }
  
    return claimResult
  }
}


export async function checkIfPlayerHasAnyWearableByUrn(wearableUrnsToCheck:string[],force?:boolean) {
  const METHOD_NAME = "checkIfPlayerHasAnyWearableByUrn"
  const _force = force !== undefined && force == true
  log(METHOD_NAME,wearableUrnsToCheck,"_force",_force)
  if(!_force && !CONFIG.CLAIM_DO_HAS_WEARABLE_CHECK){
    log(METHOD_NAME,"CONFIG.CLAIM_DO_HAS_CHECK returned false",wearableUrnsToCheck,"force",_force)
    return false;
  }
  let userData = getUserDataFromLocal()
  if (userData === undefined) {
    userData = await getAndSetUserData()
  }
  if (!getRealmDataFromLocal()) {
    await setRealm()
  }
  if(!userData){
    log("checkIfPlayerHasAnyWearableByUrn failed, missing userData!!!",userData)
    return false
  }
  
  let hasWearable = false
 
  //must cal this to get ALL
  //https://docs.decentraland.org/development-guide/user-data/ docs was not working for me
  const url =
    'https://peer.decentraland.org/lambdas/collections/wearables-by-owner/' +
    //'https://peer.decentraland.org/lambdas/profile/' +
    userData.userId 
  try { 
    log(METHOD_NAME,"checkIfPlayerHasWearable calling " + url)
    let response = await fetch(url)
    let json = await response.json()
    log(METHOD_NAME,'checkIfPlayerHasWearable Player progression: ', response.status, json)
   
    main:
    for (const p in json) {
      for(const q in wearableUrnsToCheck){
        //log(METHOD_NAME,json[p].urn,'vs',wearableUrnsToCheck[q]) 
        if( json[p].urn === wearableUrnsToCheck[q]){
          hasWearable = true
          break main
        }
      }
    }
  } catch {
    log(METHOD_NAME,'checkProgression error fetching from token server ', url)
  }

  log(METHOD_NAME,'checkIfPlayerHasWearable.returning',hasWearable,"checked for ",wearableUrnsToCheck)
  return hasWearable
}

export async function claimTokenAndHandle(args:ClaimTokenRequestArgs):Promise<ClaimTokenResult>{
  let claimResult = await claimToken( 
    {claimServer: args.claimServer, campaign:args.campaign,campaign_key:args.campaign_key} 
  )
  const claimUI = new ClaimUI()
  claimUI.handleClaimJson(claimResult,
      {
      onOpenUI:(type:ClaimUiType,claimResult?:ClaimTokenResult)=>{
        log("on open",type)
      },
      onAcknowledge:(type:ClaimUiType,claimResult?:ClaimTokenResult)=>{
        log("on ack",type)
      },
      onCloseUI:(type:ClaimUiType,claimResult?:ClaimTokenResult)=>{
        log("on close",type,claimResult)
      }
    })
  return claimResult
}
export async function claimToken( args:ClaimTokenRequestArgs ):Promise<ClaimTokenResult>{
  const claimReq = new ClaimTokenRequest(args)
  
  await claimReq.claimToken()

  return claimReq.claimResult
}



function _isOutOfStock(json: any) {
  return json && json.ok && json.data && !json.data[0] && !json.error
}

function _isClaimJsonSuccess(json: any) {
  //log("_isClaimJsonSuccess " ,json)
  var retVal = false
  if (json && json.ok) {
    retVal = true
  }
  log('_isClaimJsonSuccess ' + retVal, json)
  return retVal
}
function hasRefId(show: ShowResultType,claimConfig?:ClaimConfigCampaignType){
  if(!show || show.show === undefined || !claimConfig){
    log("hasRefId was null",show,claimConfig)
    return false
  } 

  const showToPlay:CampaignDayType = show.show

  
  for(const p in showToPlay.campaigns){
    const camp = showToPlay.campaigns[p]
    const inst = dispenserRefIdInstRecord[camp.refId]
    if(inst !== undefined && inst.length > 0){//inst.dispData.name == claimConfig.refId){
      for(const p in inst){
        if(inst[p].dispData.name == claimConfig.refId){
          log("hasRefId was found",inst,claimConfig)
          return true
        }
      }
      
    }
  }
  log("hasRefId","not found",claimConfig)
  return false;
}
/**
 * 
 * @param json 
 * @param code - can ovveride what is in json
 * @param onCompleteCallback  
 */
function _handleClaimJson(claimResult:ClaimTokenResult,claimUI:ClaimUI, callbacks?:HandleClaimTokenCallbacks,claimConfig?:ClaimConfigCampaignType):ui.CustomPrompt|ui.OkPrompt|ui.OptionPrompt {
  const METHOD_NAME = "_handleClaimJson"
  const json=claimResult.json
  const overrideCode=claimResult.claimCode
  const error=claimResult.exception
  log(METHOD_NAME,"ENTRY",json,overrideCode,callbacks)

  let returnVal:ui.OkPrompt|ui.CustomPrompt|ui.OptionPrompt|undefined = undefined
  let p: ui.OkPrompt
 
/*
  claimResult.json.ok=false
  claimResult.success = false
  claimResult.claimCode = ClaimCodes.BENEFICIARY_NOT_CONNECTED
  claimResult.json.code = ClaimCodes.BENEFICIARY_NOT_CONNECTED
*/
  const showSchedule = dispenserSchedule

  claimUI.closeClaimInProgress()

  if (json && !json.ok) {
    PlayOpenSound()
    log(METHOD_NAME,'ERROR: ', json.code)
    let code = json.code
    if(overrideCode){
      code = overrideCode
    }
    let uiMsg = ''
    let allowRetry = false    
    let tryAgainInMsg = ""
    
    switch (code) {
      case ClaimCodes.BENEFICIARY_INVALID:
      case ClaimCodes.BENEFICIARY_NOT_CONNECTED:
      case ClaimCodes.BENEFICIARY_POSITION:
        returnVal = claimUI.openNotOnMap(claimResult,callbacks)
        break
      case ClaimCodes.CAMPAIGN_UNINITIATED://'campaign_uninitiated':
      case ClaimCodes.CAMPAIGN_KEY_UNINITIATED://'campaign_key_uninitiated':
        uiMsg = 'This campaign has not started yet.'
        tryAgainInMsg = "This campaign has not started.\nTry back in "
        break
      case ClaimCodes.CAMPAIGN_FINISHED://'campaign_finished':
      case ClaimCodes.CAMPAIGN_KEY_FINISHED://'campaign_key_finished':  
        uiMsg = 'This campaign is over.'
        tryAgainInMsg = "Temporarily of stock.\nNext batch will be available in \n"
        break
      case ClaimCodes.CAPTCHA_INVALID:
        uiMsg = 'We could not validate provided values.  Please try again.'
        allowRetry = true
        break
      default:
        //SHOW RETRY!
        allowRetry = true
        uiMsg = 'An unexpected error occurred: \n' + json.error
        break
    }

    if(showSchedule && tryAgainInMsg && tryAgainInMsg.length > 0){
      const date = new Date()
      
      const showMatch = showSchedule.findShowToPlayByDate( date )

      log("finished","showMatch",showMatch)
      //debugger
      if(showMatch.nextShow && hasRefId(showMatch.nextShow,claimConfig)){
        if(showMatch.nextShow.offset !== undefined){
          
          const min = showMatch.nextShow.offset/60
          const hours = showMatch.nextShow.offset/ (60*60)
          const minRounded = Math.ceil(min)
          let timeStr = minRounded + " minutes."
          if(hours >= 1){
            timeStr = hours.toFixed(1) + " hours."
          }
          uiMsg = tryAgainInMsg + timeStr
        }
      }
    }

    if(uiMsg.length > 0){
      returnVal = claimUI.openOKPrompt(uiMsg,ClaimUiType.ERROR,claimResult,callbacks,allowRetry)
    }
  }else if (_isOutOfStock(json)) {
    returnVal = claimUI.openOutOfStockPrompt(claimResult,callbacks)
  }else if (!json || !json.data[0]) {
    log(METHOD_NAME,'no rewards',overrideCode)
    let retry = false
    switch (overrideCode) {
      case ClaimCodes.BENEFICIARY_WEB3_CONNECTED:
        returnVal = claimUI.openRequiresWeb3(claimResult,callbacks)
        break
      case ClaimCodes.ALREADY_HAVE_IT:
          returnVal = claimUI.openYouHaveAlready(claimResult,callbacks)
          break
      default:
        let msg = 'An unexpected error occurred, please try again.'
        if(error && error.message){
          msg += '\n' + error.message
        }
        log(METHOD_NAME,'open error',msg,overrideCode)
        //SHOW RETRY
        returnVal = claimUI.openOKPrompt(msg,ClaimUiType.ERROR,claimResult,callbacks,retry)
      
        break 
    }
  } else {
    switch (json.data[0].status) {
      case ClaimState.ASSIGNED:
      case ClaimState.SENDING:
      case ClaimState.SUCCESS:
      case ClaimState.CONFIRMED:
        returnVal= claimUI.openClaimUI(claimResult, callbacks)
        break
      case ClaimState.REJECTED:
        log('player not on map')
        returnVal= claimUI.openNotOnMap(claimResult, callbacks)
        break
      default:
        //   openClaimUI(json.data[0], representation)
        returnVal = claimUI.openClaimUI(claimResult, callbacks)
        break
    }
  }

  if(!returnVal){
    throw Error("someting bad happened. returnVal should not be null:"+returnVal) 
  }

  return returnVal
}


const claimConfigDefaults:ClaimUIConfig = {
  bgTexture: sharedClaimBgTexture,//'src/claiming-dropin/images/claim/GenericWearablePopUp.png',
  //claimServer: /*TESTING ? */'https://rewards.decentraland.io' /*:  'https://rewards.decentraland.org'*/ //default is non prod to avoid accidents
  claimServer: /*TESTING ? */'https://rewards.decentraland.zone' /*:  'https://rewards.decentraland.org'*/ //default is non prod to avoid accidents
  ,resolveSourceImageSize:(data:ItemData)=>{return 512}
  ,customPromptStyle: ui.PromptStyles.LIGHTLARGE
}

class CaptchaChallengeWindow extends Entity{
  submitButton? : ui.CustomPromptButton;
  reloadButton? : ui.CustomPromptButton;
  noCaptchaLabel? : ui.CustomPromptText;
  expirationTimerLabel? : ui.CustomPromptText;
  captchaImage? : ui.CustomPromptIcon;

  timerEntity : Entity;

  delay: number = 120000;
  countdownMark : number = 15000;
  countdownStep : number = 1000;

  constructor(){
    super();
    this.timerEntity = new Entity();
    engine.addEntity(this.timerEntity);
  }

  startTimer() {
    this.delay = 120000;
    this.countdownMark = 15000;
    this.countdownStep = 1000;
    //let counter = this.countdownMark + this.countdownStep;
    let counter = this.countdownMark;

    engine.addEntity(this);
    this.addComponentOrReplace(new utils.Delay(this.delay, () => {
      this.expireCaptcha();
    }))
 
    this.timerEntity.addComponentOrReplace(new utils.Delay(this.delay - this.countdownMark, () => {
      if(this.expirationTimerLabel){
        this.expirationTimerLabel.show();
        this.expirationTimerLabel.text.value = "This Captcha will Expire in " + (this.countdownMark/1000).toString() + " seconds";
      }
      this.timerEntity.addComponentOrReplace(new utils.Interval(this.countdownStep, () => {
        counter -= this.countdownStep;
        if(this.expirationTimerLabel){
          this.expirationTimerLabel.text.value = "This Captcha will Expire in " + (counter/1000).toString() + " seconds";
        }
        if(counter <= 0){
          this.timerEntity.removeComponent(utils.Interval);
          this.expirationTimerLabel?.hide();
          return;
        }
      }))
    }))
  }

  stopTimer(){
    this.removeComponent(utils.Delay);
    engine.removeEntity(this);
  }

  expireCaptcha() : void{
    if(this.submitButton) this.submitButton.image.isPointerBlocker = false;
    //this.submitButton.label.value = "Captcha Expired";
    this.reloadButton?.show();
    this.noCaptchaLabel?.show();
    this.captchaImage?.hide();
    //---
    if(this.submitButton) setSection(this.submitButton.image, resources.buttons.roundSilver);
  }
}

export class ClaimUI {

  lastUI?: ui.CustomPrompt|ui.OkPrompt|ui.OptionPrompt
  claimUI?: ui.CustomPrompt//ui.CustomPrompt //see src/dcl-scene-ui-workaround/readme.md switch back to normal when fixed
  claimUIConfig:ClaimUIConfig = claimConfigDefaults
  claimConfig?:ClaimConfigCampaignType
  callbacks?:HandleClaimTokenCallbacks

  campaignSchedule?:CampaignSchedule

  claimInformedPending:boolean = false //to know if we showed claimInProgressUI already
  claimInProgressUI?:ui.OkPrompt = undefined;
  captchaWindow? : CaptchaChallengeWindow;//lazy loaded

  UI_SCALE_MULT = 0.7

  constructor(claimUIConfig?:ClaimUIConfig,claimConfig?:ClaimConfigCampaignType){
    log("ClaimUI.constructor",claimUIConfig)
    this.setClaimUIConfig(claimUIConfig)
    this.claimConfig = claimConfig
  }

  setClaimUIConfig(claimUIConfig?:ClaimUIConfig){
    if(claimUIConfig) this.claimUIConfig = claimUIConfig
  }
  handleClaimJson(claimResult:ClaimTokenResult,callbacks?:HandleClaimTokenCallbacks) {
    this.lastUI = _handleClaimJson(claimResult, this, callbacks,this.claimConfig)
  }

  nothingHere(claimResult?:ClaimTokenResult,_callbacks?:HandleClaimTokenCallbacks){
    const callbacks = _callbacks !== undefined ? _callbacks : this.callbacks
    let p = new ui.OkPrompt(
      'Nothing here.  Keep looking.',
      () => {
        p.close()
        if(callbacks && callbacks.onCloseUI) callbacks.onCloseUI(ClaimUiType.NOTHING_TO_CLAIM,claimResult)
      },
      'OK',
      this.getOKPromptUseDarkTheme()
    )
    this.applyCustomAtlas(p)
    this.lastUI = p
    return p
  }
  openClaimInProgress(claimResult?:ClaimTokenResult,_callbacks?:HandleClaimTokenCallbacks){
    const callbacks = _callbacks !== undefined ? _callbacks : this.callbacks
    let p:ui.OkPrompt


    if(this.claimInProgressUI !== null && this.claimInProgressUI !== undefined){
      if(this.claimInProgressUI.button.onClick){
        this.claimInProgressUI.button.onClick.callback = () => {
          if(callbacks && callbacks.onCloseUI) callbacks.onCloseUI(ClaimUiType.CLAIM_IN_PROGRESS,claimResult);
          this.closeClaimInProgress();
        };
      }
      this.claimInProgressUI.text.value = "Claim in progress";
      //this.lastUI = p
      return;
    }


    p = new ui.OkPrompt(
      'Claim in progress',
      () => {
        log("close",callbacks)
        if(callbacks && callbacks.onCloseUI) callbacks.onCloseUI(ClaimUiType.CLAIM_IN_PROGRESS,claimResult);
        this.closeClaimInProgress();
      },
      'OK',
      this.getOKPromptUseDarkTheme()
    )
    this.applyCustomAtlas(p)

    this.claimInProgressUI = p

    this.lastUI = p
  }
  closeClaimInProgress(claimResult?:ClaimTokenResult,_callbacks?:HandleClaimTokenCallbacks){
    if(this.claimInProgressUI !== undefined && this.claimInProgressUI !== null ){
      this.claimInProgressUI.hide()
      this.claimInProgressUI = undefined;
    }
  }
  openYouHaveAlready(claimResult?:ClaimTokenResult,_callbacks?:HandleClaimTokenCallbacks){
    const callbacks = _callbacks !== undefined ? _callbacks : this.callbacks
    let p = new ui.OkPrompt(
      'You already have this wearable.',
      () => {
        p.close()
        log("close",callbacks)
        if(callbacks && callbacks.onCloseUI) callbacks.onCloseUI(ClaimUiType.YOU_ALREADY_HAVE_IT,claimResult)
      },
      'OK',
      this.getOKPromptUseDarkTheme()
    )
    this.applyCustomAtlas(p)
    this.lastUI = p
    return p
  }

  openOutOfStockPrompt(claimResult:ClaimTokenResult, _callbacks?:HandleClaimTokenCallbacks){
    const callbacks = _callbacks !== undefined ? _callbacks : this.callbacks
    let msg = ClaimMessageConfig.OUT_OF_STOCK
    
    //const waitForNext = false
    //TODO CONSIDER LOGIC FOR COME BACK TOMRROW vs just out of stock
    if(this.campaignSchedule){
      const date = new Date()
      
      const showMatch = this.campaignSchedule.findShowToPlayByDate( date )
 
      log("openOutOfStockPrompt","showMatch",showMatch)

      if(showMatch.nextShow && hasRefId(showMatch.nextShow,this.claimConfig)){
        if(showMatch.nextShow.offset !== undefined){

          const min = showMatch.nextShow.offset/60
          const hours = showMatch.nextShow.offset/ (60*60)
          const minRounded = Math.ceil(min)
          let timeStr = minRounded + " minute."
          if(hours >= 1){
            timeStr = hours.toFixed(1) + " hours."
          }
          msg = "Temporarily of stock.\nNext batch will be available in \n" + timeStr
        }else{
          //known future time
          //The dispenser has no more wearables to give for today.  Come
          msg = "Temporarily of stock.\nPlease check back later."
        }
      }
    }

    const p = this.openOKPrompt(msg,ClaimUiType.OUT_OF_STOCK,claimResult,callbacks)
    this.lastUI = p

    return p
  }
  /* UI asking for captcha solution 
  must return ChallengeData because if UI refreshes the challenge
  need to update it
  */
  async openCaptchaChallenge(
    serverURL: string,
    captchaResponse: CaptchaResponse,
    claimProvider?: IClaimProvider,
  ): Promise<ChallengeData> {
    const METHOD_NAME = "openCaptchaChallenge"
    log(METHOD_NAME,"ENTRY",serverURL,captchaResponse)

    const captchaData = captchaResponse.data
    const hasCaptchaData = captchaData !== undefined
    
    return new Promise((resolve) => {
      const Y_ADJUST = 20
      const captchaUI = new ui.CustomPrompt(this.getCustomPromptStyle(), 600, 370 + Y_ADJUST)

      if(captchaUI && captchaUI.closeIcon.onClick){
        captchaUI.closeIcon.onClick.callback = () => {
          captchaUI.hide();
          resolve({challenge:{ok:false,data:captchaResponse.data},answer:undefined,status:ChallengeDataStatus.Canceled});
        };
      }

      captchaUI.addText(
        'Please complete this captcha',
        0,
        160 + Y_ADJUST,
        this.getCustomPromptFontColor(),
        24
      )

      let captchaFailedToLoadLabel = captchaUI.addText("Sorry, Captcha Image Expired!", 0, 70 + Y_ADJUST, Color4.Red(), 20);
      captchaFailedToLoadLabel.hide();

      let expirationTimerLabel = captchaUI.addText("Captcha Expires in X seconds", 0, 120 + Y_ADJUST, Color4.Red(), 20);
      expirationTimerLabel.hide();

      let reloadButton = captchaUI.addButton("Get a new one", 0, Y_ADJUST, () => {
          captchaUI.hide()
          this.captchaWindow?.stopTimer();
          resolve({challenge:{ok:false,data:captchaResponse.data},answer:undefined,status:ChallengeDataStatus.Canceled});

          const claimUI = claimProvider?.claimUI
          //help with message, know if out of stock or wait till next day
          //claimUI.campaignSchedule = dispenserSchedule
          log(METHOD_NAME,'get item clicked')
          if(claimUI && claimUI.lastUI && claimUI.lastUI.background.visible){
            //workaround, i think its the "in progress" modal, if this is visible
            //and since this is in a promise there is a delay closing it
            //the main method debounces and prevents opening again, so force closing it
            claimUI.lastUI.hide()
          }

          if(claimProvider && claimProvider.claimCallbacks && claimProvider.claimCallbacks.onRetry) claimProvider.claimCallbacks.onRetry(ClaimUiType.CAPTCHA_TIMEOUT)
      }, ui.ButtonStyles.ROUNDGOLD);

      reloadButton.hide();

      serverURL = ensureFormat(serverURL)

      if((hasCaptchaData && captchaData.image.indexOf("data")==0 )|| serverURL.indexOf("local")==0){
        serverURL = captchaData.image
      }
      const imgScale = 1.4
      let captchaImage = captchaUI.addIcon(
        serverURL,
        0,
        40+Y_ADJUST,
        captchaData.width !== undefined ? captchaData.width : 500,
        captchaData.height !== undefined ? captchaData.height :150,
        { sourceHeight: 0, sourceWidth: 0 }
      )
      captchaImage.image.width = hasCaptchaData && captchaData.width !== undefined ? captchaData.width *imgScale : captchaImage.image.width
      captchaImage.image.height = hasCaptchaData && captchaData.height !== undefined ? captchaData.height* imgScale : captchaImage.image.height

      if(!hasCaptchaData){
        //Show no captcha found
        captchaImage.hide();
        captchaFailedToLoadLabel.show();
        //Show Generate new captcha button
      }

      const errorText = captchaUI.addText(
        'Error MSg',
        0,
        -20 + Y_ADJUST,
        Color4.Red(),
        15
      )
      let captchaCodeAnswer = ''
      const inputBox = captchaUI.addTextBox(0, -100 + Y_ADJUST, '', (e) => {
        captchaCodeAnswer = e
      })
      errorText.hide()

      const helpText = captchaUI.addText(
        'Enter the BIG GREEN letters*',
        0,
        -45+Y_ADJUST,
        //Color4.Red(),
        new Color4(0.34901960784313724, 0.8274509803921568, 0.5450980392156862, 1),//
        15
      )
      //errorText.hide()

      //checks input min len etc, not correctness
      const validateChallengeValue = (val:string)=>{
        let valid = true
        const minLen = 2

        if(val === undefined || val.length ===0 || val === inputBox.fillInBox.placeholder){
          log(METHOD_NAME,"not valid, empty value:",val, "inputBox.fillInBox.placeholder",inputBox.fillInBox.placeholder)
          errorText.text.value = "Please provide a value."
          valid = false
        }
        if(val === undefined || val.length < minLen){
          log(METHOD_NAME,"not valid, too short",val,"min",minLen)
          errorText.text.value = "Value too short."
          valid = false
        }
        return valid
      }
      let submitButton = captchaUI.addButton(
        'Submit',
        100,
        -140,
        () => {
          const valid = validateChallengeValue(captchaCodeAnswer)
          log(METHOD_NAME,"captchaCodeAnswer",captchaCodeAnswer,"valid")
          if(valid){
            errorText.hide()
            helpText.show()
            captchaUI.hide()
            this.captchaWindow?.stopTimer();
            resolve({challenge:captchaResponse,answer:captchaCodeAnswer, status: ChallengeDataStatus.AnswerProvided})
          }else{
            errorText.show()
            //helpText.hide()
          }
        },
        ui.ButtonStyles.ROUNDGOLD
      )
      captchaUI.addButton(
        'Cancel',
        -100,
        -140,
        () => {
          captchaUI.hide()
          this.captchaWindow?.stopTimer();
          resolve({challenge:{ok:false,data:captchaData},answer:undefined,status:ChallengeDataStatus.Canceled});
        },
        ui.ButtonStyles.ROUNDBLACK
      )

      if(this.captchaWindow === null || this.captchaWindow === undefined){
        this.captchaWindow = new CaptchaChallengeWindow();
      }
      this.captchaWindow.submitButton = submitButton;
      this.captchaWindow.reloadButton = reloadButton;
      this.captchaWindow.noCaptchaLabel = captchaFailedToLoadLabel;
      this.captchaWindow.captchaImage = captchaImage;
      this.captchaWindow.expirationTimerLabel = expirationTimerLabel;

      this.captchaWindow.startTimer();
    })
  }
  openSuccessMsg(claimResult:ClaimTokenResult, callbacks?:HandleClaimTokenCallbacks){
    this.openClaimUI(claimResult,callbacks)
  }
  openNotOnMap(claimResult:ClaimTokenResult, callbacks?:HandleClaimTokenCallbacks){
    PlayOpenSound()
    const p = this.openOKPrompt('We can`t validate the authenticity of your request.  If you just arrived please wait a few moments and try again.',ClaimUiType.ERROR_NOT_ON_MAP,claimResult,callbacks)
    return p
  }
  openRequiresWeb3(claimResult:ClaimTokenResult, callbacks?:HandleClaimTokenCallbacks){
    const mmPrompt = new ui.CustomPrompt( this.getCustomPromptStyle() )
    this.applyCustomAtlas(mmPrompt)

      mmPrompt.addText(
        'A MetaMask Digital wallet\nis required to claim this token.',
        0,
        45,
        this.getCustomPromptFontColor(),
        20
      )
      mmPrompt.addButton(
        'GET MetaMask',
        -100,
        -100,
        () => {
          openExternalURL('https://metamask.io/')
        },
        ui.ButtonStyles.RED
      )
    
      mmPrompt.addButton(
        'Cancel'.toUpperCase(),
        100,
        -100,
        () => {
          PlayCloseSound()
          mmPrompt.hide()
          if(callbacks && callbacks.onCloseUI) callbacks.onCloseUI(ClaimUiType.REQUIRES_WEB3,claimResult)
        },
        ui.ButtonStyles.F
      )

      if(callbacks && callbacks.onOpenUI) callbacks.onOpenUI(ClaimUiType.REQUIRES_WEB3,claimResult)
      this.lastUI = mmPrompt

      return mmPrompt
  }

  getCustomPromptStyle(): ui.PromptStyles {
    return this.claimUIConfig.customPromptStyle ? this.claimUIConfig.customPromptStyle : ui.PromptStyles.DARKLARGE
  } 

  getCustomBGImageSection(): ImageSection {
    const style = this.getCustomPromptStyle()
    switch(style){
      case ui.PromptStyles.LIGHTLARGE: 
      case ui.PromptStyles.DARKLARGE: 
        return resources.backgrounds.promptLargeBackground
      default:
        return resources.backgrounds.promptBackground
    }
  }
  
  

  getCustomPromptFontColor(): Color4 {
    const style = this.getCustomPromptStyle()
    switch(style){
      case ui.PromptStyles.DARK: 
      case ui.PromptStyles.DARKLARGE: 
        //log("getCustomPromptFontColor",style,"WHITE")
        return Color4.White()  
      default:
        //log("getCustomPromptFontColor",style,"BLACK")
        return Color4.Black()
    }
  }

  getOKPromptUseDarkTheme(): boolean {
    const style = this.getCustomPromptStyle()
    switch(style){
      case ui.PromptStyles.DARK: 
      case ui.PromptStyles.DARKLARGE: 
        //log("getOKPromptUseDarkTheme",style,"true")
        return true
      default:
        //log("getOKPromptUseDarkTheme",style,"false")
        return false
    }
  }

  openOKPrompt(uiMsg:string,type:ClaimUiType,claimResult:ClaimTokenResult, callbacks?:HandleClaimTokenCallbacks,allowRetry?:boolean): ui.OkPrompt | ui.CustomPrompt | ui.OptionPrompt {
    PlayOpenSound()
    let result: ui.OkPrompt | ui.CustomPrompt | ui.OptionPrompt

    if(uiMsg.length > ClaimMessageConfig.OK_PROMPT_BIGGER_THREASHOLD){

      //agePrompt = new CustomPrompt(RESOURCES.textures.uiPromptsWaterMarked.src,agePromptDimsSource.sourceWidth*promptScale,agePromptDimsSource.sourceHeight*promptScale)
      //agePrompt.background.source = RESOURCES.textures.uiPromptsWaterMarked

      //const custUiTexture = new Texture('images/DispenserAtlas.png')
      const mmPrompt = new ui.CustomPrompt( this.getCustomPromptStyle() )
      this.applyCustomAtlas(mmPrompt)
      
      result = mmPrompt 
        
        let height = 300/2 + 10
        if(uiMsg.length > 200){
          height = 300/2 - 50
        }
        
        const uiText = mmPrompt.addText(
          uiMsg,
          0,
          height,
          this.getCustomPromptFontColor(),
          20
        )

        uiText.text.width=350
        uiText.text.height=300
        uiText.text.textWrapping=true
        uiText.text.vAlign = 'center' 
        uiText.text.hAlign = 'center' 

        if(allowRetry){
          mmPrompt.addButton(
            'OK',
            -100,
            -100,
            () => {
              mmPrompt.hide()
              //   representation.vanish()
              PlayCloseSound()
              if(callbacks && callbacks.onCloseUI) callbacks.onCloseUI(type,claimResult)
            },
            ui.ButtonStyles.E
          )
          mmPrompt.addButton(
            'Retry',
            100,
            -100,
            () => {
              mmPrompt.hide()
              //   representation.vanish()
              PlayCloseSound()
              if(callbacks && callbacks.onRetry) callbacks.onRetry(type,claimResult)
              //if(callbacks && callbacks.onCloseUI) callbacks.onCloseUI(type,claimResult)
            },
            ui.ButtonStyles.F
          )
        }else{
          mmPrompt.addButton(
            'OK',
            0,
            -100,
            () => {
              mmPrompt.hide()
              //   representation.vanish()
              PlayCloseSound()
              if(callbacks && callbacks.onCloseUI) callbacks.onCloseUI(type,claimResult)
            },
            ui.ButtonStyles.E
          )
        }
      
    }else{
        let p:ui.OkPrompt|ui.OptionPrompt
        if(!allowRetry){
          p = new ui.OkPrompt(
            uiMsg,
            () => {
              p.close()
              //   representation.vanish()
              PlayCloseSound()
              if(callbacks && callbacks.onCloseUI) callbacks.onCloseUI(type,claimResult)
            },
            'OK',
            this.getOKPromptUseDarkTheme()
          )
          p.text.color = this.getCustomPromptFontColor()
          this.applyCustomAtlas(p)
        }else{
          p = new ui.OptionPrompt(
            '',
            uiMsg,
            () => {//on accept
              log("OptionPrompt closing")
              p.close()
              //   representation.vanish()
              PlayCloseSound()
              if(callbacks && callbacks.onCloseUI) callbacks.onCloseUI(type,claimResult)
            },
            () => {//on reject
              p.close()
              log("OptionPrompt retrying",callbacks?.onRetry)
              //   representation.vanish()
              PlayCloseSound()
              if(callbacks && callbacks.onRetry) callbacks.onRetry(type,claimResult)
            },
            'Cancel',
            'Retry',
            this.getOKPromptUseDarkTheme()
          )
          p.text.color = this.getCustomPromptFontColor()
          this.applyCustomAtlas(p)
        }
      
      //p.background.width = 500

      result = p
    }
    if(callbacks && callbacks.onOpenUI) callbacks.onOpenUI(type,claimResult)
    this.lastUI = result
  
    return result
  
  }

  applyCustomAtlas(modal:ui.OkPrompt | ui.CustomPrompt | ui.OptionPrompt){
    if(custUiAtlas !== undefined){
      modal.background.source
      
      modal.background.source = custUiAtlas

      if( modal instanceof ui.CustomPrompt){
        modal.texture = custUiAtlas
      }

      if( modal instanceof ui.OptionPrompt){
        //modal.buttonE
        modal.buttonE.source = custUiAtlas
        modal.buttonF.source = custUiAtlas

        setSection( modal.buttonE, resources.buttons.buttonE )
        setSection( modal.buttonF, resources.buttons.buttonF )
      }
      if( modal instanceof ui.OkPrompt){
        modal.button.source = custUiAtlas
        setSection( modal.button, resources.buttons.buttonE )
      }
      
    }
    /*setSection(mmPrompt.background, this.getCustomBGImageSection())
      mmPrompt.background.source
      mmPrompt.texture = custUiTexture
      mmPrompt.background.source = custUiTexture*/
  }
  
  //data: ItemData,
  openClaimUI(claimResult:ClaimTokenResult, callbacks?:HandleClaimTokenCallbacks):ui.CustomPrompt {
    const data: ItemData = claimResult.json.data[0]
    PlayOpenSound()

    if (this.claimUI && this.claimUI.background.visible) {
      this.claimUI.hide()
    }

    const offsetY = 40
    const UI_SCALE_MULT = this.UI_SCALE_MULT
    const claimUI = this.claimUI = new ui.CustomPrompt(//new ui.CustomPrompt(
      ui.PromptStyles.LIGHTLARGE,
      640 * UI_SCALE_MULT,
      512 * UI_SCALE_MULT
    )
    //this.applyCustomAtlas(claimUI)
    //claimUI = new ui.CustomPrompt('images/WearablePopUp.png', 640, 512)
    
    if(callbacks && callbacks.onOpenUI) callbacks.onOpenUI(ClaimUiType.CLAIM_RESULT,claimResult)
    this.lastUI = claimUI
    
    if(this.claimUIConfig){
      let bgTexture = this.claimUIConfig.bgTextureInst
      if(!bgTexture && this.claimUIConfig.bgTexture){
        bgTexture = new Texture( this.claimUIConfig.bgTexture )
        this.claimUIConfig.bgTextureInst = bgTexture
      }

      claimUI.background.source = bgTexture
    }
 
    claimUI.background.sourceWidth = 640
    claimUI.background.sourceHeight = 512
    claimUI.background.sourceTop = 0
    claimUI.background.sourceLeft = 0
    claimUI.background.opacity = .98
    
    const fontColor = this.getCustomPromptFontColor()

    claimUI.addText(
      data.status == ClaimState.SUCCESS
        ? 'You now own this item!'
        : data.status == ClaimState.SENDING || ClaimState.CONFIRMED
        ? 'This item is on its way!'
        : 'This item will be sent to you soon!',
      0,
      (158+offsetY) * UI_SCALE_MULT,//188 * UI_SCALE_MULT,
      fontColor,
      34 * UI_SCALE_MULT
    )

    claimUI.addText(
      data.token,
      0,
      (118+offsetY) * UI_SCALE_MULT,
      fontColor,
      24 * UI_SCALE_MULT
    ) // wearable name

    let sourceSize = 512

    if( this.claimUIConfig.resolveSourceImageSize ) sourceSize = this.claimUIConfig.resolveSourceImageSize(data)
    
    //sourceSize = 1024
    ////get a diff backdrop black on black hard to see
    if(testForExpression(data)){
      const backDrop = claimUI.addIcon(
        'images/TutorialImages_template.png',
        0,
        0 * UI_SCALE_MULT,
        180 * UI_SCALE_MULT,
        180 * UI_SCALE_MULT,
        {
          sourceHeight: 256,
          sourceWidth: 256,
          sourceLeft: 0,
          sourceTop: 0,
        }
      )
      backDrop.image.opacity = .8
    }
    //setSection(backDrop.image,resources.backgrounds.NPCDialog)
    //https://peer-lb.decentraland.org/lambdas/collections/contents/urn:decentraland:matic:collections-v2:0x016a61feb6377239e34425b82e5c4b367e52457f:1/thumbnail
    //"https://peer-lb.decentraland.org/lambdas/collections/contents/urn:decentraland:matic:collections-v2:0x016a61feb6377239e34425b82e5c4b367e52457f:3/thumbnail"
    const wearalbeThumbnail = claimUI.addIcon(
      data.image,
      0,
      0 * UI_SCALE_MULT,
      180 * UI_SCALE_MULT,
      180 * UI_SCALE_MULT,
      {
        sourceHeight: sourceSize,
        sourceWidth: sourceSize,
        sourceLeft: 0,
        sourceTop: 0,
      }
    )

    wearalbeThumbnail.image.opacity = 1.1

    this.closeClaimInProgress();

    let okButton = claimUI.addButton(
      'OK',
      134 * UI_SCALE_MULT,
      -155 * UI_SCALE_MULT,
      () => {
        claimUI.hide()
        PlayCloseSound()
        claimUI.hide()
        if(callbacks && callbacks.onAcknowledge) callbacks.onAcknowledge(ClaimUiType.CLAIM_RESULT,claimResult)
        //   representation.openUi = false
      },
      ui.ButtonStyles.E
    )
    //   okButton.image.positionX = -100
    okButton.label.positionX = 30 * UI_SCALE_MULT
    okButton.image.width = 238 * UI_SCALE_MULT
    okButton.image.height = 64 * UI_SCALE_MULT
    if (okButton.icon) {
      okButton.icon.width = 36 * UI_SCALE_MULT
      okButton.icon.height = 36 * UI_SCALE_MULT
    }
    okButton.label.fontSize = 24 * UI_SCALE_MULT

    let txButton = claimUI.addButton(
      'Details'.toUpperCase(),
      -134 * UI_SCALE_MULT, 
      //-175 * UI_SCALE_MULT,
      -155 * UI_SCALE_MULT,
      () => {
        let baseUrl = this.claimUIConfig.claimServer
        if(claimResult && claimResult.requestArgs && claimResult.requestArgs.claimServer){
          baseUrl = claimResult.requestArgs.claimServer
        }
        openExternalURL(baseUrl + '/reward/?id=' + data.id)
      },
      ui.ButtonStyles.F
    )
    txButton.image.width = 238 * UI_SCALE_MULT
    txButton.image.height = 64 * UI_SCALE_MULT
    if (txButton.icon) {
      txButton.icon.width = 36 * UI_SCALE_MULT
      txButton.icon.height = 36 * UI_SCALE_MULT
    }
    txButton.label.fontSize = 24 * UI_SCALE_MULT
    txButton.label.positionX = 30 * UI_SCALE_MULT

    //using custom atlas for skinned buttons
    okButton.image.source = custUiAtlas
    if(okButton.icon) okButton.icon.source = custUiAtlas
    txButton.image.source = custUiAtlas
    if(txButton.icon) txButton.icon.source = custUiAtlas


    return claimUI
  }
}
export function openTxLink(chain_id: ChainId, transaction_hash: string) {
  switch (chain_id) {
    case ChainId.ETHEREUM_MAINNET:
      openExternalURL('https://etherscan.io/tx/' + transaction_hash)
      break
    case ChainId.ETHEREUM_ROPSTEN:
      openExternalURL('https://ropsten.etherscan.io/tx/' + transaction_hash)
      break
    case ChainId.MATIC_MAINNET:
      openExternalURL('https://polygonscan.com/tx/' + transaction_hash)
      break
    case ChainId.MATIC_MUMBAI:
      openExternalURL('https://mumbai.polygonscan.com/tx/' + transaction_hash)
      break
  }
}




export function PlayOpenSound() {
  openDialogSound.getComponent(AudioSource).playOnce()
}

export function PlayCloseSound() {
  closeDialogSound.getComponent(AudioSource).playOnce()
}



function ensureFormat(claimServer: string) {
  return claimServer.replace("https://","").replace("http://","")//remove the protocol as we add it back
}

