import * as ui from '../../node_modules/@dcl/ui-utils/index'
import utils from '../../node_modules/decentraland-ecs-utils/index'
import { TriggerSphereShape } from '../../node_modules/decentraland-ecs-utils/triggers/triggerSystem'
import { Dialog, ImageData } from '../../node_modules/@dcl/ui-utils/utils/types'
import { TrackUserSlerp, moveDummyTarget } from './faceUserSystem'

export class NPC extends Entity {
  public introduced: boolean = false
  public solvedProblem: boolean = false
  public script: Dialog[]
  public dialog: ui.DialogWindow
  public onActivate: () => void
  public onWalkAway: () => void
  inCooldown: boolean
  faceUser: boolean
  private idleAnim: AnimationState
  private lastPlayedAnim: AnimationState
  private endAnimTimer: Entity
  constructor(
    position: TranformConstructorArgs,
    model: GLTFShape,
    onActivate: () => void,
    portrait?: string | ImageData,
    reactDistance?: number,
    idleAnim?: string,
    faceUser?: boolean,
    onlyExternalTrigger?: boolean,
    onWalkAway?: () => void
  ) {
    super()
    this.addComponent(model)
    this.addComponent(new Transform(position))
    engine.addEntity(this)

    if (portrait) {
      this.dialog = new ui.DialogWindow(
        typeof portrait === `string` ? { path: portrait } : portrait
      )
    } else {
      this.dialog = new ui.DialogWindow()
    }
    this.addComponent(new Animator())
    if (idleAnim) {
      this.idleAnim = this.getComponent(Animator).getClip(
        idleAnim ? idleAnim : 'Idle'
      )
      this.lastPlayedAnim = this.idleAnim
      this.idleAnim.play()
    }

    this.onActivate = onActivate
    this.onWalkAway = onWalkAway

    this.endAnimTimer = new Entity()
    engine.addEntity(this.endAnimTimer)

    if (!onlyExternalTrigger) {
      // Reaction when clicked
      this.addComponent(
        new OnPointerDown(
          (e) => {
            if (this.inCooldown || this.dialog.isDialogOpen) return

            onActivate()
            if (this.faceUser) {
              moveDummyTarget(this)
            }
          },
          {
            button: ActionButton.POINTER,
            hoverText: 'Talk',
          }
        )
      )
    }

    // trigger when player walks near
    this.addComponent(
      new utils.TriggerComponent(
        new TriggerSphereShape(
          reactDistance ? reactDistance : 6,
          Vector3.Zero()
        ),
        null,
        null,
        null,
        null,
        () => {
          if (
            this.inCooldown ||
            this.dialog.isDialogOpen ||
            onlyExternalTrigger
          )
            return
          onActivate()
          if (this.faceUser) {
            moveDummyTarget(this)
          }
        },
        () => {
          if (this.dialog.isDialogOpen) {
            this.dialog.closeDialogWindow()
          }
          if (this.onWalkAway) {
            this.onWalkAway()
          }
        }
      )
    )

    if (faceUser) {
      this.addComponent(new TrackUserSlerp())
      this.faceUser = true
    }
  }
  talk(script: Dialog[], startIndex: number) {
    this.introduced = true
    this.inCooldown = true
    this.dialog.openDialogWindow(script, startIndex)
    this.addComponentOrReplace(
      new utils.Delay(5000, () => {
        this.inCooldown = false
      })
    )
  }
  playAnimation(animationName: string, noLoop?: boolean, duration?: number) {
    this.lastPlayedAnim.stop()
    if (this.endAnimTimer.hasComponent(utils.Delay)) {
      this.endAnimTimer.removeComponent(utils.Delay)
    }
    let newAnim = this.getComponent(Animator).getClip(animationName)

    log('playing anim : ', animationName)

    if (noLoop) {
      newAnim.looping = false
      if (duration) {
        this.endAnimTimer.addComponentOrReplace(
          new utils.Delay(duration * 1000, () => {
            newAnim.stop()
            if (this.idleAnim) {
              this.idleAnim.play()
              this.lastPlayedAnim = this.idleAnim
            }
          })
        )
      }
    }

    newAnim.stop()
    newAnim.play()
    this.lastPlayedAnim = newAnim
  }
}
