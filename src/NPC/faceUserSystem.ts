@Component('trackUserSlerp')
export class TrackUserSlerp {
  fraction: number = 0
  onlyXAxis: boolean = true
  constructor() {
    if (!faceUserAdded) {
      addFaceUserSystem()
    }
  }
}

let currentCameraPosition = new Vector3(0, 0, 0)

let faceUserAdded: boolean = false

export const dummyTarget = new Entity()
dummyTarget.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
  })
)
engine.addEntity(dummyTarget)

export function moveDummyTarget(parent: Entity) {
  dummyTarget
    .getComponent(Transform)
    .position.copyFrom(parent.getComponent(Transform).position)

  npc = parent
}

let npc: Entity

// Rotates NPC to face the user during interaction
export function addFaceUserSystem() {
  faceUserAdded = true
  class FaceUserSystem implements ISystem {
    private npcGroup: ComponentGroup = engine.getComponentGroup(TrackUserSlerp)

    update(dt: number) {
      //for (let npc of this.npcGroup.entities) {
      if (!npc) return
      let transform = npc.getComponent(Transform)
      let trackUserSlerp = npc.getComponent(TrackUserSlerp)

      // Check if player moves
      if (
        currentCameraPosition.x != Camera.instance.position.x ||
        (!trackUserSlerp.onlyXAxis &&
          currentCameraPosition.y != Camera.instance.position.y) ||
        currentCameraPosition.z != Camera.instance.position.z
      ) {
        // Update current camera position
        currentCameraPosition.x = Camera.instance.position.x
        currentCameraPosition.y = trackUserSlerp.onlyXAxis
          ? dummyTarget.getComponent(Transform).position.y
          : Camera.instance.position.y
        currentCameraPosition.z = Camera.instance.position.z
        trackUserSlerp.fraction = 0
      }

      dummyTarget.getComponent(Transform).lookAt(currentCameraPosition)

      trackUserSlerp.fraction += dt / 12

      if (trackUserSlerp.fraction < 1) {
        transform.rotation = Quaternion.Slerp(
          npc.getComponent(Transform).rotation,
          dummyTarget.getComponent(Transform).rotation,
          trackUserSlerp.fraction
        )
      }
      //}
    }
  }

  engine.addSystem(new FaceUserSystem())
}
