import { sceneMessageBus } from './serverHandler'
import * as utils from '@dcl/ecs-scene-utils'

export enum Radios {
  RAVE = 'https://icecast.ravepartyradio.org/ravepartyradio-192.mp3',
  INTERVIEW = 'https://dclcoreradio.com/dclradio.ogg',
  DELTA = 'https://cdn.instream.audio/:9069/stream?_=171cd6c2b6e',
  SIGNS = 'https://edge.singsingmusic.net/MC2.mp3',
  MKLAB = 'https://freeuk13.listen2myradio.com/live.mp3?typeportmount=s2_20223_stream_944192845',
}

export let isInBar: boolean = false
let barCurrentRadio: Radios | null = Radios.RAVE
let barCurrentRadioIndex: number = 0
let radioCount = 5
let radioIsOn: boolean = true

const barMusicStreamEnt = new Entity()
engine.addEntity(barMusicStreamEnt)

export let barMusicStream: AudioStream | null = null

let baseJukeBox = new Entity()
let baseJukeBoxLights1 = new Entity()
let baseJukeBoxLights2 = new Entity()
// let jukeBoxLightsAnim1 = new AnimationState('Light_Action', { looping: true })
// jukeBoxLightsAnim1.stop()
// let jukeBoxLightsAnim2 = new AnimationState('Jukebox_Lights_Action', {
//   looping: true,
// })
// jukeBoxLightsAnim2.stop()

export function placeJukeBox() {
  barMusicStream = new AudioStream(barCurrentRadio)
  barMusicStream.volume = 0.4
  barMusicStream.playing = false

  baseJukeBox.addComponent(
    new GLTFShape('models/core_building/jukebox/Jukebox_Base.glb')
  )
  baseJukeBox.addComponent(
    new Transform({
      position: new Vector3(179, 0, 144),
      rotation: Quaternion.Euler(0, -45, 0),
      scale: new Vector3(0.75, 0.75, 0.75),
    })
  )
  engine.addEntity(baseJukeBox)

  baseJukeBoxLights1.addComponent(
    new GLTFShape('models/core_building/jukebox/Lights_01.glb')
  )
  baseJukeBoxLights1.getComponent(GLTFShape).visible = false
  baseJukeBoxLights1.addComponent(new Transform({}))
  //baseJukeBoxLights1.addComponent(new Animator())
  baseJukeBoxLights1.setParent(baseJukeBox)
  engine.addEntity(baseJukeBoxLights1)
  //   baseJukeBoxLights1.getComponent(Animator).addClip(jukeBoxLightsAnim1)

  baseJukeBoxLights2.addComponent(
    new GLTFShape('models/core_building/jukebox/Lights_02.glb')
  )
  baseJukeBoxLights2.getComponent(GLTFShape).visible = false
  baseJukeBoxLights2.addComponent(new Transform({}))
  //baseJukeBoxLights2.addComponent(new Animator())
  baseJukeBoxLights2.setParent(baseJukeBox)
  engine.addEntity(baseJukeBoxLights2)
  //baseJukeBoxLights2.getComponent(Animator).addClip(jukeBoxLightsAnim2)

  let JukeboxScreen = new Entity()
  let JukeBoxText = new TextShape('Radio:\nRave Party')
  JukeBoxText.fontSize = 1
  JukeboxScreen.addComponent(JukeBoxText)

  JukeboxScreen.setParent(baseJukeBox)
  JukeboxScreen.addComponent(
    new Transform({
      position: new Vector3(0, 2.55, 0.25),
      rotation: Quaternion.Euler(0, 180, 0),
    })
  )

  let onButton = new JukeboxButton(
    new GLTFShape('models/core_building/jukebox/Button_On.glb'),
    'Button_On',
    () => {
      let musicState = barMusicStream && barMusicStream.playing
      sceneMessageBus.emit('BarRadioToggle', {
        state: !musicState,
      })
    },
    'On/Off'
  )

  let nextButton = new JukeboxButton(
    new GLTFShape('models/core_building/jukebox/ButtonForward.glb'),
    'Button_Forward',
    () => {
      barCurrentRadioIndex += 1
      if (barCurrentRadioIndex > radioCount) barCurrentRadioIndex = 0
      JukeBoxText.value = 'Radio:\n' + getRadioName(barCurrentRadioIndex)

      if (barMusicStream && barMusicStream.playing) {
        sceneMessageBus.emit('setBarRadio', {
          index: barCurrentRadioIndex,
        })
      }
    },
    'Next'
  )

  let prewiousButton = new JukeboxButton(
    new GLTFShape('models/core_building/jukebox/Button_Previous.glb'),
    'Button_Preview',
    () => {
      barCurrentRadioIndex -= 1
      if (barCurrentRadioIndex < 0) barCurrentRadioIndex = radioCount - 1
      JukeBoxText.value = 'Radio:\n' + getRadioName(barCurrentRadioIndex)

      if (barMusicStream && barMusicStream.playing) {
        sceneMessageBus.emit('setBarRadio', {
          index: barCurrentRadioIndex,
        })
      }
    },
    'Previous'
  )

  sceneMessageBus.on('BarRadioToggle', (e) => {
    if (barMusicStream && e.state == barMusicStream.playing) return
    if (e.state) {
      barRadioOn()
      radioIsOn = true
    } else {
      barRadioOff()
      radioIsOn = false
    }
  })

  sceneMessageBus.on('setBarRadio', (e) => {
    // update display

    let newRadio: Radios
    switch (e.index) {
      case 0:
        newRadio = Radios.RAVE
        break
      case 1:
        newRadio = Radios.DELTA
        break
      case 2:
        newRadio = Radios.INTERVIEW
        break
      case 3:
        newRadio = Radios.MKLAB
        break
      case 4:
        newRadio = Radios.SIGNS
        break
      case null:
        newRadio = null
        break
    }

    if (barCurrentRadio == newRadio && barMusicStream && barMusicStream.playing)
      return
    if (barMusicStream) {
      barMusicStream.playing = false
      barMusicStream = null
    }
    barCurrentRadioIndex = e.index
    barCurrentRadio = newRadio

    JukeBoxText.value = 'Radio:\n' + getRadioName(barCurrentRadioIndex)

    barRadioOn(barCurrentRadio)
  })

  sceneMessageBus.on('enteredRadioRange', (e) => {
    if (!isInBar || barCurrentRadio == null) return
    if (e.radio == barCurrentRadioIndex) return
    sceneMessageBus.emit('setBarRadio', {
      index: barCurrentRadioIndex,
    })
  })
}

