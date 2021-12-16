import * as ui from '@dcl/ui-scene-utils'
import {
  CoordsEnum,
  QUEST_FIND_PRESENTS,
  QUEST_HOW_CAN_I_HELP,
  QUEST_LIGHT_UP_TREE,
  QUEST_OPEN_PRESENT,
  QUEST_SNOWMAN,
} from '../config'
import { progression } from './progression'

export type QuestData = {
  // day 1
  intro: boolean
  snowman: boolean
  tree: boolean
  music: boolean
  presents: boolean
  w1Found: boolean

  // day 2
  NPCIntroDay2: boolean
  catchPresents: boolean
  w2Found: boolean

  // day 3
  NPCIntroDay3: boolean
  droppedGood: boolean
  droppedBad: boolean
  w3Found: boolean

  // extra
  highScore1?: boolean
  highScore2?: boolean
  highScore3?: boolean
  egg1?: boolean
  egg2?: boolean
  egg3?: boolean
}

export type QuestState = { data: QuestData; day: number }
