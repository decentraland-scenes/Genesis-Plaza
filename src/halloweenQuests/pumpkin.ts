import * as ui from '../../node_modules/@dcl/ui-utils/index'
import utils from '../../node_modules/decentraland-ecs-utils/index'
import { arrow, lady } from '../game'
import { allPumpkins, firstPumpkin, resetPumpkins } from '../NPC/dialog'
import { updateProgression } from './progression'
import { quest } from './quest'

let totalPumpkins = 10
let firstTime: boolean = true

let pumpkinModel = new GLTFShape('models/halloween/pumpkin/pumpkin_01.glb')
let smokeModel = new GLTFShape('models/halloween/pumpkin/smoke.glb')

/// Smash audio
const clip = new AudioClip("sounds/halloween/smash.mp3")
const source = new AudioSource(clip)
export class Pumpkin extends Entity {
  //   explodeAnim: AnimationState = new AnimationState('Smashing', {
  //     looping: false,
  //     speed: 0.7,
  //   })
  smoke: Entity
  smashed: boolean = false
  constructor(position: Vector3, hasGem?: boolean) {
    super()

    this.addComponent(pumpkinModel)
    this.addComponent(source)
    source.playing = false
    let randomRotation = Math.random() * 365

    this.addComponent(
      new Transform({
        position: new Vector3(position.x, position.y - 1.7, position.z),
        rotation: Quaternion.Euler(0, randomRotation, 0),
      })
    )

    this.smoke = new Entity()
    this.smoke.addComponent(smokeModel)
    this.smoke.addComponent(new Transform({ position: new Vector3(0, 0.5, 0) }))
    //this.smoke.addComponent(new Billboard())
    // this.smoke.addComponent(new Animator())
    // this.smoke
    //   .getComponent(Animator)
    //   .addClip(new AnimationState('Smoke_Action'))
    this.smoke.setParent(this)
    engine.addEntity(this.smoke)

    engine.addEntity(this)
    this.addComponent(
      new OnPointerDown(
        () => {
          if (this.smashed) return
          this.smashed = true
          this.explode()
          source.playOnce()
          gemsCounter.increase()
          if (gemsCounter.read() >= totalPumpkins) {
            winGame()
          }
        },
        {
          hoverText: 'Smash',
          distance: 6,
        }
      )
    )
  }

  explode() {
    this.removeComponent(GLTFShape)
    engine.removeEntity(this.smoke)

    v1.stop()
    v2.stop()
    v3.stop()
    v4.stop()
    v5.stop()
    v6.stop()
    v7.stop()
    v8.stop()
    v9.stop()
    v10.stop()
    v11.stop()
    s1.stop()
    s2.stop()
    RP_01.setParent(this)
    RP_02.setParent(this)
    RP_03.setParent(this)
    RP_04.setParent(this)
    RP_05.setParent(this)
    RP_06.setParent(this)
    RP_07.setParent(this)
    RP_08.setParent(this)
    RP_09.setParent(this)
    RP_10.setParent(this)
    RP_11.setParent(this)
    s_1.setParent(this)
    s_2.setParent(this)

    v1.play()
    v2.play()
    v3.play()
    v4.play()
    v5.play()
    v6.play()
    v7.play()
    v8.play()
    v9.play()
    v10.play()
    v11.play()
    s1.play()
    s2.play()
  }
}

let pumpkinPositions: { pos: Vector3 }[] = [
  { pos: new Vector3(152.644268989563, 2.0452191829681396, 214.8912582397461) },
  {
    pos: new Vector3(104.95024108886719, 2.357224941253662, 209.20895385742188),
  },
  {
    pos: new Vector3(95.85749435424805, 2.0184473991394043, 237.16542053222656),
  },
  {
    pos: new Vector3(116.53714752197266, 2.177417039871216, 284.1548156738281),
  },
  {
    pos: new Vector3(54.66194152832031, 2.1519174575805664, 130.10051345825195),
  },
  {
    pos: new Vector3(226.9413604736328, 2.1233460903167725, 16.67791748046875),
  },
  {
    pos: new Vector3(179.97401428222656, 2.2571136951446533, 19.20209503173828),
  },

  {
    pos: new Vector3(
      109.15375137329102,
      3.6478636264801025,
      27.163925170898438
    ),
  },

  {
    pos: new Vector3(8.964691162109375, 2.1554431915283203, 66.20610809326172),
  },
]

let pumpkins: Pumpkin[] = [] //new Array(vasePositions.length)
let demoPump: Pumpkin

