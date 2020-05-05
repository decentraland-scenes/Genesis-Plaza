import { openTeleportUI, screenSpaceUI, updateOpenUITime } from './ui'

export enum Locations {
  CROWD = 'crowd',
  MAGIC = 'magic',
  KOKO = '-39,58',
  SALMONOMICON = '-55,1',
  DRAGONRUSH = '-43,53',
  MUSEUM = '16,83',
  TOMBCHASER = '12,46',
  BLOCK = '61,-27',
  FRUIT = '59,133',
  CASTLE = '-134,-121',
  INFINITY = '-71,-38',
  MOLES = '-71,-71', /// NEED REAL LOCATION
  PRESENT = '-40,-49',
  CASINO = '-55,144',
}

declare const dcl: any

export class Teleport extends Entity {
  model: GLTFShape
  location: Locations
  name: string
  screenshot: string
  description: string
  constructor(
    model: GLTFShape,
    transform: TranformConstructorArgs,
    location: Locations,
    name: string,
    description: string,
    screenshot: string
  ) {
    super()
    engine.addEntity(this)

    this.addComponent(model)
    this.addComponent(new Transform(transform))

    this.name = name
    this.location = location
    this.description = description
    this.screenshot = screenshot

    let thisTeleport = this

    this.addComponent(
      new OnPointerDown(
        async function () {
          openTeleportUI(thisTeleport)
        },
        { hoverText: this.name }
      )
    )

    let Particles = new Entity()
    Particles.addComponent(new GLTFShape('models/Particles.glb'))
    Particles.addComponent(
      new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
      })
    )
    Particles.setParent(this)
  }

  public travel(): void {
    let message = '/goto '.concat(this.location).concat('\n').toString()
    //let message = '/goto crowd\n'
    log(message)

    dcl.loadModule('@decentraland/ChatController').then(($: any) => {
      dcl.callRpc($.rpcHandle, 'send', [message])
    })
  }
}
