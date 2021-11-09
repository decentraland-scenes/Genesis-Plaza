import * as utils from '@dcl/ecs-scene-utils'
import * as ui from '@dcl/ui-scene-utils'
import { Sound } from './sound'
import { Player } from './player'
import { pickUpSound, putDownSound } from './barItem'
import { PredefinedEmote, triggerEmote } from '@decentraland/RestrictedActions'
import { octoTrip } from '../bar/barNPCs'

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

export class Calis extends Entity {
  //   public isFull: boolean = false
  public calisBaseState: CalisBaseState = CalisBaseState.FULL
  public danceSystem: Danceystem

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

    this.addComponent(new AudioSource(new AudioClip('sounds/drink.mp3')))
    // this.addComponent(new Animator())
    // this.getComponent(Animator).addClip(
    //   new AnimationState('Drink', { looping: false })
    // )

    // this.addComponent(
    //   new OnPointerDown(
    //     () => {
    //       if (!Player.holdingItem) {
    //         this.pickup()
    //       }
    //     },
    //     {
    //       button: ActionButton.PRIMARY,
    //       showFeedback: true,
    //       hoverText: 'pick up',
    //     }
    //   )
    // )

    // this.pickup()
  }

  //   stopAnimations() {
  //     this.getComponent(Animator).getClip('Drink').stop()
  //   }

  pickup(extraFunction?: () => void): void {
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

    if (!this.danceSystem) {
      Input.instance.subscribe(
        'BUTTON_DOWN',
        ActionButton.SECONDARY,
        false,
        (e) => {
          this.drink()
          extraFunction()
        }
      )
    }

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
    // swallowSound.playAudioOnceAtPosition(Camera.instance.position.clone())
    this.getComponent(AudioSource).playOnce()
    //sceneMessageBus.emit('CalisDrink', { id: id })
    // this.isFull = false
    // this.stopAnimations()
    // this.getComponent(Animator).getClip('Drink').play()

    octoTrip()

    if (!this.danceSystem) {
      utils.setTimeout(1000, () => {
        this.danceSystem = new Danceystem()
        engine.addSystem(this.danceSystem)
      })
    }
  }

  //   addPointerDown() {
  //     this.addComponent(
  //       new OnPointerDown(
  //         () => {
  //           if (!Player.holdingItem) {
  //             this.pickup()
  //           }
  //         },
  //         {
  //           button: ActionButton.PRIMARY,
  //           showFeedback: true,
  //           hoverText: 'pick up',
  //         }
  //       )
  //     )
  //   }
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
  'models/core_building/interactiveItems/calisFull.glb'
)

export const Calis1 = new Calis(
  0,
  calisShape,
  new Vector3(163, -8, 139),
  new Vector3(0, -0.5, 0.65),
  -10
)

// Wait System
export class Danceystem implements ISystem {
  timer: number = 0
  sintime: number = 0
  interval: number = 11
  pink: UIImage
  pinkYpos: number = 0
  update(dt: number) {
    this.timer += dt
    this.sintime += dt
    this.pinkYpos = 150 - Math.sin(this.sintime) * 100

    this.pink.positionY = this.pinkYpos
    if (this.timer >= this.interval) {
      this.timer = 0
      triggerEmote({ predefined: PredefinedEmote.HAMMER })
    }
  }
  activate() {
    let canvas = ui.canvas
    canvas.visible = false
    let pinkTexture = new Texture('images/ui/pink4.png', {
      hasAlpha: true,
    })

    // THIS LINE BREAKS WHOLE SCENE!
    // setStreamVolume(0.5)

    this.pink = new UIImage(canvas, pinkTexture)

    this.pink.isPointerBlocker = false
    this.pink.width = '100%'
    this.pink.height = 800
    this.pink.positionY = 100
    this.pink.hAlign = 'center'
    this.pink.vAlign = 'center'
    this.pink.sourceWidth = 32
    this.pink.sourceHeight = 800
    canvas.visible = true
    triggerEmote({ predefined: PredefinedEmote.HAMMER })
  }
}

//engine.addSystem(new Danceystem())
