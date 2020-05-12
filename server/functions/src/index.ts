import * as functions from 'firebase-functions'
//import { config } from 'firebase-functions'
const OpenSea = require('../keys/opensea-key.json')

exports.scheduledFunction = functions.pubsub
  .schedule('every 30 minutes')
  .onRun((context) => {
    console.log('This will run every hour')
    updateMarketData()
    return null
  })

//const admin = require('firebase-admin')
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors({ origin: true }))
require('isomorphic-fetch')

export type messageBoard = {
  name: string
  messages: string[]
}

// http://localhost:5001/genesis-plaza/us-central/app/hello-world
// https://us-central1-genesis-plaza.cloudfunctions.net/app/hello-world

app.get('/hello-world', (req: any, res: any) => {
  return res.status(200).send('Hello World!')
})

app.get('/update-market', (req: any, res: any) => {
  updateMarketData()
  return res.status(200).send('Updated Market Data!')
})

app.get('/update-coins', (req: any, res: any) => {
  updateCoinData()
  return res.status(200).send('Updated Coins Data!')
})

exports.app = functions.https.onRequest(app)

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

//// AWS
const AWS = require('aws-sdk')

const AWSconfig = require('../keys/aws-key.json')

AWS.config.setPromisesDependency()
AWS.config.update({
  accessKeyId: AWSconfig.AWSAccessKeyId,
  secretAccessKey: AWSconfig.AWSSecretKey,
  region: 'us-east-2',
})

app.post('/create', (req: any, res: any) => {
  let location: string = String(req.query.location)
  let jsonContents: messageBoard = req.body

  uploadMessageBoardJSON(location, jsonContents)
  return res.status(200).send('Creaed message board')
})

export async function uploadMessageBoardJSON(
  location: string,
  jsonContents: messageBoard
) {
  console.log('uploading json to ', location)

  var upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: 'genesis-plaza',
      Key: 'messageboards/' + location + '.json',
      Body: JSON.stringify(jsonContents),
      ACL: 'public-read',
      ContentType: 'application/json; charset=utf-8',
    },
  })

  var promise = upload.promise()

  promise.then(
    function (data: any) {
      console.log('Successfully uploaded json to ', location)
    },
    function (err: any) {
      console.log('There was an error uploading json file: ', err.message)
    }
  )
}

//https://us-central1-genesis-plaza.cloudfunctions.net/app/addmessage?location=artichoke&message=mymessage

app.post('/addmessage', (req: any, res: any) => {
  let location: string = String(req.query.location)
  let message: string = String(req.query.message)

  let url =
    'https://genesis-plaza.s3.us-east-2.amazonaws.com/messageboards/' +
    location +
    '.json'

  updateMessageJSON(url, message, location)

  return res.status(200).send('updated message board')
})

export async function updateMessageJSON(
  url: string,
  newMessage: string,
  location: string
) {
  let currentMessages: string[] = await getMeessageJSON(url)
  console.log('old messages: ', currentMessages)

  currentMessages.push(newMessage)

  uploadMessageBoardJSON(location, {
    name: location,
    messages: currentMessages,
  })
}

export async function getMeessageJSON(url: string): Promise<string[]> {
  try {
    let response = await fetch(url).then()
    let json = await response.json()
    return json.messages
  } catch {
    console.log('error fetching from AWS server')
    console.log('url used: ', url)
    return []
  }
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

export enum Direction {
  ASC = 'asc',
  DESC = 'desc',
}

export enum Rarity {
  COMMOMN = '"common"',
  UNCOMMON = '"uncommon"',
  SWANKY = '"swanky"',
  EPIC = '"epic"',
  LEGENDARY = '"legendary"',
  MYTHIC = '"mythic"',
  UNIQUE = '"unique"',
}

export async function uploadMarketData(jsonContents: MarketData) {
  console.log('uploading market data')

  var upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: 'genesis-plaza',
      Key: 'market/marketData.json',
      Body: JSON.stringify(jsonContents),
      ACL: 'public-read',
      ContentType: 'application/json; charset=utf-8',
    },
  })

  var promise = upload.promise()

  promise.then(
    function (data: any) {
      console.log('Successfully uploaded market JSON')
    },
    function (err: any) {
      console.log(
        'There was an error uploading market json file: ',
        err.message
      )
    }
  )
}

