import * as serverStateSpec from "src/aiNpc/lobby-scene/connection/state/server-state-spec";
import * as serverState from "src/aiNpc/lobby-scene/connection/state/server-state-spec";
import * as npc from '@dcl/npc-scene-utils'

const CLASSNAME = "streamedMsg.ts"

export function getControlTypeAsInt(type:any):number{

  let _type = type
  if(type === "INTERACTION_END"){
      _type = serverStateSpec.ChatControlType.INTERACTION_END
  }
  if(type === "UNKNOWN"){
    _type = serverStateSpec.ChatControlType.UNKNOWN
}

  return type as number
}

export function getMessageTypeAsInt(type: string|number):number{
  const METHOD_NAME = "getMessageTypeAsInt"
  if((type as any) === 'AUDIO'){
      return serverStateSpec.ChatPacketType.AUDIO
  }
  if((type as any) === 'TEXT'){
    return serverStateSpec.ChatPacketType.TEXT
  }
  if((type as any) === 'EMOTION'){
    return serverStateSpec.ChatPacketType.EMOTION
  }
  if((type as any) === 'CONTROL'){
    return serverStateSpec.ChatPacketType.CONTROL
  }
  return type as number
  /*if(msg.isCustom()){
      return "CUSTOM"
  }*/
  
}
/*
function getMessageTypeAsInt(msg: serverStateSpec.ChatPacket):number{
  const METHOD_NAME = "getMessageTypeAsInt"
  if((msg.type as any) === 'AUDIO'){
      return serverStateSpec.ChatPacketType.AUDIO
  }
  if((msg.type as any) === 'TEXT'){
    return serverStateSpec.ChatPacketType.TEXT
  }
  if((msg.type as any) === 'EMOTION'){
    return serverStateSpec.ChatPacketType.EMOTION
  }
  if((msg.type as any) === 'CONTROL'){
    return serverStateSpec.ChatPacketType.CONTROL
  }
  return msg.type
  
  log(CLASSNAME,METHOD_NAME, "ERROR UNKNOWN TYPE",msg)
}
*/

export class ChatPart{
    
  read:boolean
  packet:serverStateSpec.ChatPacket
  constructor(packet:serverStateSpec.ChatPacket){
    this.packet = packet
    //sanitize
    this.packet.type = getMessageTypeAsInt(this.packet.type)
  }
  
  createNPCDialog(): npc.Dialog {
    log("createNPCDialog.chatpart",this.packet)

    if(this.packet == undefined){
      debugger
    }
    const text = this.packet.text.text
    const dialog:npc.Dialog = {
       //name: "end-of-the-tour-day-0",
       text: text,
       isEndOfDialog: true,//this.packet.text.final,
       isQuestion: false,
       skipable: false, 
       //audio: '',
       
        
     } 
     return dialog
   }
}
/*
class ChatInteractionGrouped{
  text:ChatPart[]
  audio:ChatPart[]
  emotion:ChatPart[]
}*/ 
export class ChatInteraction{
  packets:ChatPart[] = []

  chatIndex:number=0

  audio:ChatPart[] = []
  text:ChatPart[] = []

  add(part:ChatPart){
    this.packets.push(part)
    switch(part.packet.type){
      case serverState.ChatPacketType.TEXT:
        this.text.push( part )
        break;
      case serverState.ChatPacketType.AUDIO:
        this.audio.push( part )
        break;
    }
  }
}
export class ChatNext{
  text:ChatPart
  audio:ChatPart
  control:ChatPart
  emotion:ChatPart
  indexStart:number
  indexEnd:number
  endOfInteraction:boolean
}
export class StreamedMessages{
  streamedMessagesMapById = new Map<string,ChatInteraction>()
  streamedMessages:ChatPart[] = []
  streamedInteractions:ChatInteraction[] = []

  started:boolean = false
  waitingForMore:boolean = false

  //_currInteraction:ChatInteraction
  lastUtteranceId:string

  messageIndex:number=0
  interactionIndex:number=0

  reset(){
    this.started = false
    this.streamedMessages = []
    this.streamedInteractions = []
    this.streamedMessagesMapById = new Map<string,ChatInteraction>()

    this.messageIndex=0
    this.interactionIndex=0
  }

