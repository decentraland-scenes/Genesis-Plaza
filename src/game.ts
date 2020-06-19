//import utils from '../node_modules/decentraland-ecs-utils/index'
import { placeTeleports } from './modules/teleports'
import { placePlatforms } from './modules/platforms'
import { addWearables } from './modules/wearables'
import { placeMuseumPieces } from './modules/museumItems'
import { addScreen } from './modules/video'
import { addBuildings } from './modules/buildings'
import { addFaceUserSystem } from './modules/npcFaceUserSystem'
import { addRobots } from './modules/npcRobotBuilder'
import { addNFTs } from './modules/nftBuilder'
import { addMural } from './mural/muralBuilder'
import { addPiano } from './piano/pianoBuilder'
import { updateMarketData } from './modules/serverHandler'
import { AmbientSound } from './modules/ambientSound'
import { addZenquencer } from './zenquencer/zenquencerBuilder'
import { createEventsBoard } from './modules/eventBoard'
import { Dispenser } from './dispenser'
import { GuestBook } from './guestbook'

//////// LOG PLAYER POSITION

Input.instance.subscribe('BUTTON_DOWN', ActionButton.PRIMARY, false, (e) => {
  log(`pos: `, Camera.instance.position)
  log(`rot: `, Camera.instance.rotation)
})

//// ADD BUILDINGS

addBuildings()

/// MOVING PLATFORMS

placePlatforms()

///TELEPORTERS

placeTeleports()

/// MUSEUM

placeMuseumPieces()

/// VIDEO SCEREEN

addScreen()

/// EVENTS BOARD

createEventsBoard({
  position: new Vector3(175.8, 3.5, 168),
  rotation: Quaternion.Euler(0, 225, 0),
})

/// WEARABLES

addWearables()

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

/// FETCH DATA FOR TRADE CENTER
updateMarketData()

/// POAP

let POAPBooth = new Dispenser(
  {
    position: new Vector3(229, 0, 217.8),
    rotation: new Quaternion(
      0.00494604604318738,
      0.9368222951889038,
      0.013256964273750782,
      -0.34951943159103394
    ),
  },
  'genesis'
)

let POAPBanner = new Entity()
POAPBanner.addComponent(
  new Transform({
    position: new Vector3(228, 0, 219),
    rotation: new Quaternion(
      0.00494604604318738,
      0.9368222951889038,
      0.013256964273750782,
      -0.34951943159103394
    ),
  })
)
POAPBanner.addComponent(new GLTFShape('models/poap/POAP_Banner.glb'))
engine.addEntity(POAPBanner)

POAPBanner.addComponent(
  new OnPointerDown(
    (e) => {
      openExternalURL('https://www.poap.xyz/')
    },
    { hoverText: 'Learn More' }
  )
)

/// GUESTBOOK

let guestBook = new GuestBook(
  {
    position: new Vector3(225.67, 0, 220.13),
    rotation: Quaternion.Euler(0, 315, 0),
  },
  'genesis'
)

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

let thunder = new AmbientSound(
  { position: new Vector3(43, 45, 113) },
  'sounds/thunder.mp3',
  0,
  true,
  0.2
)
