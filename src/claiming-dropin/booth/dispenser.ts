import * as utils from '@dcl/ecs-scene-utils'
import { ChallengeDataStatus, ClaimCodes, ClaimConfigCampaignType, ClaimTokenRequestArgs, ClaimUIConfig, ClaimUiType, DispenserClickableModel, DispenserUI, IDispenser } from 'src/claiming-dropin/claiming/claimTypes'
import { checkIfPlayerHasAnyWearableByUrn, ClaimTokenRequest, ClaimTokenResult, ClaimUI, HandleClaimTokenCallbacks } from 'src/claiming-dropin/claiming/loot'
import { TRANSPARENT_MATERIAL } from '../claiming/claimResources'
import { PlayCloseSound } from './sounds'

export const sceneMessageBus = new MessageBus()


const claimCallbacks:HandleClaimTokenCallbacks = {
  onOpenUI:(type:ClaimUiType,claimResult?:ClaimTokenResult)=>{
    log("on open",type,claimResult)
  },
  onAcknowledge:(type:ClaimUiType,claimResult?:ClaimTokenResult)=>{
    log("on ack",type,claimResult)
  },
  onCloseUI:(type:ClaimUiType,claimResult?:ClaimTokenResult)=>{
    log("on close",type,claimResult)
  }
}

const USE_ANIMATOR = false
 
export function idDispenser(ent: IDispenser | Dispenser | Entity): ent is Dispenser { //magic happens here
  const isDisp = (<Dispenser>ent).checkAlreadyClaimed !== undefined
  log("isDisp",isDisp) 
  return isDisp;
}

export class Dispenser extends Entity implements IDispenser {
  //eventUUID: string
  button:Entity
  item?:Entity
  collider?:Entity
  
  alreadyAttempted: boolean = false
  timeToClickable: number = 0
  claimData:ClaimTokenRequestArgs
  wearableUrnsToCheck:string[] = []
  claimUI:ClaimUI
  claimConfig?:ClaimConfigCampaignType
  lastClaimResult?:ClaimTokenResult
  clickModel?:DispenserClickableModel[]
  onPointerDown:OnPointerDown
  //UIdisplayName: string | null = null
  //serverURL: string

  /**
   *
   * @param {TranformConstructorArgs} transform position, rotation and scale of the booth
   *
   */
  constructor(
    name: string,
    transform: TranformConstructorArgs,
    claimData:ClaimTokenRequestArgs,
    dispenserUI:DispenserUI,
    wearableUrnsToCheck?:string[],
    claimUIConfig?:ClaimUIConfig,
    claimConfig?:ClaimConfigCampaignType
  ) {
    super(name)
 
    this.claimData = claimData
    if(wearableUrnsToCheck) this.wearableUrnsToCheck = wearableUrnsToCheck

    this.claimConfig = claimConfig
    this.claimUI = new ClaimUI(claimUIConfig,this.claimConfig)

    //poapServer: string,
    //eventUUID: string,
    //UIdisplayName?: string

    engine.addEntity(this)
    //this.serverURL = poapServer
    //this.eventUUID = eventUUID

    //this.addComponent(new GLTFShape('models/poap/POAP_dispenser.glb'))
    this.addComponent(new GLTFShape(dispenserUI.boothModel))
    this.addComponent(new Transform(transform))
    if(USE_ANIMATOR){
      const idleAnim = new AnimationState('Idle_POAP', { looping: true })
      this.addComponent(new Animator())
      this.getComponent(Animator).addClip(idleAnim)
      this.getComponent(Animator).addClip(
        new AnimationState('Action_POAP', { looping: false })
      )
      idleAnim.play()
    }

    this.clickModel = dispenserUI.clickModel

    const onPointerDown = this.onPointerDown = new OnPointerDown(
      (e) => {
        const claimUI = this.claimUI
        if(claimUI && claimUI.lastUI && claimUI.lastUI.background.visible){
          log("prevent clicking till modal closed claim") 
          return;   
        }
        if(this.button !== undefined && this.button.hasComponent(Animator)) this.button.getComponent(Animator).getClip('Button_Action').play() 
        //sceneMessageBus.emit('activatePoap', {})
        void this.makeTransaction()
      },
      { hoverText: dispenserUI.hoverText }
    ) 

    if(this.isClickable('booth')){
      this.addComponent(
        onPointerDown
      )
    }
    const button = this.button = new Entity()
    if(dispenserUI.boothModelButton !== undefined && dispenserUI.boothModelButton.length > 0){
      //button.addComponent(new GLTFShape('models/poap/POAP_button.glb'))
      button.addComponent(new GLTFShape(dispenserUI.boothModelButton))
      button.addComponent(new Animator())
      button
        .getComponent(Animator)
        .addClip(new AnimationState('Button_Action', { looping: false }))
      button.setParent(this)
      if(this.isClickable('button')){
        button.addComponent(
          onPointerDown
        )
      }
      engine.addEntity(button)
    }


    if(dispenserUI.boothModelItem !== undefined){
      const item = this.item = new Entity()
      //button.addComponent(new GLTFShape('models/poap/POAP_button.glb'))
      item.addComponent(new GLTFShape(dispenserUI.boothModelItem))
      //item.addComponent(new Animator())
      
      item.setParent(this)
      if(this.isClickable('item')){
        item.addComponent(
          onPointerDown
        )
      }
      engine.addEntity(item)
    }

    if(dispenserUI.boothCollider !== undefined){
      const collider = this.collider = new Entity()
      //button.addComponent(new GLTFShape('models/poap/POAP_button.glb'))
      if(dispenserUI.boothCollider == 'boxshape'){
        const box = new BoxShape()
        collider.addComponent(box)

        collider.addComponent(new Transform({
          position:new Vector3(0,2,0),
          scale: new Vector3(.75,1,.75)
        }))
        //TODO need way to internalized this to claim drop in
        //box.visible = false
        //box.withCollisions = true
        //collider.addComponent(RESOURCES.materials.transparent)
        collider.addComponent(TRANSPARENT_MATERIAL)
      }else{ 
        collider.addComponent(new GLTFShape(dispenserUI.boothCollider))
      }
      //item.addComponent(new Animator())
      
      collider.setParent(this)
      if(this.isClickable('collider')){
        collider.addComponent(
          onPointerDown
        )
      }
      engine.addEntity(collider)
    }

    //if (UIdisplayName) this.UIdisplayName = UIdisplayName

    sceneMessageBus.on('activateDispenser', () => {
      this.activate()
    })

    return this
  }
  isClickable(clickModel:DispenserClickableModel):boolean{
    const retval = (this.clickModel === undefined && clickModel == 'button')
      || (this.clickModel !== undefined && this.clickModel.indexOf(clickModel) > -1)

    return retval
  }
  getOnPointerDown():OnPointerDown{
    /*if(this.isClickable('item') && this.item !==undefined){
      return this.item?.getComponent(OnPointerDown)
    }else{
      return this.button.getComponent(OnPointerDown)
    }*/
    return this.onPointerDown
  }
  public activate(): void {
    let anim:Animator|undefined
    if(USE_ANIMATOR){
      anim = this.getComponent(Animator)

      anim.getClip('Action_POAP').play()
    }

    this.addComponentOrReplace(
      new utils.Delay(4000, () => {
        if(anim !== undefined){
          anim.getClip('Action_POAP').stop()

          anim.getClip('Idle_POAP').play()
        }
      })
    )
  }