  add(part:ChatPart){
    const interactionId = part.packet.packetId.interactionId

    let interaction = this.streamedMessagesMapById.get(interactionId);
    if(interaction === undefined){
      interaction = new ChatInteraction()
      //this._currInteraction = interaction
      this.streamedInteractions.push(interaction)
      this.streamedMessagesMapById.set(interactionId,interaction)
    }

    this.streamedMessages.push(part)
    interaction.add( part )
  }

  //TODO return true when has a whole utterance group, reguardless of what it is, only emotion, etc.
  //or let hasNext return whole utterance batches and caller has to decide if they want it or not
  //though it wait for next utterance to know current one ended? 
  hasNext():boolean{
    throw new Error("implement me!!!")
    //keep track of last utterance and see if has at least once ahead of it, in which case utterance complete
    //return hasNext
  }
  //right now hardcoded to get audio + text, make this more flexible
  //or let hasNext return whole utterance batches and caller has to decide if they want it or not
  //though it wait for next utterance to know current one ended? 
  hasNextAudioNText(_startIndex?:number):boolean{
    const METHOD_NAME = "hasNextAudioNText"
    let next:ChatNext
    let hasNext = false
    const maxTries=20
    let tried=0
    let _startIndexTmp = _startIndex ? _startIndex : this.messageIndex
    //debugger
    do{  
      next = this._next(false,_startIndexTmp)  
      //not perfect but better than nothing for now
      //need a way to know when stream sent me enough to work with, text is critical so using that
      hasNext = (next.text !== undefined /*&& next.audio !== undefined*/) || next.endOfInteraction
      if(!hasNext && next.indexEnd < this.streamedMessages.length -1){
        //try again 
        log(METHOD_NAME,"hit end of utterance without text/audio but has more stream", "try again" ,"this.messageIndex",this.messageIndex,"_startIndexTmp",_startIndexTmp,this.streamedMessages.length,next)
        _startIndexTmp ++
      }else{
        //debugger
        //now that we found text + audio, update messageIndex so next() call works
        this.messageIndex = next.indexStart
        break; 
      } 
      tried++ 
    }while(tried < maxTries)
    if(tried >= maxTries){
      log(METHOD_NAME,"WARNING HIT MAX RETRIES ON THIS!!!!hit end of utterance without text/audio but has more stream" ,"this.messageIndex",this.messageIndex,this.streamedMessages.length,next)
    }
    //debugger
    return hasNext
  }
  
