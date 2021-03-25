"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const marketData_1 = require("./marketData");
const awsUpload_1 = require("./awsUpload");
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: true }));
// Full URLs examples:
// http://localhost:5001/genesis-plaza/us-central/app/hello-world
// https://us-central1-genesis-plaza.cloudfunctions.net/app/hello-world
let awsBaseURL = 'https://genesis-plaza.s3.us-east-2.amazonaws.com';
/// TEST
app.get('/hello-world', (req, res) => {
    return res.status(200).send('Hello World!');
});
/// MESSAGE BOARD
app.post('/create-board', (req, res) => {
    let location = String(req.query.location);
    let jsonContents = req.body;
    awsUpload_1.uploadMessageBoardJSON(location, jsonContents);
    return res.status(200).send('Created message board');
});
app.post('/addmessage', (req, res) => {
    let location = String(req.query.location);
    let message = String(req.query.message);
    let url = awsBaseURL + '/messageboards/' + location + '.json';
    awsUpload_1.updateMessageJSON(url, message, location);
    return res.status(200).send('updated message board');
});
app.post('/adddetailedmessage', async (req, res) => {
    let location = String(req.body.location);
    let message = String(req.body.message);
    let author = String(req.body.author);
    let portrait = String(req.body.portrait);
    let url = awsBaseURL + '/messageboards/' + location + '.json';
    await awsUpload_1.updateMessageJSON(url, message, location, author, portrait);
    return res.status(200).send('updated message board');
});
/// SEQUENCER
app.get('/sequencer', async (req, res) => {
    let realm = req.query.realm;
    let url = awsBaseURL + '/sequencer/' + realm + '/stones.json';
    let currentSeq = await awsUpload_1.getSeqJSON(url);
    return res.status(200).json({ stones: currentSeq });
});
app.post('/update-sequencer', async (req, res) => {
    let stones = req.body.stones;
    let realm = req.query.realm;
    awsUpload_1.updateSeqJSON(stones, realm);
    return res.status(200).send('Updated Sequencer');
});
/// GENERIC MULTI-PURPOSE VARIABLE
app.get('/event', (req, res) => {
    let value = Number(req.query.value);
    let event = String(req.query.event);
    let pass = req.query.pass;
    if (pass != 'covinchrlz')
        return;
    awsUpload_1.updateEventValue(event, value);
    return res.status(200).send('Updated event data!');
});
/// MARKET DATA
app.post('/update-market', (req, res) => {
    marketData_1.updateMarketData();
    return res.status(200).send('Updated Market Data!');
});
app.post('/update-coins', (req, res) => {
    marketData_1.updateCoinData();
    return res.status(200).send('Updated Coins Data!');
});
// Scheduled task for updating market data every hour
exports.scheduledFunction = functions.pubsub
    .schedule('every 60 minutes')
    .onRun((context) => {
    console.log('This will run every hour');
    marketData_1.updateMarketData();
    return null;
});
exports.app = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map