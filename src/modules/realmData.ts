import { getCurrentRealm } from '@decentraland/EnvironmentAPI'

export let playerRealm //= 'localhost-stub' //getRealm()

// fetch the player's realm
export async function setRealm() {
  let realm = await getCurrentRealm()
  log(`You are in the realm: ${JSON.stringify(realm.displayName)}`)
  playerRealm = realm.displayName
}

// fetch the player's realm
export async function getRealm() {
  let realm = await getCurrentRealm()
  log(`You are in the realm: ${JSON.stringify(realm.displayName)}`)
  return realm.displayName
}
