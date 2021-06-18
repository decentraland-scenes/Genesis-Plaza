import * as dclTx from 'decentraland-transactions'
import * as eth from 'eth-connect'
import { getProvider, Provider } from '@decentraland/web3-provider'
import { getUserAccount } from '@decentraland/EthereumController'
import { createMANAComponent } from './components/mana'
import { createStoreComponent } from './components/store'
import * as UI from '@dcl/ui-scene-utils'
import * as ECS from '@dcl/ecs-scene-utils'
import { WearableMenuItem } from 'src/modules/ui/menuItemWearable'

export async function createComponents() {
  const provider = await getProvider()
  const requestManager: any = new eth.RequestManager(provider)
  const metaProvider: any = new eth.WebSocketProvider(
    'wss://rpc-mainnet.matic.quiknode.pro'
  )
  const fromAddress = await getUserAccount()
  const metaRequestManager: any = new eth.RequestManager(metaProvider)
  const providers = {
    provider,
    requestManager,
    metaProvider,
    metaRequestManager,
    fromAddress,
  }

  const mana = await createMANAComponent(providers)
  const store = await createStoreComponent(providers)
  return { mana, store }
}

export async function buy(
  collectionId: string,
  blockchainId: string,
  price: string,
  item?: WearableMenuItem
) {
  //  if (!+price) return;
  log(collectionId, blockchainId, price)
  const { mana, store } = await createComponents()
  const storeContract = dclTx.getContract(
    dclTx.ContractName.CollectionStore,
    137
  )
  log('balance')
  const balance = await mana.balance()
  log('allowance')
  const allowance = await mana.isApproved(storeContract.address)
  log(balance, allowance)
  if (+price > +balance) {
    new UI.OkPrompt(
      'Sorry, you do not have enough MANA',
      undefined,
      undefined,
      true
    )
    return
  }

  if (+price > 0 && +price > +allowance) {
    new UI.OptionPrompt(
      'Approve MANA',
      'Authorize the Store contract to operate MANA on your behalf',
      async () => {
        const custom = new UI.CustomPrompt('dark', undefined, 200)
        custom.addText(
          'Please wait.\nThe transaction is being processed',
          0,
          50,
          undefined,
          20
        )
        const loading = new UI.LoadingIcon(undefined, 0, -120)

        await mana.approve(storeContract.address).catch(() => {})
        await delay(1000)
        custom.hide()
        loading.hide()
        buy(collectionId, blockchainId, price, item ? item : undefined)
        return
      },
      async () => {
        await delay(200)
        log('reject, new prompt')
        new UI.OkPrompt(
          'You need to authorize the Store contract to be able to buy this item',
          undefined,
          undefined,
          true
        )
      },
      'Authorize',
      'Reject',
      true
    )
    return
  }
  if (+price === 0) {
    new UI.OkPrompt(
      `You are about to get an item for free`,
      async () => {
        const custom = new UI.CustomPrompt('dark', undefined, 200)
        custom.addText(
          'Please wait.\nThe transaction is being processed',
          0,
          50,
          undefined,
          20
        )
        const loading = new UI.LoadingIcon(undefined, 0, -120)

        const res = await store.buy(collectionId, blockchainId, price)

        custom.hide()
        loading.hide()
        log(res)
        if (res == true) {
          new UI.OkPrompt(
            'Purchased succeed!\nYou will need to refresh the page to see the wearable in your backpack.',
            undefined,
            undefined,
            true
          )
          item?.boughtOne()
        } else {
          new UI.OkPrompt(
            'Purchased failed.\nPlease try again.',
            undefined,
            undefined,
            true
          )
        }
      },
      undefined,
      true
    )
  } else {
    new UI.OkPrompt(
      `You are about to buy an item for ${eth.fromWei(price, 'ether')} MANA`,
      async () => {
        const custom = new UI.CustomPrompt('dark', undefined, 200)
        custom.addText(
          'Please wait.\nThe transaction is being processed',
          0,
          50,
          undefined,
          20
        )
        const loading = new UI.LoadingIcon(undefined, 0, -120)

        const res = await store.buy(collectionId, blockchainId, price)

        custom.hide()
        loading.hide()

        log(res)
        if (res == true) {
          new UI.OkPrompt(
            'Purchased succeed! \nYou will need to refresh the page to see the wearable in your backpack.',
            undefined,
            undefined,
            true
          )
          item?.boughtOne()
        } else {
          new UI.OkPrompt(
            'Purchased failed.\nPlease try again.',
            undefined,
            undefined,
            true
          )
        }
      },
      undefined,
      true
    )
  }

  return {
    balance: eth.fromWei(balance, 'ether'),
    allowance: eth.fromWei(allowance, 'ether'),
  }
}

export type Providers = {
  provider: Provider
  requestManager: eth.RequestManager
  metaProvider: Provider
  metaRequestManager: eth.RequestManager
  fromAddress: string
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const ent = new Entity()
    engine.addEntity(ent)
    ent.addComponent(
      new ECS.Delay(ms, () => {
        resolve()
        engine.removeEntity(ent)
      })
    )
  })
}
