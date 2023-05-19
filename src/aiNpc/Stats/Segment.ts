import { getUserData } from "@decentraland/Identity"
import { AnalyticsLogLabel, SKIP_ANALYTICS } from "./AnalyticsConfig";
import { getRealm } from "src/modules/realmData";

const SCENE_ID: string = "genesis_plaza"
const IN_SECONDS: boolean = false

let segment: Segment

export function getSegment() {
  if (segment) return segment;

  segment = new Segment('CH4D0eauyRqTDYnqhI0jw1PVPLmaJENj')
  return segment
}

export async function sendTrackOld(eventName: string,) {
  const doc: any = {
    sceneId: SCENE_ID,
    playTime: Date.now() - GenesisData.instance().startPlayTime,
    exactPosition: Camera.instance.worldPosition,
    position: Math.floor(Camera.instance.worldPosition.x / 16) + "," + Math.floor(Camera.instance.worldPosition.z / 16)
  }
  await getSegment().track(eventName, doc)
}

export async function sendTrack(trackEvent: string,
  elementType: string,
  elementId: string,
  instance: string,
  event: string,
  durationTime?: number,
  selection?: string,
  selectionDesc?: string) {


  const realm = await getRealm()

  const doc: any = {
    sceneId: SCENE_ID,
    realm: realm,
    spanId: instance,
    elementType: elementType,
    elementId: elementId,
    event: event,
    selection: selection,
    selectionDesc: selectionDesc,
    durationTime: durationTime && IN_SECONDS ? durationTime * 0.001 : durationTime,

    playTime: Date.now() - GenesisData.instance().startPlayTime,
    exactPosition: Camera.instance.worldPosition,
    position: Math.floor(Camera.instance.worldPosition.x / 16) + "," + Math.floor(Camera.instance.worldPosition.z / 16)
  }
  await getSegment().track(trackEvent, doc)
}

declare function btoa(soruce: string): string

class Segment {

  constructor(public readonly segmentKey: string) { }

  async track(event: string, properties?: Record<string, any>) {
    if (SKIP_ANALYTICS) return
    const userData = await getUserData()
    if (!userData) {
      log(`[ignored] Segment.track("${event}`,properties,`): missing userData`)
      return
    }
    log(`Segment.track("${event}`,properties,`)`)

    const data: SegemntTrack = {
      messageId: messageId(),
      anonymousId: userData.userId,
      timestamp: new Date().toJSON(),
      event,
      properties: {
        ...properties,
      },
      context: {
        library: {
          name: 'dcl-segment-gists',
          version: '0.0.0-development'
        }
      }
    }

    try {

      await fetch(`https://api.segment.io/v1/track`, {
        method: 'POST',
        headers: {
          'authorization': 'Basic ' + btoa(this.segmentKey + ':'),
          'content-type': 'application/json',
        },
        body: JSON.stringify(data)
      })
    } catch (err) {
      log(`[error] Segment.track("${event}"`,properties,`): ${(err as Error)?.message || err}`)
    }
  }
}

const MESSAGE_ID_DATA = 'abcdef0123456789'

function randomChar() {
  return MESSAGE_ID_DATA[Math.floor(Math.random() * MESSAGE_ID_DATA.length)]
}

function messageId() {
  return `dcl-scene-` + [...Array(36)].map(() => randomChar()).join('')
}

/**
 * SegemntTrack 
 * @property {string} anonymousId - The anonymous ID of the user.
 * @property {string} event - The name of the event.
 * @property {string} timestamp - The time the event occurred.
 * @property {string} messageId - A unique identifier for the message.
 * @property properties 
 * @property context 
 */
type SegemntTrack = {
  anonymousId: string,
  event: string,
  timestamp: string
  messageId: string
  properties: Record<string, any>,
  context: Record<string, any>,
}