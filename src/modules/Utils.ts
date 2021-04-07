import * as utils from '@dcl/ecs-scene-utils'

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
  onFirstPlayerEnter: () => void = undefined,
  parent?: Entity,
  show: boolean = false,
  onFirstExit: () => void = undefined
) {
  let entered = false
  let exited = false

  const triggerBox = new utils.TriggerBoxShape(size, Vector3.Zero())

  const trigger = new Entity()
  trigger.addComponent(new Transform({ position }))

  trigger.addComponent(
    new utils.TriggerComponent(
      triggerBox, //shape
      {
        onCameraEnter: () => {
          if (!entered && onFirstPlayerEnter) {
            entered = true
            onFirstPlayerEnter()
          }
          if ((entered || !onFirstPlayerEnter) && (exited || !onFirstExit)) {
            engine.removeEntity(trigger)
            //trigger.removeComponent(utils.TriggerComponent)
          }
        },
        onCameraExit: () => {
          if (!exited && onFirstExit) {
            exited = true
            onFirstExit()
          }
          if ((entered || !onFirstPlayerEnter) && (exited || !onFirstExit)) {
            engine.removeEntity(trigger)
            //trigger.removeComponent(utils.TriggerComponent)
          }
        },
        enableDebug: show,
      }
    )
  )

  if (parent) {
    trigger.setParent(parent)
  }
  engine.addEntity(trigger)
}

/**
 * Add a trigger that will be triggered each time
 */
export function addRepeatTrigger(
  position: Vector3,
  size: Vector3,
  onPlayerEnter: () => void = undefined,
  parent?: Entity,
  show: boolean = false,
  onExit: () => void = undefined
) {
  const triggerBox = new utils.TriggerBoxShape(size, Vector3.Zero())

  const trigger = new Entity()
  trigger.addComponent(new Transform({ position }))

  trigger.addComponent(
    new utils.TriggerComponent(
      triggerBox, //shape
      {
        onCameraEnter: () => {
          onPlayerEnter()
        },
        onCameraExit: () => {
          onExit()
        },
        enableDebug: show,
      }
    )
  )

  if (parent) {
    trigger.setParent(parent)
  }
  engine.addEntity(trigger)
}
