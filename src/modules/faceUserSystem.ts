@Component("trackUserSlerp")
export class TrackUserSlerp {
  fraction: number = 0
}

let currentCameraPosition = new Vector3(0, 0, 0)

// Rotates robot to face the user during interaction
export function addFaceUserSystem(dummyTarget: Entity) {
  class FaceUserSystem implements ISystem {
    private robotGroup: ComponentGroup = engine.getComponentGroup(
      TrackUserSlerp
    )

    update(dt: number) {
      for (let robot of this.robotGroup.entities) {
        let transform = robot.getComponent(Transform)
        let trackUserSlerp = robot.getComponent(TrackUserSlerp)

        // Check if player moves
        if (
          currentCameraPosition.x != Camera.instance.position.x ||
          currentCameraPosition.y != Camera.instance.position.y ||
          currentCameraPosition.z != Camera.instance.position.z
        ) {
          // Update current camera position
          currentCameraPosition.x = Camera.instance.position.x
          currentCameraPosition.y = Camera.instance.position.y
          currentCameraPosition.z = Camera.instance.position.z
          trackUserSlerp.fraction = 0
        }

        dummyTarget.getComponent(Transform).lookAt(Camera.instance.position)

        trackUserSlerp.fraction += dt / 12

        if (trackUserSlerp.fraction < 1) {
          transform.rotation = Quaternion.Slerp(
            robot.getComponent(Transform).rotation,
            dummyTarget.getComponent(Transform).rotation,
            trackUserSlerp.fraction
          )
        }
      }
    }
  }

  engine.addSystem(new FaceUserSystem())
}