export async function uploadCoinData(jsonContents: CoinData) {
  console.log('uploading coin data')

  var upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: 'genesis-plaza',
      Key: 'market/coinData.json',
      Body: JSON.stringify(jsonContents),
      ACL: 'public-read',
      ContentType: 'application/json; charset=utf-8',
    },
  })

  var promise = upload.promise()

  promise.then(
    function (data: any) {
      console.log('Successfully uploaded coin JSON')
    },
    function (err: any) {
      console.log('There was an error uploading coin json file: ', err.message)
    }
  )
}

async function updateMarketData() {
  let dataToSend: MarketData = {
    coins: null,
    landSalesYesterday: 0,
    landSalesWeek: 0,
    landSalesMonth: 0,
    cheapestLandYesterday: 0,
    cheapestLandWeek: 0,
    cheapestLandMonth: 0,
    expensiveLandYesterday: 0,
    expensiveLandWeek: 0,
    expensiveLandMonth: 0,
    expensiveEstateYesterday: 0,
    expensiveEstateWeek: 0,
    expensiveEstateMonth: 0,
    totalMANALandAndEstateYesterday: 0,
    totalMANALandAndEstateWeek: 0,
    totalMANALandAndEstateMonth: 0,
    cheapestLandNow: null,
    wearableSalesYesterday: 0,
    wearableSalesWeek: 0,
    wearableSalesMonth: 0,
    totalMANAWearablesYesterday: 0,
    totalMANAWearablesWeek: 0,
    totalMANAWearablesMonth: 0,
    cheapSwankyNow: null,
    expensiveSwankyWeek: null,
    cheapEpicNow: null,
    expensiveEpicWeek: null,
    cheapLegendaryNow: null,
    expensiveLegendaryWeek: null,
    cheapMythicNow: null,
    expensiveMythicWeek: null,
  }

  // cheapest parcel now
  // largest estate sold?

  let dateNow = Math.floor(Date.now() / 1000)

  let dateYesterday = Math.floor(Date.now() / 1000 - 1 * 24 * 60 * 60)

  let dateWeekAgo = Math.floor(Date.now() / 1000 - 7 * 24 * 60 * 60)

  let dateMonthAgo = Math.floor(Date.now() / 1000 - 30 * 24 * 60 * 60)

  let landContract = '0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d'

  let estateContract = '0x959e104e1a4db6317fa58f8295f586e1a978c297'

  let wearablesContract = '0xc04528c14c8ffd84c7c1fb6719b4a89853035cdd'
  //{  "ExclusiveMasksCollection": "0xc04528c14c8ffd84c7c1fb6719b4a89853035cdd",
  //   "Halloween2019Collection": "0xc1f4b0eea2bd6690930e6c66efd3e197d620b9c2",
  //   "Halloween2019CollectionFactory": "0x07ccfd0fbada4ac3c22ecd38037ca5e5c0ad8cfa",
  //   "Xmas2019Collection": "0xc3af02c0fd486c8e9da5788b915d6fff3f049866",
  //   "MCHCollection": "0xf64dc33a192e056bb5f0e5049356a0498b502d50",
  //   "CommunityContestCollection": "0x32b7495895264ac9d0b12d32afd435453458b1c6",
  //   "DCLLaunchCollection": "0xd35147be6401dcb20811f2104c33de8e97ed6818",
  //   "DCGCollection": "0x3163d2cfee3183f9874e2869942cc62649eeb004"
  //   }

  let yesterdayLandSales = await getOpenSeaEventsJSON(
    'https://api.opensea.io/api/v1/events?only_opensea=false&asset_contract_address=' +
      landContract +
      '&offset=0&event_type=successful&occurred_after=' +
      dateYesterday +
      '&limit=300'
  )
  let weekLandSales = await getOpenSeaEventsJSON(
    'https://api.opensea.io/api/v1/events?only_opensea=false&asset_contract_address=' +
      landContract +
      '&offset=0&event_type=successful&occurred_after=' +
      dateWeekAgo +
      '&limit=300'
  )
  let monthLandSales = await getOpenSeaEventsJSON(
    'https://api.opensea.io/api/v1/events?only_opensea=false&asset_contract_address=' +
      landContract +
      '&offset=0&event_type=successful&occurred_after=' +
      dateMonthAgo +
      '&limit=300'
  )

  let yesterdayWearablesSales = await getOpenSeaEventsJSON(
    'https://api.opensea.io/api/v1/events?only_opensea=false&asset_contract_address=' +
      wearablesContract +
      '&offset=0&event_type=successful&occurred_after=' +
      dateYesterday +
      '&limit=300'
  )
  let weekWearablesSales = await getOpenSeaEventsJSON(
    'https://api.opensea.io/api/v1/events?only_opensea=false&asset_contract_address=' +
      wearablesContract +
      '&offset=0&event_type=successful&occurred_after=' +
      dateWeekAgo +
      '&limit=300'
  )
  let monthWearablesSales = await getOpenSeaEventsJSON(
    'https://api.opensea.io/api/v1/events?only_opensea=false&asset_contract_address=' +
      wearablesContract +
      '&offset=0&event_type=successful&occurred_after=' +
      dateMonthAgo +
      '&limit=300'
  )

  dataToSend.coins = await updateCoinData()

  /// LAND YESTERDAY

  for (let i = 0; i < yesterdayLandSales.length; i++) {
    if (yesterdayLandSales[i].payment_token.symbol != 'MANA') {
      continue
    }
    if (!yesterdayLandSales[i].asset) {
      continue
    }

    dataToSend.totalMANALandAndEstateYesterday += toMana(
      yesterdayLandSales[i].total_price
    )

    if (yesterdayLandSales[i].asset.asset_contract.address == landContract) {
      if (
        toMana(yesterdayLandSales[i].total_price) >
        dataToSend.expensiveLandYesterday
      ) {
        dataToSend.expensiveLandYesterday = toMana(
          yesterdayLandSales[i].total_price
        )
      }
      if (
        toMana(yesterdayLandSales[i].total_price) <
          dataToSend.cheapestLandYesterday ||
        dataToSend.cheapestLandYesterday == 0
      ) {
        dataToSend.cheapestLandYesterday = toMana(
          yesterdayLandSales[i].total_price
        )
      }
    } else if (
      yesterdayLandSales[i].asset.asset_contract.address == estateContract
    ) {
      if (
        toMana(yesterdayLandSales[i].total_price) >
        dataToSend.expensiveEstateYesterday
      ) {
        dataToSend.expensiveEstateYesterday = toMana(
          yesterdayLandSales[i].total_price
        )
      }
    }
  }
  dataToSend.landSalesYesterday = yesterdayLandSales.length

  // LAND WEEK
  for (let i = 0; i < weekLandSales.length; i++) {
    if (weekLandSales[i].payment_token.symbol != 'MANA') {
      continue
    }
    if (!weekLandSales[i].asset) {
      continue
    }

    dataToSend.totalMANALandAndEstateWeek += toMana(
      weekLandSales[i].total_price
    )

    if (weekLandSales[i].asset.asset_contract.address == landContract) {
      if (toMana(weekLandSales[i].total_price) > dataToSend.expensiveLandWeek) {
        dataToSend.expensiveLandWeek = toMana(weekLandSales[i].total_price)
      }
      if (
        toMana(weekLandSales[i].total_price) < dataToSend.cheapestLandWeek ||
        dataToSend.cheapestLandWeek == 0
      ) {
        dataToSend.cheapestLandWeek = toMana(weekLandSales[i].total_price)
      }
    } else if (
      weekLandSales[i].asset.asset_contract.address == estateContract
    ) {
      if (
        toMana(weekLandSales[i].total_price) > dataToSend.expensiveEstateWeek
      ) {
        dataToSend.expensiveEstateWeek = toMana(weekLandSales[i].total_price)
      }
    }
  }
  dataToSend.landSalesWeek = weekLandSales.length

  /// LAND MONTH

  for (let i = 0; i < monthLandSales.length; i++) {
    if (monthLandSales[i].payment_token.symbol != 'MANA') {
      continue
    }
    if (!monthLandSales[i].asset) {
      continue
    }

    dataToSend.totalMANALandAndEstateMonth += toMana(
      monthLandSales[i].total_price
    )

    if (monthLandSales[i].asset.asset_contract.address == landContract) {
      if (
        toMana(monthLandSales[i].total_price) > dataToSend.expensiveLandMonth
      ) {
        dataToSend.expensiveLandMonth = toMana(monthLandSales[i].total_price)
      }
      if (
        toMana(monthLandSales[i].total_price) < dataToSend.cheapestLandMonth ||
        dataToSend.cheapestLandMonth == 0
      ) {
        dataToSend.cheapestLandMonth = toMana(monthLandSales[i].total_price)
      }
    } else if (
      monthLandSales[i].asset.asset_contract.address == estateContract
    ) {
      if (
        toMana(monthLandSales[i].total_price) > dataToSend.expensiveEstateMonth
      ) {
        dataToSend.expensiveEstateMonth = toMana(monthLandSales[i].total_price)
      }
    }
  }
  dataToSend.landSalesMonth = monthLandSales.length

  //// WEARABLES

  // wearables Yesterday
  for (let i = 0; i < yesterdayWearablesSales.length; i++) {
    if (yesterdayWearablesSales[i].payment_token.symbol != 'MANA') {
      continue
    }

    dataToSend.totalMANAWearablesYesterday += toMana(
      yesterdayWearablesSales[i].total_price
    )
  }
  dataToSend.wearableSalesYesterday = yesterdayWearablesSales.length

  // wearables WEEK
  for (let i = 0; i < weekWearablesSales.length; i++) {
    if (weekWearablesSales[i].payment_token.symbol != 'MANA') {
      continue
    }

    dataToSend.totalMANAWearablesWeek += toMana(
      weekWearablesSales[i].total_price
    )
  }
  dataToSend.wearableSalesWeek = weekWearablesSales.length

  /// wearabes MONTH

  for (let i = 0; i < monthWearablesSales.length; i++) {
    if (monthWearablesSales[i].payment_token.symbol != 'MANA') {
      continue
    }

    dataToSend.totalMANAWearablesMonth += toMana(
      monthWearablesSales[i].total_price
    )
  }
  dataToSend.wearableSalesMonth = monthWearablesSales.length

  // wearable sales examples

  dataToSend.cheapSwankyNow = await getMarketplaceWearable(
    Rarity.SWANKY,
    Direction.ASC,
    dateNow
  )
  dataToSend.expensiveSwankyWeek = await getMarketplaceWearable(
    Rarity.SWANKY,
    Direction.DESC,
    dateWeekAgo
  )

  dataToSend.cheapEpicNow = await getMarketplaceWearable(
    Rarity.EPIC,
    Direction.ASC,
    dateNow
  )
  dataToSend.expensiveEpicWeek = await getMarketplaceWearable(
    Rarity.EPIC,
    Direction.DESC,
    dateWeekAgo
  )

  dataToSend.cheapLegendaryNow = await getMarketplaceWearable(
    Rarity.LEGENDARY,
    Direction.ASC,
    dateNow
  )
  dataToSend.expensiveLegendaryWeek = await getMarketplaceWearable(
    Rarity.LEGENDARY,
    Direction.DESC,
    dateWeekAgo
  )

  dataToSend.cheapMythicNow = await getMarketplaceWearable(
    Rarity.MYTHIC,
    Direction.ASC,
    dateNow
  )
  dataToSend.expensiveMythicWeek = await getMarketplaceWearable(
    Rarity.MYTHIC,
    Direction.DESC,
    dateWeekAgo
  )

  dataToSend.cheapestLandNow = await getMarketplaceParcel(dateNow)

  console.log('DATA TO SEND: ', dataToSend)

  uploadMarketData(dataToSend)
}

