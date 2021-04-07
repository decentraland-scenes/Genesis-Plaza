import { Arcade } from 'gameObjects/arcade'
import { loadPlayer, unloadPlayer } from 'player'
import {
  loadAtariLevel,
  loadAtariBricks,
  unloadAtariBricks,
} from 'gameLogic/atariLevel'
import { GameManager } from 'gameManager'
import * as utils from '@dcl/ecs-scene-utils'
// import { scene } from "./scene"

export function addArcades() {
  // Atari arcade cabinets
  const arcadeAtariShape = new GLTFShape(
    'models/core_building/arcadeCabinetAtari.glb'
  )

  // Atari arcade positions and triggers
  const arcadeAtariPos: Transform[] = [
    new Transform({
      position: new Vector3(167, 10.7, 164),
      rotation: Quaternion.Euler(0, 180 + 24, 0),
    }),
    new Transform({
      position: new Vector3(154, 10.7, 163),
      rotation: Quaternion.Euler(0, 180 + -24, 0),
    }),
    new Transform({
      position: new Vector3(175, 10.7, 144.7),
      rotation: Quaternion.Euler(0, 180 + 24, 0),
    }),
  ]
  // ISSUE: These ecs-utils triggers can't rotate but work fine for now...
  const arcadeAtariTriggerPos: Vector3[] = [
    new Vector3(0, 2, 0.5),
    new Vector3(0, 2, 0.5),
    new Vector3(0, 2, 0.5)
  ]

  // Atari arcade cabinet
  for (let i = 0; i < arcadeAtariPos.length; i++) {
    const arcadeCabinetAtari = new Arcade(
      arcadeAtariShape,
      arcadeAtariPos[i]
    )

    // Breakout game
    const atariGameTransform = new Entity()
    atariGameTransform.addComponent(
      new Transform({ position: new Vector3(-0.48, 1.38, -0.155) })
    )
    atariGameTransform.getComponent(Transform).scale.setAll(0.03)
    atariGameTransform.getComponent(Transform).rotate(Vector3.Left(), 75)
    atariGameTransform.setParent(arcadeCabinetAtari)
    let arcadeCabinetAtariTrigger = new utils.TriggerBoxShape(
      new Vector3(3, 3, 3),
      arcadeAtariTriggerPos[i]
    )
    loadAtariLevel(atariGameTransform)

    arcadeCabinetAtari.addComponent(
      new utils.TriggerComponent(arcadeCabinetAtariTrigger, {
        onCameraEnter: () => {
          if (!GameManager.hasGameLoaded) {
            loadAtariBricks(atariGameTransform)
            loadPlayer(atariGameTransform, arcadeCabinetAtari)
          }
        },
        onCameraExit: () => {
          if (GameManager.hasGameLoaded) {
            unloadAtariBricks()
            unloadPlayer()
          }
        },
        enableDebug: false,
      })
    )
  }
}
