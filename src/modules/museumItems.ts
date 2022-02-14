import { Dialog, NPC, TriggerBoxShape } from '@dcl/npc-scene-utils'
import {
  alice,
  ron,
  bela,
  betty,
  charlie,
  marsha,
  bob,
} from './npcRobotBuilder'
import {
  BettyDialog,
  BobDialog,
  CharlieDialog,
  RonDialog,
} from './npcDialogData'
import * as utils from '@dcl/ecs-scene-utils'

// Opens informational dialog about a piece
// function openPieceInfoWindow(piece: Entity, robot: NPC, textID: number) {
//   // used for closing UI when walking away or clicking
// //   updateOpenUITime()
// //   setUiOpener(piece)

// //   dialogWindow.isInfoPanel = true
//   openDialogSound.getComponent(AudioSource).playOnce()
//   robot.talk()

//   robots[robotID].playTalk()
//   dialogWindow.openDialogWindow(robotID, textID) // RobotID and textID
//   // HACK: To avoid clashing with the input subscribe button down event
//   piece.addComponentOrReplace(
//     new utils.Delay(30, () => {
//       dialogWindow.isDialogOpen = true
//     })
//   )

//   // Stop robot from tracking the user
//   if (robots[robotID].hasComponent(TrackUserSlerp))
//     robots[robotID].removeComponent(TrackUserSlerp)
// }

export class MuseumPiece extends Entity {
  model: GLTFShape
  name: string
  constructor(
    model: GLTFShape | BoxShape,
    transform: TranformConstructorArgs,
    name: string,
    robot?: NPC,
    dialog?: Dialog[],
    textID?: number
  ) {
    super()
    engine.addEntity(this)

    this.addComponent(model)
    this.addComponent(new Transform(transform))

    this.name = name

    let thisPiece = this

    this.addComponent(
      new OnPointerDown(
        function () {
          if (robot && dialog) {
            utils.addOneTimeTrigger(
              new TriggerBoxShape(
                new Vector3(10, 5, 10),
                Vector3.Zero() //thisPiece.getComponent(Transform).position.clone()
              ),
              {
                onCameraExit: () => {
                  robot.endInteraction()
                },
                enableDebug: true,
              },
              thisPiece
            )
            robot.talk(dialog, textID)
          }
        },
        {
          button: ActionButton.PRIMARY,
          hoverText: this.name,
        }
      )
    )
  }

  public ask(): void {
    //this.name
  }
}

//// MAP ANIMS

let districtOn = new AnimationState('District_Action', { looping: false })
let districtOff = new AnimationState('District_OFF_Action', { looping: false })
let roadsOn = new AnimationState('Roads_Action', { looping: false })
let roadsOff = new AnimationState('Roads_OFF_Action', { looping: false })
let plazasOn = new AnimationState('Plazas_Action', { looping: false })
let plazasOff = new AnimationState('Plazas_OFF_Action', { looping: false })

