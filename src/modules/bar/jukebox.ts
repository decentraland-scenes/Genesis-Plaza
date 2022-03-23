import { sceneMessageBus } from '../serverHandler'
import * as utils from '@dcl/ecs-scene-utils'
import { invisibleMaterial } from '../museumItems'
import { OctoComments, octopus } from './barNPCs'
import { tutorialRunning } from 'src/lobby/portalBeam'

export enum Radios {
  RAVE = 'https://icecast.ravepartyradio.org/ravepartyradio-192.mp3',
  DELTA = 'https://cdn.instream.audio/:9069/stream?_=171cd6c2b6e',
  GRAFFITI = 'https://n07.radiojar.com/2qm1fc5kb.m4a?1617129761=&rj-tok=AAABeIR7VqwAilDFeUM39SDjmw&rj-ttl=5',
  SIGNS = 'https://edge.singsingmusic.net/MC2.mp3',
  JAZZ = 'https://live.vegascity.fm/radio/8010/the_flamingos.mp3',
}

let FullVolume = 0.1
let DistantVolume = 0.03

export let isInBar: boolean = false
let barCurrentRadio: Radios | null = Radios.RAVE
let barCurrentRadioIndex: number = 0
let radioCount = 4
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
  barMusicStream.volume = FullVolume
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
    if (barMusicStream && e.state === barMusicStream.playing) return
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
        newRadio = Radios.GRAFFITI
        break
      case 3:
        newRadio = Radios.JAZZ
        break
      case 4:
        newRadio = Radios.SIGNS
        break
      case null:
        newRadio = null
        break
    }

    if (
      barCurrentRadio === newRadio &&
      barMusicStream &&
      barMusicStream.playing
    )
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
    if (!isInBar || barCurrentRadio === null || tutorialRunning) return
    if (e.radio === barCurrentRadioIndex) return
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
  if (tutorialRunning) return
  if (isInBar) {
    barMusicStreamEnt.addComponent(
      new utils.Delay(100, () => {
        barMusicStream = new AudioStream(station ? station : barCurrentRadio)
        barMusicStream.volume = FullVolume
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
  if (tutorialRunning) return
  sceneMessageBus.emit('enteredRadioRange', {
    radio: barCurrentRadioIndex,
  })
  isInBar = true
  if (barMusicStream) {
    barMusicStream.volume = FullVolume
  }

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
  if (isInBar || tutorialRunning) return

  if (radioIsOn && barMusicStream && !barMusicStream.playing) {
    barMusicStream.playing = true
  }
  if (barMusicStream) {
    barMusicStream.volume = DistantVolume
  }

  return
}

export function raiseVolume() {
  if (tutorialRunning) return
  isInBar = true
  if (radioIsOn && barMusicStream && !barMusicStream.playing) {
    barMusicStream.playing = true
  }
  barMusicStream.volume = FullVolume
}

export function setStreamVolume(vol: number) {
  if (!isInBar) return

  barMusicStream.playing = true
  barMusicStream.volume = vol
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
    case 2:
      radioName = 'Graffiti Kings'
      break
    case 3:
      radioName = 'Vegas Jazz FM'
      break
    case 4:
      radioName = 'Signs'
      break
    case null:
      radioName = 'Off'
      break
  }
  return radioName
}

let firstTimeMic: boolean = false

export function addMicFeedback() {
  let feedback = new AudioClip('sounds/micFeedback.mp3')
  feedback.loop = false
  feedback.volume = 1

  let mic = new Entity()
  mic.addComponent(new BoxShape())
  mic.addComponent(
    new Transform({
      position: new Vector3(160, 2.2, 167.7),
      scale: new Vector3(0.35, 0.35, 0.35),
    })
  )
  mic.addComponent(new AudioSource(feedback))

  mic.addComponent(
    new OnPointerDown(
      () => {
        feedback.volume = 1
        mic.getComponent(AudioSource).playOnce()
        sceneMessageBus.emit('micFeedback', {})

        if (!firstTimeMic) {
          firstTimeMic = true
          octopus.talk(OctoComments, 'mic')
          utils.setTimeout(6000, () => {
            octopus.endInteraction()
          })
        }
      },
      {
        hoverText: 'Use mic',
      }
    )
  )
  mic.addComponent(invisibleMaterial)
  engine.addEntity(mic)

  sceneMessageBus.on('micFeedback', (e) => {
    if (!isInBar) return
    feedback.volume = 0.2
    mic.getComponent(AudioSource).playOnce()
  })
}
