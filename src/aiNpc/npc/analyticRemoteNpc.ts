import { NPC } from "@dcl/npc-scene-utils";
import { RemoteNpc, RemoteNpcConfig, RemoteNpcOptions } from "./remoteNpc";
import { sendTrack } from "../Stats/Segment";



// turn to component
@Component("trackableEntity")
export class TrackableEntity {
  eventKey: string
  eventStart: string
  eventEnd: string

  constructor(interactKey: string, startKey: string, endKey: string) {
    this.eventKey = interactKey
    this.eventStart = startKey
    this.eventEnd = endKey
  }

  trackInteraction(){
    sendTrack(this.eventKey)
  }

  trackStart(){
    sendTrack(this.eventStart)
  }

  trackEnd(){
    sendTrack(this.eventEnd)
  }
}