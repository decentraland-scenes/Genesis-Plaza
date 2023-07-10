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
import { setSection } from '../../../dcl-scene-ui-workaround/resources'
import { customOrangeAtlas } from '../../../lobby/resources/resources'


export let doge: NPC
export let dogeAI: RemoteNpc


export function addDogeNPC() {
    let dogePath: FollowPathData = {
        path: [
            new Vector3(166.7, 0.24, 163.9),
            new Vector3(161, 0.24, 160),
            new Vector3(157.5, 0.24, 157.4),
            new Vector3(153.7, 0.24, 156.2),
            new Vector3(148.1, 0.24, 156.8),

            new Vector3(146.4, 0.24, 156),

            new Vector3(143.1, 0.24, 153.1),
            new Vector3(143, 0.24, 152.8),

            new Vector3(143.2, 0.24, 150.7),

            new Vector3(143.26, 0.24, 147.5),
            new Vector3(148.1, 0.24, 142.3),

            new Vector3(151.9, 0.24, 142.3),
            new Vector3(153.8, 0.24, 144.9),
            new Vector3(154, 0.24, 146.9),

            new Vector3(154.6, 0.24, 149.57),
            new Vector3(156.65, 0.24, 154.7),
            new Vector3(162.3, 0.24, 156.2),

            new Vector3(166.4, 0.24, 156.1),
            new Vector3(169.7, 0.24, 156.2),
            new Vector3(171.9, 0.24, 157.8),
            new Vector3(173.8, 0.24, 158.7),
            new Vector3(173.8, 0.24, 160.1),
            new Vector3(173.15, 0.24, 161.59),
            new Vector3(171.3, 0.24, 163.22),
        ],
        loop: true,
        // curve: true,
    }

    //set this to false to disable in world experiment
    const dogeAINpcEnabled = true
    doge = new NPC(
        { position: dogePath.path[0], scale: new Vector3(2, 2, 2) },
        //'models/core_building/dogeNPC_anim4.glb',
        'models/core_building/dogeNPC_anim4_new.glb',
        () => {
            //redefined at lobbyScene.ts L36
            doge.stopWalking()
            artist1.endInteraction()
            artist2.endInteraction()
            doge.playAnimation('Talk1', true)
            let randomNum = Math.floor(Math.random() * 10)
            doge.talkBubble(DogeTalk, randomNum)
        },
        {
            portrait:
            {
                path: 'images/portraits/doge.png', height: 250, width: 250
                , offsetX: 20, offsetY: 0
                , section: { sourceHeight: 256, sourceWidth: 256 }
            },
            walkingAnim: 'Walk',
            faceUser: true,
            hoverText: 'WOW',
            onlyETrigger: true,
            walkingSpeed: 1.2,
            continueOnWalkAway: false,
            onWalkAway: () => {
                log(AnalyticsLogLabel, "TestBarNPC", "WalkAway")
                trackEnd(REGISTRY.activeNPC.npc.getComponentOrNull(TrackingElement))
                showInputOverlay(false)
                doge.followPath()
            },
            textBubble: !dogeAINpcEnabled,
            noUI: !dogeAINpcEnabled,
            dialogCustomTheme: customOrangeAtlas,
            //darkUI: dogeAINpcEnabled,
            bubbleHeight: 2.2,//dogeAINpcEnabled == true only matters
        }
    )
    doge.followPath(dogePath)

    let UIScale = 0.75

    //DIALOG BACKGROUND
    doge.dialog.container.color = new Color4(0.5, 0.5, 1, 0)
    doge.dialog.container.height = (256 - 80) * UIScale
    doge.dialog.container.width = 656 * UIScale
    doge.dialog.container.positionY = 10//(256 - 80) / 2 + 20
    
    setSection(doge.dialog.panel, {
        sourceHeight: 256 - 80,
        sourceWidth: 656,
        sourceLeft: 0,
        sourceTop: 80
    })
    doge.dialog.panel.height = (256 - 80) * UIScale
    doge.dialog.panel.width = 656 * UIScale

    //LEFT CLICK
    doge.dialog.leftClickIcon.parent
    setSection(doge.dialog.leftClickIcon, {
        sourceHeight: 46 - 0,
        sourceWidth: 944 - 912,
        sourceLeft: 912,
        sourceTop: 0
    })
    doge.dialog.leftClickIcon.height = 46 * UIScale
    doge.dialog.leftClickIcon.width = 32 * UIScale
    doge.dialog.leftClickIcon.hAlign = "right"
    doge.dialog.leftClickIcon.vAlign = "bottom"
    doge.dialog.leftClickIcon.positionX = -15
    doge.dialog.leftClickIcon.positionY = 15
    
    //ARROW DOWN
    let arrowDown = new UIImage(doge.dialog.container, customOrangeAtlas)
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
    let npcNameBg = new UIImage(doge.dialog.container, customOrangeAtlas)
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
    let npcNameText = new UIText(doge.dialog.container)
    npcNameText.height = 32 * UIScale
    npcNameText.width = 256 * UIScale
    npcNameText.value = "Doge"
    npcNameText.fontSize = 20 * UIScale
    npcNameText.hAlign = "center"
    npcNameText.vAlign = "top"
    npcNameText.vTextAlign = "center"
    npcNameText.hTextAlign = "center"
    npcNameText.positionY = 13

    const ANIM_TIME_PADD = .2

    const DOGE_NPC_ANIMATIONS: NpcAnimationNameType = {
        IDLE: { name: "Idle", duration: -1 },
        WALK: { name: "Walk", duration: -1 },
        TALK: { name: "Talk1", duration: 5 },
        THINKING: { name: "Thinking", duration: 5 },
        RUN: { name: "Run", duration: -1 },
        WAVE: { name: "Wave", duration: 4 + ANIM_TIME_PADD },
    }

    dogeAI = new RemoteNpc(
        { resourceName: "workspaces/genesis_city/characters/doge" },
        doge,
        {
            npcAnimations: DOGE_NPC_ANIMATIONS,
            thinking: {
                enabled: true,
                model: new GLTFShape('models/loading-icon.glb'),
                offsetX: 0,
                offsetY: 2,
                offsetZ: 0
            }
            , onEndOfRemoteInteractionStream: () => {
                showInputOverlay(true)
            }
            , onEndOfInteraction: () => {
                log("DOGENPC", "End Of Interaction")
                const LOOP = false
                if (dogeAI.npcAnimations.WALK) dogeAI.npc.playAnimation(dogeAI.npcAnimations.WALK.name, LOOP, dogeAI.npcAnimations.WALK.duration)
                dogeAI.npc.followPath()
            }
        },
    )
    dogeAI.setName("Aisha")

    // replace with add component
    doge.addComponent(new TrackingElement(
        ANALYTICS_ELEMENTS_TYPES.npc,
        ANALYTICS_ELEMENTS_IDS.doge,
        getRegisteredAnalyticsEntity(ANALYTICS_ELEMENTS_IDS.bar)
    ))

    REGISTRY.allNPCs.push(dogeAI)
}



