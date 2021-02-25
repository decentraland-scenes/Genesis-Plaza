// Static decor
const sureBandBanner = new Entity()
sureBandBanner.addComponent(new GLTFShape("models/lantern-festival/sureBandBanner.glb"))
sureBandBanner.addComponent(new Transform({ rotation: Quaternion.Euler(0, 180, 0)}))
engine.addEntity(sureBandBanner)

// Confetti floor
const confettiFloor = new Entity()
confettiFloor.addComponent(new GLTFShape("models/lantern-festival/confettiFloor.glb"))
confettiFloor.addComponent(new Transform({ rotation: Quaternion.Euler(0, 180, 0)}))
engine.addEntity(confettiFloor)

// Standing banners
const standingBanners = new Entity()
standingBanners.addComponent(new GLTFShape("models/lantern-festival/standingBanners.glb"))
engine.addEntity(standingBanners)

// Vrglit.ch
const bubbleShape = new GLTFShape("models/lantern-festival/vrglitch/bubbles.glb")

const bubbles = new Entity()
engine.addEntity(bubbles)
bubbles.addComponent(bubbleShape)
bubbles.addComponent(
  new Transform({
    position: new Vector3(275, 0, 11.5 + 258),
    rotation: new Quaternion(0, 0, 0, 1),
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

const bubbles2 = new Entity("bubbles2")
engine.addEntity(bubbles2)
bubbles2.addComponent(bubbleShape)
bubbles2.addComponentOrReplace(
  new Transform({
    position: new Vector3(275, 0, 4 + 258),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(0.5, 0.5, 0.5),
  })
)