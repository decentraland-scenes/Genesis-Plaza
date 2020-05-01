import utils from '../node_modules/decentraland-ecs-utils/index'
import { Locations, Teleport } from './modules/teleports'
import { setTriggerAreas } from './modules/triggers'
import { Wearable } from './modules/wearables'

//////// HACK TO LOG POSITIONS

// const camera = Camera.instance

// class CameraTrackSystem implements ISystem {
//   update() {
//     log(camera.position)
//   }
// }

// engine.addSystem(new CameraTrackSystem())

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

let mole = new Teleport(
  new GLTFShape('models/teleports/click_a_mole.glb'),
  {
    position: new Vector3(10, 0.5, 10),
  },
  Locations.MOLES,
  'Click a Mole',
  'Whack the moles before they hide!',
  'images/example-screenshot.png'
)

let fruit = new Teleport(
  new GLTFShape('models/teleports/fruit_catcher.glb'),
  {
    position: new Vector3(12, 0.5, 10),
  },
  Locations.FRUIT,
  'Fruit Catcher',
  'Catch as many fruits as you can,\navoid bombs! Compete for the\nhighest score!',
  'images/example-screenshot.png'
)

let infinity = new Teleport(
  new GLTFShape('models/teleports/infinity_engine.glb'),
  {
    position: new Vector3(14, 0.5, 10),
  },
  Locations.INFINITY,
  'Infinity Engine',
  'Mine for loot underground, then\ndefend a train from\nbandits.',
  'images/example-screenshot.png'
)

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

// FLOOR 1

const Eyewear_Raver = new Wearable(
  new GLTFShape('models/wearables/first_floor/A/Eyewear_CyborgMonocle.glb'),
  {
    position: new Vector3(284, 10.5, 110.4),
    rotation: Quaternion.Euler(0, 60, 0),
  },
  'Cyborg Monocle (It’s over 9000!!!)'
)

const Spysuit_Goggles = new Wearable(
  new GLTFShape('models/wearables/first_floor/A/Spysuit_Goggles.glb'),
  {
    position: new Vector3(283, 10.5, 111.8),
    rotation: Quaternion.Euler(0, 60, 0),
  },
  'Spy Suit Eyewear'
)

const Eye_Thingy = new Wearable(
  new GLTFShape('models/wearables/first_floor/A/Eyewear_Raver.glb'),
  {
    position: new Vector3(282, 10.5, 113.1),
    rotation: Quaternion.Euler(0, 60, 0),
  },
  'Raver Goggles'
)

const F_Hat_Foam = new Wearable(
  new GLTFShape('models/wearables/first_floor/B/F_Hat_Foam.glb'),
  {
    position: new Vector3(276.5, 10.5, 110.4),
    rotation: Quaternion.Euler(0, 60, 0),
  },
  'Mexican Foam Hat'
)

const sunhat = new Wearable(
  new GLTFShape('models/wearables/first_floor/B/sunhat.glb'),
  {
    position: new Vector3(275.5, 10.5, 111.8),
    rotation: Quaternion.Euler(0, 60, 0),
  },
  'Trendy Sport Hat'
)

const MaleHat_DCL = new Wearable(
  new GLTFShape('models/wearables/first_floor/B/MaleHat_DCL.glb'),
  {
    position: new Vector3(274.5, 10.5, 113.1),
    rotation: Quaternion.Euler(0, 60, 0),
  },
  'MANA Hat'
)

const M_Mask_Skull = new Wearable(
  new GLTFShape('models/wearables/first_floor/C/M_Mask_Skull.glb'),
  {
    position: new Vector3(265.9, 10.5, 122.5),
    rotation: Quaternion.Euler(0, 90, 0),
  },
  'lirio skull'
)

const M_TopHead_Machete = new Wearable(
  new GLTFShape('models/wearables/first_floor/C/M_TopHead_Machete.glb'),
  {
    position: new Vector3(265.5, 10.5, 124.5),
    rotation: Quaternion.Euler(0, 90, 0),
  },
  'Machete Headband'
)

