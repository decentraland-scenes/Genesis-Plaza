import * as functions from 'firebase-functions'
import { updateMarketData, updateCoinData } from './marketData'
import { messageBoard } from './custonTypes'
import {
  updateSeqJSON,
  getSeqJSON,
  uploadMessageBoardJSON,
  updateEventValue,
  updateMessageJSON,
} from './awsUpload'

var Filter = require('bad-words')
const filter = new Filter()

const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors({ origin: true }))

// Full URLs examples:
// http://localhost:5001/genesis-plaza/us-central/app/hello-world
// https://us-central1-genesis-plaza.cloudfunctions.net/app/hello-world

let awsBaseURL = 'https://genesis-plaza.s3.us-east-2.amazonaws.com'

/// TEST

app.get('/hello-world', (req: any, res: any) => {
  return res.status(200).send('Hello World!')
})

/// MESSAGE BOARD

app.post('/create-board', (req: any, res: any) => {
  let location: string = String(req.query.location)
  let jsonContents: messageBoard = req.body

  uploadMessageBoardJSON(location, jsonContents)
  return res.status(200).send('Created message board')
})

app.post('/addmessage', (req: any, res: any) => {
  let location: string = String(req.query.location)
  let message: string = String(req.query.message)

  let cleanMessage = filter.clean(message)

  let url = awsBaseURL + '/messageboards/' + location + '.json'

  updateMessageJSON(url, cleanMessage, location)

  return res.status(200).send('updated message board')
})

app.post('/adddetailedmessage', async (req: any, res: any) => {
  let location: string = String(req.body.location)
  let message: string = String(req.body.message)
  let author: string = String(req.body.author)
  let portrait: string = String(req.body.portrait)

  let cleanMessage = filter.clean(message)

  let url = awsBaseURL + '/messageboards/' + location + '.json'

  await updateMessageJSON(url, cleanMessage, location, author, portrait)

  return res.status(200).send('updated message board')
})

/// SEQUENCER

app.get('/sequencer', async (req: any, res: any) => {
  let realm = req.query.realm
  let url = awsBaseURL + '/sequencer/' + realm + '/stones.json'

  let currentSeq: number[][] = await getSeqJSON(url)

  return res.status(200).json({ stones: currentSeq })
})

app.post('/update-sequencer', async (req: any, res: any) => {
  let stones = req.body.stones
  let realm = req.query.realm
  updateSeqJSON(stones, realm)

  return res.status(200).send('Updated Sequencer')
})

/// GENERIC MULTI-PURPOSE VARIABLE

app.get('/event', (req: any, res: any) => {
  let value = Number(req.query.value)
  let event = String(req.query.event)

  let pass = req.query.pass

  if (pass != 'covinchrlz') return

  updateEventValue(event, value)
  return res.status(200).send('Updated event data!')
})

/// MARKET DATA

app.post('/update-market', (req: any, res: any) => {
  updateMarketData()
  return res.status(200).send('Updated Market Data!')
})

app.post('/update-coins', (req: any, res: any) => {
  updateCoinData()
  return res.status(200).send('Updated Coins Data!')
})

// Scheduled task for updating market data every hour

exports.scheduledFunction = functions.pubsub
  .schedule('every 60 minutes')
  .onRun((context) => {
    console.log('This will run every hour')
    updateMarketData()
    return null
  })

exports.app = functions.https.onRequest(app)
