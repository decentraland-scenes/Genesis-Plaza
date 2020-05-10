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

export function placeMuseumPieces() {
  let mana = new MuseumPiece(
    new GLTFShape('models/museum/mana.glb'),
    {
      position: new Vector3(119.7, 11.5, 280.3),
      rotation: Quaternion.Euler(0, 105, 0),
    },
    'MANA'
  )

  let hackathon = new MuseumPiece(
    new GLTFShape('models/museum/hackathon_winner.glb'),
    {
      position: new Vector3(136, 9.4, 278.5),
      rotation: Quaternion.Euler(0, 195, 0),
    },
    'Hackathon Sept 2019'
  )

  let contest_game = new MuseumPiece(
    new GLTFShape('models/museum/contest_game.glb'),
    {
      position: new Vector3(132.8, 9.4, 272),
      rotation: Quaternion.Euler(0, 30, 0),
    },
    'Builder contest 2019'
  )

  let covid_event = new MuseumPiece(
    new GLTFShape('models/museum/covid_event.glb'),
    {
      position: new Vector3(159.8, 9.5, 251.9),
      rotation: Quaternion.Euler(0, 42, 0),
    },
    'Covid charity event'
  )

  let university_district = new MuseumPiece(
    new GLTFShape('models/museum/university_district.glb'),
    {
      position: new Vector3(168.7, 10, 243.1),
      rotation: Quaternion.Euler(0, 47, 0),
    },
    'University District'
  )

  let satoshi_scene = new MuseumPiece(
    new GLTFShape('models/museum/satoshi_district.glb'),
    {
      position: new Vector3(177, 10.4, 233.3),
      rotation: Quaternion.Euler(0, 52, 0),
    },
    'University District'
  )

  let first_avatars = new MuseumPiece(
    new GLTFShape('models/museum/first-avatars.glb'),
    {
      position: new Vector3(193.7, 10.35, 245.95),
      rotation: Quaternion.Euler(0, 230, 0),
    },
    'First Avatars'
  )

  let museum_district = new MuseumPiece(
    new GLTFShape('models/museum/museum_district.glb'),
    {
      position: new Vector3(184.7, 10.2, 254),
      rotation: Quaternion.Euler(0, 218, 0),
    },
    'University District'
  )

  let builder_contest = new MuseumPiece(
    new GLTFShape('models/museum/builder_winner.glb'),
    {
      position: new Vector3(168.24, 9.5, 266.3),
      rotation: Quaternion.Euler(0, 208, 0),
    },
    'Builder contest 2019'
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

  let declaration = new MuseumPiece(
    new GLTFShape('models/museum/declaration.glb'),
    {
      position: new Vector3(196.29, 195, 226.15),
      rotation: Quaternion.Euler(0, 315, 0),
    },
    'Declaration'
  )

  //   let wearable = new MuseumPiece(
  //     new GLTFShape('models/museum/.glb'),
  //     {
  //       position: new Vector3(189.2, 19.5, 222),
  //       rotation: Quaternion.Euler(0, 315, 0),
  //     },
  //     'Declaration'
  //   )

  let names = new MuseumPiece(
    new GLTFShape('models/museum/names.glb'),
    {
      position: new Vector3(179.8, 18.5, 230),
      rotation: Quaternion.Euler(0, 45, 0),
    },
    'Names'
  )

  let builder = new MuseumPiece(
    new GLTFShape('models/museum/builder.glb'),
    {
      position: new Vector3(175.2, 18.5, 236.6),
      rotation: Quaternion.Euler(0, 45, 0),
    },
    'Builder'
  )

  let landing = new MuseumPiece(
    new GLTFShape('models/museum/landing.glb'),
    {
      position: new Vector3(167.3, 18.5, 244.95),
      rotation: Quaternion.Euler(0, 45, 0),
    },
    'Landing'
  )

  let state = new MuseumPiece(
    new GLTFShape('models/museum/state.glb'),
    {
      position: new Vector3(167.7, 18.5, 252.8),
      rotation: Quaternion.Euler(0, 135, 0),
    },
    'Estate'
  )

  let parcel = new MuseumPiece(
    new GLTFShape('models/museum/land.glb'),
    {
      position: new Vector3(171, 18.5, 257.7),
      rotation: Quaternion.Euler(0, 135, 0),
    },
    'Parcel'
  )

  let old_logo = new MuseumPiece(
    new GLTFShape('models/museum/old_logo.glb'),
    {
      position: new Vector3(176.7, 18.2, 259.48),
      rotation: Quaternion.Euler(0, 225, 0),
    },
    'Original Logo'
  )

  let new_logo = new MuseumPiece(
    new GLTFShape('models/museum/new_logo.glb'),
    {
      position: new Vector3(182.12, 18.2, 255.17),
      rotation: Quaternion.Euler(0, 225, 0),
    },
    'New Logo'
  )

  let first_auction = new MuseumPiece(
    new GLTFShape('models/museum/first_auction.glb'),
    {
      position: new Vector3(186.7, 18.2, 251.1),
      rotation: Quaternion.Euler(0, 225, 0),
    },
    'First Land Auction'
  )

  let second_auction = new MuseumPiece(
    new GLTFShape('models/museum/second_auction.glb'),
    {
      position: new Vector3(192.9, 18.2, 245),
      rotation: Quaternion.Euler(0, 225, 0),
    },
    'Second Land Auction'
  )

  let community_contest = new MuseumPiece(
    new GLTFShape('models/museum/community_contest.glb'),
    {
      position: new Vector3(198.6, 18.2, 239.9),
      rotation: Quaternion.Euler(0, 225, 0),
    },
    'Community Wearable Contest'
  )

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
