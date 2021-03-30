import { ThumbnailPlane } from "./thumbnail"
import { monthToString, wordWrap } from "./helperFunctions"
import * as resource from "./resources/resources"
import { AnimatedItem } from "./simpleAnimator"
import { Teleport } from "./teleports"


//const clickableGroup = engine.getComponentGroup(ClickableItem, Transform)

export class ClassicMenuItem extends Entity {
    public thumbNail:ThumbnailPlane
    public scale:Vector3
    public scaleMultiplier:number  
    teleportMesh:GLTFShape  
    itemBox:Entity
    teleportLocation:string
    detailsRoot:Entity
    detailTextPanel:Entity
    detailTitle:Entity
    detailTextBody:Entity
    

    constructor(
        _transform:TranformConstructorArgs,       
        _name:string,
        _description:string,
        _location:string,
        _mesh:GLTFShape)
        {
        super()
        this.addComponent(new Transform(_transform))        
        
        // event card root
        this.itemBox = new Entity()
        this.itemBox.addComponent(new Transform({
            position: new Vector3(0,-0.48,-0.2),
            scale: new Vector3(0.75,0.75,0.75),
            
        }))
        this.itemBox.addComponent(_mesh)
        this.itemBox.getComponent(GLTFShape).isPointerBlocker = false
        this.itemBox.setParent(this)
        
        this.scaleMultiplier = 1.2     
        
        this.teleportLocation = _location

        //selection event animation
        this.addComponent(new AnimatedItem(
            {
                position: new Vector3(0,-0.48,-0.2),
                scale: new Vector3(1,1,1)
            },
            {
                position: new Vector3(-0.7,-0.48,-0.2),
                scale: new Vector3(1,1,1),
            },
            2            
        ))

         // DETAILS APPEARING ON SELECTION EVENT
         this.detailsRoot = new Entity()
         this.detailsRoot.addComponent(new Transform({
             position: new Vector3(0, 0.5,0),
             rotation: Quaternion.Euler(0,180,0)
         }))
         this.detailsRoot.setParent(this)
         
         // EVENT DETAILS TEXT
        this.detailTextPanel = new Entity()
        this.detailTextPanel.addComponent(new Transform({
            position: new Vector3(0.9,0,0),
            rotation: Quaternion.Euler(0,30,0)
        }))
        this.detailTextPanel.addComponent(resource.detailsBGShape)
        this.detailTextPanel.setParent(this.detailsRoot)
        this.detailTextPanel.addComponent(new AnimatedItem(
            {
                position: new Vector3(0.8,0,0.2),
                scale: new Vector3(0,0.8,0)
            },
            {
                position: new Vector3(0.9,0,-0.1),
                scale: new Vector3(1,1,1)

            },
            2.2
        ))

        let detailTitle = new TextShape()
        detailTitle.value = (_name)
        detailTitle.font = new Font(Fonts.SanFrancisco_Heavy)
        detailTitle.height = 20
        detailTitle.width = 2
        detailTitle.resizeToFit = true        
        detailTitle.fontSize = 1
        detailTitle.color = Color3.Black()
        detailTitle.hTextAlign = 'left'
        detailTitle.vTextAlign = 'top'  

        this.detailTitle = new Entity()
        this.detailTitle.addComponent(new Transform({
            position: new Vector3(0.1,0.5,0),
            scale: new Vector3(0.5, 0.5, 0.5)
        }))
        this.detailTitle.addComponent(detailTitle)
        this.detailTitle.setParent(this.detailTextPanel)       

        let detailTextContent = new TextShape()
        detailTextContent.value = ("\n\n" + wordWrap(_description, 75, 11) + "</cspace>")
        detailTextContent.font = new Font(Fonts.SanFrancisco_Semibold)
        detailTextContent.height = 20
        detailTextContent.width = 2
        detailTextContent.resizeToFit = true        
        detailTextContent.fontSize = 1
        detailTextContent.color = Color3.FromHexString("#111111")
        detailTextContent.hTextAlign = 'left'
        detailTextContent.vTextAlign = 'top'  
        detailTextContent.lineSpacing = '0'        
        
        this.detailTextBody = new Entity()
        this.detailTextBody.addComponent(new Transform({
            position: new Vector3(0.1,0.5,0),
            scale: new Vector3(0.4, 0.4, 0.4)
        }))
        this.detailTextBody.addComponent(detailTextContent)        
        this.detailTextBody.setParent(this.detailTextPanel)

        

        
      
    }
    openDetails(){
        
            teleportTo(this.teleportLocation)
          
    // let wasHighlighted = this.jumpInButton.getComponent(AnimatedItem).isHighlighted
        
    //     if(!wasHighlighted){
    //         this.jumpInButton.getComponent(AnimatedItem).isHighlighted = true  
    this.detailTextPanel.getComponent(AnimatedItem).isHighlighted = true       
    //         this.highlightRays.getComponent(AnimatedItem).isHighlighted = true       
    //         this.coordsPanel.getComponent(AnimatedItem).isHighlighted = true    
    //         //this.timePanel.getComponent(AnimatedItem).isHighlighted = true   
    //     }
    }
    closeDetails(){
        
    //     this.jumpInButton.getComponent(AnimatedItem).isHighlighted = false      
    this.detailTextPanel.getComponent(AnimatedItem).isHighlighted = false   
    //     this.highlightRays.getComponent(AnimatedItem).isHighlighted = false              
    //     this.coordsPanel.getComponent(AnimatedItem).isHighlighted = false   
    //    // this.timePanel.getComponent(AnimatedItem).isHighlighted = false   
                 
        
    }
    show(){

    }
    hide(){

    }
}

