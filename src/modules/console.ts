import { sceneMessageBus } from './serverHandler'
import utils from '../../node_modules/decentraland-ecs-utils/index'

const musicStream = new Entity()
engine.addEntity(musicStream)

let baseConsole = new Entity()
baseConsole.addComponent(
  new GLTFShape('models/console-artichoke/base_console.glb')
)
baseConsole.addComponent(
  new Transform({
    position: new Vector3(44.8, 8.5, 36.8),
    rotation: Quaternion.Euler(0, 60, 0),
  })
)
engine.addEntity(baseConsole)

export class ConsoleButton extends Entity {
  clickAnim: AnimationState
  constructor(model: GLTFShape, parent: Entity, animationName: string) {
    super()
    engine.addEntity(this)

    this.addComponent(model)
    this.setParent(parent)

    this.addComponent(new AudioSource(new AudioClip('sounds/click.mp3')))

    this.addComponent(new Animator())
    this.clickAnim = new AnimationState(animationName, { looping: false })
    this.getComponent(Animator).addClip(this.clickAnim)
  }

  /**
   * A button can be pressed.  At the moment this just plays a sound effect
   * but maybe an animation will be added in the future as well.
   */
  public press(): void {
    this.clickAnim.stop() // bug workaround
    this.clickAnim.play()
    this.getComponent(AudioSource).playOnce()
  }
}

let blueButton = new ConsoleButton(
  new GLTFShape('models/console-artichoke/blue_button.glb'),
  baseConsole,
  'Blue_ButtonAction'
)

blueButton.addComponent(
  new OnPointerDown(
    () => {
      sceneMessageBus.emit('setRadio', {
        station: 'https://icecast.ravepartyradio.org/ravepartyradio-192.mp3',
      })
      blueButton.press()
    },
    { hoverText: 'Rave' }
  )
)

let greenButton = new ConsoleButton(
  new GLTFShape('models/console-artichoke/green_button.glb'),
  baseConsole,
  'Green_ButtonAction'
)

greenButton.addComponent(
  new OnPointerDown(
    () => {
      sceneMessageBus.emit('setRadio', {
        station: 'https://dclcoreradio.com/dclradio.ogg',
      })
      greenButton.press()
    },
    { hoverText: 'DCL Interviews' }
  )
)

let lightBlueButton = new ConsoleButton(
  new GLTFShape('models/console-artichoke/lightblue_button.glb'),
  baseConsole,
  'Lightblue_ButtonAction'
)

lightBlueButton.addComponent(
  new OnPointerDown(
    () => {
      sceneMessageBus.emit('setRadio', {
        station: 'https://cdn.instream.audio/:9069/stream?_=171cd6c2b6e',
      })
      lightBlueButton.press()
    },
    { hoverText: 'Delta' }
  )
)

let redButton = new ConsoleButton(
  new GLTFShape('models/console-artichoke/red_button.glb'),
  baseConsole,
  'Red_ButtonAction'
)

redButton.addComponent(
  new OnPointerDown(
    () => {
      sceneMessageBus.emit('setRadio', {
        station: 'https://edge.singsingmusic.net/MC2.mp3',
      })
      redButton.press()
    },
    { hoverText: 'Signs' }
  )
)

let yellowButton = new ConsoleButton(
  new GLTFShape('models/console-artichoke/yellow_button.glb'),
  baseConsole,
  'Yellow_ButtonAction'
)

yellowButton.addComponent(
  new OnPointerDown(
    () => {
      sceneMessageBus.emit('setRadio', {
        station: 'https://edge.singsingmusic.net/MC2.mp3',
      })
      yellowButton.press()
    },
    { hoverText: 'Signs' }
  )
)

sceneMessageBus.on('setRadio', (e) => {
  //  if()  if close
  if (musicStream.hasComponent(AudioStream)) {
    musicStream.getComponent(AudioStream).playing = false
    musicStream.removeComponent(AudioStream)
  }

  musicStream.addComponent(
    new utils.Delay(100, () => {
      musicStream.addComponentOrReplace(new AudioStream(e.station))
    })
  )
})

// turn on when approach

//// stations

//  Rave: https://icecast.ravepartyradio.org/ravepartyradio-192.mp3

// DCL Interviews:  https://dclcoreradio.com/dclradio.ogg

// Electronic -  Delta: (argentina?)  https://cdn.instream.audio/:9069/stream?_=171cd6c2b6e

// https://edge.singsingmusic.net/MC2.mp3

// raw sites:
// https://www.a100.radio/
