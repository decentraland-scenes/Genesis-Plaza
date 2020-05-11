import utils from "../node_modules/decentraland-ecs-utils/index"

export default {
  sounds: {
    robot: new AudioClip("sounds/robot.mp3"),
  },
  models: {
    standard: {
      baseScene: new GLTFShape("models/standard/baseScene.glb"),
    },
    robots: {
      alice: new GLTFShape("models/robots/alice.gltf"),
      bela: new GLTFShape("models/robots/bela.gltf"),
      betty: new GLTFShape("models/robots/betty.gltf"),
      bob: new GLTFShape("models/robots/bob.gltf"),
      charlie: new GLTFShape("models/robots/charlie.gltf"),
      marsha: new GLTFShape("models/robots/marsha.gltf"),
      ron: new GLTFShape("models/robots/ron.gltf"),
      rings: new GLTFShape("models/robots/rings.gltf"),
    },
  },
  textures: {
    blank: new Texture("images/ui/blank.png"),
    buttonE: new Texture("images/ui/buttonE.png"),
    buttonF: new Texture("images/ui/buttonF.png"),
    leftClickIcon: new Texture("images/ui/leftClickIcon.png"),
    textPanel: new Texture("images/ui/textPanel.png"),
  },
  trigger: {
    triggerShape: new utils.TriggerSphereShape(5, Vector3.Zero()) // Trigger sphere with a radius of 4m
  },
}
