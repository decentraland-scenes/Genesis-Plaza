import { openMessageBoardUI } from './ui'

export let boardLocation = null

/// ARTICHOKE
const ArtichokeFloatingText = new Entity()
export let ArtichokeFloatingTextShape = new TextShape('Write something')
ArtichokeFloatingTextShape.color = Color3.FromHexString('#8040E2')
ArtichokeFloatingText.addComponent(ArtichokeFloatingTextShape)
ArtichokeFloatingText.addComponent(
  new Transform({
    position: new Vector3(47, 12.5, 37),
    scale: new Vector3(1, 1, 1),
    rotation: Quaternion.Euler(0, 180, 0),
  })
)
engine.addEntity(ArtichokeFloatingText)

// TOWER

const TowerFloatingText = new Entity()
TowerFloatingText.addComponent(
  new Transform({
    position: new Vector3(48.6, 21, 116.6),
    scale: new Vector3(1, 1, 1),
    rotation: Quaternion.Euler(0, 0, 0),
  })
)
engine.addEntity(TowerFloatingText)

const bkgModel = new Entity()

bkgModel.addComponent(new GLTFShape('models/screen-moon.glb'))
bkgModel.setParent(TowerFloatingText)

engine.addEntity(bkgModel)

let towerLetters: Entity[] = []

let distanceMultiplier = 9
let maxCharacters = 40
for (let i = 0; i < maxCharacters; i++) {
  let angle = 360 - (i * 360) / maxCharacters
  let radAngle = angle * (Math.PI / 180)

  let letter = new Entity()
  letter.setParent(TowerFloatingText)
  letter.addComponent(new TextShape(''))
  letter.getComponent(TextShape).fontSize = 22
  letter.getComponent(TextShape).color = Color3.Blue() //Color3.FromHexString('#8040E2')
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
      boardLocation = 'artichoke'
      openMessageBoardUI(ArtichokeUIOpener)
    },
    {
      button: ActionButton.POINTER,
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
      boardLocation = 'tower'
      openMessageBoardUI(TowerUIOpener)
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
