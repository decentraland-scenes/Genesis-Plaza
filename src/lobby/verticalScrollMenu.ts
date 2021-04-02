import { EventMenuItem } from "./menuItemEvent"
import { AnimatedItem } from "./simpleAnimator"
import { player } from "./player"
import * as resource from "./resources/resources"
import * as sfx from "./resources/sounds"
import { MenuItem } from "./menuItem"




@Component("VerticalScroller")
export class VerticalScroller{  

    base:number = 0
    stops:number = 0
    currentItem:number = 0    
    scrollTarget:number = 0
    scrollStep:number = 2.2
    scrollFraction:number =0
    speed:number = 3
    currentMenuVelocity:number = 0   

    constructor(){          
    }

    scrollUp(){
        if(this.currentItem < this.stops - 1){        
            this.currentItem += 1
            this.scrollTarget = this.base - this.currentItem * this.scrollStep       
        }        
    }

    scrollDown(){
        if(this.currentItem > 0){
            this.currentItem -= 1
            this.scrollTarget = this.base - this.currentItem * this.scrollStep            
        }
    }
}

export class VerticalScrollMenu extends Entity {

    items:MenuItem[]
    visibleItemCount:number = 5
    verticalSpacing:number = 1.2
    currentOffset:number = 0
    maxHeight:number = 1
    origin:Vector3 
    scrollerRoot:Entity
    menuFrame:Entity
    bg:Entity
    topMesh:Entity
    clickBoxes:Entity[]
    itemRoots:Entity[]
    instructions:Entity

    
    selectSound:Entity
    deselectSound:Entity


   

    constructor(_transform:TranformConstructorArgs, _spacing:number, _numOfVisibleItems:number, _topMesh:GLTFShape){
        super()
        this.visibleItemCount = _numOfVisibleItems

        this.items = []
        this.clickBoxes = []
        this.itemRoots = []
        this.menuFrame = new Entity()
        this.menuFrame.addComponent(new Transform({
            position: new Vector3(0,0,0.05),
            scale: new Vector3(4,1,4)
        }))
        this.menuFrame.addComponent(new GLTFShape("models/lobby/menu_collider.glb"))
        this.menuFrame.setParent(this)
        this.menuFrame.addComponent(sfx.menuDownSource)

        this.topMesh = new Entity()
        this.topMesh.addComponent(new Transform({
            position: new Vector3(0, this.visibleItemCount * _spacing -1,0),
            scale: new Vector3(4,4,4)
        }))
        this.topMesh.addComponent(_topMesh)
        this.topMesh.setParent(this)

        this.addComponent(sfx.menuUpSource)

        // this.bg = new Entity()
        // this.bg.addComponent(new Transform({
        //     position: new Vector3(-0.4,0,0.1),
        //     scale: new Vector3(4,1,1)
        // }))
        // this.bg.addComponent(new GLTFShape("models/lobby/menu_bg.glb"))
        // this.bg.setParent(this)

        this.addComponent(new Transform(_transform))

        this.origin = new Vector3(0,0,0)
        this.origin.copyFrom(this.getComponent(Transform).position)

        this.verticalSpacing = _spacing             
        
        this.scrollerRoot = new Entity()
        this.scrollerRoot.addComponent(new Transform())

        this.scrollerRoot.addComponent(new VerticalScroller())   
        this.scrollerRoot.getComponent(VerticalScroller).base = this.scrollerRoot.getComponent(Transform).position.y
        this.scrollerRoot.getComponent(VerticalScroller).scrollStep =  this.verticalSpacing   
        this.scrollerRoot.setParent(this)

        engine.addEntity(this)

        this.instructions = new Entity()
        this.instructions.addComponent(new Transform({
            position: new Vector3(-3,0,-0.3),
            scale: new Vector3(2,2,2)
        }))
        this.instructions.addComponent(resource.scrollInstructionShape)
        this.instructions.addComponent(new OnPointerDown( (e) => {    
            const scrollInfo = this.scrollerRoot.getComponent(VerticalScroller)             
                  
            // 'E' to scroll up
            if(e.buttonId == 1){                         
                scrollInfo.scrollUp() 
                this.deselectAll()
                this.showItem(scrollInfo.currentItem + (this.visibleItemCount -1))
                this.hideItem(scrollInfo.currentItem - 2)
            }
            // 'F' to scroll down
            if(e.buttonId == 2){                
                scrollInfo.scrollDown() 
                this.deselectAll()
                this.showItem(scrollInfo.currentItem - 1)
                this.hideItem(scrollInfo.currentItem+this.visibleItemCount)
            }         

        },{distance:40, showFeedback:true, hoverText:"USE E/F TO SCROLL EVENTS"} ))   
        this.instructions.setParent(this)
        
        this.maxHeight =this.visibleItemCount * this.verticalSpacing + 1
        this.menuFrame.getComponent(Transform).position.y = this.maxHeight/2 - this.verticalSpacing
        this.menuFrame.getComponent(Transform).scale.y = this.maxHeight
        //this.collider.addComponent()        

        //sounds
        this.selectSound = new Entity()
        this.selectSound.addComponent(new Transform())
        this.selectSound.addComponent(sfx.menuSelectSource)
        this.selectSound.setParent(this)

        this.deselectSound = new Entity()
        this.deselectSound.addComponent(new Transform())
        this.deselectSound.addComponent(sfx.menuDeselectSource)
        this.deselectSound.setParent(this)

    }

