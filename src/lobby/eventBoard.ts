import { getEvents, getTrendingScenes } from './checkApi'
import { EventMenuItem } from "./menuItemEvent"
import { TrendingMenuItem } from "./menuItemTrending"
import { ClassicMenuItem } from './menuItemClassic'
import { VerticalScrollMenu } from "./verticalScrollMenu"
import { Teleport, teleports } from "./teleports"

import * as resource from "./resources/resources"
import { eventItemPlaceholder, crowdMenuPlaceholder } from "./menuPlaceholders"



// EVENTS MENU 
export function createEventsVerticalMenu(_transform: TranformConstructorArgs ):VerticalScrollMenu {
  let menuRoot = new Entity()
  let vertEventMenu = new VerticalScrollMenu({
    position: new Vector3(0, 0, 0 ),
    scale: new Vector3(1,1,1)
  },
  2,
  5,
  resource.menuTopEventsShape
  
  )  
  menuRoot.addComponent(new Transform({
    position: _transform.position,
    rotation: _transform.rotation,
    scale: _transform.scale
  }))    
  vertEventMenu.setParent(menuRoot)
  engine.addEntity(menuRoot)
  
  //placeholder menuItems
  for (let i = 0; i < vertEventMenu.visibleItemCount; i++){
    vertEventMenu.addMenuItem(new EventMenuItem({    
      scale: new Vector3(2,2,2)
    },        
    new Texture("images/rounded_alpha.png"),
    eventItemPlaceholder
  ))
  }

  let menuBase = new Entity()
  menuBase.addComponent(new Transform({
    position: new Vector3(0,-0.6,0),
    scale: new Vector3(4,4,4)
  }))
  menuBase.addComponent(resource.menuBaseShape)
  menuBase.setParent(menuRoot)

  let refreshButton = new Entity()
  refreshButton.addComponent(new Transform({
    position: new Vector3(3,1,0)
  }))
  refreshButton.addComponent(new BoxShape())
  refreshButton.addComponent(
    new OnPointerDown(
      async function () {
        updateEventsMenu(vertEventMenu)
      },
      {
        button: ActionButton.POINTER,
        hoverText: "Refresh"
      }
    )
  )
  refreshButton.setParent(vertEventMenu) 

  return vertEventMenu
}

export async function updateEventsMenu(_menu:VerticalScrollMenu){

  let events = await getEvents()
  if (events.length <= 0) {
    return
  } 

  for(let i=0; i < events.length; i++){

    if (i < _menu.items.length){
      _menu.items[i].updateItemInfo(events[i])
    }
    else{
      _menu.addMenuItem(new EventMenuItem({    
        scale: new Vector3(2,2,2)
      },        
      new Texture("images/rounded_alpha.png"),
      events[i]
    ))
    }
    
  }
  if(events.length <= _menu.items.length){
    removeLastXItems(_menu, _menu.items.length - events.length)
  }

  _menu.resetScroll()
}

export async function fillEventsMenu(_menu:VerticalScrollMenu) {

  let events = await getEvents()

  if (events.length <= 0) {
    return
  } 

  for(let i=0; i < events.length; i++){
    _menu.addMenuItem(new EventMenuItem({    
      scale: new Vector3(2,2,2)
    },        
    new Texture("images/rounded_alpha.png"),
    events[i]
  ))
  }   
  //_menu.showFirstXItems(_menu.visibleItemCount)
}

