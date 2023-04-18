//import { REGISTRY } from "src/registry";

import { movePlayerTo } from "@decentraland/RestrictedActions";
import { CONFIG, initConfig } from "src/config";
import { joinOrCreateRoom, joinOrCreateRoomAsync } from "src/connection/connect-flow";
import { disconnect } from "src/connection/connection";
import { REGISTRY } from "src/registry";
import * as ui from "@dcl/ui-scene-utils";
import * as serverStateSpec from "src/modules/bar/barAiNpc/npc-scene/connection/state/server-state-spec";
import { Room } from "colyseus.js";
import * as clientState from "src/modules/bar/barAiNpc/npc-scene/connection/state/client-state-spec";

import { notNull } from "src/modules/bar/barAiNpc/utils/utilities";
import * as utils from '@dcl/ecs-scene-utils';
import { GAME_STATE } from "src/state";

export class NpcScene{
 
  //ballManager:BallManager, player has the ball manager
  private _isPlayerInArena : boolean = false;
  isArenaActive: boolean = false;

  init(){
    //player has the ball manager
    //this.ballManager = new BallManager(100, undefined)
 
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

    connectOptions.playFabData = {
    }; 

    const roomName = "chat_npc"
    joinOrCreateRoomAsync( roomName,connectOptions )

    //snow these now so have ability to quit


  }
  onConnect(room: Room<clientState.NpcGameRoomState>) {
    GAME_STATE.gameRoom = room;
    //Game_2DUI.showLeaderboard(true) 

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

