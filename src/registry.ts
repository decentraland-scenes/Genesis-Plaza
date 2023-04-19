import { NPC } from "@dcl/npc-scene-utils"

import { Dialog } from '@dcl/npc-scene-utils'
import { Room } from "colyseus.js"
import { RemoteNpc } from "./modules/bar/barAiNpc/npc/remoteNpc"
import { NpcScene } from "./modules/bar/barAiNpc/npc-scene/npcScene"
import { LobbyScene } from "./modules/bar/barAiNpc/lobby-scene/lobbyScene"


export type NpcAnimationNameDef = {
  name:string
  duration:number
  autoStart?:boolean
}
export type NpcAnimationNameType = {
  IDLE: NpcAnimationNameDef
  WALK?: NpcAnimationNameDef
  RUN?: NpcAnimationNameDef
  THINKING?: NpcAnimationNameDef 
  TALK?: NpcAnimationNameDef
  WAVE?: NpcAnimationNameDef
  HEART_WITH_HANDS?: NpcAnimationNameDef
  COME_ON?: NpcAnimationNameDef
}

export class Registry{
  myNPC!:RemoteNpc
  activeNPC!:RemoteNpc
  allNPCs:RemoteNpc[] = []
  activeNPCSound: Map<string,Entity>=new Map()
  //npcAnimations!:NpcAnimationNameType
  askWaitingForResponse!:Dialog
  npcScene!:NpcScene
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