export function addPumpkins() {
  demoPump = new Pumpkin(
    new Vector3(157.6, 2.1656084060668945, 178.8503761291504)
  )
  arrow.move(demoPump, new Vector3(0, 45, 0))
  demoPump.addComponentOrReplace(
    new OnPointerDown(
      () => {
        demoPump.explode()
        gemsCounter.increase()
        arrow.hide()
        lady.talk(firstPumpkin, 0, 4)
        lady.playAnimation(`Cocky`, true, 2.93)
      },
      { hoverText: 'Smash' }
    )
  )
  demoPump.getComponent(Transform).rotation.eulerAngles = new Vector3(0, 180, 0)

  pumpkins = []
  for (let vase of pumpkinPositions) {
    let thisVase = new Pumpkin(vase.pos)
    pumpkins.push(thisVase)
  }
}

export function removePumpkins() {
  for (let vase of pumpkins) {
    engine.removeEntity(vase)
  }
  pumpkins = []
  engine.removeEntity(demoPump)
}

let dummyUndergroundPumpkin = new Entity()
dummyUndergroundPumpkin.addComponent(pumpkinModel)
dummyUndergroundPumpkin.addComponent(
  new Transform({ position: new Vector3(4, -3, 5) })
)
engine.addEntity(dummyUndergroundPumpkin)

let dummyUndergroundSmoke = new Entity()
dummyUndergroundSmoke.addComponent(smokeModel)
dummyUndergroundSmoke.addComponent(
  new Transform({ position: new Vector3(0, -4, 0) })
)
engine.addEntity(dummyUndergroundSmoke)

export let gemUIBck = new ui.LargeIcon(
  'images/halloween/pumpkin-ui.png',
  0,
  0,
  256,
  256,
  {
    sourceWidth: 512,
    sourceHeight: 512,
  }
)
gemUIBck.image.visible = false
export let gemsCounter = new ui.UICounter(
  0,
  -70,
  182,
  Color4.FromHexString('#8DFF34FF'),
  48,
  true
)
export let secondsCounter = new ui.UICounter(
  59,
  16,
  130,
  Color4.White(),
  25,
  true,
  2
)
export let timerSeparaor = new ui.CornerLabel(':', -9, 130, Color4.White())
export let minutesCounter = new ui.UICounter(5, -34, 130, Color4.White())
gemsCounter.uiText.font = ui.SFHeavyFont
gemsCounter.uiText.visible = false
secondsCounter.uiText.visible = false
timerSeparaor.uiText.visible = false
minutesCounter.uiText.visible = false

export let timer: CountdownSystem

export function startGemUI() {
  addPumpkins()
  gemUIBck.image.visible = true
  gemsCounter.uiText.visible = true
  secondsCounter.uiText.visible = true
  timerSeparaor.uiText.visible = true
  minutesCounter.uiText.visible = true
  if (firstTime == true) {
    timer = new CountdownSystem()
    engine.addSystem(timer)
    firstTime = false
  } else {
    gemsCounter.set(0)
    secondsCounter.set(66)
    minutesCounter.set(6)
    timer.running = true
  }
}

export function winGame() {
  timer.running = false
  lady.talk(allPumpkins, 0, 3)
  quest.checkBox(3)
  updateProgression('pumpkinDone', true)
  arrow.move(lady)

  gemUIBck.image.visible = false
  gemsCounter.uiText.visible = false
  secondsCounter.uiText.visible = false
  timerSeparaor.uiText.visible = false
  minutesCounter.uiText.visible = false
}

class CountdownSystem implements ISystem {
  running: boolean = true
  timer: number = 1
  update(dt: number) {
    if (this.running == false) return
    this.timer -= dt
    if (this.timer <= 0) {
      this.timer = 1
      secondsCounter.decrease()
      if (secondsCounter.read() < 0) {
        if (minutesCounter.read() <= 0) {
          // TIME UP

          //this.running = false
          resetGame()
        } else {
          secondsCounter.set(59)
          minutesCounter.decrease()
        }
      }
    }
  }
}

export function resetGame() {
  //removePumpkins()

  //gemsCounter.set(0)
  minutesCounter.set(9)
  secondsCounter.set(59)

  lady.talk(resetPumpkins, 0)
  //lady.introduced = false
  //arrow.move(lady)

  //   let dummyEnt = new Entity()
  //   engine.addEntity(dummyEnt)
  //   dummyEnt.addComponent(
  //     new utils.Delay(5000, () => {
  //       gemUIBck.image.visible = false
  //       gemsCounter.uiText.visible = false
  //       secondsCounter.uiText.visible = false
  //       timerSeparaor.uiText.visible = false
  //       minutesCounter.uiText.visible = false
  //     })
  //   )
}

/// REUSABLE EXPLODING SECTIONS

let undergronundDummy = new Entity()
undergronundDummy.addComponent(
  new Transform({
    position: new Vector3(5, -2, 5),
  })
)
engine.addEntity(undergronundDummy)

