import * as utils from '@dcl/ecs-scene-utils'
import { Sound } from './sound'
import { Player } from './player'
import { sceneMessageBus } from '../interactiveItems'
import { pickUpSound, putDownSound } from './barItem'
import { OctoComments, octopus } from '../bar/barNPCs'

// Track player's state
export enum BeerBaseState {
  NONE = 'Blank',
  RED_BEER = 'PourRed',
  YELLOW_BEER = 'PourYellow',
  GREEN_BEER = 'PourGreen',
}

// Multiplayer
type BeerGlassState = {
  id: number
  position: Vector3
  beerState: BeerBaseState
}

let beerCount: number = 0

// Sound
const swallowSound = new Sound(
  new AudioClip('sounds/interactiveItems/swallow.mp3')
)

export class BeerGlass extends Entity {
  public isFull: boolean = false
  public beerBaseState: BeerBaseState = BeerBaseState.NONE

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
      new AnimationState('Blank', { looping: false })
    )
    this.getComponent(Animator).addClip(
      new AnimationState('PourRed', { looping: false })
    )
    this.getComponent(Animator).addClip(
      new AnimationState('PourYellow', { looping: false })
    )
    this.getComponent(Animator).addClip(
      new AnimationState('PourGreen', { looping: false })
    )
    this.getComponent(Animator).getClip('Blank').play()

    this.addComponent(
      new OnPointerDown(
        () => {
          if (!Player.holdingItem) {
            this.pickup(this.id)
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

  playPourAnim() {
    sceneMessageBus.emit('BeerGlassPourAnim', {
      id: this.id,
      position: this.holdPosition,
    })
  }

  stopAnimations() {
    this.getComponent(Animator).getClip('Blank').stop()
    this.getComponent(Animator).getClip('PourRed').stop()
    this.getComponent(Animator).getClip('PourYellow').stop()
    this.getComponent(Animator).getClip('PourGreen').stop()
  }

  private pickup(id: number): void {
    this.setParent(null)
    pickUpSound.getComponent(AudioSource).playOnce()
    this.setParent(Attachable.FIRST_PERSON_CAMERA)
    this.getComponent(Transform).rotate(Vector3.Right(), this.rotatePosition)
    this.addComponentOrReplace(
      new utils.Delay(100, () => {
        Player.holdingItem = true
      })
    )

    if (beerCount === 0 && !this.isFull) {
      octopus.talk(OctoComments, 'firstBeer')
      utils.setTimeout(6000, () => {
        octopus.endInteraction()
      })
    } else if (beerCount === 0 && this.isFull) {
      octopus.talk(OctoComments, 'firstServe')
      utils.setTimeout(4000, () => {
        octopus.endInteraction()
      })
    }

    sceneMessageBus.emit('BeerGlassPickedUp', {
      id: id,
      position: this.holdPosition,
    })
  }

  putDown(
    id: number,
    placePosition: Vector3,
    beerBaseState: BeerBaseState
  ): void {
    this.setParent(null)
    putDownSound.getComponent(AudioSource).playOnce()
    Player.holdingItem = false
    sceneMessageBus.emit('BeerGlassPutDown', {
      id: id,
      position: placePosition,
      beerState: beerBaseState,
    })
  }

  drink(id: number): void {
    swallowSound.getComponent(AudioSource).playOnce()
    sceneMessageBus.emit('BeerGlassDrink', { id: id })
    beerCount += 1
    if (beerCount === 3) {
      octopus.talk(OctoComments, 'thirdBeer')
      utils.setTimeout(3000, () => {
        octopus.endInteraction()
      })
    }
  }

  addPointerDown() {
    this.addComponent(
      new OnPointerDown(
        () => {
          if (!Player.holdingItem) {
            this.pickup(this.id)
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

sceneMessageBus.on('BeerGlassPickedUp', (beerGlassState: BeerGlassState) => {
  beerGlasses[beerGlassState.id]
    .getComponent(Transform)
    .position.set(
      beerGlassState.position.x,
      beerGlassState.position.y,
      beerGlassState.position.z
    )
  beerGlasses[beerGlassState.id].beerBaseState = BeerBaseState.NONE
})

sceneMessageBus.on('BeerGlassPutDown', (beerGlassState: BeerGlassState) => {
  beerGlasses[beerGlassState.id].beerBaseState = beerGlassState.beerState
  beerGlasses[beerGlassState.id]
    .getComponent(Transform)
    .rotation.set(0, 0, 0, 1)
  beerGlasses[beerGlassState.id]
    .getComponent(Transform)
    .position.set(
      beerGlassState.position.x,
      beerGlassState.position.y,
      beerGlassState.position.z
    )
})

sceneMessageBus.on('BeerGlassDrink', (beerGlassState: BeerGlassState) => {
  beerGlasses[beerGlassState.id].isFull = false
  beerGlasses[beerGlassState.id].stopAnimations()
  beerGlasses[beerGlassState.id].getComponent(Animator).getClip('Blank').play()
})

sceneMessageBus.on('BeerGlassPourAnim', (beerGlassState: BeerGlassState) => {
  beerGlasses[beerGlassState.id].isFull = true
  beerGlasses[beerGlassState.id].stopAnimations()
  beerGlasses[beerGlassState.id]
    .getComponent(Animator)
    .getClip(beerGlasses[beerGlassState.id].beerBaseState)
    .play()
  beerGlasses[beerGlassState.id].removeComponent(OnPointerDown)
  beerGlasses[beerGlassState.id].addComponent(
    new utils.Delay(2500, () => {
      beerGlasses[beerGlassState.id].addPointerDown()
    })
  )
})

// Beer glasses
const beerGlassShape = new GLTFShape(
  'models/core_building/interactiveItems/beerGlass.glb'
)

const beerGlass1 = new BeerGlass(
  0,
  beerGlassShape,
  new Vector3(163.77, 1.28, 139.87),
  new Vector3(0, -0.4, 0.5),
  -10
)
const beerGlass2 = new BeerGlass(
  1,
  beerGlassShape,
  new Vector3(156.32, 1.28, 140.2),
  new Vector3(0, -0.4, 0.5),
  -10
)
const beerGlass3 = new BeerGlass(
  2,
  beerGlassShape,
  new Vector3(149.28, 1.27, 145.76),
  new Vector3(0, -0.4, 0.5),
  -10
)
const beerGlass4 = new BeerGlass(
  3,
  beerGlassShape,
  new Vector3(151.1, 1.27, 145.61),
  new Vector3(0, -0.4, 0.5),
  -10
)
const beerGlass5 = new BeerGlass(
  4,
  beerGlassShape,
  new Vector3(151.77, 1.27, 160.54),
  new Vector3(0, -0.4, 0.5),
  -10
)
const beerGlass6 = new BeerGlass(
  5,
  beerGlassShape,
  new Vector3(153.07, 1.27, 159.2),
  new Vector3(0, -0.4, 0.5),
  -10
)
const beerGlass7 = new BeerGlass(
  6,
  beerGlassShape,
  new Vector3(169.91, 1.28, 145.48),
  new Vector3(0, -0.4, 0.5),
  -10
)
const beerGlass8 = new BeerGlass(
  7,
  beerGlassShape,
  new Vector3(168.15, 1.28, 145.75),
  new Vector3(0, -0.4, 0.5),
  -10
)

export const beerGlasses: BeerGlass[] = [
  beerGlass1,
  beerGlass2,
  beerGlass3,
  beerGlass4,
  beerGlass5,
  beerGlass6,
  beerGlass7,
  beerGlass8,
]
