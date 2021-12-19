import { getUserData, UserData } from '@decentraland/Identity'
import {
  getCurrentRealm,
  isPreviewMode,
  Realm,
} from '@decentraland/EnvironmentAPI'

export let userData: UserData
export let playerRealm: Realm


export function getUserDataFromLocal():UserData {
  return userData  
}

export async function setUserData() {
  const data = await getUserData()
  if (data) {
    log(data.publicKey)
    userData = data
  }
}

// fetch the player's realm
export async function setRealm() {
  let realm = await getCurrentRealm()
  if (realm) {
    log(`You are in the realm: ${JSON.stringify(realm.displayName)}`)
    playerRealm = realm
  }
}
