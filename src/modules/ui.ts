import { setNewMessage } from './serverHandler'
import { WearableData, getWearableURL } from './wearables'
import './../extensions/entityExtensions'
import { MessageBoards } from './messageboard'
import resources from '../resources'
import { canvas } from 'node_modules/@dcl/npc-scene-utils/dist/utils/default-ui-components'

export const screenSpaceUI = new UICanvas()
screenSpaceUI.visible = true

export var UIOpenTime = 0

export var UIOpener: Entity

// Open dialog sound
export const openDialogSound = new Entity()
openDialogSound.addComponent(new Transform())
engine.addEntity(openDialogSound)

export function playOpenSound() {
  if (!openDialogSound.hasComponent(AudioSource)) {
    openDialogSound.addComponent(
      new AudioSource(resources.sounds.ui.navigationForward)
    )
    openDialogSound.setParent(Attachable.AVATAR)
  }
  openDialogSound.getComponent(AudioSource).playOnce()
}

// Close dialog sound
export const closeDialogSound = new Entity()
closeDialogSound.addComponent(new Transform())
engine.addEntity(closeDialogSound)

export function playCloseSound() {
  if (!closeDialogSound.hasComponent(AudioSource)) {
    closeDialogSound.addComponent(
      closeDialogSound.addComponent(
        new AudioSource(resources.sounds.ui.navigationBackward)
      )
    )
    closeDialogSound.setParent(Attachable.AVATAR)
  }
  closeDialogSound.getComponent(AudioSource).playOnce()
}

export function closeUI() {
  messagebg.visible = false
  wBackground.visible = false
}

export function checkUIOpen(): boolean {
  if (messagebg.visible || wBackground.visible) {
    return true
  } else {
    return false
  }
}

export function updateOpenUITime() {
  UIOpenTime = +Date.now()
}

export function setUiOpener(ent: Entity) {
  UIOpener = ent
}

let SFFont = new Font(Fonts.SanFrancisco)

let SFHeavyFont = new Font(Fonts.SanFrancisco_Heavy)

////////  MESSAGE BOARD

const messageBoardTexture = new Texture('images/inputText.png')

export let messagebg = new UIImage(screenSpaceUI, messageBoardTexture)
messagebg.visible = false

export function openMessageBoardUI(
  opener: Entity,
  boardLocation: MessageBoards
) {
  updateOpenUITime()
  messagebg.visible = false
  UIOpener = opener
  playOpenSound()

  messagebg = new UIImage(screenSpaceUI, messageBoardTexture)
  messagebg.name = 'mmbBackground'
  messagebg.width = 998
  messagebg.height = 261
  messagebg.hAlign = 'center'
  messagebg.vAlign = 'center'
  messagebg.sourceLeft = 13
  messagebg.sourceTop = 0
  messagebg.sourceWidth = 998
  messagebg.sourceHeight = 261
  messagebg.visible = true

  const message = new UIInputText(messagebg)
  message.name = 'mbMessage'
  message.width = '677px'
  message.height = '74'
  message.hAlign = 'center'
  message.vAlign = 'center'
  message.positionY = 130.5 - 129 - 37
  message.fontSize = 30
  message.vTextAlign = 'center'
  message.hTextAlign = 'center'
  message.color = Color4.FromHexString('#53508F88')
  message.placeholder = 'Write something'

  message.isPointerBlocker = true
  message.visible = true
  message.onTextSubmit = new OnTextSubmit((x) => {
    let newText = x.text.substr(0, 50)
    setNewMessage(boardLocation, newText)
    openMessageBoardConfirmation(opener)
  })
}

export function openMessageBoardConfirmation(opener: Entity) {
  updateOpenUITime()
  messagebg.visible = false
  UIOpener = opener
  playOpenSound()

  messagebg = new UIImage(screenSpaceUI, messageBoardTexture)
  messagebg.name = 'mmbBackground'
  messagebg.width = 848
  messagebg.height = 177
  messagebg.hAlign = 'center'
  messagebg.vAlign = 'center'
  messagebg.sourceLeft = 78
  messagebg.sourceTop = 323
  messagebg.sourceWidth = 848
  messagebg.sourceHeight = 177
  messagebg.visible = true
}

