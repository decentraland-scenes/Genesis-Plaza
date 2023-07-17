
import * as utils from '@dcl/ecs-scene-utils'

//const videoClip = new VideoClip("https://player.vimeo.com/external/843206751.m3u8?s=ad9e81b120faa9fa68506ed337e6095ac1de3f78")
const videoClip = new VideoClip("https://video.dcl.guru/live/djtrax/index.m3u8")

const videoTexture = new VideoTexture(videoClip)
videoTexture.loop = true
videoTexture.playing = false

const screenMaterial = new Material()
screenMaterial.albedoTexture = videoTexture
screenMaterial.emissiveTexture = videoTexture
screenMaterial.emissiveColor = Color3.White()
screenMaterial.emissiveIntensity = 0.8
screenMaterial.specularIntensity = 0
screenMaterial.roughness = 1
screenMaterial.metallic = 0

const screen1 = new Entity()
screen1.addComponent(new PlaneShape())
screen1.addComponent(
    new Transform({
        position: new Vector3(160.007, 3.88876, 173.449),
        rotation: Quaternion.Euler(0, 180, 0),
        scale: new Vector3(11.0332, 5.53546, 1)
    })
)
screen1.addComponent(screenMaterial)
engine.addEntity(screen1)

//screen1.addComponent(new OnPointerDown(() => {
//}, {
//}))


const triggerEntity = new Entity()
triggerEntity.addComponent(new Transform({
    position: new Vector3(160, 10, 155)
}))
let triggerBox = new utils.TriggerBoxShape(new Vector3(50, 25, 50), new Vector3(0, 0, 0))

triggerEntity.addComponent(
    new utils.TriggerComponent(
        triggerBox, //shape
        {
            onCameraEnter: () => {
                videoTexture.playing = true
            },

            onCameraExit: () => {
                videoTexture.playing = false
            },
            enableDebug: false
        }
    )
)
engine.addEntity(triggerEntity)
