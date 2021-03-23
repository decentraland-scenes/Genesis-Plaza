import { NPC, Dialog } from '@dcl/npc-scene-utils'
import { getUserData, UserData } from '@decentraland/Identity'

export let octopus: NPC

export let userData: UserData = {
  displayName: '',
  publicKey: '',
  hasConnectedWeb3: false,
  userId: '',
}

export async function fetchUserData() {
  const data = await getUserData()
  log(data.displayName)
  return data
}

export async function setUserData() {
  const data = await getUserData()
  log(data.displayName)
  userData = data
}
setUserData()

export async function addBarNPCs() {
  // fetch player name
  //setUserData()

  octopus = new NPC(
    { position: new Vector3(160, 0.3, 140) },
    'models/core_building/BobOctorossV42.glb',
    () => {
      octopus.changeIdleAnim('TalkLoop')
      octopus.playAnimation('TalkIntro', true, 0.63)
      octopus.talk(OctoHi)
    },
    {
      idleAnim: 'Idle',
      faceUser: false,
      darkUI: true,
      onWalkAway: () => {
        backToIdle()
      },
    }
  )
}

/// OCTO

export let OctoHi: Dialog[] = [
  {
    text:
      'Hey there ' +
      userData.displayName +
      ', how is it going? I have a long story to tell you',
    skipable: true,
  },
  {
    text: 'Dam, I forgot what it was I wanted to tell you.',

    skipable: true,
  },
  {
    text: 'Want a drink?',
    isQuestion: true,
    buttons: [
      { label: 'YES', goToDialog: 'yes', fontSize: 14 },
      { label: 'NO', goToDialog: 'no', fontSize: 14 },
    ],
  },
  {
    name: 'no',
    text: "Okay, I'll be around if you get thirsty!",

    triggeredByNext: () => {
      backToIdle()
    },
    isEndOfDialog: true,
  },
  {
    name: 'yes',
    text: "I'm all out, sorry",

    triggeredByNext: () => {
      backToIdle()
    },
    isEndOfDialog: true,
  },
]

export function backToIdle() {
  octopus.changeIdleAnim('Idle')
  octopus.playAnimation('TalkOutro', true, 0.63)
}
