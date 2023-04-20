import * as utils from '@dcl/ecs-scene-utils'
import { getUserData, UserData } from '@decentraland/Identity'
import { CONFIG } from 'src/config'
import { IntervalUtil } from 'src/utils/interval-util'
import { getAndSetUserDataIfNullNoWait, getUserDataFromLocal } from 'userData'


type SubscriptionType = {
  eventName: InputEventKind,
  button: ActionButton,
  fn?: any
  removeFn?: any
}

/**
 * detects if the scene has main focus and is fully active ready
 * by that we mean player is in the scene, scene is ready and loaded
 * player has provided at least 1 input key
 */

//workaround as input registration not working all the time?!?!
//so if player walks X amount count it
class PlayerWalkingSystem implements ISystem{

  activeSceneUtil:SceneActiveUtil
  lastKnownPos?:Vector3
  interval:IntervalUtil = new IntervalUtil(1000/10)

  constructor(activeSceneUtil:SceneActiveUtil){
    this.activeSceneUtil = activeSceneUtil;
  }
  update(dt: number): void {
    const playerCurrentPosition = Camera.instance.position
    if(this.lastKnownPos === undefined){
      this.lastKnownPos = playerCurrentPosition.clone()
    }else{
      if(!this.interval.update(dt)){
        return
      }
      if(!playerCurrentPosition.equalsWithEpsilon(this.lastKnownPos,1)){
        //log("PlayerWalkingSystem.moved")   
        this.activeSceneUtil.playerPositionChanged = true
        engine.removeSystem(this)
      }else{
        //log("PlayerWalkingSystem.did-not-move",this.lastKnownPos,playerCurrentPosition)
      }
    }
  }
}

export class SceneActiveUtil {

  sceneStartd = false
  sceneActiveCallback:(val:boolean)=>void
  sceneStartedCallback?:()=>void

  //if the player presses any buttens  this flag turns to true and stays true
  //informs the player is active and pressing buttons
  capturedUserInput = false
  //if the player position changes 1 time this flag turns to true and stays true
  //informs the player is most likely active
  //NOTE: this could be detected if player is on platform
  playerPositionChanged = false
  inScene = false

  callbacksToCleanUp: SubscriptionType[] = []

  constructor(
    sceneActiveCallback:(val:boolean)=>void,
    sceneStartedCallback?:()=>void
    ){
    this.sceneActiveCallback = sceneActiveCallback
    this.sceneStartedCallback = sceneStartedCallback
  }

  setSceneActive(val: boolean) {
    //log("startScene", val, "sceneStartd", this.sceneStartd)

    this.sceneActiveCallback(val)
    if (val) {
      if (!this.sceneStartd) {
        this.sceneStartd = true
        if(this.sceneStartedCallback) this.sceneStartedCallback()
      } else {
        //already started
      }
    }
  }

