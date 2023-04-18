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
  waitingOffsetY?:number
}
export class RemoteNpc{
  npc:npc.NPC 
  name?:string
  config:RemoteNpcConfig
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
    this.thinkingIcon = new Entity()
    this.thinkingIconText = new Entity()

    this.npcAnimations = args.npcAnimations
    
    const defaultWaitingOffsetY = 2.3
    this.thinkingIcon.addComponent(new BoxShape())
    this.thinkingIcon.setParent(this.npc)
    this.thinkingIcon.addComponent(new Transform({
      position:new Vector3(0,args.waitingOffsetY ? args.waitingOffsetY : defaultWaitingOffsetY,0),
      scale:new Vector3(.1,.1,.1)
    }))
    this.thinkingIcon.addComponent(new KeepRotatingComponent(Quaternion.Euler(0,25,0)))
  
    const waitingText =new TextShape()
    waitingText.value = "Thinking..."
    this.thinkingIconText.addComponent(waitingText)
    this.thinkingIconText.setParent(this.npc)
    this.thinkingIconText.addComponent(new Transform({
      position:new Vector3(0,args.waitingOffsetY ? args.waitingOffsetY - .1 : defaultWaitingOffsetY - .1,0),
      scale:new Vector3(.1,.1,.1),
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
    log("NPC.talk",script)
    //cancel wait bubble
    this.cancelThinking()
    this.npc.talk(script, startIndex , duration)
  }
  cancelThinking(){
    if(this.thinkingIcon.alive) engine.removeEntity(this.thinkingIcon)
    if(this.thinkingIconText.alive) engine.removeEntity(this.thinkingIconText)
  }
  thinking(script: npc.Dialog[], startIndex?: number | string, duration?: number){
    if(!this.thinkingIcon.alive) engine.addEntity(this.thinkingIcon)
    if(!this.thinkingIconText.alive) engine.addEntity(this.thinkingIconText)
    
    this.npc.talk(script, startIndex , duration)
  }
}