export function placeMuseumPieces() {
  let dao = new MuseumPiece(
    new GLTFShape('models/museum/dao.glb'),
    {
      position: new Vector3(119.7, 11.5, 280.3),
      rotation: Quaternion.Euler(0, 105, 0),
    },
    'DAO',
    bob,
    BobDialog,
    8
  )

  let vision = new MuseumPiece(
    new GLTFShape('models/museum/first-image-dcl.glb'),
    {
      position: new Vector3(162, 9.4, 269.4),
      rotation: Quaternion.Euler(0, 208, 0),
    },
    'The Vision',
    bob,
    BobDialog,
    11
  )

  let firstPixels = new MuseumPiece(
    new GLTFShape('models/museum/pixels-beginning.glb'),
    {
      position: new Vector3(168.24, 9.5, 266.3),
      rotation: Quaternion.Euler(0, 208, 0),
    },
    'First Experiments',
    bob,
    BobDialog,
    13
  )

  let first3D = new MuseumPiece(
    new GLTFShape('models/museum/first-experiment.glb'),
    {
      position: new Vector3(174.5, 9.7, 262.5),
      rotation: Quaternion.Euler(0, 208, 0),
    },
    'First 3D Version',
    bob,
    BobDialog,
    16
  )

  let declaration = new MuseumPiece(
    new GLTFShape('models/museum/declaration.glb'),
    {
      position: new Vector3(183.9, 10, 254.7),
      rotation: Quaternion.Euler(0, 220, 0),
    },
    'Declaration of independance',
    bob,
    BobDialog,
    17
  )

  let old_logo = new MuseumPiece(
    new GLTFShape('models/museum/old_logo.glb'),
    {
      position: new Vector3(189.2, 10.4, 250),
      rotation: Quaternion.Euler(0, 212, 0),
    },
    'Original Logo',
    bob,
    BobDialog,
    18
  )

  let first_avatars = new MuseumPiece(
    new GLTFShape('models/museum/first-avatars.glb'),
    {
      position: new Vector3(193.7, 10.45, 245.95),
      rotation: Quaternion.Euler(0, 230, 0),
    },
    'First Avatars',
    bob,
    BobDialog,
    19
  )

  let first_auction = new MuseumPiece(
    new GLTFShape('models/museum/first_auction.glb'),
    {
      position: new Vector3(198.5, 10.5, 240.7),
      rotation: Quaternion.Euler(0, 230, 0),
    },
    'First Land Auction',
    bob,
    BobDialog,
    28
  )

  let avatar1 = new MuseumPiece(
    new GLTFShape('models/museum/avatars/first-avatar.glb'),
    {
      position: new Vector3(200.99, 10.7, 234.22),
      rotation: Quaternion.Euler(0, 315, 0),
    },
    'Avatar',
    bob,
    BobDialog,
    20
  )

  let avatar2 = new MuseumPiece(
    new GLTFShape('models/museum/avatars/fox-avatar.glb'),
    {
      position: new Vector3(199, 10.3, 231.8),
      rotation: Quaternion.Euler(0, 315, 0),
    },
    'Avatar',
    bob,
    BobDialog,
    21
  )
  let avatar3 = new MuseumPiece(
    new GLTFShape('models/museum/avatars/square-robot-avatar.glb'),
    {
      position: new Vector3(196.8, 10.3, 229.7),
      rotation: Quaternion.Euler(0, 315, 0),
    },
    'Avatar',
    bob,
    BobDialog,
    23
  )

  let avatar5 = new MuseumPiece(
    new GLTFShape('models/museum/avatars/round-robot-avatar.glb'),
    {
      position: new Vector3(194.38, 10.3, 227),
      rotation: Quaternion.Euler(0, 315, 0),
    },
    'Avatar',
    bob,
    BobDialog,
    24
  )

  let avatar6 = new MuseumPiece(
    new GLTFShape('models/museum/avatars/boy.glb'),
    {
      position: new Vector3(191.59, 10.8, 224.95),
      rotation: Quaternion.Euler(0, 315, 0),
    },
    'Avatar',
    bob,
    BobDialog,
    25
  )

  let avatar7 = new MuseumPiece(
    new GLTFShape('models/museum/avatars/girl.glb'),
    {
      position: new Vector3(188.7, 10.8, 223),
      rotation: Quaternion.Euler(0, 315, 0),
    },
    'Avatar',
    bob,
    BobDialog,
    26
  )

  let second_auction = new MuseumPiece(
    new GLTFShape('models/museum/second_auction.glb'),
    {
      position: new Vector3(182.6, 10.5, 226.5),
      rotation: Quaternion.Euler(0, 45, 0),
    },
    'Second Land Auction',
    bob,
    BobDialog,
    30
  )

  let new_logo = new MuseumPiece(
    new GLTFShape('models/museum/new_logo.glb'),
    {
      position: new Vector3(177, 10.45, 233.3),
      rotation: Quaternion.Euler(0, 52, 0),
    },
    'New Logo',
    bob,
    BobDialog,
    32
  )

  let landing = new MuseumPiece(
    new GLTFShape('models/museum/landing.glb'),
    {
      position: new Vector3(171.8, 10.5, 239.9),
      rotation: Quaternion.Euler(0, 50, 0),
    },
    'Landing',
    bob,
    BobDialog,
    34
  )

  let builder = new MuseumPiece(
    new GLTFShape('models/museum/builder.glb'),
    {
      position: new Vector3(165.9, 9.8, 246),
      rotation: Quaternion.Euler(0, 45, 0),
    },
    'Builder',
    bob,
    BobDialog,
    37
  )

  let names = new MuseumPiece(
    new GLTFShape('models/museum/names.glb'),
    {
      position: new Vector3(159.8, 9.5, 251.9),
      rotation: Quaternion.Euler(0, 42, 0),
    },
    'Virtual identity',
    bob,
    BobDialog,
    40
  )

  let wearables = new MuseumPiece(
    new GLTFShape('models/museum/halloween_event.glb'),
    {
      position: new Vector3(151.7, 9.4, 258.4),
      rotation: Quaternion.Euler(0, 35, 0),
    },
    'Token Wearables',
    bob,
    BobDialog,
    41
  )

  ///// UPSTAIRS

  let map = new Entity()
  map.addComponent(
    new Transform({
      position: new Vector3(196.29, 18, 226.15),
      rotation: Quaternion.Euler(0, 315, 0),
      scale: new Vector3(1.25, 1.25, 1.25),
    })
  )
  map.addComponent(new GLTFShape('models/museum/map/map_base.glb'))
  engine.addEntity(map)

  let districts = new Entity()
  districts.addComponent(
    new Transform({
      position: new Vector3(),
    })
  )
  districts.setParent(map)
  districts.addComponent(new GLTFShape('models/museum/map/map_districts.glb'))

  districts.addComponent(new Animator())
  districts.getComponent(Animator).addClip(districtOn)
  districts.getComponent(Animator).addClip(districtOff)
  districtOn.stop()

  districts.addComponent(
    new OnPointerDown(
      function () {
        animateMap(MapItems.DISTRICTS)
        bob.talk(BobDialog, 51)
      },
      {
        button: ActionButton.PRIMARY,
        hoverText: 'Districts',
      }
    )
  )

  let plazas = new Entity()
  plazas.setParent(map)
  plazas.addComponent(
    new Transform({
      position: new Vector3(),
    })
  )
  plazas.addComponent(new GLTFShape('models/museum/map/map_plazas.glb'))

  plazas.addComponent(new Animator())
  plazas.getComponent(Animator).addClip(plazasOn)
  plazas.getComponent(Animator).addClip(plazasOff)
  plazasOn.stop()

  plazas.addComponent(
    new OnPointerDown(
      function () {
        animateMap(MapItems.PLAZAS)
        bob.talk(BobDialog, 49)
      },
      {
        button: ActionButton.PRIMARY,
        hoverText: 'Plazas',
      }
    )
  )

  let roads = new Entity()
  roads.setParent(map)
  roads.addComponent(
    new Transform({
      position: new Vector3(),
    })
  )
  roads.addComponent(new GLTFShape('models/museum/map/map_roads.glb'))

  roads.addComponent(new Animator())
  roads.getComponent(Animator).addClip(roadsOn)
  roads.getComponent(Animator).addClip(roadsOff)
  roadsOn.stop()

  roads.addComponent(
    new OnPointerDown(
      function () {
        animateMap(MapItems.ROADS)
        bob.talk(BobDialog, 48)
      },
      {
        button: ActionButton.PRIMARY,
        hoverText: 'Roads',
      }
    )
  )

  let parcel = new MuseumPiece(
    new GLTFShape('models/museum/land.glb'),
    {
      position: new Vector3(193, 17.4, 223.5),
      rotation: Quaternion.Euler(0, 195, 0),
    },
    'LAND Parcel',
    bob,
    BobDialog,
    44
  )

  let parcelPua = new MuseumPiece(
    new GLTFShape('models/museum/pua.glb'),
    {
      position: new Vector3(193, 17.55, 223.5),
      rotation: Quaternion.Euler(0, 195, 0),
    },
    'LAND Parcel'
  )

  let estate = new MuseumPiece(
    new GLTFShape('models/museum/estate.glb'),
    {
      position: new Vector3(199.2, 17.4, 230),
      rotation: Quaternion.Euler(0, 30, 0),
    },
    'Estate',
    bob,
    BobDialog,
    47
  )

  let estatePua = new MuseumPiece(
    new GLTFShape('models/museum/pua.glb'),
    {
      position: new Vector3(199.2, 17.55, 230),
      rotation: Quaternion.Euler(0, 30, 0),
    },
    'Estate'
  )

  let museum_district = new MuseumPiece(
    new GLTFShape('models/museum/museum_district.glb'),
    {
      position: new Vector3(181.2, 17.9, 228.6),
      rotation: Quaternion.Euler(0, 50, 0),
    },
    'Museum District',
    bob,
    BobDialog,
    54
  )

  let builderContest = new MuseumPiece(
    new GLTFShape('models/museum/builder_winner.glb'),
    {
      position: new Vector3(175.2, 17.8, 236.6),
      rotation: Quaternion.Euler(0, 50, 0),
    },
    'First Builder Contest',
    bob,
    BobDialog,
    57
  )

  let builderContest2 = new MuseumPiece(
    new GLTFShape('models/museum/smart-items.glb'),
    {
      position: new Vector3(169, 17.5, 243.95),
      rotation: Quaternion.Euler(0, 50, 0),
    },
    'Creator contest',
    bob,
    BobDialog,
    59
  )

  let mana = new MuseumPiece(
    new GLTFShape('models/museum/mana.glb'),
    {
      position: new Vector3(168.4, 18.8, 255.7),
      rotation: Quaternion.Euler(0, 135, 0),
    },
    'MANA',
    bob,
    BobDialog,
    62
  )

  let hackathon = new MuseumPiece(
    new GLTFShape('models/museum/hackathon_winner.glb'),
    {
      position: new Vector3(185.7, 17.6, 252),
      rotation: Quaternion.Euler(0, 220, 0),
    },
    'September 2019 Hackathon',
    bob,
    BobDialog,
    67
  )

  let hackathon2 = new MuseumPiece(
    new GLTFShape('models/museum/contest_game.glb'),
    {
      position: new Vector3(192.9, 17.7, 245),
      rotation: Quaternion.Euler(0, 225, 0),
    },
    'Hackathons',
    bob,
    BobDialog,
    66
  )

  let community_contest = new MuseumPiece(
    new GLTFShape('models/museum/community_contest.glb'),
    {
      position: new Vector3(199.5, 17.8, 238.2),
      rotation: Quaternion.Euler(0, 230, 0),
    },
    'Community Wearable Contest',
    bob,
    BobDialog,
    69
  )

  ////////  WEARABLES BUILDING

  /*
  Main = 0 (Alice)
  Shell = 1 (Ron)
  Agora = 2 (Bela)
  Garden = 3 (Betty)
  Trade = 4 (Charlie)
  Artichoke = 5 (Marsha)
  Whale = 6 (Bob)
*/
}

