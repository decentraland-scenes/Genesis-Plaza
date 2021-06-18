import { getUserAccount } from '@decentraland/EthereumController'
import * as eth from 'eth-connect'
import { getContract, ContractName } from 'decentraland-transactions'
import { createMANAComponent } from '../store/components/mana'
import { createComponents, buy } from '../store/index'
import * as f from '../store/fetch'

import { WearableMenuItem } from './menuItemWearable'
import { CollectionMenuItem } from './menuItemCollection'
import { clickScrollSystem, HorizontalScrollMenu } from './horizontalScrollMenu'

import * as resource from './resources/resources'
import * as sfx from './resources/sounds'
import {
  wearableItemPlaceholder,
  collectionPlaceholder,
} from './menuPlaceholders'
import { AnimatedItem } from './simpleAnimator'
import { loadMoreMenuItem } from './menuItemLoad'
import { CooldownActivated, CooldownSystem } from './cooldown'
import { VerticalScrollMenu } from './verticalScrollMenu'
import { ItemAnimationSystem } from 'src/lobby/simpleAnimator'

// WEARABLES MENU IN WARDROBE
export function createWearablesHorizontalMenu(
  _transform: TranformConstructorArgs,
  _visibleItems: number
): HorizontalScrollMenu {
  let menuRoot = new Entity()
  let wearablesMenu = new HorizontalScrollMenu(
    {
      position: new Vector3(0, 0, 0),
      scale: new Vector3(1, 1, 1),
    },
    1.1,
    _visibleItems,
    resource.menuTopEventsShape,
    resource.wardrobeShape,
    'Wearables'
  )
  menuRoot.addComponent(
    new Transform({
      position: _transform.position,
      rotation: _transform.rotation,
      scale: _transform.scale,
    })
  )
  wearablesMenu.setParent(menuRoot)
  engine.addEntity(menuRoot)

  //placeholder menuItems
  // for (let i = 0; i < vertEventMenu.visibleItemCount; i++){
  for (let i = 0; i < 10; i++) {
    wearablesMenu.addMenuItem(
      new WearableMenuItem(
        {
          scale: new Vector3(1, 1, 1),
        },
        resource.roundedSquareAlpha,
        collectionPlaceholder,
        wearableItemPlaceholder
      )
    )
  }

  wearablesMenu.halveSizeAllExcept(0)

  engine.addSystem(new CooldownSystem())
  engine.addSystem(new ItemAnimationSystem())
  engine.addSystem(new clickScrollSystem())

  return wearablesMenu
}

export function updateWearablesMenu(
  _menu: HorizontalScrollMenu,
  _collection: any
) {
  _menu.updateTitle(_collection.name)

  for (let i = 0; i < _collection.items.length; i++) {
    // only show wearables wich have purchasable copies left
    if (_collection.items[i].available > 0) {
      // while there are still existing cards left in the menu (from previous collection) update those
      if (i < _menu.items.length) {
        log(
          'updateing card ' +
            i +
            ' : ' +
            _collection.items[i].metadata.wearable.name
        )
        _menu.items[i].updateItemInfo(_collection, _collection.items[i])
      }
      //otherwise add new cards to the menu
      else {
        log('adding: ' + _collection.items[i].metadata.wearable.name)
        _menu.addMenuItem(
          new WearableMenuItem(
            {
              scale: new Vector3(1, 1, 1),
            },
            resource.roundedSquareAlpha,
            _collection,
            _collection.items[i]
          )
        )
      }
    }
  }

  if (_collection.items.length < _menu.items.length) {
    removeLastXItems(_menu, _menu.items.length - _collection.items.length)
  }

  _menu.resetScroll()
  _menu.halveSizeAllExcept(0)
}

// COLLECTIONS MENU
export function createCollectionsVerticalMenu(
  _transform: TranformConstructorArgs,
  _wearableMenuRef: HorizontalScrollMenu,
  _visibleItems: number
): VerticalScrollMenu {
  let menuRoot = new Entity()
  let collectionsMenu = new VerticalScrollMenu(
    {
      position: new Vector3(0, 0, 0),
      scale: new Vector3(1, 1, 1),
    },
    0.19,
    _visibleItems,
    resource.menuTopEventsShape,
    resource.wardrobeShape,
    'Events'
  )
  menuRoot.addComponent(
    new Transform({
      position: _transform.position,
      rotation: _transform.rotation,
      scale: _transform.scale,
    })
  )
  collectionsMenu.setParent(menuRoot)
  menuRoot.setParent(_wearableMenuRef)
  engine.addEntity(menuRoot)

  //placeholder menuItems
  // for (let i = 0; i < vertEventMenu.visibleItemCount; i++){
  for (let i = 0; i < 20; i++) {
    collectionsMenu.addMenuItem(
      new CollectionMenuItem(
        {
          scale: new Vector3(1, 1, 1),
        },
        resource.roundedSquareAlpha,
        collectionPlaceholder,
        _wearableMenuRef
      )
    )
  }

  return collectionsMenu
}

export async function updateCollectionsMenu(
  _menu: VerticalScrollMenu,
  _wearableMenuRef: HorizontalScrollMenu,
  _count: number,
  _addLoadMoreButton: boolean
) {
  const { mana, store } = await createComponents()
  const storeContract = getContract(ContractName.CollectionStore, 137)

  //log("MANA: " + eth.fromWei(await mana.balance(), "ether"))

  //const isApproved = await mana.isApproved(storeContract.address)

  //if(isApproved <  +eth.toWei(500, "ether")){
  //await mana.approve(storeContract.address, 1).catch(() => {});

  //}

  const { collections } = await f.storeCollections()
  const fromAddress = await getUserAccount()

  log(collections)
  let cubePosition = -1
  let itemCount = 0
  log('number of Collections: ' + collections.length)

  for (const collection of collections) {
    log('number of items in collection: ' + collection.items.length)

    log('adding: ' + collection.name)
    if (itemCount < _menu.items.length) {
      _menu.items[itemCount].updateItemInfo(collection)
    } else {
      _menu.addMenuItem(
        new CollectionMenuItem(
          {
            scale: new Vector3(1, 1, 1),
          },
          resource.roundedSquareAlpha,
          collection,
          _wearableMenuRef
        )
      )
    }
    itemCount++
  }

  if (itemCount <= _menu.items.length) {
    _menu.removeLastXItems(_menu.items.length - itemCount)
  }
  updateWearablesMenu(_wearableMenuRef, collections[0])
  _menu.resetScroll()
}

export async function fillWearablesMenu(_menu: HorizontalScrollMenu) {
  // let events = await getEvents(10)
  // if (events.length <= 0) {
  //   return
  // }
  // for(let i=0; i < events.length; i++){
  //   _menu.addMenuItem(new EventMenuItem({
  //     scale: new Vector3(2,2,2)
  //   },
  //   new Texture("images/rounded_alpha.png"),
  //   events[i]
  // ))
  // }
}

export function removeLastXItems(_menu: HorizontalScrollMenu, x: number) {
  if (x >= 1) {
    for (let i = 0; i < x; i++) {
      _menu.removeMenuItem(_menu.items.length - 1)
    }
  }
}
