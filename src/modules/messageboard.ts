import { sceneMessageBus } from '../game'
import { setNewMessage } from './serverHandler'
import { UIOpenTime, messagebg } from './ui'

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
export let TowerFloatingTextShape = new TextShape('Write something')
TowerFloatingTextShape.color = Color3.FromHexString('#8040E2')
TowerFloatingText.addComponent(TowerFloatingTextShape)
TowerFloatingText.addComponent(
  new Transform({
    position: new Vector3(50, 20, 119),
    scale: new Vector3(5, 5, 5),
    rotation: Quaternion.Euler(0, 180, 0),
  })
)
engine.addEntity(TowerFloatingText)

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
      UIOpenTime = +Date.now()
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
      UIOpenTime = +Date.now()
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
