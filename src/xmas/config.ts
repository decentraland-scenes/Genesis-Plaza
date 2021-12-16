import {   QuestState } from './quests/quest'

export const TESTDATA_ENABLED = true
export let IN_PREVIEW: boolean = false

export enum CoordsEnum {
  GenesisCoords = `0,0`,
  XmasPlazaCoords = '-22,78',//`-20,80`,
  SledgeCoords = `47,67`,
  Secret = `0,0`,
}

const QUEST_TITLE = 'Save X-mas';
 
export const COORDS = CoordsEnum.XmasPlazaCoords

//state to fallback to should things go badly
export let FAIL_TO_FETCH_QUEST_STATE: QuestState = {
  data: {
    // day 1
    intro: false,
    snowman: false,
    tree: false,
    music: false,
    presents: false,
    w1Found: false,

    // day 2
    NPCIntroDay2: false,
    catchPresents: false,
    w2Found: false,

    // day 3
    NPCIntroDay3: false,
    droppedGood: false,
    droppedBad: false,
    w3Found: false,

    // extra
    highScore1: false,
    highScore2: false,
    highScore3: false,
    egg1: true,//star
    egg2: false,
    egg3: false,
  },
  day: 0,
}

//state to fallback to should things go badly
export let START_QUEST_STATE: QuestState = {
  data: {
    // day 1
    intro: false,
    snowman: false,
    tree: false,
    music: false,
    presents: false,
    w1Found: false,

    // day 2
    NPCIntroDay2: false,
    catchPresents: false,
    w2Found: false,

    // day 3
    NPCIntroDay3: false,
    droppedGood: false,
    droppedBad: false,
    w3Found: false,

    // extra
    highScore1: false,
    highScore2: false,
    highScore3: false,
    egg1: true,//star
    egg2: false,
    egg3: false,
  },
  day: 1,
}

export let COMPLETED_QUEST_STATE: QuestState = {
  data: {
    // day 1
    intro: true,
    snowman: true,
    tree: true,
    music: false,
    presents: true,
    w1Found: true,//when all things complete, and redeemed

    // day 2
    NPCIntroDay2: false,
    catchPresents: false,
    w2Found: false,

    // day 3
    NPCIntroDay3: false,
    droppedGood: false,
    droppedBad: false,
    w3Found: false,

    // extra
    highScore1: false,
    highScore2: false,
    highScore3: false,
    egg1: true,//star
    egg2: false,
    egg3: false,
  },
  day: 1,
}

export let TESTQUESTSTATE: QuestState = {
  data: {
    // day 1
    intro: true,
    snowman: true,
    tree: true,
    music: false,
    presents: true,
    w1Found: true,//when all things complete, and redeemed

    // day 2
    NPCIntroDay2: false,
    catchPresents: false,
    w2Found: false,

    // day 3
    NPCIntroDay3: false, 
    droppedGood: false,
    droppedBad: false,
    w3Found: false,

    // extra
    highScore1: false,
    highScore2: false,
    highScore3: false,
    egg1: true,//star
    egg2: false,
    egg3: false,
  },
  day: 1,
}



export const QUEST_HOW_CAN_I_HELP = 0
export const QUEST_FIND_PRESENTS = 1
export const QUEST_SNOWMAN = 2
export const QUEST_LIGHT_UP_TREE = 3
export const QUEST_PLAY_MUSIC = 5
export const QUEST_OPEN_PRESENT = 4

export const UI_FONT = 60
export const UI_BORDERS_OFF = false

export function setInPreview(val: boolean) {
  IN_PREVIEW = val

  //var console: any

  if (val) {
    Input.instance.subscribe('BUTTON_DOWN', ActionButton.PRIMARY, true, (e) => {
      log(
        `{ position: new Vector3(`,
        Camera.instance.position.x,
        ',',
        Camera.instance.position.y,
        ',',
        Camera.instance.position.z,
        `) },`
      )
      //   if (e.hit) {
      //     console.log('HIT ENTITY: ', engine.entities[e.hit.entityId])
      //     console.log(
      //       'POS: ',
      //       engine.entities[e.hit.entityId].getComponent(Transform)
      //     )
      //   }
    })
  }
}
