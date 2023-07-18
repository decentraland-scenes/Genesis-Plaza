//import { TutorialModal } from "src/carousel"
//import { TutorialModal } from "src/claiming-dropin//carousel"
import { dispenserInstRecord, dispenserRefIdInstRecord, TRANSPARENT_MATERIAL } from "src/claiming-dropin/claiming/claimResources"
//import { RESOURCES } from "src/claiming-dropin/resources"
import { Dispenser } from "../booth/dispenser"
import { checkIfPlayerHasAnyWearableByUrn, ClaimTokenRequest, ClaimTokenResult, ClaimUI, HandleClaimTokenCallbacks } from "../claiming/loot"
import { ClaimConfig,  WearableEnum, WearableEnumInst } from "../claiming/loot-config"
import { ChainId, ChallengeDataStatus, ClaimCodes, ClaimDataInst, ClaimState, ClaimUiType, DispenserPos, ItemData } from "./claimTypes"
import { CampaignSchedule } from "./schedule/claimSchedule"
import { CONFIG } from "src/config"
import { testForPortableXP, testForWearable } from "./utils"
import { hand } from "../../hand-party/hand"



/*
doki
mastercard
dcl_wearables - metaverse_pride_2021
thalia
original_penguin  
gm_studios
teleperformance
*/



const boxShape = new BoxShape()
boxShape.isPointerBlocker = true
boxShape.withCollisions = false
 
const dispHeight = .5
const dispZ = 45.5
/*
const tutorialPrompt = new TutorialModal()
tutorialPrompt.init()
tutorialPrompt.hide()*/

function openTutorialPrompt(){
    //tutorialPrompt.show()
}
 
//MOVED TO src/config.ts
/*
const dispenserPositions:DispenserPos[] = [
    {    
        name:"dcl_artweek_px", //clickable object
        model: 'boxshape' ,  //put model path when we have one 
        claimConfig: ClaimConfig.campaign.dcl_artweek_px,
        claimData:{claimServer: ClaimConfig.rewardsServer , campaign:ClaimConfig.campaign.dcl_artweek_px.campaign,campaign_key:ClaimConfig.campaign.dcl_artweek_px.campaignKeys.key1},
        dispenserUI:{
            boothModel:'models/poap/POAP_dispenser.glb',boothModelButton:'models/poap/POAP_button.glb'
            ,hoverText:"Claim Audio Guide" }, 
        wearableUrnsToCheck: ClaimConfig.campaign.dcl_artweek_px.wearableUrnsToCheck,
        claimUIConfig: {bgTexture:teleperformanceBG,claimServer:ClaimConfig.rewardsServer,resolveSourceImageSize:customResolveSourceImageSize},
        transform: {position: new Vector3(14.95+.2,2.3,dispZ-.2),scale:new Vector3(1.2,1.2,1.2)  ,rotation:Quaternion.Euler(0,135,0) }
    }, 
    {   
        name:"dcl_artweek", //clickable object
        model: 'dispenser' ,  //put model path when we have one
        claimConfig: ClaimConfig.campaign.dcl_artweek,
        claimData:{claimServer: ClaimConfig.rewardsServer , campaign:ClaimConfig.campaign.dcl_artweek.campaign,campaign_key:ClaimConfig.campaign.dcl_artweek.campaignKeys.key1},
        dispenserUI:{
            boothModel:'models/poap/Wearable_Dispenser_WelcomeArea.glb',boothModelButton:'models/poap/Wearable_Button_WelcomeArea.glb'
            ,hoverText:"Claim Wearable" }, 
        wearableUrnsToCheck: ClaimConfig.campaign.dcl_artweek.wearableUrnsToCheck,
        claimUIConfig: {bgTexture:teleperformanceBG,claimServer:ClaimConfig.rewardsServer,resolveSourceImageSize:customResolveSourceImageSize},
        transform: {position: new Vector3(49.3,dispHeight,dispZ) ,rotation:Quaternion.Euler(0,225,0) }
    }, 
] */

  

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
    }
} 

function storeInst(inst:ClaimDataInst){
    dispenserInstRecord[inst.dispData.name] = inst
    if(dispenserRefIdInstRecord[inst.dispData.claimConfig.refId] === undefined){
        dispenserRefIdInstRecord[inst.dispData.claimConfig.refId] = []
    }
    dispenserRefIdInstRecord[inst.dispData.claimConfig.refId].push(inst)
}

function makeImage(urn?: string): string {
    let retVal = "" 
    //if(play5games !== undefined && play5games.claimConfig.wearableUrnsToCheck.length > 0){
    //  let urn = play5games.claimConfig.wearableUrnsToCheck[0]
    //TODO check for null and use defualt? will make 404 image good enough??
      retVal = "https://peer-lb.decentraland.org/lambdas/collections/contents/"+urn+"/thumbnail"
    //}
    log("makeImage",retVal)
    return retVal
  }

