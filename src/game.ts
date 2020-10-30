//import utils from '../node_modules/decentraland-ecs-utils/index'
import { placeTeleports } from './modules/teleports'
import { placePlatforms } from './modules/platforms'
import { addWearables } from './modules/wearables'
import {
  placeMuseumPieces,
  placeTradecenterPieces,
  placeGardenPieces,
  placeWearablePieces,
} from './modules/museumItems'
import { addScreen } from './modules/video'
import { addBuildings } from './modules/buildings'
import { addFaceUserSystem } from './modules/npcFaceUserSystem'
import { addRobots } from './modules/npcRobotBuilder'
import { addNFTs } from './modules/nftBuilder'
import { addPiano } from './piano/pianoBuilder'
import { updateMarketData } from './modules/serverHandler'
import { AmbientSound } from './modules/ambientSound'
import { addZenquencer } from './zenquencer/zenquencerBuilder'
import { createEventsBoard } from './modules/eventBoard'
import { addOneTimeTrigger } from './modules/Utils'

import { checkProgression, progression } from './halloweenQuests/progression'
import {
  Coords,
  halloweenTheme,
  initialQuestUI,
  quest,
} from './halloweenQuests/quest'
import { NPC } from './NPC/npc'
import utils from '../node_modules/decentraland-ecs-utils/index'
import * as ui from '../node_modules/@dcl/ui-utils/index'
import { tutorialEnableObservable } from './modules/tutorialHandler'

import {
  day1Intro,
  day1Outro,
  day1Success,
  day2Intro,
  day3Intro,
  day4Intro,
  day5Intro,
  day5Outro,
  dismiss,
  morePumpkins,
  stay,
} from './NPC/dialog'
import { TriggerBoxShape } from '../node_modules/decentraland-ecs-utils/triggers/triggerSystem'
import { PointerArrow } from './halloweenQuests/pointerArrow'
import { TrashBin } from './halloweenQuests/trashBin'
import { gemsCounter } from './halloweenQuests/pumpkin'
import { Reward } from './halloweenQuests/loot'

//////// LOG PLAYER POSITION

Input.instance.subscribe('BUTTON_DOWN', ActionButton.PRIMARY, false, (e) => {
  log(
    `{ pos: new Vector3(`,
    Camera.instance.position.x,
    ',',
    Camera.instance.position.y,
    ',',
    Camera.instance.position.z,
    `) },`
  )
  //log(`rot: `, Camera.instance.rotation)
})

//// ADD BUILDINGS

addBuildings()

/// MOVING PLATFORMS

placePlatforms()

///TELEPORTERS

placeTeleports()

/// VIDEO SCEREEN

addScreen()

/// EVENTS BOARD

createEventsBoard({
  position: new Vector3(175.8, 3.5, 168),
  rotation: Quaternion.Euler(0, 225, 0),
})

/// WEARABLES

addOneTimeTrigger(new Vector3(180, 2, 244), new Vector3(60, 60, 60), () => {
  placeMuseumPieces()
})

/// MUSEUM

addOneTimeTrigger(new Vector3(273, 2, 127), new Vector3(50, 50, 50), () => {
  addWearables()
  placeWearablePieces()
})

/// TRADE CENTER

addOneTimeTrigger(new Vector3(269, 5, 37), new Vector3(80, 80, 80), () => {
  updateMarketData()
  placeTradecenterPieces()
})

/// GARDEN

addOneTimeTrigger(new Vector3(118, 3, 39), new Vector3(60, 60, 60), () => {
  placeGardenPieces()
})

/// ROBOTS
const dummyTarget = new Entity()
dummyTarget.addComponent(new PlaneShape())
dummyTarget.addComponent(new Transform())

addFaceUserSystem(dummyTarget)
addRobots(dummyTarget)

/// NFTS
addNFTs()

/// Piano
// BUG: need to hot reload for the red out of bound indicators to disappear - works fine when deployed
addPiano()

/// Sequencer Fountain
addZenquencer()

/// AMBIENT SOUNDS

let forest1 = new AmbientSound(
  { position: new Vector3(215, 2, 183) },
  'sounds/halloween/Halloween_Ambience.mp3',
  0,
  true,
  0.6
)

let forest2 = new AmbientSound(
  { position: new Vector3(117, 2, 42) },
  'sounds/halloween/Halloween_Ambience.mp3',
  0,
  true,
  0.6
)

// let thunder = new AmbientSound(
//   { position: new Vector3(43, 45, 113) },
//   'sounds/thunder.mp3',
//   0,
//   true,
//   0.2
// )

setUpScene()

export let lady = new NPC(
  {
    position: new Vector3(160, -10, 180),
    rotation: Quaternion.Euler(0, 180, 0),
  },
  new GLTFShape('models/halloween/oldlady.glb'),
  () => {
    if (lady.dialog.isDialogOpen) return
    oldLadyTalk()
  },
  'images/halloween/oldlady.png',
  10,
  'Weight_Shift',
  true,
  false
)
export let ghostBuster = new NPC(
  {
    position: new Vector3(160, -10, 180),
    rotation: Quaternion.Euler(0, 180, 0),
  },
  new GLTFShape('models/halloween/ghostblaster.glb'),
  () => {
    if (ghostBuster.dialog.isDialogOpen) return

    if (progression.data.w5Found) {
      ghostBuster.talk(day5Outro)
    } else {
      ghostBuster.talk(day5Intro)
    }
  },
  'images/halloween/ghostblaster.png',
  10,
  'Weight_Shift',
  true,
  false
)
export let arrow: PointerArrow