//////// WEARABLES UI

const wearableTexture = new Texture('images/wearablesModal.png')
const wearableColors = new Texture('images/wearable-colors.png')
const loadingIcon = new Texture('images/clockIcon.png')

let wBackground = new UIImage(screenSpaceUI, wearableTexture)
wBackground.visible = false

export function openLoadingUI() {
  updateOpenUITime()
  wBackground.visible = false
  wBackground = new UIImage(screenSpaceUI, loadingIcon)
  wBackground.visible = true
  wBackground.sourceTop = 0
  wBackground.sourceLeft = 0
  wBackground.sourceHeight = 58
  wBackground.sourceWidth = 36
  wBackground.height = 58
  wBackground.width = 36
  wBackground.hAlign = 'center'
  wBackground.vAlign = 'center'
}

export function wearableClassic(wearable: Entity) {
  updateOpenUITime()
  wBackground.visible = false
  UIOpener = wearable
  playOpenSound()

  wBackground = new UIImage(screenSpaceUI, wearableTexture)
  wBackground.name = 'wearablebackground'
  wBackground.visible = true
  wBackground.positionY = 100
  wBackground.sourceTop = 14
  wBackground.sourceLeft = 16
  wBackground.sourceHeight = 48
  wBackground.sourceWidth = 301
  wBackground.height = 48
  wBackground.width = 301
  wBackground.hAlign = 'center'
  wBackground.vAlign = 'center'
}

export function wearableNotForSale(wearable: Entity) {
  updateOpenUITime()
  wBackground.visible = false
  UIOpener = wearable
  playOpenSound()

  wBackground = new UIImage(screenSpaceUI, wearableTexture)
  wBackground.name = 'wearablebackground'
  wBackground.visible = true
  wBackground.positionY = 100
  wBackground.sourceTop = 75
  wBackground.sourceLeft = 13
  wBackground.sourceHeight = 54
  wBackground.sourceWidth = 255
  wBackground.height = 48
  wBackground.width = 249
  wBackground.hAlign = 'center'
  wBackground.vAlign = 'center'
}

