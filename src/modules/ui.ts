// UI

import {
  boardLocation,
  ArtichokeFloatingTextShape,
  setTowerText,
} from './messageboard'
import { setNewMessage } from './serverHandler'
import { WearableData } from './wearables'

export const screenSpaceUI = new UICanvas()
screenSpaceUI.visible = true

export var UIOpenTime = 0

export function closeUI() {
  messagebg.visible = false
}

export function updateOpenUITime() {
  UIOpenTime = +Date.now()
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
    setTowerText(newText)
  }
})

//////// WEARABLES UI

export function displayWearableUI(wearable: WearableData) {
  const wearableTexture = new Texture(wearable.image)

  const background = new UIContainerRect(screenSpaceUI)
  background.hAlign = 'right'
  background.vAlign = 'center'
  background.width = 700
  background.height = 700

  const icon = new UIImage(background, wearableTexture)
  icon.name = 'messagebackground'
  icon.width = 256
  icon.height = 256
  icon.hAlign = 'right'
  icon.vAlign = 'center'
  icon.sourceLeft = 0
  icon.sourceTop = 0
  icon.sourceWidth = 256
  icon.sourceHeight = 256
  icon.visible = true
  icon.isPointerBlocker = false

  const name = new UIText(background)
  name.value = wearable.name
  name.vAlign = 'top'
  name.hAlign = 'center'
  name.fontSize = 50

  const desc = new UIText(background)
  desc.value = wearable.wearable.description
  desc.vAlign = 'center'
  desc.hAlign = 'center'
  desc.fontSize = 25
  desc.positionY = -100

  const rarity = new UIText(background)
  rarity.value = wearable.wearable.rarity
  rarity.vAlign = 'center'
  rarity.hAlign = 'left'
  rarity.fontSize = 25
  rarity.positionY = 25

  const collection = new UIText(background)
  collection.value = wearable.wearable.collection
  collection.vAlign = 'center'
  collection.hAlign = 'left'
  collection.fontSize = 25
  collection.positionY = 0

  const category = new UIText(background)
  category.value = wearable.wearable.category
  category.vAlign = 'center'
  category.hAlign = 'left'
  category.fontSize = 25
  category.positionY = -25

  const price = new UIText(background)
  price.value = String(wearable.searchOrderPrice / 1000000000000000000)
  price.vAlign = 'center'
  price.hAlign = 'left'
  price.fontSize = 25
  price.positionY = -50
}

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
