import * as functions from 'firebase-functions'

const admin = require('firebase-admin')
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors({ origin: true }))

app.get('/hello-world', (req: express.Request, res: express.Response) => {
  return res.status(200).send('Hello World!')
})

exports.app = functions.https.onRequest(app)

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
