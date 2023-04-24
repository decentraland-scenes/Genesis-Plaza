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
import { closeAllInteractions, createMessageObject, sendMsgToAI } from "src/aiNpc/npc/connectedUtils";
 
const canvas = ui.canvas

let allRooms: RoomAvailable[] = []; 
//let allPlayers:PlayerState[]=[]
 
//tracer function
//i need a way to sync server and client time, for now using this to later revisit
function getSharedTimeNow() {
  return Date.now();
}


//const canvas = canvas
const debugText = new UIText(canvas)
debugText.fontSize = 8//15
debugText.width = 120
debugText.height = 30
debugText.hTextAlign = "right";
debugText.hAlign = "right"
debugText.vAlign = "bottom"
//message.positionX = -80
debugText.positionY = -20

function updateDebugText(player:serverStateSpec.PlayerState){
  debugText.value = 
    "currentCharacterId:"+JSON.stringify(player.remoteClientCache.currentCharacterId)
    +"\ncurrentSceneTrigger:"+JSON.stringify(player.remoteClientCache.currentSceneTrigger)
}

export async function onNpcRoomConnect(room: Room) {
  GAME_STATE.setGameRoom(room);

  GAME_STATE.setGameConnected("connected");

  
    onLevelConnect(room);
  
}

export function onDisconnect(room: Room, code?: number) {
  //ENEMY_MGR.removeAllPlayers();

  //room.removeAllListeners()

  GAME_STATE.setGameConnected("disconnected");

}


//function convertAndPlayAudio(sourceName:string,payloadId:string,base64Audio:string){
  function convertAndPlayAudio(packet:serverStateSpec.ChatPacket){
  const sourceName = packet.routing.source.name
  const payloadId = packet.packetId.packetId
  const base64Audio = packet.audio.chunk
  log("convertAndPlayAudio",payloadId)
  
  executeTask(async () => {
    //base64 is too big, passing payloadId and server will look it up and convert it
    const soundClip = new AudioStream(CONFIG.COLYSEUS_HTTP_ENDPOINT+"/audio-base64-binary?payloadId="+encodeURIComponent(payloadId))
    //const soundSource = new AudioSource(soundClip) 
    const AUDIO_VOLUME = 1//1 //.2
    const loop = false
    const soundEntity = createEntitySound("npcSound",soundClip,AUDIO_VOLUME,loop)
    REGISTRY.activeNPCSound.set( sourceName,soundEntity )
  })
}

  //start fresh


