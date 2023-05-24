import {
  barPlatforms,
  placePlatforms,
  upstairsLoaded,
} from './modules/platforms'
import { addWearables } from './modules/wearables'
import {
  placeMuseumPieces,
  placeTradecenterPieces,
  placeGardenPieces,
  placeWearablePieces,
} from './modules/museumItems'
import { addScreen } from './modules/video'
import { addBuildings } from './modules/buildings'
import { addRobots } from './modules/npcRobotBuilder'
import { addNFTs } from './modules/nftBuilder'
import { addPiano } from './piano/pianoBuilder'
import { updateMarketData } from './modules/serverHandler'
import { AmbientSound } from './modules/ambientSound'
import { addZenquencer } from './zenquencer/zenquencerBuilder'
//import { createEventsBoard } from './modules/eventBoard'
import { addRepeatTrigger } from './modules/Utils'
import { startMessageBoards } from './modules/messageboard'
import { placeDoors } from './modules/bar/doors'
import * as utils from '@dcl/ecs-scene-utils'
import * as sfx from 'lobby/resources/sounds'
import {
  addMicFeedback,
  lowerVolume,
  outOfBar,
  placeJukeBox,
  setBarMusicOff,
  setBarMusicOn,
} from './modules/bar/jukebox'

import {
  addBarNPCs,
  addNPCsOutside,
  areNPCsAdded,
  endArtistTalk,
} from './modules/bar/barNPCs'
import { startArtichoke } from './modules/artichoke'
import { handleQuests } from './quests'
import { setupNPC } from './aiNpc/npc/npcSetup'
import { REGISTRY, initRegistry } from './registry'
import { Room } from 'colyseus.js'
import * as lobbyConn from 'src/aiNpc/lobby-scene/connection/onConnect';
import { LobbyScene } from './aiNpc/lobby-scene/lobbyScene'
import { CONFIG, initConfig } from './config'
import { initDialogs } from './aiNpc/npc/npcDialog'
import { ANALYTICS_ELEMENTS_IDS, ANALYTICS_ELEMENTS_TYPES, ANALYTICS_EVENT_KEYS, AnalyticsLogLabel } from './aiNpc/Stats/AnalyticsConfig'
import { TrackingElement, trackEnd, trackStart } from './aiNpc/Stats/analyticsCompnents'


//////// LOG PLAYER POSITION

Input.instance.subscribe('BUTTON_DOWN', ActionButton.PRIMARY, true, (e) => {
  log(`pos: `, Camera.instance.position)
  log(`rot: `, Camera.instance.rotation)
  // if(e.hit){
  //   console.log(
  //     'ENT: ',  engine.entities[e.hit.entityId],
  //     'POS:', engine.entities[e.hit.entityId].getComponent(Transform)
  //   )
  // }
})


initRegistry()

//// AI NPC initial init
initConfig()
initDialogs()

//// ADD BUILDINGS

addBuildings()

///////// BAR STUFF

// BAR DOORS

//REMOVING PROCESS
//placeDoors()
//barPlatforms()

utils.setTimeout(20000, () => {
  if (!areNPCsAdded) {
    handleQuests()
    //REMOVING PROCESS
    //addBarNPCs()

    //// AI NPC initial init
    setupNPC()

    REGISTRY.lobbyScene = new LobbyScene()

    REGISTRY.lobbyScene.init()
    //REGISTRY.lobbyScene.initArena(true) //lazy connect to avoid over connections
  
  
    REGISTRY.onConnectActions = (room: Room<any>, eventName: string) => {
      //npcConn.onNpcRoomConnect(room)
      lobbyConn.onNpcRoomConnect(room)
    }

    //docs say will fire after 1 minute
    onIdleStateChangedObservable.add(({ isIdle }) => {
      log("Idle State change: ", isIdle)
      if(isIdle){
        //prevent too many connnections for AFKers, it will auto reconnect if u interact with something again
        REGISTRY.lobbyScene.endBattle()
      }
    })
  }
})

/// TRIGGER FOR STUFF OUTSIDE BAR
const ENABLE_DEBUG_TRIGGERS=false
/*
//TAG:removing-center-area
utils.addOneTimeTrigger(
  new utils.TriggerBoxShape(new Vector3(50, 25, 50), new Vector3(160, 10, 155)),
  {
    onCameraEnter: () => {
      insideBar()
    },
    onCameraExit: async () => {
      await lowerVolume()
      outsideBar()
      log('stepped out')
    },
    enableDebug: ENABLE_DEBUG_TRIGGERS
  }
)

const barEntity = new Entity()
barEntity.addComponentOrReplace(new TrackingElement(ANALYTICS_ELEMENTS_TYPES.region, ANALYTICS_ELEMENTS_IDS.bar))
engine.addEntity(barEntity)
// proper bar interior
addRepeatTrigger(
  new Vector3(160, 50, 155),
  new Vector3(50, 102, 50),
  () => {
    setBarMusicOn()
    log('went in')
    log(AnalyticsLogLabel, "Game.ts", "RepeatTrigger", "OnEnter")
    trackStart(barEntity.getComponentOrNull(TrackingElement))
  },
  null,
  ENABLE_DEBUG_TRIGGERS,
  () => {
    outOfBar()
    endArtistTalk()
    lowerVolume()
    log('mid distance')
    log(AnalyticsLogLabel, "Game.ts", "RepeatTrigger", "OnExit")
    trackEnd(barEntity.getComponentOrNull(TrackingElement))

    //setBarMusicOff()
  }
)

//outer perimeter
addRepeatTrigger(
  new Vector3(160, 30, 155),
  new Vector3(75, 60, 75),
  () => {
    lowerVolume()
    log('got closer')
  },
  null,
  ENABLE_DEBUG_TRIGGERS,
  () => {
    setBarMusicOff()
    log('got far')
  }
)*/

