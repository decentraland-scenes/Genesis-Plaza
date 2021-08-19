export class PointerArrow extends Entity {
  defaultPosition = new Vector3()
  defaultRotation = new Quaternion()
  defaultScale = new Vector3()
  constructor(position: TransformConstructorArgs, parent: Entity) {
    super()

    this.addComponent(new GLTFShape('models/Arrow.glb'))
    this.addComponent(new Transform(position))
    engine.addEntity(this)
    this.setParent(parent)

    this.defaultRotation = this.getComponent(Transform).rotation.clone()
    this.defaultPosition = this.getComponent(Transform).position.clone()
    this.defaultScale = this.getComponent(Transform).scale.clone()
  }

  show() {
    this.getComponent(GLTFShape).visible = true
  }
  hide() {
    this.getComponent(GLTFShape).visible = false
  }
  move(
    parent: Entity,
    rotation?: Vector3,
    position?: Vector3,
    scale?: Vector3
  ) {
    this.setParent(parent)
    this.getComponent(GLTFShape).visible = true

    if (rotation) {
      this.getComponent(Transform).rotation = Quaternion.Euler(
        rotation.x,
        rotation.y,
        rotation.z
      )
    } else {
      this.getComponent(Transform).rotation = this.defaultRotation
    }
    if (position) {
      this.getComponent(Transform).position = position
    } else {
      this.getComponent(Transform).position = this.defaultPosition
    }

    if (scale) {
      this.getComponent(Transform).scale = scale
    } else {
      this.getComponent(Transform).scale = this.defaultScale
    }
  }
}
