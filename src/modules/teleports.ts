import { openTeleportUI } from './ui'

export enum Locations {
  CROWD = 'crowd',
  MAGIC = 'magic',
  KOKO = '-39,58',
  SALMONOMICON = '-55,1',
  DRAGONRUSH = '-43,53',
  MUSEUM = '16,83',
  TOMBCHASER = '12,46',
  BLOCK = '61,-27',
  FRUIT = '59,133',
  CASTLE = '-134,-121',
  INFINITY = '-71,-38',
  MOLES = '-71,-71', /// NEED REAL LOCATION
  PRESENT = '-40,-49',
  CASINO = '-55,144',
}

declare const dcl: any

export class Teleport extends Entity {
  model: GLTFShape
  location: Locations
  name: string
  screenshot: string
  description: string
  constructor(
    model: GLTFShape,
    transform: TranformConstructorArgs,
    location: Locations,
    name: string,
    description: string,
    screenshot: string
  ) {
    super()
    engine.addEntity(this)

    this.addComponent(model)
    this.addComponent(new Transform(transform))

    this.name = name
    this.location = location
    this.description = description
    this.screenshot = screenshot

    let thisTeleport = this

    this.addComponent(
      new OnPointerDown(
        async function () {
          openTeleportUI(thisTeleport)
        },
        { hoverText: this.name }
      )
    )

    let Particles = new Entity()
    Particles.addComponent(new GLTFShape('models/particles.glb'))
    // Particles.addComponent(
    //   new Transform({
    //     rotation: Quaternion.Euler(0, 180, 0),
    //   })
    // )
    Particles.setParent(this)
  }

  public travel(): void {
    let message = '/goto '.concat(this.location).concat('\n').toString()
    //let message = '/goto crowd\n'
    log(message)

    dcl.loadModule('@decentraland/ChatController').then(($: any) => {
      dcl.callRpc($.rpcHandle, 'send', [message])
    })
  }
}

export function placeTeleports() {
  // artichoke & garden
  let teleportPos1 = new Transform({
    position: new Vector3(81.7, 0.5, 18.45),
    rotation: Quaternion.Euler(0, 0, 0),
  })

  // garden & hallway
  let teleportPos2 = new Transform({
    position: new Vector3(100.19, 1, 69),
    rotation: Quaternion.Euler(0, 225, 0),
  })

  // garden & market
  let teleportPos3 = new Transform({
    position: new Vector3(177.5, 1, 51),
    rotation: Quaternion.Euler(0, 0, 0),
  })

  // garden & rock
  let teleportPos4 = new Transform({
    position: new Vector3(189.84, 0.5, 68),
    rotation: Quaternion.Euler(0, 270, 0),
  })

  // rock & market
  let teleportPos5 = new Transform({
    position: new Vector3(210.19, 0.5, 68.8),
    rotation: Quaternion.Euler(0, 90, 0),
  })

  // sculpture & wearables
  let teleportPos6 = new Transform({
    position: new Vector3(211.19, 0.5, 119.5),
    rotation: Quaternion.Euler(0, 270, 0),
  })

  // wearables - west
  let teleportPos7 = new Transform({
    position: new Vector3(226.8, 0.5, 132.8),
    rotation: Quaternion.Euler(0, 90, 0),
  })

  // wearables - NW
  let teleportPos8 = new Transform({
    position: new Vector3(228.3, 0.5, 168.8),
    rotation: Quaternion.Euler(0, 135, 0),
  })

  // wearables - N
  let teleportPos9 = new Transform({
    position: new Vector3(261.2, 0.5, 174.4),
    rotation: Quaternion.Euler(0, 135, 0),
  })

  // whale - S
  let teleportPos10 = new Transform({
    position: new Vector3(222.7, 0.5, 203.8),
    rotation: Quaternion.Euler(0, 45, 0),
  })

  // center - N
  let teleportPos11 = new Transform({
    position: new Vector3(175.45, 0.5, 210),
    rotation: Quaternion.Euler(0, 45, 0),
  })

  // whale & mountains
  let teleportPos12 = new Transform({
    position: new Vector3(97.63, 0.5, 249.46),
    rotation: Quaternion.Euler(0, 0, 0),
  })

  // tower- east
  let teleportPos13 = new Transform({
    position: new Vector3(89.42, 0.5, 101.4),
    rotation: Quaternion.Euler(0, 0, 0),
  })

  // tower- south
  let teleportPos14 = new Transform({
    position: new Vector3(17.44, 0.5, 75.3),
    rotation: Quaternion.Euler(0, 45, 0),
  })

  let dragonRush = new Teleport(
    new GLTFShape('models/teleports/dragon_rush.glb'),
    teleportPos1,
    Locations.DRAGONRUSH,
    'Dragon Rush',
    '',
    'images/example-screenshot.png'
  )

  //2

  //3

  let blockRunner = new Teleport(
    new GLTFShape('models/teleports/block_runner.glb'),
    teleportPos4,
    Locations.BLOCK,
    'Block Runner',
    '',
    'images/example-screenshot.png'
  )

  let roulette = new Teleport(
    new GLTFShape('models/teleports/roulette.glb'),
    teleportPos5,
    Locations.CASINO,
    'Serenity Island Casino',
    '',
    'images/example-screenshot.png'
  )

  // 6 => magic

  let fruit = new Teleport(
    new GLTFShape('models/teleports/fruit_catcher.glb'),
    teleportPos7,
    Locations.FRUIT,
    'Fruit Catcher',
    'Catch as many fruits as you can,\navoid bombs! Compete for the\nhighest score!',
    'images/example-screenshot.png'
  )

  //8

  //9

  // 10  (crowd!)

  let museum = new Teleport(
    new GLTFShape('models/teleports/museum_district.glb'),
    teleportPos11,
    Locations.MUSEUM,
    'Museum District',
    '',
    'images/example-screenshot.png'
  )

  let mole = new Teleport(
    new GLTFShape('models/teleports/click_a_mole.glb'),
    teleportPos12,
    Locations.MOLES,
    'Click a Mole',
    'Whack the moles before they hide!',
    'images/example-screenshot.png'
  )

  let tombChaser = new Teleport(
    new GLTFShape('models/teleports/tomb_chaser.glb'),
    teleportPos13,
    Locations.TOMBCHASER,
    'Tomb Chaser',
    '',
    'images/example-screenshot.png'
  )

  let infinity = new Teleport(
    new GLTFShape('models/teleports/infinity_engine.glb'),
    teleportPos14,
    Locations.INFINITY,
    'Infinity Engine',
    'Mine for loot underground, then\ndefend a train from\nbandits.',
    'images/example-screenshot.png'
  )
}
