import { CollisionFlag } from "../gameLogic/collision"

@Component("wallFlag")
export class WallFlag {}

export class Wall extends Entity {
  public normal: Vector3
  constructor(transform: Transform, normal: Vector3, color: Color3, parent: Entity) {
    super()
    engine.addEntity(this)
    this.addComponent(transform)
    this.addComponent(new WallFlag())
    this.addComponent(new CollisionFlag())
    this.addComponent(new BoxShape())
    this.addComponent(new Material())
    this.normal = normal
    this.getComponent(Material).albedoColor = color
    this.setParent(parent)
  }
}
