import { HalloweenState } from './halloweenQuests/quest'

export const TESTDATA_ENABLED = true
export let IN_PREVIEW: boolean = false

export function setInPreview(val: boolean) {
  IN_PREVIEW = val
}

export let TESTQUESTSTATE: HalloweenState = {
  data: {
    // day 1
    house1: true,
    house2: true,
    house3: true,
    house4: true,
    house5: true,
    foundBody: true,
    phone: true,
    NPCIntroDay1: true,
    pumpkinDone: true,
    w1Found: true,
    w1Claimed: false,
    NPCOutroDay1: false,

    // day 2
    NPCIntroDay2: false,
    ghostIntro: false,
    ghostsDone: false,
    w2Found: false,
    w2Claimed: false,
    NPCOutroDay2: false,

    // day 3
    NPCIntroDay3: false,
    puzzleDone: false,
    w3Found: false,
    w3Claimed: false,
    NPCOutroDay3: false,

    // day 4
    NPCIntroDay4: false,
    monsterDefeated: false,
    w4Found: false,
    w4Claimed: false,
    NPCOutroDay4: false,

    // day 5
    NPCIntroDay5: false,
    waypoint1: false,
    waypoint2: false,
    waypoint3: false,
    waypoint4: false,
    waypoint5: false,
    ghostDefeated: false,
    NPCOutroDay5: false,
    w5Claimed: false,
  },
  day: 5,
}
