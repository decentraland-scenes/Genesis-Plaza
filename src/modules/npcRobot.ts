import utils from "../../node_modules/decentraland-ecs-utils/index"

// For dialog windows
export enum RobotID {
  Main = 0,
  Shell = 1,
  Agora = 2,
  Garden = 3,
  Trade = 4,
  Artichoke = 5,
  Whale = 6,
}

export class Robot extends Entity {
  public robotID: RobotID

  constructor(
    robotModel: GLTFShape,
    robotTransform: Transform,
    robotID: RobotID,
    robotSound: AudioClip
  ) {
    super()
    engine.addEntity(this)
    this.addComponent(robotModel)
    this.addComponent(robotTransform)
    this.robotID = robotID

    // Sound
    this.addComponent(new AudioSource(robotSound))

    // Animations
    this.addComponent(new Animator())

    this.getComponent(Animator).addClip(
      new AnimationState("Idle", { looping: true })
    )

    this.getComponent(Animator).addClip(
      new AnimationState("Talk", { looping: true })
    )

    this.getComponent(Animator).getClip("Idle").play()

    this.getComponent(Animator).addClip(
      new AnimationState("Hello", { looping: false })
    )

    this.getComponent(Animator).addClip(
      new AnimationState("Goodbye", { looping: false })
    )

    this.getComponent(Animator).getClip("Idle").play()
  }

  public playIdle(): void {
    this.stopAnimations()
    this.getComponent(Animator).getClip("Idle").play()
  }

  public playTalk(): void {
    this.stopAnimations()
    this.getComponent(Animator).getClip("Talk").play()
  }

  public playHello(): void {
    this.stopAnimations()
    this.getComponent(Animator).getClip("Hello").play()
    this.addComponentOrReplace(
      new utils.Delay(2000, () => {
        this.stopAnimations()
        this.getComponent(Animator).getClip("Talk").play()
      })
    )
  }

  public playGoodbye(): void {
    this.stopAnimations()
    this.getComponent(Animator).getClip("Goodbye").play()
    this.addComponentOrReplace(
      new utils.Delay(2000, () => {
        this.stopAnimations()
        this.getComponent(Animator).getClip("Idle").play()
      })
    )
  }

  private stopAnimations(): void {
    this.getComponent(Animator).getClip("Idle").stop()
    this.getComponent(Animator).getClip("Talk").stop()
    this.getComponent(Animator).getClip("Hello").stop()
    this.getComponent(Animator).getClip("Goodbye").stop()
  }
}
