import * as utils from '@dcl/ecs-scene-utils'
import { TriggerBoxShape } from '@dcl/npc-scene-utils'
export const sceneMessageBus = new MessageBus()

export let keys: PianoKey[] = []

export class PianoKey extends Entity {
  material: Material = new Material()
  onColor: Color3 = new Color3(1.75, 1.25, 0.0) // Orange glow
  offColor: Color3 = Color3.Black() // To zero out emissive
  note: number

  constructor(
    shape: PlaneShape,
    transform: Transform,
    color: Color3,
    sound: AudioClip,
    trigger: TriggerBoxShape,
    note: number
  ) {
    super()
    engine.addEntity(this)
    this.addComponent(shape)
    this.addComponent(transform)
    this.material.albedoColor = color
    this.material.metallic = 0.0
    this.material.roughness = 1.0
    this.addComponent(this.material)

    // note ID
    this.note = note

    // Sound
    this.addComponent(new AudioSource(sound))

    // Create trigger
    this.addComponent(
      new utils.TriggerComponent(
        trigger, //shape
        {
          onCameraEnter: () => {
            sceneMessageBus.emit('noteOn', { note: this.note })
          },
          onCameraExit: () => {
            sceneMessageBus.emit('noteOff', { note: this.note })
          }
        }
      )
    )
  }
  public play(): void {
    this.getComponent(AudioSource).playOnce()
    this.material.emissiveColor = this.onColor
  }
  public end(): void {
    this.material.emissiveColor = this.offColor
  }
}

export function addKeyListeners() {
  sceneMessageBus.on('noteOn', (e) => {
    keys[e.note].play()
  })

  sceneMessageBus.on('noteOff', (e) => {
    keys[e.note].end()
  })
}
