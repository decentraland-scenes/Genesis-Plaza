import { ThumbnailPlane } from "./thumbnail"
import { monthToString, wordWrap } from "./helperFunctions"
import * as resource from "./resources/resources"
import { AnimatedItem } from "./simpleAnimator"
import { MenuItem } from "./menuItem"

//const clickableGroup = engine.getComponentGroup(ClickableItem, Transform)

export class TrendingMenuItem extends MenuItem {
    public thumbNail:ThumbnailPlane
    public scale:Vector3
    public scaleMultiplier:number
    itemBox:Entity
    leftDetailsRoot:Entity
    userCountRoot:Entity
    usersTitleRoot:Entity
    playerCounterBG:Entity
    userCount:Date
    live:boolean
    liveSign:Entity
    liveText:TextShape
    detailsRoot:Entity
    jumpInButton:Entity
    detailText:Entity
    detailTextPanel:Entity
    highlightRays:Entity
    detailEventTitle:Entity
    readMoreButton:Entity
    coordsPanel:Entity
    timePanel:Entity
    startTime:Entity
    startTimeText:TextShape

    constructor(
        _transform:TranformConstructorArgs,               
        _alphaTexture:Texture,
        _scene:any)
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

        if(_scene.thumbnail){

            let imgPath:string = _scene.thumbnail
            log("scene thumbnail : " + imgPath)
            
    
                this.thumbNail = new ThumbnailPlane(
                    new Texture(_scene.thumbnail), 
                    {
                        position:new Vector3(0.25,0.275,0),
                        scale: new Vector3(1.1,0.55,1)
                    } ,
                    _alphaTexture)               
                this.thumbNail.setParent(this.itemBox) 
            
            
        }
        else{        
    
            this.thumbNail = new ThumbnailPlane(
                resource.dummySceneBG, 
                {
                    position:new Vector3(0.25,0.275,0),
                    scale: new Vector3(1.1,0.55,1)
                } ,
                _alphaTexture)               
            this.thumbNail.setParent(this.itemBox) 
        }
        
               

        this.leftDetailsRoot = new Entity()
        this.leftDetailsRoot.addComponent(new Transform({
            position: new Vector3(-0.32,0.28, -0.02),
            scale: new Vector3(0.9,0.9,0.9)
        }))
        this.leftDetailsRoot.setParent(this.itemBox)
        
      
       
        
        
        // -- USER COUNTER PANEL           
        
        this.playerCounterBG = new Entity()
        this.playerCounterBG.addComponent(new Transform({
            position: new Vector3(-0.25,0,0),
            scale: new Vector3(0.45, 0.45, 0.45)
        }))
        this.playerCounterBG.addComponent(resource.playerCounterBGShape)       
        this.playerCounterBG.setParent(this.leftDetailsRoot)    

        this.userCountRoot = new Entity()
        this.userCountRoot.addComponent(new Transform({
            position: new Vector3(0.52,-0.40,-0.025),
            scale: new Vector3(0.93, 0.93, 0.93)
        }))
        this.userCountRoot.setParent(this.playerCounterBG)    

        this.usersTitleRoot = new Entity()
        this.usersTitleRoot.addComponent(new Transform({
            position: new Vector3(0,-0.12,0.05),
            scale: new Vector3(0.8,0.8,0.8)
        }))
        this.usersTitleRoot.setParent(this.playerCounterBG)      

        let userCountText = new TextShape()
        let usersTitleText = new TextShape()

        this.userCount =_scene.usersTotalCount

        userCountText.value = this.userCount.toString()
        //userCountText.value = "12345"
        userCountText.fontSize = 4
        userCountText.hTextAlign = "right"
        userCountText.color = resource.dateDayColor
        userCountText.outlineColor = resource.dateDayColor
        userCountText.outlineWidth = 0.2   

        usersTitleText.value = "PLAYERS:"
        usersTitleText.fontSize = 2
        usersTitleText.font = new Font(Fonts.SanFrancisco_Semibold)
        usersTitleText.color = Color3.Black()

        this.userCountRoot.addComponent(userCountText)
        this.usersTitleRoot.addComponent(usersTitleText)

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
        
        // this.timePanel = new Entity()
        // this.timePanel.addComponent(new Transform({
        //     position: new Vector3(-0.4, 0, -0.1),
        //     rotation: Quaternion.Euler(0,-30,0)
        // }))
        // this.timePanel.addComponent(resource.timePanelShape)
        // this.timePanel.setParent(this.detailsRoot)

        // this.timePanel.addComponent(new AnimatedItem(
        //     {
        //         position: new Vector3(-0.7,0.25,0.1),
        //         scale: new Vector3(0,0,0)
        //     },
        //     {
        //         position: new Vector3(-1.1, 0.25, -0.1),
        //         scale: new Vector3(1,1,1)
        //     },
        //     2
        // ))      
       


        // TITLE
        let titleText = new TextShape()
        let title = new Entity()
        let rawText:string = _scene.name

