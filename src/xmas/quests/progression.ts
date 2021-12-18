import { getUserData, UserData } from '@decentraland/Identity'
import {
  getCurrentRealm,
  isPreviewMode,
  Realm,
} from '@decentraland/EnvironmentAPI'
import {
  IN_PREVIEW,
  setInPreview,
  TESTDATA_ENABLED,
  TESTQUESTSTATE,
  
  FAIL_TO_FETCH_QUEST_STATE,
  COMPLETED_QUEST_STATE,
  START_QUEST_STATE,
  WearableEnum,
  WEARABLES_TO_CHECK,
} from '../config'
import { QuestState } from './quest'
import * as ui from '@dcl/ui-scene-utils'
// import { PlayCloseSound } from './loot'
import { getUserDataFromLocal, setUserData } from 'src/xmas/claiming/userData'
import { superSecretEncode } from './codec'

export let progression: QuestState

//export let userData: UserData
export let playerRealm: Realm

export let fireBaseServer =
  'https://us-central1-decentraland-halloween.cloudfunctions.net/app/'
//`http://localhost:5001/decentraland-halloween/us-central1/app/`

/*
export async function setUserData() {
  const data = await getUserData()
  log('setUserData ', data)
  userData = data
}*/

// fetch the player's realm
export async function setRealm() {
  let realm = await getCurrentRealm()
  log(`You are in the realm: ${JSON.stringify(realm.displayName)}`)
  playerRealm = realm
}

export async function checkProgression() {
  log('checkProgression start')
  setInPreview(await isPreviewMode())
  //if (TESTDATA_ENABLED && IN_PREVIEW) {
  if (TESTDATA_ENABLED && IN_PREVIEW) {
    log('checkProgression TESTDATA_ENABLED. using FAIL_TO_FETCH_QUEST_STATE')
    progression = TESTQUESTSTATE
    return TESTQUESTSTATE
  }

  if (!getUserDataFromLocal()) {
    await setUserData()
  }
  const userData = getUserDataFromLocal();
  /*const url = fireBaseServer + 'christmasstate/?id=' + userData.userId
  try {
    let response = await fetch(url)
    let json = await response.json()
    log('Player progression: ', json)
    progression = json
    return json
  } catch {
    log('error fetching from token server ', url)
  }*/
  const url =
    'https://peer.decentraland.org/lambdas/collections/wearables-by-owner/' +
    userData.userId
  try {
    //log("checkProgression callin " + url)
    let response = await fetch(url)
    let json = await response.json()
    log('checkProgression Player progression: ', response.status, userData)

    let hasWearable = false
    for (const p in json) {
      for(const q in WEARABLES_TO_CHECK){
        if( json[p].urn == WEARABLES_TO_CHECK[q]){
          hasWearable = true
          break
        }
      }
    }
    if (hasWearable) {
      log('checkProgression found flag. using COMPLETED_QUEST_STATE')
      //found
      progression = COMPLETED_QUEST_STATE
      return COMPLETED_QUEST_STATE
    } else {
      log('checkProgression missing flag. using START_QUEST_STATE')
      progression = START_QUEST_STATE
      return START_QUEST_STATE
    }
    //progression = json
    //return json
  } catch {
    log('checkProgression error fetching from token server ', url)
  }

  log('checkProgression failed call. using FAIL_TO_FETCH_QUEST_STATE')
  progression = FAIL_TO_FETCH_QUEST_STATE
  return FAIL_TO_FETCH_QUEST_STATE
}

export async function updateProgression(stage: string, onlyLocal?: boolean) {
  //if (onlyLocal || (TESTDATA_ENABLED && IN_PREVIEW)) {
  updateLocalProgression(stage)

  return true
  //}

  const userData = getUserDataFromLocal()
  if (!userData) {
    await setUserData()
  }
  if (!playerRealm) {
    await setRealm()
  }

  const url = fireBaseServer + 'christmasupdate'

  let body = JSON.stringify({
    id: userData.userId,
    stage: stage,
    server: playerRealm.serverName,
    realm: playerRealm.layer,
  })

  log('sending req to: ', url)
  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: superSecretEncode(body) }),
    })
    let data = await response.json()
    log('Player progression: ', data)
    if (data.success) {
      updateLocalProgression(stage)
    }
    return data.success
  } catch {
    log('error fetching from token server ', url)
  }
}

export function updateLocalProgression(stage: string) {
  progression.data[stage] = true

  switch (stage) {
    case `w1`:
      progression.data.w1Found = true
      break
    case `w2`:
      progression.data.w2Found = true
      break
    case `w3`:
      progression.data.w3Found = true
      break
  }
}
/*
export async function sendpoap(stage: string) {
  //if (TESTDATA_ENABLED && IN_PREVIEW) {
  progression.data[stage] = true
  return true
  //}

  const userData = getUserDataFromLocal()
  if (!userData) {
    await setUserData()
  }
  if (!playerRealm) {
    await setRealm()
  }

  const url = fireBaseServer + 'send-poap'

  let body = JSON.stringify({
    id: userData.userId,
    stage: stage,
    server: playerRealm.serverName,
    realm: playerRealm.layer,
  })

  log('sending req to: ', url)
  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: superSecretEncode(body) }),
    })
    let data = await response.json()
    log('Poap status: ', data)

    return data
  } catch {
    log('error fetching from token server ', url)
  }
}
*/