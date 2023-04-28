import * as utils from '@dcl/ecs-scene-utils'
import { Dialog } from '@dcl/npc-scene-utils'
import { REGISTRY } from "src/registry";

let autoCloseDialog = false

const followYesButton = { label: "Yes", goToDialog: "follow-yes",triggeredActions: ()=>{
  autoCloseDialog = true
  utils.setTimeout( 5000, ()=>{
    /*
    autoCloseDialog = false
    if(REGISTRY.tourManager.npc.dialog.isDialogOpen){
      log("dialog open.closing.fired ")
      if(autoCloseDialog){
        //TODO FIX AUTO CLOSE, NEED TO TO detect if it the Come On window still or not
        REGISTRY.tourManager.npc.dialog.closeDialogWindow()
        if( REGISTRY.tourManager.tourState != TourState.TOURING
          && REGISTRY.tourManager.tourState != TourState.TOURING_WAITING_4_PLAYER ){
          REGISTRY.tourManager.setTourState(TourState.TOURING_START)
        }else{
          //is it the keep up one???
          //debugger
        }
      }else{
        log("dialog open.closing.not acted upon ")
      }
      
    }else{
      log("dialog already closed")
    }*/
  })
  
} }

const followWhiteRabbitButtons = [
  followYesButton,
  { label: "No", goToDialog: "follow-no" }
]

const askWaitingForResponse:Dialog = {
  name: "waiting-for-response",
  text: "...",
  //offsetX: 60,
  isQuestion: false,
  skipable: false,
  isEndOfDialog:true
}



export function initDialogs(){
  REGISTRY.askWaitingForResponse = askWaitingForResponse
}