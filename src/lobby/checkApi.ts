

export async function getEvents() {
  let events: any[] = []
  let url = 'https://events.decentraland.org/api/events/?limit=30'

  try {
    let response = await fetch(url)
    let json = await response.json()

    log(json)

    for (let event of json.data) {
     
        events.push(event)
      
      // if (event.live) {
      //   events.push(event)
      // }
    }

    log(events)
    return events
  } catch (e) {
    log('error getting event data ', e)
  }
}

export async function getTrendingScenes(_limit:number) {
  let trendingScenes: any[] = []
  let url = 'https://peer.decentraland.org/lambdas/explore/hot-scenes/'

  try {
    let response = await fetch(url)
    let json = await response.json()

    for (let scene of json) {
      //only save scenes with 2+ users
      if(scene.usersTotalCount.toFixed() > 1){
        log(scene.name + " : " + scene.usersTotalCount)
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

