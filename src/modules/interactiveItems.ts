import { Sound } from "./interactiveItems/sound"
import { Player } from "./interactiveItems/player"
import * as ui from "@dcl/ui-scene-utils"
import { beerDispenser } from "./interactiveItems/tap"
import { BeerBaseState, beerGlasses } from "./interactiveItems/beerGlass"
import { barItems } from "./interactiveItems/barItem"

// Multiplayer
export const sceneMessageBus = new MessageBus()

// Sound
const errorSound = new Sound(new AudioClip("sounds/interactiveItems/error.mp3"))

// Input
// Instance the input object
const input = Input.instance

input.subscribe("BUTTON_DOWN", ActionButton.PRIMARY, true, (event) => {
  // log("Hit Point: ", event.hit.hitPoint)
  if (Player.holdingItem && event.hit) {
    if (event.hit.normal.y > 0.99) {
      for (let i = 0; i < beerGlasses.length; i++) {
        // Check if item has a parent
        if (beerGlasses[i].getParent()?.alive) {
          let beerPosition: Vector3
          switch (event.hit.meshName) {
            case "redBase_collider":
              beerPosition = beerDispenser.getComponent(Transform).position.clone().subtract(new Vector3(0.31, -0.02, -0.368))
              beerGlasses[i].putDown(i, beerPosition, (beerGlasses[i].beerBaseState = BeerBaseState.RED_BEER))
              break
            case "yellowBase_collider":
              beerPosition = beerDispenser.getComponent(Transform).position.clone().subtract(new Vector3(0.31, -0.02, 0))
              beerGlasses[i].putDown(i, beerPosition, (beerGlasses[i].beerBaseState = BeerBaseState.YELLOW_BEER))
              break
            case "greenBase_collider":
              beerPosition = beerDispenser.getComponent(Transform).position.clone().subtract(new Vector3(0.31, -0.02, 0.368))
              beerGlasses[i].putDown(i, beerPosition, (beerGlasses[i].beerBaseState = BeerBaseState.GREEN_BEER))
              break
            default:
              log("DEFAULT")
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

input.subscribe("BUTTON_DOWN", ActionButton.SECONDARY, false, () => {
  if (Player.holdingItem) {
    for (let i = 0; i < beerGlasses.length; i++) {
      // Check if item has a parent
      if (beerGlasses[i].getParent()?.alive && beerGlasses[i].isFull) {
        beerGlasses[i].drink(i)
      }
    }
  }
})

let noSign = new ui.CenterImage("images/interactiveItems/no-sign.png", 1, true, 0, 20, 128, 128, {
  sourceHeight: 512,
  sourceWidth: 512,
  sourceLeft: 0,
  sourceTop: 0,
})