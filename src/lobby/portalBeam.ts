import { TriggerBox } from '../modules/triggerBox'
import { player } from '../modules/player'
import { movePlayerTo } from '@decentraland/RestrictedActions'
import {lobbyCenter, lobbyHeight} from './resources/globals'
import {showTeleportUI, setTeleportCountdown } from '../modules/ui'

@Component("DelayedTriggerBox")
export class DelayedTriggerBox{  

    delay:number = 2
    elapsed:number = 0    

    constructor(_delay:number){
      this.delay = _delay          
    }

}

export class TeleportController {    
    triggerBoxUp:TriggerBox
    triggerBoxDown:TriggerBox
    triggers:TriggerBox[]
    delayedTriggers:TriggerBox[]
    portalSys:PortalCheckSystem    
    
    constructor(){
        this.triggers = []
        this.delayedTriggers = []

        this.triggerBoxUp = new TriggerBox(
            new Vector3(lobbyCenter.x, lobbyCenter.y, lobbyCenter.z),
            new Vector3(6, 3, 6),
            () => {
                movePlayerTo({ x: lobbyCenter.x, y: 140, z: lobbyCenter.z-8 } )
                //{x:lobbyCenter.x, y:lobbyHeight+100, z:lobbyCenter.z+12}
            }
        )
        this.triggerBoxUp.addComponent(new DelayedTriggerBox(2))

      engine.addEntity(this.triggerBoxUp)
  
        this.triggerBoxDown = new TriggerBox(
            new Vector3(lobbyCenter.x, lobbyCenter.y+8, lobbyCenter.z),
            new Vector3(6, 6, 6),
            () => {
                movePlayerTo({ x: lobbyCenter.x-10, y: 0, z: lobbyCenter.z+2 }, {x:lobbyCenter.x, y:2, z:lobbyCenter.z-12})
            }
        )
      engine.addEntity(this.triggerBoxDown)

      this.delayedTriggers.push(this.triggerBoxUp)
      this.triggers.push(this.triggerBoxDown)
  
      this.portalSys = new PortalCheckSystem(this)
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

    collideSimple(){
      for(let i=0; i< this.triggers.length; i++){
        this.triggers[i].collide(player.feetPos) 
      }
    }
    collideDelayed(dt:number){
      for(let i=0; i< this.delayedTriggers.length; i++){

        if(this.delayedTriggers[i].collide(player.feetPos, true)){
          const delayInfo = this.delayedTriggers[i].getComponent(DelayedTriggerBox)
          delayInfo.elapsed += dt
          showTeleportUI(true)
          let countDownNum = delayInfo.delay - delayInfo.elapsed 
          if(countDownNum < 0)
            countDownNum = 0         
          setTeleportCountdown( countDownNum.toFixed(0) )

          if(delayInfo.elapsed > delayInfo.delay){
            this.delayedTriggers[i].fire()
            delayInfo.elapsed = 0
          }
        } 
        else{
          this.delayedTriggers[i].getComponent(DelayedTriggerBox).elapsed = 0
          showTeleportUI(false)
          setTeleportCountdown( '0')
         

        }
      }
    }
  }
  
  
class PortalCheckSystem {
  teleportControl:TeleportController

  constructor(_teleportController:TeleportController){
   this.teleportControl = _teleportController
  }

  update(dt: number) {   
     
    this.teleportControl.collideDelayed(dt)
    this.teleportControl.collideSimple()
  }
}
  