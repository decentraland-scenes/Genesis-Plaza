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
  TOKI = '28,45',
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
    position: new Vector3(189.84, 1, 68),
    rotation: Quaternion.Euler(0, 270, 0),
  })

  // rock & market
  let teleportPos5 = new Transform({
    position: new Vector3(210.19, 1, 68.8),
    rotation: Quaternion.Euler(0, 90, 0),
  })

  // sculpture & wearables
  let teleportPos6 = new Transform({
    position: new Vector3(211.19, 1, 119.5),
    rotation: Quaternion.Euler(0, 270, 0),
  })

  // wearables - west
  let teleportPos7 = new Transform({
    position: new Vector3(226.8, 1, 132.8),
    rotation: Quaternion.Euler(0, 90, 0),
  })

  // wearables - NW
  let teleportPos8 = new Transform({
    position: new Vector3(228.3, 1, 168.8),
    rotation: Quaternion.Euler(0, 135, 0),
  })

  // wearables - N
  let teleportPos9 = new Transform({
    position: new Vector3(261.2, 1, 174.4),
    rotation: Quaternion.Euler(0, 135, 0),
  })

  // whale - S
  let teleportPos10 = new Transform({
    position: new Vector3(222.7, 1, 203.8),
    rotation: Quaternion.Euler(0, 45, 0),
  })

  // center - N
  let teleportPos11 = new Transform({
    position: new Vector3(174.71, 1, 209.8),
    rotation: Quaternion.Euler(0, 45, 0),
  })

  // whale & mountains
  let teleportPos12 = new Transform({
    position: new Vector3(97.63, 0.5, 249.46),
    rotation: Quaternion.Euler(0, 0, 0),
  })

  // tower- east
  let teleportPos13 = new Transform({
    position: new Vector3(89.42, 1, 101.4),
    rotation: Quaternion.Euler(0, 0, 0),
  })

  // tower- south
  let teleportPos14 = new Transform({
    position: new Vector3(17.44, 1, 75.3),
    rotation: Quaternion.Euler(0, 45, 0),
  })

  // center - N2
  let teleportPos15 = new Transform({
    position: new Vector3(145.45, 1, 210),
    rotation: Quaternion.Euler(0, 45, 0),
  })

  //1
  let dragonRush = new Teleport(
    new GLTFShape('models/teleports/dragon_rush.glb'),
    teleportPos1,
    Locations.DRAGONRUSH,
    'Dragon Rush',
    '',
    'images/teleports/Dragon_Race.jpg'
  )

  //2

  let toki = new Teleport(
    new GLTFShape('models/teleports/toki_land.glb'),
    teleportPos2,
    Locations.TOKI,
    'Toki Toki Land',
    '',
    'images/teleports/TokiLand.jpg'
  )

  //3

  let magic2 = new Teleport(
    new GLTFShape('models/teleports/star.glb'),
    teleportPos3,
    Locations.MAGIC,
    'Random amazing scene',
    '',
    'images/example-screenshot.png'
  )

  //4
  let blockRunner = new Teleport(
    new GLTFShape('models/teleports/block_runner.glb'),
    teleportPos4,
    Locations.BLOCK,
    'Block Runner',
    '',
    'images/teleports/BlockRunner.jpg'
  )

  //5
  let roulette = new Teleport(
    new GLTFShape('models/teleports/roulette.glb'),
    teleportPos5,
    Locations.CASINO,
    'Serenity Island Casino',
    '',
    'images/teleports/Chateau_satoshi.jpg'
  )

  // 6

  let koko = new Teleport(
    new GLTFShape('models/teleports/koko_jones.glb'),
    teleportPos6,
    Locations.KOKO,
    'Koko Jones',
    '',
    'images/teleports/Koko_Jones.jpg'
  )

  //7
  let fruit = new Teleport(
    new GLTFShape('models/teleports/fruit_catcher.glb'),
    teleportPos7,
    Locations.FRUIT,
    'Fruit Catcher',
    'Catch as many fruits as you can,\navoid bombs! Compete for the\nhighest score!',
    'images/teleports/Fruit_Catcher.jpg'
  )

  //8
  let magic14 = new Teleport(
    new GLTFShape('models/teleports/star.glb'),
    teleportPos8,
    Locations.MAGIC,
    'Random amazing scene',
    '',
    'images/example-screenshot.png'
  )

  //9
  let crowd = new Teleport(
    new GLTFShape('models/teleports/crowd.glb'),
    teleportPos9,
    Locations.CROWD,
    'Join other players',
    '',
    'images/teleports/Crowd.jpg'
  )

  // 10  (crowd!)

  let salmonomicon = new Teleport(
    new GLTFShape('models/teleports/salmonomicon.glb'),
    teleportPos10,
    Locations.SALMONOMICON,
    'Book of Salmonomicon',
    '',
    'images/teleports/Salmonomicon.jpg'
  )

  // 11
  let museum = new Teleport(
    new GLTFShape('models/teleports/museum_district.glb'),
    teleportPos11,
    Locations.MUSEUM,
    'Museum District',
    '',
    'images/teleports/Museum_District.jpg'
  )

  // 12
  let mole = new Teleport(
    new GLTFShape('models/teleports/click_a_mole.glb'),
    teleportPos12,
    Locations.MOLES,
    'Click a Mole',
    'Whack the moles before they hide!',
    'images/teleports/ClickAMole.jpg'
  )

  // 13
  let tombChaser = new Teleport(
    new GLTFShape('models/teleports/tomb_chaser.glb'),
    teleportPos13,
    Locations.TOMBCHASER,
    'Tomb Chaser',
    '',
    'images/teleports/Tomb_Chaser.jpg'
  )

  // 14
  let infinity = new Teleport(
    new GLTFShape('models/teleports/infinity_engine.glb'),
    teleportPos14,
    Locations.INFINITY,
    'Infinity Engine',
    'Mine for loot underground, then\ndefend a train from\nbandits.',
    'images/teleports/Infinity_Engine.jpg'
  )

  // 15  (crowd!)
  let crowd2 = new Teleport(
    new GLTFShape('models/teleports/crowd.glb'),
    teleportPos15,
    Locations.CROWD,
    'Join other players',
    '',
    'images/teleports/Crowd.jpg'
  )
}
