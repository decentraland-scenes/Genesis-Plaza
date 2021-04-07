import { Brick } from "../gameObjects/brick"
import { Wall } from "../gameObjects/wall"
import { Background } from "../gameObjects/background"
import { GameManager } from "../gameManager"

// Ready player one
const readyPlayerOne = new Entity()
readyPlayerOne.addComponent(new GLTFShape("models/readyPlayerOne.glb"))
readyPlayerOne.addComponent(new Transform({ position: new Vector3(16, 1, 16) }))

// Brick
const colorRed = Color3.FromInts(255, 127, 0)
const colorGreen = Color3.FromInts(127, 255, 127)
const gameElements: Entity[] = []

// Load level
export function loadAtariLevel(parent: Entity): void {
  readyPlayerOne.setParent(parent)

  // Wall
  const wallLeft = new Wall(
    new Transform({ position: new Vector3(3.5, GameManager.PLANE_HEIGHT + 0.1, 16), scale: new Vector3(2, 0.1, 32) }),
    new Vector3(1, 0, 0),
    Color3.White(),
    parent
  )
  const wallTop = new Wall(
    new Transform({ position: new Vector3(16, GameManager.PLANE_HEIGHT + 0.1, 31.5), scale: new Vector3(27, 0.1, 2) }),
    new Vector3(0, 0, -1),
    Color3.White(),
    parent
  )
  const wallRight = new Wall(
    new Transform({ position: new Vector3(28.5, GameManager.PLANE_HEIGHT + 0.1, 16), scale: new Vector3(2, 0.1, 32) }),
    new Vector3(-1, 0, 0),
    Color3.White(),
    parent
  )

  // Background
  const background = new Background(new Transform({ position: new Vector3(16, GameManager.PLANE_HEIGHT - 0.1, 16), scale: new Vector3(26, 0.01, 32) }), parent)
}

export function loadAtariBricks(parent: Entity): void {
  readyPlayerOne.getComponent(GLTFShape).visible = false

  // Red bricks
  let brickPosX = 6
  let redBrickPosZ = 24
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 9; j++) {
      const brick = new Brick(
        new Transform({ position: new Vector3(brickPosX, GameManager.PLANE_HEIGHT, redBrickPosZ), scale: new Vector3(2, 0.1, 1) }),
        colorRed,
        parent
      )
      brickPosX += 2.5
      gameElements.push(brick)
    }
    redBrickPosZ -= 1.5
    brickPosX = 6
  }

  // Green bricks
  let greenBrickPosZ = 19.5
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 9; j++) {
      const brick = new Brick(
        new Transform({ position: new Vector3(brickPosX, GameManager.PLANE_HEIGHT, greenBrickPosZ), scale: new Vector3(2, 0.1, 1) }),
        colorGreen,
        parent
      )
      brickPosX += 2.5
      gameElements.push(brick)
    }
    greenBrickPosZ -= 1.5
    brickPosX = 6
  }
}

export function unloadAtariBricks(): void {
  readyPlayerOne.getComponent(GLTFShape).visible = true
  while (gameElements.length) {
    let gameElement = gameElements.pop()
    engine.removeEntity(gameElement)
  }
}
