import { getEvents, getTrendingScenes } from './checkApi'
import { EventMenuItem } from "./menuItemEvent"
import { TrendingMenuItem } from "./menuItemTrending"
import { ClassicMenuItem } from './menuItemClassic'
import { VerticalScrollMenu } from "./verticalScrollMenu"
import { Teleport, teleports } from "./teleports"

import * as resource from "./resources/resources"
import * as sfx from "./resources/sounds"
import { eventItemPlaceholder, crowdMenuPlaceholder } from "./menuPlaceholders"
import { AnimatedItem } from './simpleAnimator'
import { addPanels } from 'src/modules/bar/panels'
import { loadMoreMenuItem } from './menuItemLoad'
import { CooldownActivated } from './cooldown'



// EVENTS MENU 
export function createEventsVerticalMenu(_transform: TranformConstructorArgs ):VerticalScrollMenu {

  let menuRoot = new Entity()
  let vertEventMenu = new VerticalScrollMenu({
    position: new Vector3(0, 0, 0 ),
    scale: new Vector3(1,1,1)
  },
  2,
  5,
  resource.menuTopEventsShape,
  resource.menuBaseShape,
  "Events"
  )  
  menuRoot.addComponent(new Transform({
    position: _transform.position,
    rotation: _transform.rotation,
    scale: _transform.scale
  }))    
  vertEventMenu.setParent(menuRoot)
  engine.addEntity(menuRoot)
  
  //placeholder menuItems
 // for (let i = 0; i < vertEventMenu.visibleItemCount; i++){
  for (let i = 0; i < 10; i++){
    vertEventMenu.addMenuItem(new EventMenuItem({    
        scale: new Vector3(2,2,2)
      },        
      new Texture("images/rounded_alpha.png"),
      eventItemPlaceholder
    ))
  }

  let refreshRoot = new Entity()
  refreshRoot.addComponent(new Transform({
    position: new Vector3(2.35,-1.15,-0.65),
    rotation: Quaternion.Euler(27,0,0),
    scale: new Vector3(0.35, 0.35, 0.35)
  }))
  refreshRoot.addComponent(sfx.menuErrorSource)
  refreshRoot.setParent(vertEventMenu)

  let refreshButton = new Entity()
  refreshButton.addComponent(new Transform({
    position: new Vector3(0,0,-0.1),
    
  }))

  refreshButton.addComponent(new AnimatedItem(
    {
      position: new Vector3(0,0,-0.1),
      scale: new Vector3(1,1,1)
    },
    {
      position: new Vector3(0,0,0.0),
      scale: new Vector3(1,1,1)
    },
    2
  ))

  refreshButton.addComponent(new CooldownActivated(
    20,
    "REFRESH",
    "WAIT FOR COOLDOWN"
    ))
  refreshButton.addComponent(sfx.refreshSource)

  let cooldownText = new TextShape()
  cooldownText.value = "20"
  cooldownText.fontSize = 4

  refreshButton.addComponent(cooldownText)

  refreshButton.addComponent(resource.refreshShape)
  refreshButton.addComponent(
    new OnPointerDown(
      async function () {
        if(refreshButton.getComponent(CooldownActivated).active){
          refreshButton.getComponent(Transform).position.z = 0
          updateEventsMenu(vertEventMenu, 30, false)
          refreshButton.getComponent(CooldownActivated).startCooldown()
          sfx.refreshSource.playOnce()
        } 
        else{
          sfx.menuErrorSource.playOnce()
        }
        
      },
      {
        button: ActionButton.POINTER,
        hoverText: "Refresh"
      }
    )
  )
 
  refreshButton.setParent(refreshRoot) 

  return vertEventMenu
}

export async function updateEventsMenu(_menu:VerticalScrollMenu, _count:number, _addLoadMoreButton:boolean){

  let events = await getEvents(_count)
  if (events.length <= 0) {
    return
  } 

  // remove loadmore item
  if(!_addLoadMoreButton){
    removeLastXItems(_menu, 1)
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

  if(_addLoadMoreButton){
    let loadButton = new loadMoreMenuItem({    
      scale: new Vector3(1,1,1)
      },
      _menu
      )
    
    loadButton.addComponent(
      new OnPointerDown(
        async function () { 
          loadButton.getComponent(Transform).position.z = 0
          updateEventsMenu(_menu, 30, false)
        },
        {
          button: ActionButton.POINTER,
          hoverText: "LOAD MORE"
        }
      )
    )

    _menu.addMenuItem(loadButton)
  }
  

  // ADD BAR PANELS

  if(events.length >= 4){
    addPanels(
      new Texture( events[0].image ),
      new Texture( events[1].image ),
      new Texture( events[2].image ),
      new Texture( events[3].image ),
    )
  }
  else{
    addPanels(
      new Texture( events[0].image ),
      new Texture( events[0].image ),
      new Texture( events[0].image ),
      new Texture( events[0].image ),
    )
  }
  



  _menu.resetScroll()
}

export async function fillEventsMenu(_menu:VerticalScrollMenu) {

  let events = await getEvents(10)

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
  resource.menuTopCrowdShape,
  resource.menuBaseShape,
  "Trending Scenes"
  )  
  menuRoot.addComponent(new Transform({
    position: _transform.position,
    rotation: _transform.rotation,
    scale: _transform.scale
  }))    
  vertCrowdsMenu.setParent(menuRoot)
  engine.addEntity(menuRoot)

  //placeholder menuItems
  for (let i = 0; i < 10; i++){
    vertCrowdsMenu.addMenuItem(new TrendingMenuItem({    
      scale: new Vector3(2,2,2)
    },        
    new Texture("images/rounded_alpha.png"),
    crowdMenuPlaceholder
  ))
  }

  let refreshRoot = new Entity()
  refreshRoot.addComponent(new Transform({
    position: new Vector3(2.35,-1.15,-0.65),
    rotation: Quaternion.Euler(27,0,0),
    scale: new Vector3(0.35, 0.35, 0.35)
  }))
  refreshRoot.addComponent(sfx.menuErrorSource)
  refreshRoot.setParent(vertCrowdsMenu)

  let refreshButton = new Entity()
  refreshButton.addComponent(new Transform({
    position: new Vector3(0,0,-0.1),
    
  }))

  refreshButton.addComponent(new AnimatedItem(
    {
      position: new Vector3(0,0,-0.1),
      scale: new Vector3(1,1,1)
    },
    {
      position: new Vector3(0,0,0.0),
      scale: new Vector3(1,1,1)
    },
    2
  ))

  refreshButton.addComponent(new CooldownActivated(
    20,
    "REFRESH",
    "WAIT FOR COOLDOWN"
    ))
  refreshButton.addComponent(sfx.refreshSource)

  let cooldownText = new TextShape()
  cooldownText.value = "20"
  cooldownText.fontSize = 4

  refreshButton.addComponent(cooldownText)

  refreshButton.addComponent(resource.refreshShape)
  refreshButton.addComponent(
    new OnPointerDown(
      async function () {
        if(refreshButton.getComponent(CooldownActivated).active){
          refreshButton.getComponent(Transform).position.z = 0
          updateCrowdsMenu(vertCrowdsMenu)
          refreshButton.getComponent(CooldownActivated).startCooldown()
          sfx.refreshSource.playOnce()
        } 
        else{
          sfx.menuErrorSource.playOnce()
        }
        
      },
      {
        button: ActionButton.POINTER,
        hoverText: "Refresh"
      }
    )
  )
 
  refreshButton.setParent(refreshRoot) 

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
  resource.menuTopClassicsShape,
  resource.menuBaseShape,
  "Old Classics"
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

