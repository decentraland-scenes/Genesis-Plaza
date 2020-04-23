// UI

import {
  boardLocation,
  ArtichokeFloatingTextShape,
  TowerFloatingTextShape,
} from './messageboard'
import { setNewMessage } from './serverHandler'

export const screenSpaceUI = new UICanvas()
screenSpaceUI.visible = true

export var UIOpenTime = 0

export function closeUI() {
  messagebg.visible = false
}

const messageTexture = new Texture('images/UI_TX.png')

export const messagebg = new UIImage(screenSpaceUI, messageTexture)
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
  setNewMessage(boardLocation, newText)
  if (boardLocation == 'artichoke') {
    ArtichokeFloatingTextShape.value = newText
  } else if (boardLocation == 'tower') {
    TowerFloatingTextShape.value = newText
  }
})

/////// CLOSE UI

// Instance the input object
const input = Input.instance

//button down event
input.subscribe('BUTTON_DOWN', ActionButton.POINTER, false, (e) => {
  const currentTime = +Date.now()
  let isOpen: boolean
  if (messagebg.visible) {
    isOpen = true
  } else {
    isOpen = false
  }

  if (isOpen && currentTime - UIOpenTime > 100) {
    closeUI()
    log('clicked on the close image ', messagebg.visible)
  }
})
