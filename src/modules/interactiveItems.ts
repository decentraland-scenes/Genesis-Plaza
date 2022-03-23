import { Sound } from './interactiveItems/sound'
import { Player } from './interactiveItems/player'
import * as ui from '@dcl/ui-scene-utils'
import { beerDispenser } from './interactiveItems/tap'
import { BeerBaseState, beerGlasses } from './interactiveItems/beerGlass'
import { barItems } from './interactiveItems/barItem'

// Multiplayer
export const sceneMessageBus = new MessageBus()

// Sound
const errorSound = new Sound(new AudioClip('sounds/interactiveItems/error.mp3'))

// Input
// Instance the input object
const input = Input.instance

input.subscribe('BUTTON_DOWN', ActionButton.PRIMARY, true, (event) => {
  log('Hit Point: ', event.hit.hitPoint)
  if (Player.holdingItem && event.hit) {
    if (event.hit.normal.y > 0.99) {
      for (let i = 0; i < beerGlasses.length; i++) {
        // Check if item has a parent
        if (beerGlasses[i].getParent()?.alive) {
          let beerPosition: Vector3
          switch (event.hit.meshName) {
            case 'redBase_collider':
              beerPosition = beerDispenser
                .getComponent(Transform)
                .position.clone()
                .subtract(new Vector3(0.31, -0.02, -0.368))
              beerGlasses[i].putDown(
                i,
                beerPosition,
                (beerGlasses[i].beerBaseState = BeerBaseState.RED_BEER)
              )
              break
            case 'yellowBase_collider':
              beerPosition = beerDispenser
                .getComponent(Transform)
                .position.clone()
                .subtract(new Vector3(0.31, -0.02, 0))
              beerGlasses[i].putDown(
                i,
                beerPosition,
                (beerGlasses[i].beerBaseState = BeerBaseState.YELLOW_BEER)
              )
              break
            case 'greenBase_collider':
              beerPosition = beerDispenser
                .getComponent(Transform)
                .position.clone()
                .subtract(new Vector3(0.31, -0.02, 0.368))
              beerGlasses[i].putDown(
                i,
                beerPosition,
                (beerGlasses[i].beerBaseState = BeerBaseState.GREEN_BEER)
              )
              break
            default:
              log('DEFAULT')
              beerGlasses[i].putDown(i, event.hit.hitPoint, BeerBaseState.NONE)
              break
          }
        }
        for (let i = 0; i < barItems.length; i++) {
          // Check if item has a parent
          if (barItems[i].getParent()?.alive) {
            barItems[i].putDown(i, event.hit.hitPoint)
          }
        }
      }
    } else {
      noSign.show(1)
      errorSound.getComponent(AudioSource).playOnce()
    }
  }
})

input.subscribe('BUTTON_DOWN', ActionButton.SECONDARY, false, () => {
  if (Player.holdingItem) {
    for (let i = 0; i < beerGlasses.length; i++) {
      // Check if item has a parent
      if (beerGlasses[i].getParent()?.alive && beerGlasses[i].isFull) {
        beerGlasses[i].drink(i)
      }
    }
  }
})

let noSign = new ui.CenterImage(
  'images/interactiveItems/no-sign.png',
  1,
  true,
  0,
  20,
  128,
  128,
  {
    sourceHeight: 512,
    sourceWidth: 512,
    sourceLeft: 0,
    sourceTop: 0,
  }
)

