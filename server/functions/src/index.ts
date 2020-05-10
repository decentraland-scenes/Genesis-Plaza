import * as functions from 'firebase-functions'

// exports.scheduledFunction = functions.pubsub
//   .schedule('every day')
//   .onRun((context) => {
//     console.log('This will be once a day')
//     updateMarketData()
//     return null
//   })

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

exports.app = functions.https.onRequest(app)

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

//// AWS
const AWS = require('aws-sdk')

const config = require('../keys/aws-key.json')

AWS.config.setPromisesDependency()
AWS.config.update({
  accessKeyId: config.AWSAccessKeyId,
  secretAccessKey: config.AWSSecretKey,
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

export type MarketData = {
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
  wearableSalesYesterday: number
  wearableSalesWeek: number
  wearableSalesMonth: number
  totalMANAWearablesYesterday: number
  totalMANAWearablesWeek: number
  totalMANAWearablesMonth: number
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
      console.log('There was an error uploading json file: ', err.message)
    }
  )
}

async function updateMarketData() {
  let dataToSend: MarketData = {
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
    wearableSalesYesterday: 0,
    wearableSalesWeek: 0,
    wearableSalesMonth: 0,
    totalMANAWearablesYesterday: 0,
    totalMANAWearablesWeek: 0,
    totalMANAWearablesMonth: 0,
  }

  // cheapest & most expensive wearable x category
  // mana btw eth price

  //   let dateNow =  Math.floor( Date.now() / 1000)

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
      '&limit=2000'
  )
  let weekLandSales = await getOpenSeaEventsJSON(
    'https://api.opensea.io/api/v1/events?only_opensea=false&asset_contract_address=' +
      landContract +
      '&offset=0&event_type=successful&occurred_after=' +
      dateWeekAgo +
      '&limit=2000'
  )
  let monthLandSales = await getOpenSeaEventsJSON(
    'https://api.opensea.io/api/v1/events?only_opensea=false&asset_contract_address=' +
      landContract +
      '&offset=0&event_type=successful&occurred_after=' +
      dateMonthAgo +
      '&limit=2000'
  )

  let yesterdayWearablesSales = await getOpenSeaEventsJSON(
    'https://api.opensea.io/api/v1/events?only_opensea=false&asset_contract_address=' +
      wearablesContract +
      '&offset=0&event_type=successful&occurred_after=' +
      dateYesterday +
      '&limit=4000'
  )
  let weekWearablesSales = await getOpenSeaEventsJSON(
    'https://api.opensea.io/api/v1/events?only_opensea=false&asset_contract_address=' +
      wearablesContract +
      '&offset=0&event_type=successful&occurred_after=' +
      dateWeekAgo +
      '&limit=10000'
  )
  let monthWearablesSales = await getOpenSeaEventsJSON(
    'https://api.opensea.io/api/v1/events?only_opensea=false&asset_contract_address=' +
      wearablesContract +
      '&offset=0&event_type=successful&occurred_after=' +
      dateMonthAgo +
      '&limit=30000'
  )

  //   let yesterdayEstateSales = await getOpenSeaEventsJSON(
  //     'https://api.opensea.io/api/v1/events?only_opensea=false&asset_contract_address=' +
  //       estateContract +
  //       '&offset=0&event_type=successful&occurred_after=' +
  //       dateYesterday +
  //       '&limit=2000'
  //   )
  //   let weekEstateSales = await getOpenSeaEventsJSON(
  //     'https://api.opensea.io/api/v1/events?only_opensea=false&asset_contract_address=' +
  //       estateContract +
  //       '&offset=0&event_type=successful&occurred_after=' +
  //       dateWeekAgo +
  //       '&limit=2000'
  //   )
  //   let monthEstateSales = await getOpenSeaEventsJSON(
  //     'https://api.opensea.io/api/v1/events?only_opensea=false&asset_contract_address=' +
  //       estateContract +
  //       '&offset=0&event_type=successful&occurred_after=' +
  //       dateMonthAgo +
  //       '&limit=2000'
  //   )

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

  /// Estate YESTERDAY

  //   for (let i = 0; i < yesterdayEstateSales.length; i++) {
  //     if (yesterdayEstateSales[i].payment_token.symbol != 'MANA') {
  //       continue
  //     }

  //     dataToSend.totalMANALandAndEstateYesterday += toMana(
  //       yesterdayEstateSales[i].total_price
  //     )

  //     if (
  //       toMana(yesterdayEstateSales[i].total_price) >
  //       dataToSend.expensiveEstateYesterday
  //     ) {
  //       dataToSend.expensiveEstateYesterday = toMana(
  //         yesterdayEstateSales[i].total_price
  //       )
  //     }
  //   }
  //   dataToSend.estateSalesYesterday = yesterdayEstateSales.length

  //   // Estate WEEK
  //   for (let i = 0; i < weekEstateSales.length; i++) {
  //     if (weekEstateSales[i].payment_token.symbol != 'MANA') {
  //       continue
  //     }

  //     dataToSend.totalMANALandAndEstateWeek += toMana(
  //       weekEstateSales[i].total_price
  //     )

  //     if (
  //       toMana(weekEstateSales[i].total_price) > dataToSend.expensiveEstateWeek
  //     ) {
  //       dataToSend.expensiveEstateWeek = toMana(weekEstateSales[i].total_price)
  //     }
  //   }
  //   dataToSend.estateSalesWeek = weekEstateSales.length

  //   /// Estate MONTH

  //   for (let i = 0; i < monthEstateSales.length; i++) {
  //     if (monthEstateSales[i].payment_token.symbol != 'MANA') {
  //       continue
  //     }

  //     dataToSend.totalMANALandAndEstateMonth += toMana(
  //       monthEstateSales[i].total_price
  //     )

  //     if (
  //       toMana(monthEstateSales[i].total_price) > dataToSend.expensiveEstateMonth
  //     ) {
  //       dataToSend.expensiveEstateMonth = toMana(monthEstateSales[i].total_price)
  //     }
  //   }
  //   dataToSend.estateSalesMonth = monthEstateSales.length

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

  // current on sale

  console.log('DATA TO SEND: ', dataToSend)

  uploadMarketData(dataToSend)
}

export async function getOpenSeaEventsJSON(url: string): Promise<any[]> {
  try {
    let response = await fetch(url).then()
    let json = await response.json()
    return json.asset_events
  } catch {
    console.log('error fetching from AWS server')
    console.log('url used: ', url)
    return []
  }
}

export function toMana(longNum: string) {
  let shortNum = parseFloat(longNum) / 1000000000000000000
  let squaredNum = shortNum * Math.pow(10, 4)
  return Math.round(squaredNum) / Math.pow(10, 4)
}
