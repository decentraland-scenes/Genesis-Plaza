import { RunEvents, ShowScripts } from './eventScripts'
//import { Music } from './modules/music'

export let showPlaying: number = 0
export let freeMode: boolean = false

export const sceneMessageBus = new MessageBus()

export let awsServer = 'https://genesis-plaza.s3.us-east-2.amazonaws.com/'

export function showPlayingFalse() {
  showPlaying = 0
}

export function showPlayingTrue(show?: number) {
  showPlaying = show ? show : 1
}

export function setFreeMode() {
  if (freeMode) return
  freeMode = true
  showPlaying = 0
  if (RunEvents._instance) {
    RunEvents._instance.stopShow()
  }
  engine.removeSystem(checkServerSystem)
}

export class CheckServer implements ISystem {
  eventTimer: number
  totalEventTimer: number
  eventName: string
  constructor(eventName: string, checkInterval: number) {
    this.eventTimer = 0
    this.totalEventTimer = checkInterval
    this.eventName = eventName
  }
  update(dt: number) {
    if (showPlaying != 0 || freeMode) return

    this.eventTimer += dt

    if (this.eventTimer > this.totalEventTimer) {
      this.eventTimer = 0

      checkEventServer(this.eventName)
    }
  }
}

//function to call the API
export async function checkTime() {
  let url = 'https://worldtimeapi.org/api/timezone/etc/gmt+3'

  try {
    let response = await fetch(url)
    let json = await response.json()
    let toDate = new Date(json.datetime)
    log(toDate)

    let seconds = toDate.getSeconds() * 1000
    //let seconds = (toDate.getMinutes() * 60 + toDate.getSeconds() ) * 1000

    StartShow(1, Date.now() - seconds)

    //return seconds
  } catch (e) {
    log('error getting time data ', e)
  }
}

let checkServerSystem = new CheckServer('bdayRac', 5)

//engine.addSystem(checkServerSystem)

export async function checkEventServer(event: string) {
  try {
    let url = awsServer + 'event/' + event + '.json'
    let response = await fetch(url).then()
    let json = await response.json()

    if (json.value != 0) {
      StartShow(json.value, json.time)
      log('last show played ', json)
    }
  } catch {
    log('error fetching from AWS server')
  }
}

//let music: Music

sceneMessageBus.on('startShow', (e) => {
  if (e.value == 0 || showPlaying == e.value) return
  showPlaying = e.value
  StartShow(e.value, e.time)
})

export function StartShow(index: number, time: number) {
  var dateObject = new Date()
  let currentTime = dateObject.getTime()

  let timeDiff = (currentTime - time) / 1000

  log('show started ', timeDiff, ' seconds ago, show playing: ', showPlaying)

  let show
  switch (index) {
    case 0:
      show = null
      return
      break
    case 1:
      show = ShowScripts.DEFAULT.slice(0)
      break
    case 2:
      show = ShowScripts.RAC.slice(0)
      break
    case 3:
      show = ShowScripts.TEST.slice(0)
      break
  }

  freeMode = false

  if (timeDiff >= show[show.length - 1].time) {
    log('show ended')
    return
  } else {
    log('starting show, ', timeDiff, ' seconds late')

    showPlayingTrue(index)
    //engine.addSystem(new RunEvents(show, timeDiff, index))
    RunEvents.createAndAddToEngine(show, timeDiff)

    sceneMessageBus.emit('startShow', { value: index, time: time })
  }
}
