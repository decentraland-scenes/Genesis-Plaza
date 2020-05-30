import utils from '../../node_modules/decentraland-ecs-utils/index'

export function addScreen() {
  const e = new Entity()
  e.addComponent(new PlaneShape())
  e.addComponent(
    new Transform({
      position: new Vector3(285, 17.5, 279),
      rotation: Quaternion.Euler(0, 210, 0), //new Quaternion(-0.7259005, 0.2195348, -0.5940643, 0.2682545),
      scale: new Vector3(10 * 2.8, 5.6 * 2.8, 10 * 2.8),
    })
  )
  e.getComponent(Transform).rotate(new Vector3(1, 0, 0), 10)
  const v = new VideoTexture(
    new VideoClip(
      'https://d30idbgta48n0w.cloudfront.net/out/v1/ee8d53ef3dff41169b3ea7a8793b54cc/index.m3u8'
    )
  )
  const mat = new Material()
  mat.albedoTexture = v
  mat.specularIntensity = 0
  mat.roughness = 1

  e.addComponent(mat)
  engine.addEntity(e)

  const videoTrigger = new Entity()
  videoTrigger.addComponent(
    new Transform({ position: new Vector3(270, 5, 255) })
  )

  let videoTriggerBox = new utils.TriggerBoxShape(
    new Vector3(90, 14, 90),
    Vector3.Zero()
  )
  videoTrigger.addComponent(
    new utils.TriggerComponent(
      videoTriggerBox, //shape
      0, //layer
      0, //triggeredByLayer
      null, //onTriggerEnter
      null, //onTriggerExit
      () => {
        v.playing = true
        log('triggered!')
      },
      () => {
        v.playing = false
        log('triggered!')
      }, //onCameraExit
      false
    )
  )
  engine.addEntity(videoTrigger)
}
