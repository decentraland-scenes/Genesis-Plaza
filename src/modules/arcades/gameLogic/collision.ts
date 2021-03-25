import { Ball, BallFlag } from "../gameObjects/ball"
import { BrickFlag } from "../gameObjects/brick"
import { PaddleFlag } from "../gameObjects/paddle"
import { Sound } from "../gameObjects/sound"
import * as utils from "@dcl/ecs-scene-utils"
import { Wall, WallFlag } from "../gameObjects/wall"

@Component("collisionFlag")
export class CollisionFlag {}

const hitSound = new Sound(new AudioClip("sounds/hit.mp3"))

// Collision detection
class CollisionDetection {
  private ballGroup = engine.getComponentGroup(BallFlag)
  private collisionGroup = engine.getComponentGroup(CollisionFlag)
  update(dt: number) {
    for (let ballEntity of this.ballGroup.entities as Ball[]) {
      for (let hitEntity of this.collisionGroup.entities as Wall[]) {
        let ballPos = ballEntity.getComponent(Transform).position
        let brickPos = hitEntity.getComponent(Transform).position
        let ballSize = ballEntity.getComponent(Transform).scale
        let brickSize = hitEntity.getComponent(Transform).scale
        let ballPosX = ballPos.x - ballSize.x / 2
        let ballPosZ = ballPos.z + ballSize.z / 2
        let brickPosX = brickPos.x - brickSize.x / 2
        let brickPosZ = brickPos.z + brickSize.z / 2
        let collisionNorm: Vector3

        if (
          ballPosX + ballSize.x >= brickPosX &&
          ballPosX <= brickPosX + brickSize.x &&
          ballPosZ - ballSize.z <= brickPosZ &&
          ballPosZ >= brickPosZ - brickSize.z
        ) {
          hitSound.getComponent(AudioSource).playOnce()

          // HACK: Temporary disable collisions on entity that's already been hit
          hitEntity.removeComponent(CollisionFlag)
          hitEntity.addComponentOrReplace(
            new utils.Delay(100, () => {
              hitEntity.addComponent(new CollisionFlag())
            })
          )

          let isPaddle = hitEntity.hasComponent(PaddleFlag)
          let isWall = hitEntity.hasComponent(WallFlag)
          isWall ? (collisionNorm = hitEntity.normal) : (collisionNorm = collisionNormal(ballEntity, hitEntity))
          ballEntity.direction = reflectVector(ballEntity.direction, collisionNorm, isPaddle, isWall)

          // If it's a brick then remove it
          if (hitEntity.hasComponent(BrickFlag) && !hitEntity.hasComponent(utils.ExpireIn)) {
            hitEntity.addComponent(new utils.ExpireIn(100))
          }
        }
      }
    }
  }
}
engine.addSystem(new CollisionDetection())

function reflectVector(incident: Vector3, normal: Vector3, isPaddle: boolean, isWall: boolean): Vector3 {
  let dot = 2 * Vector3.Dot(incident, normal)
  let reflected = incident.subtract(normal.multiplyByFloats(dot, dot, dot))

  // HACKS: Collision issues
  if (isWall) {
    if (normal.x == 1 && reflected.x < 0) reflected.x *= -1
    if (normal.x == -1 && reflected.x > 0) reflected.x *= -1
    if (normal.z == 1 && reflected.z < 0) reflected.z *= -1
    if (normal.z == -1 && reflected.z > 0) reflected.z *= -1
  }
  if (isPaddle && reflected.z <= 0) reflected.z *= -1

  // Remove shallow angles to prevent stale gameplay
  if (reflected.z >= 0 && reflected.z <= 0.25) reflected.z = 0.35
  if (reflected.z <= 0 && reflected.z >= -0.25) reflected.z = -0.35

  return Vector3.Normalize(reflected)
}

function collisionNormal(ballEntity: Ball, hitEntity: IEntity): Vector3 {
  let ballPosition = ballEntity.getComponent(Transform).position
  let hitEntityPosition = hitEntity.getComponent(Transform).position
  let hitEntityWidth = hitEntity.getComponent(Transform).scale.x
  let delta = ballPosition.subtract(hitEntityPosition)
  let normal = new Vector3(0, 0, 1)

  // If the ball hits a paddle
  if (hitEntity.hasComponent(PaddleFlag)) {
    // Paddle normal logic
    normal.x = delta.x / 2

    // If ball hits the side of the paddle
    if (delta.x <= -hitEntityWidth / 2 || delta.x >= hitEntityWidth / 2) normal.set(1, 0, 0)

    // Corner cases
    if (delta.x <= -hitEntityWidth / 2 && ballEntity.direction.x < 0) normal.set(-1, 0, 1)
    if (delta.x >= hitEntityWidth / 2 && ballEntity.direction.x > 0) normal.set(1, 0, 1)

    return Vector3.Normalize(normal) // Normalize the vector first to maintain constant ball speed
  } else {
    if (delta.x <= -hitEntityWidth / 2 || delta.x >= hitEntityWidth / 2) normal.set(1, 0, 0)

    // Corner cases
    if (delta.x <= -hitEntityWidth / 2 && ballEntity.direction.x < 0) normal.set(0, 0, 1)
    if (delta.x >= hitEntityWidth / 2 && ballEntity.direction.x > 0) normal.set(0, 0, 1)
  }
  return Vector3.Normalize(normal)
}
