//import { openUI1 } from './ui'
//import utils from '../node_modules/decentraland-ecs-utils/index'
//import { sceneMessageBus } from './game'

import { openWearableUI, updateOpenUITime } from './ui'

export class Wearable extends Entity {
  wearableName: string
  model: GLTFShape
  buttonAnim = new AnimationState('Action', { looping: false })
  id: string
  isDefault: boolean = false
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

    this.addComponent(new Animator())

    if (isDefault) {
      this.isDefault = true
    }
    this.wearableName = wearableName.toLocaleLowerCase()

    this.addComponent(
      new OnPointerDown(
        async function () {
          if (this.isDefault) {
            log(
              'This item is part of the classic collection of wearables. You can find it in your inventory.'
            )
          }
          // openUI1(wearableName, this)
          let info = await getWearableOnSale(wearableName.toLocaleLowerCase())
          if (info) {
            openWearableUI(info.data.nfts[0])
          } else {
            log('no results')
          }
        },
        { hoverText: 'Info' }
      )
    )
  }

  //   public buy(): void {
  //     let anim = this.getComponent(Animator)

  //     anim.getClip('idle').stop()
  //     anim.getClip('buy').stop()
  //     anim.getClip('new_mask').stop()

  //     anim.getClip('buy').play()

  //     this.addComponentOrReplace(
  //       new utils.Delay(4000, () => {
  //         anim.getClip('buy').stop()
  //         //anim.getClip('new_mask').play()
  //         anim.getClip('idle').play()
  //         // this.addComponentOrReplace(
  //         //   new utils.Delay(1000, () => {
  //         //     anim.getClip('new_mask').stop()
  //         //     this.idleAnim.play()

  //         //   })
  //         // )
  //       })
  //     )
  //   }
}

export type WearableData = {
  activeOrder: { id: string }
  id: string
  name: string
  owner: { address: string }

  tokenId: string
  price: number
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