  next():ChatNext{
    return this._next(true)
  }
  //fixme this is hacky, need a better way to organized streamed data and keep updating scene in real time
  //for now the workaround is let it query again later to see if more came through
  _next(incrementCounter:boolean,_startIndex?:number):ChatNext{
    const METHOD_NAME = "_next("+incrementCounter+","+_startIndex+")"
    //FIXME ugly parsing right now, could be more elegant
    //next should return the next set of "text","audio",control if one exists
    //const part = this.streamedInteractions[this.interactionIndex]
    //debugger
    let audio:ChatPart
    let text:ChatPart 
    let control:ChatPart
    let emotion:ChatPart
    let endOfInteraction=false
    let utteranceId:string|undefined = undefined;

    let counterInc = _startIndex !== undefined ? _startIndex : this.messageIndex 
    const startIndex = counterInc

    let msgIndexTemp = this.messageIndex

    //find next audio and text 
    mainLoop: for(let x = counterInc;x<this.streamedMessages.length;x++){
      const msg = this.streamedMessages[x]

      //TODO include iteractionId into the scanning check
      //this will be a better way to make sure its end of interaction

      //debugger

      //pick up next utterance id
      if(utteranceId === undefined){
        utteranceId = msg.packet.packetId.utteranceId
      }else if(msg.packet.packetId.utteranceId !== utteranceId){
        //hit end of utterance?
        //debugger 
        // utterance can come out of order, keep scanning for a few?
        log(METHOD_NAME,"utterance.end.check hit end??","utteranceId",utteranceId,"next",msg.packet.packetId.utteranceId ,"this.messageIndex","counterInc",counterInc,"loop.x",x,this.messageIndex,this.streamedMessages.length,"START SCAN FORWARD")

        //scan ahead for a control for end of interaction
        const maxScanDist =2 //assume control in next 2 frames (behaviour + control or more text,etc)
        const yMin = Math.min(counterInc+maxScanDist,this.streamedMessages.length)
        let yCounter = 0
        //TODO make scan part of main loop
        scanLoop: for(let y = x;y<yMin;y++){
          const msg = this.streamedMessages[y]
          //should we be checking same interaction id as above?  can a seperate interation close it?
          
          if(utteranceId == msg.packet.packetId.utteranceId){
            //found again, pick up here
            x--

            //debugger
            //move other 2 counters
            msgIndexTemp+= yCounter
            counterInc+= yCounter
            

            log(METHOD_NAME,"utterance.end.check FOUND again","utteranceId",utteranceId,"next",msg.packet.packetId.utteranceId ,"this.messageIndex",this.messageIndex,"counterInc",counterInc,"loop.y",y,this.streamedMessages.length,"returning to ")
            continue mainLoop
          }

          //move main loop counter along as we subscan
          x++
          yCounter++
      
        }//end scan loop
 
        log(METHOD_NAME,"utterance.end.check hit NOT FOUND","utteranceId",utteranceId,"next",msg.packet.packetId.utteranceId ,"this.messageIndex",this.messageIndex,"counterInc",counterInc,"loop.x",x,this.streamedMessages.length,"text",text !== undefined,"audio",audio !== undefined)
        break mainLoop; 
      }  
 
 

      switch(msg.packet.type){
        case serverState.ChatPacketType.TEXT:
          text = msg
          break;
        case serverState.ChatPacketType.AUDIO:
          audio = msg
          break;
        case serverState.ChatPacketType.CONTROL:
          control = msg
          break; 
        case serverState.ChatPacketType.EMOTION:
          emotion = msg
          break; 
      } 
 
       
      
      msgIndexTemp++
      counterInc++
       
    }//end main loop

    //debugger

 
    let futureControl:ChatPart


    if(incrementCounter){
      this.messageIndex = msgIndexTemp 
      counterInc = this.messageIndex
    } 

    //scan ahead for a control for end of interaction
    const maxScanDist =2 //assume control in next 2 frames (behaviour + control or more text,etc)
    scanLoop: for(let x = counterInc;x<Math.min(counterInc+maxScanDist,this.streamedMessages.length);x++){
      const msg = this.streamedMessages[x]
      //should we be checking same interaction id as above?  can a seperate interation close it?
      switch(msg.packet.type){
        case serverState.ChatPacketType.CONTROL:
          futureControl = msg
          break; 
      } 
   
      if(futureControl !== undefined){
          //keep 1 more ahead for control
          break scanLoop;
      } 
    }//end scan loop
 

    if(control !== undefined && control.packet.control.type===serverStateSpec.ChatControlType.INTERACTION_END){
      //debugger
      endOfInteraction = true
    }
    //FIXME right now we use lookend to decide end but this also means that a TEXT packet is return and not a terminal message
    //if we need access to that control we cannot get it.  return this one?  should check if part of same iteractionId
    if(futureControl !== undefined && futureControl.packet.control.type===serverStateSpec.ChatControlType.INTERACTION_END){
      //debugger
      endOfInteraction = true
    }


    //debugger
    if(incrementCounter){ 
      this.lastUtteranceId = utteranceId
    }

    const ret:ChatNext = new ChatNext();
    
    ret.text=text
    ret.audio=audio
    ret.control=control
    ret.emotion=emotion
    ret.endOfInteraction=endOfInteraction
    ret.indexStart=startIndex
    ret.indexEnd=msgIndexTemp
    

    log(METHOD_NAME,"hit end of utterance",utteranceId,"this.messageIndex",this.messageIndex,"msgIndexTemp",msgIndexTemp
      ,"streamedMessages.length",this.streamedMessages.length,"text",text !== undefined,"audio",audio !== undefined,"control",control)

    //this.interactionIndex++
    return ret
  }
}


export const streamedMsgs = new StreamedMessages()
  