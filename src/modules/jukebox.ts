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

const barMusicStreamEnt = new Entity()
engine.addEntity(barMusicStreamEnt)

export let barMusicStream: AudioStream | null = null
barMusicStream = new AudioStream(barCurrentRadio)
barMusicStream.volume = 0.4
barMusicStream.playing = false

let baseJukeBox = new Entity()
baseJukeBox.addComponent(
  new GLTFShape('models/core_building/jukebox/Jukebox_Base.glb')
)
baseJukeBox.addComponent(
  new Transform({
    position: new Vector3(179, 0, 144),
    rotation: Quaternion.Euler(0, -45, 0),
  })
)
engine.addEntity(baseJukeBox)

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
          button: ActionButton.PRIMARY,
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
    // update display

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
    // update display

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
  } else {
    barRadioOff()
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

  barRadioOn(barCurrentRadio)
})

function barRadioOn(station?) {
  if (isInBar) {
    barMusicStreamEnt.addComponent(
      new utils.Delay(100, () => {
        barMusicStream = new AudioStream(station ? station : barCurrentRadio)
        barMusicStream.volume = 0.4
        barMusicStreamEnt.addComponentOrReplace(barMusicStream)
      })
    )
  }
}

function barRadioOff() {
  if (barMusicStream) {
    barMusicStream.playing = false
  }
  //barCurrentRadio = null
}

export function setBarMusicOn() {
  sceneMessageBus.emit('enteredRadioRange', {
    radio: barCurrentRadioIndex,
  })
  isInBar = true
  barMusicStream.volume = 0.4
  if (barCurrentRadio) {
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

  if (barMusicStream && !barMusicStream.playing) {
    barMusicStream.playing = true
  }
  barMusicStream.volume = 0.1
}

export function raiseVolume() {
  isInBar = true
  if (barMusicStream && !barMusicStream.playing) {
    barMusicStream.playing = true
  }
  barMusicStream.volume = 0.4
}

sceneMessageBus.on('enteredRadioRange', (e) => {
  if (!isInBar || barCurrentRadio == null) return
  if (e.radio == barCurrentRadioIndex) return
  sceneMessageBus.emit('setBarRadio', {
    index: barCurrentRadioIndex,
  })
})
