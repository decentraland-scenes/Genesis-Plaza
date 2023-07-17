import * as ui from '@dcl/ui-scene-utils'
import { CONFIG, initConfig } from "src/config"
import { sharedClaimBgTexture } from "src/claiming-dropin/claiming/claimResources"
import { createDispeners } from "src/claiming-dropin/claiming/dispensers"
import { ClaimConfig, ClaimConfigInstType, initClaimConfig } from "src/claiming-dropin/claiming/loot-config"
import { campaignData, initCampaignData, initDispenserScheduler, startDispenserScheduler } from "src/claiming-dropin/claiming/schedule/scheduleSetup"
import { customResolveSourceImageSize } from "src/claiming-dropin/claiming/utils"
import { ClaimTokenResult, ClaimUI, HandleClaimTokenCallbacks } from "src/claiming-dropin/claiming/loot"
import { ClaimUiType, ItemData } from "src/claiming-dropin/claiming/claimTypes"
import { doClaim, IClaimProvider } from "src/claiming-dropin/claiming/defaultClaimProvider"
import { loot } from '../../clap-meter/loot'

 
initConfig()

//SETUP DISPENERS AND SCHEDULE

//make changes/add more if you want here, otherwise will use what is in there
//MAKE SURE YOUR KEY IS IN THERE
function extendCampaignData(){ 
  
  //fetch or otherwise modify if needed here
   

}
 

export function createClaimCallback(){
    const claimCallbacks:HandleClaimTokenCallbacks = {
        onOpenUI:(type:ClaimUiType,claimResult?:ClaimTokenResult)=>{
            log("on open",type,claimResult)
        },
        
        onAcknowledge:(type:ClaimUiType,claimResult?:ClaimTokenResult)=>{
            log("on ack",type,claimResult)
            if(claimResult && claimResult.success){
                const data: ItemData = claimResult.json.data[0]
    
                /*if(
                    testForPortableXP(data)
                    || (CONFIG.CLAIM_TESTING_ENABLED && testForWearable(data,WearableEnum.PANTS_ADDRESS))
                    ){
                    openTutorialPrompt()
                }*/
            }
        },
        onCloseUI:(type:ClaimUiType,claimResult?:ClaimTokenResult)=>{
            log("on close",type,claimResult)
    
            const hasClaimConfig = claimResult && claimResult.requestArgs && claimResult.requestArgs.claimConfig
            /*switch(type){
                case ClaimUiType.YOU_ALREADY_HAVE_IT:
                    if(
                        hasClaimConfig 
                        && ( claimResult?.requestArgs?.claimConfig?.refId == ClaimConfig.campaign.dcl_artweek_px.refId )
                        ){
                        openTutorialPrompt()
                    }
                break;
            }*/
        },
    
        onRetry:(type:ClaimUiType,claimResult?:ClaimTokenResult)=>{
            log("on retry",type,claimResult)
    
           
        }
        
        /*
        onRetry?:(type:ClaimUiType,claimResult?:ClaimTokenResult)=>{
            doClaim()
        }*/
    } 
    return claimCallbacks
}


export function initClaimProvider(claimProvider:IClaimProvider){
    log("initClaimProvider","ENTRY",claimProvider)
    
    if(claimProvider.claimCallbacks === undefined) claimProvider.claimCallbacks = createClaimCallback()
    claimProvider.claimUI = new ClaimUI(claimProvider.dispenserPos.claimUIConfig,claimProvider.dispenserPos.claimConfig)
    claimProvider.claimCallbacks.onRetry=(type:ClaimUiType,claimResult?:ClaimTokenResult)=>{
        log("on retry",type,claimResult)
        //reset values
        claimProvider.claimTokenResult = undefined

        doClaim(claimProvider,true)
    }
    //claimProvider.claimCallbacks = claimCallbacks
}

export function lookupDispenerPosByCampId(id:string){
    for(const d of CONFIG.DISPENSER_POSITIONS){
        if(d.name == id){
            return d 
        }
    }
    log("lookupDispenerPosByCampId","RETURN","FAILED TO FIND",id)
    return undefined
}

export function initDispenserPositions() {
    const camps: ClaimConfigInstType[] = [
        ClaimConfig.campaign.HAND //<=== YOUR SCENE ID HERE!!!!
    ]

    let x = 0
    for (const camp of camps) {
        //const camp = 
        CONFIG.DISPENSER_POSITIONS.push(
            {
                name: camp.refId, //clickable object
                model: CONFIG.CLAIM_TESTING_ENABLED ? 'entity' : 'entity', //'boxshape' : 'no-model' ,  //put model path when we have one
                entityModel: loot.entity,
                claimConfig: camp,
                claimData: { claimServer: ClaimConfig.rewardsServer, campaign: camp.campaign, campaign_key: camp.campaignKeys.key1 },
                dispenserUI: {
                    boothModel: 'src/claiming-dropin/models/poap/Wearable_Dispenser_WelcomeArea.glb', boothModelButton: 'src/claiming-dropin/models/poap/Wearable_Button_WelcomeArea.glb'
                    , hoverText: "Claim Wearable"
                },
                wearableUrnsToCheck: camp.wearableUrnsToCheck,
                claimUIConfig: { bgTexture: sharedClaimBgTexture, claimServer: ClaimConfig.rewardsServer, resolveSourceImageSize: customResolveSourceImageSize, customPromptStyle: ui.PromptStyles.DARKLARGE },
                transform: { position: Vector3.Zero() } //{position:store_config.dispenser.CYBER_LAVA_SUIT.transform.position ,rotation:Quaternion.Euler(0,0,0) }
            }
        )
        x++
    }
}


export function initSceneClaiming(){

  initClaimConfig()
  initCampaignData() 
  extendCampaignData()
  const dispenserScheduler = initDispenserScheduler()
  createDispeners(CONFIG.DISPENSER_POSITIONS, dispenserScheduler.campaignSchedule)
  startDispenserScheduler()

}
