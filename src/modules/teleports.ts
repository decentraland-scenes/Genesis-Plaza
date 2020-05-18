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
        {
          button: ActionButton.PRIMARY,
          hoverText: this.name,
        }
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

    let teleportFloor = new Entity()
    teleportFloor.addComponent(new GLTFShape('models/teleports/teleport.glb'))
    teleportFloor.addComponent(new Transform({}))
    teleportFloor.setParent(this)
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
    position: new Vector3(81.7, 0.3, 18.45),
    rotation: Quaternion.Euler(0, 0, 0),
  })

  // garden & hallway
  let teleportPos2 = new Transform({
    position: new Vector3(100.19, 0.3, 69),
    rotation: Quaternion.Euler(0, 225, 0),
  })

  // garden & market
  let teleportPos3 = new Transform({
    position: new Vector3(177.5, 0.3, 51),
    rotation: Quaternion.Euler(0, 0, 0),
  })

  // garden & rock
  let teleportPos4 = new Transform({
    position: new Vector3(189.84, 0.3, 68),
    rotation: Quaternion.Euler(0, 270, 0),
  })

  // rock & market
  let teleportPos5 = new Transform({
    position: new Vector3(210.19, 0.45, 68.8),
    rotation: Quaternion.Euler(0, 90, 0),
  })

  // sculpture & wearables
  let teleportPos6 = new Transform({
    position: new Vector3(211.19, 0.3, 119.5),
    rotation: Quaternion.Euler(0, 270, 0),
  })

  // wearables - west
  let teleportPos7 = new Transform({
    position: new Vector3(226.8, 0.3, 132.8),
    rotation: Quaternion.Euler(0, 90, 0),
  })

  // wearables - NW
  let teleportPos8 = new Transform({
    position: new Vector3(228.3, 0.45, 168.8),
    rotation: Quaternion.Euler(0, 135, 0),
  })

  // wearables - N
  let teleportPos9 = new Transform({
    position: new Vector3(261.2, 0.3, 174.4),
    rotation: Quaternion.Euler(0, 135, 0),
  })

  // whale - S
  let teleportPos10 = new Transform({
    position: new Vector3(222.7, 0.45, 203.8),
    rotation: Quaternion.Euler(0, 45, 0),
  })

  // center - N
  let teleportPos11 = new Transform({
    position: new Vector3(174.71, 0.4, 209.8),
    rotation: Quaternion.Euler(0, 45, 0),
  })

  // whale & mountains
  let teleportPos12 = new Transform({
    position: new Vector3(97.63, 0.3, 249.46),
    rotation: Quaternion.Euler(0, 0, 0),
  })

  // tower- east
  let teleportPos13 = new Transform({
    position: new Vector3(89.42, 0.3, 101.4),
    rotation: Quaternion.Euler(0, 0, 0),
  })

  // tower- south
  let teleportPos14 = new Transform({
    position: new Vector3(17.44, 0.25, 75.3),
    rotation: Quaternion.Euler(0, 45, 0),
  })

  // center - N2
  let teleportPos15 = new Transform({
    position: new Vector3(145.45, 0.7, 210),
    rotation: Quaternion.Euler(0, 45, 0),
  })

  let teleports = [
    {
      name: 'Dragon Rush',
      model: new GLTFShape('models/teleports/dragon_rush.glb'),
      location: Locations.DRAGONRUSH,
      transform: teleportPos1,
      screenshot: 'images/teleports/Dragon_Race.jpg',
      description:
        'Fly on the back of a dragon, need we\nsay more?\nScene by the amusement park district.',
    },
    {
      name: 'Toki Toki Land',
      model: new GLTFShape('models/teleports/toki_land.glb'),
      location: Locations.TOKI,
      transform: teleportPos2,
      screenshot: 'images/teleports/TokiLand.jpg',
      description:
        'A christmas themed adventure.\nSave the Toki Tokis from\nan evil snowman and his henchmen.',
    },
    {
      name: 'Random amazing scene',
      model: new GLTFShape('models/teleports/star.glb'),
      location: Locations.MAGIC,
      transform: teleportPos3,
      screenshot: 'images/teleports/Magic.jpg',
      description:
        'Visit a random scene from\na curated list of amazing places!\n',
    },
    {
      name: 'Block Runner',
      model: new GLTFShape('models/teleports/block_runner.glb'),
      location: Locations.BLOCK,
      transform: teleportPos4,
      screenshot: 'images/teleports/BlockRunner.jpg',
      description:
        'A collection of competitive minigames\nthat are a lot of fun to play!\n',
    },
    {
      name: 'Serenity Island Casino',
      model: new GLTFShape('models/teleports/roulette.glb'),
      location: Locations.CASINO,
      transform: teleportPos5,
      screenshot: 'images/teleports/Chateau_satoshi.jpg',
      description:
        'Play roulette and slot machines in a\nluxurious casino by the shore!\n',
    },
    {
      name: 'Koko Jones',
      model: new GLTFShape('models/teleports/koko_jones.glb'),
      location: Locations.KOKO,
      transform: teleportPos6,
      screenshot: 'images/teleports/Koko_Jones.jpg',
      description:
        'Visit the temple of eternal bananas\nto collect gems and face evil monkeys\nScene by the amusement park district.',
    },
    {
      name: 'Fruit Catcher',
      model: new GLTFShape('models/teleports/fruit_catcher.glb'),
      location: Locations.FRUIT,
      transform: teleportPos7,
      screenshot: 'images/teleports/Fruit_Catcher.jpg',
      description:
        'Catch as many fruits as you can,\navoid bombs! Compete for the\nhighest score!',
    },
    {
      name: 'Random amazing scene',
      model: new GLTFShape('models/teleports/star.glb'),
      location: Locations.MAGIC,
      transform: teleportPos8,
      screenshot: 'images/teleports/Magic.jpg',
      description:
        'Visit a random scene from\na curated list of amazing places!\n',
    },
    {
      name: 'Join other players',
      model: new GLTFShape('models/teleports/crowd.glb'),
      location: Locations.CROWD,
      transform: teleportPos9,
      screenshot: 'images/teleports/Crowd.jpg',
      description:
        'Teleport to the most crowded location\nin all of Decentraland to meet up\nwith other players!',
    },
    {
      name: 'Book of Salmonomicon',
      model: new GLTFShape('models/teleports/salmonomicon.glb'),
      location: Locations.SALMONOMICON,
      transform: teleportPos10,
      screenshot: 'images/teleports/Salmonomicon.jpg',
      description:
        'In this bizarre horror-themed game\nhelp Mika out and defeat a\nterrible creature.',
    },
    {
      name: 'Museum District',
      model: new GLTFShape('models/teleports/museum_district.glb'),
      location: Locations.MUSEUM,
      transform: teleportPos11,
      screenshot: 'images/teleports/Museum_District.jpg',
      description:
        'The Museum district houses works\nfrom digital and traditional artists.\nSuperb moving sculptures & paintings.',
    },
    {
      name: 'Click a Mole',
      model: new GLTFShape('models/teleports/click_a_mole.glb'),
      location: Locations.MOLES,
      transform: teleportPos12,
      screenshot: 'images/teleports/ClickAMole.jpg',
      description: 'Whack the moles before they hide!\n\n',
    },
    {
      name: 'Tomb Chaser',
      model: new GLTFShape('models/teleports/tomb_chaser.glb'),
      location: Locations.TOMBCHASER,
      transform: teleportPos13,
      screenshot: 'images/teleports/Tomb_Chaser.jpg',
      description:
        'Speed run through an ancient pyramid\navoiding obstacles as you try to keep\nup, in this exciting game.',
    },
    {
      name: 'Infinity Engine',
      model: new GLTFShape('models/teleports/infinity_engine.glb'),
      location: Locations.INFINITY,
      transform: teleportPos14,
      screenshot: 'images/teleports/Infinity_Engine.jpg',
      description:
        'Mine for loot underground, then\ndefend a train from\nbandits.',
    },
    {
      name: 'Join other players',
      model: new GLTFShape('models/teleports/crowd.glb'),
      location: Locations.CROWD,
      transform: teleportPos15,
      screenshot: 'images/teleports/Crowd.jpg',
      description:
        'Teleport to the most crowded location\nin all of Decentraland to meet up\nwith other players!',
    },
  ]

  for (let i of teleports) {
    let t = new Teleport(
      i.model,
      i.transform,
      i.location,
      i.name,
      i.description,
      i.screenshot
    )
  }
}