const M_TopHead_Skull = new Wearable(
  new GLTFShape('models/wearables/first_floor/C/M_TopHead_Skull.glb'),
  {
    position: new Vector3(265.2, 10.5, 126.5),
    rotation: Quaternion.Euler(0, 90, 0),
  },
  'Skull Mexican Hat'
)

const protection_mask_hot_mask = new Wearable(
  new GLTFShape('models/wearables/first_floor/D/protection_mask_hot_mask.glb'),
  {
    position: new Vector3(265.7, 10.5, 131.5),
    rotation: Quaternion.Euler(0, 115, 0),
  },
  'Hot Protection Mask'
)

const protection_mask_skull_mask = new Wearable(
  new GLTFShape(
    'models/wearables/first_floor/D/protection_mask_skull_mask.glb'
  ),
  {
    position: new Vector3(266.23, 10.5, 132.73),
    rotation: Quaternion.Euler(0, 115, 0),
  },
  'Skull Protection Mask'
)

const protection_mask_african_mask = new Wearable(
  new GLTFShape(
    'models/wearables/first_floor/D/protection_mask_african_mask.glb'
  ),
  {
    position: new Vector3(266.76, 10.5, 133.96),
    rotation: Quaternion.Euler(0, 115, 0),
  },
  'African Protection Mask'
)

const protection_mask_funny_mask = new Wearable(
  new GLTFShape(
    'models/wearables/first_floor/D/protection_mask_funny_mask.glb'
  ),
  {
    position: new Vector3(267.3, 10.5, 135.2),
    rotation: Quaternion.Euler(0, 115, 0),
  },
  'Graffiti Protection Mask'
)

const Eyewear_XmasTree = new Wearable(
  new GLTFShape('models/wearables/first_floor/E/Eyewear_XmasTree.glb'),
  {
    position: new Vector3(270.8, 10.5, 139),
    rotation: Quaternion.Euler(0, 145, 0),
  },
  'Christmas Tree Eyewear'
)

const F_Hat_Elf = new Wearable(
  new GLTFShape('models/wearables/first_floor/E/F_Hat_Elf.glb'),
  {
    position: new Vector3(272.3, 10.5, 140.7),
    rotation: Quaternion.Euler(0, 145, 0),
  },
  'Christmas Elf Hat'
)

const F_Helmet_LedSuit = new Wearable(
  new GLTFShape('models/wearables/first_floor/E/F_Helmet_LedSuit.glb'),
  {
    position: new Vector3(273.8, 10.5, 141.7),
    rotation: Quaternion.Euler(0, 145, 0),
  },
  'Cyber Xmas Helmet'
)

const Umbrella_Hat = new Wearable(
  new GLTFShape('models/wearables/first_floor/F/Umbrella_Hat.glb'),
  {
    position: new Vector3(286.9, 10.5, 140.9),
    rotation: Quaternion.Euler(0, 180, 0),
  },
  'Umbrella Hat'
)

const M_Hat_Hat_of_Wonder = new Wearable(
  new GLTFShape('models/wearables/first_floor/F/M_Hat_Hat_of_Wonder.glb'),
  {
    position: new Vector3(288.8, 10.5, 140.9),
    rotation: Quaternion.Euler(0, 180, 0),
  },
  'Hat of Wonder'
)

const MaleHat_MANA = new Wearable(
  new GLTFShape('models/wearables/first_floor/F/MaleHat_MANA.glb'),
  {
    position: new Vector3(290.4, 10.5, 140.9),
    rotation: Quaternion.Euler(0, 180, 0),
  },
  'Decentraland Hat'
)

const Tiara_Bee = new Wearable(
  new GLTFShape('models/wearables/first_floor/G/Tiara_Bee.glb'),
  {
    position: new Vector3(291.4, 10.5, 135.3),
    rotation: Quaternion.Euler(0, 180, 0),
  },
  'Bee Headband'
)

