import { barPlatforms, placePlatforms, upstairsLoaded } from './modules/platforms'
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

//// ADD BUILDINGS

addBuildings()

///////// BAR STUFF

// BAR DOORS

placeDoors()
barPlatforms()

utils.setTimeout(20000, () => {
  if (!areNPCsAdded) {
    addBarNPCs()
  }
})

/// TRIGGER FOR STUFF OUTSIDE BAR

utils.addOneTimeTrigger(
  new utils.TriggerBoxShape(new Vector3(50, 30, 50), new Vector3(160, 10, 155)),
  {
    onCameraEnter: () => {
      insideBar()
    },
    onCameraExit: async () => {
      await lowerVolume()
      outsideBar()
      log('stepped out')
    },
  }
)

// proper bar interior
addRepeatTrigger(
  new Vector3(160, 50, 155),
  new Vector3(50, 102, 50),
  () => {
    setBarMusicOn()
    log('went in')
  },
  null,
  false,
  () => {
    outOfBar()
    endArtistTalk()
    lowerVolume()
    log('mid distance')

    //setBarMusicOff()
  }
)

//outer perimeter
addRepeatTrigger(
  new Vector3(160, 50, 155),
  new Vector3(75, 103, 75),
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
  if (!areNPCsAdded) {
    addBarNPCs()
  }

  
  placeJukeBox()
  addMicFeedback()
}



export function outsideBar() {
  addNPCsOutside()
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
    new utils.TriggerBoxShape(new Vector3(50, 50, 50), new Vector3(269, 5, 37)),
    {
      onCameraEnter: () => {
        addWearables()
        placeWearablePieces()
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
