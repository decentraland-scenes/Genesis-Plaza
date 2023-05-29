import { Utils } from "cannon"
import { ANALYTICS_ELEMENTS_IDS, ANALYTICS_ELEMENTS_TYPES, AnalyticsLogLabel } from "./aiNpc/Stats/AnalyticsConfig"
import { TrackingElement, trackEnd, trackStart } from "./aiNpc/Stats/analyticsCompnents"
import * as utils from '@dcl/ecs-scene-utils'


const agoraAnalyticsTrigger = new Entity()

const agoraAnalyticsTriggerPosition = new Vector3(40, 1, 260)
agoraAnalyticsTrigger.addComponent(new Transform({position: agoraAnalyticsTriggerPosition}))

const agoraAnalyticsTriggerScale = new Vector3(50, 30, 50)
let agoraTriggerBox = new utils.TriggerBoxShape(agoraAnalyticsTriggerScale)

agoraAnalyticsTrigger.addComponentOrReplace(new TrackingElement(ANALYTICS_ELEMENTS_TYPES.region, ANALYTICS_ELEMENTS_IDS.agora))

agoraAnalyticsTrigger.addComponent(
    new utils.TriggerComponent(
        agoraTriggerBox, 
      {
        onCameraEnter : () => {
            log(AnalyticsLogLabel, "index.ts", "agora_Region", "onEnter")
            trackStart(agoraAnalyticsTrigger.getComponentOrNull(TrackingElement))
        },
        onCameraExit : () => {
            log(AnalyticsLogLabel, "index.ts", "agora_Region", "onExit")
        	trackEnd(agoraAnalyticsTrigger.getComponentOrNull(TrackingElement))
        }
      }
    )
)
engine.addEntity(agoraAnalyticsTrigger)



const artichokeAnalyticsTrigger = new Entity()

const artichokeAnalyticsTriggerPosition = new Vector3(51, 1, 40)
artichokeAnalyticsTrigger.addComponent(new Transform({position: artichokeAnalyticsTriggerPosition}))

const artichokeAnalyticsTriggerScale = new Vector3(50, 30, 47)
let artichokeTriggerBox = new utils.TriggerBoxShape(artichokeAnalyticsTriggerScale)

artichokeAnalyticsTrigger.addComponentOrReplace(new TrackingElement(ANALYTICS_ELEMENTS_TYPES.region, ANALYTICS_ELEMENTS_IDS.artichoke))

artichokeAnalyticsTrigger.addComponent(
    new utils.TriggerComponent(
        artichokeTriggerBox, 
      {
        onCameraEnter : () => {
            log(AnalyticsLogLabel, "index.ts", "artichoke_Region", "onEnter")
            trackStart(artichokeAnalyticsTrigger.getComponentOrNull(TrackingElement))
        },
        onCameraExit : () => {
            log(AnalyticsLogLabel, "index.ts", "artichoke_Region", "onExit")
        	trackEnd(artichokeAnalyticsTrigger.getComponentOrNull(TrackingElement))
        }
      }
    )
)
engine.addEntity(artichokeAnalyticsTrigger)



const hallwayAnalyticsTrigger = new Entity()

const hallwayAnalyticsTriggerPosition = new Vector3(108, 1, 118)
hallwayAnalyticsTrigger.addComponent(new Transform({position: hallwayAnalyticsTriggerPosition}))

const hallwayAnalyticsTriggerScale = new Vector3(50, 30, 47)
let hallwayTriggerBox = new utils.TriggerBoxShape(hallwayAnalyticsTriggerScale)

hallwayAnalyticsTrigger.addComponentOrReplace(new TrackingElement(ANALYTICS_ELEMENTS_TYPES.region, ANALYTICS_ELEMENTS_IDS.hallway))

hallwayAnalyticsTrigger.addComponent(
    new utils.TriggerComponent(
        hallwayTriggerBox, 
      {
        onCameraEnter : () => {
            log(AnalyticsLogLabel, "index.ts", "hallway_Region", "onEnter")
            trackStart(hallwayAnalyticsTrigger.getComponentOrNull(TrackingElement))
        },
        onCameraExit : () => {
            log(AnalyticsLogLabel, "index.ts", "hallway_Region", "onExit")
        	trackEnd(hallwayAnalyticsTrigger.getComponentOrNull(TrackingElement))
        }
      }
    )
)
engine.addEntity(hallwayAnalyticsTrigger)



const mountainsAnalyticsTrigger = new Entity()

const mountainsAnalyticsTriggerPosition = new Vector3(78, 1, 184)
mountainsAnalyticsTrigger.addComponent(new Transform({position: mountainsAnalyticsTriggerPosition}))

const mountainsAnalyticsTriggerScale = new Vector3(50, 30, 50)
let mountainsTriggerBox = new utils.TriggerBoxShape(mountainsAnalyticsTriggerScale)

