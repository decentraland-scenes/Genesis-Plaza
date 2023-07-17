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
import { setSection } from '../../../dcl-scene-ui-workaround/resources'
import { customOrangeAtlas } from '../../../lobby/resources/resources'


export let simone: NPC
export let simoneAI: RemoteNpc


export function addSimoneNPC() {

    //set this to false to disable in world experiment
    const simoneAINpcEnabled = true
    simone = new NPC(
        {
            //position: new Vector3(38 + 8 * 16, 0.8, 57 + 7 * 16),
            position: new Vector3(169, 105 - 1.1, 147.5),
            scale: new Vector3(1.1, 1.1, 1.1),
            rotation: Quaternion.Euler(0, 180 + 30, 0)
        },
        'models/core_building/Simone.glb',
        () => {
            //redefined at lobbyScene.ts L36
            simone.stopWalking()
            simone.playAnimation('Talk1', true)
            let randomNum = Math.floor(Math.random() * 10)
            //doge.talkBubble(DogeTalk, randomNum)
        },
        {
            portrait:
            {
                path: 'images/portraits/simone/Talking.png', height: 300, width: 300
                , offsetX: 40, offsetY: 0
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
            dialogCustomTheme: customOrangeAtlas,
            //darkUI: simoneAINpcEnabled,
            bubbleHeight: 2.2,//dogeAINpcEnabled == true only matters
        }
    )


    let UIScale = 0.75

    //DIALOG BACKGROUND
    simone.dialog.container.color = new Color4(0.5, 0.5, 1, 0)
    simone.dialog.container.height = (256 - 80) * UIScale
    simone.dialog.container.width = 656 * UIScale
    simone.dialog.container.positionY = 10//(256 - 80) / 2 + 20
    
    setSection(simone.dialog.panel, {
        sourceHeight: 256 - 80,
        sourceWidth: 656,
        sourceLeft: 0,
        sourceTop: 80
    })
    simone.dialog.panel.height = (256 - 80) * UIScale
    simone.dialog.panel.width = 656 * UIScale

    //LEFT CLICK
    simone.dialog.leftClickIcon.parent
    setSection(simone.dialog.leftClickIcon, {
        sourceHeight: 46 - 0,
        sourceWidth: 944 - 912,
        sourceLeft: 912,
        sourceTop: 0
    })
    simone.dialog.leftClickIcon.height = 46 * UIScale
    simone.dialog.leftClickIcon.width = 32 * UIScale
    simone.dialog.leftClickIcon.hAlign = "right"
    simone.dialog.leftClickIcon.vAlign = "bottom"
    simone.dialog.leftClickIcon.positionX = -15
    simone.dialog.leftClickIcon.positionY = 15
    
    //ARROW DOWN
    let arrowDown = new UIImage(simone.dialog.container, customOrangeAtlas)
    setSection(arrowDown, {
        sourceHeight: 46 - 0,
        sourceWidth: 864 - 816,
        sourceLeft: 816,
        sourceTop: 0
    })
    arrowDown.height = 46 * UIScale
    arrowDown.width = 48 * UIScale
    arrowDown.hAlign = "center"
    arrowDown.vAlign = "bottom"
    arrowDown.positionY = -5

    //NAME BACKGROUND
    let npcNameBg = new UIImage(simone.dialog.container, customOrangeAtlas)
    setSection(npcNameBg, {
        sourceHeight: 80 - 48,
        sourceWidth: 832 - 576,
        sourceLeft: 576,
        sourceTop: 48
    })
    npcNameBg.height = 32 * UIScale
    npcNameBg.width = 256 * UIScale
    npcNameBg.hAlign = "center"
    npcNameBg.vAlign = "top"
    npcNameBg.positionY = 13

    //NAME TEXT
    let npcNameText = new UIText(simone.dialog.container)
    npcNameText.height = 32 * UIScale
    npcNameText.width = 256 * UIScale
    npcNameText.value = "Simone"
    npcNameText.fontSize = 20 * UIScale
    npcNameText.hAlign = "center"
    npcNameText.vAlign = "top"
    npcNameText.vTextAlign = "center"
    npcNameText.hTextAlign = "center"
    npcNameText.positionY = 13


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
            },
        },
    )
    simoneAI.setName("Simone")
    // replace with add component
    simone.addComponent(new TrackingElement(
        ANALYTICS_ELEMENTS_TYPES.npc,
        ANALYTICS_ELEMENTS_IDS.simone,
        getRegisteredAnalyticsEntity(ANALYTICS_ELEMENTS_IDS.cloud)
    ))

    REGISTRY.allNPCs.push(simoneAI)
}