/// TRIGGERS AROUND PLAZA
const cutX = 4
const cutZ = 5
const parcelX = 19
const parcelZ = 20
const TRIGGER_HEIGHT = 2

//must cover whole area now that its a cutout AND cuz now spawn points go to nearest url point
utils.addOneTimeTrigger(
  //  new utils.TriggerBoxShape(new Vector3(2, 5, 305), new Vector3(0, 2, 160)),
  new utils.TriggerBoxShape(new Vector3(((parcelX-(cutX/2))*16)/2, 5, (parcelZ*16)/1), new Vector3(0+(parcelX*16)/8 + ((cutX-1)/2)*16, TRIGGER_HEIGHT, (parcelZ*16)/2)),
  {
    onCameraEnter: () => {
      log('WEST BORDER')
      outsideBar()
    },
    enableDebug: ENABLE_DEBUG_TRIGGERS 
  }
)

utils.addOneTimeTrigger(
  //new utils.TriggerBoxShape(new Vector3(2, 5, 320), new Vector3(320, 2, 155)),
  new utils.TriggerBoxShape(new Vector3(((parcelX-(cutX/2))*16)/2, 5, (parcelZ*16)/1), new Vector3((parcelX*16)- ((cutX+1)/2)*16, TRIGGER_HEIGHT, (parcelZ*16)/2)),
  {
    onCameraEnter: () => { 
      log('EAST BORDER')
      outsideBar()
    },
    enableDebug: ENABLE_DEBUG_TRIGGERS
  }
)

utils.addOneTimeTrigger(  
  //new utils.TriggerBoxShape(new Vector3(320, 5, 2), new Vector3(165, 2, 0)),
  new utils.TriggerBoxShape(new Vector3(((parcelX)*16)/2, 5, ((parcelZ-cutZ/1)*16)/2), new Vector3((parcelX*16)/2, TRIGGER_HEIGHT, ((parcelZ)*16)/8)), 
  {
    onCameraEnter: () => {
      log('SOUTH BORDER')
      outsideBar()
    },
    enableDebug: ENABLE_DEBUG_TRIGGERS
  }
)

utils.addOneTimeTrigger(
  //new utils.TriggerBoxShape(new Vector3(320, 5, 2), new Vector3(155, 2, 300)),
  new utils.TriggerBoxShape(new Vector3(((parcelX)*16)/2, 5, ((parcelZ-cutZ/1)*16)/2), new Vector3((parcelX*16)/2, TRIGGER_HEIGHT, ((parcelZ-4)*16))),  
  {
    onCameraEnter: () => {
      log('NORTH BORDER')

      outsideBar()
    },
    enableDebug: ENABLE_DEBUG_TRIGGERS
  }
)

export function insideBar() {
  if (!areNPCsAdded) {
    handleQuests()
    //REMOVING PROCESS
    //addBarNPCs()
    setupNPC()

    REGISTRY.lobbyScene = new LobbyScene()

    REGISTRY.lobbyScene.init()
    //lazy load this, dont call automatically???
    //REGISTRY.lobbyScene.initArena(true)
  
  
    REGISTRY.onConnectActions = (room: Room<any>, eventName: string) => {
      //npcConn.onNpcRoomConnect(room)
      lobbyConn.onNpcRoomConnect(room)
    }
  }

  //REMOVING PROCESS
  //placeJukeBox()
  //addMicFeedback()
}

export let isOutsideLoaded: boolean = false

export function outsideBar() {
  log('CALLING OUTSIDE BAR')

  if (isOutsideLoaded) return

  isOutsideLoaded = true

  sfx.lobbyMusicSource.playing = false

  addNPCsOutside()
  /// MOVING PLATFORMS

  placePlatforms()

  ///TELEPORTERS

  //   placeTeleports()

  /// VIDEO SCEREEN

  addScreen()

  startArtichoke()

  /// MUSEUM

  utils.addOneTimeTrigger(
    new utils.TriggerBoxShape(
      new Vector3(60, 60, 60),
      new Vector3(180, 2, 244)
    ),
    {
      onCameraEnter: () => {
        placeMuseumPieces()
      },
    }
  )

  /// WEARABLES

  utils.addOneTimeTrigger(
    new utils.TriggerBoxShape(
      new Vector3(50, 50, 50),
      new Vector3(275, 5, 130)
    ),
    {
      onCameraEnter: () => {
        addWearables()
        placeWearablePieces()
        log('loading wearables')
      },
    }
  )

  /// TRADE CENTER

  utils.addOneTimeTrigger(
    new utils.TriggerBoxShape(new Vector3(80, 80, 80), new Vector3(269, 5, 37)),
    {
      onCameraEnter: () => {
        updateMarketData()
        placeTradecenterPieces()
      },
    }
  )

  /// GARDEN

  utils.addOneTimeTrigger(
    new utils.TriggerBoxShape(new Vector3(60, 60, 60), new Vector3(118, 3, 39)),
    {
      onCameraEnter: () => {
        placeGardenPieces()
      },
    }
  )

  /// ROBOTS
  addRobots()

  /// NFTS
  addNFTs()

  /// Piano
  // BUG: need to hot reload for the red out of bound indicators to disappear - works fine when deployed
  addPiano()

  /// Sequencer Fountain
  addZenquencer()

  // MESSAGE BOARDS
  startMessageBoards()

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
}