    addMenuItem(_item:MenuItem){   

        let itemRoot = new Entity()
        itemRoot.addComponent(new Transform({
            position: new Vector3(0, this.currentOffset, 0)
        }))    
        

        this.itemRoots.push(itemRoot)
        //itemRoot.addComponent(sfx.menuSelectSource)  
        
        
        // COLLIDER BOX FOR USER INPUT
        let clickBox = new Entity    
        clickBox.addComponent(new Transform({
        // position: new Vector3(1, this.currentOffset, 0)
        }))
        clickBox.addComponent(resource.shelfShape)
        clickBox.setParent(itemRoot)    
        clickBox.addComponent(new OnPointerDown( (e) => {    
            const scrollInfo = this.scrollerRoot.getComponent(VerticalScroller) 
            
            // click to select
            if(e.buttonId == 0){
                
                if(!_item.selected){
                    this.selectItem(_item)
                    clickBox.getComponent(OnPointerDown).hoverText = "DESELECT" 
                    sfx.menuSelectSource.playOnce()   
                }
                else{
                    this.deselectItem(_item, false)
                    clickBox.getComponent(OnPointerDown).hoverText = "SELECT" 
                    sfx.menuDeselectSource.playOnce()   
                }                
                          
            }          
            // 'E' to scroll up
            if(e.buttonId == 1){                         
                scrollInfo.scrollUp() 
                this.deselectAll()
                this.showItem(scrollInfo.currentItem + (this.visibleItemCount-1))
                this.hideItem(scrollInfo.currentItem - 2)
                sfx.menuUpSource.playOnce()
            }
            // 'F' to scroll down
            if(e.buttonId == 2){                
                scrollInfo.scrollDown() 
                this.deselectAll()
                this.showItem(scrollInfo.currentItem - 1)
                this.hideItem(scrollInfo.currentItem + this.visibleItemCount)
                sfx.menuDownSource.playOnce()
            }         

        },{distance:40, showFeedback:true, hoverText:"SELECT"} ))        

        
        this.items.push(_item)
        this.clickBoxes.push(clickBox)

        if(this.itemRoots.length < this.visibleItemCount){
            itemRoot.setParent(this.scrollerRoot)
            _item.setParent(itemRoot)
        }

        
        // _item.getComponent(Transform).position.y = this.currentOffset
        this.currentOffset += this.verticalSpacing
        // this.maxHeight = this.items.length * this.verticalSpacing + 1
        
        this.scrollerRoot.getComponent(VerticalScroller).stops = this.items.length        
        
    }

    selectItem(_item:MenuItem){
        //if(_id < this.items.length){
           // this.items[_id].select()
           if(_item.hasComponent(AnimatedItem)){           

                if(!_item.selected){
                     this.deselectAll()
                    _item.getComponent(AnimatedItem).isHighlighted = true  
                    _item.select()              
                }
           }
           else{
                _item.select()  
           }    
        
    }
    deselectItem(_item:MenuItem, _silent:boolean){     
           if(_item.hasComponent(AnimatedItem)){           

                if(_item.selected){
                    _item.getComponent(AnimatedItem).isHighlighted = false  
                    _item.deselect(_silent)              
                }
           }
           else{
                _item.deselect(_silent)    
           }    
        
    }
    deselectAll(){
        for(let i=0; i< this.items.length; i++){            
                this.items[i].getComponent(AnimatedItem).isHighlighted = false            
                this.deselectItem(this.items[i], true)       
                this.clickBoxes[i].getComponent(OnPointerDown).hoverText = "SELECT"        
        }
    }
    hideItem(_id:number){
        if(_id < this.items.length && _id >= 0){
            engine.removeEntity(this.itemRoots[_id])
        }
    }
    showItem(_id:number){
        if(_id < this.itemRoots.length && _id >= 0){
            engine.addEntity(this.itemRoots[_id])
            this.itemRoots[_id].setParent(this.scrollerRoot)
            this.items[_id].setParent(this.itemRoots[_id])
        }
        
    }
    showFirstXItems(_count:number){
        // only show the first 5 events on init
        for(let i=0; i< this.itemRoots.length; i++){
            if(i < _count){
                this.showItem(i)
            }
            else{
                this.hideItem(i)
            }
        }
    }

}

export class clickScrollSystem {

    group = engine.getComponentGroup(VerticalScroller, Transform)     

    update(dt:number){

        for(let entity of this.group.entities){
            const scrollInfo = entity.getComponent(VerticalScroller)
            const scrollTransform = entity.getComponent(Transform)

            scrollTransform.position.y = this.springPos(scrollInfo.scrollTarget, scrollTransform.position.y, scrollInfo.currentMenuVelocity, dt)
        }
    }

    springPos(a_Target:number,
        a_Current:number,
        a_currentVelocity:number,            
        a_TimeStep:number 
        ):number
        {

        let currentToTarget = a_Target - a_Current
        let springForce = currentToTarget * 150
        //let dampingForce = -this.currentVelocity * 2 * Math.sqrt( SPRING_CONSTANT );
        let dampingForce = -a_currentVelocity * 2
        let force = springForce + dampingForce
        a_currentVelocity += force * a_TimeStep
        let displacement = a_currentVelocity * a_TimeStep

        return a_Current + displacement
    }
}
engine.addSystem(new clickScrollSystem())




