import { ThumbnailPlane } from "./thumbnail"
import { monthToString, wordWrap } from "./helperFunctions"
import { AnimatedItem } from "./simpleAnimator"
import * as resource from "./resources/resources"
import { MenuItem } from "./menuItem"
import * as sfx from "./resources/sounds"



//const clickableGroup = engine.getComponentGroup(ClickableItem, Transform)

export class EventMenuItem extends MenuItem {
    public thumbNail:ThumbnailPlane
    public scale:Vector3
    public scaleMultiplier:number
    itemBox:Entity
    leftDetailsRoot:Entity
    dateRoot:Entity
    dateMonthRoot:Entity
    dateBG:Entity
    date:Date
    live:boolean
    liveSign:Entity
    liveText:TextShape
    detailsRoot:Entity
    jumpInButton:Entity
    detailText:Entity
    detailTextPanel:Entity
    highlightRays:Entity
    highlightFrame:Entity
    detailEventTitle:Entity
    readMoreButton:Entity
    coordsPanel:Entity
    timePanel:Entity
    startTime:Entity
    startTimeText:TextShape

    constructor(
        _transform:TranformConstructorArgs,        
        _alphaTexture:Texture,
        _event:any)
        {
        super()
        this.addComponent(new Transform(_transform))        
        
        // event card root
        this.itemBox = new Entity()
        this.itemBox.addComponent(new Transform({
            position: new Vector3(0,0,0),
            scale: new Vector3(1,1,1),
            
        }))
        this.itemBox.addComponent(resource.menuTitleBGShape)
        this.itemBox.setParent(this)

        this.scale = new Vector3(1,0.5,1)
        this.scaleMultiplier = 1.2
        this.thumbNail = new ThumbnailPlane(
            new Texture(_event.image), 
            {
                position:new Vector3(0.25,0.27,0),
                scale: new Vector3(1.1,0.55,1)
            } ,
            _alphaTexture)               
        this.thumbNail.setParent(this.itemBox)         

        this.leftDetailsRoot = new Entity()
        this.leftDetailsRoot.addComponent(new Transform({
            position: new Vector3(-0.32,0.28, -0.02),
            scale: new Vector3(0.9,0.9,0.9)
        }))
        this.leftDetailsRoot.setParent(this.itemBox)
        
        // LIVE SIGN
        this.live = _event.live

        this.liveText  = new TextShape()
        this.liveText. fontSize = 3
        this.liveText. color = Color3.Green()

        this.liveSign = new Entity()        
        this.liveSign.addComponent(new Transform({
            position: new Vector3(-0.25,0,0),
            scale: new Vector3(0.4, 0.4, 0.4)
        }))
        this.liveSign.setParent(this.leftDetailsRoot)
        if(this.live){
            this.liveText.value = "LIVE"
            this.liveSign.addComponent(resource.liveSignShape)
        }
        else{
            // -- DATE PANEL           
            
            this.dateBG = new Entity()
            this.dateBG.addComponent(new Transform({
                position: new Vector3(-0.25,0,0),
                scale: new Vector3(0.4, 0.4, 0.4)
            }))
            this.dateBG.addComponent(resource.dateBGShape)       
            this.dateBG.setParent(this.leftDetailsRoot)    

            this.dateRoot = new Entity()
            this.dateRoot.addComponent(new Transform({
                position: new Vector3(0,-0.15,-0.05)
            }))
            this.dateRoot.setParent(this.dateBG)    

            this.dateMonthRoot = new Entity()
            this.dateMonthRoot.addComponent(new Transform({
                position: new Vector3(0,0.2,-0.05)
            }))
            this.dateMonthRoot.setParent(this.dateBG)      

            let dateText = new TextShape()
            let dateMonthText = new TextShape()

            this.date = new Date(_event.next_start_at)

            dateText.value = this.date.getDate().toString()
            dateText.fontSize = 5
            dateText.color = resource.dateDayColor
            dateText.outlineColor = resource.dateDayColor
            dateText.outlineWidth = 0.2   

            dateMonthText.value = monthToString(this.date.getMonth()).toUpperCase()
            dateMonthText.fontSize = 3
            dateMonthText.color = resource.dateMonthColor

            this.dateRoot.addComponent(dateText)
            this.dateMonthRoot.addComponent(dateMonthText)

        } 

        //selection event animation
        this.addComponent(new AnimatedItem(
            {
                position: new Vector3(0,0,0),
                scale: new Vector3(2,2,2)
            },
            {
                position: new Vector3(0,0,-0.6),
                scale:  new Vector3(2.3,2.3,2.3)
            },
            2            
        ))

        // DETAILS APPEARING ON SELECTION EVENT
        this.detailsRoot = new Entity()
        this.detailsRoot.addComponent(new Transform())
        this.detailsRoot.setParent(this)
        
        this.timePanel = new Entity()
        this.timePanel.addComponent(new Transform({
            position: new Vector3(-0.4, 0, -0.1),
            rotation: Quaternion.Euler(0,-30,0)
        }))
        this.timePanel.addComponent(resource.timePanelShape)
        this.timePanel.setParent(this.detailsRoot)

        this.timePanel.addComponent(new AnimatedItem(
            {
                position: new Vector3(-0.7,0.25,0.1),
                scale: new Vector3(0,0,0)
            },
            {
                position: new Vector3(-1.1, 0.25, -0.1),
                scale: new Vector3(1,1,1)
            },
            2
        ))

        
        this.startTime = new Entity()
        
        this.startTimeText = new TextShape()
        this.startTimeText.font = new Font(Fonts.SanFrancisco_Heavy)
        this.startTimeText.value = (_event.next_start_at).substring(11,16) + "\nUTC"

        this.startTime.addComponent(new Transform({
            scale: new Vector3(0.1,0.1,0.1)
        }))
        this.startTime.addComponent(this.startTimeText)
        this.startTime.setParent(this.timePanel)


        // TITLE
        let titleText = new TextShape()
        let title = new Entity()
        let rawText:string = _event.name

        // if(rawText.length > 36){
        //     rawText = (rawText.substring(0,36) + "\n" + rawText.substring(36,rawText.length) )
        // }

        rawText = wordWrap(rawText,36,3)
        titleText.value = rawText
        titleText.font = new Font(Fonts.SanFrancisco_Heavy)
        titleText.height = 20
        titleText.width = 2
        titleText.resizeToFit = true
        // titleText.textWrapping = true
        // titleText.lineCount = 2
        // titleText.lineSpacing = "10%"
        titleText.fontSize = 2
        titleText.color = Color3.Black()
        titleText.hTextAlign = 'center'
        titleText.vTextAlign = 'center'        
        
        title.addComponent(new Transform({
            position: new Vector3(0,-0.15, -0.01),
            scale: new Vector3(0.3,0.3,0.3)
        }))
        title.addComponent(titleText)

        title.setParent(this.itemBox)

        

        // -- COORDS PANEL
        this.coordsPanel = new Entity()
        this.coordsPanel.addComponent(new Transform({
            position: new Vector3(-0.3,-0.2,0),
            scale: new Vector3(0.4, 0.4, 0.4)
        }))
        this.coordsPanel.addComponent(resource.coordsPanelShape)
        this.coordsPanel.setParent(this.detailsRoot)
        this.coordsPanel.addComponent(new AnimatedItem(
            {
                position: new Vector3(0,0.0,0.2),
                scale: new Vector3(0.1, 0.1, 0.1)
            },
            {
                position: new Vector3(-0.4,-0.25,-0.05),
                scale: new Vector3(0.5, 0.5, 0.5)
            },
            1.9
        ))
        this.coordsPanel.addComponent(new OnPointerDown( 
            async function () {
                teleportTo((_event.coordinates[0] + "," + _event.coordinates[1]))
              },
              {
                button: ActionButton.POINTER,
                hoverText: "GO THERE",
              }
            //movePlayerTo({ x: lobbyCenter.x, y: 110, z: lobbyCenter.z-8 } )
        ))

        let coords = new Entity
        let coordsText = new TextShape()
        coordsText.value = (_event.coordinates[0] + "," + _event.coordinates[1])
        coordsText.color = Color3.FromHexString("#111111")
        coordsText.font = new Font(Fonts.SanFrancisco_Heavy)

        coords.addComponent(coordsText)
        coords.addComponent(new Transform({
            position: new Vector3(0.18,-0.33,-0.05),
            scale: new Vector3(0.18, 0.18, 0.18)
        }))
        
        coords.setParent(this.coordsPanel)

        // -- JUMP IN BUTTON
        this.jumpInButton = new Entity()
        this.jumpInButton.addComponent(new Transform({
            position: new Vector3(0,-0.2,0),
            scale: new Vector3(0.4, 0.4, 0.4)
        }))
        this.jumpInButton.addComponent(resource.jumpInButtonShape)
        this.jumpInButton.setParent(this.detailsRoot)
        this.jumpInButton.addComponent(new AnimatedItem(
            {
                position: new Vector3(0,0.0,0.2),
                scale: new Vector3(0.1, 0.1, 0.1)
            },
            {
                position: new Vector3(0.4,-0.25,-0.05),
                scale: new Vector3(0.5, 0.5, 0.5)
            },
            1.8
        ))

        let jumpButtonText = new Entity
        let jumpButtonTextShape = new TextShape()
        
        jumpButtonTextShape.color = Color3.FromHexString("#FFFFFF")
        jumpButtonTextShape.font = new Font(Fonts.SanFrancisco_Heavy)
        jumpButtonTextShape.hTextAlign = "center"
        

        jumpButtonText.addComponent(jumpButtonTextShape)
        jumpButtonText.addComponent(new Transform({
            position: new Vector3(0, -0.33, -0.05),
            scale: new Vector3(0.22, 0.22, 0.22)
        }))
        
        jumpButtonText.setParent(this.jumpInButton)

        if(this.live){
            jumpButtonTextShape.value = "JUMP IN"
            this.jumpInButton.addComponent(new OnPointerDown( 
                async function () {
                    teleportTo((_event.coordinates[0] + "," + _event.coordinates[1]))
                  },
                  {
                    button: ActionButton.POINTER,
                    hoverText: "JUMP IN",
                  }
                //movePlayerTo({ x: lobbyCenter.x, y: 110, z: lobbyCenter.z-8 } )
            ))
        }
        else{
            jumpButtonTextShape.value = "SIGN UP"
            this.jumpInButton.addComponent(new OnPointerDown( ()=> {
                openExternalURL("https://events.decentraland.org/en/?event=" + _event.id)
            },
                  {
                    button: ActionButton.POINTER,
                    hoverText: "CHECK EVENT PAGE",
                  }
                
                    
            ))
        }        

        // EVENT DETAILS TEXT
        this.detailTextPanel = new Entity()
        this.detailTextPanel.addComponent(new Transform({
            position: new Vector3(0.8,0,0.2),
            scale: new Vector3(0,0.8,0),
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
        detailTitle.value = (_event.name)
        detailTitle.font = new Font(Fonts.SanFrancisco_Heavy)
        detailTitle.height = 20
        detailTitle.width = 2
        detailTitle.resizeToFit = true        
        detailTitle.fontSize = 1
        detailTitle.color = Color3.Black()
        detailTitle.hTextAlign = 'left'
        detailTitle.vTextAlign = 'top'  

        this.detailEventTitle = new Entity()
        this.detailEventTitle.addComponent(new Transform({
            position: new Vector3(0.1,0.5,0),
            scale: new Vector3(0.5, 0.5, 0.5)
        }))
        this.detailEventTitle.addComponent(detailTitle)
        this.detailEventTitle.setParent(this.detailTextPanel)       

        let detailTextContent = new TextShape()
        detailTextContent.value = ("\n\n" + wordWrap(_event.description, 75, 11) + "</cspace>")
        detailTextContent.font = new Font(Fonts.SanFrancisco_Semibold)
        detailTextContent.height = 20
        detailTextContent.width = 2
        detailTextContent.resizeToFit = true        
        detailTextContent.fontSize = 1
        detailTextContent.color = Color3.FromHexString("#111111")
        detailTextContent.hTextAlign = 'left'
        detailTextContent.vTextAlign = 'top'  
        detailTextContent.lineSpacing = '0'        
        
        this.detailText = new Entity()
        this.detailText.addComponent(new Transform({
            position: new Vector3(0.1,0.5,0),
            scale: new Vector3(0.4, 0.4, 0.4)
        }))
        this.detailText.addComponent(detailTextContent)        
        this.detailText.setParent(this.detailTextPanel)

        //details website button
        this.readMoreButton = new Entity()
        this.readMoreButton.addComponent(new Transform({
            position: new Vector3(0.23,-0.2, 0),
            
        }))
        this.readMoreButton.addComponent(resource.readMoreBtnShape)
        this.readMoreButton.addComponent(new OnPointerDown( ()=>{
            openExternalURL("https://events.decentraland.org/en/?event=" + _event.id)
        },{hoverText:"READ MORE"}))
        this.readMoreButton.setParent(this.detailTextPanel)

        // highlights BG on selection
        this.highlightRays = new Entity()
        this.highlightRays.addComponent(new Transform())
        this.highlightRays.addComponent(resource.highlightRaysShape)
        this.highlightRays.setParent(this.detailsRoot)
        this.highlightRays.addComponent(new AnimatedItem(
            {
                position: new Vector3(0,0,0.05),
                scale: new Vector3(0,0,0)
            },
            {
                position: new Vector3(0,0,0.05),
                scale: new Vector3(1,1,1)

            },
            3
        ))

        this.highlightFrame = new Entity()
        this.highlightFrame.addComponent(new Transform())
        this.highlightFrame.addComponent(resource.highlightFrameShape)
        this.highlightFrame.setParent(this.highlightRays)
      
    }
    select(){   
         

        if(!this.selected){
           // engine.addEntity(this.detailsRoot)
            this.selected = true 
            this.jumpInButton.getComponent(AnimatedItem).isHighlighted = true  
            this.detailTextPanel.getComponent(AnimatedItem).isHighlighted = true       
            this.highlightRays.getComponent(AnimatedItem).isHighlighted = true       
            this.coordsPanel.getComponent(AnimatedItem).isHighlighted = true    
            this.timePanel.getComponent(AnimatedItem).isHighlighted = true   

            
        }
    }
    deselect(_silent?:boolean){
        if(this.selected){
            this.selected = false
           // engine.removeEntity(this.detailsRoot)
        }
        this.jumpInButton.getComponent(AnimatedItem).isHighlighted = false      
        this.detailTextPanel.getComponent(AnimatedItem).isHighlighted = false   
        this.highlightRays.getComponent(AnimatedItem).isHighlighted = false              
        this.coordsPanel.getComponent(AnimatedItem).isHighlighted = false   
        this.timePanel.getComponent(AnimatedItem).isHighlighted = false   

        // if(!_silent){
        //     sfx.menuDeselectSource.playOnce()
        // }
          
        
        
    }
    show(){

    }
    hide(){

    }
}

