import { Ball, BallFlag } from "../gameObjects/ball"
import { Sound } from "../gameObjects/sound"
import { GameManager } from "../gameManager"

// Sound
const missSound = new Sound(new AudioClip("sounds/miss.mp3"))

class BallTranslatorSystem {
  private ballGroup = engine.getComponentGroup(BallFlag)

  update(dt: number) {
    for (let entity of this.ballGroup.entities as Ball[]) {
      let transform = entity.getComponent(Transform)
      let increment = entity.direction.scale(dt * GameManager.BALL_SPEED)
      transform.translate(increment)
      if (transform.position.z <= GameManager.OUT_OF_BOUNDS) {
        GameManager.isBallAlive = false
        missSound.getComponent(AudioSource).playOnce()
        engine.removeEntity(entity)
      }
      if (transform.position.x < 0 || transform.position.x > 32 || transform.position.z < 0 || transform.position.z > 32) {
        GameManager.isBallAlive = false
        engine.removeEntity(entity)
      }
    }
  }
}

engine.addSystem(new BallTranslatorSystem(), 1)
