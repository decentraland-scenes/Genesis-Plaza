// UI

import { boardLocation } from './messageboard'
import { setNewMessage } from './serverHandler'
import { WearableData, getWearableURL } from './wearables'
import { Teleport } from './teleports'
import './../extensions/entityExtensions'

export const screenSpaceUI = new UICanvas()
screenSpaceUI.visible = true

export var UIOpenTime = 0

export var UIOpener: Entity

export function closeUI() {
  messagebg.visible = false
  tBackground.visible = false
  wBackground.visible = false
}

export function checkUIOpen(): boolean {
  if (messagebg.visible || tBackground.visible || wBackground.visible) {
    return true
  } else {
    return false
  }
}

export function updateOpenUITime() {
  UIOpenTime = +Date.now()
}

////////  MESSAGE BOARD

const messageBoardTexture = new Texture('images/inputText.png')

export let messagebg = new UIImage(screenSpaceUI, messageBoardTexture)
messagebg.visible = false

export function openMessageBoardUI(opener: Entity) {
  updateOpenUITime()
  messagebg.visible = false
  UIOpener = opener

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
  })
}

//////// WEARABLES UI

const wearableTexture = new Texture('images/wearablesModal.png')
const wearableColors = new Texture('images/wearable-colors.png')

let wBackground = new UIImage(screenSpaceUI, wearableTexture)
wBackground.visible = false

export function wearableClassic(wearable: Entity) {
  updateOpenUITime()
  wBackground.visible = false
  UIOpener = wearable

  wBackground = new UIImage(screenSpaceUI, wearableTexture)
  wBackground.name = 'wearablebackground'
  wBackground.visible = true
  wBackground.positionY = 100
  wBackground.sourceTop = 0
  wBackground.sourceLeft = 0
  wBackground.sourceHeight = 45.67
  wBackground.sourceWidth = 203
  wBackground.height = 45.67
  wBackground.width = 203
  wBackground.hAlign = 'center'
  wBackground.vAlign = 'center'
}

export function wearableNotForSale(wearable: Entity) {
  updateOpenUITime()
  wBackground.visible = false
  UIOpener = wearable

  wBackground = new UIImage(screenSpaceUI, wearableTexture)
  wBackground.name = 'wearablebackground'
  wBackground.visible = true
  wBackground.positionY = 100
  wBackground.sourceTop = 58
  wBackground.sourceLeft = 0
  wBackground.sourceHeight = 45.67
  wBackground.sourceWidth = 173
  wBackground.height = 45.67
  wBackground.width = 173
  wBackground.hAlign = 'center'
  wBackground.vAlign = 'center'
}

