import { DataChange, Room, RoomAvailable } from "colyseus.js";
import { GAME_STATE, PlayerState } from "src/state";
import * as clientState from "src/aiNpc/lobby-scene/connection/state/client-state-spec";
import * as serverState from "src/aiNpc/lobby-scene/connection/state/server-state-spec";
import * as serverStateSpec from "src/aiNpc/lobby-scene/connection/state/server-state-spec";

//import * as SceneData from "src/og-decentrally/modules/scene";
//import * as gameUI from "../ui/index";
import * as utils from "@dcl/ecs-scene-utils";
//import { Enemy, ENEMY_MGR } from "src/og-decentrally/modules/playerManager";
import { createEntityForSound, createEntitySound, isNull, notNull, realDistance } from "src/utils/utilities";
import * as ui from "@dcl/ui-scene-utils";


//import { Projectile } from "src/og-decentrally/modules/projectiles";
//import { LevelDataState, TrackFeaturePosition } from "src/og-decentrally/modules/connection/state/server-state-spec";
//import { levelManager } from "src/og-decentrally/tracks/levelManager";
//import { Constants } from "src/og-decentrally/modules/resources/globals";
//import { ColyseusCallbacksCollection, ColyseusCollection } from './state/client-colyseus-ext'
import { CONFIG } from "src/config";
//import { TrackFeature, TrackFeatureConstructorArgs } from "src/og-decentrally/modules/trackFeatures";
//import { LeaderBoardManager } from "src/og-decentrally/modules/scene/menu";
//import { SOUND_POOL_MGR } from "src/og-decentrally/modules/resources/sounds";
//import { fetchRefreshPlayerCombinedInfo } from "src/og-decentrally/login/login-flow";


import { REGISTRY } from "src/registry";
import { Dialog, DialogWindow,ButtonData } from "@dcl/npc-scene-utils";
import resources, { setSection } from "src/dcl-scene-ui-workaround/resources";

import { ChatNext, ChatPart, streamedMsgs } from "src/aiNpc/npc/streamedMsgs";
import { showInputOverlay } from "src/aiNpc/npc/customNPCUI";
import { RemoteNpc } from "./remoteNpc";

/**
 * NOTE endInteraction results in player going into STANDING state, need way to resume last action
 * @param ignore 
 */
export function closeAllInteractions(opts?:{exclude?:RemoteNpc,resumeLastActivity?:boolean}){
  for(const p of REGISTRY.allNPCs){
    if(opts?.exclude === undefined || p != opts.exclude){ 
      log("closeAllInteractions " ,p.name)
      p.endInteraction()
      
      //if(REGISTRY.activeNPCSound.get())
      //p.dialog.closeDialogWindow()
    }else{
      //just close the dialog
      p.npc.dialog.closeDialogWindow()
    }
  }
}

   
 
export function sendMsgToAI( msg:serverStateSpec.ChatMessage ){
  if(msg === undefined || msg.text.text.trim().length === 0){
    ui.displayAnnouncement("cannot send empty message")
    return
  }
  log("sendMsgToAI",msg)  
  //hide input
  showInputOverlay(false)
  //mark waiting for reply
  REGISTRY.activeNPC.thinking([REGISTRY.askWaitingForResponse])
  //wrap it in object
  if(GAME_STATE.gameRoom) GAME_STATE.gameRoom.send("message", msg)  
}   

let lastCharacterId = undefined
  
export function createMessageObject(msgText:string,characterId:serverStateSpec.CharacterId,room: Room<clientState.NpcGameRoomState>){
  const chatMessage:serverStateSpec.ChatMessage = new serverStateSpec.ChatMessage({
    date: new Date().toUTCString(),
    packetId:{interactionId:"",packetId:"",utteranceId:""},
    type: serverStateSpec.ChatPacketType.TEXT, 
    text:{text:msgText,final:true},
    routing: 
    {source:{isCharacter:false,isPlayer:true,name:room.sessionId,xId:{resourceName:room.sessionId}}
      ,target:{isCharacter:true,isPlayer:false,name:"",xId:characterId ? characterId : lastCharacterId}
    },
  })
  if(!characterId){
    log("createMessageObject using lastCharacterId",lastCharacterId)
  }
  if(characterId) lastCharacterId = characterId
  return chatMessage
}  


