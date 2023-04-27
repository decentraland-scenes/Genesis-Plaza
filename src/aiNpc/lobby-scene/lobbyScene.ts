//import { REGISTRY } from "src/registry";

import { movePlayerTo } from "@decentraland/RestrictedActions";
import { CONFIG, initConfig } from "src/config";
import { joinOrCreateRoom, joinOrCreateRoomAsync } from "src/connection/connect-flow";
import { disconnect } from "src/connection/connection";
import { REGISTRY } from "src/registry";
import * as ui from "@dcl/ui-scene-utils";
import * as serverStateSpec from "src/aiNpc/lobby-scene/connection/state/server-state-spec";
import { Room } from "colyseus.js";
import * as clientState from "src/aiNpc/lobby-scene/connection/state/client-state-spec";

import * as utils from '@dcl/ecs-scene-utils';
import { GAME_STATE } from "src/state";

import { streamedMsgs } from "../npc/streamedMsgs";
import { RemoteNpc } from "../npc/remoteNpc";
import { closeAllInteractions, createMessageObject, sendMsgToAI } from "../npc/connectedUtils";
//import { GridMap } from "src/land-infection/modules/grid";
//import { gridSize, mapCenter, mapSize } from "src/land-infection/globals";

export class LobbyScene{
 
  //ballManager:BallManager, player has the ball manager
  private _isPlayerInArena : boolean = false;
  isArenaActive: boolean = false;

  pendingConvoWithNPC:RemoteNpc
  pendingConvoActionWithNPC:()=>void
  //grid:GridMap

  init(){
    //player has the ball manager
    //this.ballManager = new BallManager(100, undefined)
    const host = this
    for(const p of REGISTRY.allNPCs){
      p.npc.onActivate = ()=>{
        log("NPC",p.name ,"activated") 

        this.pendingConvoWithNPC = undefined
        this.pendingConvoActionWithNPC = undefined
        REGISTRY.activeNPC = p
    
        //inputContainer.visible = false  
        
        closeAllInteractions({exclude:REGISTRY.activeNPC})
        
        p.thinking([REGISTRY.askWaitingForResponse]) 

        streamedMsgs.reset()  
        //if(GAME_STATE.gameRoom) GAME_STATE.gameRoom.send("changeCharacter", {resourceName:p.config.resourceName} )      
 
        if(GAME_STATE.gameRoom && GAME_STATE.gameConnected === 'connected'){
          host.startConvoWith(p)  
        }else{
          log("NPC",p.name ,"GAME_STATE.gameConnected",GAME_STATE.gameConnected,"connect first") 
          //debugger
          //TODO prompt connection system to reconnect, 
          //then register to call me on connect
          //need to connect first
          this.pendingConvoWithNPC = p
          host.initArena(false)
        }
      }
    }
  }
  startConvoWith(npc:RemoteNpc){
    log("NPC",npc.name ,"GAME_STATE.gameConnected",GAME_STATE.gameConnected,"sendMsgToAI") 
    
    //do we want this side affect?
    this.pendingConvoWithNPC = undefined
    this.pendingConvoActionWithNPC = undefined

    const randomMsgs = ["Hello!","Greetings"]
    const msgText = randomMsgs[Math.floor( Math.random() * randomMsgs.length )]
    const chatMessage:serverStateSpec.ChatMessage = createMessageObject(msgText,{resourceName:npc.config.resourceName},GAME_STATE.gameRoom)
    sendMsgToAI( chatMessage )    
  }
  resetBattleArenaEntities(){
    const METHOD_NAME = "resetBattleArenaEntities"
    log(METHOD_NAME,"ENTRY")

  }
  removeEnemies(){
    //clear out enemies
    //if(REGISTRY.player.enemyManager !== undefined) REGISTRY.player.enemyManager.removeAll()
  }
  resetBattleArena(){
    const METHOD_NAME = "resetBattleArena"
    log(METHOD_NAME,"ENTRY")

    this.isArenaActive = false

    this.removeEnemies()

    this.resetBattleArenaEntities()
  }
  initArena(force: boolean) {
    const METHOD_NAME = "initArena"
    log(METHOD_NAME,"ENTRY",force)
    
    this.resetBattleArena() 

    const npcDataOptions:serverStateSpec.NpcRoomDataOptions={
      levelId:"",
      //timeLimit: 10
      //customRoomId:undefined,
      //maxPlayers
    }
    const connectOptions:any = {
      npcDataOptions: npcDataOptions,
      
    };
    
    //if(this.grid == undefined){
    //  this.grid = new GridMap(mapCenter, mapSize, gridSize, undefined)
    //  this.grid.initGrid()
    //}

    connectOptions.playFabData = {
    }; 

    const roomName = "genesis_plaza"
    joinOrCreateRoomAsync( roomName,connectOptions )

    //snow these now so have ability to quit


  }
  
  onConnect(room: Room<clientState.NpcGameRoomState>) {
    GAME_STATE.gameRoom = room;

    if(this.pendingConvoWithNPC){
      this.startConvoWith(this.pendingConvoWithNPC)
      //do we want this side affect?
      this.pendingConvoWithNPC = undefined
    }
    if(this.pendingConvoActionWithNPC){
      this.pendingConvoActionWithNPC()
    }


  }
  exitBattle(){
    const METHOD_NAME = "exitBattle"
    log(METHOD_NAME,"ENTRY")

    this.resetBattleArena()

    disconnect(true)

    this.isArenaActive = false
  }
  exitArena(moveToLobby?:boolean){
    const METHOD_NAME = "exitArena"
    log(METHOD_NAME,"ENTRY")

    this.exitBattle()

    
  }
  isPlayerInArena():boolean {
    //const playerPos = Camera.instance.feetPosition
    
    //using arena active as decision for now
    //return this.isArenaActive; 
    //log("//. Is Player In Arena: ",this._isPlayerInArena)
    return this._isPlayerInArena;
  }
  movePlayerToRespawnPointInArena() {
    

  }
  movePlayerToStartPointInArena() {
    
  }

  movePlayerHere(position:Vector3,cameraLook:Vector3){
    
  }

  battleAboutToStart(){
    const METHOD_NAME = "battleAboutToStart"
    log(METHOD_NAME,"ENTRY")

    this.resetBattleArenaEntities()

    this.UpdatePlayersColors();

    this.SetAvatarInArena(true);//Start Game

    //WHAT DOES THIS DO??, removed
    //sfx.SOUND_POOL_MGR.mainMusic.playOnce()
    
  }
  startBattle(){
    const METHOD_NAME = "startBattle"
    log(METHOD_NAME,"ENTRY")
    
    
    this.isArenaActive = true

  }

  endBattle(){
    const METHOD_NAME = "endBattle"
    log(METHOD_NAME,"ENTRY")

    
    
    //this.resetBattleArena()
    this.isArenaActive = false

    disconnect(true)
    //this.exitArena()
    //REGISTRY.SCENE_MGR.goLobby()
  }

  private SetAvatarInArena(state : boolean){
      
  }
  private UpdatePlayersColors(){
    
  }
}

