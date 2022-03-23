import { sceneMessageBus } from './serverHandler'
import * as utils from '@dcl/ecs-scene-utils'
import { Radios } from './bar/jukebox'

export function startArtichoke() {
  let isInRadioRange: boolean = false
  let currentRadio: Radios | null = null

  const musicStreamEnt = new Entity()
  engine.addEntity(musicStreamEnt)

  let musicStream: AudioStream | null = null

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

  class ConsoleButton extends Entity {
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
          station: Radios.RAVE,
        })
        blueButton.press()
      },
      {
        button: ActionButton.PRIMARY,
        hoverText: 'Rave',
      }
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
          station: Radios.JAZZ,
        })
        greenButton.press()
      },
      {
        button: ActionButton.PRIMARY,
        hoverText: 'Vegas Jazz FM',
      }
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
          station: Radios.DELTA,
        })
        lightBlueButton.press()
      },
      {
        button: ActionButton.PRIMARY,
        hoverText: 'Delta',
      }
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
          station: Radios.SIGNS,
        })
        redButton.press()
      },
      {
        button: ActionButton.PRIMARY,
        hoverText: 'Signs',
      }
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
          station: Radios.GRAFFITI,
        })
        yellowButton.press()
      },
      {
        button: ActionButton.PRIMARY,
        hoverText: 'Graffiti Kings',
      }
    )
  )

  sceneMessageBus.on('setRadio', (e) => {
    //  if()  if close
    if (musicStream) {
      musicStream.playing = false
      musicStream = null
    }
    currentRadio = e.station
    radioOn(e.station)
  })

  function radioOn(station) {
    LightsA.play()
    LightsB.play()
    LightsC.play()
    if (isInRadioRange) {
      musicStreamEnt.addComponent(
        new utils.Delay(100, () => {
          musicStream = new AudioStream(station)
          musicStreamEnt.addComponentOrReplace(musicStream)
        })
      )
    }
  }

  function radioOff() {
    LightsA.stop()
    LightsB.stop()
    LightsC.stop()
    if (musicStream) {
      musicStream.playing = false
    }
  }

  ///// LIGTHS

  let LightsA = new AnimationState('Lights_Anim')
  let LightsB = new AnimationState('LightsB_Artichoke')
  let LightsC = new AnimationState('LightsC_Artichoke')

  let artichokeLightsA = new Entity()
  artichokeLightsA.addComponent(new GLTFShape('models/LightsA_Artichoke.glb'))
  artichokeLightsA.addComponent(
    new Transform({
      rotation: Quaternion.Euler(0, 180, 0),
    })
  )
  artichokeLightsA.addComponent(new Animator()).addClip(LightsA)
  engine.addEntity(artichokeLightsA)

  let artichokeLightsB = new Entity()
  artichokeLightsB.addComponent(new GLTFShape('models/LightsB_Artichoke.glb'))
  artichokeLightsB.addComponent(
    new Transform({
      rotation: Quaternion.Euler(0, 180, 0),
    })
  )
  artichokeLightsB.addComponent(new Animator()).addClip(LightsB)
  engine.addEntity(artichokeLightsB)

  let artichokeLightsC = new Entity()
  artichokeLightsC.addComponent(new GLTFShape('models/LightsC_Artichoke.glb'))
  artichokeLightsC.addComponent(
    new Transform({
      rotation: Quaternion.Euler(0, 180, 0),
    })
  )
  artichokeLightsC.addComponent(new Animator()).addClip(LightsC)
  engine.addEntity(artichokeLightsC)
  LightsA.stop()
  LightsB.stop()
  LightsC.stop()

  const artichokeTrigger = new Entity()
  artichokeTrigger.addComponent(
    new Transform({ position: new Vector3(47, 6, 46) })
  )

  let artichokeTriggerBox = new utils.TriggerBoxShape(
    new Vector3(90, 14, 90),
    Vector3.Zero()
  )
  artichokeTrigger.addComponent(
    new utils.TriggerComponent(
      artichokeTriggerBox, //shape
      {
        onCameraEnter: () => {
          sceneMessageBus.emit('enteredRadioRange', {})
          isInRadioRange = true
          if (currentRadio) {
            radioOn(currentRadio)
          }

          log('triggered!')
        },
        onCameraExit: () => {
          isInRadioRange = false
          radioOff()
        },
      }
    )
  )
  engine.addEntity(artichokeTrigger)

  sceneMessageBus.on('enteredRadioRange', (e) => {
    if (!isInRadioRange || currentRadio === null) return
    sceneMessageBus.emit('setRadio', {
      station: currentRadio,
    })
  })
}
