//// Setup

import { messageBoard, MarketData, CoinData } from './custonTypes'

const AWS = require('aws-sdk')

const AWSconfig = require('../keys/aws-key.json')

AWS.config.setPromisesDependency()
AWS.config.update({
  accessKeyId: AWSconfig.AWSAccessKeyId,
  secretAccessKey: AWSconfig.AWSSecretKey,
  region: 'us-east-2',
})

export type MessageData = {
  msg: string
  author?: string
  portrait?: string
  date?: string
}

// Message boards

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

export async function updateMessageJSON(
  url: string,
  newMessage: string,
  location: string,
  author?: string,
  portrait?: string
) {
  let currentMessages: string[] = await getMessageJSON(url)
  console.log('old messages: ', currentMessages)

  let msg: string
  if (author || portrait) {
    msg = JSON.stringify({
      msg: newMessage,
      author: author,
      portrait: portrait,
      date: String(Date.now()),
    })
  } else {
    msg = newMessage
  }

  if (currentMessages && currentMessages.length > 0) {
    currentMessages = currentMessages.slice(
      Math.max(currentMessages.length - 50, 0)
    )
  } else {
    currentMessages = []
  }

  currentMessages.push(msg)

  await uploadMessageBoardJSON(location, {
    name: location,
    messages: currentMessages,
  })

  return
}

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

  return
}

///// Sequencer

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

// Manually update coin data (process also runs automatically every hour)

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

/// Generic value
// Generic value used for one-time events, like the SpaceX rocket launch

export async function updateEventValue(event: string, value: number) {
  var dateObject = new Date()
  dateObject.getTime()
  var upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: 'genesis-plaza',
      Key: 'event/' + event + '.json',
      Body: JSON.stringify({ value: value, time: dateObject.getTime() }),
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
