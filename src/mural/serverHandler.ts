import { tileNumbers } from './tile'
import { awsServer, fireBaseServer } from '../modules/serverHandler'
import { playerRealm, setRealm } from '../modules/realmData'
import utils from '../../node_modules/decentraland-ecs-utils/index'

// get lastest mural state
export async function getMural(): Promise<number[]> {
  try {
    if (!playerRealm) {
      await setRealm()
    }
    let url = awsServer + 'mural/' + playerRealm + '/tiles.json'
    let response = await fetch(url).then()
    let json = await response.json()
    return json.tiles
  } catch {
    log('error fetching from AWS server')
  }
}

// update mural
export async function changeMural() {
  if (!playerRealm) {
    await setRealm()
  }
  muralChanger.addComponentOrReplace(
    // Only send request if no more changes come over the next second
    new utils.Delay(1000, async function () {
      try {
        let url = fireBaseServer + 'update-mural?realm=' + playerRealm
        let body = JSON.stringify({ tiles: tileNumbers })
        let headers = {}
        let response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: body,
        })
        return response.json()
      } catch {
        log('error fetching from AWS server')
      }
    })
  )
}

let muralChanger = new Entity()
engine.addEntity(muralChanger)
