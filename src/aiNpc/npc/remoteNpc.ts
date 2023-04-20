import { KeepRotatingComponent } from '@dcl/ecs-scene-utils'
import * as npc from '@dcl/npc-scene-utils'
import { NpcAnimationNameDef, NpcAnimationNameType } from 'src/registry'

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
export type RemoteNpcOptions={
  loadingIcon?:{enable:boolean}//TODO USE THIS
  npcAnimations?:NpcAnimationNameType
  thinkingOffsetX?:number
  thinkingOffsetY?:number
  thinkingOffsetZ?:number
}
export class RemoteNpc{
  npc:npc.NPC 
  name?:string
  config:RemoteNpcConfig
  thinkingIconRoot:Entity
  thinkingIcon:Entity
  thinkingIconText:Entity
  npcAnimations:NpcAnimationNameType

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

    this.thinkingIconRoot.setParent(this.npc)
    this.thinkingIconRoot.addComponent(new Transform({
      position:new Vector3(
          args.thinkingOffsetX ? args.thinkingOffsetX  : defaultWaitingOffsetX
          ,args.thinkingOffsetY ? args.thinkingOffsetY  : defaultWaitingOffsetY 
          ,args.thinkingOffsetZ ? args.thinkingOffsetZ : defaultWaitingOffsetZ
        ),
      scale:new Vector3(.1,.1,.1)
    }))

    this.thinkingIcon.addComponent(new BoxShape())
    this.thinkingIcon.setParent(this.thinkingIconRoot)
    this.thinkingIcon.addComponent(new Transform({
      position:new Vector3(
          0,0,0
        ),
      scale:new Vector3(1,1,1)
    }))
    this.thinkingIcon.addComponent(new KeepRotatingComponent(Quaternion.Euler(0,25,0)))
  
    const waitingText =new TextShape()
    waitingText.value = "Thinking..."
    this.thinkingIconText.addComponent(waitingText)
    this.thinkingIconText.setParent(this.thinkingIconRoot)
    
    this.thinkingIconText.addComponent(new Transform({
      position:new Vector3(
          0,//args.thinkingOffsetX ? args.thinkingOffsetX  : defaultWaitingOffsetX
          TEXT_HEIGHT,//,args.thinkingOffsetY ? args.thinkingOffsetY - TEXT_HEIGHT : defaultWaitingOffsetY - TEXT_HEIGHT
          0),//,args.thinkingOffsetZ ? args.thinkingOffsetZ : defaultWaitingOffsetZ ),
      scale:new Vector3(1,1,1),
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
 
  endInteraction(){
    this.npc.endInteraction()
  }
  talk(script: npc.Dialog[], startIndex?: number | string, duration?: number){
    log("NPC.talk","ENTRY",this.name,script)
    //cancel wait bubble
    this.cancelThinking()
     
    //trigger this each time???
    if(this.npcAnimations.TALK) this.npc.playAnimation(this.npcAnimations.TALK.name, true)
    
    this.npc.talk(script, startIndex , duration)
  }
  cancelThinking(){
    log("NPC.cancelThinking","ENTRY",this.name)
    if(this.thinkingIconRoot.alive) engine.removeEntity(this.thinkingIconRoot)
    if(this.thinkingIcon.alive) engine.removeEntity(this.thinkingIcon)
    if(this.thinkingIconText.alive) engine.removeEntity(this.thinkingIconText)
  }
  thinking(script: npc.Dialog[], startIndex?: number | string, duration?: number){
    log("NPC.thinking","ENTRY",this.name,script)
    if(!this.thinkingIconRoot.alive) engine.addEntity(this.thinkingIconRoot)
    if(!this.thinkingIcon.alive) engine.addEntity(this.thinkingIcon)
    if(!this.thinkingIconText.alive) engine.addEntity(this.thinkingIconText)
    
    if(this.npcAnimations.THINKING) this.npc.playAnimation(this.npcAnimations.THINKING.name, true)
    this.npc.talk(script, startIndex , duration)
  }
}