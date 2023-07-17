import * as utils from "@dcl/ecs-scene-utils"
import { hand } from "./hand"
import { loot } from "./loot"

// Config
const START_ANGLE = 350
const END_ANGLE = 340//190

const sceneMessageBus = new MessageBus()

// Cooldown config
@Component("cooldownFlag")
class CooldownFlag { }
const CLAP_COOLDOWN_TIME = 6000 // Clap animation length
const COOLDOWN_SPEED = 10
const ANGLE_INCREMENT = 1 // How many degrees does the needle move

const clapMeterNeedle = new Entity()


let isRewardGranted: boolean = false
let isClaiming: boolean = false


const lootModelEntity = new Entity()

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
        log("HAND CLAP SPEED: ", handClapAnimationSpeed)
        hand.entity.getComponent(Animator).getClip("RightHandClap").speed = handClapAnimationSpeed
        hand.entity.getComponent(Animator).getClip("LeftHandClap").speed = handClapAnimationSpeed

        if (currentNeedleAngle >= END_ANGLE) {
            currentNeedleRotation.setEuler(0, 0, currentNeedleAngle - ANGLE_INCREMENT)
        }
        else {
            if (!isRewardGranted) {
                isRewardGranted = true
                log("REWARD GRANTED, SHOW LOOT BOX!")
                hand.playhandgive()
                loot.lootAppear()
            }
        }
    }
}

// Cooldown System
class CooldownSystem implements ISystem {
    update(dt: number) {
        if (clapMeterNeedle.hasComponent(CooldownFlag)) return

        let currentNeedleAngle = clapMeterNeedle.getComponent(Transform).rotation.eulerAngles.z
        let currentNeedleRotation = clapMeterNeedle.getComponent(Transform).rotation

        log("clap meter cooldown system: ", currentNeedleAngle, START_ANGLE)
        if (currentNeedleAngle < START_ANGLE) {
            currentNeedleRotation.setEuler(0, 0, currentNeedleAngle + COOLDOWN_SPEED * dt)
        }
        else {
            currentNeedleRotation.setEuler(0, 0, START_ANGLE)
        }
    }
}



export function addClapMeter() {
    log("ADD CLAP METER")
    const clapMeterBoard = new ClapMeter(new Transform({
        position: new Vector3(153.75, 0.76, 170),
        rotation: Quaternion.Euler(0, -37.5, 0),
        scale: Vector3.One().scale(1)
    }))

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

    //spawn hand and loot
    engine.addEntity(hand.entity)
    engine.addEntity(loot.entity) //visible property in loot is false, until reward condition achieved

    hand.playHandIntro()
}

//addClapMeter()
//hand.playHandClap()