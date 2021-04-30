import { AnimatedItem } from "./simpleAnimator"
import * as resource from "./resources/resources"
import { MenuItem } from "./menuItem"
import { lobbyCenter } from "./resources/globals"
import {     
    updateEventsMenu, 
    } 
    from './menuMainFunctions'
import { VerticalScrollMenu } from "./verticalScrollMenu"

let dummyLoadButton = new Entity()
dummyLoadButton.addComponent(new Transform({
    position: new Vector3(lobbyCenter.x, lobbyCenter.y -20, lobbyCenter.z)
}))
dummyLoadButton.addComponent(resource.loadMoreShape)
engine.addEntity(dummyLoadButton)



export class loadMoreMenuItem extends MenuItem {    

    button:Entity   
    menuRef:VerticalScrollMenu 

    constructor(
        _transform:TranformConstructorArgs, 
        _menu:VerticalScrollMenu       
        )
        {
        super()
        this.addComponent(new Transform(_transform))
        
        this.menuRef = _menu

        this.defaultItemScale = new Vector3(1,1,1)
        
        this.button = new Entity
        this.button.addComponent(new Transform())
        this.button.addComponent(resource.loadMoreShape)
        this.button.setParent(this)   
        
        //selection event animation
        this.addComponent(new AnimatedItem(
            {
                position: new Vector3(0,0,0),
                scale: new Vector3(this.defaultItemScale.x, this.defaultItemScale.y, this.defaultItemScale.z)
            },
            {
                position: new Vector3(0,0,-0.1),
                scale:  new Vector3(1,1,1)
            },
            2            
        ))
        
    }
    updateItemInfo(_event:any){
        
        

    }
    select(){   
        if(!this.selected){
            this.selected = true      
            updateEventsMenu(this.menuRef, 30, false)    
        }

        
    }
    deselect(_silent?:boolean){   
        this.selected = false 
        
    }
    show(){

    }
    hide(){

    }
}

