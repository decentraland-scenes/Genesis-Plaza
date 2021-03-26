const background = new Entity()
export class Background extends Entity {
  constructor(transform: Transform, parent: Entity) {
    super()
    this.addComponent(transform)
    this.addComponent(new BoxShape())
    this.addComponent(new Material())
    this.getComponent(Material).albedoColor = Color3.Black()
    this.getComponent(Material).roughness = 0.9
    this.setParent(parent)
  }
}
