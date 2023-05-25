import { NPC } from "@dcl/npc-scene-utils"

import { Dialog } from '@dcl/npc-scene-utils'
import { Room } from "colyseus.js"
import { RemoteNpc } from "./aiNpc/npc/remoteNpc"

import { LobbyScene } from "./aiNpc/lobby-scene/lobbyScene"


export type NpcAnimationNameDef = {
  name:string
  duration:number
  autoStart?:boolean
}
export type NpcAnimationNameType = {
  HI?: NpcAnimationNameDef
  IDLE: NpcAnimationNameDef
  WALK?: NpcAnimationNameDef
  RUN?: NpcAnimationNameDef
  THINKING?: NpcAnimationNameDef
  TALK?: NpcAnimationNameDef
  TALKING?: NpcAnimationNameDef
  LOADING?: NpcAnimationNameDef
  LAUGH?: NpcAnimationNameDef
  WAVE?: NpcAnimationNameDef
  HEART_WITH_HANDS?: NpcAnimationNameDef
  COME_ON?: NpcAnimationNameDef
  HAPPY?: NpcAnimationNameDef
  SAD?: NpcAnimationNameDef
  SURPRISE?: NpcAnimationNameDef
}

export class Registry{
  myNPC!:RemoteNpc
  activeNPC!:RemoteNpc
  allNPCs:RemoteNpc[] = []
  activeNPCSound: Map<string,Entity>=new Map()
  //npcAnimations!:NpcAnimationNameType
  askWaitingForResponse!:Dialog
  
  lobbyScene!:LobbyScene
  serverTime:number = -1//default to not set so clear
  //for computing time relative to remote server
  getServerTime(){
    if(this.serverTime > 0 ){
      return this.serverTime
    }else{
      return Date.now()
    }
  }
  onConnectActions?:(room:Room<any>,eventName:string)=>void
}

export const REGISTRY = new Registry()

export function initRegistry(){
  
}