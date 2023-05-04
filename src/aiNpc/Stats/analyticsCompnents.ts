import { ANALYTICS_EVENT_KEYS, ANALYTICS_GENERIC_EVENTS } from "./AnalyticsConfig"
import { sendTrack } from "./Segment"

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function randomChar(): string{
  return characters.charAt(Math.floor(Math.random() * characters.length))
}

@Component("TrackingElement")
export class TrackingElement {
  guid: string
  elementType: string
  elementId: string

  startTime: number = 0
  isStarted: boolean = false
  
  constructor(inEelementType: string, inElementId) {
    this.guid = ([...Array(36)].map(() => randomChar()).join('') ) 
    this.elementType = inEelementType
    this.elementId = inElementId
    this.isStarted = false
  }

  trackStart(inTrackingKey?: string, event?: string){
    if(this.isStarted){
      log("Event Already Started")
      return
    }
    this.isStarted = true
    this.startTime = Date.now()
    let eventKey: string = event ? event : ANALYTICS_GENERIC_EVENTS.start
    let trackingKey: string = inTrackingKey ? inTrackingKey : ANALYTICS_EVENT_KEYS.scene_element_visit
    sendTrack(trackingKey, this.elementType, this.elementId, this.guid, eventKey, null, null)
  }

  trackAction(eventKey: string, selection: string){
    sendTrack(ANALYTICS_EVENT_KEYS.scene_element_event, this.elementType, this.elementId, this.guid, eventKey, selection, this.startTime)
  }

  trackEnd(inTrackingKey?: string, event?: string){
    this.isStarted = false
    this.startTime = Date.now() - this.startTime
    let eventKey: string = event? ANALYTICS_GENERIC_EVENTS.end : event
    let trackingKey: string = inTrackingKey ? inTrackingKey : ANALYTICS_EVENT_KEYS.scene_element_visit
    sendTrack(trackingKey, this.elementType, this.elementId, this.guid, eventKey, null, this.startTime)
  }
}