let DogeTalk: Dialog[] = [
    {
        text: 'Wow, so very game changing revolutionary use case of blockchain technology',
        triggeredByNext: () => {
            doge.followPath()
        },
        timeOn: 4.1,
        isEndOfDialog: true,
    },
    {
        text: 'Such community generated content.',
        triggeredByNext: () => {
            doge.followPath()
        },
        timeOn: 4.1,
        isEndOfDialog: true,
    },
    {
        text: 'How true asset ownership!',
        triggeredByNext: () => {
            doge.followPath()
        },
        timeOn: 4.1,
        isEndOfDialog: true,
    },
    {
        text: 'Very potential to become the so awaited true incarnation of the metaverse',
        triggeredByNext: () => {
            doge.followPath()
        },
        timeOn: 4.1,
        isEndOfDialog: true,
    },
    {
        text: 'So decentralized governance by community voting',
        triggeredByNext: () => {
            doge.followPath()
        },
        timeOn: 4.1,
        isEndOfDialog: true,
    },
    {
        text: 'Much open source',
        triggeredByNext: () => {
            doge.followPath()
        },
        timeOn: 4.1,
        isEndOfDialog: true,
    },
    {
        text: 'So 3d social platform',
        triggeredByNext: () => {
            doge.followPath()
        },
        timeOn: 4.1,
        isEndOfDialog: true,
    },
    {
        text: 'How social experiment in self-governance',
        triggeredByNext: () => {
            doge.followPath()
        },
        timeOn: 4.1,
        isEndOfDialog: true,
    },
    {
        text: 'Very redefining how we interchange value with each other',
        triggeredByNext: () => {
            doge.followPath()
        },
        timeOn: 4.1,
        isEndOfDialog: true,
    },
    {
        text: 'Much persistent virtual world',
        triggeredByNext: () => {
            doge.followPath()
        },
        timeOn: 4.1,
        isEndOfDialog: true,
    },
]