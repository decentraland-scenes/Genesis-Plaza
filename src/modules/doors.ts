import * as utils from '@dcl/ecs-scene-utils'
import { sceneMessageBus } from './serverHandler'

/// Reusable class for all platforms
export class Door extends Entity {
  model: GLTFShape
  animationOpen1: AnimationState
  animationClose1: AnimationState
  animationOpen2: AnimationState
  animationClose2: AnimationState
  isOpen: boolean = false
  isPlayerIn: boolean = false

  constructor(
    model: GLTFShape,
    doorPos: TranformConstructorArgs,
    triggerPos: TranformConstructorArgs,
    triggerScale: Vector3,
    animationOpen1: string,
    animationOpen2: string,
    animationClose1: string,
    animationClose2: string,
    messageBusHandle: string
  ) {
    super()
    engine.addEntity(this)

    this.addComponent(model)
    this.addComponent(new Transform(doorPos))

    this.addComponent(new Animator())

    this.animationOpen1 = new AnimationState(animationOpen1, { looping: false })
    this.getComponent(Animator).addClip(this.animationOpen1)

    this.animationClose1 = new AnimationState(animationClose1, {
      looping: false,
    })
    this.getComponent(Animator).addClip(this.animationClose1)

    this.animationOpen2 = new AnimationState(animationOpen2, { looping: false })
    this.getComponent(Animator).addClip(this.animationOpen2)

    this.animationClose2 = new AnimationState(animationClose2, {
      looping: false,
    })
    this.getComponent(Animator).addClip(this.animationClose2)

    const triggerEntity = new Entity()
    triggerEntity.addComponent(new Transform(triggerPos))

    let triggerBox = new utils.TriggerBoxShape(triggerScale, Vector3.Zero())

    triggerEntity.addComponent(
      new utils.TriggerComponent(
        triggerBox, //shape
        {
          onCameraEnter: () => {
            log('open door')
            this.isPlayerIn = true
            sceneMessageBus.emit(messageBusHandle, { open: true })
          },
          onCameraExit: () => {
            log('close door')
            this.isPlayerIn = false
            sceneMessageBus.emit(messageBusHandle, { open: false })
          },
          //enableDebug: true,
        }
      )
    )
    engine.addEntity(triggerEntity)

    // this.animationClose1.stop()
    // this.animationClose2.stop()
    // this.animationOpen1.stop()
    // this.animationOpen2.stop()
  }

  public open(): void {
    if (this.isOpen) return
    this.animationClose1.stop()
    this.animationClose2.stop()
    this.animationOpen1.stop()
    this.animationOpen2.stop()

    this.animationOpen1.play()
    this.animationOpen2.play()

    this.isOpen = true
  }

  public close(): void {
    if (!this.isOpen || this.isPlayerIn) return
    this.animationOpen1.stop()
    this.animationOpen2.stop()
    this.animationClose1.stop()
    this.animationClose2.stop()

    this.animationClose1.play()
    this.animationClose2.play()
    this.isOpen = false
  }
}

export function placeDoors() {
  let main_door = new Door(
    new GLTFShape('models/core_building/Door_Entrance.glb'),
    { rotation: Quaternion.Euler(0, 180, 0) },
    { position: new Vector3(160, 2, 126) },
    new Vector3(16, 8, 6),
    'DoorRight_Open',
    'DoorLeft_Open',
    'DoorRight_Close',
    'DoorLeft_Close',
    'mainDoor'
  )

  sceneMessageBus.on('mainDoor', (e) => {
    if (e.open) {
      main_door.open()
    } else {
      main_door.close()
    }
  })

  let right_door = new Door(
    new GLTFShape('models/core_building/EntranceRight.glb'),
    { rotation: Quaternion.Euler(0, 180, 0) },
    { position: new Vector3(186, 2, 153) },
    new Vector3(6, 8, 16),
    'EntranceRight_DoorRight_Open',
    'EntranceRight_DoorLeft_Open',
    'EntranceRight_DoorRight_Close',
    'EntranceRight_DoorLeft_Close',
    'rightDoor'
  )

  sceneMessageBus.on('rightDoor', (e) => {
    if (e.open) {
      right_door.open()
    } else {
      right_door.close()
    }
  })

  let left_door = new Door(
    new GLTFShape('models/core_building/EntranceLeft.glb'),
    { rotation: Quaternion.Euler(0, 180, 0) },
    { position: new Vector3(135, 2, 153) },
    new Vector3(6, 8, 16),
    'EntranceLeft_DoorRight_Open',
    'EntranceLeft_DoorLeft_Open',
    'EntranceLeft_DoorRight_Close',
    'EntranceLeft_DoorLeft_Close',
    'leftDoor'
  )

  sceneMessageBus.on('leftDoor', (e) => {
    if (e.open) {
      left_door.open()
    } else {
      left_door.close()
    }
  })
}
