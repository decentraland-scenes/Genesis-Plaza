import { ColyseusCallbacksCollection,ColyseusCallbacksArray, ColyseusCallbacksMap, ColyseusCallbacksReferences } from "./client-colyseus-ext"
import * as serverStateSpec from "./server-state-spec"


export type PlayerMapState=ColyseusCallbacksMap<any,serverStateSpec.PlayerState> & Map<any,serverStateSpec.PlayerState> &{
}
export type InWorldConnectionClientCacheState=ColyseusCallbacksMap<any,serverStateSpec.InWorldConnectionClientCacheState> & Map<any,serverStateSpec.InWorldConnectionClientCacheState> &{
}
export type PlayerState=ColyseusCallbacksReferences<serverStateSpec.PlayerState> & serverStateSpec.PlayerState & {
    userData:PlayerUserDataState
    npcData:PlayerNpcRoomDataState
    buttons: PlayerButtonState
    remoteClientCache:  InWorldConnectionClientCacheState
}

export type PlayerNpcRoomDataState= ColyseusCallbacksReferences<serverStateSpec.PlayerNpcDataState> & serverStateSpec.PlayerNpcDataState & {
}
export type PlayerButtonState= ColyseusCallbacksReferences<serverStateSpec.PlayerButtonState> & serverStateSpec.PlayerButtonState & {
}
export type NpcState= ColyseusCallbacksReferences<serverStateSpec.NpcState> & serverStateSpec.NpcState & {
}
export type EnrollmentState= ColyseusCallbacksReferences<serverStateSpec.EnrollmentState> & serverStateSpec.EnrollmentState & {
    
}

export type PlayerUserDataState= ColyseusCallbacksReferences<serverStateSpec.PlayerUserDataState> & serverStateSpec.PlayerUserDataState & {
}

export type Vector3State= ColyseusCallbacksReferences<serverStateSpec.Vector3State> & serverStateSpec.Vector3State & {
}

export type ITrackFeatureState = ColyseusCallbacksReferences<serverStateSpec.ITrackFeatureState> & serverStateSpec.ITrackFeatureState & {   
    
}

export type LevelDataState = ColyseusCallbacksReferences<serverStateSpec.LevelDataState> & serverStateSpec.LevelDataState & {   
    trackFeatures?:ColyseusCallbacksMap<any,serverStateSpec.ITrackFeatureState> & Map<any,serverStateSpec.ITrackFeatureState>
}

export type NpcGameRoomState=ColyseusCallbacksReferences<serverStateSpec.NpcGameRoomState> & serverStateSpec.NpcGameRoomState & {
    players:PlayerMapState
    npcData:NpcState
    enrollment:EnrollmentState
    levelData:LevelDataState
}
type Vector3Type = serverStateSpec.Vector3State&{
    
}
export class Vector3StateSupport implements serverStateSpec.Vector3State{
    x:number
    y:number
    z:number
    
    constructor(x:number,y:number,z:number){
        this.x = x;
        this.y = y
        this.z = z
    }
    copyFrom(vec:Vector3Type){
        this.x = vec.x
        this.y = vec.y
        this.z = vec.z
    }
}
