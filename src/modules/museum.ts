export class MuseumPiece extends Entity {
  model: GLTFShape
  name: string
  constructor(
    model: GLTFShape,
    transform: TranformConstructorArgs,
    name: string
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
          //askAboutPiece(thisPiece)
        },
        { hoverText: this.name }
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
    'DAO'
  )

  let vision = new MuseumPiece(
    new GLTFShape('models/museum/first-image-dcl.glb'),
    {
      position: new Vector3(162, 9.4, 269.4),
      rotation: Quaternion.Euler(0, 208, 0),
    },
    'The Vision'
  )

  let firstPixels = new MuseumPiece(
    new GLTFShape('models/museum/pixels-beginning'),
    {
      position: new Vector3(168.24, 9.5, 266.3),
      rotation: Quaternion.Euler(0, 208, 0),
    },
    'First Experiments'
  )

  let first3D = new MuseumPiece(
    new GLTFShape('models/museum/first-experiment.glb'),
    {
      position: new Vector3(174.5, 9.7, 262.5),
      rotation: Quaternion.Euler(0, 208, 0),
    },
    'First 3D Version'
  )

  let declaration = new MuseumPiece(
    new GLTFShape('models/museum/declaration.glb'),
    {
      position: new Vector3(183.9, 10, 254.7),
      rotation: Quaternion.Euler(0, 220, 0),
    },
    'Declaration of independance'
  )

  let old_logo = new MuseumPiece(
    new GLTFShape('models/museum/old_logo.glb'),
    {
      position: new Vector3(189.2, 10.4, 250),
      rotation: Quaternion.Euler(0, 212, 0),
    },
    'Original Logo'
  )

  let first_avatars = new MuseumPiece(
    new GLTFShape('models/museum/first-avatars.glb'),
    {
      position: new Vector3(193.7, 10.45, 245.95),
      rotation: Quaternion.Euler(0, 230, 0),
    },
    'First Avatars'
  )

  let first_auction = new MuseumPiece(
    new GLTFShape('models/museum/first_auction.glb'),
    {
      position: new Vector3(198.5, 10.5, 240.7),
      rotation: Quaternion.Euler(0, 230, 0),
    },
    'First Land Auction'
  )

  let avatar1 = new MuseumPiece(
    new GLTFShape('models/museum/avatars/first-avatar.glb'),
    {
      position: new Vector3(200.99, 10.7, 234.22),
      rotation: Quaternion.Euler(0, 315, 0),
    },
    'Avatar'
  )

  let avatar2 = new MuseumPiece(
    new GLTFShape('models/museum/avatars/fox-avatar.glb'),
    {
      position: new Vector3(199, 10.3, 231.8),
      rotation: Quaternion.Euler(0, 315, 0),
    },
    'Avatar'
  )
  let avatar3 = new MuseumPiece(
    new GLTFShape('models/museum/avatars/square-robot-avatar.glb'),
    {
      position: new Vector3(196.8, 10.3, 229.7),
      rotation: Quaternion.Euler(0, 315, 0),
    },
    'Avatar'
  )

  let avatar5 = new MuseumPiece(
    new GLTFShape('models/museum/avatars/round-robot-avatar.glb'),
    {
      position: new Vector3(194.38, 10.3, 227),
      rotation: Quaternion.Euler(0, 315, 0),
    },
    'Avatar'
  )

  let avatar6 = new MuseumPiece(
    new GLTFShape('models/museum/avatars/boy.glb'),
    {
      position: new Vector3(191.59, 10.8, 224.95),
      rotation: Quaternion.Euler(0, 315, 0),
    },
    'Avatar'
  )

  let avatar7 = new MuseumPiece(
    new GLTFShape('models/museum/avatars/girl.glb'),
    {
      position: new Vector3(188.7, 10.8, 223),
      rotation: Quaternion.Euler(0, 315, 0),
    },
    'Avatar'
  )

  let second_auction = new MuseumPiece(
    new GLTFShape('models/museum/second_auction.glb'),
    {
      position: new Vector3(182.6, 10.5, 226.5),
      rotation: Quaternion.Euler(0, 45, 0),
    },
    'Second Land Auction'
  )

  let new_logo = new MuseumPiece(
    new GLTFShape('models/museum/new_logo.glb'),
    {
      position: new Vector3(177, 10.45, 233.3),
      rotation: Quaternion.Euler(0, 52, 0),
    },
    'New Logo'
  )

  let landing = new MuseumPiece(
    new GLTFShape('models/museum/landing.glb'),
    {
      position: new Vector3(171.8, 10.5, 239.9),
      rotation: Quaternion.Euler(0, 50, 0),
    },
    'Landing'
  )

  let builder = new MuseumPiece(
    new GLTFShape('models/museum/builder.glb'),
    {
      position: new Vector3(165.9, 9.8, 246),
      rotation: Quaternion.Euler(0, 45, 0),
    },
    'Builder'
  )

  let names = new MuseumPiece(
    new GLTFShape('models/museum/names.glb'),
    {
      position: new Vector3(159.8, 9.5, 251.9),
      rotation: Quaternion.Euler(0, 42, 0),
    },
    'Virtual identity'
  )

  let wearables = new MuseumPiece(
    new GLTFShape('models/museum/halloween_event.glb'),
    {
      position: new Vector3(151.7, 9.4, 258.4),
      rotation: Quaternion.Euler(0, 35, 0),
    },
    'Token Wearables'
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

  districts.addComponent(
    new OnPointerDown(
      function () {
        animateMap(MapItems.DISTRICTS)
        //askAboutPiece(thisPiece)
      },
      { hoverText: 'Districts' }
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

  plazas.addComponent(
    new OnPointerDown(
      function () {
        animateMap(MapItems.PLAZAS)
        //askAboutPiece(thisPiece)
      },
      { hoverText: 'Plazas' }
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
  roads.addComponent(
    new OnPointerDown(
      function () {
        animateMap(MapItems.ROADS)
        //askAboutPiece(thisPiece)
      },
      { hoverText: 'Roads' }
    )
  )

  let parcel = new MuseumPiece(
    new GLTFShape('models/museum/land.glb'),
    {
      position: new Vector3(193, 17.4, 223.5),
      rotation: Quaternion.Euler(0, 195, 0),
    },
    'LAND Parcel'
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
    'Estate'
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
    'Builder Contest 2019'
  )

  let builderContest = new MuseumPiece(
    new GLTFShape('models/museum/builder_winner.glb'),
    {
      position: new Vector3(175.2, 17.8, 236.6),
      rotation: Quaternion.Euler(0, 50, 0),
    },
    'First Builder Contest'
  )

  let builderContest2 = new MuseumPiece(
    new GLTFShape('models/museum/smart-items.glb'),
    {
      position: new Vector3(169, 17.5, 243.95),
      rotation: Quaternion.Euler(0, 50, 0),
    },
    'Creator contest'
  )

  let mana = new MuseumPiece(
    new GLTFShape('models/museum/mana.glb'),
    {
      position: new Vector3(168.4, 18.8, 255.7),
      rotation: Quaternion.Euler(0, 135, 0),
    },
    'MANA'
  )

  let hackathon = new MuseumPiece(
    new GLTFShape('models/museum/hackathon_winner.glb'),
    {
      position: new Vector3(185.7, 17.6, 252),
      rotation: Quaternion.Euler(0, 220, 0),
    },
    'September 2019 Hackathon'
  )

  let hackathon2 = new MuseumPiece(
    new GLTFShape('models/museum/contest_game.glb'),
    {
      position: new Vector3(192.9, 17.7, 245),
      rotation: Quaternion.Euler(0, 225, 0),
    },
    'Hackathons'
  )

  let community_contest = new MuseumPiece(
    new GLTFShape('models/museum/community_contest.glb'),
    {
      position: new Vector3(199.5, 17.8, 238.2),
      rotation: Quaternion.Euler(0, 230, 0),
    },
    'Community Wearable Contest'
  )

  // ... fillers?

  // covid
  // halloween
  // university district
  // satoshi district

  //   //   let wearable = new MuseumPiece(
  //   //     new GLTFShape('models/museum/.glb'),
  //   //     {
  //   //       position: new Vector3(189.2, 19.5, 222),
  //   //       rotation: Quaternion.Euler(0, 315, 0),
  //   //     },
  //   //     'Declaration'
  //   //   )

  //   let names = new MuseumPiece(
  //     new GLTFShape('models/museum/names.glb'),
  //     {
  //       position: new Vector3(179.8, 18.5, 230),
  //       rotation: Quaternion.Euler(0, 45, 0),
  //     },
  //     'Names'
  //   )

  //   let landing = new MuseumPiece(
  //     new GLTFShape('models/museum/landing.glb'),
  //     {
  //       position: new Vector3(167.3, 18.5, 244.95),
  //       rotation: Quaternion.Euler(0, 45, 0),
  //     },
  //     'Landing'
  //   )

  //   let parcel2 = new MuseumPiece(
  //     new GLTFShape('models/museum/land.glb'),
  //     {
  //       position: new Vector3(171, 18.5, 257.7),
  //       rotation: Quaternion.Euler(0, 135, 0),
  //     },
  //     'Parcel'
  //   )

  ////////  WEARABLES BUILDING

  let xmax_wearables = new MuseumPiece(
    new GLTFShape('models/wearables/xmas_stand.glb'),
    {
      position: new Vector3(279.67, 9.5, 145),
      rotation: Quaternion.Euler(0, 180, 0),
    },
    'About X-Mas Wearables'
  )

  let halloween_wearables = new MuseumPiece(
    new GLTFShape('models/wearables/halloween_stand.glb'),
    {
      position: new Vector3(265.38, 9.5, 114),
      rotation: Quaternion.Euler(0, 150, 0),
    },
    'About Halloween Wearables'
  )
}

/////////// TRADE CENTER

let parcelTC = new MuseumPiece(
  new GLTFShape('models/museum/land.glb'),
  {
    position: new Vector3(282.9, 11.8, 39),
    rotation: Quaternion.Euler(0, 195, 0),
  },
  'LAND Parcel'
)

let parcelPuaTC = new MuseumPiece(
  new GLTFShape('models/museum/pua.glb'),
  {
    position: new Vector3(282.9, 11.8, 39),
    rotation: Quaternion.Euler(0, 195, 0),
  },
  'LAND Parcel'
)

let estateTC = new MuseumPiece(
  new GLTFShape('models/museum/estate.glb'),
  {
    position: new Vector3(262.9, 11.3, 35.7),
    rotation: Quaternion.Euler(0, 30, 0),
  },
  'Estate'
)

let estatePuaTC = new MuseumPiece(
  new GLTFShape('models/museum/pua.glb'),
  {
    position: new Vector3(262.9, 11.3, 35.7),
    rotation: Quaternion.Euler(0, 30, 0),
  },
  'Estate'
)

let wearableTC = new MuseumPiece(
  new GLTFShape('models/wearables/second_floor/J/razor_blade_upper_body.glb'),
  {
    position: new Vector3(251, 21.6, 27.5),
    rotation: Quaternion.Euler(0, 30, 0),
  },
  'Wearables'
)

/////// GARDEN

let builderScene = new MuseumPiece(
  new GLTFShape('models/garden/booth_builder_scene.glb'),
  {
	position: new Vector3(132.59, 2, 39.8),
   
    rotation: Quaternion.Euler(0, 0, 0),
  },
  'Builder scene'
)

let smartItemScene = new MuseumPiece(
  new GLTFShape('models/garden/booth_smart_items.glb'),
  {
	
	position: new Vector3(106, 2, 27.7),
    rotation: Quaternion.Euler(0, 180, 0),
  },
  'Smart Item scene'
)

let creatorProgram = new Entity()
creatorProgram.addComponent(
  new Transform({
	position: new Vector3(126.24, 2, 30.6),
    rotation: Quaternion.Euler(0, 45 + 270, 0),
  })
)
creatorProgram.addComponent(new GLTFShape('models/garden/creator-contest.glb'))
engine.addEntity(creatorProgram)
creatorProgram.addComponent(
  new OnPointerDown((e) => {
    openExternalURL(
      'https://decentraland.org/blog/announcements/introducing-the-decentraland-content-creator-program/'
    )
  },{ hoverText: "Learn more"})
)

let builderLink = new Entity()
builderLink.addComponent(
  new Transform({
    position: new Vector3(121.6, 2, 20.5),
    rotation: Quaternion.Euler(0, 0, 0),
  })
)
builderLink.addComponent(new GLTFShape('models/garden/builder.glb'))
engine.addEntity(builderLink)
builderLink.addComponent(
  new OnPointerDown((e) => {
    openExternalURL('https://builder.decentraland.org')
  }{ hoverText: "Try the Builder"})
)

let docsLink = new Entity()
docsLink.addComponent(
  new Transform({
    position: new Vector3(113.8, 2, 20.5),
    rotation: Quaternion.Euler(0, 0, 0),
  })
)
docsLink.addComponent(new GLTFShape('models/garden/docs.glb'))

docsLink.addComponent(
  new OnPointerDown((e) => {
    openExternalURL('https://docs.decentraland.org')
  }{ hoverText: "Read the Docs"})
)
engine.addEntity(docsLink)

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
