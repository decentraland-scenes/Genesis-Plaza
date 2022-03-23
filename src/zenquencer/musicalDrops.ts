import { seqNumbers } from './stones'
import { stones } from './stones'
import { sceneMessageBus } from '../modules/serverHandler'
import { energyAnimation, linear, random } from './zenquencerBuilder'

//export const sceneMessageBus = new MessageBus()

export const loopDuration = 60

export let drops: MusicalDrop[] = []

// reusable stone class
export class MusicalDrop extends Entity {
  note: number
  shape: GLTFShape
  anim: AnimationState

  constructor(
    shape: GLTFShape,
    transform: Transform,

    sound: AudioClip,
    note: number
  ) {
    super()
    engine.addEntity(this)
    //this.addComponent(shape)
    this.addComponent(transform)

    // note ID
    this.note = note

    // store shape to add to entity later
    this.shape = shape

    // Sound
    this.addComponent(new AudioSource(sound))

    this.anim = new AnimationState('ArmatureAction.001', { looping: false })

    this.addComponent(new Animator()).addClip(this.anim)

    // needed to reference the entity from inside a component, because `this` in there refers to the component
    let thisStone = this
  }
  public play(): void {
    this.getComponent(AudioSource).playOnce()
    this.anim.stop()
    this.anim.play()

    // animate
  }
}

// system to play the loop continuously
export class PlaySequence implements ISystem {
  playingMode: number // 0 = off, 1 = loop, 2 = random
  currentBeat: number
  loopDuration: number
  durationLeft: number
  beats: number
  currentLoop: number
  beatDuration: number
  constructor(loopDuration: number, totalDuration: number, beats: number) {
    this.durationLeft = totalDuration
    this.loopDuration = loopDuration
    this.beats = beats
    this.currentLoop = 0
    this.currentBeat = 0
    this.beatDuration = this.loopDuration / this.beats
  }
  update(dt: number) {
    if (!this.playingMode) {
      return
    }

    this.durationLeft -= dt
    if (this.durationLeft < 0) {
      this.playingMode = 0
      energyAnimation.stop()
      linear.getComponent(Transform).rotation = Quaternion.Euler(0, 180, 0)
      random.getComponent(Transform).rotation = Quaternion.Euler(0, 180, 0)
    }
    this.currentLoop += dt
    if (this.currentLoop >= this.currentBeat * this.beatDuration) {
      this.currentBeat += 1
      if (this.currentBeat >= this.beats) {
        this.currentLoop = 0
        this.currentBeat = 0

        log('new loop')
      }
      if (this.playingMode === 1) {
        // sequence mode
        for (let i = 0; i < 7; i++) {
          if (seqNumbers[this.currentBeat][i]) {
            stones[this.currentBeat * 7 + i].drop.play()
          }
        }
      } else {
        // random mode
        let randomBeat = Math.floor(Math.random() * this.beats)
        for (let i = 0; i < 7; i++) {
          if (seqNumbers[randomBeat][i]) {
            stones[randomBeat * 7 + i].drop.play()
          }
        }
      }
    }
  }
}

// start loop, w 8 second loops and with 16 beats
export let loopPlayer = new PlaySequence(8, loopDuration, 16)
engine.addSystem(loopPlayer)
