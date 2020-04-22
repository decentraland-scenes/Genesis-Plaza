import { screenSpaceUI, sceneMessageBus, UIOpenTime } from '../game'

const FloatingText = new Entity()
export let FloatingTextShape = new TextShape('Write something')
FloatingTextShape.color = Color3.FromHexString('#8040E2')
FloatingText.addComponent(FloatingTextShape)
FloatingText.addComponent(
  new Transform({
    position: new Vector3(4, 2.5, 4),
    scale: new Vector3(1, 1, 1),
    rotation: Quaternion.Euler(0, 180, 0),
  })
)
engine.addEntity(FloatingText)

const messageTexture = new Texture('images/UI_TX.png')

const messagebg = new UIImage(screenSpaceUI, messageTexture)
messagebg.name = 'messagebackground'
messagebg.width = 1024
messagebg.height = 1024 / 4
messagebg.hAlign = 'center'
messagebg.vAlign = 'center'
messagebg.sourceLeft = 0
messagebg.sourceTop = 0
messagebg.sourceWidth = 1024
messagebg.sourceHeight = 1024 / 4
messagebg.visible = false
messagebg.isPointerBlocker = false

export const message = new UIInputText(messagebg)
message.name = 'message'
message.width = '650px'
message.height = '100px'
message.hAlign = 'center'
message.vAlign = 'center'
message.positionY = -30
message.fontSize = 30
message.vTextAlign = 'center'
message.hTextAlign = 'center'
message.color = Color4.FromHexString('#53508F88')
message.placeholder = 'Write something'

message.isPointerBlocker = true
message.visible = true
message.onTextSubmit = new OnTextSubmit((x) => {
  //FloatingTextShape.value = x.text
  let newText = x.text.substr(0, 50)
  sceneMessageBus.emit('newText', { text: newText })
})

// sceneMessageBus.on('newText', x => {
//   sceneState.bannerText = x.text
//   FloatingTextShape.value = x.text
// })

let UIOpener = new Entity()
UIOpener.addComponent(new GLTFShape('models/Message.glb'))
UIOpener.addComponent(
  new Transform({
    position: new Vector3(8, 0, 8),
    scale: new Vector3(1, 1, 1),
  })
)
UIOpener.addComponent(
  new OnPointerDown(
    (e) => {
      UIOpenTime = +Date.now()
      messagebg.visible = true
      messagebg.isPointerBlocker = true
    },
    {
      button: ActionButton.POINTER,
      hoverText: 'Write something',
    }
  )
)
engine.addEntity(UIOpener)
