export interface Vector3State{
  x:number
  y:number
  z:number
}
export interface Quaternion3State{
  x:number
  y:number
  z:number
  w:number
}


export interface ClockState{
  serverTime:number
}
export interface PlayerButtonState{
  forward:boolean
  backward:boolean
  left:boolean
  right:boolean
  shoot:boolean
}

export interface PlayerNpcDataState extends ClockState{
  //move this to player race specific data???
  worldPosition:Vector3State
  //playerPosition:Vector3State //car location will scene center since it does not move
  /*
  closestProjectedPoint:Vector3State //is scene relative, but when used with closestSegmentID + track data can compute where
  worldPosition:Vector3State
  closestSegmentID:number
  closestPointID:number

  closestSegmentPercent:number// relates to closestSegmentID.  what percent of this segement is player at
  closestSegmentDistance:number //how far player is from center, aka the segement
  
  currentSpeed:number
  */
  worldMoveDirection:Quaternion3State//world moving direction
  shootDirection:Quaternion3State //car forward direction
  cameraDirection:Quaternion3State //turn angle
  endTime:number //move this as wont change till the end
  enrollTime: number//time joined
  teamId:string//carModelId:string //move this as wont change much if at all?
  //lapTimes //TODO ADD DEFINITION HERE!!!
  racePosition:number 
  
  lastKnownServerTime:number
  lastKnownClientTime:number

  //isDrifting: boolean
  //currentSpeed : number
}

export type NpcProxyStatus="unknown"|"not-started"|"starting"|"started"|"ended"
export type PlayerConnectionStatus="unknown"|"connected"|"reconnecting"|"disconnected"|"lost connection"

export interface PlayerState{
  id:string
  sessionId:string

  connStatus:PlayerConnectionStatus
  type:"combatant"|"spectator"
  remoteClientCache:InWorldConnectionClientCacheState  

  userData:PlayerUserDataState
  npcData:PlayerNpcDataState
  buttons: PlayerButtonState
}



export interface PlayerUserDataState{
  name:string
  userId:string
  ///snapshotFace128:string snapshots deprecated use AvatarTexture
}

export interface NpcState extends ClockState{
  id:string
  name:string
  status:NpcProxyStatus
  startTime:number
  timeLimit:number
  endTime:number
  endTimeActual:number
  maxLaps:number //move to track data or is max laps race data?
}

//broadcast object instead of linking to state the level details
export interface LevelDataState{
  id:string
  name:string
  //status:RaceStatus

  //theme:Theme
  //FIXME cannot declare this
  trackFeatures:Map<any,ITrackFeatureState>//Map<any,TrackFeatureConstructorArgs>
  localTrackFeatures?:TrackFeatureConstructorArgs[] //for loading only, not for state sharing

  maxLaps:number //move to track data or is max laps race data?
  //trackPath:Vector3State[]
  //other track info?
}


export type TrackFeatureType='boost'|'slow-down'|'inert'|'wall'|'fresh-snow'|'spawn-point'|'ice-tile'|'fireplace'|'trench'|'powerup'

export function getTrackFeatureType(str:string){
  return str as TrackFeatureType
}

export interface TrackFeatureConstructorArgs{
    name:string
    position:ITrackFeaturePosition
    //triggerSize?:Vector3
    //shape:TrackFeatureShape
    type:TrackFeatureType
    lastTouchTime?:number
    activateTime?:number
}
export interface TrackFeatureUpdate extends TrackFeatureConstructorArgs{
  
}

//can we get rid of and replace with 'TrackFeatureConstructorArgs'?

export interface ITrackFeatureState extends ClockState{
  name:string
  position:ITrackFeaturePosition
  //triggerSize?:Vector3
  //shape:TrackFeatureShape
  type:TrackFeatureType 
  lastTouchTime?:number
  activateTime?:number
}

export interface TrackFeatureStateConstructorArgs extends ITrackFeatureState{
}

export type TrackFeaturePositionConstructorArgs={
  position?:Vector3State//optional, if set its the exact spot
  rotation?:Quaternion3State//optional, if set its the exact rotation
}

export function createTrackFeaturePositionConstructorArgs(position:ITrackFeaturePosition){
  return { 
      position: position.position,
      rotation: position.rotation,
  } 
}

export interface ITrackFeaturePosition{
  position?:Vector3State//optional, if set its the exact spot
  rotation?:Quaternion3State//optional, if set its the exact rotation

}
export class TrackFeaturePosition implements ITrackFeaturePosition{
  position?:Vector3State//optional, if set its the exact spot
  rotation?:Quaternion3State//optional, if set its the exact rotation
  startSegment:number
  endSegment:number
  offset?:Vector3State
  centerOffset?:number
  //entity:Entity

