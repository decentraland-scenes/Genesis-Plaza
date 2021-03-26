import { CollisionFlag } from "../gameLogic/collision"

@Component("brickFlag")
export class BrickFlag {}

export class Brick extends Entity {
  constructor(transform: Transform, color: Color3, parent: Entity) {
    super()
    engine.addEntity(this)
    this.addComponent(transform)
    this.addComponent(new BrickFlag())
    this.addComponent(new CollisionFlag())
    this.addComponent(new BoxShape())
    this.addComponent(new Material())
    this.getComponent(Material).albedoColor = color
    this.getComponent(Material).emissiveColor = color
    this.getComponent(Material).emissiveIntensity = 0.95
    this.setParent(parent)
  }
}
