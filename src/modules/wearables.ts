import {
  openWearableUI,
  wearableClassic,
  wearableNotForSale,
  openLoadingUI,
  UIDistanceSystem,
} from './ui'

export class Wearable extends Entity {
  wearableName: string
  model: GLTFShape
  id: string
  isDefault: boolean = false
  wearableData: WearableData
  constructor(
    model: GLTFShape,
    transform: TranformConstructorArgs,
    wearableName: string,
    isDefault?: boolean
  ) {
    super()
    engine.addEntity(this)

    this.addComponent(model)
    this.addComponent(new Transform(transform))

    if (isDefault) {
      this.isDefault = true
    }
    this.wearableName = wearableName.toLocaleLowerCase()
    let thisWearable = this

    this.addComponent(
      new OnPointerDown(
        async function () {
          if (thisWearable.isDefault) {
            wearableClassic(thisWearable)
            log(
              'This item is part of the classic collection of wearables. You can find it in your inventory.'
            )
          } else {
            openLoadingUI()
            let info = await getWearableOnSale(wearableName.toLocaleLowerCase())
            if (info.data.nfts.length > 0) {
              thisWearable.wearableData = info.data.nfts[0]
              openWearableUI(thisWearable, info.data.nfts[0])
            } else {
              wearableNotForSale(thisWearable)
              log('no results')
            }
          }
          // openUI1(wearableName, this)
        },
        {
          button: ActionButton.PRIMARY,
          hoverText: 'Info',
        }
      )
    )
  }

  //   public buy(): void {

  //   }
}

export type WearableData = {
  activeOrder: { id: string }
  id: string
  name: string
  owner: { address: string }
  contractAddress: string
  tokenId: string
  image: string
  searchOrderPrice: number
  searchOrderStatus: string
  wearable: {
    bodyShapes: string[]
    category: string
    collection: string
    description: string
    name: string
    rarity: string
    representationId: string
  }
}

async function getWearableOnSale(wearableName: string) {
  let now = String(Math.floor(Date.now() / 1000))
  const query =
    `
	  {
		  nfts(first: 1,  orderBy: searchOrderPrice, orderDirection: asc, where:{ category: wearable, searchText: "` +
    wearableName +
    `", searchOrderStatus:open, searchOrderExpiresAt_gt:` +
    now +
    `
		}) {
			id
		  name
		  image
		  contractAddress
		  tokenId
		  wearable{ name, representationId, collection, description, category, rarity, bodyShapes }
		  searchOrderPrice
		  searchOrderStatus
		  owner{address}
		  activeOrder {
			  id
			}
		  }
	  }`

  log('query: ', query)

  // const variables = { x, y }
  try {
    let response = queryGraph(query)
    log('wearable info: ', await response)
    return response
  } catch (error) {
    log(`Error fetching wearable dat `, error)
    throw error
  }
}

async function queryGraph(query: string) {
  const url = 'https://api.thegraph.com/subgraphs/name/decentraland/marketplace'
  const opts = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  }
  const res = await fetch(url, opts)
  return res.json()
}

export function getWearableURL(wearable: WearableData) {
  return (
    'https://market.decentraland.org/contracts/' +
    wearable.contractAddress +
    '/tokens/' +
    wearable.tokenId
  )
}

export function addWearables() {


  // close UI when walking away
  engine.addSystem(new UIDistanceSystem())

  // FLOOR 1

  const Eyewear_MANA = new Wearable(
    new GLTFShape('models/wearables/first_floor/A/MANA_Eyewear.glb'),
    {
      position: new Vector3(284, 10.5, 110.4),
      rotation: Quaternion.Euler(0, 60, 0),
    },
    'MANA Eyewear'
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
    'Decentraland Hat'
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
    new GLTFShape(
      'models/wearables/first_floor/D/protection_mask_hot_mask.glb'
    ),
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
    'MANA Hat'
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
    new GLTFShape(
      'models/wearables/second_floor/A/creepy_nurse_lower_body.glb'
    ),
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
    new GLTFShape(
      'models/wearables/second_floor/G/F_Earrings_PunkPiercing.glb'
    ),
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
    new GLTFShape(
      'models/wearables/second_floor/J/m_cyber_suit_upper_body.glb'
    ),
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
    new GLTFShape(
      'models/wearables/second_floor/J/mch_fukuzawa_upper_body.glb'
    ),
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
    'Cyberpunk Jacket'
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
    'Razor Blade Jacket'
  )
  razor_blade_upper_body.setParent(rotated7)
}