function onLevelConnect(room: Room<clientState.NpcGameRoomState>) {
  //initLevelData(room.state.levelData)
 
  //REGISTRY.npcScene.onConnect( room )
  REGISTRY.lobbyScene.onConnect( room )

  room.onMessage("grid", (data)=>{
    //log("GRID DATA: " + JSON.parse(data.grid)[0][0].infectionLevel)
   // log("GRID CELL: " + JSON.parse(data.grid)[0][0].infectionLevel)
    //REGISTRY.lobbyScene.grid.updateColumns(JSON.parse(data.grid))
  })


  room.onMessage("inGameMsg", (data) => {
    log("room.msg.inGameMsg", data);
    if (data !== undefined && data.msg === undefined) {
      GAME_STATE.notifyInGameMsg(data);
      ui.displayAnnouncement(data, 8, Color4.White(), 60);
    }else{
      //if (message !== undefined && message.msg === undefined) {
        GAME_STATE.notifyInGameMsg(data.msg);
        ui.displayAnnouncement(data.msg, data.duration !== undefined ? data.duration : 8, Color4.White(), 60);
      //}
    } 
 
    //ui.displayAnnouncement(`${highestPlayer.name} wins!`, 8, Color4.White(), 60);
    //ui.displayAnnouncement(message, 8, Color4.White(), 60);
    //GAME_STATE.setGameEndResultMsg() 
  });

  let lastInteractionId=""
  let playedAudioYet = false
  let npcDialog:Dialog[]=[]
  let npcDialogAudioPacket:serverStateSpec.ChatPacket[]=[]
  const soundNPCEntity = createEntityForSound("npcSound")

  //need a managing system

   
  const whatIsYourName:ButtonData={
    label:"What is your name",goToDialog:REGISTRY.askWaitingForResponse.name,
    triggeredActions:()=>{
      const chatMessage:serverStateSpec.ChatMessage = createMessageObject("Please tell me your name?",undefined,room)
      sendMsgToAI(chatMessage)  
    }
  }
  const whatCanIBuy:ButtonData={
    label:"What is the PW",goToDialog:REGISTRY.askWaitingForResponse.name,
    triggeredActions:()=>{
      const chatMessage:serverStateSpec.ChatMessage = createMessageObject("What is the computer password?",undefined,room)
      sendMsgToAI(chatMessage) 
    }
  }

  const goodbye:ButtonData={
    label:"Goodbye",goToDialog:REGISTRY.askWaitingForResponse.name,
    triggeredActions:()=>{
      REGISTRY.activeNPC?.goodbye()

      closeAllInteractions()  
      showInputOverlay(false)
      
    }
  }
  const doYouTakeCredit:ButtonData={
    label:"Do you take credit",goToDialog:REGISTRY.askWaitingForResponse.name,
    triggeredActions:()=>{
      const chatMessage:serverStateSpec.ChatMessage = createMessageObject("Do you take credit?",undefined,room)
      sendMsgToAI(chatMessage) 
    } 
  }
 
  const askWhatCanIHelpYouWithDialog:Dialog = {
    name: "ask-generic-how-can-i-help",
    text: "Ask something else?",
    //offsetX: 60,
    isQuestion: true,
    skipable: false,
    isEndOfDialog:true,
    buttons: [whatIsYourName,whatCanIBuy,doYouTakeCredit,goodbye],
  }


  function createDialog(chatPart:ChatNext){
    log("createDialog","ENTRY",chatPart)
    //debugger    
     
    if(chatPart.text === undefined){  
      //if got here too late, order is messed up
      log("createDialog","chatPart.end?",chatPart,"did not have text. waiting for more")
      //debugger
      streamedMsgs.waitingForMore = true 
      return;
    } 
    const dialog = chatPart.text.createNPCDialog() 
    
    showInputOverlay(false)

    dialog.triggeredByNext = () => {
      const NO_LOOP = true
      REGISTRY.activeNPC.npc.playAnimation(REGISTRY.activeNPC.npcAnimations.TALK.name,NO_LOOP,REGISTRY.activeNPC.npcAnimations.TALK.duration)
      
      //FIXME WORKAROUND, need to string dialogs together
      //or this workaround lets it end, then start a new one
      //REGISTRY.activeNPC.dialog.closeDialogWindow() //does not work
      closeAllInteractions({exclude:REGISTRY.activeNPC})
      utils.setTimeout(200,()=>{
        if(!chatPart.endOfInteraction && !streamedMsgs.hasNextAudioNText()){
          log("createDialog","chatPart.end.hasNext?",chatPart,". waiting for more")
          streamedMsgs.waitingForMore = true 
          return;
        } 
        const nextPart = streamedMsgs.next()
        //debugger 
        if(nextPart.text){
          const nextDialog = createDialog( nextPart )
          REGISTRY.activeNPC.talk([nextDialog]);
          if(true){//audio optional
            if(nextPart.audio && nextPart.audio.packet.audio.chunk){
              log("onMessage.structuredMsg.audio", nextPart.audio);
              convertAndPlayAudio( nextPart.audio.packet )
              //npcDialogAudioPacket.push( msg )
            }
          } 
        }else{
          //check to see if this interaction id has an ending we didn't find before
          //if its part of same interactionId but not the utterace
          const checkRes = streamedMsgs._next(false,chatPart.indexStart)
          if(!chatPart.endOfInteraction && checkRes.endOfInteraction){
            log("createDialog","chatPart.end.checkRes","thought it was not end but it is after checking latest packets")
          }
          if(chatPart.endOfInteraction || checkRes.endOfInteraction){
            log("createDialog","chatPart.end",chatPart,"end of dialog",dialog)
            //TODO find better way to detect reset
            streamedMsgs.started = false
            streamedMsgs.waitingForMore = false 

            //GETTING TRIGGERED on race condition i think, audio came through but not text?
            //show input box 
            REGISTRY.activeNPC.endOfRemoteInteractionStream()
            //debugger
            //REGISTRY.activeNPC.talk([askWhatCanIHelpYouWithDialog,REGISTRY.askWaitingForResponse]);
          }else{
            streamedMsgs.waitingForMore = true 
            //still waiting for more from server
            log("createDialog","chatPart.end?",chatPart,"not end of chat but end of values to display. waiting for more",dialog)
          }
        }
      })
    }

    log("createDialog","RETURN","chatPart",chatPart,"dialog",dialog)
    
    return dialog
  }
  
  room.state.players.onAdd = (player: clientState.PlayerState, sessionId: string) => {
    log("room.state.players.onAdd", player);

    player.listen("remoteClientCache", (remoteClientCache: clientState.InWorldConnectionClientCacheState) => {
      log("room.state.players.listen.remoteClientCache", remoteClientCache);
      updateDebugText(player)
    })
    
    player.remoteClientCache.onChange = (remoteClientCache: serverState.InWorldConnectionClientCacheState) => {
      log("room.state.players.onChange.remoteClientCache", remoteClientCache);
      updateDebugText(player)
    }
  }
  

  room.onMessage("structuredMsg", (msg:serverStateSpec.ChatPacket) => {
    log("onMessage.structuredMsg", msg);
    //allRooms = rooms;
    //update_full_list();
    //clear then out
    
    let newInteraction = false
    newInteraction = lastInteractionId !== msg.packetId.interactionId
    lastInteractionId = msg.packetId.interactionId
    
    const chatPart = new ChatPart(msg)
    streamedMsgs.add( chatPart )  

    //TODO find better way to detect reset like when last stream msg was at last?
    if(REGISTRY.activeNPC && (streamedMsgs.started == false || streamedMsgs.waitingForMore) && streamedMsgs.hasNextAudioNText()){ 
      log("structuredMsg","createDialog","chatPart.start",chatPart)
      const nextPart = streamedMsgs.next() 
      
      streamedMsgs.started = true
      streamedMsgs.waitingForMore = false
      const dialog = createDialog(nextPart)
      if(dialog){
        REGISTRY.activeNPC.talk([dialog]);
      }else{   
        log("structuredMsg","createDialog","no dialog to show,probably just a control msg",dialog,"chatPart",chatPart,"nextPart",nextPart)
      }
 
      if(true){//if(npcDialog.length ==1){
        if(nextPart.audio && nextPart.audio.packet.audio.chunk){
          log("onMessage.structuredMsg.audio", msg); 
          convertAndPlayAudio( nextPart.audio.packet )    
          //npcDialogAudioPacket.push( msg ) 
        } 
      } 
    }else{
      log("structuredMsg","createDialog","chatPart.onmsg","started:",streamedMsgs.started,"waitingForMore:",streamedMsgs.waitingForMore,"hasNextAudioNText",streamedMsgs.hasNextAudioNText())
    }  
    // 
    
    
  });
  
  room.onMessage("inGameMsg", (data:string|serverStateSpec.ShowMessage) => {
    log("room.msg.inGameMsg", data);
    
    if (typeof data === "string"){///} || data instanceof String)
      GAME_STATE.notifyInGameMsg(data);
      ui.displayAnnouncement(data, 8, Color4.White(), 60);
    }else{ 
      //if (message !== undefined && message.msg === undefined) {
        GAME_STATE.notifyInGameMsg(data.message);
        ui.displayAnnouncement(data.title+"\n"+data.message, 
          data.duration !== undefined ? data.duration : 8, data.isError ? Color4.Red() : Color4.White(), 60);
      //}
    } 
 
  });
  

  room.onMessage("showError", (data:serverStateSpec.ShowMessage) => {
    log("onMessage.showError", data);
    //allRooms = rooms;
    //update_full_list();
    //clear then out
    //Game_2DUI.showErrorPrompt(data.title, data.message);
    ui.displayAnnouncement(data.title+"\n"+data.message, 
      data.duration !== undefined ? data.duration : 8, data.isError ? Color4.Red() : Color4.White(), 40);
    log("Received onMessage.showError");
  });
  

  room.onMessage("serverTime", (data)=>{
    //log("onMessage.serverTime", data);
    //log("SERVERTIME: " + data.time)
    REGISTRY.serverTime = data.time
  })

  room.onMessage("grid", (data)=>{
    //log("onMessage.grid", data);
    //log("GRID DATA: " + JSON.parse(data.grid)[0][0].infectionLevel)
   // log("GRID CELL: " + JSON.parse(data.grid)[0][0].infectionLevel)
    //REGISTRY.lobbyScene.grid.updateColumns(JSON.parse(data.grid)) 
  })

  


  room.onLeave(() => {
    //allPlayers = [];
    //update_full_list();
    log("Bye, bye!");
  });

  room.onLeave((code) => { 
    log("onLeave, code =>", code);
  });
}

 /*
let triggerCounter = 0
for(const p of ["no_shards_given","player_gave_shards","containment_alarms_on","containment_alarms_stopped"]){
  const setTriggerShardsGiven = new Entity()
  setTriggerShardsGiven.addComponent( new OnPointerDown(()=>{
    if(GAME_STATE.gameRoom) GAME_STATE.gameRoom.send("setSceneTrigger", {name:p})  
  },{
    hoverText:"trigger:"+p 
  }))
  setTriggerShardsGiven.addComponent(new Transform({
    position:new Vector3(8,1,8+triggerCounter)
  }))
  setTriggerShardsGiven.addComponent(new BoxShape())
  triggerCounter+=2
  engine.addEntity(setTriggerShardsGiven)
}
*/