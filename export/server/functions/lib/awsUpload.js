"use strict";
//// Setup
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require('aws-sdk');
const AWSconfig = require('../keys/aws-key.json');
AWS.config.setPromisesDependency();
AWS.config.update({
    accessKeyId: AWSconfig.AWSAccessKeyId,
    secretAccessKey: AWSconfig.AWSSecretKey,
    region: 'us-east-2',
});
// Message boards
async function getMessageJSON(url) {
    try {
        let response = await fetch(url).then();
        let json = await response.json();
        return json.messages;
    }
    catch (_a) {
        console.log('error fetching from AWS server');
        console.log('url used: ', url);
        return [];
    }
}
exports.getMessageJSON = getMessageJSON;
async function updateMessageJSON(url, newMessage, location, author, portrait) {
    let currentMessages = await getMessageJSON(url);
    console.log('old messages: ', currentMessages);
    let msg;
    if (author || portrait) {
        msg = JSON.stringify({
            msg: newMessage,
            author: author,
            portrait: portrait,
            date: String(Date.now()),
        });
    }
    else {
        msg = newMessage;
    }
    if (currentMessages && currentMessages.length > 0) {
        currentMessages = currentMessages.slice(Math.max(currentMessages.length - 50, 0));
    }
    else {
        currentMessages = [];
    }
    currentMessages.push(msg);
    await uploadMessageBoardJSON(location, {
        name: location,
        messages: currentMessages,
    });
    return;
}
exports.updateMessageJSON = updateMessageJSON;
async function uploadMessageBoardJSON(location, jsonContents) {
    console.log('uploading json to ', location);
    var upload = new AWS.S3.ManagedUpload({
        params: {
            Bucket: 'genesis-plaza',
            Key: 'messageboards/' + location + '.json',
            Body: JSON.stringify(jsonContents),
            ACL: 'public-read',
            ContentType: 'application/json; charset=utf-8',
        },
    });
    var promise = upload.promise();
    promise.then(function (data) {
        console.log('Successfully uploaded json to ', location);
    }, function (err) {
        console.log('There was an error uploading json file: ', err.message);
    });
    return;
}
exports.uploadMessageBoardJSON = uploadMessageBoardJSON;
///// Sequencer
async function getSeqJSON(url) {
    try {
        let response = await fetch(url).then();
        let json = await response.json();
        return json.stones;
    }
    catch (_a) {
        console.log('error fetching from AWS server');
        console.log('url used: ', url);
        return [];
    }
}
exports.getSeqJSON = getSeqJSON;
async function updateSeqJSON(stones, realm) {
    var upload = new AWS.S3.ManagedUpload({
        params: {
            Bucket: 'genesis-plaza',
            Key: 'sequencer/' + realm + '/stones.json',
            Body: JSON.stringify({ stones: stones }),
            ACL: 'public-read',
            ContentType: 'application/json; charset=utf-8',
        },
    });
    var promise = upload.promise();
    promise.then(function (data) {
        console.log('Successfully uploaded mural JSON');
    }, function (err) {
        console.log('There was an error uploading mural json file: ', err.message);
    });
}
exports.updateSeqJSON = updateSeqJSON;
// Manually update coin data (process also runs automatically every hour)
async function uploadMarketData(jsonContents) {
    console.log('uploading market data');
    var upload = new AWS.S3.ManagedUpload({
        params: {
            Bucket: 'genesis-plaza',
            Key: 'market/marketData.json',
            Body: JSON.stringify(jsonContents),
            ACL: 'public-read',
            ContentType: 'application/json; charset=utf-8',
        },
    });
    var promise = upload.promise();
    promise.then(function (data) {
        console.log('Successfully uploaded market JSON');
    }, function (err) {
        console.log('There was an error uploading market json file: ', err.message);
    });
}
exports.uploadMarketData = uploadMarketData;
async function uploadCoinData(jsonContents) {
    console.log('uploading coin data');
    var upload = new AWS.S3.ManagedUpload({
        params: {
            Bucket: 'genesis-plaza',
            Key: 'market/coinData.json',
            Body: JSON.stringify(jsonContents),
            ACL: 'public-read',
            ContentType: 'application/json; charset=utf-8',
        },
    });
    var promise = upload.promise();
    promise.then(function (data) {
        console.log('Successfully uploaded coin JSON');
    }, function (err) {
        console.log('There was an error uploading coin json file: ', err.message);
    });
}
exports.uploadCoinData = uploadCoinData;
/// Generic value
// Generic value used for one-time events, like the SpaceX rocket launch
async function updateEventValue(event, value) {
    var dateObject = new Date();
    dateObject.getTime();
    var upload = new AWS.S3.ManagedUpload({
        params: {
            Bucket: 'genesis-plaza',
            Key: 'event/' + event + '.json',
            Body: JSON.stringify({ value: value, time: dateObject.getTime() }),
            ACL: 'public-read',
            ContentType: 'application/json; charset=utf-8',
        },
    });
    var promise = upload.promise();
    promise.then(function (data) {
        console.log('Successfully uploaded mural JSON');
    }, function (err) {
        console.log('There was an error uploading mural json file: ', err.message);
    });
}
exports.updateEventValue = updateEventValue;
//# sourceMappingURL=awsUpload.js.map