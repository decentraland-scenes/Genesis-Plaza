import {
    NPC,
    Dialog,
    FollowPathData,
    NPCTriggerComponent,
} from '@dcl/npc-scene-utils'
import { showInputOverlay } from 'src/aiNpc/npc/customNPCUI'
import { getRegisteredAnalyticsEntity, trackEnd, TrackingElement } from '../../../aiNpc/Stats/analyticsCompnents'
import { AnalyticsLogLabel, ANALYTICS_ELEMENTS_IDS, ANALYTICS_ELEMENTS_TYPES } from '../../../aiNpc/Stats/AnalyticsConfig'
import { REGISTRY, NpcAnimationNameType } from '../../../registry'
import { RemoteNpc } from '../../../aiNpc/npc/remoteNpc'
import { artist1, artist2 } from '../barNPCs'


export let simone: NPC
export let simoneAI: RemoteNpc


export function addSimoneNPC() {

    //set this to false to disable in world experiment
    const simoneAINpcEnabled = true
    simone = new NPC(
        { position: new Vector3(38 + 8 * 16, 0.8, 57 + 7 * 16), scale: new Vector3(1.05, 1.05, 1.05), rotation: Quaternion.Euler(0, 180, 0) },
        'models/core_building/Simone.glb',
        () => {
            //redefined at lobbyScene.ts L36
            simone.stopWalking()
            artist1.endInteraction()
            artist2.endInteraction()
            simone.playAnimation('Talk1', true)
            let randomNum = Math.floor(Math.random() * 10)
            //doge.talkBubble(DogeTalk, randomNum)
        },
        {
            portrait:
            {
                path: 'images/portraits/simone/Idle.png', height: 250, width: 250
                , offsetX: -30, offsetY: 20
                , section: { sourceHeight: 256, sourceWidth: 256 }
            },
            //walkingAnim: 'Walk',
            faceUser: true,
            hoverText: 'Hello',
            onlyETrigger: true,
            //walkingSpeed: 1.2,
            continueOnWalkAway: false,
            onWalkAway: () => {
                log(AnalyticsLogLabel, "TestBarNPC", "WalkAway")
                trackEnd(REGISTRY.activeNPC.npc.getComponentOrNull(TrackingElement))
                showInputOverlay(false)
                //doge.followPath()
            },
            textBubble: !simoneAINpcEnabled,
            noUI: !simoneAINpcEnabled,
            darkUI: simoneAINpcEnabled,
            bubbleHeight: 2.2,//dogeAINpcEnabled == true only matters
        }
    )
    //doge.followPath(dogePath)

    const ANIM_TIME_PADD = .2

    const SIMONE_NPC_ANIMATIONS: NpcAnimationNameType = {
        IDLE: { name: "Idle", duration: 4, autoStart: undefined }, //, portraitPath: "images/portraits/aisha/Idle.png" },
        TALK: { name: "Talking", duration: 4, autoStart: undefined }, //, portraitPath: "images/portraits/aisha/Talking.png" },
        THINKING: { name: "Thinking", duration: 4, autoStart: undefined }, //, portraitPath: "images/portraits/aisha/Thinking.png" },
        //EXCITED: { name: "Excited", duration: 4, autoStart: undefined }, //, portraitPath: "images/portraits/aisha/Excited.png" },
        //HAPPY: { name: "Excited", duration: 4, autoStart: undefined }, //, portraitPath: "images/portraits/aisha/Excited.png" },
        //LAUGH: { name: "Talking", duration: 4, autoStart: undefined }, //, portraitPath: "images/portraits/aisha/Talking.png" },
        //SAD: { name: "Talking", duration: 4, autoStart: undefined }, //, portraitPath: "images/portraits/aisha/Talking.png" },
        //SURPRISE: { name: "Excited", duration: 4, autoStart: undefined }, //, portraitPath: "images/portraits/aisha/Excited.png" },
    }

    simoneAI = new RemoteNpc(
        { resourceName: "workspaces/genesis_city/characters/simone" },
        simone,
        {
            npcAnimations: SIMONE_NPC_ANIMATIONS,
            thinking: {
                enabled: true,
                model: new GLTFShape('models/loading-icon.glb'),
                offsetX: 0,
                offsetY: 2.3,
                offsetZ: 0
            }
            , onEndOfRemoteInteractionStream: () => {
                showInputOverlay(true)
            }
            , onEndOfInteraction: () => {
                //log("TestBarNPC", "End Of Interaction")
                //const LOOP = false
                //if (dogeAI.npcAnimations.WALK) dogeAI.npc.playAnimation(dogeAI.npcAnimations.WALK.name, LOOP, dogeAI.npcAnimations.WALK.duration)
                //dogeAI.npc.followPath()
            }
        },
    )

    // replace with add component
    simone.addComponent(new TrackingElement(
        ANALYTICS_ELEMENTS_TYPES.npc,
        ANALYTICS_ELEMENTS_IDS.aisha,
        getRegisteredAnalyticsEntity(ANALYTICS_ELEMENTS_IDS.bar)
    )
    )

    REGISTRY.allNPCs.push(simoneAI)
}