export function placeWearablePieces() {
  let xmax_wearables = new MuseumPiece(
    new GLTFShape('models/wearables/xmas_stand.glb'),
    {
      position: new Vector3(279.67, 9.5, 145),
      rotation: Quaternion.Euler(0, 180, 0),
    },
    'About X-Mas Wearables',
    ron,
    RonDialog,
    14
  )

  let halloween_wearables = new MuseumPiece(
    new GLTFShape('models/wearables/halloween_stand.glb'),
    {
      position: new Vector3(265.38, 9.5, 114),
      rotation: Quaternion.Euler(0, 150, 0),
    },
    'About Halloween Wearables',
    ron,
    RonDialog,
    15
  )
}

/////////// TRADE CENTER

export let invisibleMaterial = new BasicMaterial()
invisibleMaterial.texture = new Texture('images/transparent-texture.png')
invisibleMaterial.alphaTest = 1

export function placeTradecenterPieces() {
  let parcelTC = new MuseumPiece(
    new GLTFShape('models/museum/land.glb'),
    {
      position: new Vector3(282.9, 11, 39),
      rotation: Quaternion.Euler(0, 195, 0),
    },
    'LAND Parcel',
    charlie,
    CharlieDialog,
    12
  )

  let parcelPuaTC = new MuseumPiece(
    new GLTFShape('models/museum/pua.glb'),
    {
      position: new Vector3(282.9, 11, 39),
      rotation: Quaternion.Euler(0, 195, 0),
    },
    'LAND Parcel'
  )

  let estateTC = new MuseumPiece(
    new GLTFShape('models/museum/estate.glb'),
    {
      position: new Vector3(262.9, 11, 35.7),
      rotation: Quaternion.Euler(0, 30, 0),
    },
    'Estate',
    charlie,
    CharlieDialog,
    16
  )

  let estatePuaTC = new MuseumPiece(
    new GLTFShape('models/museum/pua.glb'),
    {
      position: new Vector3(262.9, 11, 35.7),
      rotation: Quaternion.Euler(0, 30, 0),
    },
    'Estate'
  )

  let mythicInfo = new MuseumPiece(
    new BoxShape(),
    {
      position: new Vector3(264.5, 22.7, 16.25),
      rotation: Quaternion.Euler(0, 204, 0),
      scale: new Vector3(5.8, 1.2, 1.2),
    },
    'Wearables',
    charlie,
    CharlieDialog,
    17
  )

  mythicInfo.addComponent(invisibleMaterial)

  let epicInfo = new MuseumPiece(
    new BoxShape(),
    {
      position: new Vector3(251.4, 22.7, 46.13),
      rotation: Quaternion.Euler(0, 293, 0),
      scale: new Vector3(5.8, 1.2, 1.2),
    },
    'Wearables',
    charlie,
    CharlieDialog,
    17
  )

  epicInfo.addComponent(invisibleMaterial)

  let legendaryInfo = new MuseumPiece(
    new BoxShape(),
    {
      position: new Vector3(294.7, 22.7, 28.83),
      rotation: Quaternion.Euler(0, 114, 0),
      scale: new Vector3(5.8, 1.2, 1.2),
    },
    'Wearables',
    charlie,
    CharlieDialog,
    17
  )

  legendaryInfo.addComponent(invisibleMaterial)

  let rareInfo = new MuseumPiece(
    new BoxShape(),
    {
      position: new Vector3(281.4, 22.7, 59.17),
      rotation: Quaternion.Euler(0, 24, 0),
      scale: new Vector3(5.8, 1.2, 1.2),
    },
    'Wearables',
    charlie,
    CharlieDialog,
    17
  )

  rareInfo.addComponent(invisibleMaterial)
}