const F_Tiara_GreenStone = new Wearable(
  new GLTFShape('models/wearables/first_floor/G/F_Tiara_GreenStone.glb'),
  {
    position: new Vector3(293.26, 10.5, 135.3),
    rotation: Quaternion.Euler(0, 180, 0),
  },
  'F_Tiara_GreenStone',
  true
)

const F_Tiara_LaurelWreath = new Wearable(
  new GLTFShape('models/wearables/first_floor/G/F_Tiara_LaurelWreath.glb'),
  {
    position: new Vector3(294.8, 10.5, 135.5),
    rotation: Quaternion.Euler(0, 180, 0),
  },
  'F_Tiara_LaurelWreath',
  true
)

// FLOOR 2

const spy_suit_lower_body = new Wearable(
  new GLTFShape('models/wearables/second_floor/A/spy_suit_lower_body'),
  {
    position: new Vector3(284, 18.5, 110.4),
    rotation: Quaternion.Euler(0, 60, 0),
  },
  'Spy Suit Pants'
)

const creepy_nurse_lower_body = new Wearable(
  new GLTFShape('models/wearables/second_floor/A/creepy_nurse_lower_body.glb'),
  {
    position: new Vector3(283, 19, 111.8),
    rotation: Quaternion.Euler(0, 60, 0),
  },
  'Creepy Nurse Skirt'
)

const M_IBody_GreyJoggers = new Wearable(
  new GLTFShape('models/wearables/second_floor/A/M_lBody_GreyJoggers.glb'),
  {
    position: new Vector3(282, 18.5, 113.1),
    rotation: Quaternion.Euler(0, 60, 0),
  },
  'Gray Joggers',
  true
)

const m_barbarian_helmet_hat = new Wearable(
  new GLTFShape('models/wearables/second_floor/B/m_barbarian_helmet_hat.glb'),
  {
    position: new Vector3(276.5, 18.5, 110.4),
    rotation: Quaternion.Euler(0, 60, 0),
  },
  'Barbarian Helmet'
)

const cw_fox_top_head = new Wearable(
  new GLTFShape('models/wearables/second_floor/B/cw_fox_top_head.glb'),
  {
    position: new Vector3(275.5, 18.5, 111.8),
    rotation: Quaternion.Euler(0, 60, 0),
  },
  'Fox Hat'
)

const xmas_snowman_helmet = new Wearable(
  new GLTFShape('models/wearables/second_floor/B/xmas_snowman_helmet.glb'),
  {
    position: new Vector3(274.5, 18.5, 113.1),
    rotation: Quaternion.Euler(0, 60, 0),
  },
  'Snowman Head'
)

const asian_fox = new Wearable(
  new GLTFShape('models/wearables/second_floor/C/asian_fox.glb'),
  {
    position: new Vector3(265.9, 18.5, 122.5),
    rotation: Quaternion.Euler(0, 90, 0),
  },
  'Asian Fox Mask'
)

const tropical_mask = new Wearable(
  new GLTFShape('models/wearables/second_floor/C/tropical_mask.glb'),
  {
    position: new Vector3(265.5, 18.5, 124.5),
    rotation: Quaternion.Euler(0, 90, 0),
  },
  'Tropical Mask'
)

const muzzle_mask = new Wearable(
  new GLTFShape('models/wearables/second_floor/C/muzzle_mask.glb'),
  {
    position: new Vector3(265.2, 18.5, 126.5),
    rotation: Quaternion.Euler(0, 90, 0),
  },
  'Muzzle Mask'
)

const razor_blade_feet = new Wearable(
  new GLTFShape('models/wearables/second_floor/D/razor_blade_feet.glb'),
  {
    position: new Vector3(265.7, 18, 131.5),
    rotation: Quaternion.Euler(0, 115, 0),
  },
  'Razor Blade Shoes'
)

const cw_city_sneakers_feet = new Wearable(
  new GLTFShape('models/wearables/second_floor/D/cw_city_sneakers_feet.glb'),
  {
    position: new Vector3(266.4, 18, 133.45),
    rotation: Quaternion.Euler(0, 115, 0),
  },
  'City Decentraland Sneakers'
)

