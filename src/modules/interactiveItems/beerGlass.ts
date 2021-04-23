import * as utils from "@dcl/ecs-scene-utils"
import { Sound } from "./sound"
import { Player } from "./player"
import { sceneMessageBus } from "../interactiveItems"

// Track player's state
export enum BeerBaseState {
  NONE = "Blank",
  RED_BEER = "PourRed",
  YELLOW_BEER = "PourYellow",
  GREEN_BEER = "PourGreen",
}

// Multiplayer
type BeerGlassState = {
  id: number,
  position: Vector3,
  beerState: BeerBaseState
}

// Sound
const pickUpSound = new Sound(new AudioClip("sounds/pickUp.mp3"))
const putDownSound = new Sound(new AudioClip("sounds/putDown.mp3"))
const swallowSound = new Sound(new AudioClip("sounds/swallow.mp3"))

export class BeerGlass extends Entity {
  public isFull: boolean = false
  public beerBaseState: BeerBaseState = BeerBaseState.NONE

  constructor(public id: number, model: GLTFShape, position: Vector3, public holdPosition: Vector3, public rotatePosition: number) {
    super()
    engine.addEntity(this)
    this.addComponent(model)
    this.addComponent(new Transform({ position: position }))

    this.addComponent(new Animator())
    this.getComponent(Animator).addClip(new AnimationState("Blank", { looping: false }))
    this.getComponent(Animator).addClip(new AnimationState("PourRed", { looping: false }))
    this.getComponent(Animator).addClip(new AnimationState("PourYellow", { looping: false }))
    this.getComponent(Animator).addClip(new AnimationState("PourGreen", { looping: false }))
    this.getComponent(Animator).getClip("Blank").play()

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
          hoverText: "pick up",
        }
      )
    )
  }

  playPourAnim() {
    sceneMessageBus.emit("BeerGlassPourAnim", { id: this.id, position: this.holdPosition })
  }

  stopAnimations() {
    this.getComponent(Animator).getClip("Blank").stop()
    this.getComponent(Animator).getClip("PourRed").stop()
    this.getComponent(Animator).getClip("PourYellow").stop()
    this.getComponent(Animator).getClip("PourGreen").stop()
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
    sceneMessageBus.emit("BeerGlassPickedUp", { id: id, position: this.holdPosition })
  }

  putDown(id: number, placePosition: Vector3, beerBaseState: BeerBaseState): void {
    this.setParent(null)
    putDownSound.getComponent(AudioSource).playOnce()
    Player.holdingItem = false
    sceneMessageBus.emit("BeerGlassPutDown", { id: id, position: placePosition, beerState: beerBaseState })
  }

  drink(id: number): void {
    swallowSound.getComponent(AudioSource).playOnce()
    sceneMessageBus.emit("BeerGlassDrink", { id: id })
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
          hoverText: "pick up",
        }
      )
    )
  }
}

sceneMessageBus.on("BeerGlassPickedUp", (beerGlassState: BeerGlassState) => {
  log(beerGlassState.id)
  beerGlasses[beerGlassState.id].getComponent(Transform).position.set(beerGlassState.position.x, beerGlassState.position.y, beerGlassState.position.z)
  beerGlasses[beerGlassState.id].beerBaseState = BeerBaseState.NONE
  log("Beer Glass Picked Up!")
})

sceneMessageBus.on("BeerGlassPutDown", (beerGlassState: BeerGlassState) => {
  log(beerGlassState.id)
  beerGlasses[beerGlassState.id].beerBaseState = beerGlassState.beerState
  beerGlasses[beerGlassState.id].getComponent(Transform).rotation.set(0, 0, 0, 1)
  beerGlasses[beerGlassState.id].getComponent(Transform).position.set(beerGlassState.position.x, beerGlassState.position.y, beerGlassState.position.z)
  log("Beer Glass Put Down!")
})

sceneMessageBus.on("BeerGlassDrink", (beerGlassState: BeerGlassState) => {
  log(beerGlassState.id)
  beerGlasses[beerGlassState.id].isFull = false
  beerGlasses[beerGlassState.id].stopAnimations()
  beerGlasses[beerGlassState.id].getComponent(Animator).getClip("Blank").play()
  log("Beer Glass Drank!")
})

sceneMessageBus.on("BeerGlassPourAnim", (beerGlassState: BeerGlassState) => {
  log(beerGlassState.id)
  beerGlasses[beerGlassState.id].isFull = true
  beerGlasses[beerGlassState.id].stopAnimations()
  beerGlasses[beerGlassState.id].getComponent(Animator).getClip(beerGlasses[beerGlassState.id].beerBaseState).play()
  beerGlasses[beerGlassState.id].removeComponent(OnPointerDown)
  beerGlasses[beerGlassState.id].addComponent(
    new utils.Delay(2500, () => {
      beerGlasses[beerGlassState.id].addPointerDown()
    })
  )
})

// Beer glasses
const beerGlassShape = new GLTFShape("models/dispenser/beerGlass.gltf")

const beerGlass1 = new BeerGlass(0, beerGlassShape, new Vector3(8.3, 1.25, 8), new Vector3(0, -0.4, 0.5), -10)
const beerGlass2 = new BeerGlass(1, beerGlassShape, new Vector3(7.8, 1.25, 8.3), new Vector3(0, -0.4, 0.5), -10)
const beerGlass3 = new BeerGlass(2, beerGlassShape, new Vector3(1.86, 0.8, 13.4), new Vector3(0, -0.4, 0.5), -10)
const beerGlass4 = new BeerGlass(3, beerGlassShape, new Vector3(2.3, 0.8, 14), new Vector3(0, -0.4, 0.5), -10)
const beerGlass5 = new BeerGlass(4, beerGlassShape, new Vector3(13.7, 0.8, 13.8), new Vector3(0, -0.4, 0.5), -10)
const beerGlass6 = new BeerGlass(5, beerGlassShape, new Vector3(13.9, 0.8, 14.3), new Vector3(0, -0.4, 0.5), -10)
const beerGlass7 = new BeerGlass(6, beerGlassShape, new Vector3(14.5, 0.8, 2.5), new Vector3(0, -0.4, 0.5), -10)
const beerGlass8 = new BeerGlass(7, beerGlassShape, new Vector3(13.7, 0.8, 1.9), new Vector3(0, -0.4, 0.5), -10)
const beerGlass9 = new BeerGlass(8, beerGlassShape, new Vector3(2.4, 0.8, 1.5), new Vector3(0, -0.4, 0.5), -10)
const beerGlass10 = new BeerGlass(9, beerGlassShape, new Vector3(1.8, 0.8, 2.3), new Vector3(0, -0.4, 0.5), -10)

export const beerGlasses: BeerGlass[] = [beerGlass1, beerGlass2, beerGlass3, beerGlass4, beerGlass5, beerGlass6, beerGlass7, beerGlass8, beerGlass9, beerGlass10]
