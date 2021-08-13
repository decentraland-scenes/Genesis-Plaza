import * as utils from '@dcl/ecs-scene-utils'
import { addArcades } from './arcades/arcades'
import { sceneMessageBus } from './serverHandler'
import { addPunchBag } from './interactiveItems'

/// Reusable class for all platforms
export class Platform extends Entity {
  model: GLTFShape
  animation: AnimationState

  constructor(
    model: GLTFShape,
    platformPos: TranformConstructorArgs,
    triggerPos: TranformConstructorArgs,
    triggerScale: Vector3,
    animation: string,
    messageBusHandle: string,
    extraAction?: () => void
  ) {
    super()
    engine.addEntity(this)

    this.addComponent(model)
    this.addComponent(new Transform(platformPos))

    this.addComponent(new Animator())

    this.animation = new AnimationState(animation, { looping: false })
    this.getComponent(Animator).addClip(this.animation)

    const triggerEntity = new Entity()
    triggerEntity.addComponent(new Transform(triggerPos))

    let triggerBox = new utils.TriggerBoxShape(triggerScale, Vector3.Zero())

    triggerEntity.addComponent(
      new utils.TriggerComponent(
        triggerBox, //shape
        {
          onCameraEnter: () => {
            //log('triggered platform')
            sceneMessageBus.emit(messageBusHandle, {})
            if (extraAction) {
              extraAction()
            }
          },
        }
      )
    )
    engine.addEntity(triggerEntity)
  }

  public activate(): void {
    this.animation.play()
  }
}

export function placePlatforms() {
  //ARTICHOKE ELEVATOR

  let artichoke_Elevator = new Platform(
    new GLTFShape("models/L'architoque_Elevator.glb"),
    { rotation: Quaternion.Euler(0, 180, 0) },
    { position: new Vector3(51, 3, 39.5) },
    new Vector3(4, 4, 4),
    "L'architoque_Elevator",
    'artichokeElevatorActivated'
  )

  // WHALE ELEVATOR

  let whale_Elevator = new Platform(
    new GLTFShape('models/TheWhale_Action_Elevator.glb'),
    { rotation: Quaternion.Euler(0, 180, 0) },
    { position: new Vector3(188.5, 3, 236) },
    new Vector3(7, 3, 7),
    'WhaleElevator_Action',
    'whaleElevatorActivated'
  )

  //// MOON TOWER ELEVATOR

  let moonTower_Elevator = new Platform(
    new GLTFShape('models/MoonTower_Action_Elevator.glb'),
    { rotation: Quaternion.Euler(0, 180, 0) },
    { position: new Vector3(48.6, 2.4, 116.6) },
    new Vector3(7, 3, 7),
    'MoonTower_Action_Elevator',
    'moonElevatorActivated'
  )

  ///////  SHELL ELEVATOR

  let shell_elevator = new Platform(
    new GLTFShape('models/shell_elevator.glb'),
    { rotation: Quaternion.Euler(0, 180, 0) },
    {
      position: new Vector3(300.5, 11.3, 120),
      rotation: Quaternion.Euler(0, 45, 0),
    },
    new Vector3(7, 2, 6),
    'TheShell_ElevatorAction',
    'shellElevatorActivated'
  )

  ///////  TRAIN ELEVATOR

  let train_elevator = new Platform(
    new GLTFShape('models/train_elevator.glb'),
    { rotation: Quaternion.Euler(0, 180, 0) },
    {
      position: new Vector3(229.7, 1.3, 143),
      rotation: Quaternion.Euler(0, 45, 0),
    },
    new Vector3(2, 2, 2),
    'TrainElevator_Action',
    'trainElevatorActivated'
  )

  //// BALOOON

  let ballonIsFlying: boolean = false

  let balloon = new Platform(
    new GLTFShape('models/balloon.glb'),
    { rotation: Quaternion.Euler(0, 180, 0) },
    {
      position: new Vector3(80, 2, 181),
      rotation: Quaternion.Euler(0, 45, 0),
    },
    new Vector3(2, 1, 2),
    'Balloon_Action',
    'balloonActivated'
  )

  // TRAIN

  let trainIsMoving: boolean = false

  let train = new Platform(
    new GLTFShape('models/train.glb'),
    { rotation: Quaternion.Euler(0, 180, 0) },
    {
      position: new Vector3(234.5, 7, 143),
      rotation: Quaternion.Euler(0, 45, 0),
    },
    new Vector3(2, 2, 6),
    'Train_Action',
    'trainActivated'
  )

  sceneMessageBus.on('artichokeElevatorActivated', (e) => {
    artichoke_Elevator.activate()
    log('artichoke elevator')
  })

  sceneMessageBus.on('whaleElevatorActivated', (e) => {
    whale_Elevator.activate()
    log('whale elevator')
  })

  sceneMessageBus.on('moonElevatorActivated', (e) => {
    moonTower_Elevator.activate()
    log('moon tower elevator')
  })

  sceneMessageBus.on('shellElevatorActivated', (e) => {
    shell_elevator.activate()
    log('shell elevator')
  })

  sceneMessageBus.on('trainElevatorActivated', (e) => {
    train_elevator.activate()
    log('train elevator')
  })

  sceneMessageBus.on('balloonActivated', (e) => {
    if (ballonIsFlying) {
      log('baloon was already in flight')
      return
    }
    ballonIsFlying = true
    balloon.activate()
    balloon.addComponentOrReplace(
      new utils.Delay(150 * 1000, () => {
        ballonIsFlying = false
      })
    )
  })

  sceneMessageBus.on('trainActivated', (e) => {
    if (trainIsMoving) {
      log('train was already in movement')
      return
    }

    trainIsMoving = true
    train.activate()

    train.addComponentOrReplace(
      new utils.Delay(100 * 1000, () => {
        trainIsMoving = false
      })
    )
  })
}

export let upstairsLoaded: boolean = false

export function barPlatforms() {
  //ARTICHOKE ELEVATOR

  let barElevatorLeft = new Platform(
    new GLTFShape('models/core_building/Elevator_Left.glb'),
    { rotation: Quaternion.Euler(0, 180, 0) },
    { position: new Vector3(146, 2.5, 151) },
    new Vector3(4, 4, 4),
    'Elevator_Left_Up',
    'elevatorLeft',
    () => {
      upstairsBar()
    }
  )

  let barElevatorRight = new Platform(
    new GLTFShape('models/core_building/Elevator_Right.glb'),
    { rotation: Quaternion.Euler(0, 180, 0) },
    { position: new Vector3(173, 2.5, 151) },
    new Vector3(4, 4, 4),
    'Elevator_Right_Up',
    'elevatorRight',
    () => {
      upstairsBar()
    }
  )

  sceneMessageBus.on('elevatorLeft', (e) => {
    barElevatorLeft.activate()
  })

  sceneMessageBus.on('elevatorRight', (e) => {
    barElevatorRight.activate()
  })
}

export function upstairsBar() {
  if (upstairsLoaded) return

  upstairsLoaded = true

  addArcades()
  addPunchBag()
}
