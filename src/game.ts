import { placeTeleports } from './modules/teleports'
import { barPlatforms, placePlatforms } from './modules/platforms'
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
import { addOneTimeTrigger, addRepeatTrigger } from './modules/Utils'
import { startMessageBoards } from './modules/messageboard'
import { placeDoors } from './modules/doors'

import {
  lowerVolume,
  outOfBar,
  placeJukeBox,
  setBarMusicOff,
  setBarMusicOn,
} from './modules/jukebox'

import { addBarNPCs } from './modules/barNPCs'
import { addArcades } from './modules/arcades/arcades'

//////// LOG PLAYER POSITION

Input.instance.subscribe('BUTTON_DOWN', ActionButton.PRIMARY, false, (e) => {
  log(`pos: `, Camera.instance.position)
  log(`rot: `, Camera.instance.rotation)
})

//// ADD BUILDINGS

addBuildings()

///////// BAR STUFF

// BAR DOORS

placeDoors()
barPlatforms()

/// TRIGGER FOR STUFF OUTSIDE BAR

addOneTimeTrigger(
  new Vector3(160, 10, 155),
  new Vector3(50, 30, 50),
  () => {
    insideBar()
  },
  null,
  false,
  async () => {
    await lowerVolume()
    outsideBar()
    log('stepped out')
  }
)

// proper bar interior
addRepeatTrigger(
  new Vector3(160, 10, 155),
  new Vector3(50, 30, 50),
  () => {
    setBarMusicOn()
    log('went in')
  },
  null,
  false,
  () => {
    outOfBar()
    lowerVolume()
    log('mid distance')
    //setBarMusicOff()
  }
)

//outer perimeter
addRepeatTrigger(
  new Vector3(160, 10, 155),
  new Vector3(75, 30, 75),
  () => {
    lowerVolume()
    log('got closer')
  },
  null,
  false,
  () => {
    setBarMusicOff()
    log('got far')
  }
)

export function insideBar() {
  addBarNPCs()
  placeJukeBox()
  addArcades()
}

export function outsideBar() {
  /// MOVING PLATFORMS

  placePlatforms()

  ///TELEPORTERS

  //   placeTeleports()

  /// VIDEO SCEREEN

  addScreen()

  /// EVENTS BOARD

  // createEventsBoard({
  //   position: new Vector3(175.8, 3.5, 168),
  //   rotation: Quaternion.Euler(0, 225, 0),
  // })

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
