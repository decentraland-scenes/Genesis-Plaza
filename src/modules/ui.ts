// UI

import {
  boardLocation,
  ArtichokeFloatingTextShape,
  setTowerText,
} from './messageboard'
import { setNewMessage } from './serverHandler'
import { WearableData } from './wearables'
import { Teleport } from './teleports'

export const screenSpaceUI = new UICanvas()
screenSpaceUI.visible = true

export var UIOpenTime = 0

export function closeUI() {
  messagebg.visible = false
  tBackground.visible = false
  wBackground.visible = false
}

export function updateOpenUITime() {
  UIOpenTime = +Date.now()
}

////////  MESSAGE BOARD

const messageBoardTexture = new Texture('images/inputText.png')

export let messagebg = new UIImage(screenSpaceUI, messageBoardTexture)
messagebg.visible = false

export function openMessageBoardUI() {
  updateOpenUITime()
  messagebg = new UIImage(screenSpaceUI, messageBoardTexture)
  messagebg.name = 'mmbBackground'
  messagebg.width = 1024
  messagebg.height = 1024 / 4
  messagebg.hAlign = 'center'
  messagebg.vAlign = 'center'
  messagebg.sourceLeft = 0
  messagebg.sourceTop = 0
  messagebg.sourceWidth = 1024
  messagebg.sourceHeight = 1024 / 4
  messagebg.visible = true

  const message = new UIInputText(messagebg)
  message.name = 'mbMessage'
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
}

//////// WEARABLES UI

let wBackground = new UIContainerRect(screenSpaceUI)
wBackground.visible = false

export function openWearableUI(wearable: WearableData) {
  updateOpenUITime()
  const wearableTexture = new Texture(wearable.image)

  wBackground = new UIContainerRect(screenSpaceUI)
  wBackground.name = 'wearablebackground'
  wBackground.hAlign = 'right'
  wBackground.vAlign = 'center'
  wBackground.width = 700
  wBackground.height = 700

  const icon = new UIImage(wBackground, wearableTexture)
  icon.name = 'wearableThumbnail'
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

  const name = new UIText(wBackground)
  name.name = 'wearableName'
  name.value = wearable.name
  name.vAlign = 'top'
  name.hAlign = 'center'
  name.fontSize = 50

  const desc = new UIText(wBackground)
  desc.name = 'wearableDesc'
  desc.value = wearable.wearable.description
  desc.vAlign = 'center'
  desc.hAlign = 'center'
  desc.fontSize = 25
  desc.positionY = -100

  const rarity = new UIText(wBackground)
  rarity.name = 'wearableRarity'
  rarity.value = wearable.wearable.rarity
  rarity.vAlign = 'center'
  rarity.hAlign = 'left'
  rarity.fontSize = 25
  rarity.positionY = 25

  const collection = new UIText(wBackground)
  collection.name = 'wearableCollection'
  collection.value = wearable.wearable.collection
  collection.vAlign = 'center'
  collection.hAlign = 'left'
  collection.fontSize = 25
  collection.positionY = 0

  const category = new UIText(wBackground)
  category.name = 'wearableCategory'
  category.value = wearable.wearable.category
  category.vAlign = 'center'
  category.hAlign = 'left'
  category.fontSize = 25
  category.positionY = -25

  const price = new UIText(wBackground)
  price.name = 'wearablePrice'
  price.value = String(wearable.searchOrderPrice / 1000000000000000000)
  price.vAlign = 'center'
  price.hAlign = 'left'
  price.fontSize = 25
  price.positionY = -50
}

//////// TELEPORTS UI

const teleportUITexture = new Texture('images/teleportModal.png')

let tBackground = new UIImage(screenSpaceUI, teleportUITexture)
tBackground.visible = false

export function openTeleportUI(teleport: Teleport) {
  updateOpenUITime()
  log('teleportStuff: ', teleport)
  const screenshotTexture = new Texture(teleport.screenshot)

  tBackground = new UIImage(screenSpaceUI, teleportUITexture)
  tBackground.name = 'tBackground'
  tBackground.hAlign = 'center'
  tBackground.vAlign = 'center'
  tBackground.width = 268
  tBackground.height = 182
  tBackground.positionY = -91
  tBackground.sourceLeft = 0
  tBackground.sourceTop = 52
  tBackground.sourceWidth = 268
  tBackground.sourceHeight = 182
  tBackground.visible = true

  const screenshot = new UIImage(tBackground, screenshotTexture)
  screenshot.name = 'tScreenshot'
  screenshot.hAlign = 'center'
  screenshot.vAlign = 'center'
  screenshot.width = 268
  screenshot.height = 172
  screenshot.positionY = 172 / 2 + 91
  screenshot.sourceLeft = 0
  screenshot.sourceTop = 0
  screenshot.sourceWidth = 268
  screenshot.sourceHeight = 172

  const icon = new UIImage(tBackground, teleportUITexture)
  icon.name = 'tIcon'
  icon.width = 9.67
  icon.height = 12.9
  icon.hAlign = 'center'
  icon.vAlign = 'center'
  icon.positionY = -37.57 + 91
  icon.positionX = -114.49
  icon.sourceLeft = 0
  icon.sourceTop = 0
  icon.sourceWidth = 9.67
  icon.sourceHeight = 12.9

  const name = new UIText(tBackground)
  name.name = 'tName'
  name.value = teleport.name
  name.vAlign = 'center'
  name.hAlign = 'center'
  name.vTextAlign = 'left'
  name.positionY = -12.83 + 91
  name.positionX = 14.51 - 268 / 2
  name.fontSize = 16
  name.color = Color4.Black()
  name.width = '10px'

  const desc = new UIText(tBackground)
  desc.name = 'tDesc'
  desc.value = teleport.description
  desc.vAlign = 'center'
  desc.hAlign = 'center'
  desc.vTextAlign = 'left'
  desc.fontSize = 14
  desc.positionY = -75 + 91
  desc.positionX = 14.51 - 268 / 2
  desc.color = Color4.Black()
  desc.width = '10px'

  const coordinates = new UIText(tBackground)
  coordinates.name = 'tCoords'
  coordinates.value = teleport.location
  coordinates.vAlign = 'center'
  coordinates.hAlign = 'center'
  coordinates.vTextAlign = 'left'
  coordinates.positionY = -37.57 + 91
  coordinates.positionX = 34 - 268 / 2
  coordinates.fontSize = 14
  coordinates.color = Color4.Black()
  coordinates.width = '10px'

  const button = new UIImage(tBackground, teleportUITexture)
  button.name = 'tButton'
  button.hAlign = 'center'
  button.vAlign = 'center'
  button.width = 215.15
  button.height = 40
  button.positionY = -138 + 91
  button.sourceLeft = 27
  button.sourceTop = 0
  button.sourceWidth = 215.15
  button.sourceHeight = 40
  button.onClick = new OnClick(() => {
    teleport.travel()
  })
}

/////// CLOSE UI

const allUIImages = engine.getComponentGroup(UIImage)

// Instance the input object
const input = Input.instance

//button down event
input.subscribe('BUTTON_DOWN', ActionButton.POINTER, false, (e) => {
  const currentTime = +Date.now()
  let isOpen: boolean
  if (messagebg.visible || tBackground.visible || wBackground.visible) {
    isOpen = true
  } else {
    isOpen = false
  }

  if (isOpen && currentTime - UIOpenTime > 100) {
    closeUI()
    log('clicked on the close image ', messagebg.visible)
  }
})