function createDummyResponse(wearable:WearableEnumInst):any{
    return {
        ok:true,
        data:[{
            id: "",
            user: "",
            campaign_id: "",
            status: ClaimState.SUCCESS,
            transaction_hash: "",
            transaction_id: "",
            token: wearable.name,
            value: "",
            created_at: "",
            updated_at: "",
            from_referral: null,
            block_number: null,
            claim_id:  null,
            target: "",
            payload:  null,
            expires_at:  null,
            signature:  null,
            airdrop_type: "",
            group:  null,
            priority: "",
            campaign_key: "",
            assigned_at: "",
            image: makeImage(wearable.urn),
            chain_id: ChainId.ETHEREUM_MAINNET
            }
        ]
    }
}


export function createDispeners(dispenserPositions:DispenserPos[],dispenserSchedule?:CampaignSchedule){
    const METHOD_NAME = "createDispeners" 
    log(METHOD_NAME,"ENTRY",dispenserPositions)
    let lastClaimResult:ClaimTokenResult
    
    if(CONFIG.CLAIM_TESTING_ENABLED){
        const claimUIDefault = new ClaimUI( )
      
        //help with message, know if out of stock or wait till next day
        claimUIDefault.campaignSchedule = dispenserSchedule

        const claimUI = claimUIDefault

        const outOfStockObjTest = new Entity("out-of-stock-test")
        engine.addEntity(outOfStockObjTest)
        outOfStockObjTest.addComponent(new Transform({position:new Vector3( 1,1,1 )}))
        outOfStockObjTest.addComponent(new BoxShape())
        outOfStockObjTest.addComponent(new OnPointerDown( async ()=>{
                    if(claimUI && claimUI.lastUI && claimUI.lastUI.background.visible){
                        log("prevent clicking till modal closed claim")    
                        return;
                    }
                    log("doing ",outOfStockObjTest.name)
                    //show example of working directly with ClaimTokenRequest 

                    const testClaimTokenResult:ClaimTokenResult= new ClaimTokenResult()
                    testClaimTokenResult.claimCode=ClaimCodes.CLAIM_IN_PROGRESS,
                    testClaimTokenResult.json= createDummyResponse( WearableEnum.HAND_WEARABLE ), //any valid id for testing is OK
                    testClaimTokenResult.success= true,
                    testClaimTokenResult.exception= undefined

                    claimUI.handleClaimJson(testClaimTokenResult)

                    claimUI.openOutOfStockPrompt(new ClaimTokenResult(),claimCallbacks)

                    const fakeTestResult:ClaimTokenResult = new ClaimTokenResult()

                    claimUI.nothingHere()
                    claimUI.openYouHaveAlready()
                    claimUI.openClaimInProgress()
                    claimUI.openRequiresWeb3(new ClaimTokenResult(),claimCallbacks)
                    claimUI.openNotOnMap(new ClaimTokenResult(),claimCallbacks)
                    claimUI.openOKPrompt("example error short",ClaimUiType.ERROR,fakeTestResult,claimCallbacks)
                    claimUI.openOKPrompt("example error short with retry",ClaimUiType.ERROR,fakeTestResult,claimCallbacks,true)

                    claimUI.openOKPrompt("example error longerror longerror longerror longerror longerror longerror "+
                        "\nlongerror longerror longerror longerror longerror longerror longerror longerror longerror longerror longerror longerror long",ClaimUiType.ERROR,fakeTestResult,claimCallbacks)
                    claimUI.openOKPrompt("example error with retry longerror longerror longerror longerror longerror "+
                        "\nlongerror longerror longerror longerror longerror longerror longerror longerror longerror longerror longerror longerror with retry",ClaimUiType.ERROR,fakeTestResult,claimCallbacks,true)
                        //url just happens to match my pattern i need https://captcha.com/images/captcha/botdetect3-captcha-ancientmosaic.jpg
                    claimUI.openCaptchaChallenge("http://hello", 
                        //"src/claiming-dropin/images/example-botdetect3-captcha-ancientmosaic.jpeg"
                        {   ok:true,
                            data: {height:100,width:300,id:"000-00-00",
                                image:"data:image/png;base64,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"
                            }
                        }
                        ) 
                },{hoverText: "test all claim UIs"})
            )
            /*
                        const tutorialTest = new Entity("tutorial-test")
                    engine.addEntity(tutorialTest)
                    tutorialTest.addComponent(new Transform({position:new Vector3(4,1,15)}))
                    tutorialTest.addComponent(new BoxShape())
                    tutorialTest.addComponent(new OnPointerDown( async ()=>{
                                if(claimUI && claimUI.lastUI && claimUI.lastUI.background.visible){
                                    log("prevent clicking till modal closed claim")    
                                    return;
                                }
                                log("doing ",tutorialTest.name)
                                //show example of working directly with ClaimTokenRequest 

                                openTutorialPrompt()
                            },{hoverText: "tutorial-test"})
                        )
            */

    }
    
    //TODO MUST PLACE OR MAKE CLICKABLE THE gm_studios object

    //const dispenserPositions = CONFIG.DISPENSER_POSITIONS
     
    for(const p  in dispenserPositions){
        const h = dispenserPositions[p]
        
        if(CONFIG.CLAIM_TESTING_ENABLED){
            h.dispenserUI.hoverText += " ("+h.name+")"
        }
        
        //START BOOTHS
        log(METHOD_NAME,"create dispesner ",h.name,h.model,h.transform)
        if(h.model == "dispenser"){
            const booth = new Dispenser(
            h.name,
            h.transform,
            h.claimData,
            h.dispenserUI,
            h.wearableUrnsToCheck,
            h.claimUIConfig//_Background_Dispenser
            ,h.claimConfig
            ) 

            //help with message, know if out of stock or wait till next day
            booth.claimUI.campaignSchedule = dispenserSchedule

            storeInst({ dispData:h,entity:booth })
        }else if(h.model == "parachute"){  
            log(METHOD_NAME,"MODEL TYPE IS parachute crate not creating now")
        }else if(h.model == "no-model"){  
            log(METHOD_NAME,"MODEL TYPE IS no-model not creating now")
        }else{

            const claimUI = new ClaimUI(h.claimUIConfig,h.claimConfig)
            //help with message, know if out of stock or wait till next day
            claimUI.campaignSchedule = dispenserSchedule

            let objectDispenser = new Entity(h.name)
            engine.addEntity(objectDispenser)

            objectDispenser.addComponent(new Transform(h.transform))
            if (h.model == "boxshape") {
                objectDispenser.addComponent(new BoxShape())
            } else if (h.model instanceof GLTFShape) {
                log("adding cliamable", h.name, h.model.src)
                objectDispenser.addComponent(h.model)
            } else if (h.model instanceof Shape) {
                log("adding cliamable", h.name)
                objectDispenser.addComponent(h.model)
            } else if (h.model == "entity" && h.entityModel) {
                log("adding entity", h.name, h.entityModel.name)
                objectDispenser = h.entityModel
            } else {
                objectDispenser.addComponent(new GLTFShape(h.model))
            }

            storeInst({ dispData: h, entity: objectDispenser })
            //objectDispenser.addComponent(TRANSPARENT_MATERIAL)

            const claimFlow = async ()=>{
                if(claimUI && claimUI.lastUI && claimUI.lastUI.background.visible){
                    log("prevent clicking till modal closed claim")    
                    return;
                }
                
                log("doing " , h.name,claimUI)
                //show example of working directly with ClaimTokenRequest 

                const hasWearable = claimUI.claimConfig?.wearableUrnsToCheck !== undefined ? await checkIfPlayerHasAnyWearableByUrn(
                    //ClaimConfig.campaign.dcl_artweek_px.wearableUrnsToCheck
                    claimUI.claimConfig?.wearableUrnsToCheck
                    //ClaimConfig.campaign.mvfw.wearableUrnsToCheck
                    ) : false
                    
                if(hasWearable){
                    const claimResult=new ClaimTokenResult()
                    claimResult.requestArgs = {...h.claimData}
                    claimResult.requestArgs.claimConfig = h.claimConfig
                    
                    claimUI.openYouHaveAlready(claimResult,claimCallbacks)
                }else{
                    const claimReq = new ClaimTokenRequest( h.claimData )
            
                    if(claimReq.isCaptchaEnabled()){
                        const captchaUUID = await claimReq.getCaptcha() //fetches capcha image
                        if(captchaUUID ===undefined){
                            throw new Error("claimReq.getCaptcha() FAILED TO RETURN VALUE")
                        }
                        claimReq.challenge = await claimUI.openCaptchaChallenge(claimReq.claimServer, captchaUUID)
                        if(claimReq.challenge.status == ChallengeDataStatus.Canceled) return;
                    }
                    const claimResult = await claimReq.claimToken()

                    log("claim result",claimResult.success)

                    claimUI.setClaimUIConfig( h.claimUIConfig )

                    claimUI.handleClaimJson(claimResult, claimCallbacks)

                    if (claimResult.success) {
                        objectDispenser.getComponent(GLTFShape).visible = false
                        hand.handAppear()
                    }
                }
            }

            claimCallbacks.onRetry=(type:ClaimUiType,claimResult?:ClaimTokenResult)=>{
                log("on retry",type,claimResult)
                //reset values
                
                claimFlow()
            }

            objectDispenser.addComponent(
                new OnPointerDown(claimFlow, {
                    hoverText: h.dispenserUI.hoverText
                }
            ))

        }


        //END BOOTHS
    }
}

