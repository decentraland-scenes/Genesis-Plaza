


// function signMessage(msg: string) {

//   executeTask(async () => {
//     const convertedMessage = await eth.convertMessageToObject(msg)
//     const { message, signature } = await eth.signMessage(convertedMessage)
//     log({ message, signature })

//     const originalMessageHex = await toHex(msg)
//     const sentMessageHex = await toHex(message)
//     const isEqual = sentMessageHex === originalMessageHex
//     log("Is the message correct?", isEqual)
    
//   })

// }

//signMessage(messageToSign)

export async function getEvents(_count:number) {
  let events: any[] = []
  let url = 'https://events.decentraland.org/api/events/?limit=' + _count.toString() 

  try {
    let response = await fetch(url)
    let json = await response.json()

   // log(json)

    for (let event of json.data) {
     
        events.push(event)
      
      // if (event.live) {
      //   events.push(event)
      // }
    }

   // log(events)
    return events
  } catch (e) {
    log('error getting event data ', e)
  }
}

// export async function rsvpToEvent(_eventID:string, _timeStamp:string) {
//   let url = 'https://events.decentraland.org/api/message'

//   const messageToSign:EthereumController.MessageDict = {
//     "type": "\"attend\"",
//     "timestamp":"\"" + _timeStamp + "\"",
//     "event":  "\"" + _eventID + "\"" ,
//     "attend": "true"
//   }
 
  
//   log("string message to sign : " + messageToSign)

//   //signMessage(messageToSign)

//   //const convertedMessage = await eth.convertMessageToObject(messageToSign)

//   //log("convertedMessage: " + convertedMessage)
//   const { message, signature } = await eth.signMessage(messageToSign)
//   log("signed message and signature: \n "+ message + "\n"+  signature )

//   //const originalMessageHex = await toHex(messageToSign)
//   //const sentMessageHex = await toHex(message)
//   //const isEqual = sentMessageHex === originalMessageHex
//   //log("Is the message correct?", isEqual)

//   let body = JSON.stringify({
//     address: "0x0000000000000000000000000000000000000000",    
//     message: message,
//     signature: signature
   
//   })

//   log('sending req to: ', url)

//   try {
//     let response = await fetch(url, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ message: body }),
//     })
//     let data = await response.json()
//    // log(data)
   
//   }  catch (e) {
//     log('error signing up to event ', e)
//   }
  
// }

export async function getTrendingScenes(_limit:number) {
  let trendingScenes: any[] = []
  let url = 'https://peer.decentraland.org/lambdas/explore/hot-scenes/'

  try {
    let response = await fetch(url)
    let json = await response.json()

    for (let scene of json) {
      //only save scenes with 2+ users
      if(scene.usersTotalCount.toFixed() > 1){
        //log(scene.name + " : " + scene.usersTotalCount)
        if(trendingScenes.length < _limit ){
          trendingScenes.push(scene)
        }
        else{
          break
        }
        
      }
    }
    

    log(json)   
    return trendingScenes
  } catch (e) {
    log('error getting trending scene data ', e)
  }
}



export async function getCurrentTime() {  
  let url = 'https://worldtimeapi.org/api'

  try {
    let response = await fetch(url)
    let json = await response.json()

    log(json) 

    return json
  } catch (e) {
    log('error getting event data ', e)
  }
}

export function getTimeStamp():string{
  var now = new Date()
  //"2021-04-20T12:07:17.471Z"
  let year = now.getUTCFullYear()
  
  let monthNum = now.getUTCMonth() + 1
  let month:string = monthNum.toString()
  if (monthNum < 10){
    month = ("0" + monthNum) 
  }

  let dayNum = now.getUTCDate()  
  let day = dayNum.toString()
  if (dayNum < 10){
    day = "0" + dayNum
  }

  let hourNum = now.getUTCHours()
  let hour = hourNum.toString()
  if(hourNum < 10){
    hour = "0" + hourNum
  }

  let minuteNum = now.getUTCMinutes()
  let minute = minuteNum.toString()
  if(minuteNum < 10){
    minute = "0" + minuteNum
  }

  let secondNum = now.getUTCSeconds()
  let second = secondNum.toString()
  if(secondNum < 10){
    second = "0" + secondNum
  }

  let msNum = now.getUTCSeconds()
  let milliseconds = secondNum.toString()
  if(msNum < 100){
    milliseconds = "0" + msNum
  }
  if(msNum < 10){
    milliseconds = "0" + milliseconds
  }
  



  var utc_timestamp =  year + "-" + month + "-" + day + "T" + hour + ":" + minute + ":" + second + "." + milliseconds + "Z"
      

  log("DATE:NOW: " + utc_timestamp)

  return utc_timestamp
}