export function openWearableUI(wearable: Entity, wearableData: WearableData) {
  updateOpenUITime()
  wBackground.visible = false
  UIOpener = wearable

  const wearableThumnail = new Texture(wearableData.image)

  let backgroundOffset = -70

  wBackground = new UIImage(screenSpaceUI, wearableTexture)
  wBackground.name = 'wearablebackground'
  wBackground.visible = true
  wBackground.positionY = backgroundOffset
  wBackground.sourceTop = 172
  wBackground.sourceLeft = 0
  wBackground.sourceHeight = 461
  wBackground.sourceWidth = 385
  wBackground.height = 461
  wBackground.width = 385
  wBackground.hAlign = 'center'
  wBackground.vAlign = 'center'

  const wRarityColor = new UIImage(wBackground, wearableColors)
  wRarityColor.name = 'wearableRarityColor'
  wRarityColor.positionY = 461 / 2 + 15 - backgroundOffset
  wRarityColor.width = 385
  wRarityColor.height = 175
  wRarityColor.hAlign = 'center'
  wRarityColor.vAlign = 'center'
  wRarityColor.sourceWidth = 385
  wRarityColor.sourceHeight = 175

  switch (wearableData.wearable.rarity) {
    case 'unique':
      wRarityColor.sourceLeft = 0
      wRarityColor.sourceTop = 0
      break
    case 'mythic':
      wRarityColor.sourceLeft = 0
      wRarityColor.sourceTop = 175
      break
    case 'legendary':
      wRarityColor.sourceLeft = 0
      wRarityColor.sourceTop = 350
      break
    case 'epic':
      wRarityColor.sourceLeft = 0
      wRarityColor.sourceTop = 350 + 175
      break
    case 'uncommon':
      wRarityColor.sourceLeft = 385
      wRarityColor.sourceTop = 350
      break
    case 'common':
      wRarityColor.sourceLeft = 385
      wRarityColor.sourceTop = 175
      break
    case 'swanky':
      wRarityColor.sourceLeft = 385
      wRarityColor.sourceTop = 175 + 350
      break
  }

  let closeIcon = new UIImage(wBackground, wearableTexture)
  closeIcon.name = 'closeIcon'
  closeIcon.visible = true
  closeIcon.positionY = 461 / 2 + 144 + 12
  closeIcon.positionX = 354 / 2
  closeIcon.sourceTop = 0
  closeIcon.sourceLeft = 219
  closeIcon.sourceHeight = 24
  closeIcon.sourceWidth = 24
  closeIcon.height = 24
  closeIcon.width = 24
  closeIcon.hAlign = 'center'
  closeIcon.vAlign = 'center'
  closeIcon.onClick = new OnClick(() => {
    closeUI()
  })

  const thumnail = new UIImage(wBackground, wearableThumnail)
  thumnail.name = 'wearableThumbnail'
  thumnail.width = 256
  thumnail.height = 256
  thumnail.hAlign = 'center'
  thumnail.vAlign = 'center'
  thumnail.positionY = 461 / 2
  thumnail.sourceLeft = 0
  thumnail.sourceTop = 0
  thumnail.sourceWidth = 256
  thumnail.sourceHeight = 256

  const name = new UIText(wBackground)
  name.name = 'wearableName'
  name.value = wearableData.name
  name.hTextAlign = 'center'
  name.vAlign = 'center'
  name.hAlign = 'center'
  name.fontSize = 16
  name.positionY = 461 / 2 + 121
  name.color = Color4.White()

  const rarity = new UIText(wBackground)
  rarity.name = 'wearableRarity'
  rarity.hTextAlign = 'center'
  rarity.value = wearableData.wearable.rarity.toLocaleUpperCase()
  rarity.vAlign = 'center'
  rarity.hAlign = 'center'
  rarity.fontSize = 16
  rarity.positionY = 461 / 2 + 142
  rarity.color = Color4.FromHexString('#FFFFFF88')

  let parsedDesc = wearableData.wearable.description
  if (parsedDesc.length > 45) {
    parsedDesc = parsedDesc.slice(0, 45) + parsedDesc.replace(/(.{45})/g, '\n')
  }

  const desc = new UIText(wBackground)
  desc.name = 'wearableDesc'
  desc.value = parsedDesc
  desc.vAlign = 'center'
  desc.hAlign = 'center'
  desc.fontSize = 15
  desc.positionY = 461 / 2 - 275
  desc.positionX = -385 / 2 + 29 + 5
  desc.width = 10
  desc.hTextAlign = 'left'
  desc.color = Color4.Black()

  let shortenedOwner =
    wearableData.owner.address.slice(0, 5) +
    '...' +
    wearableData.owner.address.slice(wearableData.owner.address.length - 4)

  const owner = new UIText(wBackground)
  owner.name = 'wearableOwner'
  owner.value = shortenedOwner
  owner.vAlign = 'center'
  owner.hAlign = 'center'
  owner.fontSize = 15
  owner.positionY = 461 / 2 - 119 + 5
  owner.positionX = -385 / 2 + 29 + 5
  owner.width = 10
  owner.hTextAlign = 'left'
  owner.color = Color4.Black()

  const collection = new UIText(wBackground)
  collection.name = 'wearableCollection'
  collection.value = wearableData.wearable.collection
  collection.vAlign = 'center'
  collection.hAlign = 'center'
  collection.fontSize = 15
  collection.positionY = 461 / 2 - 185 + 5
  collection.positionX = -385 / 2 + 29 + 5
  collection.width = 10
  collection.hTextAlign = 'left'
  collection.color = Color4.Black()

  const category = new UIText(wBackground)
  category.name = 'wearableCategory'
  category.value = wearableData.wearable.category
  category.vAlign = 'center'
  category.hAlign = 'center'
  category.fontSize = 15
  category.positionY = 461 / 2 - 185 + 5
  category.positionX = -385 / 2 + 205 + 5
  category.width = 10
  category.color = Color4.Black()

  let genderString: string
  if (wearableData.wearable.bodyShapes.length == 2) {
    genderString = 'Unisex'
  } else {
    if (wearableData.wearable.bodyShapes[0] == 'BaseMale') {
      genderString = 'Male'
    } else {
      genderString = 'Female'
    }
  }

  const gender = new UIText(wBackground)
  gender.name = 'wearableGender'
  gender.value = genderString
  gender.vAlign = 'center'
  gender.hAlign = 'center'
  gender.fontSize = 15
  gender.positionY = 461 / 2 - 210 + 5
  gender.positionX = -385 / 2 + 205 + 5
  gender.width = 10
  gender.color = Color4.Black()

  let formattedPrice = roundNumber(
    wearableData.searchOrderPrice / 1000000000000000000,
    4
  )

  const button = new UIImage(wBackground, wearableTexture)
  button.name = 'wButton'
  button.hAlign = 'center'
  button.vAlign = 'center'
  button.width = 215.15
  button.height = 40
  button.positionY = -138 + 91
  button.sourceLeft = 0
  button.sourceTop = 116
  button.sourceWidth = 322
  button.sourceHeight = 44
  button.onClick = new OnClick(() => {
    let url = getWearableURL(wearableData)
    openExternalURL(url)
    closeUI()
  })

  const price = new UIText(wBackground)
  price.name = 'wearablePrice'
  price.value = String(formattedPrice)
  price.vAlign = 'center'
  price.hAlign = 'center'
  price.fontSize = 15
  price.positionY = 461 / 2 - 395 + 6
  price.positionX = -385 / 2 + 191 + 5
  price.width = 10
  price.hTextAlign = 'left'
  price.color = Color4.White()
}

