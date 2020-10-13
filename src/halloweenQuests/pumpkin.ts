import * as ui from '../../node_modules/@dcl/ui-utils/index'
import { SFHeavyFont } from '../../node_modules/@dcl/ui-utils/utils/default-ui-comopnents'
import utils from '../../node_modules/decentraland-ecs-utils/index'
import { arrow, lady } from '../game'
import { allPumpkins, firstPumpkin, resetPumpkins } from '../NPC/dialog'
import { progression, updateProgression } from './progression'
import { quest } from './quest'

let totalPumpkins = 10
let firstTime: boolean = true

export class Pumpkin extends Entity {
  constructor(position: Vector3, hasGem?: boolean) {
    super()

    this.addComponent(new GLTFShape('models/halloween/v_0.glb'))

    let randomRotation = Math.random() * 365

    this.addComponent(
      new Transform({
        position: new Vector3(position.x, position.y - 1.671, position.z),
        rotation: Quaternion.Euler(0, randomRotation, 0),
      })
    )
    //this.getComponent(Transform).translate(new Vector3(0, -1.671, 0))

    engine.addEntity(this)
    this.addComponent(
      new OnPointerDown(() => {
        this.explode()
        gemsCounter.increase()
        if (gemsCounter.read() >= totalPumpkins) {
          timer.running = false
          lady.talk(allPumpkins, 0)
          quest.checkBox(3)
          updateProgression('pumpkinDone', true)
          arrow.move(lady)
        }
      })
    )
  }

  explode() {
    this.removeComponent(GLTFShape)

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
    v12.stop()
    v13.stop()
    v_01.setParent(this)
    v_02.setParent(this)
    v_03.setParent(this)
    v_04.setParent(this)
    v_05.setParent(this)
    v_06.setParent(this)
    v_07.setParent(this)
    v_08.setParent(this)
    v_09.setParent(this)
    v_10.setParent(this)
    v_11.setParent(this)
    v_12.setParent(this)
    v_13.setParent(this)

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
    v12.play()
    v13.play()
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
  { pos: new Vector3(68.2055892944336, 2.353646755218506, 250.82066345214844) },
  {
    pos: new Vector3(71.82850646972656, 2.5935463905334473, 281.26698303222656),
  },
  {
    pos: new Vector3(116.53714752197266, 2.177417039871216, 284.1548156738281),
  },
  {
    pos: new Vector3(180.77804946899414, 2.278470277786255, 287.99981689453125),
  },
  {
    pos: new Vector3(301.9658966064453, 2.325359344482422, 171.50619506835938),
  },
  {
    pos: new Vector3(295.6520233154297, 11.246173858642578, 108.19016647338867),
  },
  {
    pos: new Vector3(252.99388885498047, 2.0844812393188477, 55.43287658691406),
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
  { pos: new Vector3(94.8697624206543, 3.1651079654693604, 39.84266662597656) },
  {
    pos: new Vector3(8.964691162109375, 2.1554431915283203, 66.20610809326172),
  },
  {
    pos: new Vector3(86.91092300415039, 1.9802448749542236, 194.33695220947266),
  },
  {
    pos: new Vector3(110.9427719116211, 2.001781702041626, 133.85600185394287),
  },
]

let pumpkins: Pumpkin[] = [] //new Array(vasePositions.length)
let demoPump: Pumpkin

export function addPumpkins() {
  demoPump = new Pumpkin(
    new Vector3(156.99755954742432, 2.1656084060668945, 178.8503761291504)
  )
  arrow.move(demoPump, new Vector3(0, 45, 0))
  demoPump.addComponentOrReplace(
    new OnPointerDown(() => {
      demoPump.explode()
      gemsCounter.increase()
      arrow.hide()
      lady.talk(firstPumpkin, 0)
    })
  )

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

export let gemUIBck = new ui.LargeIcon(
  'images/halloween/ui-gem.png',
  -20,
  50,
  256,
  128,
  {
    sourceWidth: 512,
    sourceHeight: 256,
  }
)
gemUIBck.image.visible = false
export let gemsCounter = new ui.UICounter(
  0,
  -135,
  105,
  Color4.Purple(),
  48,
  true
)
export let secondsCounter = new ui.UICounter(59, -14, 49, Color4.Black())
export let timerSeparaor = new ui.CornerLabel(':', -39, 49, Color4.Black())
export let minutesCounter = new ui.UICounter(5, -64, 49, Color4.Black())
gemsCounter.uiText.font = SFHeavyFont
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

          this.running = false
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
  removePumpkins()

  gemsCounter.set(0)
  secondsCounter.set(0)
  lady.talk(resetPumpkins, 0)
  lady.introduced = false
  arrow.move(lady)

  let dummyEnt = new Entity()
  engine.addEntity(dummyEnt)
  dummyEnt.addComponent(
    new utils.Delay(6000, () => {
      gemUIBck.image.visible = false
      gemsCounter.uiText.visible = false
      secondsCounter.uiText.visible = false
      timerSeparaor.uiText.visible = false
      minutesCounter.uiText.visible = false
    })
  )
}

/// REUSABLE EXPLODING SECTIONS

let undergronundDummy = new Entity()
undergronundDummy.addComponent(
  new Transform({
    position: new Vector3(5, -2, 5),
  })
)
engine.addEntity(undergronundDummy)

//add v_01
let v_01 = new Entity()
v_01.addComponent(new GLTFShape('models/halloween/v_01.glb'))
v_01.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
    rotation: Quaternion.Euler(0, 270, 0),
  })
)
engine.addEntity(v_01)
let v1 = new AnimationState('Action.052', { looping: false })
v_01.addComponent(new Animator()).addClip(v1)
v_01.setParent(undergronundDummy)

