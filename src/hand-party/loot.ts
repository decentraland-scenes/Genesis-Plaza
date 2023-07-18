import * as utils from "@dcl/ecs-scene-utils"

let lootBox = new Entity()

lootBox.addComponent(new GLTFShape("models/clapmeter/loot2.glb"))
    .visible = false
engine.addEntity(lootBox)

lootBox.addComponent(new Transform({
    position: new Vector3(154.5, 0.75, 168),
    rotation: Quaternion.Euler(0, 180 - 37.5, 0),
    scale: new Vector3(2, 2, 2)
}))
//lootBox.addComponent(new utils.KeepRotatingComponent(Quaternion.Euler(0, 30, 0)))

// Create animator component
let animator = new Animator()
lootBox.addComponent(animator)

const LootAppear = new AnimationState("LootAppear", { layer: 2 })

animator.addClip(LootAppear)

LootAppear.looping = false

function lootAppear() {
    lootBox.getComponent(GLTFShape).visible = true
    LootAppear.play(true)
}

export const loot = {
    entity: lootBox,
    lootAppear: lootAppear
}