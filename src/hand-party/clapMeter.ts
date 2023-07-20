import * as utils from "@dcl/ecs-scene-utils"
import { CONFIG } from "../config"
import { hand, HandState } from "./hand"
import { handPartyData } from "./handPartyData"
import { loot } from "./loot"

// Config
const START_ANGLE = 350
const END_ANGLE = CONFIG.DEBUG_ACTIVE_SCENE_TRIGGER_ENABLED ? 340 : 190

const sceneMessageBus = new MessageBus()

// Cooldown config
@Component("cooldownFlag")
class CooldownFlag { }

const clapMeterNeedle = new Entity()
//clap-meter settings
const CLAP_COOLDOWN_TIME = 6000 // Clap animation length
const COOLDOWN_SPEED = 10
const ANGLE_INCREMENT = 1 // How many degrees does the needle move

class ClapMeter extends Entity {

    constructor(transform: Transform) {
        super()
        engine.addEntity(this)
        clapMeterNeedle.setParent(this)

        this.addComponent(new GLTFShape("models/clapmeter/meter_board.glb"))
        this.addComponent(transform)

        // Clap meter needle
        clapMeterNeedle.addComponent(new GLTFShape("models/clapmeter/clapMeterNeedle.glb"))
        clapMeterNeedle.addComponent(new Transform({ position: new Vector3(0, 0.05, 0) }))
        clapMeterNeedle.getComponent(Transform).rotation.setEuler(0, 0, 350)

        this.listenAndBroadcastClap()
    }
    private listenAndBroadcastClap() {
        engine.addSystem(new CooldownSystem())

        // Listen for claps
        onPlayerExpressionObservable.add(({ expressionId }) => {
            if (expressionId == "clap") {
                sceneMessageBus.emit("updateClapMeter", {})
            }
        })

        // Update the clap meter for all players
        sceneMessageBus.on("updateClapMeter", () => {
            clapMeterBoard.updateCooldown()
            clapMeterBoard.updateNeedle()
        })
    }
    updateCooldown(): void {
        clapMeterNeedle.addComponentOrReplace(new CooldownFlag())
        clapMeterNeedle.addComponentOrReplace(
            new utils.Delay(CLAP_COOLDOWN_TIME, () => {
                clapMeterNeedle.removeComponent(CooldownFlag)
            })
        )
    }
    updateNeedle(): void {
        let currentNeedleAngle = clapMeterNeedle.getComponent(Transform).rotation.eulerAngles.z
        let currentNeedleRotation = clapMeterNeedle.getComponent(Transform).rotation

        let handClapAnimationSpeed = 1 + (1 - (currentNeedleAngle - END_ANGLE) / (START_ANGLE - END_ANGLE)) * 2

        if (hand.state === HandState.CLAP) { //workaround, because hand playing give animation once setting clap speed
            //log("HAND CLAP SPEED: ", handClapAnimationSpeed)
            hand.entity.getComponent(Animator).getClip("RightHandClap").speed = handClapAnimationSpeed
            hand.entity.getComponent(Animator).getClip("LeftHandClap").speed = handClapAnimationSpeed
        }
        if (currentNeedleAngle > END_ANGLE) {
            currentNeedleRotation.setEuler(0, 0, currentNeedleAngle - ANGLE_INCREMENT)
        }
        else {
            currentNeedleAngle = END_ANGLE

            log("REACH TARGET")
            //TRIGGER REWARD ANIMATION

            if (handPartyData.isVideoStarted && handPartyData.insidePartyArea) {
                log("video party play, user inside party area")
                if (!handPartyData.isRewardClaimed) {

                    if (!handPartyData.isWaitingToClaim) {
                        handPartyData.isWaitingToClaim = true
                        log("REWARD NOT YET CLAIMED, SHOW LOOT BOX!")
                        hand.playhandGive()
                        loot.lootAppear()
                    }
                }
                else {
                    log("REWARD ALREADY CLAIMED!")
                }
            }
        }
        log(handPartyData.isVideoStarted, HandState[hand.state], currentNeedleAngle)
    }
}

// Cooldown System
class CooldownSystem implements ISystem {
    update(dt: number) {
        if (clapMeterNeedle.hasComponent(CooldownFlag)) return

        let currentNeedleAngle = clapMeterNeedle.getComponent(Transform).rotation.eulerAngles.z
        let currentNeedleRotation = clapMeterNeedle.getComponent(Transform).rotation

        //log("clap meter cooldown system: ", currentNeedleAngle, START_ANGLE)
        if (currentNeedleAngle < START_ANGLE) {
            currentNeedleRotation.setEuler(0, 0, currentNeedleAngle + COOLDOWN_SPEED * dt)
        }
        else {
            currentNeedleRotation.setEuler(0, 0, START_ANGLE)
        }
        let handClapAnimationSpeed = 1 + (1 - (currentNeedleAngle - END_ANGLE) / (START_ANGLE - END_ANGLE)) * 2

        if (hand.state === HandState.CLAP) {
            //log("HAND CLAP SPEED: ", handClapAnimationSpeed)
            hand.entity.getComponent(Animator).getClip("RightHandClap").speed = handClapAnimationSpeed
            hand.entity.getComponent(Animator).getClip("LeftHandClap").speed = handClapAnimationSpeed
        }
    }
}

export const clapMeterBoard = new ClapMeter(new Transform({
    position: new Vector3(153.75, 0.76, 170),
    rotation: Quaternion.Euler(0, -37.5, 0),
    scale: Vector3.One().scale(1)
}))
