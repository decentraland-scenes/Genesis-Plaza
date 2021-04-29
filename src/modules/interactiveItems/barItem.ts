import { Sound } from "./sound"
import { Player } from "./player"
import * as utils from "@dcl/ecs-scene-utils"
import { sceneMessageBus } from "../interactiveItems"

export const pickUpSound = new Sound(new AudioClip("sounds/interactiveItems/pickUp.mp3"))
export const putDownSound = new Sound(new AudioClip("sounds/interactiveItems/putDown.mp3"))

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
    sceneMessageBus.emit("ItemPickedUp", { id: id, position: this.holdPosition })
  }

  putDown(id: number, placePosition: Vector3): void {
    this.setParent(null)
    putDownSound.getComponent(AudioSource).playOnce()
    Player.holdingItem = false
    sceneMessageBus.emit("ItemPutDown", { id: id, position: placePosition })
  }
}

sceneMessageBus.on("ItemPickedUp", (itemPosition: ItemPosition) => {
  barItems[itemPosition.id].getComponent(Transform).position.set(itemPosition.position.x, itemPosition.position.y, itemPosition.position.z)
})

sceneMessageBus.on("ItemPutDown", (itemPosition: ItemPosition) => {
  barItems[itemPosition.id].getComponent(Transform).rotation.set(0, 0, 0, 1)
  barItems[itemPosition.id].getComponent(Transform).position.set(itemPosition.position.x, itemPosition.position.y, itemPosition.position.z)
})

// Bar items
const bottle02 = new BarItem(0, new GLTFShape("models/core_building/interactiveItems/Bottle_02.glb"), new Vector3(144.30, 1.02, 163.20), new Vector3(0, -0.475, 0.5), 0)
const bottle06 = new BarItem(1, new GLTFShape("models/core_building/interactiveItems/Bottle_06.glb"), new Vector3(176.25, 1.02, 163.73), new Vector3(0, -0.475, 0.5), 0)
const bottle08 = new BarItem(2, new GLTFShape("models/core_building/interactiveItems/Bottle_08.glb"), new Vector3(173.80, 1.02, 137.71), new Vector3(0, -0.475, 0.5), 0)
const bottle10 = new BarItem(3, new GLTFShape("models/core_building/interactiveItems/Bottle_10.glb"), new Vector3(146.08, 1.14, 137.37), new Vector3(0, -0.475, 0.5), 0)
const cup02A = new BarItem(4, new GLTFShape("models/core_building/interactiveItems/cup_02.glb"), new Vector3(167.74, 1.275, 159.87), new Vector3(0, -0.22, 0.525), -20)
const cup02B = new BarItem(5, new GLTFShape("models/core_building/interactiveItems/cup_02.glb"), new Vector3(166.39, 1.275, 158.80), new Vector3(0, -0.22, 0.525), -20)
const glass01A = new BarItem(6, new GLTFShape("models/core_building/interactiveItems/glass_01.glb"), new Vector3(179.61, 11.76, 143.10), new Vector3(0, -0.275, 0.5), -10)
const glass02A = new BarItem(7, new GLTFShape("models/core_building/interactiveItems/glass_02.glb"), new Vector3(179.26, 11.76, 150.29), new Vector3(0, -0.275, 0.5), -10)
const glass03A = new BarItem(8, new GLTFShape("models/core_building/interactiveItems/glass_03.glb"), new Vector3(179.40, 11.76, 158.83), new Vector3(0, -0.35, 0.5), -10)
const glass04A = new BarItem(9, new GLTFShape("models/core_building/interactiveItems/glass_04.glb"), new Vector3(141.24, 11.76, 158.97), new Vector3(0, -0.35, 0.5), -10)
const glass05A = new BarItem(10, new GLTFShape("models/core_building/interactiveItems/glass_05.glb"), new Vector3(139.99, 11.72, 143.46), new Vector3(0, -0.35, 0.5), -10)

export const barItems: BarItem[] = [
  bottle02, 
  bottle06, 
  bottle08, 
  bottle10, 
  cup02A, 
  cup02B, 
  glass01A, 
  glass02A, 
  glass03A, 
  glass04A, 
  glass05A
]