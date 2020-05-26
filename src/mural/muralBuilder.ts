import utils from '../../node_modules/decentraland-ecs-utils/index'
import { Tile, tiles, tileNumbers } from './tile'
import { getMural } from './serverHandler'
import resources from "../resources"

// For transforming the mural
const muralTransform = new Entity()
muralTransform.addComponent(
  new Transform({
    position: new Vector3(160, 0, 24),
    rotation: Quaternion.Euler(0, 90, 0),
  })
)
engine.addEntity(muralTransform)

// create trigger area object, setting size and relative position
let muralTriggerBox = new utils.TriggerBoxShape(
  new Vector3(40, 4, 40),
  new Vector3(0, 2, 0)
)

// Mural wall
const muralWall = new Entity()
muralWall.addComponent(resources.models.standard.muralWall)
muralWall.addComponent(
  new Transform({
    position: new Vector3(160, 0, 24),
  })
)
muralWall.addComponent(
  new utils.TriggerComponent(
    muralTriggerBox, //shape
    0, //layer
    0, //triggeredByLayer
    null, //onTriggerEnter
    null, //onTriggerExit
    () => { //onCameraEnter
      
      // Check if the mural has tiles
      if (tiles.length < 1) {
        log('triggered!')
        buildTiles()
      }
    },
    null, //onCameraExit
    false //debug
  )
)
engine.addEntity(muralWall)

// Tile
const boxShape = new BoxShape()
boxShape.withCollisions = false

// Parameters for the mural
const MURAL_WIDTH = 48
const MURAL_HEIGHT = 12
const START_POS_X = -6.345
const START_POS_Y = 3.725
const TILE_SIZE = 0.25

let xPosition = START_POS_X
let yPosition = START_POS_Y
let tileIndex = 0
let isRed = true

// Build mural
function buildTiles(): void {
  for (let i = 0; i < MURAL_HEIGHT; i++) {
    for (let j = 0; j < MURAL_WIDTH; j++) {
      // Default color pattern (brick)
      let colorIndex: number
      if (i % 2 != 0) isRed = !isRed
      if (j % 2 != 0) isRed = !isRed
      isRed ? (colorIndex = 1) : (colorIndex = 2)

      const tile = new Tile(
        boxShape,
        new Transform({
          position: new Vector3(xPosition, yPosition, 0),
          scale: new Vector3(TILE_SIZE, TILE_SIZE, 0.125),
        }),
        tileIndex,
        colorIndex
      )
      tile.setParent(muralTransform)
      tileIndex = tiles.push(tile)
      tileNumbers.push(null)
      xPosition += TILE_SIZE + 0.02 // Adding a small gap
    }
    xPosition = START_POS_X
    yPosition -= TILE_SIZE + 0.02
  }
}

updateMural()

async function updateMural() {
  let currentTiles = await getMural()

  log(currentTiles)
  for (let i = 0; i < currentTiles.length; i++) {
    if (currentTiles[i] === null) {
      continue
    }
    tileNumbers[i] = currentTiles[i]
    tiles[i].setColor(currentTiles[i])
  }
}
