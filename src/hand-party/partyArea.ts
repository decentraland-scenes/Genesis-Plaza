
import * as utils from '@dcl/ecs-scene-utils'
import { hand } from './hand'
import { handPartyData } from './handPartyData'
import { loot } from './loot'


//add trigger sphere, video screen as a center

const triggerEntity = new Entity()
triggerEntity.addComponent(new Transform({
    position: new Vector3(160.007, 3.88876, 173.449)
}))
let triggerSphere = new utils.TriggerSphereShape(20, new Vector3(0, 0, 0))
triggerEntity.addComponent(new utils.TriggerComponent(
    triggerSphere,
    {
        enableDebug: false,
        onCameraEnter: () => {
            handPartyData.insidePartyArea = true
            handPartyData.isWaitingToClaim = false
            if(!handPartyData.isRewardClaimed)
                hand.handAppear()
        },
        onCameraExit: () => {
            handPartyData.insidePartyArea = false
            handPartyData.isWaitingToClaim = false
            hand.handDissapear()
            loot.lootDissapear()
        }
    }
))
engine.addEntity(triggerEntity)