// Punch bag
export function addPunchBag(): void {
  const punchSound = new Sound(
    new AudioClip('sounds/interactiveItems/punch.mp3')
  )

  const punchBag = new Entity()
  punchBag.addComponent(
    new GLTFShape('models/core_building/interactiveItems/dogePunchBag.glb')
  )
  punchBag.addComponent(
    new Transform({ position: new Vector3(139.84, 10.69, 147.5) })
  )
  punchBag.getComponent(Transform).scale.setAll(0.5)
  engine.addEntity(punchBag)

  // User variables
  let forwardVector: Vector3 = Vector3.Forward().rotate(
    Camera.instance.rotation
  ) // Camera's forward vector
  let vectorScale: number = 12.5

  /// --- NEEDS REFACTORING ---
  // Allow the user to interact with the ball
  punchBag.addComponent(
    new OnPointerDown(
      (e) => {
        // Apply impulse based on the direction of the camera
        targetAnchorBody.wakeUp()
        targetAnchorBody.applyImpulse(
          new CANNON.Vec3(
            forwardVector.x * vectorScale,
            forwardVector.y * vectorScale,
            forwardVector.z * vectorScale
          ),
          new CANNON.Vec3(
            targetAnchorBody.position.x,
            targetAnchorBody.position.y,
            targetAnchorBody.position.z
          )
        )
        punchSound.getComponent(AudioSource).playOnce()
      },
      {
        button: ActionButton.ANY,
        showFeedback: true,
        hoverText: 'punch',
        distance: 4,
      }
    )
  )

  // Setup our world
  const world: CANNON.World = new CANNON.World()
  world.gravity.set(0, 10, 0) // m/s²
  world.broadphase = new CANNON.NaiveBroadphase()

  // Create a ground plane and apply physics material
  const groundBody: CANNON.Body = new CANNON.Body({
    mass: 0, // mass === 0 makes the body static
  })
  groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2) // Reorient ground plane to be in the y-axis

  const physicsMaterial = new CANNON.Material('physicsMaterial')
  const physicsContactMaterial = new CANNON.ContactMaterial(
    physicsMaterial,
    physicsMaterial,
    { friction: 0, restitution: 0.1 }
  )
  world.addContactMaterial(physicsContactMaterial)

  const groundShape: CANNON.Plane = new CANNON.Plane()
  groundBody.addShape(groundShape)
  groundBody.material = physicsMaterial
  world.addBody(groundBody)

  // Create a static body
  let fixedAnchorBody = new CANNON.Body({ mass: 0 })
  fixedAnchorBody.position.set(139.84, 10.69, 147.5)
  world.addBody(fixedAnchorBody)

  // Create target body
  let sphereShape = new CANNON.Sphere(0.2)
  let targetAnchorBody = new CANNON.Body({ mass: 5 })
  targetAnchorBody.addShape(sphereShape)
  targetAnchorBody.position.set(139.84, 10.69 + 3, 147.5)
  targetAnchorBody.sleep()
  world.addBody(targetAnchorBody)

  targetAnchorBody.linearDamping = 0.4 // Round will keep translating even with friction so you need linearDamping
  targetAnchorBody.angularDamping = 1.0 // Round bodies will keep rotating even with friction so you need angularDamping

  var spring = new CANNON.Spring(targetAnchorBody, fixedAnchorBody, {
    localAnchorA: new CANNON.Vec3(0, 0, 0),
    localAnchorB: new CANNON.Vec3(0, 0, 0),
    restLength: 0.0,
    stiffness: 50,
    damping: 8,
  })

  // Compute the force after each step
  world.addEventListener('postStep', function () {
    spring.applyForce()
  })

  const fixedTimeStep: number = 1.0 / 60.0 // seconds
  const maxSubSteps: number = 10

  class UpdateSystem implements ISystem {
    update(dt: number): void {
      world.step(fixedTimeStep, dt, maxSubSteps)

      // https://answers.unity.com/questions/24805/preventing-lookat-from-flipping.html
      let transform = punchBag.getComponent(Transform)
      let relativePos = targetAnchorBody.position.vsub(
        new CANNON.Vec3(
          transform.position.x,
          transform.position.y,
          transform.position.z
        )
      )
      transform.rotation = Quaternion.LookRotation(
        new Vector3(relativePos.x, relativePos.y, relativePos.z),
        Vector3.Forward()
      )

      // Put target anchor to sleep if its velocity is almost zero
      if (
        targetAnchorBody.velocity.almostEquals(new CANNON.Vec3(0, 0, 0), 0.02)
      )
        targetAnchorBody.sleep()

      // Update forward vector
      forwardVector = Vector3.Forward().rotate(Camera.instance.rotation)
    }
  }

  engine.addSystem(new UpdateSystem())
}
