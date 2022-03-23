import {
  ArtichokeFloatingTextShape,
  setTowerText,
  MessageBoards,
  serverChecker,
} from './messageboard'
import { updateTradeCentrer } from './marketData'

export const sceneMessageBus = new MessageBus()

export let awsServer = 'https://genesis-plaza.s3.us-east-2.amazonaws.com/'
export let fireBaseServer =
  'https://us-central1-genesis-plaza.cloudfunctions.net/app/'
//'http://localhost:5001/genesis-plaza/us-central1/app'

// check server for new messageboard messages
export class CheckServer implements ISystem {
  messageTimer: number
  totalMessageTime: number
  eventTimer: number
  totalEventTimer: number
  constructor(messageTimer: number) {
    this.totalMessageTime = messageTimer
    this.messageTimer = 5
    this.eventTimer = 0

    this.totalEventTimer = 2
  }
  update(dt: number) {
    this.messageTimer -= dt
    //this.eventTimer += dt

    if (this.messageTimer < 0) {
      this.messageTimer += this.totalMessageTime
      updateMessageBoards()
    }
    // if (this.eventTimer > this.totalEventTimer) {
    //   this.eventTimer = 0

    //   checkEventServer()
    // }
  }
}

//////// SEND NEW MESSAGEBOARD MESSSAGE TO SERVER

export async function setNewMessage(location: MessageBoards, message: string) {
  try {
    let trimmedMessage: string
    log('location: ', location, 'message: ', message)

    if (location === MessageBoards.ARTICHOKE) {
      trimmedMessage = message.substr(0, 20)
      sceneMessageBus.emit('artichokeMessage', { text: trimmedMessage })
    } else if (location === MessageBoards.TOWER) {
      log('new message from tower')
      trimmedMessage = message.substr(0, 40 - 3)
      sceneMessageBus.emit('towerMessage', { text: trimmedMessage })
      //setTowerText(newText)
    }

    let url =
      fireBaseServer +
      'addmessage/?location=' +
      location +
      '&message=' +
      trimmedMessage
    log('new message ', url)
    fetch(url, { method: 'POST' })

    serverChecker.messageTimer = serverChecker.totalMessageTime
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
  log('checking boards')
  let artMessage = await getLastMessage('artichoke')
  log('setting Artichoke message : ', artMessage)
  if (artMessage) {
    ArtichokeFloatingTextShape.value = artMessage
  }

  let towerMessage = await getLastMessage('tower')
  log('setting Tower message : ', towerMessage)
  if (towerMessage) {
    setTowerText(towerMessage)
  }
}

///// HANDLE MESSAGEBUS UPDATES

///// EVENTS BOARD

// export async function getEvents() {
//   let events: any[] = []
//   let url = 'https://events.decentraland.org/api/events/?limit=5'

//   try {
//     let response = await fetch(url)
//     let json = await response.json()

//     log(json)

//     for (let event of json.data) {
//       if (event.live) {
//         events.push(event)
//       }
//     }

//     log(events)
//     return events
//   } catch (e) {
//     log('error getting event data ', e)
//   }
// }

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
  parcel: { x: number; y: number; tokenId: string }
  owner: { address: string }
}

export type CoinData = {
  MANAETH: number
  ETHUSDT: number
  BTCUSDT: number
  MANAUSD: number
}

export type WearableDataMini = {
  name: string
  price: number
  image: string
  rarity: string
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
  expensiveWearableNameYesterday: string
  expensiveWearableNameWeek: string
  expensiveWearableNameMonth: string
  uncommonWearableMonthSales: number
  uncommonWearableMonthMANA: number
  uncommonWearableMonthExpensive: WearableDataMini | null
  rareWearableMonthSales: number
  rareWearableMonthMANA: number
  rareWearableMonthExpensive: WearableDataMini | null
  epicWearableMonthSales: number
  epicWearableMonthMANA: number
  epicWearableMonthExpensive: WearableDataMini | null
  legendaryWearableMonthSales: number
  legendaryWearableMonthMANA: number
  legendaryWearableMonthExpensive: WearableDataMini | null
  mythicWearableMonthSales: number
  mythicWearableMonthMANA: number
  mythicWearableMonthExpensive: WearableDataMini | null
  totalMANAWearablesYesterday: number
  totalMANAWearablesWeek: number
  totalMANAWearablesMonth: number
  cheapRareNow: WearableData | null
  cheapEpicNow: WearableData | null
  cheapLegendaryNow: WearableData | null
  cheapMythicNow: WearableData | null
}

let marketData: MarketData | null = null

export async function updateMarketData() {
  let newMarketData = await getMarketData()
  if (newMarketData === marketData) {
    return
  } else {
    marketData = newMarketData
  }
  log('MARKET DATA: ', marketData)
  updateTradeCentrer(marketData)
}

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
