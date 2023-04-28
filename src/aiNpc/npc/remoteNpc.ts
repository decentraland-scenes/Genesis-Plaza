import { KeepRotatingComponent } from '@dcl/ecs-scene-utils'
import * as npc from '@dcl/npc-scene-utils'
import { NpcAnimationNameDef, NpcAnimationNameType } from 'src/registry'
import { showInputOverlay } from './customNPCUI'

export class RemoteNpcConfig{
  /**
   * inworlds needs the resource name of the character
   */
  resourceName:string
  /**
   * id for internal scene usage, could be same as resource name
   */
  id?:string
}

export type QuestionData = {
  displayQuestion:string
  queryToAi:string
}


export type RemoteNpcThinkingOptions={
  enabled:boolean
  model?:GLTFShape
  modelScale?:Vector3
  modelOffset?:Vector3
  text?:string
  textScale?:Vector3
  textOffset?:Vector3
  offsetX?:number
  offsetY?:number
  offsetZ?:number
}
export type RemoteNpcOptions={
  loadingIcon?:{enable:boolean}//TODO USE THIS
  npcAnimations?:NpcAnimationNameType
  thinking?:RemoteNpcThinkingOptions
  onEndOfRemoteInteractionStream:()=>void
  onEndOfInteraction:()=>void
}
export class RemoteNpc{
  
  npc:npc.NPC 
  name?:string
  config:RemoteNpcConfig
  thinkingIconEnabled:boolean = false
  thinkingIconRoot:Entity
  thinkingIcon:Entity
  thinkingIconText:Entity
  npcAnimations:NpcAnimationNameType
  onEndOfRemoteInteractionStream:()=>void
  onEndOfInteraction:()=>void
  //collider:Entity 

  /**
   * 
   * @param config configuration needed for remote npc
   * @param npc normal configuration for NPC @see https://github.com/decentraland/decentraland-npc-utils
   * @param args additional configuration arts for remote npc intance
   */
  constructor( config:RemoteNpcConfig,npc:npc.NPC, args?:RemoteNpcOptions ){
    this.npc = npc
    this.config = config
    this.thinkingIconRoot = new Entity()
    this.thinkingIcon = new Entity()
    this.thinkingIconText = new Entity()

    this.npcAnimations = args.npcAnimations
    
    const defaultWaitingOffsetX = 0
    const defaultWaitingOffsetY = 2.3
    const defaultWaitingOffsetZ = 0
    const TEXT_HEIGHT = -1
  

    this.onEndOfRemoteInteractionStream = args.onEndOfRemoteInteractionStream
    this.onEndOfInteraction = args.onEndOfInteraction
    /*this.collider = new Entity()
    this.collider.setParent(this.npc)
    this.collider.addComponent(new Transform(
      {scale: new Vector3(2,2,2)}
    ))
    this.collider.addComponent(new BoxShape())*/

    this.thinkingIconEnabled = args.thinking !== undefined && args.thinking.enabled

    this.thinkingIconRoot.setParent(this.npc)
    this.thinkingIconRoot.addComponent(new Transform({
      position:new Vector3(
          args.thinking?.offsetX ? args.thinking?.offsetX  : defaultWaitingOffsetX
          ,args.thinking?.offsetY ? args.thinking?.offsetY  : defaultWaitingOffsetY 
          ,args.thinking?.offsetZ ? args.thinking?.offsetZ : defaultWaitingOffsetZ
        ),
      scale:new Vector3(.1,.1,.1)
    }))

    
    this.thinkingIcon.setParent(this.thinkingIconRoot)
    
    if(this.thinkingIconEnabled){
      this.thinkingIcon.addComponent(new Transform({
        position: args.thinking.modelOffset ? args.thinking.modelOffset : new Vector3( 0,0,0 ),
        scale: args.thinking.modelScale ? args.thinking.modelScale : new Vector3(1,1,1)
      }))

      if(args.thinking.model){
        this.thinkingIcon.addComponent(args.thinking.model)
        //this.thinkingIcon.addComponent(new KeepRotatingComponent(Quaternion.Euler(0,25,0)))
      }else{
        this.thinkingIcon.addComponent(new BoxShape())
        this.thinkingIcon.addComponent(new KeepRotatingComponent(Quaternion.Euler(0,25,0)))
      }
    }
  
    if(this.thinkingIconEnabled){
      const waitingText =new TextShape()
      waitingText.value = args.thinking.text ? args.thinking.text : "Thinking..."
      this.thinkingIconText.addComponent(waitingText)
    }
    this.thinkingIconText.setParent(this.thinkingIconRoot)
    
    this.thinkingIconText.addComponent(new Transform({
      position:args.thinking.textOffset ? args.thinking.textOffset : new Vector3( 0,TEXT_HEIGHT,0 ),
      scale: args.thinking.textScale ? args.thinking.textScale : new Vector3(1,1,1),
      rotation: Quaternion.Euler(0,180,0)
    }))
    //this.waitingIconText.addComponent(new KeepRotatingComponent(Quaternion.Euler(0,25,0)))

    this.reset() 
  }

  reset(){
    this.cancelThinking()
  }
  setName(name:string){
    this.name = name
    this.npc.name = name
  }
  goodbye(){
    log("NPC.goodbye","ENTRY",this.name)
    this.npc.handleWalkAway()
  }
  endInteraction(){
    log("NPC.endInteraction","ENTRY",this.name)
    this.npc.endInteraction()
    this.cancelThinking()
    if(this.onEndOfInteraction) this.onEndOfInteraction()
  }
  endOfRemoteInteractionStream() {
    log("NPC.endOfRemoteInteractionStream","ENTRY",this.name)
    if(this.onEndOfRemoteInteractionStream) this.onEndOfRemoteInteractionStream()
  }
  
  talk(script: npc.Dialog[], startIndex?: number | string, duration?: number){
    log("NPC.talk","ENTRY",this.name,script)
    //cancel wait bubble
    this.cancelThinking()
     
    //trigger this each time???
    const NO_LOOP = true
    if(this.npcAnimations.TALK) this.npc.playAnimation(this.npcAnimations.TALK.name, NO_LOOP,this.npcAnimations.TALK.duration)
    
    this.npc.talk(script, startIndex , duration)
  }
  cancelThinking(){
    log("NPC.cancelThinking","ENTRY",this.name)
    this.showThinking(false)
  }
  showThinking(val:boolean){
    if(val){
      if(this.thinkingIconEnabled){
        if(!this.thinkingIconRoot.alive) engine.addEntity(this.thinkingIconRoot)
        if(!this.thinkingIcon.alive) engine.addEntity(this.thinkingIcon)
        if(!this.thinkingIconText.alive) engine.addEntity(this.thinkingIconText)
      }
    }else{
      if(this.thinkingIconEnabled){
        if(this.thinkingIconRoot.alive) engine.removeEntity(this.thinkingIconRoot)
        if(this.thinkingIcon.alive) engine.removeEntity(this.thinkingIcon)
        if(this.thinkingIconText.alive) engine.removeEntity(this.thinkingIconText)
      }
    }
  }
  thinking(script: npc.Dialog[], startIndex?: number | string, duration?: number){
    log("NPC.thinking","ENTRY",this.name,script)
    this.showThinking(true)
    
    const NO_LOOP = true
    if(this.npcAnimations.THINKING) this.npc.playAnimation(this.npcAnimations.THINKING.name, NO_LOOP,this.npcAnimations.THINKING.duration)
    this.npc.talk(script, startIndex , duration)
  }
}