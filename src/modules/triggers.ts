import utils from '../../node_modules/decentraland-ecs-utils/index'

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

  // create trigger area object, setting size and relative position
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
        activateArichokeElevator()
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

  //add TheWhale_Action_Elevator
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

  // create trigger area object, setting size and relative position
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
        activateWhaleElevator()
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
}
