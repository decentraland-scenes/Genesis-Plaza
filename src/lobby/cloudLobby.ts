import { TeleportController } from './portalBeam'
import { createEventsVerticalMenu, fillEventsMenu, createCrowdVerticalMenu, fillCrowdsMenu, createClassicsVerticalMenu, fillClassicsMenu } from './eventBoard'
import {lobbyCenter, lobbyHeight, lobbyRadius} from './resources/globals'

const portalControl = new TeleportController()

const menuScale = 1

const center = new Vector3(lobbyCenter.x, lobbyHeight+1.5, lobbyCenter.z)

let rotation = Quaternion.Euler(0,0,0)
let posVec = center.add(Vector3.Forward().rotate(rotation).multiplyByFloats(lobbyRadius,lobbyRadius,lobbyRadius))

let eventsMenu = createEventsVerticalMenu({
    position: posVec,
    rotation: rotation,
    scale: new Vector3(1.2,1.2,1.2)
    }    
  )
fillEventsMenu(eventsMenu)    



rotation = Quaternion.Euler(0,45,0)
posVec = center.add(Vector3.Forward().rotate(rotation).multiplyByFloats(lobbyRadius,lobbyRadius,lobbyRadius))

let crowdsMenu = createCrowdVerticalMenu({
    position: posVec,
    rotation: rotation,
    scale: new Vector3(menuScale,menuScale,menuScale)
    }    
  )

fillCrowdsMenu(crowdsMenu)

rotation = Quaternion.Euler(0,-45,0)
posVec = center.add(Vector3.Forward().rotate(rotation).multiplyByFloats(lobbyRadius,lobbyRadius,lobbyRadius))

let classicsMenu = createClassicsVerticalMenu({
    position: posVec,
    rotation: rotation,
    scale: new Vector3(menuScale,menuScale,menuScale)
    }
    
  )
fillClassicsMenu(classicsMenu)