function roundNumber(num, dec) {
  let largeNum = num * Math.pow(10, dec)
  return Math.round(largeNum) / Math.pow(10, dec)
}

//////// TELEPORTS UI

const teleportUITexture = new Texture('images/teleportModal.png')

let tBackground = new UIImage(screenSpaceUI, teleportUITexture)
tBackground.visible = false

export function openTeleportUI(teleport: Teleport) {
  updateOpenUITime()
  UIOpener = teleport
  tBackground.visible = false

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
  screenshot.sourceWidth = 536
  screenshot.sourceHeight = 344

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

  if (checkUIOpen() && currentTime - UIOpenTime > 100) {
    closeUI()
    log('clicked on the close image ', messagebg.visible)
  }
})

class UIDistanceSystem implements ISystem {
  update() {
    if (checkUIOpen()) {
      let dist = distance(
        Camera.instance.position,
        UIOpener.getGlobalPosition()
      )
      log(dist)

      if (dist > 16 * 16) {
        closeUI()
      }
    }
  }
}

engine.addSystem(new UIDistanceSystem())

// Get distance
/* 
Note:
This function really returns distance squared, as it's a lot more efficient to calculate.
The square root operation is expensive and isn't really necessary if we compare the result to squared values.
We also use {x,z} not {x,y}. The y-coordinate is how high up it is.
*/
function distance(pos1: Vector3, pos2: Vector3): number {
  const a = pos1.x - pos2.x
  const b = pos1.z - pos2.z
  return a * a + b * b
}
