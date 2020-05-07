//import utils from '../node_modules/decentraland-ecs-utils/index'
import { placeTeleports } from './modules/teleports'
import { setTriggerAreas } from './modules/triggers'
import { Wearable, addWearables } from './modules/wearables'
import { placeMuseumPieces } from './modules/museum'
import { addScreen } from './modules/video'
import { addBuildings } from './modules/buildings'

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
