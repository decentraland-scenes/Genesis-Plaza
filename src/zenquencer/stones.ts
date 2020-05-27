import { MusicalDrop, drops, loopPlayer } from './musicalDrops'
import { changeSequencer } from './serverHandler'
import { sceneMessageBus } from '../modules/serverHandler'
import resources from './resources'

// export const sceneMessageBus = new MessageBus()

export let stones: Stone[] = []

// lightweight storage of sequencer state
export let seqNumbers: number[][] = []

// reusable stone class
export class Stone extends Entity {
  sound: AudioClip
  index: number
  stoneOn: boolean = false
  drop: MusicalDrop
  constructor(
    shape: GLTFShape,
    transform: Transform,
    sound: AudioClip,
    index: number,
    parent: Entity
  ) {
    super()
    this.setParent(parent)
    engine.addEntity(this)
    this.addComponent(shape)
    this.addComponent(transform)

    // note ID
    this.sound = sound

    this.index = index

    let thisStone = this

    this.addComponent(
      new OnPointerDown(
        (e) => {
          log('toggle stone')
          if (this.stoneOn) {
            sceneMessageBus.emit('hideStone', { stone: thisStone.index })
          } else {
            sceneMessageBus.emit('showStone', { stone: thisStone.index })
          }
        },
        {
          button: ActionButton.POINTER,
          hoverText: 'Toggle',
        }
      )
    )

    this.drop = new MusicalDrop(
      new GLTFShape('models/zenquencer/music-drop.glb'),
      new Transform({
        position: new Vector3(0, 0, 0),
      }),
      this.sound,
      this.index
    )
    this.drop.setParent(this)
    this.drop.removeComponent(GLTFShape)
    drops.push(this.drop)
  }
}

sceneMessageBus.on('showStone', (e) => {
  stones[e.stone].stoneOn = true
  stones[e.stone].getComponent(Transform).rotation = Quaternion.Euler(0, 0, 0)

  stones[e.stone].drop.addComponentOrReplace(stones[e.stone].drop.shape)

  if (!loopPlayer.playingMode) {
    stones[e.stone].drop.play()
  }

  let note = e.stone % 7
  let beat = Math.floor(e.stone / 7)
  log('beat ', beat, ' note ', note)
  seqNumbers[beat][note] = 1
  changeSequencer()
})

sceneMessageBus.on('hideStone', (e) => {
  stones[e.stone].stoneOn = false
  stones[e.stone].getComponent(Transform).rotation = Quaternion.Euler(180, 0, 0)

  stones[e.stone].drop.removeComponent(GLTFShape)

  let note = e.stone % 7
  let beat = Math.floor(e.stone / 7)
  seqNumbers[beat][note] = 0
  changeSequencer()
})