export async function getOpenSeaEventsJSON(
  url: string,
  alreadyCollected?: [],
  offset?: number
): Promise<any[]> {
  try {
    let finalURL = url
    if (offset) {
      finalURL = url + '&offset=' + offset
    }
    const opts = { headers: { 'X-API-KEY': OpenSea.OpenSeaKey } }

    let response = await fetch(finalURL, opts).then()
    let json = await response.json()
    let fullList = json.asset_events
    if (alreadyCollected) {
      fullList = json.asset_events.concat(alreadyCollected)
    }

    if (json.asset_events.length >= 300) {
      console.log('long response for ', finalURL)

      let offset: number = 0

      offset = fullList.length

      return await getOpenSeaEventsJSON(url, fullList, offset)
    } else {
      return fullList
    }
  } catch {
    console.log('error fetching from OpenSea API')
    console.log('url used: ', url)
    if (alreadyCollected) {
      return alreadyCollected
    }
    return []
  }
}

export async function updateCoinData(): Promise<CoinData> {
  let data: CoinData = {
    MANAETH: 0,
    ETHUSDT: 0,
    BTCUSDT: 0,
    MANAUSD: 0,
  }

  try {
    // Now grab the data (with fix for CORS issue).
    //let proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    let targetUrl = 'https://api.binance.com/api/v1/ticker/allPrices'
    let response = await fetch(targetUrl) //proxyUrl + targetUrl)
    let json = await response.json()

    console.log(json)

    for (var i = 0; i < json.length; i++) {
      switch (json[i].symbol) {
        case 'MANAETH':
          data.MANAETH = parseFloat(json[i].price)
          break
        case 'ETHUSDT':
          data.ETHUSDT = parseFloat(json[i].price)
          break
        case 'BTCUSDT':
          data.BTCUSDT = parseFloat(json[i].price)
          break
      }
    }

    data.MANAUSD = data.MANAETH * data.ETHUSDT

    return data
    //uploadCoinData(dataToSend)
  } catch {
    console.log('Failed to connect to Binance API.')
    return data
  }
}

