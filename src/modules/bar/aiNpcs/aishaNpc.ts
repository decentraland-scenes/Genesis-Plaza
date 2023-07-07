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


export let aisha: NPC
export let aishaAI: RemoteNpc


export function addAishaNPC() {

    //set this to false to disable in world experiment
    const aishaAINpcEnabled = true
    aisha = new NPC(
        {
            position: new Vector3(161.5, 0.2, 164.5),//new Vector3(62 + 8 * 16, 0.2, 36 + 7 * 16),
            scale: new Vector3(1.1, 1.1, 1.1),
            rotation: Quaternion.Euler(0, 180, 0)
        },
        'models/core_building/Aisha.glb',
        () => {
            //redefined at lobbyScene.ts L36
            aisha.stopWalking()
            artist1.endInteraction()
            artist2.endInteraction()
            aisha.playAnimation('Talk1', true)
            let randomNum = Math.floor(Math.random() * 10)
            //doge.talkBubble(DogeTalk, randomNum)
        },
        {
            portrait:
            {
                path: 'images/portraits/aisha/Aisha.png', height: 300, width: 300
                , offsetX: -40, offsetY: 53
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
            textBubble: !aishaAINpcEnabled,
            noUI: !aishaAINpcEnabled,
            dialogCustomTheme: customOrangeAtlas,
            //darkUI: aishaAINpcEnabled,
            bubbleHeight: 2.2,//dogeAINpcEnabled == true only matters
        }
    )
    //doge.followPath(dogePath)

    //DIALOG BACKGROUND
    aisha.dialog.container.color = new Color4(0.5, 0.5, 1, 0)
    aisha.dialog.container.height = 256 - 80
    aisha.dialog.container.width = 656
    aisha.dialog.container.positionY = 10//(256 - 80) / 2 + 20

    setSection(aisha.dialog.panel, {
        sourceHeight: 256 - 80,
        sourceWidth: 656,
        sourceLeft: 0,
        sourceTop: 80
    })
    aisha.dialog.panel.height = 256 - 80
    aisha.dialog.panel.width = 656

    //LEFT CLICK
    aisha.dialog.leftClickIcon.parent
    setSection(aisha.dialog.leftClickIcon, {
        sourceHeight: 46 - 0,
        sourceWidth: 944 - 912,
        sourceLeft: 912,
        sourceTop: 0
    })
    aisha.dialog.leftClickIcon.height = 46
    aisha.dialog.leftClickIcon.width = 32
    aisha.dialog.leftClickIcon.hAlign = "right"
    aisha.dialog.leftClickIcon.vAlign = "bottom"
    aisha.dialog.leftClickIcon.positionX = -15
    aisha.dialog.leftClickIcon.positionY = 15

    //ARROW DOWN
    let arrowDown = new UIImage(aisha.dialog.container, customOrangeAtlas)
    setSection(arrowDown, {
        sourceHeight: 46 - 0,
        sourceWidth: 864 - 816,
        sourceLeft: 816,
        sourceTop: 0
    })
    arrowDown.height = 46
    arrowDown.width = 48
    arrowDown.hAlign = "center"
    arrowDown.vAlign = "bottom"
    arrowDown.positionY = -5

    //NAME BACKGROUND
    let npcNameBg = new UIImage(aisha.dialog.container, customOrangeAtlas)
    setSection(npcNameBg, {
        sourceHeight: 80 - 48,
        sourceWidth: 832 - 576,
        sourceLeft: 576,
        sourceTop: 48
    })
    npcNameBg.height = 32
    npcNameBg.width = 256
    npcNameBg.hAlign = "center"
    npcNameBg.vAlign = "top"
    npcNameBg.positionY = 17

    //NAME TEXT
    let npcNameText = new UIText(aisha.dialog.container)
    npcNameText.value = "Aisha"
    npcNameText.fontSize = 20
    npcNameText.hAlign = "center"
    npcNameText.vAlign = "top"
    npcNameText.positionX = 20
    npcNameText.positionY = 17 + 20

    //let dialogBg = new UIImage(aisha.dialog.panel, customOrangeAtlas)
    //dialogBg.height = 256 - 80
    //dialogBg.width = 656
    //setSection(dialogBg, {
    //    sourceHeight: 256 - 80,
    //    sourceWidth: 656,
    //    sourceLeft: 0,
    //    sourceTop: 80
    //})

    //let npcName = new UIImage(aisha.dialog.panel, new Texture('images/test/CustomOrangeAtlas.png'))
    //setSection(npcName, {
    //    sourceHeight: 490 - 458,
    //    sourceWidth: 640 - 512,
    //    sourceLeft: 512,
    //    sourceTop: 458
    //})
    //npcName.positionX = -20
    //NPC NAME BACKGROUND

    //NPC NAME TEXT

    //aisha.dialog.panel.positionX = 100

    const ANIM_TIME_PADD = .2

    const AISHA_NPC_ANIMATIONS: NpcAnimationNameType = {
        IDLE: { name: "Idle", duration: 4, autoStart: undefined}, //, portraitPath: "images/portraits/aisha/Idle.png" },
        TALK: { name: "Talking", duration: 4, autoStart: undefined}, //, portraitPath: "images/portraits/aisha/Talking.png" },
        THINKING: { name: "Thinking", duration: 4, autoStart: undefined}, //, portraitPath: "images/portraits/aisha/Thinking.png" },
        //EXCITED: { name: "Excited", duration: 4, autoStart: undefined }, //, portraitPath: "images/portraits/aisha/Excited.png" },
        //HAPPY: { name: "Excited", duration: 4, autoStart: undefined }, //, portraitPath: "images/portraits/aisha/Excited.png" },
        //LAUGH: { name: "Talking", duration: 4, autoStart: undefined }, //, portraitPath: "images/portraits/aisha/Talking.png" },
        //SAD: { name: "Talking", duration: 4, autoStart: undefined }, //, portraitPath: "images/portraits/aisha/Talking.png" },
        //SURPRISE: { name: "Excited", duration: 4, autoStart: undefined }, //, portraitPath: "images/portraits/aisha/Excited.png" },
    }

    aishaAI = new RemoteNpc(
        { resourceName: "workspaces/genesis_city/characters/aisha" },
        aisha,
        {
            npcAnimations: AISHA_NPC_ANIMATIONS,
            thinking: {
                enabled: true,
                model: new GLTFShape('models/loading-icon.glb'),
                offsetX: 0,
                offsetY: 2.2,
                offsetZ: 0
            }
            , onEndOfRemoteInteractionStream: () => {
                showInputOverlay(true)
            }
            , onEndOfInteraction: () => {
                log("AISHANPC", "End Of Interaction")
                //const LOOP = false
                //if (dogeAI.npcAnimations.WALK) dogeAI.npc.playAnimation(dogeAI.npcAnimations.WALK.name, LOOP, dogeAI.npcAnimations.WALK.duration)
                //dogeAI.npc.followPath()
            }
        },
    )

    //replace with add component
    aisha.addComponent(new TrackingElement(
        ANALYTICS_ELEMENTS_TYPES.npc,
        ANALYTICS_ELEMENTS_IDS.aisha,
        getRegisteredAnalyticsEntity(ANALYTICS_ELEMENTS_IDS.bar)
    ))

    REGISTRY.allNPCs.push(aishaAI)
}
