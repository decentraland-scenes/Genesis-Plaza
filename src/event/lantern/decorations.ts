import { Sound } from "./sound"

// Static decor
const staticDecor = new Entity()
staticDecor.addComponent(new GLTFShape("models/lantern-festival/staticDecor.glb"))
engine.addEntity(staticDecor)

// Gong
const gongSound = new Sound(new AudioClip("sounds/gong.mp3"))

const gong = new Entity()
gong.addComponent(new GLTFShape("models/lantern-festival/gong.glb"))
engine.addEntity(gong)
gong.addComponent(new OnPointerDown(() => {
  gongSound.getComponent(AudioSource).playOnce()
}, {
  button: ActionButton.ANY,
  hoverText: "Bang",
  showFeedback: true
}))

// Confetti floor
const confettiFloor = new Entity()
confettiFloor.addComponent(new GLTFShape("models/lantern-festival/confettiFloor.glb"))
confettiFloor.addComponent(new Transform({ rotation: Quaternion.Euler(0, 180, 0) }))
engine.addEntity(confettiFloor)

// Vrglit.ch
const bubbleShape = new GLTFShape("models/lantern-festival/vrglitch/bubbles.glb")

const bubblesA = new Entity()
engine.addEntity(bubblesA)
bubblesA.addComponent(bubbleShape)
bubblesA.addComponent(
  new Transform({
    position: new Vector3(275, 0, 11.5 + 258),
    rotation: Quaternion.Euler(0, 0, 0),
    scale: new Vector3(0.5, 0.5, 0.5),
  })
)

const bubblesB = new Entity()
engine.addEntity(bubblesB)
bubblesB.addComponent(bubbleShape)
bubblesB.addComponent(
  new Transform({
    position: new Vector3(275, 0, 11.5 + 258),
    rotation: Quaternion.Euler(0, 180, 0),
    scale: new Vector3(0.5, 0.5, 0.5),
  })
)

const fishA = new Entity()
engine.addEntity(fishA)
fishA.addComponent(new GLTFShape("models/lantern-festival/vrglitch/fishA.glb"))
const transform4 = fishA.addComponentOrReplace(
  new Transform({
    position: new Vector3(275, 20, 1.5 + 258),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1),
  })
)

const fishB = new Entity()
engine.addEntity(fishB)
fishB.addComponent(new GLTFShape("models/lantern-festival/vrglitch/fishB.glb"))
fishB.addComponentOrReplace(
  new Transform({
    position: new Vector3(275, 20, 14.5 + 258),
    rotation: new Quaternion(6.691670821108589e-15, -1, 1.1920927533992653e-7, -7.450580596923828e-8),
    scale: new Vector3(1, 1, 1),
  })
)

const bubblesC = new Entity("bubbles2")
engine.addEntity(bubblesC)
bubblesC.addComponent(bubbleShape)
bubblesC.addComponentOrReplace(
  new Transform({
    position: new Vector3(275, 0, 4 + 258),
    rotation: Quaternion.Euler(0, 0, 0),
    scale: new Vector3(0.5, 0.5, 0.5),
  })
)
const bubblesD = new Entity("bubbles2")
engine.addEntity(bubblesD)
bubblesD.addComponent(bubbleShape)
bubblesD.addComponentOrReplace(
  new Transform({
    position: new Vector3(275, 0, 4 + 258),
    rotation: Quaternion.Euler(0, 180, 0),
    scale: new Vector3(0.5, 0.5, 0.5),
  })
)

// Sure banner
const sureBandBanner = new Entity()
sureBandBanner.addComponent(new GLTFShape("models/lantern-festival/sureBandBanner.glb"))
sureBandBanner.addComponent(new Transform({ rotation: Quaternion.Euler(0, 180, 0) }))
engine.addEntity(sureBandBanner)
