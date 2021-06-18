import { ThumbnailPlane } from "./thumbnail"
import { cleanString, monthToString, wordWrap, ethClean, shortenText } from "./helperFunctions"
import { AnimatedItem } from "./simpleAnimator"
import * as resource from "./resources/resources"
import { MenuItem } from "./menuItem"
import { createComponents, buy } from "../store/index";
import * as sfx from "./resources/sounds"
import {  updateWearablesMenu } from "../ui/menuMainFunctions";
import { HorizontalScrollMenu } from "./horizontalScrollMenu"





//const clickableGroup = engine.getComponentGroup(ClickableItem, Transform)

export class CollectionMenuItem extends MenuItem {
    
    public scale:Vector3
    public scaleMultiplier:number

    collection:any
    wearableMenuReference:HorizontalScrollMenu
    itemRoot:Entity
    cardOffset:Vector3
    title:Entity
    titleText:TextShape     
    highlightFrame:Entity    
    


    constructor(
        _transform:TranformConstructorArgs,        
        _alphaTexture:Texture,
        _collection:any,
        _wearableMenu:HorizontalScrollMenu
        )
        {
        super()
        
        this.collection = _collection
        this.wearableMenuReference = _wearableMenu

        this.addComponent(new Transform(_transform))     
        this.scale = new Vector3(1,1,1)
        this.scaleMultiplier = 1.2
        this.defaultItemScale = new Vector3(1,1,1)
        this.highlightItemScale = new Vector3(1,1,1)
        this.cardOffset = new Vector3(0,0,0)

        //selection event animation
        this.addComponent(new AnimatedItem(
            {
                position: new Vector3(0,0,0),
                scale: new Vector3(this.defaultItemScale.x, this.defaultItemScale.y, this.defaultItemScale.z),
                rotation: Quaternion.Euler(0,0,0)
            },
            {
                position: new Vector3(0,0.0,-0.05),
                scale:  new Vector3(this.highlightItemScale.x , this.highlightItemScale.y , this.highlightItemScale.z ),
                rotation: Quaternion.Euler(0,0,0)
            },
            2            
        ))

        // event card root
        this.itemRoot = new Entity()
        this.itemRoot.addComponent(new Transform({
            position: new Vector3(this.cardOffset.x, this.cardOffset.y, this.cardOffset.z),
            scale: new Vector3(1,1,1),
            
        }))        
        this.itemRoot.addComponent(resource.smallCardShape)        
        this.itemRoot.setParent(this)

        
        // TITLE
        this.titleText = new TextShape()
        this.title = new Entity()
        let rawText:string = _collection.name
        //log("item name: " + rawText)
        //  remove non-UTF-8 characters   
        rawText = shortenText(rawText,30)

        //rawText = wordWrap(rawText,20,3)
        
        this.titleText.font = new Font(Fonts.SanFrancisco_Heavy)
        this.titleText.height = 20
        this.titleText.width = 2
        this.titleText.resizeToFit = true
        
        this.titleText.fontSize = 2
        this.titleText.color = Color3.Black()
        this.titleText.hTextAlign = 'center'
        this.titleText.vTextAlign = 'center'        
        
        this.title.addComponent(new Transform({
            position: new Vector3(0,0, -0.02),
            scale: new Vector3(0.3,0.3,0.3)
        }))
        this.title.addComponent(this.titleText)
        this.titleText.value = rawText

        this.title.setParent(this.itemRoot)     

        //highlight on click
        this.highlightFrame = new Entity()
        this.highlightFrame.addComponent(new Transform())
        this.highlightFrame.addComponent(resource.smallCardHighlightShape)
        this.highlightFrame.addComponent(new AnimatedItem(
                {
                    position:  new Vector3(0,0,0),
                    scale: new Vector3(0,0,0),
                    rotation: Quaternion.Euler(0,0,0)
                },
                {
                    position:  new Vector3(0,0,0) ,
                    scale: new Vector3(1,1,1),
                    rotation: Quaternion.Euler(0,0,0)
    
                },
                3
            ))
        this.highlightFrame.setParent(this)
      
    }
    updateItemInfo(_collection:any, _item:any){
        
        //store the collection info
        this.collection = _collection
        
        //title
        let rawText:string = _collection.name 


        //  remove non-UTF-8 characters
       // rawText = cleanString(rawText)
        rawText = shortenText(rawText,30)
       // rawText = wordWrap(rawText,36,3)
        this.title.getComponent(TextShape).value = rawText


       

    }
    select(){   
         

        if(!this.selected){
           
            this.selected = true             
            updateWearablesMenu(this.wearableMenuReference, this.collection ) 
                 
            this.highlightFrame.getComponent(AnimatedItem).isHighlighted = true       
            this.titleText.color = Color3.White()       
           
            
        }
    }
    deselect(_silent?:boolean){
        if(this.selected){
            this.selected = false           
        }            
         
        this.highlightFrame.getComponent(AnimatedItem).isHighlighted = false 
        this.titleText.color = Color3.Black() 
        
    }
    show(){

    }
    hide(){

    }
}

