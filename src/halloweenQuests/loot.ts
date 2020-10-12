import utils from '../../node_modules/decentraland-ecs-utils/index'
import * as ui from '../../node_modules/@dcl/ui-utils/index'
import {
  fireBaseServer,
  playerRealm,
  setRealm,
  setUserData,
  userData,
} from './progression'
import { IN_PREVIEW } from '../config'

/////// PICK UP

// function called when picking up item

// show cool item

export function showCoolItem(
  parent: Entity,
  token: string,
  progressionStep: string,
  offset?: TranformConstructorArgs
) {
  //playSound(true)

  let particleThing = new Entity()
  particleThing.setParent(parent)
  particleThing.addComponent(new GLTFShape('models/Particles.glb'))

  particleThing.addComponent(
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

  particleThing.addComponent(
    new utils.KeepRotatingComponent(Quaternion.Euler(15, 12, 18))
  )
  const meshAnimator = new Animator()
  particleThing.addComponent(meshAnimator)
  let playAnim = new AnimationState('Play')
  meshAnimator.addClip(playAnim)
  playAnim.play()
  engine.addEntity(particleThing)

  let token3D = new Entity()
  token3D.setParent(parent)
  let path = 'models/' + token + '.glb'
  token3D.addComponent(new GLTFShape(path))
  token3D.addComponent(
    new Transform(
      offset
        ? offset
        : {
            position: new Vector3(0, 1.7, 0),
            scale: new Vector3(1.8, 1.8, 1.8),
          }
    )
  )
  token3D.addComponent(
    new utils.KeepRotatingComponent(Quaternion.Euler(0, 40, 0))
  )

  let coinSound = new AudioSource(new AudioClip('sounds/coin.mp3'))
  token3D.addComponent(coinSound)

  token3D.addComponent(
    new OnClick(() => {
      coinSound.playOnce()
      token3D.addComponent(
        new utils.Delay(500, () => {
          engine.removeEntity(token3D)
          engine.removeEntity(particleThing)
          let p = new ui.OptionPrompt(
            'Get a Wearable',
            'You will need to approve a blockchain transaction and pay the Ethereum gas fee.',
            () => {
              claimToken(progressionStep)
            }
          )
        })
      )
    })
  )

  if (token == 'Star') {
    token3D.getComponent(Transform).scale.setAll(0.3)
  }

  engine.addEntity(token3D)
}

export async function claimToken(progressionStep: string) {
  let claimData = await claimFromServer(progressionStep)

  // claimstate enum w all options, do a switch case

  if (!claimData.canClaim) {
    let p = new ui.OkPrompt('You already claimed this item')
    return
  }
  // call contract with claimData.signature & progressionStep

  // when successful > updateProgression(progressionStep)  ... or maybe not needed
}

export async function claimFromServer(stage: string) {
  if (!userData) {
    await setUserData()
  }
  if (!playerRealm) {
    await setRealm()
  }

  if (!userData.hasConnectedWeb3 && !IN_PREVIEW) {
    let p = new ui.OkPrompt(
      'You need to have a browser-connected Ethereum wallet to claim this token.'
    )
    return
  }

  const url =
    fireBaseServer +
    'startclaimhalloween/?id=' +
    userData.userId +
    '&server=' +
    playerRealm.serverName +
    '&realm=' +
    playerRealm.layer +
    '&stage=' +
    stage
  log('sending req to: ', url)
  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
    let data = await response.json()
    log('Claim state: ', data)
    return data
  } catch {
    log('error fetching from token server ', url)
  }
}