import { Arcade } from 'gameObjects/arcade'
import { loadPlayer, unloadPlayer } from 'player'
import {
  loadEthereumLevel,
  loadEthereumBricks,
  unloadEthereumBricks,
} from 'gameLogic/ethereumLevel'
import { GameManager } from 'gameManager'
import * as utils from '@dcl/ecs-scene-utils'
// import { scene } from "./scene"

export function addArcades() {
  // Ethereum arcade cabinets
  const arcadeEthereumShape = new GLTFShape(
    'models/core_building/arcadeCabinetEthereum.glb'
  )

  // Ethereum arcade positions and triggers
  const arcadeEthereumPos: Transform[] = [
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
    //   new Transform({
    // 	position:  new Vector3(154, 12.43, 163),
    //     rotation: Quaternion.Euler(0, 180 - 15, 0),
    //   }),
  ]
  // ISSUE: These ecs-utils triggers can't rotate but work fine for now...
  const arcadeEthereumTriggerPos: Vector3[] = [
    new Vector3(-0.33, 2, -0.5),
    new Vector3(-0.33, 2, -0.5),
    new Vector3(-0.33, 2, 0.5),
    new Vector3(-0.33, 2, 0.5),
  ]

  // Ethereum arcade cabinet
  for (let i = 0; i < arcadeEthereumPos.length; i++) {
    const arcadeCabinetEthereum = new Arcade(
      arcadeEthereumShape,
      arcadeEthereumPos[i]
    )

    // Breakout ethereum
    const ethereumGameTransform = new Entity()
    ethereumGameTransform.addComponent(
      new Transform({ position: new Vector3(-0.48, 1.38, -0.155) })
    )
    ethereumGameTransform.getComponent(Transform).scale.setAll(0.03)
    ethereumGameTransform.getComponent(Transform).rotate(Vector3.Left(), 75)
    ethereumGameTransform.setParent(arcadeCabinetEthereum)
    let arcadeCabinetEthereumTrigger = new utils.TriggerBoxShape(
      new Vector3(1.5, 3, 3),
      arcadeEthereumTriggerPos[i]
    )
    loadEthereumLevel(ethereumGameTransform)

    arcadeCabinetEthereum.addComponent(
      new utils.TriggerComponent(arcadeCabinetEthereumTrigger, {
        onCameraEnter: () => {
          if (!GameManager.hasGameLoaded) {
            loadEthereumBricks(ethereumGameTransform)
            loadPlayer(ethereumGameTransform, arcadeCabinetEthereum)
          }
        },
        onCameraExit: () => {
          if (GameManager.hasGameLoaded) {
            unloadEthereumBricks()
            unloadPlayer()
          }
        },
        enableDebug: false,
      })
    )
  }
}
