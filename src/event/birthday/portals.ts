import { auditoriumCenter } from '../globals'
import { TriggerBox } from './triggerBox'
import { player }  from './player'


let portalEntranceShape = new GLTFShape('models/bday/portal_entrance.glb')

let portalEntrance = new Entity()
portalEntrance.addComponent(
  new Transform({
    position: new Vector3(
        auditoriumCenter.x ,
        auditoriumCenter.y,
        auditoriumCenter.z
    ),
    rotation: Quaternion.Euler(0,0,-90),
    scale: new Vector3(1,5,5)
  })
)
portalEntrance.addComponent(portalEntranceShape)
portalEntrance.addComponent(
  new OnPointerDown(
    (e) => {

        //TELEPORT
      
    },
    { hoverText: 'Enter the Rabbit Hole' }
  )
)
engine.addEntity(portalEntrance)

let portalTrigger1 = new TriggerBox(
  new Vector3(auditoriumCenter.x, auditoriumCenter.y, auditoriumCenter.z),
  new Vector3(4, 3, 3.3)
)
engine.addEntity(portalTrigger1)




class PortalCheckSystem {
  update(dt: number) {
    if (portalTrigger1.collide(player.headPos)) {
      
    }   
  }
}
engine.addSystem(new PortalCheckSystem())
