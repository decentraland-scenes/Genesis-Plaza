import utils from "../node_modules/decentraland-ecs-utils/index"

export default {
  sounds: {
    alice: new AudioClip("sounds/alice.mp3"),
    bela: new AudioClip("sounds/bela.mp3"),
    betty: new AudioClip("sounds/betty.mp3"),
    bob: new AudioClip("sounds/bob.mp3"),
    charlie: new AudioClip("sounds/charlie.mp3"),
    marsha: new AudioClip("sounds/marsha.mp3"),
    ron: new AudioClip("sounds/ron.mp3"),
    navigationForward: new AudioClip("sounds/navigationForward.mp3"),
    navigationBackward: new AudioClip("sounds/navigationBackward.mp3"),
  },
  models: {
    standard: {
      baseScene: new GLTFShape("models/standard/baseScene.glb"),
    },
    robots: {
      alice: new GLTFShape("models/robots/alice.glb"),
      bela: new GLTFShape("models/robots/bela.glb"),
      betty: new GLTFShape("models/robots/betty.glb"),
      bob: new GLTFShape("models/robots/bob.glb"),
      charlie: new GLTFShape("models/robots/charlie.glb"),
      marsha: new GLTFShape("models/robots/marsha.glb"),
      ron: new GLTFShape("models/robots/ron.glb"),
      rings: new GLTFShape("models/robots/rings.glb"),
    },
  },
  textures: {
    blank: new Texture("images/ui/blank.png"),
    buttonE: new Texture("images/ui/buttonE.png"),
    buttonF: new Texture("images/ui/buttonF.png"),
    leftClickIcon: new Texture("images/ui/leftClickIcon.png"),
    textPanel: new Texture("images/ui/textPanel.png"),
    nftPanel: new Texture("images/ui/nftPanel.png"),
    closeButton: new Texture("images/ui/closeButton.png"),
    placeholder: new Texture("images/ui/placeholder.png"),
  },
  trigger: {
    triggerShape: new utils.TriggerSphereShape(8, Vector3.Zero()), // Trigger sphere with a radius of 8m
  },
}