        // if(rawText.length > 36){
        //     rawText = (rawText.substring(0,36) + "\n" + rawText.substring(36,rawText.length) )
        // }

        
        if(rawText === "interactive-text"){
            titleText.value = "Unnamed Scene"
        }
        else{
            rawText = wordWrap(rawText,36,3)
            titleText.value = rawText
        }
        
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
                teleportTo((_scene.baseCoords[0] + "," + _scene.baseCoords[1]))
              },
              {
                button: ActionButton.POINTER,
                hoverText: "GO THERE",
              }
            //movePlayerTo({ x: lobbyCenter.x, y: 110, z: lobbyCenter.z-8 } )
        ))

        let coords = new Entity
        let coordsText = new TextShape()
        coordsText.value = (_scene.baseCoords[0] + "," + _scene.baseCoords[1])
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

        
        jumpButtonTextShape.value = "JUMP IN"
        this.jumpInButton.addComponent(new OnPointerDown( 
            async function () {
                teleportTo((_scene.baseCoords[0] + "," + _scene.baseCoords[1]))
                },
                {
                button: ActionButton.POINTER,
                hoverText: "JUMP IN",
                }
            //movePlayerTo({ x: lobbyCenter.x, y: 110, z: lobbyCenter.z-8 } )
        ))
        
           

        // EVENT DETAILS TEXT
        // this.detailTextPanel = new Entity()
        // this.detailTextPanel.addComponent(new Transform({
        //     position: new Vector3(0.9,0,0),
        //     rotation: Quaternion.Euler(0,30,0)
        // }))
        // this.detailTextPanel.addComponent(resource.detailsBGShape)
        // this.detailTextPanel.setParent(this.detailsRoot)
        // this.detailTextPanel.addComponent(new AnimatedItem(
        //     {
        //         position: new Vector3(0.8,0,0.2),
        //         scale: new Vector3(0,0.8,0)
        //     },
        //     {
        //         position: new Vector3(0.9,0,-0.1),
        //         scale: new Vector3(1,1,1)

        //     },
        //     2.2
        // ))

        // let detailTitle = new TextShape()
        // detailTitle.value = (_scene.name)
        // detailTitle.font = new Font(Fonts.SanFrancisco_Heavy)
        // detailTitle.height = 20
        // detailTitle.width = 2
        // detailTitle.resizeToFit = true        
        // detailTitle.fontSize = 1
        // detailTitle.color = Color3.Black()
        // detailTitle.hTextAlign = 'left'
        // detailTitle.vTextAlign = 'top'  

        // this.detailEventTitle = new Entity()
        // this.detailEventTitle.addComponent(new Transform({
        //     position: new Vector3(0.1,0.5,0),
        //     scale: new Vector3(0.5, 0.5, 0.5)
        // }))
        // this.detailEventTitle.addComponent(detailTitle)
        // this.detailEventTitle.setParent(this.detailTextPanel)       

        // let detailTextContent = new TextShape()
        // //detailTextContent.value = ("\n\n" + wordWrap(_scene.description, 100, 11) + "</cspace>")
        // detailTextContent.value = "Description"
        // detailTextContent.font = new Font(Fonts.SanFrancisco_Semibold)
        // detailTextContent.height = 20
        // detailTextContent.width = 2
        // detailTextContent.resizeToFit = true        
        // detailTextContent.fontSize = 1
        // detailTextContent.color = Color3.FromHexString("#111111")
        // detailTextContent.hTextAlign = 'left'
        // detailTextContent.vTextAlign = 'top'  
        // detailTextContent.lineSpacing = '0'        
        
        // this.detailText = new Entity()
        // this.detailText.addComponent(new Transform({
        //     position: new Vector3(0.1,0.5,0),
        //     scale: new Vector3(0.4, 0.4, 0.4)
        // }))
        // this.detailText.addComponent(detailTextContent)        
        // this.detailText.setParent(this.detailTextPanel)        

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
      
    }
    select(){

        if(!this.selected){
            this.selected = true 
            this.jumpInButton.getComponent(AnimatedItem).isHighlighted = true  
           // this.detailTextPanel.getComponent(AnimatedItem).isHighlighted = true       
            this.highlightRays.getComponent(AnimatedItem).isHighlighted = true       
            this.coordsPanel.getComponent(AnimatedItem).isHighlighted = true    
            //this.timePanel.getComponent(AnimatedItem).isHighlighted = true   
        }
    }
    deselect(){
        this.selected = false 
        
        this.jumpInButton.getComponent(AnimatedItem).isHighlighted = false      
       // this.detailTextPanel.getComponent(AnimatedItem).isHighlighted = false   
        this.highlightRays.getComponent(AnimatedItem).isHighlighted = false              
        this.coordsPanel.getComponent(AnimatedItem).isHighlighted = false   
       // this.timePanel.getComponent(AnimatedItem).isHighlighted = false   
                 
        
    }
    show(){

    }
    hide(){

    }
}

