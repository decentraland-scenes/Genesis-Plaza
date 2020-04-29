//import { openUI1 } from './ui'
//import utils from '../node_modules/decentraland-ecs-utils/index'
//import { sceneMessageBus } from './game'

export class Wearable extends Entity {
  wearableName: string
  model: GLTFShape
  buttonAnim = new AnimationState('Action', { looping: false })
  id: string
  constructor(
    model: GLTFShape,
    transform: TranformConstructorArgs,
    wearableName: string
  ) {
    super()
    engine.addEntity(this)

    this.addComponent(model)
    this.addComponent(new Transform(transform))

    this.addComponent(new Animator())

    let collider = new Entity()
    collider.addComponent(new GLTFShape('models/machine-collider.glb'))
    collider.setParent(this)

    this.addComponent(
      new OnPointerDown(
        (e) => {
          // openUI1(wearableName, this)
        },
        { hoverText: 'Donate' }
      )
    )

    // let standParticles = new Entity()
    // standParticles.addComponent(new GLTFShape('models/particles.glb'))
    // standParticles.setParent(this)
    // engine.addEntity(standParticles)

    //this.addComponent(new AudioSource(sound))
  }

  //   public buy(): void {
  //     let anim = this.getComponent(Animator)

  //     anim.getClip('idle').stop()
  //     anim.getClip('buy').stop()
  //     anim.getClip('new_mask').stop()

  //     anim.getClip('buy').play()

  //     this.addComponentOrReplace(
  //       new utils.Delay(4000, () => {
  //         anim.getClip('buy').stop()
  //         //anim.getClip('new_mask').play()
  //         anim.getClip('idle').play()
  //         // this.addComponentOrReplace(
  //         //   new utils.Delay(1000, () => {
  //         //     anim.getClip('new_mask').stop()
  //         //     this.idleAnim.play()

  //         //   })
  //         // )
  //       })
  //     )
  //   }
}