//add v_02
let v_02 = new Entity()
v_02.addComponent(new GLTFShape('models/halloween/v_02.glb'))
v_02.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
    rotation: Quaternion.Euler(0, 270, 0),
  })
)
engine.addEntity(v_02)
let v2 = new AnimationState('Action.053', { looping: false })
v_02.addComponent(new Animator()).addClip(v2)
v_02.setParent(undergronundDummy)

//add v_03
let v_03 = new Entity()
v_03.addComponent(new GLTFShape('models/halloween/v_03.glb'))
v_03.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
    rotation: Quaternion.Euler(0, 270, 0),
  })
)
engine.addEntity(v_03)
let v3 = new AnimationState('Action.054', { looping: false })
v_03.addComponent(new Animator()).addClip(v3)
v_03.setParent(undergronundDummy)

//add v_04
let v_04 = new Entity()
v_04.addComponent(new GLTFShape('models/halloween/v_04.glb'))
v_04.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
    rotation: Quaternion.Euler(0, 270, 0),
  })
)
engine.addEntity(v_04)
let v4 = new AnimationState('Action.055', { looping: false })
v_04.addComponent(new Animator()).addClip(v4)
v_04.setParent(undergronundDummy)

//add v_05
let v_05 = new Entity()
v_05.addComponent(new GLTFShape('models/halloween/v_05.glb'))
v_05.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
    rotation: Quaternion.Euler(0, 270, 0),
  })
)
engine.addEntity(v_05)
let v5 = new AnimationState('Action.056', { looping: false })
v_05.addComponent(new Animator()).addClip(v5)
v_05.setParent(undergronundDummy)

//add v_06
let v_06 = new Entity()
v_06.addComponent(new GLTFShape('models/halloween/v_06.glb'))
v_06.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
    rotation: Quaternion.Euler(0, 270, 0),
  })
)
engine.addEntity(v_06)
let v6 = new AnimationState('Action.057', { looping: false })
v_06.addComponent(new Animator()).addClip(v6)
v_06.setParent(undergronundDummy)

//add v_07
let v_07 = new Entity()
v_07.addComponent(new GLTFShape('models/halloween/v_07.glb'))
v_07.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
    rotation: Quaternion.Euler(0, 270, 0),
  })
)
engine.addEntity(v_07)
let v7 = new AnimationState('Action.058', { looping: false })
v_07.addComponent(new Animator()).addClip(v7)
v_07.setParent(undergronundDummy)

//add v_08
let v_08 = new Entity()
v_08.addComponent(new GLTFShape('models/halloween/v_08.glb'))
v_08.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
    rotation: Quaternion.Euler(0, 270, 0),
  })
)
engine.addEntity(v_08)
let v8 = new AnimationState('Action.059', { looping: false })
v_08.addComponent(new Animator()).addClip(v8)
v_08.setParent(undergronundDummy)

//add v_09
let v_09 = new Entity()
v_09.addComponent(new GLTFShape('models/halloween/v_09.glb'))
v_09.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
    rotation: Quaternion.Euler(0, 270, 0),
  })
)
engine.addEntity(v_09)
let v9 = new AnimationState('Action.060', { looping: false })
v_09.addComponent(new Animator()).addClip(v9)
v_09.setParent(undergronundDummy)

//add v_10
let v_10 = new Entity()
v_10.addComponent(new GLTFShape('models/halloween/v_10.glb'))
v_10.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
    rotation: Quaternion.Euler(0, 270, 0),
  })
)
engine.addEntity(v_10)
let v10 = new AnimationState('Action.061', { looping: false })
v_10.addComponent(new Animator()).addClip(v10)
v_10.setParent(undergronundDummy)

//add v_11
let v_11 = new Entity()
v_11.addComponent(new GLTFShape('models/halloween/v_11.glb'))
v_11.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
    rotation: Quaternion.Euler(0, 270, 0),
  })
)
engine.addEntity(v_11)
let v11 = new AnimationState('Action.062', { looping: false })
v_11.addComponent(new Animator()).addClip(v11)
v_11.setParent(undergronundDummy)

//add v_12
let v_12 = new Entity()
v_12.addComponent(new GLTFShape('models/halloween/v_12.glb'))
v_12.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
    rotation: Quaternion.Euler(0, 270, 0),
  })
)
engine.addEntity(v_12)
let v12 = new AnimationState('Action.063', { looping: false })
v_12.addComponent(new Animator()).addClip(v12)
v_12.setParent(undergronundDummy)

//add v_13
let v_13 = new Entity()
v_13.addComponent(new GLTFShape('models/halloween/v_13.glb'))
v_13.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
    rotation: Quaternion.Euler(0, 270, 0),
  })
)
engine.addEntity(v_13)
let v13 = new AnimationState('Action.064', { looping: false })
v_13.addComponent(new Animator()).addClip(v13)
v_13.setParent(undergronundDummy)
