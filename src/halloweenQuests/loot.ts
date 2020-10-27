import utils from '../../node_modules/decentraland-ecs-utils/index'
import * as ui from '../../node_modules/@dcl/ui-utils/index'
import {
  fireBaseServer,
  playerRealm,
  setRealm,
  setUserData,
  updateProgression,
  userData,
} from './progression'

import { IN_PREVIEW } from '../config'

import { getProvider } from '@decentraland/web3-provider'

import * as eth from '../../node_modules/eth-connect/esm'
import {
  ButtonStyles,
  PromptStyles,
} from '../../node_modules/@dcl/ui-utils/utils/types'

let particleGLTF = new GLTFShape('models/Particles.glb')
let starGLTF = new GLTFShape('models/star.glb')

@Component('alreadyFoundLoot')
export class AlreadyFoundLoot {}

export class Reward extends Entity {
  progressionStep: string
  data: RewardData[]
  particles: Entity
  testUser: string
  openUi: boolean
  onFinished: () => void

  constructor(
    parent: Entity,
    progressionStep: string,
    offset?: TranformConstructorArgs,
    onlyActivateWhenClicked?: boolean,
    onFinished?: () => void,
    testUser?: string
  ) {
    if (parent.hasComponent(AlreadyFoundLoot)) return

    parent.addComponent(new AlreadyFoundLoot())

    super()
    this.addComponent(starGLTF)

    this.addComponent(
      new Transform(
        offset
          ? offset
          : {
              position: new Vector3(0, 1.7, 0),
              scale: new Vector3(1.8, 1.8, 1.8),
            }
      )
    )
    this.getComponent(Transform).scale.x *= 0.3
    this.getComponent(Transform).scale.y *= 0.3
    this.getComponent(Transform).scale.z *= 0.3

    engine.addEntity(this)
    this.setParent(parent)

    this.progressionStep = progressionStep
    if (testUser) {
      this.testUser = testUser
    }

    if (onFinished) {
      this.onFinished = onFinished
    }

    this.addComponent(
      new utils.KeepRotatingComponent(Quaternion.Euler(0, 40, 0))
    )

    this.addComponent(
      new OnPointerDown(
        () => {
          if (this.openUi) return
          this.activate()
        },
        {
          hoverText: 'Claim',
        }
      )
    )

    const idleSource = new AudioSource(new AudioClip('sounds/star-idle.mp3'))
    this.addComponentOrReplace(idleSource)
    idleSource.loop = true
    idleSource.playing = true

    this.particles = new Entity()
    this.particles.setParent(parent)
    this.particles.addComponent(particleGLTF)

    this.particles.addComponent(
      new Transform(
        offset
          ? offset
          : {
              position: new Vector3(0, 1.7, 0),
              scale: new Vector3(1.3, 1.3, 1.3),
              rotation: Quaternion.Euler(0, 0, 0),
            }
      )
    )

    this.particles.addComponent(
      new utils.KeepRotatingComponent(Quaternion.Euler(15, 12, 18))
    )
    const meshAnimator = new Animator()
    this.particles.addComponent(meshAnimator)
    let playAnim = new AnimationState('Play')
    meshAnimator.addClip(playAnim)
    playAnim.play()
    engine.addEntity(this.particles)

    if (!onlyActivateWhenClicked) {
      this.activate()
      const spawnSource = new AudioSource(
        new AudioClip('sounds/star-spawn.mp3')
      )
      this.particles.addComponentOrReplace(spawnSource)
      spawnSource.loop = false
      spawnSource.playing = true

      this.openUi = false
    }
  }
  async activate() {
    this.openUi = true
    let data = await claimToken(
      this.progressionStep,
      this,
      this.testUser ? this.testUser : null
    )

    if (data) {
      this.storeData(data)
    }
  }

  storeData(claimData) {
    log('storing data: ', claimData)

    this.data = claimData
  }

  vanish() {
    engine.removeEntity(this.particles)
    engine.removeEntity(this)
    if (this.onFinished) {
      this.onFinished()
    }
    PlayCoinSound()
  }
  runOnFinished() {
    if (this.onFinished) {
      this.onFinished()
    }
  }
}

export enum ClaimState {
  AVAILABLE = 'available',
  SUCCESS = 'success',
  PENDING = 'pending',
  CLAIMED = 'claimed',
  FAILED = 'failed',
  REJECTED = 'rejected',
  NOSTOCK = 'nostock',
}

