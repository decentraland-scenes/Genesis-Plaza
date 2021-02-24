import * as utils from '@dcl/ecs-scene-utils'
import { sceneMessageBus } from 'src/modules/serverHandler'
import { handlePoap } from './poapHandler'

export class POAPDispenser extends Entity {
  idleAnim = new AnimationState('Idle_POAP', { looping: true })
  buyAnim = new AnimationState('Action_POAP', { looping: false })
  buttonAnim = new AnimationState('Button_Action', { looping: false })
  eventName: string
  constructor(transform: TransformConstructorArgs, eventName: string) {
    super()
    engine.addEntity(this)

    this.addComponent(new GLTFShape('models/poap/POAP_dispenser.glb'))
    this.addComponent(new Transform(transform))

    this.addComponent(new Animator())
    this.getComponent(Animator).addClip(this.idleAnim)
    this.getComponent(Animator).addClip(this.buyAnim)
    this.idleAnim.play()

    this.eventName = eventName

    let button = new Entity()
    button.addComponent(new GLTFShape('models/poap/POAP_button.glb'))
    button.addComponent(new Animator())
    button.getComponent(Animator).addClip(this.buttonAnim)
    button.setParent(this)
    button.addComponent(
      new OnPointerDown(
        (e) => {
          button.getComponent(Animator).getClip('Action').stop()
          button.getComponent(Animator).getClip('Action').play()
          sceneMessageBus.emit('activatePoap', {})
          handlePoap(eventName)
        },
        { hoverText: 'Get Attendance Token' }
      )
    )
    engine.addEntity(button)
  }

  public activate(): void {
    let anim = this.getComponent(Animator)

    anim.getClip('Idle_POAP').stop()
    anim.getClip('Action_POAP').stop()

    anim.getClip('Action_POAP').play()

    this.addComponentOrReplace(
      new utils.Delay(4000, () => {
        anim.getClip('Action_POAP').stop()

        anim.getClip('Idle_POAP').play()
      })
    )
  }
}
