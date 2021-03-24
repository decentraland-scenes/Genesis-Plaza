import { getEvents, getTrendingScenes } from './checkApi'
import { EventMenuItem } from "./menuItemEvent"
import { TrendingMenuItem } from "./menuItemTrending"
import { VerticalScrollMenu } from "./verticalScrollMenu"
import * as resource from "./resources/resources"



export function createEventsVerticalMenu(_transform: TranformConstructorArgs, _grabScroll:boolean):VerticalScrollMenu {
  let menuRoot = new Entity()
  let vertMenu = new VerticalScrollMenu({
    position: new Vector3(0, 0, 0 ),
    scale: new Vector3(1,1,1)
  },
  2,
  resource.menuTopEventsShape
  
  )  
  menuRoot.addComponent(new Transform({
    position: _transform.position,
    rotation: _transform.rotation,
    scale: _transform.scale
  }))    
  vertMenu.setParent(menuRoot)
  engine.addEntity(menuRoot)

  return vertMenu
}

export function createCrowdVerticalMenu(_transform: TranformConstructorArgs, _grabScroll:boolean):VerticalScrollMenu {
  let menuRoot = new Entity()
  let vertMenu = new VerticalScrollMenu({
    position: new Vector3(0, 0, 0 ),
    scale: new Vector3(1,1,1)
  },
  2,
  resource.menuTopCrowdShape
  
  )  
  menuRoot.addComponent(new Transform({
    position: _transform.position,
    rotation: _transform.rotation,
    scale: _transform.scale
  }))    
  vertMenu.setParent(menuRoot)
  engine.addEntity(menuRoot)

  return vertMenu
}

export async function fillCrowdsMenu(_menu:VerticalScrollMenu, _grabScroll:boolean) {

  let scenes = await getTrendingScenes(10)

  if (scenes.length <= 0) {
    return
  } 

  for(let i=0; i < scenes.length; i++){
    //log("event count : " + events.length)
    //log("adding : " + i)

    _menu.addMenuItem(new TrendingMenuItem({    
      scale: new Vector3(2,2,2)
    },
    _grabScroll,    
    new Texture("images/rounded_alpha.png"),
    scenes[i]
  ))
  } 
  //engine.addEntity(_menu)  
  _menu.showFirstXItems(5)



}
export async function fillEventsMenu(_menu:VerticalScrollMenu, _grabScroll:boolean) {

  let events = await getEvents()

  if (events.length <= 0) {
    return
  } 

  for(let i=0; i < events.length; i++){
    //log("event count : " + events.length)
    //log("adding : " + i)

    _menu.addMenuItem(new EventMenuItem({    
      scale: new Vector3(2,2,2)
    },
    _grabScroll,    
    new Texture("images/rounded_alpha.png"),
    events[i]
  ))
  } 
  //engine.addEntity(_menu)  
  _menu.showFirstXItems(5)



}
