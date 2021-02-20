

// Limo
export const limo = new Entity()
limo.addComponent(new GLTFShape("models/bday/limo.glb"))
limo.addComponent(new Transform({
  position: new Vector3(245, 0,204.5),
  rotation: Quaternion.Euler(0, -10, 0),
  scale: new Vector3(1.0, 1.0, 1.0)
}))
engine.addEntity(limo)
