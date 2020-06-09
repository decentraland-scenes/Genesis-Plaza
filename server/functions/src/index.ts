import * as functions from 'firebase-functions'
import { updateMarketData, updateCoinData } from './marketData'
import { MarketData, CoinData, messageBoard } from './custonTypes'
//import { config } from 'firebase-functions'
export const OpenSea = require('../keys/opensea-key.json')

exports.scheduledFunction = functions.pubsub
  .schedule('every 60 minutes')
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

// http://localhost:5001/genesis-plaza/us-central/app/hello-world
// https://us-central1-genesis-plaza.cloudfunctions.net/app/hello-world

// ENDPOINTS DEFINITION

app.get('/hello-world', (req: any, res: any) => {
  return res.status(200).send('Hello World!')
})

app.post('/update-mural', async (req: any, res: any) => {
  let realm = req.query.realm
  let tiles = req.body.tiles

  updateMuralJSON(tiles, realm)

  return res.status(200).send('Updated Mural')
})

app.get('/mural', async (req: any, res: any) => {
  let realm = req.query.realm
  let url =
    'https://genesis-plaza.s3.us-east-2.amazonaws.com/mural/' +
    realm +
    'tiles.json'
  let currentMural: number[] = await getMuralJSON(url)

  return res.status(200).json({ tiles: currentMural })
})

app.post('/update-sequencer', async (req: any, res: any) => {
  let stones = req.body.stones
  let realm = req.query.realm
  updateSeqJSON(stones, realm)

  return res.status(200).send('Updated Sequencer')
})

app.get('/sequencer', async (req: any, res: any) => {
  let realm = req.query.realm
  let url =
    'https://genesis-plaza.s3.us-east-2.amazonaws.com/sequencer/' +
    realm +
    '/stones.json'

  let currentSeq: number[][] = await getSeqJSON(url)

  return res.status(200).json({ stones: currentSeq })
})

app.get('/update-market', (req: any, res: any) => {
  updateMarketData()
  return res.status(200).send('Updated Market Data!')
})

app.get('/update-coins', (req: any, res: any) => {
  updateCoinData()
  return res.status(200).send('Updated Coins Data!')
})

app.get('/event', (req: any, res: any) => {
  let value = Number(req.query.value)
  updateEventValue(value)
  return res.status(200).send('Updated event data!')
})

app.post('/create', (req: any, res: any) => {
  let location: string = String(req.query.location)
  let jsonContents: messageBoard = req.body

  uploadMessageBoardJSON(location, jsonContents)
  return res.status(200).send('Creaed message board')
})

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

exports.app = functions.https.onRequest(app)

//// AWS

const AWS = require('aws-sdk')

const AWSconfig = require('../keys/aws-key.json')

AWS.config.setPromisesDependency()
AWS.config.update({
  accessKeyId: AWSconfig.AWSAccessKeyId,
  secretAccessKey: AWSconfig.AWSSecretKey,
  region: 'us-east-2',
})

// Message boards

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

export async function updateMessageJSON(
  url: string,
  newMessage: string,
  location: string
) {
  let currentMessages: string[] = await getMessageJSON(url)
  console.log('old messages: ', currentMessages)

  currentMessages.push(newMessage)

  uploadMessageBoardJSON(location, {
    name: location,
    messages: currentMessages,
  })
}

export async function getMessageJSON(url: string): Promise<string[]> {
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

///// Zenquencer

export async function updateSeqJSON(stones: number[][], realm: string) {
  var upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: 'genesis-plaza',
      Key: 'sequencer/' + realm + '/stones.json',
      Body: JSON.stringify({ stones: stones }),
      ACL: 'public-read',
      ContentType: 'application/json; charset=utf-8',
    },
  })

  var promise = upload.promise()

  promise.then(
    function (data: any) {
      console.log('Successfully uploaded mural JSON')
    },
    function (err: any) {
      console.log('There was an error uploading mural json file: ', err.message)
    }
  )
}

export async function getSeqJSON(url: string): Promise<any> {
  try {
    let response = await fetch(url).then()
    let json = await response.json()
    return json.stones
  } catch {
    console.log('error fetching from AWS server')
    console.log('url used: ', url)
    return []
  }
}

// Manually update coin data (process also runs automatically every half hour)

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

///// Pixel Mural  (removed)

export async function updateMuralJSON(tiles: number[], realm: string) {
  var upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: 'genesis-plaza',
      Key: 'mural/' + realm + '/tiles.json',
      Body: JSON.stringify({ tiles: tiles }),
      ACL: 'public-read',
      ContentType: 'application/json; charset=utf-8',
    },
  })

  var promise = upload.promise()

  promise.then(
    function (data: any) {
      console.log('Successfully uploaded mural JSON')
    },
    function (err: any) {
      console.log('There was an error uploading mural json file: ', err.message)
    }
  )
}

export async function getMuralJSON(url: string): Promise<number[]> {
  try {
    let response = await fetch(url).then()
    let json = await response.json()
    return json.tiles
  } catch {
    console.log('error fetching from AWS server')
    console.log('url used: ', url)
    return []
  }
}

/// Generic value
// Generic value used for one-time events, like the SpaceX rocket launch

export async function updateEventValue(value: any) {
  var upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: 'genesis-plaza',
      Key: 'event/event.json',
      Body: JSON.stringify({ value: value }),
      ACL: 'public-read',
      ContentType: 'application/json; charset=utf-8',
    },
  })

  var promise = upload.promise()

  promise.then(
    function (data: any) {
      console.log('Successfully uploaded mural JSON')
    },
    function (err: any) {
      console.log('There was an error uploading mural json file: ', err.message)
    }
  )
}
