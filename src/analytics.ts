import { Utils } from "cannon"
import { ANALYTICS_ELEMENTS_IDS, ANALYTICS_ELEMENTS_TYPES, AnalyticsLogLabel } from "./aiNpc/Stats/AnalyticsConfig"
import { TrackingElement, trackEnd, trackStart } from "./aiNpc/Stats/analyticsCompnents"
import * as utils from '@dcl/ecs-scene-utils'


const agoraAnalyticsTrigger = new Entity()

const agoraAnalyticsTriggerPosition = new Vector3(50, 1, 250)
agoraAnalyticsTrigger.addComponent(new Transform({position: agoraAnalyticsTriggerPosition}))

const agoraAnalyticsTriggerScale = new Vector3(50, 30, 47)
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

artichokeAnalyticsTrigger.addComponentOrReplace(new TrackingElement(ANALYTICS_ELEMENTS_TYPES.region, ANALYTICS_ELEMENTS_IDS.agora))

artichokeAnalyticsTrigger.addComponent(
    new utils.TriggerComponent(
        artichokeTriggerBox, 
      {
        onCameraEnter : () => {
            log(AnalyticsLogLabel, "index.ts", "agora_Region", "onEnter")
            trackStart(artichokeAnalyticsTrigger.getComponentOrNull(TrackingElement))
        },
        onCameraExit : () => {
            log(AnalyticsLogLabel, "index.ts", "agora_Region", "onExit")
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

hallwayAnalyticsTrigger.addComponentOrReplace(new TrackingElement(ANALYTICS_ELEMENTS_TYPES.region, ANALYTICS_ELEMENTS_IDS.agora))

hallwayAnalyticsTrigger.addComponent(
    new utils.TriggerComponent(
        hallwayTriggerBox, 
      {
        onCameraEnter : () => {
            log(AnalyticsLogLabel, "index.ts", "agora_Region", "onEnter")
            trackStart(hallwayAnalyticsTrigger.getComponentOrNull(TrackingElement))
        },
        onCameraExit : () => {
            log(AnalyticsLogLabel, "index.ts", "agora_Region", "onExit")
        	trackEnd(hallwayAnalyticsTrigger.getComponentOrNull(TrackingElement))
        }
      }
    )
)
engine.addEntity(hallwayAnalyticsTrigger)



const mountainsAnalyticsTrigger = new Entity()

const mountainsAnalyticsTriggerPosition = new Vector3(78, 1, 184)
mountainsAnalyticsTrigger.addComponent(new Transform({position: mountainsAnalyticsTriggerPosition}))

const mountainsAnalyticsTriggerScale = new Vector3(50, 30, 47)
let mountainsTriggerBox = new utils.TriggerBoxShape(mountainsAnalyticsTriggerScale)

mountainsAnalyticsTrigger.addComponentOrReplace(new TrackingElement(ANALYTICS_ELEMENTS_TYPES.region, ANALYTICS_ELEMENTS_IDS.agora))

mountainsAnalyticsTrigger.addComponent(
    new utils.TriggerComponent(
        mountainsTriggerBox, 
      {
        onCameraEnter : () => {
            log(AnalyticsLogLabel, "index.ts", "agora_Region", "onEnter")
            trackStart(mountainsAnalyticsTrigger.getComponentOrNull(TrackingElement))
        },
        onCameraExit : () => {
            log(AnalyticsLogLabel, "index.ts", "agora_Region", "onExit")
        	trackEnd(mountainsAnalyticsTrigger.getComponentOrNull(TrackingElement))
        }
      }
    )
)
engine.addEntity(mountainsAnalyticsTrigger)



const whaleBuildingAnalyticsTrigger = new Entity()

const whaleBuildingAnalyticsTriggerPosition = new Vector3(169, 1, 254)
whaleBuildingAnalyticsTrigger.addComponent(new Transform({position: whaleBuildingAnalyticsTriggerPosition}))

const whaleBuildingAnalyticsTriggerScale = new Vector3(50, 30, 47)
let whaleBuildingTriggerBox = new utils.TriggerBoxShape(whaleBuildingAnalyticsTriggerScale)

whaleBuildingAnalyticsTrigger.addComponentOrReplace(new TrackingElement(ANALYTICS_ELEMENTS_TYPES.region, ANALYTICS_ELEMENTS_IDS.agora))

whaleBuildingAnalyticsTrigger.addComponent(
    new utils.TriggerComponent(
        whaleBuildingTriggerBox, 
      {
        onCameraEnter : () => {
            log(AnalyticsLogLabel, "index.ts", "agora_Region", "onEnter")
            trackStart(whaleBuildingAnalyticsTrigger.getComponentOrNull(TrackingElement))
        },
        onCameraExit : () => {
            log(AnalyticsLogLabel, "index.ts", "agora_Region", "onExit")
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

moonTowerAnalyticsTrigger.addComponentOrReplace(new TrackingElement(ANALYTICS_ELEMENTS_TYPES.region, ANALYTICS_ELEMENTS_IDS.agora))

moonTowerAnalyticsTrigger.addComponent(
    new utils.TriggerComponent(
        moonTowerTriggerBox, 
      {
        onCameraEnter : () => {
            log(AnalyticsLogLabel, "index.ts", "agora_Region", "onEnter")
            trackStart(moonTowerAnalyticsTrigger.getComponentOrNull(TrackingElement))
        },
        onCameraExit : () => {
            log(AnalyticsLogLabel, "index.ts", "agora_Region", "onExit")
        	trackEnd(moonTowerAnalyticsTrigger.getComponentOrNull(TrackingElement))
        }
      }
    )
)
engine.addEntity(moonTowerAnalyticsTrigger)



const gardenAnalyticsTrigger = new Entity()

const gardenAnalyticsTriggerPosition = new Vector3(48, 1, 116)
gardenAnalyticsTrigger.addComponent(new Transform({position: gardenAnalyticsTriggerPosition}))

const gardenAnalyticsTriggerScale = new Vector3(50, 30, 47)
let gardenTriggerBox = new utils.TriggerBoxShape(gardenAnalyticsTriggerScale)

gardenAnalyticsTrigger.addComponentOrReplace(new TrackingElement(ANALYTICS_ELEMENTS_TYPES.region, ANALYTICS_ELEMENTS_IDS.agora))

gardenAnalyticsTrigger.addComponent(
    new utils.TriggerComponent(
        gardenTriggerBox, 
      {
        onCameraEnter : () => {
            log(AnalyticsLogLabel, "index.ts", "agora_Region", "onEnter")
            trackStart(gardenAnalyticsTrigger.getComponentOrNull(TrackingElement))
        },
        onCameraExit : () => {
            log(AnalyticsLogLabel, "index.ts", "agora_Region", "onExit")
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

auditoriumAnalyticsTrigger.addComponentOrReplace(new TrackingElement(ANALYTICS_ELEMENTS_TYPES.region, ANALYTICS_ELEMENTS_IDS.agora))

auditoriumAnalyticsTrigger.addComponent(
    new utils.TriggerComponent(
        auditoriumTriggerBox, 
      {
        onCameraEnter : () => {
            log(AnalyticsLogLabel, "index.ts", "agora_Region", "onEnter")
            trackStart(auditoriumAnalyticsTrigger.getComponentOrNull(TrackingElement))
        },
        onCameraExit : () => {
            log(AnalyticsLogLabel, "index.ts", "agora_Region", "onExit")
        	trackEnd(auditoriumAnalyticsTrigger.getComponentOrNull(TrackingElement))
        }
      }
    )
)
engine.addEntity(auditoriumAnalyticsTrigger)



const shellAnalyticsTrigger = new Entity()

const shellAnalyticsTriggerPosition = new Vector3(275, 1, 128)
shellAnalyticsTrigger.addComponent(new Transform({position: shellAnalyticsTriggerPosition}))

const shellAnalyticsTriggerScale = new Vector3(50, 30, 47)
let shellTriggerBox = new utils.TriggerBoxShape(shellAnalyticsTriggerScale)

shellAnalyticsTrigger.addComponentOrReplace(new TrackingElement(ANALYTICS_ELEMENTS_TYPES.region, ANALYTICS_ELEMENTS_IDS.agora))

shellAnalyticsTrigger.addComponent(
    new utils.TriggerComponent(
        shellTriggerBox, 
      {
        onCameraEnter : () => {
            log(AnalyticsLogLabel, "index.ts", "agora_Region", "onEnter")
            trackStart(shellAnalyticsTrigger.getComponentOrNull(TrackingElement))
        },
        onCameraExit : () => {
            log(AnalyticsLogLabel, "index.ts", "agora_Region", "onExit")
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

tradingCenterAnalyticsTrigger.addComponentOrReplace(new TrackingElement(ANALYTICS_ELEMENTS_TYPES.region, ANALYTICS_ELEMENTS_IDS.agora))

tradingCenterAnalyticsTrigger.addComponent(
    new utils.TriggerComponent(
        tradingCenterTriggerBox, 
      {
        onCameraEnter : () => {
            log(AnalyticsLogLabel, "index.ts", "agora_Region", "onEnter")
            trackStart(tradingCenterAnalyticsTrigger.getComponentOrNull(TrackingElement))
        },
        onCameraExit : () => {
            log(AnalyticsLogLabel, "index.ts", "agora_Region", "onExit")
        	trackEnd(tradingCenterAnalyticsTrigger.getComponentOrNull(TrackingElement))
        }
      }
    )
)
engine.addEntity(tradingCenterAnalyticsTrigger)