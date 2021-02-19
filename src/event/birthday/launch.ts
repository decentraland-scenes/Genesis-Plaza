import * as utils from '@dcl/ecs-scene-utils'
import { CakeRaiseSystem, cake, CakeSparklerController } from './cake'
import { ConfettiController } from './confetti'
import { BalloonController } from './balloons'

export let cakeUp: boolean = false

export let cakeReady: boolean = false

export function setCakeReady() {
  cakeReady = true
}

// Hatch sound
const hatchOpenSound = new Entity()
hatchOpenSound.addComponent(new Transform())
hatchOpenSound.getComponent(Transform).position = Camera.instance.position
hatchOpenSound.addComponent(
  new AudioSource(new AudioClip('sounds/hatchOpen.mp3'))
)
hatchOpenSound.getComponent(AudioSource).volume=0.2
engine.addEntity(hatchOpenSound)


// Hatch
const hatch = new Entity()
hatch.addComponent(new GLTFShape('models/auditoriumHatch.glb'))
hatch.addComponent(
  new Transform({
    position: new Vector3(276.414, 2.951, 263.844),
    rotation: Quaternion.Euler(0, 180, 0),
  })
)
// Hatch open animation
hatch.addComponent(new Animator())
hatch
  .getComponent(Animator)
  .addClip(new AnimationState('HatchOpen', { looping: false }))

// !! REMOVE THIS COMPONENT FOR BEFORE DEPLOYING !!
// hatch.addComponent(
//   new OnPointerDown(
//     (): void => {
//       launchSequence()
//     },
//     {
//       button: ActionButton.POINTER,
//       hoverText: 'TEST LAUNCH',
//       distance: 40,
//     }
//   )
// )

// Systems
export let cakeRaiseSystem = new CakeRaiseSystem()

export let cakeControl = new CakeSparklerController()
export let confettiControl = new ConfettiController()
export let balloonControl = new BalloonController()

// For the actual launch - run this...
export function launchSequence(): void {
  hatch.getComponent(Animator).getClip('HatchOpen').play()

  hatch.addComponentOrReplace(
    new utils.Delay(2000, () => {
      hatchOpenSound.getComponent(AudioSource).playOnce()
      engine.addSystem(cakeRaiseSystem)
    })
  )

  //cakeSparkControl.raiseDJPlatform()

  // - cake sparklers
  //cakeSparkControl.startAllSparklers()
  //   cakeSparkControl.startTopSparklers()
  //   cakeSparkControl.startMidSparklers()
  //   cakeSparkControl.startLowSparklers()

  //   // - confetti  (duration in seconds)
  //   confettiControl.startConfetti(40)

  //   // - balloons
  //   balloonControl.startBalloons(40)

  cakeUp = true
}

engine.addEntity(hatch)

// const input = Input.instance

// input.subscribe('BUTTON_DOWN', ActionButton.PRIMARY, true, (e) => {
//   launchSequence()
// })