  init() {
    //START PLAY STOP VIDEO WHEN IN SCENE
    
         
    try{
      getAndSetUserDataIfNullNoWait()
      log("success getAndSetUserDataIfNullNoWait",getUserDataFromLocal())
    }catch(e){
      log("failed getAndSetUserDataIfNullNoWait",e)
      //error(e)
    }

    try{
      getUserData()
      log("success getAndSetUserDataIfNullNoWait.getUserData")
    }catch(e){ 
      log("failed getAndSetUserDataIfNullNoWait.getUserData",e)
      //error(e)
    }


    engine.addSystem(new PlayerWalkingSystem(this))


    //onEnterSceneObservable not triggered on spawn. using trigger
    const entityTrg = new Entity()
    engine.addEntity(entityTrg)
    entityTrg.addComponent(
      new Transform({ position: CONFIG.center.clone() })
    )
    entityTrg.addComponent(new utils.TriggerComponent(new utils.TriggerBoxShape(
      new Vector3(CONFIG.sizeX - 2, CONFIG.sizeY, CONFIG.sizeZ - 2)//,
      //CONFIG.center.clone()
    ), {
      onCameraEnter: () => {
        this.inScene = true
        if (entityTrg.alive) engine.removeEntity(entityTrg)
        utils.setTimeout(500, () => {
          log("player entered trigger. calling play", "this.inScene", this.inScene,"capturedUserInput",this.capturedUserInput,"playerPosMoved",this.playerPositionChanged)
          if (this.inScene) this.setSceneActive(true)
        })
      },
      enableDebug: CONFIG.DEBUG_ACTIVE_SCENE_TRIGGER_ENABLED
    }))


    //not triggered on spawn. consider trigger instead
    onEnterSceneObservable.add((player) => {
      log("capturedUserInput.player entered scene: ", player.userId,"capturedUserInput",this.capturedUserInput,"playerPosMoved",this.playerPositionChanged)
      //myVideoTexture.pause()
      const usrData = getUserDataFromLocal()
      if (usrData !== null && player.userId == usrData.userId) {
        this.inScene = true
        if (entityTrg.alive) engine.removeEntity(entityTrg)
        utils.setTimeout(500, () => {
          log("player entered scene. calling play", "this.inScene", this.inScene,this.capturedUserInput)
          if (this.inScene) this.setSceneActive(true)
          //this.registerInputListeners()//workaround, inputs not registered if outside scene when loaded?? only issue on hotswap?
        })
      } 
    })

    onLeaveSceneObservable.add((player) => {
      log("player left scene: ", player.userId)
      const usrData = getUserDataFromLocal()
      if (usrData !== null && player.userId == usrData.userId) {
        this.inScene = false
        utils.setTimeout(500, () => {
          log("player left scene pausing:",  "this.inScene", this.inScene)
          if (!this.inScene) this.setSceneActive(false)
        })
      }
    })

    //getting black screen on first load
    //reports playing but not. trying to play once reports loaded
    onSceneReadyObservable.add(() => {
      log("SCENE LOADED", "capturedUserInput", this.capturedUserInput)
      //now play when scene ready 

      //wait till player provides user input

      this.setSceneActive(true)
      utils.setTimeout(200, () => {
        log("scene load pausing:")
        if (!this.inScene) this.setSceneActive(false)
      })

    })
    //END PLAY STOP VIDEO WHEN IN SCENE


    //START BUTTON LISTENER WORKAROUND
    // Instance the input object
    this.registerInputListeners()

    //workaround to browser not playing video until user input
    //END BUTTON LISTENER WORKAROUND
  }
  registerInputListeners(){
    log("registerInputListeners")
    const input = Input.instance 
    
    const buttonsToSubscribeTo = [
      ActionButton.ANY, //does not work at all
      ActionButton.FORWARD, ActionButton.BACKWARD, ActionButton.LEFT, ActionButton.RIGHT,
      ActionButton.WALK, ActionButton.JUMP, ActionButton.ACTION_3, ActionButton.ACTION_4, ActionButton.ACTION_5,
      ActionButton.POINTER, //not consider action to play video
      ActionButton.PRIMARY, ActionButton.SECONDARY
    ]
    const buttonActionsToSubscribeTo: InputEventKind[] = ["BUTTON_DOWN", "BUTTON_UP"]
 

    for (const q in buttonActionsToSubscribeTo) {
      const btnAction = buttonActionsToSubscribeTo[q]
      for (const p in buttonsToSubscribeTo) {
        const btn = buttonsToSubscribeTo[p]

        const subFn = (e: LocalActionButtonEvent) => {
          log("scene input try to play:", "myVideoTexture.playing", "capturedUserInput", this.capturedUserInput, "this.inScene", this.inScene, e)

          this.capturedUserInput = true

          if (this.inScene) {
            log("input.playing video")
            this.setSceneActive(true)

            const callbacksToCleanUp = this.callbacksToCleanUp
            for (const p in callbacksToCleanUp) {
              const subscript = callbacksToCleanUp[p] 
              if (subscript.fn) {
                const rmFn = input.unsubscribe(btnAction, subscript.button, subscript.fn)
                //log("input.removed ",rmFn,subscript)  
              } else if (subscript.removeFn) {
                subscript.removeFn()
                //log("input.removed by removeFn ")  
              } else {
                //log("input.nothing to remove ")   
              }
            }
 
            const rmFn = input.unsubscribe(btnAction, btn, subFn)
            log("input.removed! ", rmFn)
          }
 

        } 
        log("capturedUserInput.subscribing")
        // button down event
        const oneTimeInputSub = input.subscribe(btnAction, btn, false, subFn)
        //comment out if do not want registering to list, if you want want each button subscription fired one time
        this.callbacksToCleanUp.push({ eventName: btnAction, button: btn, removeFn: oneTimeInputSub })
      }
    }
  }
}