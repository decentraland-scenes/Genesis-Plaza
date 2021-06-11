import * as utils from '@dcl/ecs-scene-utils'
import { Sound } from './sound'
import { Player } from './player'
import { sceneMessageBus } from '../interactiveItems'
import { pickUpSound, putDownSound } from './barItem'
import { OctoComments, octopus } from '../bar/barNPCs'

// Track player's state
export enum CalisBaseState {
  EMPTY = 'empty',
  FULL = 'full',
}

// Multiplayer
type CalisGlassState = {
  id: number
  position: Vector3
  calisState: CalisBaseState
}

// Sound
const swallowSound = new Sound(
  new AudioClip('sounds/interactiveItems/swallow.mp3')
)

export class Calis extends Entity {
  public isFull: boolean = false
  public calisBaseState: CalisBaseState = CalisBaseState.FULL

  constructor(
    public id: number,
    model: GLTFShape,
    position: Vector3,
    public holdPosition: Vector3,
    public rotatePosition: number
  ) {
    super()
    engine.addEntity(this)
    this.addComponent(model)
    this.addComponent(new Transform({ position: position }))

    this.addComponent(new Animator())
    this.getComponent(Animator).addClip(
      new AnimationState('Drink', { looping: false })
    )

    this.addComponent(
      new OnPointerDown(
        () => {
          if (!Player.holdingItem) {
            this.pickup()
          }
        },
        {
          button: ActionButton.PRIMARY,
          showFeedback: true,
          hoverText: 'pick up',
        }
      )
    )

    // this.pickup()
  }

  stopAnimations() {
    this.getComponent(Animator).getClip('Drink').stop()
  }

  pickup(): void {
    this.setParent(null)
    pickUpSound.getComponent(AudioSource).playOnce()
    this.setParent(Attachable.FIRST_PERSON_CAMERA)
    this.getComponent(Transform).rotate(Vector3.Right(), this.rotatePosition)
    this.addComponentOrReplace(
      new utils.Delay(100, () => {
        Player.holdingItem = true
      })
    )
    this.getComponent(Transform).position.set(
      this.holdPosition.x,
      this.holdPosition.y,
      this.holdPosition.z
    )

    // sceneMessageBus.emit('CalisPickedUp', {
    //   id: id,
    //   position: this.holdPosition,
    // })
  }

  putDown(placePosition: Vector3, calisBaseState: CalisBaseState): void {
    this.setParent(null)
    putDownSound.getComponent(AudioSource).playOnce()
    Player.holdingItem = false
    // sceneMessageBus.emit('CalisPutDown', {
    //   id: id,
    //   position: placePosition,
    //   beerState: beerBaseState,
    // })
    this.getComponent(Transform).rotation.set(0, 0, 0, 1)
    this.getComponent(Transform).position.set(
      placePosition.x,
      placePosition.y,
      placePosition.z
    )
  }

  drink(): void {
    swallowSound.getComponent(AudioSource).playOnce()
    //sceneMessageBus.emit('CalisDrink', { id: id })
    this.isFull = false
    this.stopAnimations()
    this.getComponent(Animator).getClip('Drink').play()
  }

  addPointerDown() {
    this.addComponent(
      new OnPointerDown(
        () => {
          if (!Player.holdingItem) {
            this.pickup()
          }
        },
        {
          button: ActionButton.PRIMARY,
          showFeedback: true,
          hoverText: 'pick up',
        }
      )
    )
  }
}

// sceneMessageBus.on('CalisPickedUp', (beerGlassState: BeerGlassState) => {
//   beerGlasses[beerGlassState.id]
//     .getComponent(Transform)
//     .position.set(
//       beerGlassState.position.x,
//       beerGlassState.position.y,
//       beerGlassState.position.z
//     )
//   beerGlasses[beerGlassState.id].beerBaseState = BeerBaseState.NONE
// })

// sceneMessageBus.on('CalisPutDown', (beerGlassState: BeerGlassState) => {
//   beerGlasses[beerGlassState.id].beerBaseState = beerGlassState.beerState
//   beerGlasses[beerGlassState.id]
//     .getComponent(Transform)
//     .rotation.set(0, 0, 0, 1)
//   beerGlasses[beerGlassState.id]
//     .getComponent(Transform)
//     .position.set(
//       beerGlassState.position.x,
//       beerGlassState.position.y,
//       beerGlassState.position.z
//     )
// })

// sceneMessageBus.on('BeerGlassDrink', (beerGlassState: BeerGlassState) => {
//   beerGlasses[beerGlassState.id].isFull = false
//   beerGlasses[beerGlassState.id].stopAnimations()
//   beerGlasses[beerGlassState.id].getComponent(Animator).getClip('Blank').play()
// })

// Beer glasses
const calisShape = new GLTFShape(
  'models/core_building/interactiveItems/Chalice_01.glb'
)

export const Calis1 = new Calis(
  0,
  calisShape,
  new Vector3(163, -8, 139),
  new Vector3(0, -0.4, 0.5),
  -10
)
