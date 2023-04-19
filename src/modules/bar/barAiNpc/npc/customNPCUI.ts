import { DataChange, Room, RoomAvailable } from "colyseus.js";
import { GAME_STATE, PlayerState } from "src/state";
import * as clientState from "src/modules/bar/barAiNpc/npc-scene/connection/state/client-state-spec";
import * as serverState from "src/modules/bar/barAiNpc/npc-scene/connection/state/server-state-spec";
import * as serverStateSpec from "src/modules/bar/barAiNpc/npc-scene/connection/state/server-state-spec";

//import * as SceneData from "src/og-decentrally/modules/scene";
//import * as gameUI from "../ui/index";
import * as utils from "@dcl/ecs-scene-utils";
//import { Enemy, ENEMY_MGR } from "src/og-decentrally/modules/playerManager";
import { createEntityForSound, createEntitySound, isNull, notNull, realDistance } from "src/modules/bar/barAiNpc/utils/utilities";
import * as ui from "@dcl/ui-scene-utils";


import { REGISTRY } from "src/registry";
import { Dialog, DialogWindow,ButtonData } from "@dcl/npc-scene-utils";
import resources, { setSection } from "src/dcl-scene-ui-workaround/resources";
import { closeAllInteractions } from "src/modules/bar/barAiNpc/npc/npcSetup";
import { ChatNext, ChatPart, streamedMsgs } from "src/modules/bar/barAiNpc/npc/streamedMsgs";
import { createMessageObject, sendMsgToAI } from "../lobby-scene/connection/onConnect";

const canvas = ui.canvas



const inputContainer = new UIContainerRect(canvas)
/*
inputContainer.width = "300"
inputContainer.height = "50"
inputContainer.hAlign = "center"
inputContainer.vAlign = "bottom"
inputContainer.positionY = -10 
inputContainer.color = Color4.Blue()
inputContainer.opacity = 1
inputContainer.visible = false*/

const askSomethingElse = new ui.CustomPrompt(ui.PromptStyles.DARKLARGE,500,200)
askSomethingElse.hide()//immeidatly hide it
askSomethingElse.background.vAlign = 'bottom'

askSomethingElse.addText("some text",0,100,Color4.White())
askSomethingElse.addButton("button1",-100,-100,()=>{})
askSomethingElse.addButton("Good Bye",100,-100,()=>{
  showInputOverlay(false)
})

export function showInputOverlay(val:boolean){
  if(val){
    askSomethingElse.show()
  }else{
    askSomethingElse.hide()
  }
}

const inputBackground = new UIImage(askSomethingElse.background,new Texture("images/DispenserAtlas.png"))
setSection(inputBackground,resources.backgrounds.promptBackground)
inputBackground.width = "100%"
inputBackground.height = "100%"
inputBackground.vAlign = "center"
inputBackground.hAlign = "center"



const textInput = new UIInputText(askSomethingElse.background)
textInput.width = "80%"
textInput.height = "25px"
textInput.vAlign = "center"
textInput.hAlign = "center"
textInput.fontSize = 10
textInput.placeholder = "Ask question here"
//textInput.placeholderColor = Color4.Gray()
textInput.positionY = "0"
textInput.isPointerBlocker = true


   
textInput.onTextSubmit = new OnTextSubmit((x) => {
  log("sending ", x)
  //REGISTRY.activeNPC.dialog.closeDialogWindow()
  closeAllInteractions()
  //utils.setTimeout(200,()=>{ 
    const chatMessage:serverStateSpec.ChatMessage = createMessageObject(x.text,undefined,GAME_STATE.gameRoom)
    sendMsgToAI(chatMessage) 
  //} 
  textInput.value =""  
}) 

const sendButton = new UIImage(askSomethingElse.background,new Texture("images/DispenserAtlas.png"))
setSection(sendButton,resources.buttons.roundGold) 
sendButton.width = "25"
sendButton.height = "25px"
sendButton.vAlign = "bottom"
sendButton.hAlign = "right"
//sendButton.fontSize = 10
//sendButton.placeholder = "Write message here"
//textInput.placeholderColor = Color4.Gray()
sendButton.positionY = "10"
sendButton.isPointerBlocker = true
 
   
 