// CROWD HOTSPOTS MENU 
export function createCrowdVerticalMenu(_transform: TranformConstructorArgs):VerticalScrollMenu {
  let menuRoot = new Entity()
  let vertCrowdsMenu = new VerticalScrollMenu({
    position: new Vector3(0, 0, 0 ),
    scale: new Vector3(1,1,1)
  },
  2,
  4,
  resource.menuTopCrowdShape
  
  )  
  menuRoot.addComponent(new Transform({
    position: _transform.position,
    rotation: _transform.rotation,
    scale: _transform.scale
  }))    
  vertCrowdsMenu.setParent(menuRoot)
  engine.addEntity(menuRoot)

  //placeholder menuItems
  for (let i = 0; i < vertCrowdsMenu.visibleItemCount; i++){
    vertCrowdsMenu.addMenuItem(new TrendingMenuItem({    
      scale: new Vector3(2,2,2)
    },        
    new Texture("images/rounded_alpha.png"),
    crowdMenuPlaceholder
  ))
  }

  let menuBase = new Entity()
  menuBase.addComponent(new Transform({
    position: new Vector3(0,-0.6,0),
    scale: new Vector3(4,4,4)
  }))
  menuBase.addComponent(resource.menuBaseShape)
  menuBase.setParent(menuRoot)

  let refreshButton = new Entity()
  refreshButton.addComponent(new Transform({
    position: new Vector3(3,1,0)
  }))
  refreshButton.addComponent(new BoxShape())
  refreshButton.addComponent(
    new OnPointerDown(
      async function () {      
        updateCrowdsMenu(vertCrowdsMenu)        
      },
      {
        button: ActionButton.POINTER,
        hoverText: "Refresh"
      }
    )
  )
  refreshButton.setParent(vertCrowdsMenu) 

  return vertCrowdsMenu
}


export async function updateCrowdsMenu(_menu:VerticalScrollMenu){

  let scenes = await getTrendingScenes(10)

  if (scenes.length <= 0) {
    return
  } 


  for(let i=0; i < scenes.length; i++){

    if (i < _menu.items.length){
      _menu.items[i].updateItemInfo(scenes[i])
    }
    else{
      _menu.addMenuItem(new TrendingMenuItem({    
        scale: new Vector3(2,2,2)
      },        
      new Texture("images/rounded_alpha.png"),
      scenes[i]
    ))
    }
    
  }

  if(scenes.length <= _menu.items.length){
    removeLastXItems(_menu, _menu.items.length - scenes.length)
  }
  _menu.resetScroll()
}

export function removeLastXItems(_menu:VerticalScrollMenu, x:number){

  if(x >= 1 ){
    for(let i = 0; i < x; i++){
      _menu.removeMenuItem(_menu.items.length - 1)
    }
  }
  
}

export async function fillCrowdsMenu(_menu:VerticalScrollMenu) {

  let scenes = await getTrendingScenes(10)

  if (scenes.length <= 0) {
    return
  } 

  for(let i=0; i < scenes.length; i++){ 
    _menu.addMenuItem(new TrendingMenuItem({    
      scale: new Vector3(2,2,2)
    },        
    new Texture("images/rounded_alpha.png"),
    scenes[i]
  ))
  } 
  //_menu.showFirstXItems(_menu.visibleItemCount)



}// CLASSICS COLLECTION MENU
export function createClassicsVerticalMenu(_transform: TranformConstructorArgs):VerticalScrollMenu {
  let menuRoot = new Entity()
  let vertMenu = new VerticalScrollMenu({
    position: new Vector3(0, 0, 0 ),
    scale: new Vector3(1,1,1)
  },
  2,
  4,
  resource.menuTopClassicsShape
  
  )  
  menuRoot.addComponent(new Transform({
    position: _transform.position,
    rotation: _transform.rotation,
    scale: _transform.scale
  }))    
  vertMenu.setParent(menuRoot)
  engine.addEntity(menuRoot)

  let menuBase = new Entity()
  menuBase.addComponent(new Transform({
    position: new Vector3(0,-0.6,0),
    scale: new Vector3(4,4,4)
  }))
  menuBase.addComponent(resource.menuBaseShape)
  menuBase.setParent(menuRoot)

  return vertMenu
}

export async function fillClassicsMenu(_menu:VerticalScrollMenu) {

 // let scenes = await getTrendingScenes(10)
  
  for (let i of teleports) {
    _menu.addMenuItem(new ClassicMenuItem(      
      new Transform({
        position: new Vector3(0, -1, 0),
        scale: new Vector3(0.1, 0.1, 0.1),
        rotation: Quaternion.Euler(0, 180,0)
      }),
      i.name,
      i.description,
      i.location,
      i.model
      
    ))
  } 

  //_menu.showFirstXItems(_menu.visibleItemCount)



}

