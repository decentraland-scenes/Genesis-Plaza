// import {   QuestState } from './quests/quest'

// export const TESTDATA_ENABLED = false
// export let IN_PREVIEW: boolean = false

// export enum CoordsEnum {
//   GenesisCoords = `0,0`,
//   XmasPlazaCoords = `-20,80`,
//   SledgeCoords = `47,67`,
//   Secret = `0,0`,
// }

// export enum WearableEnum {
//   STANTA_WEARABLE_URN =
//   //'urn:decentraland:matic:collections-v2:0x7e553ede9b6ad437262d28d4fe9ab77e63089b8a:1' //text: "Festival Glasses"
//   "urn:decentraland:matic:collections-v2:0xf1483f042614105cb943d3dd67157256cd003028:2" //real santa wearable
//   ,
//   KRUMPUS_WEARABLE_URN =
//   //'urn:decentraland:matic:collections-v2:0x7e553ede9b6ad437262d28d4fe9ab77e63089b8a:1' //text: "Festival Glasses"
//   "urn:decentraland:matic:collections-v2:0xf1483f042614105cb943d3dd67157256cd003028:0" //real krumpus wearable
// }

// export const WEARABLES_TO_CHECK = [
//   WearableEnum.STANTA_WEARABLE_URN,
//   WearableEnum.KRUMPUS_WEARABLE_URN
// ]

// const QUEST_TITLE = 'Save X-mas';

// export const COORDS = CoordsEnum.XmasPlazaCoords

// //state to fallback to should things go badly
// export let FAIL_TO_FETCH_QUEST_STATE: QuestState = {
//   data: {
//     // day 1
//     intro: false,
//     snowman: false,
//     tree: false,
//     music: false,
//     presents: false,
//     w1Found: false,

//     // day 2
//     NPCIntroDay2: false,
//     catchPresents: false,
//     w2Found: false,

//     // day 3
//     NPCIntroDay3: false,
//     droppedGood: false,
//     droppedBad: false,
//     w3Found: false,

//     // extra
//     highScore1: false,
//     highScore2: false,
//     highScore3: false,
//     egg1: true,//star
//     egg2: false,
//     egg3: false,
//   },
//   day: 0,
// }

// //state to fallback to should things go badly
// export let START_QUEST_STATE: QuestState = {
//   data: {
//     // day 1
//     intro: false,
//     snowman: false,
//     tree: false,
//     music: false,
//     presents: false,
//     w1Found: false,

//     // day 2
//     NPCIntroDay2: false,
//     catchPresents: false,
//     w2Found: false,

//     // day 3
//     NPCIntroDay3: false,
//     droppedGood: false,
//     droppedBad: false,
//     w3Found: false,

//     // extra
//     highScore1: false,
//     highScore2: false,
//     highScore3: false,
//     egg1: true,//star
//     egg2: false,
//     egg3: false,
//   },
//   day: 1,
// }

// export let COMPLETED_QUEST_STATE: QuestState = {
//   data: {
//     // day 1
//     intro: true,
//     snowman: true,
//     tree: true,
//     music: false,
//     presents: true,
//     w1Found: true,//when all things complete, and redeemed

//     // day 2
//     NPCIntroDay2: false,
//     catchPresents: false,
//     w2Found: false,

//     // day 3
//     NPCIntroDay3: false,
//     droppedGood: false,
//     droppedBad: false,
//     w3Found: false,

//     // extra
//     highScore1: false,
//     highScore2: false,
//     highScore3: false,
//     egg1: true,//star
//     egg2: false,
//     egg3: false,
//   },
//   day: 1,
// }

// export let TESTQUESTSTATE: QuestState = {
//   data: {
//     // day 1
//     intro: true,
//     snowman: true,
//     tree: true,
//     music: false,
//     presents: true,
//     w1Found: true,//when all things complete, and redeemed

//     // day 2
//     NPCIntroDay2: false,
//     catchPresents: false,
//     w2Found: false,

//     // day 3
//     NPCIntroDay3: false,
//     droppedGood: false,
//     droppedBad: false,
//     w3Found: false,

//     // extra
//     highScore1: false,
//     highScore2: false,
//     highScore3: false,
//     egg1: true,//star
//     egg2: false,
//     egg3: false,
//   },
//   day: 1,
// }

// export const QUEST_HOW_CAN_I_HELP = 0
// export const QUEST_FIND_PRESENTS = 1
// export const QUEST_SNOWMAN = 2
// export const QUEST_LIGHT_UP_TREE = 3
// export const QUEST_PLAY_MUSIC = 5
// export const QUEST_OPEN_PRESENT = 4

// export const UI_FONT = 60
// export const UI_BORDERS_OFF = false

// export function setInPreview(val: boolean) {
//   IN_PREVIEW = val

//   //var console: any

//   if (val) {
//     Input.instance.subscribe('BUTTON_DOWN', ActionButton.PRIMARY, true, (e) => {
//       log(
//         `{ position: new Vector3(`,
//         Camera.instance.position.x,
//         ',',
//         Camera.instance.position.y,
//         ',',
//         Camera.instance.position.z,
//         `) },`
//       )
//       //   if (e.hit) {
//       //     console.log('HIT ENTITY: ', engine.entities[e.hit.entityId])
//       //     console.log(
//       //       'POS: ',
//       //       engine.entities[e.hit.entityId].getComponent(Transform)
//       //     )
//       //   }
//     })
//   }
// }
