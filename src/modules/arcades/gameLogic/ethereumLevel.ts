import { Brick } from "../gameObjects/brick"
import { Wall } from "../gameObjects/wall"
import { Background } from "../gameObjects/background"
import { GameManager } from "../gameManager"

// Ready player one
let readyPlayerOne: Entity
const readyPlayerOneShape = new GLTFShape("models/readyPlayerOne.glb")

// Setup
const gameElements: Entity[] = []
const ethLight = Color3.FromInts(138, 146, 178)
const ethMid = Color3.FromInts(98, 104, 143)
const ethDark = Color3.FromInts(69, 74, 117)
const brickOffsetX = 7
const brickOffsetZ = 28
const brickSize = 0.55
const bricks = [
  // Row 1
  { position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ), color: ethMid },
  // Row 2
  { position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize), color: ethMid },
  // Row 3
  { position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 2), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 2), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 2), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 2), color: ethMid },
  // Row 4
  { position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 3), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 3), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 3), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 3), color: ethMid },
  // Row 5
  { position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 4), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 4), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 4), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 4), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 4), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 4), color: ethMid },
  // Row 6
  { position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 5), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 5), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 5), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 5), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 5), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 5), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 5), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 5), color: ethMid },
  // Row 7
  { position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 6), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 6), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 6), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 6), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 6), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 6), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 6), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 6), color: ethMid },
  // Row 8
  { position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 7), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 7), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 7), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 7), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 7), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 7), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 7), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 7), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 7), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 7), color: ethMid },
  // Row 9
  { position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 8), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 8), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 8), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 8), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 8), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 8), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 8), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 8), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 8), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 8), color: ethMid },
  // Row 10
  { position: new Vector3(brickOffsetX + brickSize * 11, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 9), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 9), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 9), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 9), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 9), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 9), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 9), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 9), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 9), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 9), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 9), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 22, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 9), color: ethMid },
  // Row 11
  { position: new Vector3(brickOffsetX + brickSize * 10, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 10), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 11, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 10), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 10), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 10), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 10), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 10), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 10), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 10), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 10), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 10), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 10), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 10), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 22, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 10), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 23, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 10), color: ethMid },
  // Row 12
  { position: new Vector3(brickOffsetX + brickSize * 10, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 11), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 11, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 11), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 11), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 11), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 11), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 11), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 11), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 11), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 11), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 11), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 11), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 11), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 22, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 11), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 23, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 11), color: ethMid },
  // Row 13
  { position: new Vector3(brickOffsetX + brickSize * 9, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 10, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 11, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 22, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 23, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 24, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12), color: ethMid },
  // Row 14
  { position: new Vector3(brickOffsetX + brickSize * 9, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 10, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 11, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 22, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 23, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 24, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13), color: ethMid },
  // Row 15
  { position: new Vector3(brickOffsetX + brickSize * 8, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 9, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 10, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 11, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 22, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 23, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 24, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 25, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14), color: ethMid },
  // Row 16
  { position: new Vector3(brickOffsetX + brickSize * 7, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 8, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 9, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 10, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 11, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 22, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 23, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 24, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 25, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 26, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15), color: ethMid },
  // Row 17
  { position: new Vector3(brickOffsetX + brickSize * 8, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 9, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 10, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 11, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 22, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 23, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 24, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 25, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16), color: ethDark },
  // Row 18
  { position: new Vector3(brickOffsetX + brickSize * 9, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 10, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 11, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 22, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 23, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 24, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17), color: ethDark },
  // Row 19
  { position: new Vector3(brickOffsetX + brickSize * 7, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 18), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 11, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 18), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 18), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 18), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 18), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 18), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 18), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 18), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 18), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 18), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 18), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 18), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 22, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 18), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 26, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 18), color: ethMid },
  // Row 20
  { position: new Vector3(brickOffsetX + brickSize * 8, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 19), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 9, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 19), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 19), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 19), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 19), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 19), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 19), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 19), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 19), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 19), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 19), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 19), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 24, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 19), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 25, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 19), color: ethMid },
  // Row 21
  { position: new Vector3(brickOffsetX + brickSize * 9, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 20), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 10, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 20), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 20), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 20), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 20), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 20), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 20), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 20), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 23, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 20), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 24, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 20), color: ethMid },
  // Row 22
  { position: new Vector3(brickOffsetX + brickSize * 9, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 21), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 10, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 21), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 11, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 21), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 21), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 21), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 21), color: ethDark },
  { position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 21), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 22, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 21), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 23, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 21), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 24, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 21), color: ethMid },
  // Row 23
  { position: new Vector3(brickOffsetX + brickSize * 10, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 22), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 11, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 22), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 22), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 22), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 22), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 22), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 22), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 22), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 22, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 22), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 23, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 22), color: ethMid },
  // Row 24
  { position: new Vector3(brickOffsetX + brickSize * 11, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 23), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 23), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 23), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 23), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 23), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 23), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 23), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 23), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 23), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 22, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 23), color: ethMid },
  // Row 25
  { position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 24), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 24), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 24), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 24), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 24), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 24), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 24), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 24), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 24), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 24), color: ethMid },
  // Row 26
  { position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 25), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 25), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 25), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 25), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 25), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 25), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 25), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 25), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 25), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 25), color: ethMid },
  // Row 27
  { position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 26), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 26), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 26), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 26), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 26), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 26), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 26), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 26), color: ethMid },
  // Row 28
  { position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 27), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 27), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 27), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 27), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 27), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 27), color: ethMid },
  // Row 29
  { position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 28), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 28), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 28), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 28), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 28), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 28), color: ethMid },
  // Row 30
  { position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 29), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 29), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 29), color: ethMid },
  { position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 29), color: ethMid },
  // Row 31
  { position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 30), color: ethLight },
  { position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 30), color: ethMid },
]

export function loadEthereumLevel(parent: Entity): void {
  readyPlayerOne = new Entity()
  readyPlayerOne.addComponent(readyPlayerOneShape)
  readyPlayerOne.addComponent(new Transform({ position: new Vector3(16, 1, 16) }))
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

export function loadEthereumBricks(parent: Entity): void {
  readyPlayerOne.getComponent(GLTFShape).visible = false
  for (let i = 0; i < bricks.length; i++) {
    const brick = new Brick(new Transform({ position: bricks[i].position, scale: new Vector3(brickSize - 0.1, 0.1, brickSize - 0.1) }), bricks[i].color, parent)
    gameElements.push(brick)
  }
}

export function unloadEthereumBricks(): void {
  readyPlayerOne.getComponent(GLTFShape).visible = true
  while (gameElements.length) {
    let gameElement = gameElements.pop() as Entity
    engine.removeEntity(gameElement)
  }
}
