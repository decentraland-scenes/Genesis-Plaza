import { getUserData, UserData } from '@decentraland/Identity'
import {
  getCurrentRealm,
  isPreviewMode,
  Realm,
} from '@decentraland/EnvironmentAPI'


let userData: UserData
let playerRealm: Realm


export function getAndSetUserDataIfNullNoWait(){
  if(!getUserDataFromLocal()){
      getAndSetUserData() //not calling await, hoping its fast
  }
}

export function getUserDataFromLocal():UserData|null {
  return userData
}
export function getRealmDataFromLocal():Realm|null {

  return playerRealm 
}

export async function getAndSetUserData() {
  const data = await getUserData()
  if (data) {
    log("getAndSetUserData",data.publicKey)
    userData = data
  }
  log("getAndSetUserData",data)
  return data
}

// fetch the player's realm
export async function setRealm() {
  let realm = await getCurrentRealm()
  if (realm) {
    log(`You are in the realm: ${JSON.stringify(realm.displayName)}`)
    playerRealm = realm
    
  }else{
    log(`missing realm: `,realm)
  }
}

onRealmChangedObservable.add(async (realmData) => {
  if (realmData && realmData.room) {
    log('PLAYER CHANGED ISLAND TO ', realmData.room)
    //myConnectSystem.connected = true
    //log('CONNECTING TO WS SERVER')
    playerRealm = {...realmData,layer:''}
  }
})