mountainsAnalyticsTrigger.addComponentOrReplace(new TrackingElement(ANALYTICS_ELEMENTS_TYPES.region, ANALYTICS_ELEMENTS_IDS.mountains))

mountainsAnalyticsTrigger.addComponent(
    new utils.TriggerComponent(
        mountainsTriggerBox, 
      {
        onCameraEnter : () => {
            log(AnalyticsLogLabel, "index.ts", "mountains_Region", "onEnter")
            trackStart(mountainsAnalyticsTrigger.getComponentOrNull(TrackingElement))
        },
        onCameraExit : () => {
            log(AnalyticsLogLabel, "index.ts", "mountains_Region", "onExit")
        	trackEnd(mountainsAnalyticsTrigger.getComponentOrNull(TrackingElement))
        }
      }
    )
)
engine.addEntity(mountainsAnalyticsTrigger)



const whaleBuildingAnalyticsTrigger = new Entity()

const whaleBuildingAnalyticsTriggerPosition = new Vector3(159, 1, 254)
whaleBuildingAnalyticsTrigger.addComponent(new Transform({position: whaleBuildingAnalyticsTriggerPosition}))

const whaleBuildingAnalyticsTriggerScale = new Vector3(100, 60, 60)
let whaleBuildingTriggerBox = new utils.TriggerBoxShape(whaleBuildingAnalyticsTriggerScale)

whaleBuildingAnalyticsTrigger.addComponentOrReplace(new TrackingElement(ANALYTICS_ELEMENTS_TYPES.region, ANALYTICS_ELEMENTS_IDS.whaleBuilding))

whaleBuildingAnalyticsTrigger.addComponent(
    new utils.TriggerComponent(
        whaleBuildingTriggerBox, 
      {
        onCameraEnter : () => {
            log(AnalyticsLogLabel, "index.ts", "whale_Region", "onEnter")
            trackStart(whaleBuildingAnalyticsTrigger.getComponentOrNull(TrackingElement))
        },
        onCameraExit : () => {
            log(AnalyticsLogLabel, "index.ts", "whale_Region", "onExit")
        	trackEnd(whaleBuildingAnalyticsTrigger.getComponentOrNull(TrackingElement))
        }
      }
    )
)
engine.addEntity(whaleBuildingAnalyticsTrigger)



const moonTowerAnalyticsTrigger = new Entity()

const moonTowerAnalyticsTriggerPosition = new Vector3(48, 1, 116)
moonTowerAnalyticsTrigger.addComponent(new Transform({position: moonTowerAnalyticsTriggerPosition}))

const moonTowerAnalyticsTriggerScale = new Vector3(50, 30, 47)
let moonTowerTriggerBox = new utils.TriggerBoxShape(moonTowerAnalyticsTriggerScale)

moonTowerAnalyticsTrigger.addComponentOrReplace(new TrackingElement(ANALYTICS_ELEMENTS_TYPES.region, ANALYTICS_ELEMENTS_IDS.moonTower))

moonTowerAnalyticsTrigger.addComponent(
    new utils.TriggerComponent(
        moonTowerTriggerBox, 
      {
        onCameraEnter : () => {
            log(AnalyticsLogLabel, "index.ts", "moonTower_Region", "onEnter")
            trackStart(moonTowerAnalyticsTrigger.getComponentOrNull(TrackingElement))
        },
        onCameraExit : () => {
            log(AnalyticsLogLabel, "index.ts", "moonTower_Region", "onExit")
        	trackEnd(moonTowerAnalyticsTrigger.getComponentOrNull(TrackingElement))
        }
      }
    )
)
engine.addEntity(moonTowerAnalyticsTrigger)



const gardenAnalyticsTrigger = new Entity()

const gardenAnalyticsTriggerPosition = new Vector3(112, 1, 34)
gardenAnalyticsTrigger.addComponent(new Transform({position: gardenAnalyticsTriggerPosition}))

const gardenAnalyticsTriggerScale = new Vector3(50, 30, 47)
let gardenTriggerBox = new utils.TriggerBoxShape(gardenAnalyticsTriggerScale)

gardenAnalyticsTrigger.addComponentOrReplace(new TrackingElement(ANALYTICS_ELEMENTS_TYPES.region, ANALYTICS_ELEMENTS_IDS.garden))

gardenAnalyticsTrigger.addComponent(
    new utils.TriggerComponent(
        gardenTriggerBox, 
      {
        onCameraEnter : () => {
            log(AnalyticsLogLabel, "index.ts", "garden_Region", "onEnter")
            trackStart(gardenAnalyticsTrigger.getComponentOrNull(TrackingElement))
        },
        onCameraExit : () => {
            log(AnalyticsLogLabel, "index.ts", "garden_Region", "onExit")
        	trackEnd(gardenAnalyticsTrigger.getComponentOrNull(TrackingElement))
        }
      }
    )
)
engine.addEntity(gardenAnalyticsTrigger)



