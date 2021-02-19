import { Synced } from './syncable'
import { auditoriumCenter } from './globals'

// DJ
export let dj = new Synced(
  new GLTFShape('models/RAC_DJ_Wearables.glb'),
  true,
  'Idle',
  {
    position: new Vector3(auditoriumCenter.x, 9, auditoriumCenter.z),
    rotation: Quaternion.Euler(0, 210, 0),
    scale: new Vector3(1.5, 1.5, 1.5),
  }
)

// cake

// fireworks

// balloons
