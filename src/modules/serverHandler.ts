import { ArtichokeFloatingTextShape, setTowerText } from './messageboard'

export const sceneMessageBus = new MessageBus()

export let awsServer = 'https://genesis-plaza.s3.us-east-2.amazonaws.com/'
export let fireBaseServer =
  'https://us-central1-genesis-plaza.cloudfunctions.net/app/'

// how often to refresh scene, in seconds
export const refreshInterval: number = 30

// check server for new messageboard messages
export class CheckServer implements ISystem {
  timer: number
  constructor(timer: number) {
    this.timer = timer
  }
  update(dt: number) {
    this.timer -= dt
    if (this.timer < 0) {
      this.timer = refreshInterval
      updateMessageBoards()
    }
  }
}

engine.addSystem(new CheckServer(refreshInterval))

// send new message to server
export async function setNewMessage(location: string, message: string) {
  if (location == 'artichoke') {
    sceneMessageBus.emit('artichokeMessage', { text: message })
  } else if (location == 'tower') {
    sceneMessageBus.emit('towerMessage', { text: message })
    //setTowerText(newText)
  }
  try {
    let url =
      fireBaseServer +
      'addmessage/?location=' +
      location +
      '&message=' +
      message
    log('new message ', url)
    fetch(url, { method: 'POST' })
  } catch {
    log('error sending to firebase server')
  }
}

export async function getLastMessage(location: string): Promise<string> {
  try {
    let url = awsServer + 'messageboards/' + location + '.json'
    let response = await fetch(url).then()
    let json = await response.json()
    return json.messages[json.messages.length - 1]
  } catch {
    log('error fetching from AWS server')
  }
}

// change messages displayed in the plaza
export async function updateMessageBoards() {
  let artMessage = await getLastMessage('artichoke')
  if (artMessage) {
    ArtichokeFloatingTextShape.value = artMessage
  }

  let towerMessage = await getLastMessage('tower')
  if (towerMessage) {
    setTowerText(towerMessage)
  }
}

// ////// UPDATE MESSAGEBOARDS

sceneMessageBus.on('towerMessage', (e) => {
  setTowerText(e.text)
})

sceneMessageBus.on('artichokeMessage', (e) => {
  ArtichokeFloatingTextShape.value = e.text
})