  constructor(args:TrackFeaturePositionConstructorArgs){
    this.position = args.position
    this.rotation = args.rotation
  }
}

export interface NpcRoomDataOptions{
  levelId:string
  name?:string
  maxLaps?:number
  maxPlayers?:number
  minPlayers?:number
  customRoomId?:string
  timeLimit?:number
  waitTimeToStart?:number
}


export interface EnrollmentState extends ClockState{
  open:boolean
  startTime:number
  endTime:number
  maxPlayers:number
}


export interface NpcGameRoomState{
  players:Map<any,PlayerState>
  npcState:NpcState
  enrollment:EnrollmentState
  levelData:LevelDataState
}

export type ShowMessage={
  title:string,
  message:string,
  duration:number,
  isError:boolean
}

/////IN WORLD

export enum ChatPacketType {
  UNKNOWN = 0,
  TEXT = 1,
  AUDIO = 2,
  CUSTOM = 3,
  EMOTION = 4,
  CONTROL = 5,
  TRIGGER = 99 //custom number, inworlds sdk calls it 'trigger' as string
}
export enum ChatControlType {
  UNKNOWN = 0,
  INTERACTION_END = 3
}
export interface ChatPacketProps {
  audio?: AudioEvent;
  control?: ControlEvent;
  custom?: CustomEvent;
  emotions?: EmotionEvent;
  packetId: PacketId;
  routing: Routing;
  text?: TextEvent;
  date: string;
  type: ChatPacketType;
}

export interface PacketId {
  packetId: string;
  utteranceId: string;
  interactionId: string;
}
export interface EmotionEvent {
  joy: number;
  fear: number;
  trust: number;
  surprise: number;
  //behavior: EmotionBehavior;
  behavior?:any//FIXME DEFINE CORRECTLY, is this new?
  strength?:any//FIXME DEFINE CORRECTLY, is this new?
  //strength: EmotionStrength;
}
export interface Routing {
  source: Actor;
  target: Actor;
}

export interface Actor {
  name: string;
  isPlayer: boolean;
  isCharacter: boolean;
  xId?:CharacterId
}
export interface TextEvent {
  text: string;
  final: boolean;
}
export interface CustomEvent {
  name: string;
}
export interface AudioEvent {
  chunk: string;
}
export interface ControlEvent {
  type: ChatControlType;
}


export interface IChatPacket {
  type:ChatPacketType;
  date: string;
  packetId: PacketId;
  routing: Routing;
  text: TextEvent;
  audio: AudioEvent;
  control: ControlEvent;
  custom: CustomEvent;
  emotions: EmotionEvent;
}
export class ChatPacket implements IChatPacket{
  type:ChatPacketType;
  date: string;
  packetId: PacketId;
  routing: Routing;
  text: TextEvent;
  audio: AudioEvent;
  control: ControlEvent;
  custom: CustomEvent;
  emotions: EmotionEvent;
  constructor(props: ChatPacketProps){
    this.type = props.type
    this.date = props.date
    this.audio = props.audio
    this.packetId = props.packetId
    this.routing = props.routing
    this.text = props.text
    this.emotions = props.emotions
    this.control = props.control
    this.custom = props.custom
  }
  /*isText(): boolean;
  isAudio(): boolean;
  isControl(): boolean;
  isCustom(): boolean;
  isEmotion(): boolean;
  isInteractionEnd(): boolean;*/
}


/////IN WORLD custom


export class InWorldConnectionClientCacheState{
  currentCharacterId:CharacterId
  currentSceneTrigger:TriggerId
}


export interface ChatMessageProps extends ChatPacketProps{
}

export class ChatMessage implements IChatPacket{
  type:ChatPacketType;
  date: string;
  packetId: PacketId;
  routing: Routing;
  text: TextEvent;
  audio: AudioEvent;
  control: ControlEvent;
  custom: CustomEvent;
  emotions: EmotionEvent;
  constructor(props: ChatMessageProps){
    this.type = props.type
    this.date = props.date
    this.audio = props.audio
    this.packetId = props.packetId
    this.routing = props.routing
    this.text = props.text
    this.emotions = props.emotions
    this.control = props.control
    this.custom = props.custom
  }
  /*isText(): boolean;
  isAudio(): boolean;
  isControl(): boolean;
  isCustom(): boolean;
  isEmotion(): boolean;
  isInteractionEnd(): boolean;*/
}

export type CharacterId={
  resourceName:string
  //id:string
}
export type TriggerId={
  name:string
  //id:string
}
