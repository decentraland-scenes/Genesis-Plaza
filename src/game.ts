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
import { getUserData, getUserPublicKey } from '@decentraland/Identity'
import Meta from '../metas/sammich/sammich'
import { checkProgression, progression } from './halloweenQuests/progression'
import {
  Coords,
  halloweenTheme,
  initialQuestUI,
  quest,
} from './halloweenQuests/quest'
import { NPC } from './NPC/npc'
import { getCurrentRealm } from '@decentraland/EnvironmentAPI'
import utils from '../node_modules/decentraland-ecs-utils/index'
import * as ui from '../node_modules/@dcl/ui-utils/index'
import { tutorialEnableObservable } from './modules/tutorialHandler'

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
  'sounds/Forest.mp3',
  0,
  true,
  0.6
)

let forest2 = new AmbientSound(
  { position: new Vector3(117, 2, 42) },
  'sounds/Forest2.mp3',
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

/// METAS

import { PawnsSquare } from '../metas/pawnssquare/pawnssquare'
import { userDat } from '../metas/pawnssquare/modules/dat/gameData'
import {
  day1Intro,
  day1Outro,
  day1Success,
  day2Intro,
  day3Intro,
  day4Intro,
  dismiss,
  morePumpkins,
  stay,
} from './NPC/dialog'
import { TriggerBoxShape } from '../node_modules/decentraland-ecs-utils/triggers/triggerSystem'
import { PointerArrow } from './halloweenQuests/pointerArrow'
import { TrashBin } from './halloweenQuests/trashBin'
import { gemsCounter } from './halloweenQuests/pumpkin'

try {
  /***
   * SAMMICH-GAME CODE BELLOW
   */
  const landOwnerData = {
    host_data: `{
		"sammichgame":{
		  "position":{"x":${9 * 16 - 11.1},"y":1.4,"z":${9 * 16 + 8}},
		  "rotation":{"x":0,"y":270,"z":0},
		  "scale":{"x":1.2, "y":1.05, "z":1},     
		  "hideBoard": false,
		  "hideAd": true,
		  "gameID": "0,0",
		  "soundDistance": 16,
		  "showScenario": false,
		  "hideFrame": true,
		  "showJoinVoice": false,
		  "voiceChannel": "dcl-sammich-game",
		  "serverWs": "wss://mana-fever.com",
		  "serverHttp":  "https://mana-fever.com"
		}
	 }`,
  }
  const sammichFrame = new Entity()
  const sammichFrameShape = new GLTFShape('models/sammich-screen.glb')
  sammichFrameShape.isPointerBlocker = false
  sammichFrame.addComponent(sammichFrameShape)
  sammichFrame.addComponent(
    new Transform({
      position: new Vector3(9 * 16 - 11, 0.5, 9 * 16 + 8),
      scale: new Vector3(1.2, 1.2, 1.2),
      rotation: Quaternion.Euler(0, 90, 0),
    })
  )
  engine.addEntity(sammichFrame)

  engine.addSystem(new Meta({ getUserData, getCurrentRealm }, landOwnerData))

  // Chess game

  const FetchuserInformation = async () => {
    const userInfo = await getUserData()
    if (userInfo !== undefined) userDat.setUID(userInfo.displayName)
    else userDat.setUID('Guest' + Math.floor(Math.random() * 1000000))

    const publicKeyInfo = await getUserPublicKey()
    userDat.setETHAdd(publicKeyInfo)

    const realm = await getCurrentRealm()
    userDat.setRealm(realm.displayName)
  }

  FetchuserInformation()
    .then(() => {
      const chessBoardLandOwnerData = {
        host_data: `{
				"time_control": 600,
				"system_pivot": {
				  "position": {"x":180, "y":1.2, "z":152},
				  "scale": {"x":1, "y":1, "z":1}
				},
				"chessboard": {
					"visible": true,
					"position": {"x":180, "y":1.2, "z":152},
					"scale": {"x":1.1, "y":1.1, "z":1.1}
				},
				"decoration_bottom": {
					"visible": true,
					"position": {"x":180, "y":0.7, "z":152},
					"rotation": {"x":0, "y":0, "z":0},
					"scale": {"x":0.8, "y":0.8, "z":0.8}
				}
			}`,
      }

      new PawnsSquare(chessBoardLandOwnerData)
    })
    .catch((err) => {
      log("Can't load Pawn's Square, fetch user data failed", err)
    })
} catch {
  log('Metas missing')
}

setUpScene()

export let lady: NPC
export let arrow: PointerArrow

export async function setUpScene() {
  await checkProgression()

  initialQuestUI(progression.data, progression.day, Coords.GenesisCoords)

  if (progression.data.phone && !progression.data.NPCOutroDay4) {
    lady = new NPC(
      {
        position: new Vector3(160, 1, 180),
        rotation: Quaternion.Euler(0, 180, 0),
      },
      new GLTFShape('models/halloween/npc.glb'),
      () => {
        if (lady.dialog.isDialogOpen) return
        oldLadyTalk()
      },
      'images/halloween/npc.png',
      10
    )
    lady.dialog = new ui.DialogWindow(
      { path: 'images/halloween/npc.png', height: 128, width: 128 },
      true,
      halloweenTheme
    )
    lady.dialog.leftClickIcon.positionX = 340 - 60
    lady.dialog.text.color = Color4.FromHexString('#8DFF34FF')

    arrow = new PointerArrow(
      {
        position: new Vector3(0, 2.5, 0),
        scale: new Vector3(1.5, 1.5, 1.5),
      },
      lady
    )

    initialArrowState()
  }

  if (progression.data.phone && !progression.data.w1Found) {
    let trashBin = new TrashBin({
      position: new Vector3(294.95306396484375, 18, 105.41779327392578),
    })
    addLimits()
  }
}

export function oldLadyTalk() {
  let data = progression.data
  let day = progression.day

  if (data.NPCOutroDay3 && !data.w4Found && day >= 4) {
    //day 4 intro
    lady.talk(day4Intro, 0)
    arrow.hide()
  } else if (data.NPCOutroDay2 && !data.w3Found && day >= 3) {
    // day 3 intro
    lady.talk(day3Intro, 0)
    arrow.hide()
  } else if (data.w1Found && !data.w2Found && day >= 2) {
    // day 2 intro
    lady.talk(day2Intro, 0)
    arrow.hide()
  } else if (data.w1Found && !quest.isChecked(5)) {
    // day 1 outro
    lady.talk(day1Outro, 0)
    arrow.hide()
  } else if (data.pumpkinDone && !data.w1Found) {
    // look for wearable
    lady.talk(day1Success, 0)
    arrow.hide()
  } else if (gemsCounter.uiText.visible && !data.pumpkinDone) {
    // still smashing pumpkins
    lady.talk(morePumpkins, 0, 2)
  } else if (data.phone && !data.pumpkinDone) {
    // day 1 intro
    lady.talk(day1Intro, 0)

    quest.checkBox(2)
  } else if (
    (data.NPCOutroDay4 && day == 4) ||
    (data.NPCOutroDay3 && day == 3) ||
    (data.NPCOutroDay2 && day == 2) ||
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
    (data.NPCOutroDay3 && !data.w4Found && day >= 4) ||
    (data.NPCOutroDay2 && !data.w3Found && day >= 3) ||
    (data.w1Found && !data.w2Found && day >= 2) ||
    (data.phone && !data.w1Found)
  ) {
    arrow.move(lady)
  } else {
    arrow.hide()
  }
}

tutorialEnableObservable.add((tutorialEnabled) => {
  let scale: Vector3 = tutorialEnabled ? Vector3.Zero() : Vector3.One()
  lady.getComponent(Transform).scale = scale
})
