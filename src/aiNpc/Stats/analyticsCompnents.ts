import { ANALYTICS_EVENT_KEYS, ANALYTICS_GENERIC_EVENTS, AnalyticsLogLabel } from "./AnalyticsConfig"
import { sendTrack } from "./Segment"

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function randomChar(): string {
  return characters.charAt(Math.floor(Math.random() * characters.length))
}
function generateGUID(): string{
  return ([...Array(36)].map(() => randomChar()).join(''))
}

const rootGuid = generateGUID()

@Component("TrackingElement")
export class TrackingElement {
  parent: Entity
  rootGuid: string
  guid: string
  elementType: string
  elementId: string

  startTime: number = 0
  isStarted: boolean = false

  constructor(inEelementType: string, inElementId: string, parent?:Entity) {
    this.rootGuid = rootGuid
    this.parent = parent
    this.guid = generateGUID()
    this.elementType = inEelementType
    this.elementId = inElementId
    this.isStarted = false
  }
}



export const ANALYTIC_ENTITY_REGISTRY = {

}

export function registerAnalyticsEntity(ent:Entity){
  const key = ent.getComponent(TrackingElement).elementId
  ANALYTIC_ENTITY_REGISTRY[ key ] = ent
}
export function getRegisteredAnalyticsEntity(key:string){
  return ANALYTIC_ENTITY_REGISTRY[ key ]
}

export function getParentGuid(trackingElement: TrackingElement){
  //TODO recursive look for tracking parent 
  if(trackingElement.parent && trackingElement.parent.hasComponent(TrackingElement)){
    return trackingElement.parent.getComponent(TrackingElement).guid
  }
  //default is root
  return trackingElement.rootGuid
}
export function trackStart(trackingElement: TrackingElement, inTrackingKey?: string, event?: string) {
  if (trackingElement === null || trackingElement === undefined) {
    log(AnalyticsLogLabel, "Tracking Element can't be Null Or Undefined")
    return
  }
  if (trackingElement.isStarted) {
    log(AnalyticsLogLabel, "Event Already Started")
    return
  }
  trackingElement.isStarted = true
  trackingElement.startTime = Date.now()
  let eventKey: string = event ? event : ANALYTICS_GENERIC_EVENTS.start
  let trackingKey: string = inTrackingKey ? inTrackingKey : ANALYTICS_EVENT_KEYS.scene_element_visit
  sendTrack(
    trackingKey,
    trackingElement.elementType,
    trackingElement.elementId,
    trackingElement.rootGuid,
    getParentGuid(trackingElement),
    trackingElement.guid,
    eventKey,
    null,
    null
  )
}

export function trackAction(trackingElement: TrackingElement, eventKey: string, selection: string,selectionDesc?:string) {
  if (trackingElement === null || trackingElement === undefined) {
    log(AnalyticsLogLabel, "Tracking Element can't be Null Or Undefined")
    return
  }
  sendTrack(
    ANALYTICS_EVENT_KEYS.scene_element_event,
    trackingElement.elementType,
    trackingElement.elementId,
    trackingElement.rootGuid,
    getParentGuid(trackingElement),
    trackingElement.guid,
    eventKey,
    undefined,
    selection,
    selectionDesc
  )
}

export function trackEnd(trackingElement: TrackingElement, inTrackingKey?: string, event?: string) {
  if (trackingElement === null || trackingElement === undefined) {
    log(AnalyticsLogLabel, "Tracking Element can't be Null Or Undefined")
    return
  }
  trackingElement.isStarted = false
  trackingElement.startTime = Date.now() - trackingElement.startTime
  let eventKey: string = event ? event : ANALYTICS_GENERIC_EVENTS.end
  let trackingKey: string = inTrackingKey ? inTrackingKey : ANALYTICS_EVENT_KEYS.scene_element_visit
  sendTrack(
    trackingKey,
    trackingElement.elementType,
    trackingElement.elementId,
    trackingElement.rootGuid,
    getParentGuid(trackingElement),
    trackingElement.guid,
    eventKey,
    trackingElement.startTime,
    undefined
  )
}