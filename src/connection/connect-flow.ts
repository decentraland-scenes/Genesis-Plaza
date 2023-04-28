import { CONFIG } from 'src/config';
import { GAME_STATE } from 'src/state';


import { connect, disconnect, reconnect } from './connection';
import { Room } from 'colyseus.js';
import { REGISTRY } from 'src/registry';
import { preventConcurrentExecution } from 'src/utils/utilities';



// play ambient music
//playLoop(ambienceSound, 0.4);

/*
//this is a active logout, will make calls
export function logout(){
    
    //TODO make logout calls
    resetLoginState()
}
export function resetLoginState(){
    GAME_STATE.playerState.setLoginFlowState('undefined')
    GAME_STATE.playerState.setLoginSuccess(false)
    GAME_STATE.playerState.playerDclId = undefined
    GAME_STATE.playerState.playFabLoginResult = undefined    
}
*/
export function leave(consent?:boolean){
    
    disconnect(consent) 
    
}  
export function joinNewRoom(){
    
}


export async function joinOrCreateRoom(roomName:string,options: any = {}){
    log("connect-flow","joinOrCreateRoom",roomName,options)
    await connect(roomName,options).then((room) => {
        log("connect-flow","joinOrCreateRoom",roomName,options,"Connected!")
        
        REGISTRY.onConnectActions(room,"reconnect")
     
    }).catch((err) => {
        log("connect-flow","joinOrCreateRoom",roomName,options,"ERROR!",err)
        error(err);
    });
}

let joinOrCreateRoomAsync_roomName:string
let joinOrCreateRoomAsync_options:any = {}
export const _joinOrCreateRoomAsync = preventConcurrentExecution("joinOrCreateRoomAsync",async () => {
    let retVal:Room<any>

    const roomName:string = joinOrCreateRoomAsync_roomName
    const options:any = joinOrCreateRoomAsync_options

    retVal = await connect(roomName,options)

    REGISTRY.onConnectActions(retVal,"reconnect")

    return retVal;
})
export async function joinOrCreateRoomAsync(roomName:string,options: any = {}):Promise<Room<any>>{
    joinOrCreateRoomAsync_roomName = roomName
    joinOrCreateRoomAsync_options = options

    const promise:Promise<Room<any>> = new Promise( async (resolve, reject)=>{
        try{
            let loginRes:Room<any>
            loginRes = await _joinOrCreateRoomAsync()
            resolve( loginRes )
        }catch(e){
            log("joinOrCreateRoomAsync failed ",e)
            //if(CONFIG.ENABLE_DEBUGGER_BREAK_POINTS) debugger
            reject(e)
        }
    })
    //if doLoginFlowAsync is preventConcurrentExecution wrapped
    //confirmed that if it returns the same promise or a new one
    //promise.then just adds more to the callback so all callers
    //will get their callbacks ran
    promise.then(()=>{
        /*if(callback && callback.onSuccess){
            log("doLoginFlow calling callback. onSuccess")
            callback.onSuccess()
        }else{
            log("doLoginFlow success,no callback. onSuccess")
        }*/
    })
    return promise
}

//START colyseusConnect//START colyseusConnect//START colyseusConnect
export const colyseusReConnect = () => {
    const oldRoom = GAME_STATE.gameRoom
    if(oldRoom !== null && oldRoom !== undefined){
        const oldRoomId = oldRoom.id
        const oldRoomName = oldRoom.name
        log("attempt to reconnect to ",oldRoomId,oldRoom)
        reconnect(oldRoom.id, oldRoom.sessionId,{}).then((room) => {
            log("ReConnected!");
            //GAME_STATE.setGameConnected('connected')
            
            //onJoinActions(room,"reconnect")
            REGISTRY.onConnectActions(room,"reconnect")
             
        }).catch((err) => {
            log("connect-flow","colyseusReConnect",oldRoomId,oldRoomName,oldRoom,"ERROR!",err)
            error(err);
        });
    }else{
        log("was not connected")
    }
}//end colyseusConnect


//doLoginFlow()

//
// Connect to Colyseus server! 
// Set up the scene after connection has been established.
//
//let playerLoginResult:LoginResult;

/*
GAME_STATE.playerState.addChangeListener(
    (key: string, newVal: any, oldVal: any)=>{
      log("listener.playerState.login-flow.ts " + key + " " + newVal + " " + oldVal)
  
      switch(key){
        //common ones on top
        case "requestDoLoginFlow":
          //doLoginFlow()
          break;
      }
  })
*/