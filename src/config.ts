import { HalloweenState } from './halloweenQuests/quest'

export const TESTDATA_ENABLED = true
export let IN_PREVIEW: boolean = false

export function setInPreview(val: boolean) {
  IN_PREVIEW = val
}

export let TESTQUESTSTATE: HalloweenState = {
  data: {
    // day 1
    allHouses: true,
    phone: true,
    pumpkinDone: false,
    w1Found: false,

    // day 2
    NPCIntroDay2: false,
    ghostsDone: false,
    w2Found: false,

    // day 3
    NPCIntroDay3: false,
    puzzleDone: false,
    w3Found: false,

    // day 4
    NPCIntroDay4: false,
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