  async checkAlreadyClaimed(){
    
    let hasWearable = false//this.alreadyAttempted

    if(!hasWearable && this.lastClaimResult && this.lastClaimResult.success){
      hasWearable = true
    }
    if(!hasWearable){
      hasWearable = await checkIfPlayerHasAnyWearableByUrn(this.wearableUrnsToCheck)
    }
    log("checkAlreadyClaimed","hasWearable",hasWearable,"this.alreadyAttempted",this.alreadyAttempted,"this.lastClaimResult",this.lastClaimResult)
    log("checkAlreadyClaimed","RETURN",hasWearable)
    return hasWearable
  }
  async makeTransaction() {    
    const claimReq = new ClaimTokenRequest( this.claimData )

    // already attempted
    if (this.alreadyAttempted) {
      //PlayCloseSound()
      
      const hasWearable = await this.checkAlreadyClaimed()
      log("makeTransaction.checkAlreadyClaimed",hasWearable)
      if(hasWearable){
        if(this.lastClaimResult && this.lastClaimResult.success){
          this.claimUI.openSuccessMsg(this.lastClaimResult,claimCallbacks)
        }else{
          const claimResult=new ClaimTokenResult()
          claimResult.requestArgs = this.claimData
          claimResult.claimCode = ClaimCodes.ALREADY_HAVE_IT
          this.claimUI.openYouHaveAlready( claimResult, claimCallbacks)
        }
      }else{
        //inprogress???
        const claimResult=new ClaimTokenResult()
        claimResult.requestArgs = this.claimData
        //FIXME, need a in progress message??
        claimResult.claimCode = ClaimCodes.CLAIM_IN_PROGRESS
        this.claimUI.openClaimInProgress() 
      }
      return
    } 

    this.alreadyAttempted = true
    
    try {
      if(claimReq.isCaptchaEnabled()){
        const captchaUUID = await claimReq.getCaptcha()
        if(captchaUUID === undefined){
          throw new Error("FAILED TO GET CAPTCHA")
        }
        claimReq.challenge = await this.claimUI.openCaptchaChallenge(claimReq.claimServer, captchaUUID)
        if(claimReq.challenge.status == ChallengeDataStatus.Canceled) return;
      }
      const claimResult = await claimReq.claimToken()
    
      this.lastClaimResult = claimResult

      log("claim result",claimResult.success)
      this.claimUI.handleClaimJson( claimResult,claimCallbacks )

      if (claimResult.success) {
        sceneMessageBus.emit('activateDispenser', {})
      } else {
        this.alreadyAttempted = false
      }
    } catch {
      this.alreadyAttempted = false
      log('error fetching from Reward server ', this.claimData.claimServer)
    }

    return
  }

}
 