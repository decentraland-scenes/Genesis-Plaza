@Component("ballFlag")
export class BallFlag {}

export class Ball extends Entity {
  public direction: Vector3
  constructor(transform: Transform, direction: Vector3, parent: Entity) {
    super()
    engine.addEntity(this)
    this.setParent(parent)
    this.addComponent(transform)
    this.addComponent(new BallFlag())
    this.addComponent(new BoxShape())
    this.getComponent(BoxShape).withCollisions = false
    this.direction = direction
  }
}
