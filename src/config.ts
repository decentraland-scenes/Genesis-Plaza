import { HalloweenState } from './halloweenQuests/quest'

export const TESTDATA_ENABLED = false
export let IN_PREVIEW: boolean = false

export function setInPreview(val: boolean) {
  IN_PREVIEW = val
}

export let TESTQUESTSTATE: HalloweenState = {
  data: {
    // day 1
    allHouses: true,
    phone: true,
    pumpkinDone: true,
    w1Found: true,

    // day 2
    NPCIntroDay2: true,
    ghostsDone: true,
    w2Found: true,

    // day 3
    NPCIntroDay3: true,
    puzzleDone: true,
    w3Found: true,

    // day 4
    NPCIntroDay4: true,
    monsterDefeated: false,
    w4Found: false,

    // day 5
    NPCIntroDay5: false,
    waypoint1: false,
    waypoint2: false,
    waypoint3: false,
    waypoint4: false,
    waypoint5: false,
    ghostDefeated: false,
    w5Found: false,
  },
  day: 5,
}
