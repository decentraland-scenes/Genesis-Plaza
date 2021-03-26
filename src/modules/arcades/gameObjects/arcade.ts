import * as utils from "@dcl/ecs-scene-utils"

export class Arcade extends Entity {
  public knob: Entity = new Entity()
  constructor(model: GLTFShape, transform: Transform, knob: boolean = true) {
    super()
    engine.addEntity(this)
    this.addComponent(model)
    this.addComponent(transform)

    if (knob) {
      this.knob.addComponent(new GLTFShape("models/knob.glb"))
      this.knob.addComponent(new Transform({ position: new Vector3(0, 1.383, -0.397) }))
      this.knob.getComponent(Transform).rotate(Vector3.Left(), 11.6)
      this.knob.setParent(this)
    }
  }
  controlStop() {
    if (this.knob.hasComponent(utils.KeepRotatingComponent)) this.knob.removeComponent(utils.KeepRotatingComponent)
  }
  controlLeft() {
    this.knob.addComponentOrReplace(new utils.KeepRotatingComponent(Quaternion.Euler(0, -90, 0)))
  }
  controlRight() {
    this.knob.addComponentOrReplace(new utils.KeepRotatingComponent(Quaternion.Euler(0, 90, 0)))
  }
}
