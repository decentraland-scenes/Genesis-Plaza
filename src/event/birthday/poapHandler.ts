import { getUserData, UserData } from '@decentraland/Identity'
import { getCurrentRealm, Realm } from '@decentraland/EnvironmentAPI'
import * as ui from '@dcl/ui-scene-utils'
import { closeDialogSound, openDialogSound } from 'src/modules/ui'

export let poapServer = 'https://poap.dcl.guru/'

export let userData: UserData
export let playerRealm: Realm

export async function fetchUserData() {
  const data = await getUserData()
  if (data) {
    log(data.displayName)
  }

  return data
}

export async function setUserData() {
  const data = await getUserData()
  if (data) {
    log(data.displayName)
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

export async function handlePoap(eventName: string) {
  if (!userData) {
    await setUserData()
  }

  if (!playerRealm) {
    await setRealm()
  }

  if (userData.hasConnectedWeb3) {
    let poap = await sendpoap(eventName)
    if (poap.ok === true) {
      let p = new ui.OkPrompt(
        "A POAP token for today's event will arrive to your account very soon!",
        () => {
          p.close()
        },
        'Ok',
        true
      )
    } else {
      openDialogSound.getComponent(AudioSource).playOnce()
      let text = 'Something is wrong with the server, please try again later.'
      if (poap.error) {
        text = poap.error
      }
      let p = new ui.OkPrompt(
        text,
        () => {
          p.close()
        },
        'Ok',
        true
      )
    }
  } else {
    openDialogSound.getComponent(AudioSource).playOnce()
    let p = new ui.OkPrompt(
      'You need an in-browser Ethereum wallet (eg: Metamask) to claim this item.',
      () => {
        p.close()
        closeDialogSound.getComponent(AudioSource).playOnce()
      },
      'Ok',
      true
    )
  }
}

export async function sendpoap(eventName: string) {
  //if (TESTDATA_ENABLED && IN_PREVIEW) {
  // return
  //}

  if (!userData) {
    await setUserData()
  }
  if (!playerRealm) {
    await setRealm()
  }

  const url = poapServer + eventName

  let body = JSON.stringify({
    address: userData.userId,
    catalyst: playerRealm.serverName,
    room: playerRealm.layer,
  })

  log('sending req to: ', url)
  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body,
    })
    let data = await response.json()
    log('Poap status: ', data)

    return data
  } catch {
    log('error fetching from token server ', url)
  }
}