const sad_clown_feet = new Wearable(
  new GLTFShape('models/wearables/second_floor/D/sad_clown_feet.glb'),
  {
    position: new Vector3(267.3, 18, 135.4),
    rotation: Quaternion.Euler(0, 115, 0),
  },
  'Sad Clown Shoes'
)

const M_EyeWear_ThugLife = new Wearable(
  new GLTFShape('models/wearables/second_floor/E/M_EyeWear_ThugLife.glb'),
  {
    position: new Vector3(270.8, 18.5, 139.7),
    rotation: Quaternion.Euler(0, 145, 0),
  },
  'Thug Life',
  true
)

const razor_blade_eyewear = new Wearable(
  new GLTFShape('models/wearables/second_floor/E/razor_blade_eyewear.glb'),
  {
    position: new Vector3(272.3, 18.5, 140.7),
    rotation: Quaternion.Euler(0, 145, 0),
  },
  'Razor Blade Eyewear'
)

const cw_bitcoinglasses_eyewear = new Wearable(
  new GLTFShape(
    'models/wearables/second_floor/E/cw_bitcoinglasses_eyewear.glb'
  ),
  {
    position: new Vector3(273.8, 18.5, 141.7),
    rotation: Quaternion.Euler(0, 145, 0),
  },
  'Bitcoin Eyewear'
)

const M_Feet_BearSlippers = new Wearable(
  new GLTFShape('models/wearables/second_floor/F/M_Feet_BearSlippers.glb'),
  {
    position: new Vector3(286.9, 18, 140.9),
    rotation: Quaternion.Euler(0, 180, 0),
  },
  'Bear Slippers',
  true
)

const M_Feet_ClassiShoes = new Wearable(
  new GLTFShape('models/wearables/second_floor/F/M_Feet_ClassiShoes.glb'),
  {
    position: new Vector3(288.8, 18, 140.9),
    rotation: Quaternion.Euler(0, 180, 0),
  },
  'Classic Shoes',
  true
)

const F_Feet_Shoes_01 = new Wearable(
  new GLTFShape('models/wearables/second_floor/F/F_Feet_Shoes_01.glb'),
  {
    position: new Vector3(290.4, 18, 140.9),
    rotation: Quaternion.Euler(0, 180, 0),
  },
  'Classic shoes',
  true
)

const dcl_mana_earring = new Wearable(
  new GLTFShape('models/wearables/second_floor/G/dcl_mana_earring.glb'),
  {
    position: new Vector3(291.4, 18.5, 135.3),
    rotation: Quaternion.Euler(0, 180, 0),
  },
  'MANA Earrings'
)

const F_Earrings_PunkPiercing = new Wearable(
  new GLTFShape('models/wearables/second_floor/G/F_Earrings_PunkPiercing.glb'),
  {
    position: new Vector3(293.26, 18.5, 135.3),
    rotation: Quaternion.Euler(0, 180, 0),
  },
  'Punk Earings',
  true
)

const F_Earrings_Skull = new Wearable(
  new GLTFShape('models/wearables/second_floor/G/F_Earrings_Skull.glb'),
  {
    position: new Vector3(294.8, 18.5, 135.5),
    rotation: Quaternion.Euler(0, 180, 0),
  },
  'Skull Earrings',
  true
)

const centerPiece = new Entity()
centerPiece.addComponent(
  new Transform({
    position: new Vector3(279.8, 19.6, 127.9),
  })
)
engine.addEntity(centerPiece)

let rotated1 = new Entity()
rotated1.addComponent(
  new Transform({
    rotation: Quaternion.Euler(0, 295, 0),
  })
)
rotated1.setParent(centerPiece)
engine.addEntity(rotated1)

