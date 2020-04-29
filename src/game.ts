import utils from '../node_modules/decentraland-ecs-utils/index'
import { Locations, teleport } from './modules/teleports'
import { setTriggerAreas } from './modules/triggers'
import { Wearable } from './modules/wearables'

//////// HACK TO LOG POSITIONS

const camera = Camera.instance

class CameraTrackSystem implements ISystem {
  update() {
    log(camera.position)
  }
}

engine.addSystem(new CameraTrackSystem())

// AGORA BUILDING

//add agora
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

//add Gallery_action_Moebius
let Gallery_action_Moebius = new Entity()
Gallery_action_Moebius.addComponent(
  new GLTFShape('models/Gallery_action_Moebius.glb')
)
Gallery_action_Moebius.addComponent(
  new Transform({
    rotation: Quaternion.Euler(0, 180, 0),
  })
)
engine.addEntity(Gallery_action_Moebius)

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

//TELEPORTERS

//add Particles
let Particles = new Entity()
Particles.addComponent(new GLTFShape('models/Particles.glb'))
Particles.addComponent(
  new Transform({
    rotation: Quaternion.Euler(0, 180, 0),
  })
)
engine.addEntity(Particles)

//add mole
let mole = new Entity()
mole.addComponent(new GLTFShape('models/mole.glb'))
mole.addComponent(
  new Transform({
    rotation: Quaternion.Euler(0, 180, 0),
  })
)
mole.addComponent(
  new OnPointerDown(
    (e) => {
      teleport(Locations.MOLES)
    },
    {
      hoverText: 'Teleport',
    }
  )
)
engine.addEntity(mole)

// BALLOON

//add balloon
let balloon = new Entity()
balloon.addComponent(new GLTFShape('models/balloon.glb'))
balloon.addComponent(
  new Transform({
    rotation: Quaternion.Euler(0, 180, 0),
  })
)
engine.addEntity(balloon)

// TRAIN

//add stops
let stops = new Entity()
stops.addComponent(new GLTFShape('models/stops.glb'))
stops.addComponent(
  new Transform({
    rotation: Quaternion.Euler(0, 180, 0),
  })
)
engine.addEntity(stops)

//add train
let train = new Entity()
train.addComponent(new GLTFShape('models/train.glb'))
train.addComponent(
  new Transform({
    rotation: Quaternion.Euler(0, 180, 0),
  })
)
engine.addEntity(train)

setTriggerAreas()

//////// WEARABLES

const Eyewear_Raver = new Wearable(
  new GLTFShape('models/wearables/first_floor/A/Eyewear_Raver.glb'),
  {
    position: new Vector3(284, 10.5, 110.4),
    rotation: Quaternion.Euler(0, 60, 0),
  },
  'Eyewear_Raver'
)

const Spysuit_Goggles = new Wearable(
  new GLTFShape('models/wearables/first_floor/A/Spysuit_Goggles.glb'),
  {
    position: new Vector3(283, 10.5, 111.8),
    rotation: Quaternion.Euler(0, 60, 0),
  },
  'Spysuit_Goggles'
)

const Eye_Thingy = new Wearable(
  new GLTFShape('models/wearables/first_floor/A/Eyewear_Raver.glb'),
  {
    position: new Vector3(282, 10.5, 113.1),
    rotation: Quaternion.Euler(0, 60, 0),
  },
  'Eyewear_Raver'
)

const F_Hat_Foam = new Wearable(
  new GLTFShape('models/wearables/first_floor/B/F_Hat_Foam.glb'),
  {
    position: new Vector3(276.5, 10.5, 110.4),
    rotation: Quaternion.Euler(0, 60, 0),
  },
  'F_Hat_Foam'
)

const sunhat = new Wearable(
  new GLTFShape('models/wearables/first_floor/B/sunhat.glb'),
  {
    position: new Vector3(275.5, 10.5, 111.8),
    rotation: Quaternion.Euler(0, 60, 0),
  },
  'sunhat'
)

const MaleHat_DCL = new Wearable(
  new GLTFShape('models/wearables/first_floor/B/MaleHat_DCL.glb'),
  {
    position: new Vector3(274.5, 10.5, 113.1),
    rotation: Quaternion.Euler(0, 60, 0),
  },
  'MaleHat_DCL'
)

const M_Mask_Skull = new Wearable(
  new GLTFShape('models/wearables/first_floor/C/M_Mask_Skull.glb'),
  {
    position: new Vector3(265.9, 10.5, 122.5),
    rotation: Quaternion.Euler(0, 90, 0),
  },
  'M_Mask_Skull'
)

const M_TopHead_Machete = new Wearable(
  new GLTFShape('models/wearables/first_floor/C/M_TopHead_Machete.glb'),
  {
    position: new Vector3(265.5, 10.5, 124.5),
    rotation: Quaternion.Euler(0, 90, 0),
  },
  'M_TopHead_Machete'
)

