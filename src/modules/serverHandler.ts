import {
  ArtichokeFloatingTextShape,
  TowerFloatingTextShape,
} from './messageboard'

export let awsServer = 'https://genesis-plaza.s3.us-east-2.amazonaws.com/'
export let fireBaseServer =
  'https://us-central1-genesis-plaza.cloudfunctions.net/app/'

// how often to refresh scene, in seconds
export const refreshInterval: number = 1

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

export async function setNewMessage(location: string, message: string) {
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

export async function updateMessageBoards() {
  let artMessage = await getLastMessage('artichoke')
  ArtichokeFloatingTextShape.value = artMessage

  let towerMessage = await getLastMessage('tower')
  TowerFloatingTextShape.value = towerMessage
}
