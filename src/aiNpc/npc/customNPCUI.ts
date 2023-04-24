import { GAME_STATE } from "src/state";
import * as serverStateSpec from "src/aiNpc/lobby-scene/connection/state/server-state-spec";

import * as ui from "@dcl/ui-scene-utils";


import { REGISTRY } from "src/registry";
import resources, { setSection } from "src/dcl-scene-ui-workaround/resources";

import { closeAllInteractions, createMessageObject, sendMsgToAI } from "./connectedUtils";

const canvas = ui.canvas

const PROMPT_WIDTH = 550

const buttonsSyle = ui.ButtonStyles.RED
const askSomethingElse = new ui.CustomPrompt(ui.PromptStyles.DARKLARGE, PROMPT_WIDTH, 200)
askSomethingElse.hide()//immeidatly hide it
askSomethingElse.background.vAlign = 'bottom'
askSomethingElse.closeIcon.visible = false

   
const portait = askSomethingElse.addIcon('images/portraits/doge.png',-PROMPT_WIDTH/2,0,200,200)
 
askSomethingElse.addText("Ask something else?", 0, 100, Color4.White())
askSomethingElse.addButton("Tell me about \n Decentraland", -100, 35, () => {
  sendMessageToAi("Tell me about Decentraland")
}, buttonsSyle).label.fontSize = 17
askSomethingElse.addButton("What can I do here?", 100, 35, () => {
  sendMessageToAi("what can i do in decentraland?")
}, buttonsSyle).label.fontSize = 17
askSomethingElse.addButton("Good Bye", -0, -20, () => {
  log("askSomethingElse.goodbye")
  showInputOverlay(false)
  REGISTRY.activeNPC?.goodbye()
  //REGISTRY.activeNPC.npc.followPath()
}, buttonsSyle)

//askSomethingElse.show()

export function showInputOverlay(val: boolean) {
  if (val) {
    //copy the portrait being used
    //wish had access to private data REGISTRY.activeNPC.npc.dialog.defaultPortrait to place more dynamically
    portait.image.positionX = -PROMPT_WIDTH/2 + 10//(REGISTRY.activeNPC.npc.dialog.portrait.width/2)
    portait.image.source = REGISTRY.activeNPC.npc.dialog.portrait.source
    portait.image.width = REGISTRY.activeNPC.npc.dialog.portrait.width
    portait.image.height = REGISTRY.activeNPC.npc.dialog.portrait.height
    portait.image.sourceHeight = REGISTRY.activeNPC.npc.dialog.portrait.sourceHeight
    portait.image.sourceWidth = REGISTRY.activeNPC.npc.dialog.portrait.sourceWidth
    portait.image.sourceTop = REGISTRY.activeNPC.npc.dialog.portrait.sourceTop
    portait.image.sourceLeft = REGISTRY.activeNPC.npc.dialog.portrait.sourceLeft

    askSomethingElse.show()
    //ad
    askSomethingElse.closeIcon.visible = false
  } else {
    askSomethingElse.hide()
  }
}

function sendMessageToAi(message: string){
  log("sending ", message)
  //REGISTRY.activeNPC.dialog.closeDialogWindow()
  //close all other interactions to start the new one
  closeAllInteractions({exclude:REGISTRY.activeNPC})
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
  const METHOD_NAME = "textInput.onTextSubmit"
  log(METHOD_NAME,"sending ", x)
  if(textInput.value === textInput.placeholder){
    log(METHOD_NAME,"value matches place holder skipping ", x)
    return;
  }
  if(textInput.value.trim().length === 0){
    log(METHOD_NAME,"value is empty skipping ", x)
    return;
  }
  //REGISTRY.activeNPC.dialog.closeDialogWindow()
  //REGISTRY.activeNPC.endInteraction()
  closeAllInteractions({exclude:REGISTRY.activeNPC})
  //REGISTRY.activeNPC.endInteraction()
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


