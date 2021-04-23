import { Sound } from "./sound"
import { Player } from "./player"
import * as utils from "@dcl/ecs-scene-utils"
import { sceneMessageBus } from "../interactiveItems"

const pickUpSound = new Sound(new AudioClip("sounds/interactiveItems/pickUp.mp3"))
const putDownSound = new Sound(new AudioClip("sounds/interactiveItems/putDown.mp3"))

type ItemPosition = {
  id: number,
  position: Vector3
}

export class BarItem extends Entity {
  constructor(id: number, model: GLTFShape, position: Vector3, public holdPosition: Vector3, public rotatePosition: number) {
    super()
    engine.addEntity(this)
    this.addComponent(model)
    this.addComponent(new Transform({ position: position }))
    this.getComponent(Transform).scale.setAll(1.25) // SCALED ITEMS UP 25%

    this.addComponent(
      new OnPointerDown(
        (e) => {
          if (!Player.holdingItem) {
            this.pickup(id)
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

  private pickup(id: number): void {
    pickUpSound.getComponent(AudioSource).playOnce()
    this.setParent(Attachable.FIRST_PERSON_CAMERA)
    this.getComponent(Transform).rotate(Vector3.Right(), this.rotatePosition)
    this.addComponentOrReplace(
      new utils.Delay(100, () => {
        Player.holdingItem = true
      })
    )
    sceneMessageBus.emit("itemPickedUp", { id: id, position: this.holdPosition })
  }

  putDown(id: number, placePosition: Vector3): void {
    this.setParent(null)
    putDownSound.getComponent(AudioSource).playOnce()
    Player.holdingItem = false
    sceneMessageBus.emit("itemPutDown", { id: id, position: placePosition })
  }
}

sceneMessageBus.on("itemPickedUp", (itemPosition: ItemPosition) => {
  log(itemPosition.id)
  barItems[itemPosition.id].getComponent(Transform).position.set(itemPosition.position.x, itemPosition.position.y, itemPosition.position.z)
  log("Item Picked Up!")
})

sceneMessageBus.on("itemPutDown", (itemPosition: ItemPosition) => {
  log(itemPosition.id)
  barItems[itemPosition.id].getComponent(Transform).rotation.set(0, 0, 0, 1)
  barItems[itemPosition.id].getComponent(Transform).position.set(itemPosition.position.x, itemPosition.position.y, itemPosition.position.z)
  log("Item Put Down!")
})

// Bar items
const bottle02 = new BarItem(0, new GLTFShape("models/core_building/interactiveItems/barItems/Bottle_02.glb"), new Vector3(151.49, 1.32, 160.16), new Vector3(0, -0.475, 0.5), 0)
const bottle06 = new BarItem(1, new GLTFShape("models/barItems/Bottle_06.glb"), new Vector3(7.6, 1.25, 7.3), new Vector3(0, -0.475, 0.5), 0)
const bottle08 = new BarItem(2, new GLTFShape("models/barItems/Bottle_08.glb"), new Vector3(1.86, 0.8, 13.4), new Vector3(0, -0.475, 0.5), 0)
const bottle10 = new BarItem(3, new GLTFShape("models/barItems/Bottle_10.glb"), new Vector3(2.3, 0.8, 14), new Vector3(0, -0.475, 0.5), 0)
const cup02 = new BarItem(4, new GLTFShape("models/barItems/cup_02.glb"), new Vector3(13.7, 0.8, 13.8), new Vector3(0, -0.22, 0.525), -20)
const glass01 = new BarItem(5, new GLTFShape("models/barItems/glass_01.glb"), new Vector3(13.9, 0.8, 14.3), new Vector3(0, -0.275, 0.5), -10)
const glass02 = new BarItem(6, new GLTFShape("models/barItems/glass_02.glb"), new Vector3(14.5, 0.8, 2.5), new Vector3(0, -0.275, 0.5), -10)
const glass03 = new BarItem(7, new GLTFShape("models/barItems/glass_03.glb"), new Vector3(13.7, 0.8, 1.9), new Vector3(0, -0.35, 0.5), -10)
const glass04 = new BarItem(8, new GLTFShape("models/barItems/glass_04.glb"), new Vector3(2.4, 0.8, 1.5), new Vector3(0, -0.35, 0.5), -10)
const glass05 = new BarItem(9, new GLTFShape("models/barItems/glass_05.glb"), new Vector3(1.8, 0.8, 2.3), new Vector3(0, -0.35, 0.5), -10)

export const barItems: BarItem[] = [bottle02, bottle06, bottle08, bottle10, cup02, glass01, glass02, glass03, glass04, glass05]