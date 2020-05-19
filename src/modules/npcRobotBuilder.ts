import { DialogWindow, ConfirmMode } from "./npcDialogWindow"
import { Robot, RobotID } from "./npcRobot"
import resources from "../resources"
import utils from "../../node_modules/decentraland-ecs-utils/index"
import { TrackUserSlerp } from "./npcFaceUserSystem"
import { updateOpenUITime, setUiOpener } from "./ui"

/*
  Main = 0 (Alice)
  Shell = 1 (Ron)
  Agora = 2 (Bela)
  Garden = 3 (Betty)
  Trade = 4 (Charlie)
  Artichoke = 5 (Marsha)
  Whale = 6 (Bob)
*/

// UI elements
const canvas = new UICanvas()
export const dialogWindow = new DialogWindow(canvas)

// Robots
export const robots: Robot[] = []

export function addRobots(dummyTarget: Entity) {
  const ringShape = resources.models.robots.rings

  const alice = new Robot(
    resources.models.robots.alice,
    new Transform({
      position: new Vector3(155, 2.25, 159),
      rotation: Quaternion.Euler(0, 150, 0),
    }),
    RobotID.Main,
    resources.sounds.alice
  )
  robots.push(alice)
  const aliceRings = new Entity()
  aliceRings.addComponent(ringShape)
  aliceRings.addComponent(
    new Transform({
      position: new Vector3(0, -0.65, 0),
    })
  )
  aliceRings.setParent(alice)

  const ron = new Robot(
    resources.models.robots.ron,
    new Transform({
      position: new Vector3(297, 11.365, 123),
      rotation: Quaternion.Euler(0, -110, 0),
    }),
    RobotID.Shell,
    resources.sounds.ron
  )
  robots.push(ron)

  const bela = new Robot(
    resources.models.robots.bela,
    new Transform({
      position: new Vector3(37.27, 4, 265.32),
      rotation: Quaternion.Euler(0, 90, 0),
    }),
    RobotID.Agora,
    resources.sounds.bela
  )
  robots.push(bela)

  const betty = new Robot(
    resources.models.robots.betty,
    new Transform({
      position: new Vector3(117.657, 3.6, 39.98),
    }),
    RobotID.Garden,
    resources.sounds.betty
  )
  robots.push(betty)

  const charlie = new Robot(
    resources.models.robots.charlie,
    new Transform({
      position: new Vector3(269.5, 5.35, 42.6),
      rotation: Quaternion.Euler(0, -90, 0),
    }),
    RobotID.Trade,
    resources.sounds.charlie
  )
  robots.push(charlie)
  const charlieRings = new Entity()
  charlieRings.addComponent(ringShape)
  charlieRings.addComponent(
    new Transform({
      position: new Vector3(0, -0.55, -0.2),
    })
  )
  charlieRings.setParent(charlie)

  const marsha = new Robot(
    resources.models.robots.marsha,
    new Transform({
      position: new Vector3(50.945, 9.65, 31.1),
    }),
    RobotID.Artichoke,
    resources.sounds.marsha
  )
  robots.push(marsha)

  const bob = new Robot(
    resources.models.robots.bob,
    new Transform({
      position: new Vector3(165.573, 11.5, 252.79),
      rotation: Quaternion.Euler(0, 35, 0),
    }),
    RobotID.Whale,
    resources.sounds.bob
  )
  robots.push(bob)
  const bobRings = new Entity()
  bobRings.addComponent(ringShape)
  bobRings.addComponent(
    new Transform({
      position: new Vector3(0, -0.65, -0.075),
    })
  )
  bobRings.setParent(bob)

  // Dummy entity to add a Delay component so that it doesn't clash
  // with the robots Delay component used in animations
  const dummyDelay = new Entity()
  engine.addEntity(dummyDelay)

  // ISSUE: Modules do not load when these components are refactored to be part of the Robot class
  // Add user interaction
  for (let i = 0; i < robots.length; i++) {
    robots[i].addComponent(
      new OnPointerDown(
        (): void => {
          if (!dialogWindow.isDialogOpen || dialogWindow.isInfoPanel) {
            robots[i].playHello()
            robots[i].getComponent(AudioSource).playOnce()
            dialogWindow.openDialogWindow(robots[i].robotID, 0)

            // HACK: To avoid clashing with the input subscribe PRIMARY button down event
            dummyDelay.addComponentOrReplace(
              new utils.Delay(30, () => {
                dialogWindow.isInfoPanel = false
                dialogWindow.isDialogOpen = true
              })
            )
            // used for closing UI when walking away or clicking
            updateOpenUITime()
            setUiOpener(robots[i])
            dummyTarget.getComponent(Transform).position = robots[
              i
            ].getComponent(Transform).position
            if (!robots[i].hasComponent(TrackUserSlerp))
              robots[i].addComponent(new TrackUserSlerp())
          }
        },
        {
          button: ActionButton.PRIMARY,
          hoverText: "Talk",
          distance: resources.trigger.triggerShape.radius,
        }
      )
    )
    robots[i].addComponent(
      new utils.TriggerComponent(
        resources.trigger.triggerShape, //shape
        0, //layer
        0, //triggeredByLayer
        null, //onTriggerEnter
        null, //onTriggerExit
        null, //onCameraEnter
        () => {
          log("exit trigger area")
          dialogWindow.closeDialogWindow()
        }, //onCameraExit
        false // enableDebug
      )
    )
  }

  // Global button events for progressing the dialog
  const input = Input.instance

  input.subscribe("BUTTON_DOWN", ActionButton.POINTER, false, (): void => {
    log("LMB Clicked")
    if (dialogWindow.isDialogOpen && !dialogWindow.isQuestionPanel) {
      dialogWindow.confirmText(ConfirmMode.Next)
    }
  })

  input.subscribe("BUTTON_DOWN", ActionButton.PRIMARY, false, (): void => {
    log("E Key Pressed")
    if (
      dialogWindow.isDialogOpen &&
      dialogWindow.isQuestionPanel &&
      !dialogWindow.isInfoPanel
    ) {
      dialogWindow.confirmText(ConfirmMode.Confirm)
    }
  })

  input.subscribe("BUTTON_DOWN", ActionButton.SECONDARY, false, (): void => {
    log("F Key Pressed")
    if (dialogWindow.isDialogOpen && dialogWindow.isQuestionPanel) {
      dialogWindow.confirmText(ConfirmMode.Cancel)
    }
  })
}
