let models = new Entity()
models.addComponent(new GLTFShape("models/Genesis.glb"))
models.addComponent(new Transform({
	position: new Vector3(0, 0, 0),
	scale: new Vector3(1, 1, 1),
	rotation: Quaternion.Euler(0, 180, 0)
}
))

engine.addEntity(models)

//add Artichoke_Elevator
let Artichoke_Elevator = new Entity()
Artichoke_Elevator.addComponent(new GLTFShape("models/L'architoque_Elevator.glb"))
Artichoke_Elevator.addComponent(new Transform({
	rotation: Quaternion.Euler(0, 180, 0)
}
))
engine.addEntity(Artichoke_Elevator)

//add MoonTower_Action_Cosmos
let MoonTower_Action_Cosmos = new Entity()
MoonTower_Action_Cosmos.addComponent(new GLTFShape("models/MoonTower_Action_Cosmos.glb"))
MoonTower_Action_Cosmos.addComponent(new Transform({
	rotation: Quaternion.Euler(0, 180, 0)
}
))
engine.addEntity(MoonTower_Action_Cosmos)

//add MoonTower_Action_Moon
let MoonTower_Action_Moon = new Entity()
MoonTower_Action_Moon.addComponent(new GLTFShape("models/MoonTower_Action_Moon.glb"))
MoonTower_Action_Moon.addComponent(new Transform({
	rotation: Quaternion.Euler(0, 180, 0)
}
))
engine.addEntity(MoonTower_Action_Moon)

//add MoonTower_Action_Ringu
let MoonTower_Action_Ringu = new Entity()
MoonTower_Action_Ringu.addComponent(new GLTFShape("models/MoonTower_Action_Ringu.glb"))
MoonTower_Action_Ringu.addComponent(new Transform({
	rotation: Quaternion.Euler(0, 180, 0)
}
))
engine.addEntity(MoonTower_Action_Ringu)

//add TheWhale_Action_Elevator
let TheWhale_Action_Elevator = new Entity()
TheWhale_Action_Elevator.addComponent(new GLTFShape("models/TheWhale_Action_Elevator.glb"))
TheWhale_Action_Elevator.addComponent(new Transform({
	rotation: Quaternion.Euler(0, 180, 0)
}
))
engine.addEntity(TheWhale_Action_Elevator)

//add TheWhale_Action_Sculpture
let TheWhale_Action_Sculpture = new Entity()
TheWhale_Action_Sculpture.addComponent(new GLTFShape("models/TheWhale_Action_Sculpture.glb"))
TheWhale_Action_Sculpture.addComponent(new Transform({
	rotation: Quaternion.Euler(0, 180, 0)
}
))
engine.addEntity(TheWhale_Action_Sculpture)

//add Gallery_action_Moebius
let Gallery_action_Moebius = new Entity()
Gallery_action_Moebius.addComponent(new GLTFShape("models/Gallery_action_Moebius.glb"))
Gallery_action_Moebius.addComponent(new Transform({
	rotation: Quaternion.Euler(0, 180, 0)
}
))
engine.addEntity(Gallery_action_Moebius)

//add Core_Action_Spawmpoint
let Core_Action_Spawmpoint = new Entity()
Core_Action_Spawmpoint.addComponent(new GLTFShape("models/Core_Action_Spawmpoint.glb"))
Core_Action_Spawmpoint.addComponent(new Transform({
	rotation: Quaternion.Euler(0, 180, 0)
}
))
engine.addEntity(Core_Action_Spawmpoint)



