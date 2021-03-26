import { CollisionFlag } from "../gameLogic/collision"

@Component("paddleFlag")
export class PaddleFlag {}

export class Paddle extends Entity {
  constructor(transform: Transform, color: Color3, parent: Entity) {
    super()
    engine.addEntity(this)
    this.addComponent(transform)
    this.addComponent(new PaddleFlag())
    this.addComponent(new CollisionFlag())
    this.addComponent(new BoxShape())
    this.addComponent(new Material())
    this.getComponent(Material).albedoColor = color
    this.setParent(parent)
  }
}