export async function claimToken(
  progressionStep: string,
  representation: Reward,
  testUser?: string
) {
  let claimData = await checkServer(
    progressionStep,
    representation,
    testUser ? testUser : null
  )

  // claimstate enum w all options, do a switch case
  let p
  switch (claimData.claimState) {
    case ClaimState.AVAILABLE:
      openClaimUI(
        claimData.data,
        progressionStep,
        representation,
        testUser ? testUser : null
      )

      break
    case ClaimState.FAILED:
      log('Failed previous attempt')
      openClaimUI(
        claimData.data,
        progressionStep,
        representation,
        testUser ? testUser : null,
        true
      )
      return claimData
      break
    case ClaimState.SUCCESS:
      PlayOpenSound()
      p = new ui.OkPrompt(
        'You already claimed this item',
        () => {
          p.close()
          representation.vanish()
          PlayCloseSound()
        },
        'Ok',
        true
      )
      return false
      break
    case ClaimState.PENDING:
      PlayOpenSound()
      p = new ui.OkPrompt(
        'You already attempted to claim this item.\nTry again in about an hour.',
        () => {
          p.close()
          representation.vanish()
          PlayCloseSound()
        },
        'Ok',
        true
      )
      return false
      break

    case ClaimState.NOSTOCK:
      PlayOpenSound()
      log('no stock')
      p = new ui.OkPrompt(
        'Item out of stock.',
        () => {
          p.close()
          representation.vanish()
          PlayCloseSound()
        },
        'Ok',
        true
      )
      return false
      break

    case ClaimState.REJECTED:
      log('Rejected claim response: ', claimData)
      switch (claimData.reason) {
        case 'map':
          log('player not on map')
          PlayOpenSound()
          p = new ui.OkPrompt(
            'We can`t validate the authenticity of your request',
            () => {
              p.close()
              representation.vanish()
              PlayCloseSound()
            },
            'Ok',
            true
          )
          break
        case 'progression':
          log('missing progression')
          PlayOpenSound()
          p = new ui.OkPrompt(
            'We can`t validate the authenticity of your request',
            () => {
              p.close()
              representation.vanish()
              PlayCloseSound()
            },
            'Ok',
            true
          )
          break
        case 'disabled':
          log('inexistent campaign')
          PlayOpenSound()
          p = new ui.OkPrompt(
            "This item you're trying to claim doesn't exist, please contact support in Discord.",
            () => {
              p.close()
              representation.vanish()
              PlayCloseSound()
            },
            'Ok',
            true
          )
          break
        case 'uninitiated':
          log('uninitiated campaign')
          PlayOpenSound()
          p = new ui.OkPrompt(
            "You're too early! Please come back later.",
            () => {
              p.close()
              representation.vanish()
              PlayCloseSound()
            },
            'Ok',
            true
          )
          break

        case 'finished':
          log('finished campaign')
          PlayOpenSound()
          p = new ui.OkPrompt(
            'The event is over. No more items are being given away here.',
            () => {
              p.close()
              representation.vanish()
              PlayCloseSound()
            },
            'Ok',
            true
          )
          break

        case 'invalid':
          log('invalid token claim')
          PlayOpenSound()
          p = new ui.OkPrompt(
            'Invalid request, please try again.',
            () => {
              p.close()
              PlayCloseSound()
              representation.openUi = false
            },
            'Ok',
            true
          )
          break
        case 'unkown':
          log('unkown error')
          PlayOpenSound()
          p = new ui.OkPrompt(
            'An unexpected error occurred, please try again.',
            () => {
              p.close()
              PlayCloseSound()
              representation.openUi = false
            },
            'Ok',
            true
          )
          break
      }

      break
  }
  return false
}

export async function checkServer(
  stage: string,
  representation: Reward,
  testUser?: string
) {
  if (!userData) {
    await setUserData()
  }
  if (!playerRealm) {
    await setRealm()
  }

  if (testUser) {
    userData.userId = testUser
  }

  if (!userData.hasConnectedWeb3 && !IN_PREVIEW) {
    PlayOpenSound()
    let p = new ui.OkPrompt(
      'You need an in-browser Ethereum wallet (eg: Metamask) to claim this item.',
      () => {
        p.close()
        representation.runOnFinished()
        PlayCloseSound()
      },
      'Ok',
      true
    )
    updateProgression(stage)
    return
  }

  const url = fireBaseServer + 'startclaimhalloween'

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
    let json = await response.json()
    log('Claim state: ', json)

    return json
  } catch {
    log('error fetching from token server ', url)
  }
}

export async function makeClaim(
  stage: string,
  testUser?: string
): Promise<ClaimData> {
  if (!userData) {
    await setUserData()
  }
  if (!playerRealm) {
    await setRealm()
  }

  if (testUser) {
    userData.userId = testUser
  }

  const url = fireBaseServer + 'endclaimhalloween'
  log('sending req to: ', url)

  let body = {
    id: userData.userId,
    stage: stage,
    server: playerRealm.serverName,
    realm: playerRealm.layer,
  }

  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    let json = await response.json()
    log('Claim state: ', json)

    if (json.data.ok) {
      return json.data.data
    }

    return null
  } catch {
    log('error fetching from token server ', url)
    return null
  }
}

let claimUI: ui.CustomPrompt

