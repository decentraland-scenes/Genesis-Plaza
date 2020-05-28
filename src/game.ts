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

//////// LOG PLAYER POSITION

class CameraTrackSystem implements ISystem {
  update() {
    log(Camera.instance.position)
    log(Camera.instance.rotation.eulerAngles)
  }
}

engine.addSystem(new CameraTrackSystem())

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

//// WEARABLES

addWearables()

//// ROBOTS
const dummyTarget = new Entity()
dummyTarget.addComponent(new PlaneShape())
dummyTarget.addComponent(new Transform())

addFaceUserSystem(dummyTarget)
addRobots(dummyTarget)

//// NFTS
addNFTs()

//// Mural
// addMural() // Removed due to performance issues

//// Piano
addPiano()

//// Sequencer Fountain

addZenquencer()

/// FETCH DATA FOR TRADE CENTER
updateMarketData()

//// AMBIENT SOUNDS

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
