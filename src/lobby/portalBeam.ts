import { TriggerBox } from '../modules/triggerBox'
import { player } from '../modules/player'
import { movePlayerTo } from '@decentraland/RestrictedActions'
import {lobbyCenter, lobbyHeight} from './resources/globals'



export class TeleportController {    
    triggerBoxUp:TriggerBox
    triggerBoxDown:TriggerBox
    triggers:TriggerBox[]
    portalSys:PortalCheckSystem    
    
    constructor(){
        this.triggers = []

        this.triggerBoxUp = new TriggerBox(
            new Vector3(lobbyCenter.x, lobbyCenter.y, lobbyCenter.z),
            new Vector3(6, 3, 6),
            () => {
                movePlayerTo({ x: lobbyCenter.x, y: 110, z: lobbyCenter.z-8 } )
                //{x:lobbyCenter.x, y:lobbyHeight+100, z:lobbyCenter.z+12}
            }
        )
      engine.addEntity(this.triggerBoxUp)
  
        this.triggerBoxDown = new TriggerBox(
            new Vector3(lobbyCenter.x, lobbyCenter.y+8, lobbyCenter.z),
            new Vector3(6, 6, 6),
            () => {
                movePlayerTo({ x: lobbyCenter.x-10, y: 0, z: lobbyCenter.z+2 }, {x:lobbyCenter.x, y:2, z:lobbyCenter.z-12})
            }
        )
      engine.addEntity(this.triggerBoxDown)

      this.triggers.push(this.triggerBoxUp)
      this.triggers.push(this.triggerBoxDown)
  
      this.portalSys = new PortalCheckSystem(this.triggers)
      engine.addSystem(this.portalSys)
  
      
    }
  
    showTeleport(){      
      this.triggerBoxUp.getComponent(Transform).position.y = lobbyCenter.y
      this.triggerBoxUp.updatePosition()      
    }
    hideTeleport(){      
      this.triggerBoxUp.getComponent(Transform).position.y = lobbyCenter.y-10
      this.triggerBoxUp.updatePosition()     
        
    }
  }
  
  
  class PortalCheckSystem {
    triggers:TriggerBox[]
  
    constructor(_triggerBoxes:TriggerBox[]){
      this.triggers = _triggerBoxes
    }
  
    update(dt: number) {
      
        for(let i=0; i< this.triggers.length; i++){
            this.triggers[i].collide(player.feetPos) 
        }
      
    }
  }
  