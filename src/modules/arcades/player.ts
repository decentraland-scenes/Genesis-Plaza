import { Paddle } from "./gameObjects/paddle"
import { Ball } from "./gameObjects/ball"
import { GameManager } from "./gameManager"
import { Arcade } from "./gameObjects/arcade"

// Intermediate variables
const input = Input.instance
let buttonSystem: ISystem
let paddle: Paddle
let activeParent: Entity
// To store player elements to load and unload
const playerElements: Entity[] = []

export function loadPlayer(parent: Entity, arcade: Arcade): void {

  activeParent = parent
  
  // Game has loaded
  GameManager.hasGameLoaded = true

  // Paddle
  paddle = new Paddle(new Transform({ position: new Vector3(16, GameManager.PLANE_HEIGHT, 4), scale: new Vector3(2, 0.01, 1) }), Color3.FromInts(127, 127, 255), activeParent)
  playerElements.push(paddle)

  // Fire a ball
  input.subscribe("BUTTON_DOWN", ActionButton.POINTER, false, () => {
    if (GameManager.hasGameLoaded && !GameManager.isBallAlive) {
      GameManager.isBallAlive = true
      let forwardVector = Vector3.Forward()
      forwardVector.y = 0 // Ignore y-axis
      shoot(Vector3.Normalize(forwardVector))
    }
  })

  // E Key
  input.subscribe("BUTTON_DOWN", ActionButton.PRIMARY, false, () => {
    GameManager.isEKeyPressed = true
  })
  input.subscribe("BUTTON_UP", ActionButton.PRIMARY, false, () => {
    GameManager.isEKeyPressed = false
  })

  // F Key
  input.subscribe("BUTTON_DOWN", ActionButton.SECONDARY, false, () => {
    GameManager.isFKeyPressed = true
  })
  input.subscribe("BUTTON_UP", ActionButton.SECONDARY, false, () => {
    GameManager.isFKeyPressed = false
  })

  // Calculate paddle position above all else
  class ButtonChecker {
    update(dt: number) {
      let transform = paddle.getComponent(Transform)
      let increment = Vector3.Right().scale(dt * GameManager.PADDLE_SPEED)

      if (!GameManager.isEKeyPressed && !GameManager.isFKeyPressed) arcade.controlStop()

      if (GameManager.isEKeyPressed && transform.position.x >= GameManager.NEG_X_LIMIT) {
        transform.translate(increment.multiplyByFloats(-1, -1, -1))
        arcade.controlLeft()
      }
      if (GameManager.isFKeyPressed && transform.position.x <= GameManager.POS_X_LIMIT) {
        transform.translate(increment)
        arcade.controlRight()
      }
    }
  }

  buttonSystem = engine.addSystem(new ButtonChecker(), 0)

  function shoot(direction: Vector3): void {
    let paddlePosition = paddle.getComponent(Transform).position
    let spawnPosition = new Vector3(paddlePosition.x, GameManager.PLANE_HEIGHT, paddlePosition.z + 1)
    const ball = new Ball(new Transform({ position: spawnPosition, scale: new Vector3(0.3, 0.1, 0.4) }), direction, activeParent)
    playerElements.push(ball)
  }
}

export function unloadPlayer() {
  while (playerElements.length) {
    let playerElement = playerElements.pop() as Entity
    engine.removeEntity(playerElement)
  }
  GameManager.hasGameLoaded = false
  GameManager.isBallAlive = false
  engine.removeSystem(buttonSystem)
}
