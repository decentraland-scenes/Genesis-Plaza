import { TeleportController } from './portalBeam'
import {  
  createEventsVerticalMenu, 
  fillEventsMenu,
  updateEventsMenu, 
  createCrowdVerticalMenu, 
  fillCrowdsMenu, 
  createClassicsVerticalMenu, 
  fillClassicsMenu, 
  updateCrowdsMenu} 
  from './eventBoard'
  
import {lobbyCenter, lobbyHeight, lobbyRadius} from './resources/globals'
import * as resource from "./resources/resources"

const portalControl = new TeleportController()

const menuScale = 1.2

const center = new Vector3(lobbyCenter.x, lobbyHeight+1.5, lobbyCenter.z)


// WATER VORTEXES
let vortex1 = new Entity()
vortex1.addComponent(new Transform({
  position: new Vector3(lobbyCenter.x, lobbyHeight, lobbyCenter.z)
}))
vortex1.addComponent(resource.vortex1Shape)
engine.addEntity(vortex1)

let vortex2 = new Entity()
vortex2.addComponent(new Transform({
  position: new Vector3(lobbyCenter.x, lobbyHeight, lobbyCenter.z)
}))
vortex2.addComponent(resource.vortex2Shape)
engine.addEntity(vortex2)


// VERTICAL MENUS
let rotation = Quaternion.Euler(0,0,0)
let posVec = center.add(Vector3.Forward().rotate(rotation).multiplyByFloats(lobbyRadius,lobbyRadius,lobbyRadius))

// -- Events
let eventsMenu = createEventsVerticalMenu({
    position: posVec,
    rotation: rotation,
    scale: new Vector3(menuScale,menuScale,menuScale)
    }    
  )
updateEventsMenu(eventsMenu)
//fillEventsMenu(eventsMenu)    


rotation = Quaternion.Euler(0,45,0)
posVec = center.add(Vector3.Forward().rotate(rotation).multiplyByFloats(lobbyRadius,lobbyRadius,lobbyRadius))

// -- Trending scenes
let crowdsMenu = createCrowdVerticalMenu({
    position: posVec,
    rotation: rotation,
    scale: new Vector3(menuScale,menuScale,menuScale)
    }    
  )
updateCrowdsMenu( crowdsMenu)
//fillCrowdsMenu(crowdsMenu)

rotation = Quaternion.Euler(0,-45,0)
posVec = center.add(Vector3.Forward().rotate(rotation).multiplyByFloats(lobbyRadius,lobbyRadius,lobbyRadius))

// -- Classics
let classicsMenu = createClassicsVerticalMenu({
    position: posVec,
    rotation: rotation,
    scale: new Vector3(menuScale,menuScale,menuScale)
    }
    
  )
fillClassicsMenu(classicsMenu)
