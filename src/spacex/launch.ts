import utils from '../../node_modules/decentraland-ecs-utils/index'
import { RocketVerticalSystem, ParticleSystem, rocket } from './rocket'

// Hatch sound
const hatchOpenSound = new Entity()
hatchOpenSound.addComponent(new Transform())
hatchOpenSound.getComponent(Transform).position = Camera.instance.position
hatchOpenSound.addComponent(
  new AudioSource(new AudioClip('sounds/hatchOpen.mp3'))
)
engine.addEntity(hatchOpenSound)

// Rocket sound
const rocketSound = new Entity()
rocketSound.addComponent(new Transform())
rocketSound.getComponent(Transform).position = Camera.instance.position
rocketSound.addComponent(
  new AudioSource(new AudioClip('sounds/rocketThrusters.mp3'))
)
engine.addEntity(rocketSound)

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
//       hoverText: 'TEST HATCH',
//       distance: 40,
//     }
//   )
// )

// Systems
let rocketVerticalSystem = new RocketVerticalSystem()
let particleSystem = new ParticleSystem()
let systemDestroyer = new Entity()
engine.addEntity(systemDestroyer)

// For the actual launch - run this...
export function launchSequence(): void {
  hatch.getComponent(Animator).getClip('HatchOpen').play()

  rocketSound.addComponentOrReplace(
    new utils.Delay(1500, () => {
      rocketSound.getComponent(AudioSource).playOnce() // Hear rocket firing up as the logo glows
    })
  )

  hatch.addComponentOrReplace(
    new utils.Delay(2000, () => {
      hatchOpenSound.getComponent(AudioSource).playOnce()
      engine.addSystem(rocketVerticalSystem)
      engine.addSystem(particleSystem)
    })
  )
  systemDestroyer.addComponentOrReplace(
    new utils.Delay(50000, () => {
      log('removing rocket systems')
      engine.removeEntity(rocket)
      engine.removeSystem(rocketVerticalSystem)
      engine.removeSystem(particleSystem)
    })
  )
}

engine.addEntity(hatch)
