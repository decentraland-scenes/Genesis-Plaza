import { ArtichokeFloatingTextShape, setTowerText } from './messageboard'
import { updateTradeCentrer } from './marketData'

export const sceneMessageBus = new MessageBus()

export let awsServer = 'https://genesis-plaza.s3.us-east-2.amazonaws.com/'
export let fireBaseServer =
  'https://us-central1-genesis-plaza.cloudfunctions.net/app/'

// how often to refresh scene, in seconds
export const messageRefreshInterval: number = 30

// how often to refresh scene, in seconds  (30 minutes)
export const marketRefreshInterval: number = 1800

// check server for new messageboard messages
export class CheckServer implements ISystem {
  messageTimer: number
  marketTimer: number
  totalMessageTime: number
  totalMarketTime: number
  constructor(messageTimer: number, marketTimer: number) {
    this.totalMessageTime = messageTimer
    this.totalMarketTime = marketTimer
    this.messageTimer = 0
    this.marketTimer = 0
  }
  update(dt: number) {
    this.messageTimer -= dt
    this.marketTimer -= dt
    if (this.messageTimer < 0) {
      this.messageTimer = this.totalMessageTime
      updateMessageBoards()
    }
    if (this.marketTimer < 0) {
      this.marketTimer = this.totalMarketTime
      updateMarketData()
    }
  }
}

engine.addSystem(new CheckServer(messageRefreshInterval, marketRefreshInterval))

//////// SEND NEW MESSAGEBOARD MESSSAGE TO SERVER

export async function setNewMessage(location: string, message: string) {
  if (location == 'artichoke') {
    sceneMessageBus.emit('artichokeMessage', { text: message })
  } else if (location == 'tower') {
    sceneMessageBus.emit('towerMessage', { text: message })
    //setTowerText(newText)
  }
  try {
    let url =
      fireBaseServer +
      'addmessage/?location=' +
      location +
      '&message=' +
      message
    log('new message ', url)
    fetch(url, { method: 'POST' })
  } catch {
    log('error sending to firebase server')
  }
}

// ////// UPDATE MESSAGEBOARDS

// get lastest message
export async function getLastMessage(location: string): Promise<string> {
  try {
    let url = awsServer + 'messageboards/' + location + '.json'
    let response = await fetch(url).then()
    let json = await response.json()
    return json.messages[json.messages.length - 1]
  } catch {
    log('error fetching from AWS server')
  }
}

// change text displayed in the plaza
export async function updateMessageBoards() {
  let artMessage = await getLastMessage('artichoke')
  if (artMessage) {
    ArtichokeFloatingTextShape.value = artMessage
  }

  let towerMessage = await getLastMessage('tower')
  if (towerMessage) {
    setTowerText(towerMessage)
  }
}

///// HANDLE MESSAGEBUS UPDATES

sceneMessageBus.on('towerMessage', (e) => {
  setTowerText(e.text)
})

sceneMessageBus.on('artichokeMessage', (e) => {
  ArtichokeFloatingTextShape.value = e.text
})

//////// TRADE CENTER DATA

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

export type ParcelData = {
  id: string
  name: string
  searchOrderPrice: number
  parcel: { x: number; y: number }
  owner: { address: string }
}

export type CoinData = {
  MANAETH: number
  ETHUSDT: number
  BTCUSDT: number
  MANAUSD: number
}

export type MarketData = {
  coins: CoinData | null
  landSalesYesterday: number
  landSalesWeek: number
  landSalesMonth: number
  cheapestLandYesterday: number
  cheapestLandWeek: number
  cheapestLandMonth: number
  expensiveLandYesterday: number
  expensiveLandWeek: number
  expensiveLandMonth: number
  expensiveEstateYesterday: number
  expensiveEstateWeek: number
  expensiveEstateMonth: number
  totalMANALandAndEstateYesterday: number
  totalMANALandAndEstateWeek: number
  totalMANALandAndEstateMonth: number
  cheapestLandNow: ParcelData | null
  wearableSalesYesterday: number
  wearableSalesWeek: number
  wearableSalesMonth: number
  expensiveWearableYesterday: number
  expensiveWearableWeek: number
  expensiveWearableMonth: number
  totalMANAWearablesYesterday: number
  totalMANAWearablesWeek: number
  totalMANAWearablesMonth: number
  cheapSwankyNow: WearableData | null
  expensiveSwankyWeek: WearableData | null
  cheapEpicNow: WearableData | null
  expensiveEpicWeek: WearableData | null
  cheapLegendaryNow: WearableData | null
  expensiveLegendaryWeek: WearableData | null
  cheapMythicNow: WearableData | null
  expensiveMythicWeek: WearableData | null
}

let marketData: MarketData | null = null

export async function getMarketData(): Promise<MarketData> {
  try {
    let url = awsServer + 'market/marketData.json'
    let response = await fetch(url).then()
    let json = await response.json()
    return json
  } catch {
    log('error fetching from AWS server')
  }
}

export async function updateMarketData() {
  let newMarketData = await getMarketData()
  if (newMarketData == marketData) {
    return
  } else {
    marketData = newMarketData
  }
  log('MARKET DATA: ', marketData)
  updateTradeCentrer(marketData)
}
