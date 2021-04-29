import { ThumbnailPlane } from "./thumbnail"
import { monthToString, wordWrap } from "./helperFunctions"
import { AnimatedItem } from "./simpleAnimator"
import * as resource from "./resources/resources"


export class MenuItem extends Entity {
    selected:boolean = false
    defaultItemScale:Vector3

    constructor(){
        super()       
        this.defaultItemScale = new Vector3(2,2,2)
    }
    updateItemInfo(_info:any){

    }
           
    select(){

        
                  
        
    
    }
    deselect(_silent?:boolean){
        // this.selected = false            
              
    }
    show(){

    }
    hide(){

    }
}