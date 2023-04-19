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
import { Dialog, DialogWindow, ButtonData } from "@dcl/npc-scene-utils";
import resources, { setSection } from "src/dcl-scene-ui-workaround/resources";
import { closeAllInteractions } from "src/modules/bar/barAiNpc/npc/npcSetup";
import { ChatNext, ChatPart, streamedMsgs } from "src/modules/bar/barAiNpc/npc/streamedMsgs";
import { createMessageObject, sendMsgToAI } from "../lobby-scene/connection/onConnect";

const canvas = ui.canvas



const buttonsSyle = ui.ButtonStyles.RED
const askSomethingElse = new ui.CustomPrompt(ui.PromptStyles.DARKLARGE, 500, 200)
askSomethingElse.hide()//immeidatly hide it
askSomethingElse.background.vAlign = 'bottom'
askSomethingElse.closeIcon.visible = false

askSomethingElse.addText("Ask something else", 0, 100, Color4.White())
askSomethingElse.addButton("Tell me about \n Decentraland", -100, 35, () => {
  sendMessageToAi("Tell me about Decentraland")
}, buttonsSyle).label.fontSize = 17
askSomethingElse.addButton("What can I do here?", 100, 35, () => {
  sendMessageToAi("what can i do in decentraland?")
}, buttonsSyle).label.fontSize = 17
askSomethingElse.addButton("Good Bye", -0, -20, () => {
  showInputOverlay(false)
}, buttonsSyle)

export function showInputOverlay(val: boolean) {
  if (val) {
    askSomethingElse.show()
    askSomethingElse.closeIcon.visible = false
  } else {
    askSomethingElse.hide()
  }
}

function sendMessageToAi(message: string){
  log("sending ", message)
  //REGISTRY.activeNPC.dialog.closeDialogWindow()
  closeAllInteractions()
  //utils.setTimeout(200,()=>{ 
  const chatMessage: serverStateSpec.ChatMessage = createMessageObject(message, undefined, GAME_STATE.gameRoom)
  sendMsgToAI(chatMessage)
  //} 
  textInput.value = ""
}


const inputContainer = new UIContainerRect(askSomethingElse.background)
inputContainer.width = "300"
inputContainer.height = "50"
inputContainer.hAlign = "center"
inputContainer.vAlign = "bottom"
inputContainer.color = Color4.FromHexString("#FF2C55FF")
inputContainer.opacity = 1
inputContainer.visible = true

const inputBackground = new UIImage(inputContainer, new Texture("images/DispenserAtlas.png"))
setSection(inputBackground, resources.backgrounds.promptBackground)
inputBackground.width = "100%"
inputBackground.height = "100%"
inputBackground.vAlign = "center"
inputBackground.hAlign = "center"


const textInput = new UIInputText(inputContainer)
textInput.width = "97%"
textInput.height = "80%"
textInput.vAlign = "center"
textInput.hAlign = "center"
textInput.fontSize = 10
textInput.placeholder = "  Type your questions here then hit enter..."
textInput.vTextAlign = "center"
textInput.isPointerBlocker = true
textInput.focusedBackground = Color4.FromHexString("#46404AFF")

textInput.onTextSubmit = new OnTextSubmit((x) => {
  log("sending ", x)
  //REGISTRY.activeNPC.dialog.closeDialogWindow()
  closeAllInteractions()
  //utils.setTimeout(200,()=>{ 
  const chatMessage: serverStateSpec.ChatMessage = createMessageObject(x.text, undefined, GAME_STATE.gameRoom)
  sendMsgToAI(chatMessage)
  //} 
  textInput.value = ""
})

const sendQuestion = new UIButton(askSomethingElse.background)
sendQuestion.text = "Ask!"
sendQuestion.positionX = 200
sendQuestion.positionY = 50
sendQuestion.width = 75
sendQuestion.height = 75
sendQuestion.background = Color4.White()


const sendButton = new UIImage(askSomethingElse.background, new Texture("images/DispenserAtlas.png"))
setSection(sendButton, resources.buttons.roundGold)
sendButton.width = "25"
sendButton.height = "25px"
sendButton.vAlign = "bottom"
sendButton.hAlign = "right"
//sendButton.fontSize = 10
//sendButton.placeholder = "Write message here"
//textInput.placeholderColor = Color4.Gray()
sendButton.positionY = "10"
sendButton.isPointerBlocker = true


