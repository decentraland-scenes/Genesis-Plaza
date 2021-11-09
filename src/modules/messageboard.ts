import { openMessageBoardUI } from './ui'
import {
  CheckServer,
  sceneMessageBus,
  updateMessageBoards,
} from './serverHandler'
import * as utils from '@dcl/ecs-scene-utils'

let SFHeavyFont = new Font(Fonts.SanFrancisco_Heavy)

export enum MessageBoards {
  ARTICHOKE = 'artichoke',
  TOWER = 'tower',
}

/// ARTICHOKE
export let ArtichokeFloatingTextShape = new TextShape('Write something')

// TOWER

let towerLetters: Entity[] = []
let distanceMultiplier = 9
let maxCharacters = 40

export function setTowerText(text: string) {
  if (towerLetters.length < 1) return
  for (let i = 0; i <= maxCharacters - 1; i++) {
    let letter = towerLetters[i]
    let textShape = letter.getComponent(TextShape)

    if (i < text.length) {
      textShape.value = text[i]
    } else {
      textShape.value = ''
    }
  }
}

//// FETCH CURRENT MESSAGES EN MESSAGE BOARDS
// how often to refresh scene, in seconds
const messageRefreshInterval: number = 30
// start system
export let serverChecker = new CheckServer(messageRefreshInterval)

export function startMessageBoards() {
  let ArtichokeUIOpener = new Entity()
  ArtichokeUIOpener.addComponent(new GLTFShape('models/artichoke_message.glb')) // GLTFShape('models/Message.glb'))
  ArtichokeUIOpener.addComponent(
    new Transform({
      position: new Vector3(42, 8.4, 43),
      scale: new Vector3(1, 1, 1),
    })
  )
  ArtichokeUIOpener.addComponent(
    new OnPointerDown(
      (e) => {
        openMessageBoardUI(ArtichokeUIOpener, MessageBoards.ARTICHOKE)
      },
      {
        button: ActionButton.PRIMARY,
        hoverText: 'Write something',
      }
    )
  )
  engine.addEntity(ArtichokeUIOpener)

  let TowerUIOpener = new Entity()
  TowerUIOpener.addComponent(new GLTFShape('models/message_booth.glb'))
  TowerUIOpener.addComponent(
    new Transform({
      position: new Vector3(43.8, 37.4, 122.4),
      scale: new Vector3(1, 1, 1),
    })
  )
  TowerUIOpener.addComponent(
    new OnPointerDown(
      (e) => {
        openMessageBoardUI(TowerUIOpener, MessageBoards.TOWER)
      },
      {
        button: ActionButton.PRIMARY,
        hoverText: 'Write something',
      }
    )
  )
  engine.addEntity(TowerUIOpener)

  const TowerFloatingText = new Entity()
  TowerFloatingText.addComponent(
    new Transform({
      position: new Vector3(48.6, 21, 116.6),
      scale: new Vector3(1, 1, 1),
      rotation: Quaternion.Euler(0, 0, 0),
    })
  )
  engine.addEntity(TowerFloatingText)

  for (let i = 0; i < maxCharacters; i++) {
    let angle = 360 - (i * 360) / maxCharacters
    let radAngle = angle * (Math.PI / 180)

    let letter = new Entity()
    letter.setParent(TowerFloatingText)
    letter.addComponent(new TextShape(''))
    letter.getComponent(TextShape).fontSize = 22
    letter.getComponent(TextShape).color = Color3.White() //Color3.Blue()
    letter.getComponent(TextShape).font = SFHeavyFont
    letter.addComponent(
      new Transform({
        position: new Vector3(
          Math.sin(radAngle) * distanceMultiplier,
          0,
          Math.cos(radAngle) * distanceMultiplier
        ),
        rotation: Quaternion.Euler(0, angle - 180, 0),
      })
    )
    engine.addEntity(letter)
    towerLetters.push(letter)
  }

  const bkgModel = new Entity()

  bkgModel.addComponent(new GLTFShape('models/screen-moon.glb'))
  bkgModel.setParent(TowerFloatingText)
  engine.addEntity(bkgModel)

  /// ARTICHOKE
  const ArtichokeFloatingText = new Entity()
  ArtichokeFloatingTextShape.color = Color3.FromHexString('#8040E2')
  ArtichokeFloatingTextShape.font = SFHeavyFont
  ArtichokeFloatingText.addComponent(ArtichokeFloatingTextShape)
  ArtichokeFloatingText.addComponent(
    new Transform({
      position: new Vector3(51, 15.5, 31.7),
      scale: new Vector3(1, 1, 1),
      rotation: Quaternion.Euler(0, 180, 0),
    })
  )
  engine.addEntity(ArtichokeFloatingText)

  ArtichokeFloatingText.getComponent(Transform).rotate(
    new Vector3(1, 0, 0),
    -15
  )

  class SpinTextSystem implements ISystem {
    update(dt: number) {
      const transform = TowerFloatingText.getComponent(Transform)

      transform.rotate(Vector3.Up(), dt * 10)
    }
  }

  sceneMessageBus.on('towerMessage', (e) => {
    utils.setTimeout(500, () => {
      updateMessageBoards()
    })

    // setTowerText(e.text)
  })

  sceneMessageBus.on('artichokeMessage', (e) => {
    utils.setTimeout(500, () => {
      updateMessageBoards()
    })
    // ArtichokeFloatingTextShape.value = e.text
  })

  engine.addSystem(new SpinTextSystem())

  engine.addSystem(serverChecker)
}