/////// GARDEN

export function placeGardenPieces() {
  let builderScene = new MuseumPiece(
    new GLTFShape('models/garden/booth_builder_scene.glb'),
    {
      position: new Vector3(132.59, 2, 39.8),

      rotation: Quaternion.Euler(0, 90, 0),
    },
    'Builder scene',
    betty,
    BettyDialog,
    34
  )

  let smartItemScene = new MuseumPiece(
    new GLTFShape('models/garden/booth_smart_items.glb'),
    {
      position: new Vector3(106, 2, 27.7),
      rotation: Quaternion.Euler(0, 180, 0),
    },
    'Smart Item scene',
    betty,
    BettyDialog,
    35
  )

  let builderLink = new Entity()
  builderLink.addComponent(
    new Transform({
      position: new Vector3(121.6, 1.2, 20.5),
      rotation: Quaternion.Euler(0, 0, 0),
      scale: new Vector3(1.5, 1.5, 1.5),
    })
  )
  builderLink.addComponent(new GLTFShape('models/garden/builder.glb'))
  engine.addEntity(builderLink)
  builderLink.addComponent(
    new OnPointerDown(
      (e) => {
        openExternalURL('https://builder.decentraland.org')
      },
      { hoverText: 'Try the Builder', button: ActionButton.PRIMARY }
    )
  )

  let docsLink = new Entity()
  docsLink.addComponent(
    new Transform({
      position: new Vector3(121.6, 1.2, 17.5),
      rotation: Quaternion.Euler(0, 0, 0),
      scale: new Vector3(1.5, 1.5, 1.5),
    })
  )
  docsLink.addComponent(new GLTFShape('models/garden/docs.glb'))

  docsLink.addComponent(
    new OnPointerDown(
      (e) => {
        openExternalURL('https://docs.decentraland.org')
      },
      { hoverText: 'Read the Docs', button: ActionButton.PRIMARY }
    )
  )
  engine.addEntity(docsLink)

  let discordLink = new Entity()
  discordLink.addComponent(
    new Transform({
      position: new Vector3(113.6, 1.5, 20.5),
      rotation: Quaternion.Euler(0, 0, 0),
      scale: new Vector3(1, 1, 1),
    })
  )
  discordLink.addComponent(new GLTFShape('models/garden/discord.glb'))

  discordLink.addComponent(
    new OnPointerDown(
      (e) => {
        openExternalURL('https://dcl.gg/discord')
      },
      { hoverText: 'Join the Discussion', button: ActionButton.PRIMARY }
    )
  )
  engine.addEntity(discordLink)

  let twitterLink = new Entity()
  twitterLink.addComponent(
    new Transform({
      position: new Vector3(113.6, 1.5, 17.5),
      rotation: Quaternion.Euler(0, 0, 0),
      scale: new Vector3(1, 1, 1),
    })
  )
  twitterLink.addComponent(new GLTFShape('models/garden/twitter.glb'))

  twitterLink.addComponent(
    new OnPointerDown(
      (e) => {
        openExternalURL('https://twitter.com/decentraland')
      },
      { hoverText: 'Follow Us!', button: ActionButton.PRIMARY }
    )
  )
  engine.addEntity(twitterLink)
}

///// MAP HELPERS

export enum MapItems {
  DISTRICTS = 'districts',
  PLAZAS = 'plazas',
  ROADS = 'roads',
}

let currentItem: MapItems | null = null

export function animateMap(item: MapItems) {
  log('selected item: ', item)
  switch (currentItem) {
    case MapItems.DISTRICTS:
      districtOff.play()
      break
    case MapItems.ROADS:
      roadsOn.stop()
      roadsOff.play()
      break
    case MapItems.PLAZAS:
      plazasOn.stop()
      plazasOff.play()
      break
  }

  if (item != currentItem) {
    currentItem = item

    switch (item) {
      case MapItems.DISTRICTS:
        log('clicked Districts')
        districtOff.stop()
        districtOn.stop()
        districtOn.play()
        break
      case MapItems.ROADS:
        log('clicked Roads')
        roadsOff.stop()
        roadsOn.stop()
        roadsOn.play()
        break
      case MapItems.PLAZAS:
        log('clicked Plazas')
        plazasOff.stop()
        plazasOn.stop()
        plazasOn.play()
        break
    }
  } else {
    currentItem = null
  }
}
