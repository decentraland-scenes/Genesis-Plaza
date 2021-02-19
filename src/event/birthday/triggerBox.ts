let debugMat = new Material()

debugMat.albedoColor = Color4.FromHexString('66000066')
debugMat.transparencyMode = 2

export class TriggerBox extends Entity {
  fired: boolean = false
  sizeX: number = 1
  sizeY: number = 1
  sizeZ: number = 1
  visible: boolean = false
  position: Vector3 = new Vector3()

  areaXMin: number = 0
  areaXMax: number = 0

  areaYMin: number = 0
  areaYMax: number = 0

  areaZMin: number = 0
  areaZMax: number = 0

  constructor(_pos: Vector3, _size: Vector3) {
    super()
    this.position.copyFrom(_pos)
    this.sizeX = _size.x
    this.sizeY = _size.y
    this.sizeZ = _size.z

    this.areaXMin = _pos.x - this.sizeX / 2
    this.areaXMax = _pos.x + this.sizeX / 2

    this.areaYMin = _pos.y
    this.areaYMax = _pos.y + this.sizeY

    this.areaZMin = _pos.z - this.sizeZ / 2
    this.areaZMax = _pos.z + this.sizeZ / 2

    this.addComponent(
      new Transform({
        position: _pos,
        scale: new Vector3(this.sizeX, this.sizeY, this.sizeZ),
      })
    )

    // this.addComponent(new BoxShape())
    // let boxShape = new BoxShape()
    // let debugBox = new Entity()
    // boxShape.withCollisions = false

    // debugBox.addComponent(boxShape)
    // debugBox.addComponent(debugMat)
    // debugBox.addComponent(new Transform({position:new Vector3(this.position.x, this.position.y + this.sizeY/2, this.position.z),
    // scale:new Vector3(this.sizeX, this.sizeY, this.sizeZ)}))
    // engine.addEntity(debugBox)
  }
  updatePosition() {
    this.position.copyFrom(this.getComponent(Transform).position)

    this.areaXMin = this.position.x - this.sizeX / 2
    this.areaXMax = this.position.x + this.sizeX / 2

    this.areaYMin = this.position.y
    this.areaYMax = this.position.y + this.sizeY

    this.areaZMin = this.position.z - this.sizeZ / 2
    this.areaZMax = this.position.z + this.sizeZ / 2
  }

  collide(pos: Vector3): boolean {
    //log("check collide: " + pos + " - " + this.position)
    const worldPos = this.getComponent(Transform).position

    if (
      pos.x > this.areaXMin &&
      pos.x < this.areaXMax &&
      pos.y > this.areaYMin &&
      pos.y < this.areaYMax &&
      pos.z > this.areaZMin &&
      pos.z < this.areaZMax
    ) {
      if (!this.fired) {
        //log("Box Zone Triggered!")
        this.fired = true
        return true
      }
    } else {
      this.fired = false
      return false
    }
  }
}