//add RP_01
let RP_01 = new Entity()
RP_01.addComponent(new GLTFShape('models/halloween/pumpkin/RP_01.glb'))
RP_01.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
  })
)
engine.addEntity(RP_01)
let v1 = new AnimationState('Action', { looping: false })
RP_01.addComponent(new Animator()).addClip(v1)
RP_01.setParent(undergronundDummy)

//add RP_02
let RP_02 = new Entity()
RP_02.addComponent(new GLTFShape('models/halloween/pumpkin/RP_02.glb'))
RP_02.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
  })
)
engine.addEntity(RP_02)
let v2 = new AnimationState('Action.001', { looping: false })
RP_02.addComponent(new Animator()).addClip(v2)
RP_02.setParent(undergronundDummy)

//add RP_03
let RP_03 = new Entity()
RP_03.addComponent(new GLTFShape('models/halloween/pumpkin/RP_03.glb'))
RP_03.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
  })
)
engine.addEntity(RP_03)
let v3 = new AnimationState('Action.002', { looping: false })
RP_03.addComponent(new Animator()).addClip(v3)
RP_03.setParent(undergronundDummy)

//add RP_04
let RP_04 = new Entity()
RP_04.addComponent(new GLTFShape('models/halloween/pumpkin/RP_04.glb'))
RP_04.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
  })
)
engine.addEntity(RP_04)

let v4 = new AnimationState('Action.003', { looping: false })
RP_04.addComponent(new Animator()).addClip(v4)
RP_04.setParent(undergronundDummy)

//add RP_05
let RP_05 = new Entity()
RP_05.addComponent(new GLTFShape('models/halloween/pumpkin/RP_05.glb'))
RP_05.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
  })
)
engine.addEntity(RP_05)
let v5 = new AnimationState('Action.004', { looping: false })
RP_05.addComponent(new Animator()).addClip(v5)
RP_05.setParent(undergronundDummy)

//add RP_06
let RP_06 = new Entity()
RP_06.addComponent(new GLTFShape('models/halloween/pumpkin/RP_06.glb'))
RP_06.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
  })
)
engine.addEntity(RP_06)
let v6 = new AnimationState('Action.005', { looping: false })
RP_06.addComponent(new Animator()).addClip(v6)
RP_06.setParent(undergronundDummy)

//add RP_07
let RP_07 = new Entity()
RP_07.addComponent(new GLTFShape('models/halloween/pumpkin/RP_07.glb'))
RP_07.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
  })
)
engine.addEntity(RP_07)
let v7 = new AnimationState('Action.006', { looping: false })
RP_07.addComponent(new Animator()).addClip(v7)
RP_07.setParent(undergronundDummy)

//add RP_08
let RP_08 = new Entity()
RP_08.addComponent(new GLTFShape('models/halloween/pumpkin/RP_08.glb'))
RP_08.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
  })
)
engine.addEntity(RP_08)
let v8 = new AnimationState('Action.007', { looping: false })
RP_08.addComponent(new Animator()).addClip(v8)
RP_08.setParent(undergronundDummy)

//add RP_09
let RP_09 = new Entity()
RP_09.addComponent(new GLTFShape('models/halloween/pumpkin/RP_09.glb'))
RP_09.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
  })
)
engine.addEntity(RP_09)
let v9 = new AnimationState('Action.008', { looping: false })
RP_09.addComponent(new Animator()).addClip(v9)
RP_09.setParent(undergronundDummy)

//add RP_10
let RP_10 = new Entity()
RP_10.addComponent(new GLTFShape('models/halloween/pumpkin/RP_10.glb'))
RP_10.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
  })
)
engine.addEntity(RP_10)
let v10 = new AnimationState('Action.009', { looping: false })
RP_10.addComponent(new Animator()).addClip(v10)
RP_10.setParent(undergronundDummy)

//add RP_11
let RP_11 = new Entity()
RP_11.addComponent(new GLTFShape('models/halloween/pumpkin/RP_11.glb'))
RP_11.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
  })
)
engine.addEntity(RP_11)
let v11 = new AnimationState('Action.010', { looping: false })
RP_11.addComponent(new Animator()).addClip(v11)
RP_11.setParent(undergronundDummy)

//add splash_01
let s_1 = new Entity()
s_1.addComponent(new GLTFShape('models/halloween/pumpkin/splash_01.glb'))
s_1.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
  })
)
engine.addEntity(s_1)
let s1 = new AnimationState('Plane.001Action', { looping: false })
s_1.addComponent(new Animator()).addClip(s1)
s_1.setParent(undergronundDummy)

//add splash_02
let s_2 = new Entity()
s_2.addComponent(new GLTFShape('models/halloween/pumpkin/splash_02.glb'))
s_2.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
  })
)
engine.addEntity(s_1)
let s2 = new AnimationState('Plane.001Action', { looping: false })
s_2.addComponent(new Animator()).addClip(s2)
s_2.setParent(undergronundDummy)
