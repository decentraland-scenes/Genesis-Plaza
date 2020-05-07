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

// BALLOON

//add balloon
let balloon = new Entity()
balloon.addComponent(new GLTFShape('models/balloon.glb'))
balloon.addComponent(
  new Transform({
    rotation: Quaternion.Euler(0, 180, 0),
  })
)
engine.addEntity(balloon)

/* // TRAIN

//add stops
let stops = new Entity()
stops.addComponent(new GLTFShape('models/stops.glb'))
stops.addComponent(
  new Transform({
    rotation: Quaternion.Euler(0, 180, 0),
  })
)
engine.addEntity(stops)

//add train
let train = new Entity()
train.addComponent(new GLTFShape('models/train.glb'))
train.addComponent(
  new Transform({
    rotation: Quaternion.Euler(0, 180, 0),
  })
)
engine.addEntity(train)

*/

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
