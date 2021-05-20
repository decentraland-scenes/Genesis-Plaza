import * as utils from '@dcl/ecs-scene-utils'
export class VideoScreen extends Entity {
  texture: VideoTexture
  constructor(
    screenPos: TranformConstructorArgs,
    triggerPos: TranformConstructorArgs,
    triggerScale: Vector3,
    streamURL: string,
    loop?: boolean
  ) {
    super()
    engine.addEntity(this)

    this.addComponent(new PlaneShape())
    this.addComponent(new Transform(screenPos))

    this.addComponent(new Animator())

    this.texture = new VideoTexture(new VideoClip(streamURL))
    this.texture.playing = false
    if (loop) {
      this.texture.loop = true
    }
    const mat = new Material()
    mat.albedoTexture = this.texture
    mat.specularIntensity = 0
    mat.roughness = 1
    mat.metallic = 0

    // Brighten up the screen for night time events
    // mat.emissiveTexture = this.texture
    // mat.emissiveColor = Color3.White()
    // mat.emissiveIntensity = 1

    this.addComponent(mat)

    const triggerEntity = new Entity()
    triggerEntity.addComponent(new Transform(triggerPos))

    let triggerBox = new utils.TriggerBoxShape(triggerScale, Vector3.Zero())

    triggerEntity.addComponent(
      new utils.TriggerComponent(
        triggerBox, //shape
        {
          onCameraEnter: () => {
            this.activate()
          },

          onCameraExit: () => {
            this.deactivate()
          },
        }
      )
    )
    engine.addEntity(triggerEntity)
  }

  public activate(): void {
    this.texture.playing = true
  }
  public deactivate(): void {
    this.texture.playing = false
  }
}

export function addScreen() {
  const screen1 = new VideoScreen(
    {
      position: new Vector3(285, 17.5, 279),
      rotation: Quaternion.Euler(0, 210, 0),
      scale: new Vector3(10 * 2.8, 5.6 * 2.8, 10 * 2.8),
    },
    { position: new Vector3(270, 5, 255) },
    new Vector3(90, 90, 90),
    'https://player.vimeo.com/external/552481870.m3u8?s=c312c8533f97e808fccc92b0510b085c8122a875',
    true
  )

  screen1.getComponent(Transform).rotate(new Vector3(1, 0, 0), 10)
}
