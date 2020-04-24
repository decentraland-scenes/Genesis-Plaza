import { setNewMessage } from './serverHandler'
import { UIOpenTime, messagebg, updateOpenUITime } from './ui'

export let boardLocation = null

/// ARTICHOKE
const ArtichokeFloatingText = new Entity()
export let ArtichokeFloatingTextShape = new TextShape('Write something')
ArtichokeFloatingTextShape.color = Color3.FromHexString('#8040E2')
ArtichokeFloatingText.addComponent(ArtichokeFloatingTextShape)
ArtichokeFloatingText.addComponent(
  new Transform({
    position: new Vector3(48, 12.5, 39),
    scale: new Vector3(1, 1, 1),
    rotation: Quaternion.Euler(0, 180, 0),
  })
)
engine.addEntity(ArtichokeFloatingText)

// TOWER

const TowerFloatingText = new Entity()
// export let TowerFloatingTextShape = new TextShape('Write something')
// TowerFloatingTextShape.color = Color3.FromHexString('#8040E2')
// TowerFloatingText.addComponent(TowerFloatingTextShape)
TowerFloatingText.addComponent(
  new Transform({
    position: new Vector3(49.5, 37, 119),
    scale: new Vector3(13, 13, 13),
    rotation: Quaternion.Euler(0, 0, 0),
  })
)
engine.addEntity(TowerFloatingText)

let towerLetters: Entity[] = []

let maxCharacters = 26
for (let i = 0; i < maxCharacters; i++) {
  let angle = 360 - (i * 360) / maxCharacters
  let radAngle = angle * (Math.PI / 180)

  let letter = new Entity()
  letter.setParent(TowerFloatingText)
  letter.addComponent(new TextShape(''))
  letter.getComponent(TextShape).fontSize = 4
  letter.getComponent(TextShape).color = Color3.Blue() //Color3.FromHexString('#8040E2')
  letter.addComponent(
    new Transform({
      position: new Vector3(Math.sin(radAngle), 0, Math.cos(radAngle)),
      rotation: Quaternion.Euler(0, angle - 180, 0),
    })
  )
  engine.addEntity(letter)
  towerLetters.push(letter)
}

// sceneMessageBus.on('newText', x => {
//   sceneState.bannerText = x.text
//   FloatingTextShape.value = x.text
// })

let ArtichokeUIOpener = new Entity()
ArtichokeUIOpener.addComponent(new BoxShape()) // GLTFShape('models/Message.glb'))
ArtichokeUIOpener.addComponent(
  new Transform({
    position: new Vector3(42, 10, 40),
    scale: new Vector3(1, 1, 1),
  })
)
ArtichokeUIOpener.addComponent(
  new OnPointerDown(
    (e) => {
      updateOpenUITime()
      boardLocation = 'artichoke'
      messagebg.visible = true
      messagebg.isPointerBlocker = true
    },
    {
      button: ActionButton.POINTER,
      hoverText: 'Write something',
    }
  )
)
engine.addEntity(ArtichokeUIOpener)

let TowerUIOpener = new Entity()
TowerUIOpener.addComponent(new BoxShape()) // GLTFShape('models/Message.glb'))
TowerUIOpener.addComponent(
  new Transform({
    position: new Vector3(47, 2, 118.8),
    scale: new Vector3(1, 1, 1),
  })
)
TowerUIOpener.addComponent(
  new OnPointerDown(
    (e) => {
      updateOpenUITime()
      boardLocation = 'tower'
      messagebg.visible = true
      messagebg.isPointerBlocker = true
    },
    {
      button: ActionButton.POINTER,
      hoverText: 'Write something',
    }
  )
)
engine.addEntity(TowerUIOpener)

export function setTowerText(text: string) {
  let editedText = text.trim().slice(0, maxCharacters - 3)
  for (let i = 0; i <= maxCharacters - 1; i++) {
    let letter = towerLetters[i]
    let textShape = letter.getComponent(TextShape)

    if (i < editedText.length) {
      textShape.value = editedText[i]
    } else {
      textShape.value = ''
    }
  }
}

class SpinTextSystem implements ISystem {
  update(dt: number) {
    const transform = TowerFloatingText.getComponent(Transform)

    transform.rotate(Vector3.Up(), dt * 10)
  }
}

engine.addSystem(new SpinTextSystem())