let trashBin = new TrashBin({
  position: new Vector3(284.21820068359375, 17.5, 105.90065002441406),
})

export async function setUpScene() {
  await checkProgression()

  initialQuestUI(progression.data, progression.day, Coords.GenesisCoords)

  if (progression.data.phone && !progression.data.w4Found) {
    // days 1,2,3,4
    lady.getComponent(Transform).position.y = 0.55
    lady.dialog = new ui.DialogWindow(
      { path: 'images/halloween/oldlady.png' },
      true,
      halloweenTheme
    )
    lady.dialog.leftClickIcon.positionX = 340 - 60
    lady.dialog.text.color = Color4.FromHexString('#8DFF34FF')

    if (progression.data.pumpkinDone) {
      trashBin.enabled = true
    }

    arrow = new PointerArrow(
      {
        position: new Vector3(0, 2.5, 0),
        scale: new Vector3(1.5, 1.5, 1.5),
      },
      lady
    )

    initialArrowState()
  } else if (progression.data.w4Found && progression.day >= 5) {
    // day 5
    ghostBuster.getComponent(Transform).position.y = 0.55
    ghostBuster.dialog = new ui.DialogWindow(
      { path: 'images/halloween/ghostblaster.png' },
      true,
      halloweenTheme
    )
    ghostBuster.dialog.leftClickIcon.positionX = 340 - 60
    ghostBuster.dialog.text.color = Color4.FromHexString('#8DFF34FF')

    arrow = new PointerArrow(
      {
        position: new Vector3(0, 2.5, 0),
        scale: new Vector3(1.5, 1.5, 1.5),
      },
      ghostBuster
    )
  }

  if (progression.data.phone && !progression.data.w1Found) {
    addLimits()

    // dummy underground loot for faster loading
    let dummyR = new Reward(
      lady,
      'dummy',
      { position: new Vector3(0, -20, 0) },
      true
    )
  }
}

let day1LookingForWearable = false

export function oldLadyTalk() {
  let data = progression.data
  let day = progression.day

  //lady.playAnimation(`Acknowledging`, true, 1.97)

  if (data.w3Found && !data.w4Found && day >= 4) {
    //day 4 intro
    lady.talk(day4Intro, 0)
    arrow.hide()
  } else if (data.w2Found && !data.w3Found && day >= 3) {
    // day 3 intro
    lady.talk(day3Intro, 0)
    arrow.hide()
  } else if (
    data.w1Found &&
    !data.w2Found &&
    day >= 2 &&
    !day1LookingForWearable
  ) {
    // day 2 intro
    lady.talk(day2Intro, 0)
    arrow.hide()
  } else if (day1LookingForWearable && quest.isChecked(4)) {
    day1LookingForWearable = false
    // day 1 outro
    lady.talk(day1Outro, 0)
    arrow.hide()
  } else if (data.pumpkinDone && !data.w1Found) {
    // look for wearable
    lady.talk(day1Success, 0)
    trashBin.enabled = true
    day1LookingForWearable = true
    arrow.hide()
  } else if (gemsCounter.uiText.visible && !data.pumpkinDone) {
    // still smashing pumpkins
    lady.talk(morePumpkins, 0, 2)
  } else if (data.phone && !data.pumpkinDone) {
    // day 1 intro
    lady.talk(day1Intro, 0)

    quest.checkBox(2)
  } else if (
    (data.w4Found && day == 4) ||
    (data.w3Found && day == 3) ||
    (data.w2Found && day == 2) ||
    (quest.isChecked(5) && day == 1)
  ) {
    let randomIndex = Math.floor(Math.random() * 3)
    lady.talk(dismiss, randomIndex, 2)
  }
}

// when bursting pumpkins

export function addLimits() {
  let sceneLimitsTrigger = new Entity()
  sceneLimitsTrigger.addComponent(
    new Transform({
      position: new Vector3(160, 8, 160),
    })
  )
  engine.addEntity(sceneLimitsTrigger)
  sceneLimitsTrigger.addComponent(
    new utils.TriggerComponent(
      new TriggerBoxShape(
        new Vector3(16 * 18.8, 50, 16 * 17.5),
        Vector3.Zero()
      ),
      null,
      null,
      null,
      null,
      null,
      () => {
        log('walking out')
        if (lady.introduced && !progression.data.w1Found) {
          lady.talk(stay, 0, 2)
        }
      }
    )
  )
}

export function initialArrowState() {
  let data = progression.data
  let day = progression.day

  if (
    (data.w3Found && !data.w4Found && day >= 4) ||
    (data.w2Found && !data.w3Found && day >= 3) ||
    (data.w1Found && !data.w2Found && day >= 2) ||
    (data.phone && !data.w1Found)
  ) {
    arrow.move(lady)
  } else {
    arrow.hide()
  }
}

let easterEggStar = new Entity()
easterEggStar.addComponent(
  new Transform({
    position: new Vector3(116.7, 3.5, 35),
  })
)
engine.addEntity(easterEggStar)

let easterEgg = new Reward(easterEggStar, 'egg1', {}, true)

tutorialEnableObservable.add((tutorialEnabled) => {
  let scale: Vector3 = tutorialEnabled ? Vector3.Zero() : Vector3.One()
  lady.getComponent(Transform).scale = scale
})