export class JukeboxButton extends Entity {
  clickAnim: AnimationState
  constructor(
    model: GLTFShape,
    animationName: string,
    action: () => void,
    text?: string
  ) {
    super()
    engine.addEntity(this)

    this.addComponent(model)
    this.setParent(baseJukeBox)

    this.addComponent(new AudioSource(new AudioClip('sounds/click.mp3')))

    this.addComponent(new Animator())
    this.clickAnim = new AnimationState(animationName, { looping: false })
    this.getComponent(Animator).addClip(this.clickAnim)

    this.addComponent(
      new OnPointerDown(
        () => {
          action()
          this.press()
        },
        {
          button: ActionButton.POINTER,
          hoverText: text ? text : 'Press',
        }
      )
    )
  }

  public press(): void {
    this.clickAnim.stop()
    this.clickAnim.play()
    this.getComponent(AudioSource).playOnce()
  }
}

function barRadioOn(station?) {
  if (isInBar) {
    barMusicStreamEnt.addComponent(
      new utils.Delay(100, () => {
        barMusicStream = new AudioStream(station ? station : barCurrentRadio)
        barMusicStream.volume = 0.4
        barMusicStreamEnt.addComponentOrReplace(barMusicStream)
        baseJukeBoxLights1.getComponent(GLTFShape).visible = true
        baseJukeBoxLights2.getComponent(GLTFShape).visible = true
        // jukeBoxLightsAnim1.play()
        // jukeBoxLightsAnim2.play()
      })
    )
  }
  radioIsOn = true
}

function barRadioOff() {
  if (barMusicStream) {
    barMusicStream.playing = false
    // jukeBoxLightsAnim1.stop()
    // jukeBoxLightsAnim2.stop()
  }
  baseJukeBoxLights1.getComponent(GLTFShape).visible = false
  baseJukeBoxLights2.getComponent(GLTFShape).visible = false
  //barCurrentRadio = null
}

export function setBarMusicOn() {
  sceneMessageBus.emit('enteredRadioRange', {
    radio: barCurrentRadioIndex,
  })
  isInBar = true
  barMusicStream.volume = 0.4
  if (radioIsOn && barCurrentRadio) {
    barRadioOn(barCurrentRadio)
  }

  //log('triggered!')
}

export function outOfBar() {
  isInBar = false
}

export function intoBar() {
  isInBar = false
}

export function setBarMusicOff() {
  isInBar = false
  barRadioOff()
}

export function lowerVolume() {
  if (isInBar) return

  if (radioIsOn && barMusicStream && !barMusicStream.playing) {
    barMusicStream.playing = true
  }
  barMusicStream.volume = 0.1
  return
}

export function raiseVolume() {
  isInBar = true
  if (radioIsOn && barMusicStream && !barMusicStream.playing) {
    barMusicStream.playing = true
  }
  barMusicStream.volume = 0.4
}

function getRadioName(radio: number) {
  let radioName: string = ''
  switch (radio) {
    case 0:
      radioName = 'Rave Party'
      break
    case 1:
      radioName = 'Delta'
      break
    case 3:
      radioName = 'DCL Core'
      break
    case 4:
      radioName = 'MK Lab'
      break
    case 5:
      radioName = 'Signs'
      break
    case null:
      radioName = 'Off'
      break
  }
  return radioName
}
