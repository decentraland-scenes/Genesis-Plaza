import { auditoriumCenter } from '../globals'
import { TriggerBox } from './triggerBox'
import { player } from './player'
import * as ui from '@dcl/ui-scene-utils'

let nextSceneCoords = '-67,85'

let portalEntranceShape = new GLTFShape('models/bday/portal_entrance.glb')

export let portalEntrance = new Entity()
portalEntrance.addComponent(
  new Transform({
    position: new Vector3(
      auditoriumCenter.x,
      auditoriumCenter.y,
      auditoriumCenter.z
    ),
    rotation: Quaternion.Euler(0, 0, -90),
    scale: new Vector3(1, 5, 5),
  })
)
portalEntrance.addComponent(portalEntranceShape)
portalEntrance.addComponent(
  new OnPointerDown(
    (e) => {
      //TELEPORT
      teleportTo(nextSceneCoords)
    },
    { hoverText: 'Enter the Rabbit Hole' }
  )
)
// engine.addEntity(portalEntrance)

let portalTrigger1 = new TriggerBox(
  new Vector3(auditoriumCenter.x, auditoriumCenter.y, auditoriumCenter.z),
  new Vector3(4, 3, 3.3)
)
engine.addEntity(portalTrigger1)

class PortalCheckSystem {
  update(dt: number) {
    if (portalTrigger1.collide(player.headPos)) {
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
engine.addSystem(new PortalCheckSystem())
