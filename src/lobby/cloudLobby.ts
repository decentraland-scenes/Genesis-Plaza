import { TeleportController } from './portalBeam'
import {
  createEventsVerticalMenu,  
  updateEventsMenu,
  createCrowdVerticalMenu,    
  updateCrowdsMenu,
  createBestVerticalMenu,  
  updateBestMenu
} from './menuMainFunctions'

import { lobbyCenter, lobbyHeight, lobbyRadius } from './resources/globals'
import * as resource from './resources/resources'
import * as sfx from './resources/sounds'
import * as utils from '@dcl/ecs-scene-utils'
import { addRepeatTrigger } from 'src/modules/Utils'
import { ANALYTICS_ELEMENTS_IDS, ANALYTICS_ELEMENTS_TYPES, AnalyticsLogLabel } from 'src/aiNpc/Stats/AnalyticsConfig'
import { TrackingElement, trackEnd, trackStart } from 'src/aiNpc/Stats/analyticsCompnents'

const portalControl = new TeleportController()

const menuScale = 1.2
const center = new Vector3(lobbyCenter.x, lobbyHeight + 1.5, lobbyCenter.z)

// SOCIAL LINKS
let discordLink = new Entity()
discordLink.addComponent(
  new Transform({
    position: new Vector3(
      lobbyCenter.x - 1,
      lobbyHeight + 1,
      lobbyCenter.z - 13.32
    ),
  })
)
discordLink.addComponent(resource.discordShape)
discordLink.addComponent(
  new OnPointerDown(
    (e) => {
      openExternalURL('https://dcl.gg/discord')
    },
    { hoverText: 'Join the Discussion', button: ActionButton.POINTER }
  )
)
engine.addEntity(discordLink)

let twitterLink = new Entity()
twitterLink.addComponent(
  new Transform({
    position: new Vector3(
      lobbyCenter.x + 1.38,
      lobbyHeight + 1,
      lobbyCenter.z - 13.3
    ),
  })
)
twitterLink.addComponent(resource.twitterShape)
twitterLink.addComponent(
  new OnPointerDown(
    (e) => {
      openExternalURL('https://twitter.com/decentraland')
    },
    { hoverText: 'Follow Us!', button: ActionButton.POINTER }
  )
)
engine.addEntity(twitterLink)

// WATER VORTEXES
let vortex1 = new Entity()
vortex1.addComponent(
  new Transform({
    position: new Vector3(lobbyCenter.x, lobbyHeight, lobbyCenter.z),
  })
)
vortex1.addComponent(resource.vortex1Shape)
engine.addEntity(vortex1)

let vortex2 = new Entity()
vortex2.addComponent(
  new Transform({
    position: new Vector3(lobbyCenter.x, lobbyHeight, lobbyCenter.z),
  })
)
vortex2.addComponent(resource.vortex2Shape)
engine.addEntity(vortex2)

// VERTICAL MENUS
let rotation = Quaternion.Euler(0, 0, 0)
let posVec = center.add(
  Vector3.Forward()
    .rotate(rotation)
    .multiplyByFloats(lobbyRadius, lobbyRadius, lobbyRadius)
)

// -- Events
let eventsMenu = createEventsVerticalMenu({
  position: posVec,
  rotation: rotation,
  scale: new Vector3(menuScale, menuScale, menuScale),
})
updateEventsMenu(eventsMenu, 10, true)
//fillEventsMenu(eventsMenu)

rotation = Quaternion.Euler(0, 45, 0)
posVec = center.add(
  Vector3.Forward()
    .rotate(rotation)
    .multiplyByFloats(lobbyRadius, lobbyRadius, lobbyRadius)
)

// -- Trending scenes
let crowdsMenu = createCrowdVerticalMenu({
  position: posVec,
  rotation: rotation,
  scale: new Vector3(menuScale, menuScale, menuScale),
})
updateCrowdsMenu(crowdsMenu)
//fillCrowdsMenu(crowdsMenu)

rotation = Quaternion.Euler(0, -45, 0)
posVec = center.add(
  Vector3.Forward()
    .rotate(rotation)
    .multiplyByFloats(lobbyRadius, lobbyRadius, lobbyRadius)
)

// -- Best Places
let bestMenu = createBestVerticalMenu({
  position: posVec,
  rotation: rotation,
  scale: new Vector3(menuScale, menuScale, menuScale),
})
updateBestMenu(bestMenu,15, true)

// -- Classics
// let classicsMenu = createClassicsVerticalMenu({
//   position: posVec,
//   rotation: rotation,
//   scale: new Vector3(menuScale, menuScale, menuScale),
// })
// fillClassicsMenu(classicsMenu)

// -- TriggerBox
let sphereTrigger = new Entity()
sphereTrigger.addComponentOrReplace(new TrackingElement(ANALYTICS_ELEMENTS_TYPES.region, ANALYTICS_ELEMENTS_IDS.cloud))
/*
sphereTrigger.addComponent(new Transform({
  position: center.clone(),
  scale: new Vector3(22,22,22)
}))
sphereTrigger.addComponent(new SphereShape()).withCollisions = false
*/
engine.addEntity(sphereTrigger)
addRepeatTrigger(
  center.clone(),
  new Vector3(30,15,30), 
  ()=> {
    log(AnalyticsLogLabel, "CloudLobby.ts", "RepeatTrigger", "OnEnter")
    trackStart(sphereTrigger.getComponentOrNull(TrackingElement))
  },
  null,
  false,
  ()=> {
    log(AnalyticsLogLabel, "CloudLobby.ts", "RepeatTrigger", "OnExit")
    trackEnd(sphereTrigger.getComponentOrNull(TrackingElement))
  }
)