export async function getMarketplaceWearable(
  rarity: Rarity,
  direction: Direction,
  maxDate: number
) {
  const url = 'https://api.thegraph.com/subgraphs/name/decentraland/marketplace'

  let query =
    `{
	nfts(orderDirection: ` +
    direction +
    `, orderBy: searchOrderPrice, first:1, where:{ searchWearableRarity: ` +
    rarity +
    `, category: wearable, searchOrderStatus:open, searchOrderExpiresAt_gt:` +
    maxDate +
    `
  }) {
	id
    name
     owner{address}
    image
    contractAddress
    tokenId
    searchOrderPrice
	  searchOrderStatus
    wearable{ name, representationId, collection, description, category, rarity, bodyShapes }
	}
}
	`
  const opts = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  }

  try {
    const res = await fetch(url, opts)
    let json = await res.json()
    return json.data.nfts[0]
  } catch (error) {
    console.log(`Error fetching wearable dat `, error)
    throw error
  }
}

export async function getMarketplaceParcel(maxDate: number) {
  const url = 'https://api.thegraph.com/subgraphs/name/decentraland/marketplace'

  let query =
    ` {
			nfts(orderBy: searchOrderPrice, orderDirection: asc,  first: 1, where:{ category: parcel, searchOrderStatus:open, searchOrderExpiresAt_gt: ` +
    maxDate +
    `})
				{
				  id
				   name
			  searchOrderPrice
			  parcel{x,y}
			  owner{address}
		  }
		  }
	  `
  const opts = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  }

  try {
    const res = await fetch(url, opts)
    let json = await res.json()
    return json.data.nfts[0]
  } catch (error) {
    console.log(`Error fetching wearable dat `, error)
    throw error
  }
}

export function toMana(longNum: string) {
  let shortNum = parseFloat(longNum) / 1000000000000000000
  let squaredNum = shortNum * Math.pow(10, 4)
  return Math.round(squaredNum) / Math.pow(10, 4)
}
