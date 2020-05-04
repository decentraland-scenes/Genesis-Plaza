export {}

declare global {
  interface Entity {
    getGlobalPosition(): Vector3
    setGlobalPosition(position: Vector3)
    getGlobalRotation(): Quaternion
    setGlobalRotation(rotation: Quaternion)
    getGlobalScale(): Vector3
    setGlobalScale(scale: Vector3)
    globalForward(): Vector3
    globalRight(): Vector3
    globalUp(): Vector3
  }
}

Entity.prototype.getGlobalPosition = function (this: Entity) {
  let entityPosition = this.hasComponent(Transform)
    ? this.getComponent(Transform).position.clone()
    : Vector3.Zero()
  let parentEntity = this.getParent() as Entity

  if (parentEntity != null) {
    let parentRotation = parentEntity.hasComponent(Transform)
      ? parentEntity.getComponent(Transform).rotation
      : Quaternion.Identity
    return parentEntity
      .getGlobalPosition()
      .add(entityPosition.rotate(parentRotation))
  }

  return entityPosition
}

Entity.prototype.setGlobalPosition = function (
  this: Entity,
  position: Vector3
) {
  let transform = this.getComponent(Transform)

  if (transform != null) {
    let parentEntity = this.getParent() as Entity
    if (parentEntity != null) {
      let parentOffset = position.subtract(parentEntity.getGlobalPosition())
      transform.position = DivVectors(
        parentOffset.rotate(
          Quaternion.Inverse(parentEntity.getGlobalRotation())
        ),
        parentEntity.getGlobalScale()
      )
    } else {
      transform.position = position
    }
  }
}

Entity.prototype.getGlobalRotation = function (this: Entity) {
  let entityRotation = this.hasComponent(Transform)
    ? this.getComponent(Transform).rotation.clone()
    : Quaternion.Identity
  let parentEntity = this.getParent() as Entity

  if (parentEntity != null) {
    return parentEntity.getGlobalRotation().multiply(entityRotation)
  }

  return entityRotation
}

Entity.prototype.setGlobalRotation = function (
  this: Entity,
  rotation: Quaternion
) {
  let transform = this.getComponent(Transform)

  if (transform != null) {
    let parentEntity = this.getParent() as Entity
    if (parentEntity != null) {
      transform.rotation = rotation.multiply(
        Quaternion.Inverse(parentEntity.getGlobalRotation())
      )
    } else {
      transform.rotation = rotation
    }
  }
}

Entity.prototype.getGlobalScale = function (this: Entity) {
  let entityScale = this.hasComponent(Transform)
    ? this.getComponent(Transform).scale.clone()
    : Vector3.One()
  let parentEntity = this.getParent() as Entity

  if (parentEntity != null) {
    return parentEntity.getGlobalScale().multiply(entityScale)
  }

  return entityScale
}

Entity.prototype.setGlobalScale = function (this: Entity, scale: Vector3) {
  let transform = this.getComponent(Transform)

  if (transform != null) {
    let parentEntity = this.getParent() as Entity
    if (parentEntity != null) {
      transform.scale = DivVectors(scale, parentEntity.getGlobalScale())
    } else {
      transform.scale = scale
    }
  }
}

Entity.prototype.globalForward = function (this: Entity) {
  return Vector3.Forward().rotate(this.getGlobalRotation())
}

Entity.prototype.globalRight = function (this: Entity) {
  return Vector3.Right().rotate(this.getGlobalRotation())
}

Entity.prototype.globalUp = function (this: Entity) {
  return Vector3.Up().rotate(this.getGlobalRotation())
}

function DivVectors(v1: Vector3, v2: Vector3): Vector3 {
  const ret = new Vector3()
  ret.x = v2.x != 0 ? v1.x / v2.x : 0
  ret.y = v2.y != 0 ? v1.y / v2.y : 0
  ret.z = v2.z != 0 ? v1.z / v2.z : 0
  return ret
}
