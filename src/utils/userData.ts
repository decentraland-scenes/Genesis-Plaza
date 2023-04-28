import { getUserData, UserData } from '@decentraland/Identity'
import {
  getCurrentRealm,
  isPreviewMode,
  Realm,
} from '@decentraland/EnvironmentAPI'
import { GAME_STATE } from 'src/state'

//TODO MOVE TO GAME STATE
//let userData: UserData
//let playerRealm: Realm

export function initUserData(){
  
}

export function getAndSetUserDataIfNullNoWait(){
  if(!getUserDataFromLocal()){
      getAndSetUserData() //not calling await, hoping its fast
  } 
}

export function getUserDataFromLocal():UserData|null {
  return GAME_STATE.playerState.dclUserData
}
export function getRealmDataFromLocal():Realm|null {
  return GAME_STATE.playerState.dclUserRealm
}

export async function getAndSetUserData() {
  const data = await getUserData()
  if (data) {
    log("getAndSetUserDataIfNullNoWait.yyy",data.publicKey,data)
    GAME_STATE.playerState.setDclUserData( data )
  }
  return data
}

// fetch the player's realm
export async function setRealm() {
  let realm = await getCurrentRealm()
  if (realm) {
    log(`You are in the realm: ${JSON.stringify(realm.displayName)}`)
    GAME_STATE.playerState.setDclUserRealm( realm )
  }
}

onRealmChangedObservable.add(async (realmData) => {
  if (realmData && realmData.room) {
    log('PLAYER CHANGED ISLAND TO ', realmData.room)
    //myConnectSystem.connected = true
    //log('CONNECTING TO WS SERVER')
    GAME_STATE.playerState.setDclUserRealm( {...realmData,layer:''} )
  }
})