const cw_tuxedo_tshirt_upper_body = new Wearable(
  new GLTFShape(
    'models/wearables/second_floor/J/cw_tuxedo_tshirt_upper_body.glb'
  ),
  {
    position: new Vector3(0, 0, 3.5),
    rotation: Quaternion.Euler(0, 0, 0),
  },
  'Tuxedo T Shirt'
)
cw_tuxedo_tshirt_upper_body.setParent(rotated1)

let rotated2 = new Entity()
rotated2.addComponent(
  new Transform({
    rotation: Quaternion.Euler(0, 244, 0),
  })
)
rotated2.setParent(centerPiece)
engine.addEntity(rotated2)

const mana_hoodie_upper_body = new Wearable(
  new GLTFShape('models/wearables/second_floor/J/mana_hoodie_upper_body.glb'),
  {
    position: new Vector3(0, 0, 3.5),
    rotation: Quaternion.Euler(0, 0, 0),
  },
  'MANA Hoodie'
)
mana_hoodie_upper_body.setParent(rotated2)

let rotated3 = new Entity()
rotated3.addComponent(
  new Transform({
    rotation: Quaternion.Euler(0, 193, 0),
  })
)
rotated3.setParent(centerPiece)
engine.addEntity(rotated3)

const m_cyber_suit_upper_body = new Wearable(
  new GLTFShape('models/wearables/second_floor/J/m_cyber_suit_upper_body.glb'),
  {
    position: new Vector3(0, 0, 3.5),
    rotation: Quaternion.Euler(0, 0, 0),
  },
  'Cyber Suit'
)
m_cyber_suit_upper_body.setParent(rotated3)

let rotated4 = new Entity()
rotated4.addComponent(
  new Transform({
    rotation: Quaternion.Euler(0, 142, 0),
  })
)
rotated4.setParent(centerPiece)
engine.addEntity(rotated4)

const mch_fukuzawa_upper_body = new Wearable(
  new GLTFShape('models/wearables/second_floor/J/mch_fukuzawa_upper_body.glb'),
  {
    position: new Vector3(0, 0, 3.5),
    rotation: Quaternion.Euler(0, 0, 0),
  },
  'Fukuzawa T-Shirt'
)
mch_fukuzawa_upper_body.setParent(rotated4)

let rotated5 = new Entity()
rotated5.addComponent(
  new Transform({
    rotation: Quaternion.Euler(0, 91, 0),
  })
)
rotated5.setParent(centerPiece)
engine.addEntity(rotated5)

const xmas_cyberpunk_upper_body = new Wearable(
  new GLTFShape(
    'models/wearables/second_floor/J/xmas_cyberpunk_upper_body.glb'
  ),
  {
    position: new Vector3(0, 0, 3.5),
    rotation: Quaternion.Euler(0, 0, 0),
  },
  'Cyberpunk Jacket',
  true
)
xmas_cyberpunk_upper_body.setParent(rotated5)

let rotated6 = new Entity()
rotated6.addComponent(
  new Transform({
    rotation: Quaternion.Euler(0, 40, 0),
  })
)
rotated6.setParent(centerPiece)
engine.addEntity(rotated6)

const f_cw_trendy_jacket_upper_body = new Wearable(
  new GLTFShape(
    'models/wearables/second_floor/J/f_cw_trendy_jacket_upper_body.glb'
  ),
  {
    position: new Vector3(0, 0, 3.5),
    rotation: Quaternion.Euler(0, 0, 0),
  },
  'Trendy Sportwear Jacket'
)
f_cw_trendy_jacket_upper_body.setParent(rotated6)

let rotated7 = new Entity()
rotated7.addComponent(
  new Transform({
    rotation: Quaternion.Euler(0, 349, 0),
  })
)
rotated7.setParent(centerPiece)
engine.addEntity(rotated7)

const razor_blade_upper_body = new Wearable(
  new GLTFShape('models/wearables/second_floor/J/razor_blade_upper_body.glb'),
  {
    position: new Vector3(0, 0, 3.5),
    rotation: Quaternion.Euler(0, 0, 0),
  },
  'Razor Blade Jacket',
  true
)
razor_blade_upper_body.setParent(rotated7)