const auditoriumAnalyticsTrigger = new Entity()

const auditoriumAnalyticsTriggerPosition = new Vector3(271, 1, 256)
auditoriumAnalyticsTrigger.addComponent(new Transform({position: auditoriumAnalyticsTriggerPosition}))

const auditoriumAnalyticsTriggerScale = new Vector3(50, 30, 47)
let auditoriumTriggerBox = new utils.TriggerBoxShape(auditoriumAnalyticsTriggerScale)

auditoriumAnalyticsTrigger.addComponentOrReplace(new TrackingElement(ANALYTICS_ELEMENTS_TYPES.region, ANALYTICS_ELEMENTS_IDS.auditorium))

auditoriumAnalyticsTrigger.addComponent(
    new utils.TriggerComponent(
        auditoriumTriggerBox, 
      {
        onCameraEnter : () => {
            log(AnalyticsLogLabel, "index.ts", "auditorium_Region", "onEnter")
            trackStart(auditoriumAnalyticsTrigger.getComponentOrNull(TrackingElement))
        },
        onCameraExit : () => {
            log(AnalyticsLogLabel, "index.ts", "auditorium_Region", "onExit")
        	trackEnd(auditoriumAnalyticsTrigger.getComponentOrNull(TrackingElement))
        }
      }
    )
)
engine.addEntity(auditoriumAnalyticsTrigger)



const shellAnalyticsTrigger = new Entity()

const shellAnalyticsTriggerPosition = new Vector3(275, 1, 128)
shellAnalyticsTrigger.addComponent(new Transform({position: shellAnalyticsTriggerPosition}))

const shellAnalyticsTriggerScale = new Vector3(60, 50, 50)
let shellTriggerBox = new utils.TriggerBoxShape(shellAnalyticsTriggerScale)

shellAnalyticsTrigger.addComponentOrReplace(new TrackingElement(ANALYTICS_ELEMENTS_TYPES.region, ANALYTICS_ELEMENTS_IDS.shell))

shellAnalyticsTrigger.addComponent(
    new utils.TriggerComponent(
        shellTriggerBox, 
      {
        onCameraEnter : () => {
            log(AnalyticsLogLabel, "index.ts", "shell_Region", "onEnter")
            trackStart(shellAnalyticsTrigger.getComponentOrNull(TrackingElement))
        },
        onCameraExit : () => {
            log(AnalyticsLogLabel, "index.ts", "shell_Region", "onExit")
        	trackEnd(shellAnalyticsTrigger.getComponentOrNull(TrackingElement))
        }
      }
    )
)
engine.addEntity(shellAnalyticsTrigger)



const tradingCenterAnalyticsTrigger = new Entity()

const tradingCenterAnalyticsTriggerPosition = new Vector3(274, 1, 37)
tradingCenterAnalyticsTrigger.addComponent(new Transform({position: tradingCenterAnalyticsTriggerPosition}))

const tradingCenterAnalyticsTriggerScale = new Vector3(50, 30, 47)
let tradingCenterTriggerBox = new utils.TriggerBoxShape(tradingCenterAnalyticsTriggerScale)

tradingCenterAnalyticsTrigger.addComponentOrReplace(new TrackingElement(ANALYTICS_ELEMENTS_TYPES.region, ANALYTICS_ELEMENTS_IDS.tradingCenter))

tradingCenterAnalyticsTrigger.addComponent(
    new utils.TriggerComponent(
        tradingCenterTriggerBox, 
      {
        onCameraEnter : () => {
            log(AnalyticsLogLabel, "index.ts", "tradingCenter_Region", "onEnter")
            trackStart(tradingCenterAnalyticsTrigger.getComponentOrNull(TrackingElement))
        },
        onCameraExit : () => {
            log(AnalyticsLogLabel, "index.ts", "tradingCenter_Region", "onExit")
        	trackEnd(tradingCenterAnalyticsTrigger.getComponentOrNull(TrackingElement))
        }
      }
    )
)
engine.addEntity(tradingCenterAnalyticsTrigger)


/*
//DEBUG
const arr = new Array
arr.push(shellAnalyticsTriggerPosition, agoraAnalyticsTriggerPosition, gardenAnalyticsTriggerPosition, hallwayAnalyticsTriggerPosition, moonTowerAnalyticsTriggerPosition, mountainsAnalyticsTriggerPosition, artichokeAnalyticsTriggerPosition, auditoriumAnalyticsTriggerPosition, tradingCenterAnalyticsTriggerPosition, whaleBuildingAnalyticsTriggerPosition)

for (let i = 0; i < arr.length; i++) {
    log("cane")
    let cube = new Entity()
    cube.addComponent(new BoxShape())
    cube.getComponent(BoxShape).withCollisions = false
    cube.addComponent(new Transform({position: arr[i], scale: new Vector3(50, 50, 50)}))
    engine.addEntity(cube)
}
*/