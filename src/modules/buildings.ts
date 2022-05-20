export function addBuildings() {

    // CLOUD LOBBY

  // add lobby platform + teleport beam
  let lobby = new Entity()
  lobby.addComponent(new GLTFShape('models/lobby/lobby_platform.glb'))
  lobby.addComponent(
    new Transform({
      rotation: Quaternion.Euler(0, 180, 0),
    })
  )
  engine.addEntity(lobby)
  
  // AGORA BUILDING

  // add agora
  let agora = new Entity()
  agora.addComponent(new GLTFShape('models/agora.glb'))
  agora.addComponent(
    new Transform({
      rotation: Quaternion.Euler(0, 180, 0),
    })
  )
  engine.addEntity(agora)

  // L' ARTICHOKE

  //add artichoke_building
  let artichoke = new Entity()
  artichoke.addComponent(new GLTFShape('models/artichoke.glb'))
  artichoke.addComponent(
    new Transform({
      rotation: Quaternion.Euler(0, 180, 0),
    })
  )
  engine.addEntity(artichoke)

  // THE HALLWAY (PICTURES FRAMES & NFTs)

  //add hallway
  let hallway = new Entity()
  hallway.addComponent(new GLTFShape('models/hallway.glb'))
  hallway.addComponent(
    new Transform({
      rotation: Quaternion.Euler(0, 180, 0),
    })
  )
  engine.addEntity(hallway)

  // THE MOUNTAINS (TUTORIAL SPACE)

  //add mountains
  let mountains = new Entity()
  mountains.addComponent(new GLTFShape('models/mountains.glb'))
  mountains.addComponent(
    new Transform({
      rotation: Quaternion.Euler(0, 180, 0),
    })
  )
  engine.addEntity(mountains)

  // MOON TOWER

  //add moon_tower_building
  let moon_tower = new Entity()
  moon_tower.addComponent(new GLTFShape('models/moon-tower.glb'))
  moon_tower.addComponent(
    new Transform({
      rotation: Quaternion.Euler(0, 180, 0),
    })
  )
  engine.addEntity(moon_tower)

  //add MoonTower_Action_Cosmos
  let MoonTower_Action_Cosmos = new Entity()
  MoonTower_Action_Cosmos.addComponent(
    new GLTFShape('models/MoonTower_Action_Cosmos.glb')
  )
  MoonTower_Action_Cosmos.addComponent(
    new Transform({
      rotation: Quaternion.Euler(0, 180, 0),
    })
  )
  engine.addEntity(MoonTower_Action_Cosmos)

  //add MoonTower_Action_Moon
  let MoonTower_Action_Moon = new Entity()
  MoonTower_Action_Moon.addComponent(
    new GLTFShape('models/MoonTower_Action_Moon.glb')
  )
  MoonTower_Action_Moon.addComponent(
    new Transform({
      rotation: Quaternion.Euler(0, 180, 0),
    })
  )
  const MoonTower_Action_MoonAnimator = new Animator()
  MoonTower_Action_Moon.addComponent(MoonTower_Action_MoonAnimator)
  let playMoonTower_Action_Moon = new AnimationState(
    'MoonTower_Action_MoonDark.001'
  )
  MoonTower_Action_MoonAnimator.addClip(playMoonTower_Action_Moon)
  playMoonTower_Action_Moon.play()
  engine.addEntity(MoonTower_Action_Moon)

  //add MoonTower_Action_Ringu
  let MoonTower_Action_Ringu = new Entity()
  MoonTower_Action_Ringu.addComponent(
    new GLTFShape('models/MoonTower_Action_Ringu.glb')
  )
  MoonTower_Action_Ringu.addComponent(
    new Transform({
      rotation: Quaternion.Euler(0, 180, 0),
    })
  )
  engine.addEntity(MoonTower_Action_Ringu)

  //add Text_A
  let Text_A = new Entity()
  Text_A.addComponent(new GLTFShape('models/Text_A.glb'))
  Text_A.addComponent(
    new Transform({
      rotation: Quaternion.Euler(0, 180, 0),
    })
  )
  engine.addEntity(Text_A)

  //add Text_B
  let Text_B = new Entity()
  Text_B.addComponent(new GLTFShape('models/Text_B.glb'))
  Text_B.addComponent(
    new Transform({
      rotation: Quaternion.Euler(0, 180, 0),
    })
  )
  engine.addEntity(Text_B)

  //add Text_C
  let Text_C = new Entity()
  Text_C.addComponent(new GLTFShape('models/Text_C.glb'))
  Text_C.addComponent(
    new Transform({
      rotation: Quaternion.Euler(0, 180, 0),
    })
  )
  engine.addEntity(Text_C)

  //add flare
  let flare = new Entity()
  flare.addComponent(new GLTFShape('models/flare.glb'))
  flare.addComponent(
    new Transform({
      rotation: Quaternion.Euler(0, 180, 0),
    })
  )
  engine.addEntity(flare)

  //add TheWhale_Action_Sculpture
  let TheWhale_Action_Sculpture = new Entity()
  TheWhale_Action_Sculpture.addComponent(
    new GLTFShape('models/TheWhale_Action_Sculpture.glb')
  )
  TheWhale_Action_Sculpture.addComponent(
    new Transform({
      rotation: Quaternion.Euler(0, 180, 0),
    })
  )
  engine.addEntity(TheWhale_Action_Sculpture)

  //CORE BUILDING

  //add core_building
  let core_building = new Entity()
  core_building.addComponent(new GLTFShape('models/core_building.glb'))
  core_building.addComponent(
    new Transform({
      rotation: Quaternion.Euler(0, 180, 0),
    })
  )
  engine.addEntity(core_building)

  //add msg_welcome
  let msg_welcome = new Entity()
  msg_welcome.addComponent(new GLTFShape('models/msg_welcome.glb'))
  msg_welcome.addComponent(
    new Transform({
      rotation: Quaternion.Euler(0, 180, 0),
    })
  )
  engine.addEntity(msg_welcome)

  //add core_art
  let core_art = new Entity()
  core_art.addComponent(new GLTFShape('models/core_art.glb'))
  core_art.addComponent(
    new Transform({
      rotation: Quaternion.Euler(0, 180, 0),
    })
  )
  engine.addEntity(core_art)

  // THE GARDEN (CREATORS BUILDING)

  //add garden
  let garden = new Entity()
  garden.addComponent(new GLTFShape('models/garden.glb'))
  garden.addComponent(
    new Transform({
      rotation: Quaternion.Euler(0, 180, 0),
    })
  )
  engine.addEntity(garden)

  //CONFERENCE BUILDING

  //add auditorium
  let auditorium = new Entity()
  auditorium.addComponent(new GLTFShape('models/auditorium.glb'))
  auditorium.addComponent(
    new Transform({
      rotation: Quaternion.Euler(0, 180, 0),
    })
  )
  engine.addEntity(auditorium)

  // SHALE BUILDING

  //add shell_building
  let shell = new Entity()
  shell.addComponent(new GLTFShape('models/shell.glb'))
  shell.addComponent(
    new Transform({
      rotation: Quaternion.Euler(0, 180, 0),
    })
  )
  engine.addEntity(shell)

  //add shoe_prop
  let shoe_prop = new Entity()
  shoe_prop.addComponent(new GLTFShape('models/shoe_prop.glb'))
  shoe_prop.addComponent(
    new Transform({
      rotation: Quaternion.Euler(0, 180, 0),
    })
  )
  engine.addEntity(shoe_prop)

  //add tshirt_prop
  let tshirt_prop = new Entity()
  tshirt_prop.addComponent(new GLTFShape('models/tshirt_prop.glb'))
  tshirt_prop.addComponent(
    new Transform({
      rotation: Quaternion.Euler(0, 180, 0),
    })
  )
  engine.addEntity(tshirt_prop)

  //WHALE BUILDING (WEARABLES NFTs)

  //add whale
  let whale = new Entity()
  whale.addComponent(new GLTFShape('models/whale.glb'))
  whale.addComponent(
    new Transform({
      rotation: Quaternion.Euler(0, 180, 0),
    })
  )
  engine.addEntity(whale)

  // TRADING CENTER

  //add trading_center
  let trading_center = new Entity()
  trading_center.addComponent(new GLTFShape('models/trading_center.glb'))
  trading_center.addComponent(
    new Transform({
      rotation: Quaternion.Euler(0, 180, 0),
    })
  )
  engine.addEntity(trading_center)

  //add trading_land
  let trading_land = new Entity()
  trading_land.addComponent(new GLTFShape('models/trading_land.glb'))
  trading_land.addComponent(
    new Transform({
      rotation: Quaternion.Euler(0, 180, 0),
    })
  )
  engine.addEntity(trading_land)

  //add trading_crypto
  let trading_crypto = new Entity()
  trading_crypto.addComponent(new GLTFShape('models/trading_crypto.glb'))
  trading_crypto.addComponent(
    new Transform({
      rotation: Quaternion.Euler(0, 180, 0),
    })
  )
  engine.addEntity(trading_crypto)

  //add trading_wearables
  let trading_wearables = new Entity()
  trading_wearables.addComponent(new GLTFShape('models/trading_wearables.glb'))
  trading_wearables.addComponent(
    new Transform({
      rotation: Quaternion.Euler(0, 180, 0),
    })
  )
  engine.addEntity(trading_wearables)

  //STREET MESH

  //add street
  let street = new Entity()
  street.addComponent(new GLTFShape('models/street.glb'))
  street.addComponent(
    new Transform({
      rotation: Quaternion.Euler(0, 180, 0),
    })
  )
  engine.addEntity(street)



 //add vogu_pod
 let vogu_pod = new Entity()
 vogu_pod.addComponent(new GLTFShape('models/vogu_pod.glb'))
 vogu_pod.addComponent(
   new Transform({
     rotation: Quaternion.Euler(0, 180, 0),
   })
 )
 engine.addEntity(vogu_pod)

 vogu_pod.addComponent(new OnPointerDown(
	 ()=>{
		 openExternalURL("https://assembly.thevogu.io/ ")
	 },{
		 hoverText: "Visit VOGU site", button: ActionButton.PRIMARY
	 }
 ))


}

//add zepellin
let zepellin = new Entity()
zepellin.addComponent(new GLTFShape('models/zepellin.glb'))
zepellin.addComponent(
  new Transform({
    rotation: Quaternion.Euler(0, 180, 0),
  })
)
engine.addEntity(zepellin)

//add eth logos in bar
let ethLogos = new Entity()
ethLogos.addComponent(new GLTFShape('models/core_building/Eth_Details.glb'))
ethLogos.addComponent(
  new Transform({
    rotation: Quaternion.Euler(0, 180, 0),
  })
)
engine.addEntity(ethLogos)

let ethLogos_02 = new Entity()
ethLogos_02.addComponent(new GLTFShape('models/core_building/Eth_Details_02.glb'))
ethLogos_02.addComponent(
  new Transform({
    rotation: Quaternion.Euler(0, 180, 0),
  })
)
engine.addEntity(ethLogos_02)