export function openWearableUI(wearable: Entity, wearableData: WearableData) {
  updateOpenUITime()
  wBackground.visible = false
  UIOpener = wearable
  playOpenSound()

  const wearableThumnail = new Texture(wearableData.image)

  let backgroundOffset = -70

  wBackground = new UIImage(screenSpaceUI, wearableTexture)
  wBackground.name = 'wearablebackground'
  wBackground.visible = true
  wBackground.positionY = backgroundOffset
  wBackground.sourceTop = 186
  wBackground.sourceLeft = 6
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
    case 'rare':
      wRarityColor.sourceLeft = 385
      wRarityColor.sourceTop = 175 + 350
      break
    case 'swanky': // redundant, but left just in case
      wRarityColor.sourceLeft = 385
      wRarityColor.sourceTop = 175 + 350
      break
  }

  let closeIcon = new UIImage(wBackground, wearableTexture)
  closeIcon.name = 'closeIcon'
  closeIcon.visible = true
  closeIcon.positionY = 461 / 2 + 144 + 12
  closeIcon.positionX = 354 / 2
  closeIcon.sourceTop = 4
  closeIcon.sourceLeft = 328
  closeIcon.sourceHeight = 24
  closeIcon.sourceWidth = 24
  closeIcon.height = 24
  closeIcon.width = 24
  closeIcon.hAlign = 'center'
  closeIcon.vAlign = 'center'
  closeIcon.onClick = new OnClick(() => {
    playCloseSound()
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
  name.font = SFHeavyFont

  const rarity = new UIText(wBackground)
  rarity.name = 'wearableRarity'
  rarity.hTextAlign = 'center'
  rarity.value = wearableData.wearable.rarity.toLocaleUpperCase()
  rarity.vAlign = 'center'
  rarity.hAlign = 'center'
  rarity.fontSize = 16
  rarity.positionY = 461 / 2 + 142
  rarity.color = Color4.FromHexString('#FFFFFF88')
  rarity.font = SFHeavyFont

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
  desc.font = SFFont

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
  owner.font = SFFont

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
  collection.font = SFFont

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
  category.font = SFFont

  let genderString: string
  if (wearableData.wearable.bodyShapes.length === 2) {
    genderString = 'Unisex'
  } else {
    if (wearableData.wearable.bodyShapes[0] === 'BaseMale') {
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
  gender.font = SFFont

  let formattedPrice = roundNumber(
    wearableData.searchOrderPrice / 1000000000000000000,
    4
  )

  const button = new UIImage(wBackground, wearableTexture)
  button.name = 'wButton'
  button.hAlign = 'center'
  button.vAlign = 'center'
  button.width = 322
  button.height = 44
  button.positionY = 461 / 2 - 395 - 20 + 9
  button.sourceLeft = 6
  button.sourceTop = 138
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
  price.positionX = -385 / 2 + 191 + 5 + 20
  price.width = 10
  price.hTextAlign = 'left'
  price.color = Color4.White()
  price.font = SFFont
}

function roundNumber(num, dec) {
  let largeNum = num * Math.pow(10, dec)
  return Math.round(largeNum) / Math.pow(10, dec)
}

// TELEPORT BEAM UI
const beamUIBGTexture = new Texture('images/ui_beam_up_bg.png')

let teleportUIContainer = new UIContainerRect(screenSpaceUI)
teleportUIContainer.width = '40%'
teleportUIContainer.vAlign = 'top'
teleportUIContainer.height = '20%'
teleportUIContainer.isPointerBlocker = false

let teleportUIBG = new UIImage(teleportUIContainer, beamUIBGTexture)
teleportUIBG.sourceLeft = 0
teleportUIBG.sourceTop = 0
teleportUIBG.sourceWidth = 512
teleportUIBG.sourceHeight = 256
teleportUIBG.width = '256px'
teleportUIBG.height = '128px'

let teleportCountdownText = new UIText(teleportUIContainer)
teleportCountdownText.value = '3'
teleportCountdownText.fontSize = 32
teleportCountdownText.color = Color4.Black()
teleportCountdownText.font = new Font(Fonts.SanFrancisco_Heavy)
teleportCountdownText.hAlign = 'center'
teleportCountdownText.hTextAlign = 'center'
teleportCountdownText.vAlign = 'bottom'
teleportCountdownText.vTextAlign = 'bottom'
teleportCountdownText.positionY = 16
teleportCountdownText.isPointerBlocker = false

// let teleportBeamMessage = new UIText(teleportUIContainer)
// teleportBeamMessage.value = "BEAMING UP"
// teleportBeamMessage.fontSize = 48
// teleportBeamMessage.hAlign = "center"
// teleportBeamMessage.hTextAlign = "center"
// teleportBeamMessage.vAlign = "bottom"
// teleportBeamMessage.vTextAlign = "bottom"
// teleportBeamMessage.isPointerBlocker = false

export function showTeleportUI(_visible: boolean) {
  teleportUIContainer.visible = _visible
}
export function setTeleportCountdown(_numberString: string) {
  teleportCountdownText.value = _numberString
}

/////// CLOSE UI

// Instance the input object
const input = Input.instance

//button down event
input.subscribe('BUTTON_DOWN', ActionButton.POINTER, false, (e) => {
  const currentTime = +Date.now()

  // Won't close the UI if it was just opened
  if (checkUIOpen() && currentTime - UIOpenTime > 100) {
    closeUI()
    playCloseSound()
  }
})

export class UIDistanceSystem implements ISystem {
  update() {
    if (checkUIOpen()) {
      let dist = distance(
        Camera.instance.position,
        UIOpener.getGlobalPosition()
      )

      // if player walks too far from entity
      if (dist > 8 * 8) {
        // close all UIs, including NPC
        closeUI()
        playCloseSound()
      }
    }
  }
}

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
