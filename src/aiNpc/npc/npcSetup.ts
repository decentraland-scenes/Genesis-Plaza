import * as npc from '@dcl/npc-scene-utils'
import { getUserData, UserData } from '@decentraland/Identity'
import { NpcAnimationNameType, REGISTRY } from 'src/registry'
import { RESOURCES } from 'src/resources'
import { GAME_STATE } from 'src/state'
import { RemoteNpc } from './remoteNpc'
import { streamedMsgs } from './streamedMsgs'

const ANIM_TIME_PADD = .2
const CART23_NPC_ANIMATIONS:NpcAnimationNameType = {
  IDLE: {name:"Idle",duration:-1},
  WALK: {name:"Walk",duration:-1},
  RUN: {name:"Run",duration:-1},
  WAVE: {name:"Wave",duration:2.46 + ANIM_TIME_PADD},
  HEART_WITH_HANDS: {name:"Heart_With_Hands",duration:1.76 + ANIM_TIME_PADD},
  COME_ON: {name:"Come_On",duration:1.96 + ANIM_TIME_PADD},
}

const JARVIS_NPC_ANIMATIONS:NpcAnimationNameType = {
  IDLE: {name:"Idle",duration:-1},
  WALK: {name:"Walk",duration:-1},
  TALK: {name:"Talk",duration:-1},
  RUN: {name:"Run",duration:-1},
  WAVE: {name:"Hello",duration:2.46 + ANIM_TIME_PADD},
}


//REGISTRY.npcAnimations = NPC_ANIMATIONS


export function closeAllInteractions(ignore?:RemoteNpc){
  for(const p of REGISTRY.allNPCs){
    if(ignore === undefined || p != ignore){ 
      log("closeAllInteractions " ,p.name)
      p.endInteraction()
      p.cancelThinking()
      //if(REGISTRY.activeNPCSound.get())
      //p.dialog.closeDialogWindow()
    }else{
      p.npc.dialog.closeDialogWindow()
    }
  }
}

const TEST_BLUNT_BOBBY_ENABLED = false

//let myNPC:RemoteNpc
let npcJarvis:RemoteNpc 
let npcBluntBobby:RemoteNpc 
 

export function setupNPC(){
  npcJarvis = new RemoteNpc(
    {resourceName:"workspaces/genesis_city/characters/dcl_guide"}
    ,new npc.NPC(
      { position: new Vector3(161, 1.2, 144.4) },
      'models/robots/marsha.glb',//'models/Placeholder_NPC_02.glb',
      () => {
        log(npcJarvis.name,' activated!')
        REGISTRY.activeNPC = npcJarvis
        
        closeAllInteractions(REGISTRY.activeNPC)
        

        npcJarvis.thinking([REGISTRY.askWaitingForResponse] )
      },
      { 
        idleAnim: JARVIS_NPC_ANIMATIONS.IDLE.name,
        walkingAnim: JARVIS_NPC_ANIMATIONS.WALK.name, 
        walkingSpeed: 15 ,//11 on full scale seems tiny big faster. 15 is roughlly player run speed, 20 is roughly fast enough to keep out of player range
        faceUser: true,
        portrait: { path: 'images/jarvisPortrait.png', height: 250, width: 250,offsetX:0 /*75*/ },
        darkUI: true,
        coolDownDuration: 3,
        hoverText: 'CHAT', 
        onlyClickTrigger: false,
        onlyExternalTrigger: false,
        reactDistance: 5, //KEEP IT UNDER STOPPING DISTANCE
        continueOnWalkAway: true,
        dialogCustomTheme: RESOURCES.textures.dialogAtlas,
        onWalkAway: () => {
          log('walked away')  
        }
      }
    ),
    {
      npcAnimations:JARVIS_NPC_ANIMATIONS,
      thinkingOffsetY: 1
    }
    )
  npcJarvis.setName( "npc.jarvis")

  let dogePath: npc.FollowPathData = {
    path: [
      new Vector3(3,.24,3),
      new Vector3(3,.24,16-3),
      new Vector3(16-3,.24,16-3),
      new Vector3(16-3,.24,3)
    ],
    loop: true,
    // curve: true,
  }
  
    /*
  const colliderBox = new BoxShape()
  colliderBox.isPointerBlocker = false; 
  const collider = new Entity();
  collider.addComponent(colliderBox);
  collider.addComponent(RESOURCES.materials.transparent)
  collider.addComponent(new Transform({
    position: new Vector3(0,1,0),
    scale: new Vector3(.5,2,.5)
  }))
  collider.setParent(myNPC.npc);*/
  //engine.addEntity(collider) 

  /*
  const hidePlayerModArea = new Entity();
  getUserData().then((user:UserData|null)=>{
    if(user !== null && CONFIG.NPC_HIDE_PLAYER_MODIFIER_ENABLED){
      hidePlayerModArea.addComponent( 
        new AvatarModifierArea({
          area: {
            //box:
            box: new Vector3(CONFIG.NPC_HIDE_PLAYER_WIDTH, 2, CONFIG.NPC_HIDE_PLAYER_WIDTH) //debug mode only hide when in car so can see player when walking around
          },
          excludeIds: [user.userId],
          modifiers: [AvatarModifiers.HIDE_AVATARS]
        })
      )
      hidePlayerModArea.addComponent(new Transform({
        position: new Vector3(0,1,0),
        scale: new Vector3(.5,2,.5)
      }))
      hidePlayerModArea.setParent(myNPC);
    }
  })
  */
  
  
  //engine.addEntity(collider)


  REGISTRY.allNPCs.push(npcJarvis)
  if(npcBluntBobby) REGISTRY.allNPCs.push(npcBluntBobby)
   
  

  for(const p of REGISTRY.allNPCs){
    p.npc.dialog.text.hTextAlign = 'center'
  }

   
}
/*
export let xmasTheme = new Texture('images/npcAtlas.png')

myNPC.dialog = new npc.DialogWindow(
  {
    path: 'images/elf_02.png',
    offsetX: 50,
    offsetY: 30,
    width: 256,
    height: 256,
    section: { sourceWidth: 256, sourceHeight: 256 },
  },
  false,
  undefined,
  xmasTheme
)
myNPC.dialog.panel.positionY = 20
myNPC.dialog.leftClickIcon.positionX = 340 - 40
myNPC.dialog.leftClickIcon.positionY = -80 + 40
myNPC.dialog.text.fontSize = 18
myNPC.dialog.text.color = Color4.Black()
*/