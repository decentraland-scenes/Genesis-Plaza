//import utils from '../node_modules/decentraland-ecs-utils/index'
import { placeTeleports } from './modules/teleports'
import { setTriggerAreas } from './modules/elevators'
import { addWearables } from './modules/wearables'
import { placeMuseumPieces } from './modules/museum'
import { addScreen } from './modules/video'
import { addBuildings } from './modules/buildings'
import { loadFaceUserSystem } from './modules/faceUserSystem'
import { loadRobots } from './modules/robotBuilder'

//////// HACK TO LOG POSITIONS

class CameraTrackSystem implements ISystem {
  update() {
    log(Camera.instance.position)
  }
}

engine.addSystem(new CameraTrackSystem())

//// ADD BUILDINGS

addBuildings()

/// ELEVATORS

setTriggerAreas()

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

loadFaceUserSystem(dummyTarget)
loadRobots(dummyTarget)
