import { auditoriumCenter } from '../globals'
import { TriggerBox } from './triggerBox'
import { player } from './player'
import * as ui from '@dcl/ui-scene-utils'

let nextSceneCoords = '-67,85'

export class TeleportController {
  portalEntrance:Entity
  triggerBox:TriggerBox
  portalSys:PortalCheckSystem
  afterSign:Entity
  
  constructor(){

    this.portalEntrance = new Entity()    
    this.portalEntrance.addComponent(
      new Transform({
        position: new Vector3(
          auditoriumCenter.x,
          auditoriumCenter.y-10,
          auditoriumCenter.z
        ),
        rotation: Quaternion.Euler(0, 0, -90),
        scale: new Vector3(1, 5, 5),
      })
    )
    this.portalEntrance.addComponent(new GLTFShape('models/bday/portal_entrance.glb'))
    this.portalEntrance.addComponent(
      new OnPointerDown(
        (e) => {
          //TELEPORT
          teleportTo(nextSceneCoords)
        },
        { hoverText: 'Enter the Rabbit Hole' }
      )
    )
    engine.addEntity(this.portalEntrance)

    this.triggerBox = new TriggerBox(
      new Vector3(auditoriumCenter.x, auditoriumCenter.y-10, auditoriumCenter.z),
      new Vector3(12, 3, 12)
      )
    engine.addEntity(this.triggerBox)

    this.portalSys = new PortalCheckSystem(this.triggerBox)
    engine.addSystem(this.portalSys)

    this.afterSign = new Entity()
    this.afterSign.addComponent(new Transform({
      position: new Vector3(
        auditoriumCenter.x,
        auditoriumCenter.y+3,
        auditoriumCenter.z
      ),
      scale: new Vector3(2,2,2)
    }))
    this.afterSign.addComponent(new GLTFShape('models/bday/after_sign.glb'))
    this.afterSign.addComponent(new Billboard(false, true, false))
  }

  showTeleport(){
    this.portalEntrance.getComponent(Transform).position.y = auditoriumCenter.y
    this.triggerBox.getComponent(Transform).position.y = auditoriumCenter.y
    this.triggerBox.updatePosition()
    if(!this.afterSign.isAddedToEngine()){
      engine.addEntity(this.afterSign)
    }
  }
  hideTeleport(){
    this.portalEntrance.getComponent(Transform).position.y = auditoriumCenter.y-10
    this.triggerBox.getComponent(Transform).position.y = auditoriumCenter.y-10
    this.triggerBox.updatePosition()
    if(this.afterSign.isAddedToEngine()){
      engine.removeEntity(this.afterSign)
    }
      
  }
}


class PortalCheckSystem {
  trigger:TriggerBox

  constructor(_triggerBox:TriggerBox){
    this.trigger = _triggerBox
  }

  update(dt: number) {
    if (this.trigger.collide(player.feetPos)) {
      new ui.OkPrompt(
        'Follow the White Rabbit',
        () => {
          teleportTo(nextSceneCoords)
        },
        'Follow It'
      )
    }
  }
}

