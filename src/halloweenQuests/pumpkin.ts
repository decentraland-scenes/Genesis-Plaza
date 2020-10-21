import * as ui from '../../node_modules/@dcl/ui-utils/index'
import utils from '../../node_modules/decentraland-ecs-utils/index'
import { arrow, lady } from '../game'
import { allPumpkins, firstPumpkin, resetPumpkins } from '../NPC/dialog'
import { updateProgression } from './progression'
import { quest } from './quest'

let totalPumpkins = 3
let firstTime: boolean = true

let pumpkinModel = new GLTFShape('models/halloween/pumpkinSmash.glb')

export class Pumpkin extends Entity {
  explodeAnim: AnimationState = new AnimationState('Smashing', {
    looping: false,
    speed: 0.7,
  })
  constructor(position: Vector3, hasGem?: boolean) {
    super()

    this.addComponent(pumpkinModel)

    let randomRotation = Math.random() * 365

    this.addComponent(
      new Transform({
        position: new Vector3(position.x, position.y - 1.5, position.z),
        rotation: Quaternion.Euler(0, randomRotation, 0),
      })
    )

    //this.getComponent(Transform).translate(new Vector3(0, -1.671, 0))

    this.addComponent(new Animator()).addClip(this.explodeAnim)

    engine.addEntity(this)
    this.addComponent(
      new OnPointerDown(
        () => {
          this.explode()
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
    log('exploding')
    this.explodeAnim.stop()
    this.explodeAnim.play()
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
export let secondsCounter = new ui.UICounter(
  59,
  -14,
  49,
  Color4.Black(),
  25,
  true,
  2
)
export let timerSeparaor = new ui.CornerLabel(':', -39, 49, Color4.Black())
export let minutesCounter = new ui.UICounter(5, -64, 49, Color4.Black())
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
    new utils.Delay(5000, () => {
      gemUIBck.image.visible = false
      gemsCounter.uiText.visible = false
      secondsCounter.uiText.visible = false
      timerSeparaor.uiText.visible = false
      minutesCounter.uiText.visible = false
    })
  )
}
