import utils from '../../node_modules/decentraland-ecs-utils/index'
import { sceneMessageBus } from './serverHandler'

export function setTriggerAreas() {
  //ARTICHOKE ELEVATOR
  let Artichoke_Elevator = new Entity()
  Artichoke_Elevator.addComponent(
    new GLTFShape("models/L'architoque_Elevator.glb")
  )
  Artichoke_Elevator.addComponent(
    new Transform({
      rotation: Quaternion.Euler(0, 180, 0),
    })
  )
  engine.addEntity(Artichoke_Elevator)

  let artichoke_elevator_anim = new AnimationState("L'architoque_Elevator", {
    looping: false,
  })

  Artichoke_Elevator.addComponent(new Animator())
  Artichoke_Elevator.getComponent(Animator).addClip(artichoke_elevator_anim)

  const artichikeElevatorTrigger = new Entity()
  artichikeElevatorTrigger.addComponent(
    new Transform({ position: new Vector3(51, 2.5, 39.5) })
  )

  let artichokeTriggerBox = new utils.TriggerBoxShape(
    new Vector3(4, 4, 4),
    Vector3.Zero()
  )
  artichikeElevatorTrigger.addComponent(
    new utils.TriggerComponent(
      artichokeTriggerBox, //shape
      0, //layer
      0, //triggeredByLayer
      null, //onTriggerEnter
      null, //onTriggerExit
      () => {
        //onCameraEnter
        //activateArichokeElevator()
        sceneMessageBus.emit('artichokeElevator', {})
        log('triggered!')
      },
      null, //onCameraExit
      false //true
    )
  )
  engine.addEntity(artichikeElevatorTrigger)

  function activateArichokeElevator() {
    artichoke_elevator_anim.stop()
    artichoke_elevator_anim.play()
  }

  // WHALE ELEVATOR

  let TheWhale_Action_Elevator = new Entity()
  TheWhale_Action_Elevator.addComponent(
    new GLTFShape('models/TheWhale_Action_Elevator.glb')
  )
  TheWhale_Action_Elevator.addComponent(
    new Transform({
      rotation: Quaternion.Euler(0, 180, 0),
    })
  )
  engine.addEntity(TheWhale_Action_Elevator)

  let whale_elevator_anim = new AnimationState('TheWhale_Action_Elevator', {
    looping: false,
  })

  TheWhale_Action_Elevator.addComponent(new Animator())
  TheWhale_Action_Elevator.getComponent(Animator).addClip(whale_elevator_anim)

  const whaleElevatorTrigger = new Entity()
  whaleElevatorTrigger.addComponent(
    new Transform({ position: new Vector3(188.5, 3, 236) })
  )

  let whaleTriggerBox = new utils.TriggerBoxShape(
    new Vector3(7, 3, 7),
    Vector3.Zero()
  )
  whaleElevatorTrigger.addComponent(
    new utils.TriggerComponent(
      whaleTriggerBox, //shape
      0, //layer
      0, //triggeredByLayer
      null, //onTriggerEnter
      null, //onTriggerExit
      () => {
        //onCameraEnter
        sceneMessageBus.emit('whaleElevator', {})
        //activateWhaleElevator()
        log('triggered!')
      },
      null, //onCameraExit
      false //true
    )
  )
  engine.addEntity(whaleElevatorTrigger)

  function activateWhaleElevator() {
    whale_elevator_anim.stop()
    whale_elevator_anim.play()
  }

  //// MOON TOWER ELEVATOR

  let MoonTower_Action_Elevator = new Entity()
  MoonTower_Action_Elevator.addComponent(
    new GLTFShape('models/MoonTower_Action_Elevator.glb')
  )
  MoonTower_Action_Elevator.addComponent(
    new Transform({
      rotation: Quaternion.Euler(0, 180, 0),
    })
  )
  engine.addEntity(MoonTower_Action_Elevator)

  let moon_elevator_anim = new AnimationState('MoonTower_Action_Elevator', {
    looping: false,
  })

  MoonTower_Action_Elevator.addComponent(new Animator())
  MoonTower_Action_Elevator.getComponent(Animator).addClip(moon_elevator_anim)

  const moonElevatorTrigger = new Entity()
  moonElevatorTrigger.addComponent(
    new Transform({ position: new Vector3(48.6, 2.4, 116.6) })
  )

  let moonTriggerBox = new utils.TriggerBoxShape(
    new Vector3(3, 3, 3),
    Vector3.Zero()
  )
  moonElevatorTrigger.addComponent(
    new utils.TriggerComponent(
      moonTriggerBox, //shape
      0, //layer
      0, //triggeredByLayer
      null, //onTriggerEnter
      null, //onTriggerExit
      () => {
        //onCameraEnter
        //activateMoonlevator()
        sceneMessageBus.emit('moonElevator', {})
        log('triggered!')
      },
      null, //onCameraExit
      false //true
    )
  )
  engine.addEntity(moonElevatorTrigger)

  function activateMoonElevator() {
    moon_elevator_anim.stop()
    moon_elevator_anim.play()
  }

  ///////  SHELL ELEVATOR

  let shell_elevator = new Entity()
  shell_elevator.addComponent(new GLTFShape('models/shell_elevator.glb'))
  shell_elevator.addComponent(
    new Transform({
      rotation: Quaternion.Euler(0, 180, 0),
    })
  )
  engine.addEntity(shell_elevator)

  let shell_elevator_anim = new AnimationState('TheShell_ElevatorAction', {
    looping: false,
  })

  shell_elevator.addComponent(new Animator())
  shell_elevator.getComponent(Animator).addClip(shell_elevator_anim)

  const shellElevatorTrigger = new Entity()
  shellElevatorTrigger.addComponent(
    new Transform({
      position: new Vector3(300.5, 11.3, 120),
      rotation: Quaternion.Euler(0, 45, 0),
    })
  )

  let shellTriggerBox = new utils.TriggerBoxShape(
    new Vector3(7, 2, 6),
    Vector3.Zero()
  )
  shellElevatorTrigger.addComponent(
    new utils.TriggerComponent(
      shellTriggerBox, //shape
      0, //layer
      0, //triggeredByLayer
      null, //onTriggerEnter
      null, //onTriggerExit
      () => {
        //onCameraEnter
        //activateMoonlevator()
        sceneMessageBus.emit('shellElevator', {})
        log('triggered!')
      },
      null, //onCameraExit
      false
    )
  )
  engine.addEntity(shellElevatorTrigger)

  function activateShellElevator() {
    shell_elevator_anim.stop()
    shell_elevator_anim.play()
  }

  sceneMessageBus.on('artichokeElevator', (e) => {
    activateArichokeElevator()
  })

  sceneMessageBus.on('whaleElevator', (e) => {
    activateWhaleElevator()
  })

  sceneMessageBus.on('moonElevator', (e) => {
    activateMoonElevator()
  })

  sceneMessageBus.on('shellElevator', (e) => {
    activateShellElevator()
  })
}
