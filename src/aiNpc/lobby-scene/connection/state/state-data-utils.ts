import { GAME_STATE } from 'src/state';
import * as serverState from 'src/aiNpc/lobby-scene/connection/state/server-state-spec'
import * as clientState from 'src/aiNpc/lobby-scene/connection/state/client-state-spec'

import { CONFIG } from 'src/config';
import { isNull } from 'src/utils/utilities';


export type PlayerRankingsType={
  gamePosition:number
  //totalProgre:number
  name:string
  id:string
  isPlayer:boolean
  endTime:number
  health:number
  healthMax:number
  score:number
  connStatus:serverState.PlayerConnectionStatus
}
export function inGameFormatPlayerName(val:clientState.PlayerState):string{
  let name = val.userData.name
  if(addYOUToName(val)){
      name += "(you)"
  }
  if(val.connStatus !== 'connected'){
      name += "("+val.connStatus+")"
  }
  return name
}

function addYOUToName(val:clientState.PlayerState){
  return val.sessionId == GAME_STATE.getNpcRoom().sessionId && val.userData.name.indexOf("#") > 0
}

export function sortPlayersByPosition(players:clientState.PlayerMapState,nameFormatter?:(val:clientState.PlayerState)=>string){
  const playerData:PlayerRankingsType[] = []
   
  if(isNull(players)){
    return playerData;
  }

  players.forEach(
      (val:clientState.PlayerState)=>{
        const isPlayer = false
          let name = nameFormatter ? nameFormatter(val) : inGameFormatPlayerName(val)
          
          //const closestSegId = (val.racingData.closestSegmentID !== undefined) ? val.racingData.closestSegmentID: 0
          //const percentOfSeg = (val.racingData.closestSegmentPercent !== undefined) ? val.racingData.closestSegmentPercent: 0
          //const lap = (val.racingData.lap !== undefined) ? val.racingData.lap: 0
          const racePosition = (val.npcData.racePosition !== undefined) ? val.npcData.racePosition: 99
          //const color:teamColor = val.battleData.teamId == CONFIG.TEAM_BLUE_ID ? teamColor.BLUE : teamColor.RED
          //playerData.push( {id:val.sessionId,name:name,totalProgress: (lap + 1) * closestSegId + percentOfSeg })
          playerData.push( {id:val.sessionId,name:name,gamePosition: racePosition,isPlayer:isPlayer
              ,endTime:val.npcData.endTime
              ,connStatus:val.connStatus
              ,health:0
              ,healthMax:0
              ,score: 0
              //,team:color 
            })
      }
  )

  

  const playerDataRanked = playerData.sort((n1,n2) => {
    if(n1.gamePosition === undefined) return 1
    if(n2.gamePosition === undefined) return -1
    return n1.gamePosition < n2.gamePosition ? -1 : 1
  });

  return playerDataRanked
}