const M_TopHead_Skull = new Wearable(
  new GLTFShape('models/wearables/first_floor/C/M_TopHead_Skull.glb'),
  {
    position: new Vector3(265.2, 10.5, 126.5),
    rotation: Quaternion.Euler(0, 90, 0),
  },
  'M_TopHead_Skull'
)

const protection_mask_hot_mask = new Wearable(
  new GLTFShape('models/wearables/first_floor/D/protection_mask_hot_mask.glb'),
  {
    position: new Vector3(265.7, 10.5, 131.5),
    rotation: Quaternion.Euler(0, 115, 0),
  },
  'protection_mask_hot_mask'
)

const protection_mask_skull_mask = new Wearable(
  new GLTFShape(
    'models/wearables/first_floor/D/protection_mask_skull_mask.glb'
  ),
  {
    position: new Vector3(266.23, 10.5, 132.73),
    rotation: Quaternion.Euler(0, 115, 0),
  },
  'protection_mask_skull_mask'
)

const protection_mask_african_mask = new Wearable(
  new GLTFShape(
    'models/wearables/first_floor/D/protection_mask_african_mask.glb'
  ),
  {
    position: new Vector3(266.76, 10.5, 133.96),
    rotation: Quaternion.Euler(0, 115, 0),
  },
  'protection_mask_african_mask'
)

const protection_mask_funny_mask = new Wearable(
  new GLTFShape(
    'models/wearables/first_floor/D/protection_mask_funny_mask.glb'
  ),
  {
    position: new Vector3(267.3, 10.5, 135.2),
    rotation: Quaternion.Euler(0, 115, 0),
  },
  'protection_mask_funny_mask'
)

const Eyewear_XmasTree = new Wearable(
  new GLTFShape('models/wearables/first_floor/E/Eyewear_XmasTree.glb'),
  {
    position: new Vector3(270.8, 10.5, 139),
    rotation: Quaternion.Euler(0, 145, 0),
  },
  'Eyewear_XmasTree'
)

const F_Hat_Elf = new Wearable(
  new GLTFShape('models/wearables/first_floor/E/F_Hat_Elf.glb'),
  {
    position: new Vector3(272.3, 10.5, 140.7),
    rotation: Quaternion.Euler(0, 145, 0),
  },
  'F_Hat_Elf'
)

const F_Helmet_LedSuit = new Wearable(
  new GLTFShape('models/wearables/first_floor/E/F_Helmet_LedSuit.glb'),
  {
    position: new Vector3(273.8, 10.5, 141.7),
    rotation: Quaternion.Euler(0, 145, 0),
  },
  'F_Helmet_LedSuit'
)

const Umbrella_Hat = new Wearable(
  new GLTFShape('models/wearables/first_floor/F/Umbrella_Hat.glb'),
  {
    position: new Vector3(286.9, 10.5, 140.9),
    rotation: Quaternion.Euler(0, 180, 0),
  },
  'Umbrella_Hat'
)

const M_Hat_Hat_of_Wonder = new Wearable(
  new GLTFShape('models/wearables/first_floor/F/M_Hat_Hat_of_Wonder.glb'),
  {
    position: new Vector3(288.8, 10.5, 140.9),
    rotation: Quaternion.Euler(0, 180, 0),
  },
  'M_Hat_Hat_of_Wonder'
)

const MaleHat_MANA = new Wearable(
  new GLTFShape('models/wearables/first_floor/F/MaleHat_MANA.glb'),
  {
    position: new Vector3(290.4, 10.5, 140.9),
    rotation: Quaternion.Euler(0, 180, 0),
  },
  'MaleHat_MANA'
)

const Tiara_Bee = new Wearable(
  new GLTFShape('models/wearables/first_floor/G/Tiara_Bee.glb'),
  {
    position: new Vector3(291.4, 10.5, 135.3),
    rotation: Quaternion.Euler(0, 180, 0),
  },
  'Tiara_Bee'
)

const F_Tiara_GreenStone = new Wearable(
  new GLTFShape('models/wearables/first_floor/G/F_Tiara_GreenStone.glb'),
  {
    position: new Vector3(293.26, 10.5, 135.3),
    rotation: Quaternion.Euler(0, 180, 0),
  },
  'F_Tiara_GreenStone'
)

const F_Tiara_LaurelWreath = new Wearable(
  new GLTFShape('models/wearables/first_floor/G/F_Tiara_LaurelWreath.glb'),
  {
    position: new Vector3(294.8, 10.5, 135.5),
    rotation: Quaternion.Euler(0, 180, 0),
  },
  'F_Tiara_LaurelWreath'
)
