import { Reward } from './loot'
import { updateProgression } from './progression'
import { quest } from './quest'

export class TrashBin extends Entity {
  openClip = new AudioClip('sounds/halloween/open.mp3')
  closeClip = new AudioClip('sounds/halloween/close.mp3')
  enabled: boolean = false

  toggle(value: boolean) {
    const source = new AudioSource(value ? this.openClip : this.closeClip)
    this.addComponentOrReplace(source)
    source.playing = true

    const animator = this.getComponent(Animator)
    const openClip = animator.getClip('open')
    const closeClip = animator.getClip('close')
    openClip.stop()
    closeClip.stop()
    const clip = value ? openClip : closeClip
    clip.play()
  }

  constructor(position: TranformConstructorArgs) {
    super()
    this.addComponent(new GLTFShape('models/halloween/TrashBin.glb'))
    this.addComponent(new Transform(position))
    const animator = new Animator()
    const closeClip = new AnimationState('close', { looping: false })
    const openClip = new AnimationState('open', { looping: false })
    animator.addClip(closeClip)
    animator.addClip(openClip)
    this.addComponent(animator)
    openClip.stop()

    this.addComponent(
      new OnPointerDown(() => {
        this.toggle(true)

        if (this.enabled) {
          log('found wearable!')
          this.enabled = false
          quest.checkBox(4)
          updateProgression('w1Found')
          let r = new Reward(
            this,
            'w1',
            {
              position: new Vector3(0, 2, 0),
            },
            false
          )
        }
      })
    )

    engine.addEntity(this)
  }
}