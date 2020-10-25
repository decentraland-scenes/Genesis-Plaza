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
} from '../config'
import { HalloweenState, initialQuestUI, quest } from './quest'
import * as ui from '../../node_modules/@dcl/ui-utils/index'

export let progression: HalloweenState

export let userData: UserData
export let playerRealm: Realm

export let fireBaseServer =
  'https://us-central1-decentraland-halloween.cloudfunctions.net/app/'

export async function setUserData() {
  const data = await getUserData()
  log(data.publicKey)
  userData = data
}

// fetch the player's realm
export async function setRealm() {
  let realm = await getCurrentRealm()
  log(`You are in the realm: ${JSON.stringify(realm.displayName)}`)
  playerRealm = realm
}

export async function checkProgression() {
  setInPreview(await isPreviewMode())
  if (TESTDATA_ENABLED && IN_PREVIEW) {
    progression = TESTQUESTSTATE
    return TESTQUESTSTATE
  }

  if (!userData) {
    await setUserData()
  }
  const url = fireBaseServer + 'halloweenstate/?id=' + userData.userId
  try {
    let response = await fetch(url)
    let json = await response.json()
    log('Player progression: ', json)
    progression = json
    return json
  } catch {
    log('error fetching from token server ', url)
  }
}

export async function updateProgression(stage: string, onlyLocal?: boolean) {
  if (onlyLocal || (TESTDATA_ENABLED && IN_PREVIEW)) {
    progression.data[stage] = true
    return true
  }

  if (!userData) {
    await setUserData()
  }
  if (!playerRealm) {
    await setRealm()
  }

  const url = fireBaseServer + 'halloweenupdate'

  let body = {
    id: userData.userId,
    stage: stage,
    server: playerRealm.serverName,
    realm: playerRealm.layer,
  }

  log('sending req to: ', url)
  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    let data = await response.json()
    log('Player progression: ', data)
    if (data.success) {
      progression.data[stage] = true
    }
    return data.success
  } catch {
    log('error fetching from token server ', url)
  }
}

export function nextDay(nextDay: number) {
  if (nextDay > progression.day) {
    let p = new ui.OkPrompt(
      'Great job! Come back tomorrow to find out how this story continues.'
    )

    return false
  }
  let currentCoords = quest.currentCoords

  quest.close()

  let congrats = new ui.CenterImage(
    'images/finishedDay' + (nextDay - 1) + '.png',
    8
  )

  initialQuestUI(progression.data, progression.day, currentCoords)
  return true
}
