import utils from '../../node_modules/decentraland-ecs-utils/index'

export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export function setTimeout(ms: number, callback: () => void) {
  const entity = new Entity()
  entity.addComponent(
    new utils.Delay(ms, () => {
      callback()
      engine.removeEntity(entity)
    })
  )
  engine.addEntity(entity)
}

/**
 * Add a trigger that is executed when the user enters for the first time
 */
export function addOneTimeTrigger(
  position: Vector3,
  size: Vector3,
  onFirstPlayerEnter: () => void,
  parent?: Entity,
  show: boolean = false
) {
  let entered = false

  const triggerBox = new utils.TriggerBoxShape(size, Vector3.Zero())

  const trigger = new Entity()
  trigger.addComponent(new Transform({ position }))

  trigger.addComponent(
    new utils.TriggerComponent(
      triggerBox, //shape
      0, //layer
      0, //triggeredByLayers
      null, //onTriggerEnter
      null, //onTriggerExit
      () => {
        if (!entered) {
          entered = true
          onFirstPlayerEnter()
        }
      },
      null, //onCameraExit
      show
    )
  )

  if (parent) {
    trigger.setParent(parent)
  }
  engine.addEntity(trigger)
}
