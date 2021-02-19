import { Synced } from './syncable'
import { auditoriumCenter } from './globals'

// DJ
export let dj = new Synced(
  new GLTFShape('models/RAC_DJ_Wearables.glb'),
  false,
  'Idle',
  {
    position: new Vector3(auditoriumCenter.x, 9, auditoriumCenter.z),
    rotation: Quaternion.Euler(0, 210, 0),
    scale: new Vector3(1.5, 1.5, 1.5),
  }
)
dj.hide()

// lights
export let lights1 = new Synced(
  new GLTFShape('models/Light_Set.glb'),
  true,
  'Action_02',
  {
    rotation: Quaternion.Euler(0, 180, 0),
  }
)

export let lights2 = new Synced(
  new GLTFShape('models/Light_Set_02.glb'),
  true,
  'Lights_Bottom_Action_01',
  {
    rotation: Quaternion.Euler(0, 180, 0),
  }
)
