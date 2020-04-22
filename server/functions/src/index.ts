import * as functions from 'firebase-functions'

//const admin = require('firebase-admin')
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors({ origin: true }))

export type messageBoard = {
  name: string
  messages: string[]
}

// http://localhost:5001/genesis-plaza/us-central/app/hello-world

app.get('/hello-world', (req: any, res: any) => {
  return res.status(200).send('Hello World!')
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

const config = require('../../keys/aws-key.json')

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

app.post('/addmessage', (req: any, res: any) => {
  let location: string = String(req.query.location)
  let message: string = String(req.query.message)

  let url =
    'https://genesis-plaza.s3.us-east-2.amazonaws.com/messageboards/${location}.json'

  updateJSON(url, message, location)

  return res.status(200).send('updated message board')
})

export async function updateJSON(
  url: string,
  newMessage: string,
  location: string
) {
  let currentJson: messageBoard = await getJSON(url)
  console.log(currentJson)

  currentJson.messages.push(newMessage)

  uploadMessageBoardJSON(location, currentJson)
}

export async function getJSON(url: string): Promise<messageBoard> {
  try {
    let response = await fetch(url).then()

    let json = await response.json()
    return json
  } catch {
    console.log('error fetching from AWS server')
    return { name: '', messages: [] }
  }
}