export function openClaimUI(
  data: RewardData[],
  stage: string,
  representation?: Reward,
  testUser?: string,
  failedTransaction?: boolean
) {
  PlayOpenSound()

  if (claimUI && claimUI.background.visible) {
    claimUI.close()
  }

  claimUI = new ui.CustomPrompt(PromptStyles.DARKLARGE)
  claimUI.addText(
    failedTransaction
      ? 'Retry failed transaction'
      : 'You have a reward to claim!',
    0,
    170,
    Color4.FromHexString('#8DFF34FF'),
    26
  )
  claimUI.addText(
    'You must approve a blockchain transaction\npaying an Ethereum gas fee to the network.',
    0,
    130,
    Color4.Gray(),
    12
  )

  let currentToken = 0

  if (data.length > 1) {
    for (let i = 0; i >= data.length; i++) {
      if (data[i].current_key) {
        currentToken = i
      }
    }
  }

  claimUI.addText(data[currentToken].token, 0, 100, Color4.White(), 20) // wearable name

  claimUI.addIcon(data[currentToken].image, 0, 0, 128, 128, {
    sourceHeight: 256,
    sourceWidth: 256,
  })

  if (data.length > 1) {
    claimUI.addText(
      '+ ' +
        (data.length - 1) +
        ' other wearable' +
        (data.length > 2 ? 's ' : ' ') +
        'pending',
      0,
      -60,
      Color4.FromHexString('#8DFF34FF')
    )
  }

  let rejectButton = claimUI.addButton(
    'Later',
    -100,
    -130,
    () => {
      claimUI.close()
      PlayCloseSound()
      representation.openUi = false
    },
    ButtonStyles.F
  )
  rejectButton.label.positionX = 40

  let acceptButton = claimUI.addButton(
    'Claim',
    100,
    -130,
    async () => {
      claimUI.close()
      representation.openUi = false

      let claimData = await makeClaim(stage, testUser ? testUser : null)

      log(claimData)

      if (claimData) {
        representation.vanish()
        makeTransaction(claimData)
      }
    },
    ButtonStyles.E
  )

  if (data.length > 1) {
    acceptButton.label.value = 'Claim all'
    acceptButton.label.positionX = 40
  }
}

export async function makeTransaction(claimData: ClaimData) {
  if (claimData.status == 'successful') {
    let p = new ui.OkPrompt('You have already claimed this reward')
    return
  } else if (claimData.status == 'pending') {
    let p = new ui.OptionPrompt(
      'Claim already pending',
      'You have a pending transaction for this same claim, are you sure you want to continue?',
      () => {
        p.close()
      },
      () => {
        return
      }
    )
  } else if (claimData.status == 'failed') {
    PlayOpenSound()
    let p = new ui.OkPrompt('You are reattempting a failed transaction')
  }

  //PlayOpenSound()
  const provider = await getProvider()
  const rm = new eth.RequestManager(provider)

  const res = rm.eth_sendTransaction({
    data: claimData.transaction_payload,
    from: claimData.user,
    to: claimData.contract,
  })

  return
}

export type RewardData = {
  id: string
  user: string
  campaign_id: string
  status: string
  transaction_hash: string
  type: string
  token: string
  value: string
  created_at: string
  updated_at: string
  from_referral: null
  block_number: null
  claim_id: string
  contract: string
  payload: string
  expires_at: string
  signature: string
  airdrop_type: string
  order: number
  priority: number
  campaign_key: string
  assigned_at: string
  image: string
  current_key?: boolean
}

export type ClaimData = {
  id: string
  user: string
  contract: string
  transaction_payload: string
  transaction_payload_hash: string
  status: string
  rewards: RewardData[]
  expires_at: string
  created_at: string
  updated_at: string
}

export async function makeTestTransaction(claimData: any) {
  if (!userData) {
    await setUserData()
  }

  const provider = await getProvider()
  const rm = new eth.RequestManager(provider)

  const res = rm.eth_sendTransaction({
    data: claimData.transaction_payload,
    from: userData.publicKey,
    to: claimData.contract,
  })
}

// Open dialog sound
export const openDialogSound = new Entity()
openDialogSound.addComponent(new Transform())
openDialogSound.addComponent(
  new AudioSource(new AudioClip('sounds/navigationForward.mp3'))
)
openDialogSound.getComponent(AudioSource).volume = 0.5
engine.addEntity(openDialogSound)
openDialogSound.setParent(Attachable.AVATAR)

// Close dialog sound
export const closeDialogSound = new Entity()
closeDialogSound.addComponent(new Transform())
closeDialogSound.addComponent(
  new AudioSource(new AudioClip('sounds/navigationBackward.mp3'))
)
closeDialogSound.getComponent(AudioSource).volume = 0.5
engine.addEntity(closeDialogSound)
closeDialogSound.setParent(Attachable.AVATAR)

export const coinSound = new Entity()
coinSound.addComponent(new Transform())
coinSound.addComponent(
  new AudioSource(new AudioClip('sounds/star-collect.mp3'))
)
coinSound.getComponent(AudioSource).volume = 0.5
coinSound.getComponent(AudioSource).loop = false
engine.addEntity(coinSound)
coinSound.setParent(Attachable.AVATAR)

export function PlayOpenSound() {
  openDialogSound.getComponent(AudioSource).playOnce()
}

export function PlayCloseSound() {
  closeDialogSound.getComponent(AudioSource).playOnce()
}

export function PlayCoinSound() {
  coinSound.getComponent(AudioSource).playOnce()
}
