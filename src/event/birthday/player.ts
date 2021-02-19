export class PlayerState {
    camera: Camera = Camera.instance
    feetPos: Vector3 = Camera.instance.feetPosition
    headPos: Vector3 = Camera.instance.position
  }
  
  export const player = new PlayerState()
  