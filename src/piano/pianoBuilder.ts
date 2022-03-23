import * as utils from '@dcl/ecs-scene-utils'
import resources from '../resources'
import { PianoKey, keys, addKeyListeners } from './pianoKey'

export function addPiano(): void {
  // For piano for transforming the piano
  const pianoBase = new Entity()
  pianoBase.addComponent(resources.models.standard.pianoBase)
  pianoBase.addComponent(
    new Transform({
      position: new Vector3(162.0, 0.0, 291.312),
    })
  )
  engine.addEntity(pianoBase)

  // Key shape
  const keyShape = new PlaneShape()

  // White keys
  const whiteKeySounds: AudioClip[] = [
    resources.sounds.piano.whiteKeys.c3,
    resources.sounds.piano.whiteKeys.d3,
    resources.sounds.piano.whiteKeys.e3,
    resources.sounds.piano.whiteKeys.f3,
    resources.sounds.piano.whiteKeys.g3,
    resources.sounds.piano.whiteKeys.a3,
    resources.sounds.piano.whiteKeys.b3,
    resources.sounds.piano.whiteKeys.c4,
    resources.sounds.piano.whiteKeys.d4,
    resources.sounds.piano.whiteKeys.e4,
    resources.sounds.piano.whiteKeys.f4,
    resources.sounds.piano.whiteKeys.g4,
    resources.sounds.piano.whiteKeys.a4,
    resources.sounds.piano.whiteKeys.b4,
    resources.sounds.piano.whiteKeys.c5,
    resources.sounds.piano.whiteKeys.d5,
    resources.sounds.piano.whiteKeys.e5,
    resources.sounds.piano.whiteKeys.f5,
    resources.sounds.piano.whiteKeys.g5,
    resources.sounds.piano.whiteKeys.a5,
    resources.sounds.piano.whiteKeys.b5,
  ]

  let whiteKeyXPos = -8.0001 // Workaround: Issue with setting this to -8

  for (let i = 0; i < whiteKeySounds.length; i++) {
    const key = new PianoKey(
      keyShape,
      new Transform({
        position: new Vector3(whiteKeyXPos, 0.11, 0),
        scale: new Vector3(0.7, 4, 1),
        rotation: new Quaternion(0.70711, 0, 0, 0.70711),
      }),
      Color3.White(),
      whiteKeySounds[i],
      resources.trigger.triggerWhitePianoKey,
      i
    )
    key.setParent(pianoBase)
    keys.push(key)
    whiteKeyXPos += 0.8
  }

  // Black keys
  const blackKeySounds: AudioClip[] = [
    resources.sounds.piano.blackKeys.cSharp3,
    resources.sounds.piano.blackKeys.dSharp3,
    resources.sounds.piano.blackKeys.fSharp3,
    resources.sounds.piano.blackKeys.gSharp3,
    resources.sounds.piano.blackKeys.aSharp3,
    resources.sounds.piano.blackKeys.cSharp4,
    resources.sounds.piano.blackKeys.dSharp4,
    resources.sounds.piano.blackKeys.fSharp4,
    resources.sounds.piano.blackKeys.gSharp4,
    resources.sounds.piano.blackKeys.aSharp4,
    resources.sounds.piano.blackKeys.cSharp5,
    resources.sounds.piano.blackKeys.dSharp5,
    resources.sounds.piano.blackKeys.fSharp5,
    resources.sounds.piano.blackKeys.gSharp5,
    resources.sounds.piano.blackKeys.aSharp5,
  ]

  let blackKeyXPos = -7.6001 // Workaround: Issue with setting this to -7.6
  let skipKey = 1

  for (let i = 0; i < blackKeySounds.length; i++) {
    const key = new PianoKey(
      keyShape,
      new Transform({
        position: new Vector3(blackKeyXPos, 0.12, 1),
        scale: new Vector3(0.45, 2, 1),
        rotation: new Quaternion(0.70711, 0, 0, 0.70711),
      }),
      Color3.Black(),
      blackKeySounds[i],
      resources.trigger.triggerBlackPianoKey,
      i + whiteKeySounds.length
    )
    key.setParent(pianoBase)
    keys.push(key)

    // Skip key
    skipKey++
    skipKey % 3 != 0 ? (blackKeyXPos += 0.8) : (blackKeyXPos += 1.6)
    if (skipKey === 6) skipKey = 1
  }
  addKeyListeners()
}
