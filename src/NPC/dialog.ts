import { Dialog } from '../../node_modules/@dcl/ui-utils/utils/types'
import { nextDay, updateProgression } from '../halloweenQuests/progression'
import { quest } from '../halloweenQuests/quest'
import * as ui from '../../node_modules/@dcl/ui-utils/index'
import { lady } from '../game'
import { startGemUI } from '../halloweenQuests/pumpkin'

/// DAY 1

export let day1Intro: Dialog[] = [
  {
    text: `Hi dear, it was you I was on the phone with earlier, right?`,
    triggeredByNext: () => {},
  },
  {
    text: `I have an idea of who might have killed that person... but I'd appreciate a little help first.`,
    triggeredByNext: () => {
      //lady.playAnimation(`HeadShake_No`, true, 1.83)
    },
  },
  {
    text: `There's these rotting pumpkins scattered all over the plaza... people throw them about weeks before halloween, and then they rot out and never bother to pick them up.`,
    triggeredByNext: () => {
      quest.showCheckBox(3)
      //lady.playAnimation(`Annoyed_HeadShake`, true, 2.6)
    },
  },
  {
    text: `Would you mind taking a round and getting rid of them?`,
    isQuestion: true,
    ifPressE: 4,
    ifPressF: 5,
    triggeredByNext: () => {
      //lady.playAnimation(`Dismissing`, true, 3.3)
    },
  },
  {
    text: `Oh good, I knew you were a good person!`,
    triggeredByNext: () => {
      startGemUI()
    },
    isEndOfDialog: true,
  },
  {
    text: `Too bad. I guess I can't really trust you with confidential information, I have no idea who you are.`,
    isEndOfDialog: true,
  },
]

export let firstPumpkin: Dialog[] = [
  {
    text: `Nice! That felt good, right? There are plenty more of those around the plaza, go find them!`,
    isEndOfDialog: true,
  },
]

export let morePumpkins: Dialog[] = [
  {
    text: `There are still more rotten pumpkins out there, I can smell them from here`,
    isEndOfDialog: true,
  },
]

export let resetPumpkins: Dialog[] = [
  {
    text: `Too slow, we need to start over!`,
    isEndOfDialog: true,
  },
]

export let allPumpkins: Dialog[] = [
  {
    text: `Great job, that's the last one! Come on over here now and I'll tell you.`,
    isEndOfDialog: true,
  },
]

export let day1Success: Dialog[] = [
  {
    text: `Thank you so much! I can already smell the difference, can you?  Maybe I just have a really acute sense of smell.`,
  },
  {
    text: `Let me tell you what I know. So this shady person came to me and was asking me to wash their clothes... the nerve on that guy!`,
    triggeredByNext: () => {
      //lady.playAnimation(`HeadShake_No`, true, 1.83)
    },
  },
  {
    text: `Not just that, these clothes were all stained in blood. Super weird.`,
    triggeredByNext: () => {
      //lady.playAnimation(`HeadShake_No`, true, 1.83)
    },
  },
  {
    text: `Then I heard about the dead body, town gossip travels fast, and then it was easy to tie those two together.`,
    triggeredByNext: () => {
      // lady.playAnimation(`HeadShake_No`, true, 1.83)
    },
  },
  {
    text: `After a very awkward exchange, he ran off towards the West, went behind the wearables building, and I couldn't see him anymore.`,
    triggeredByNext: () => {
      //lady.playAnimation(`HeadShake_No`, true, 1.83)
    },
  },
  {
    text: `Might be worth checking around that building.`,
    triggeredByNext: () => {
      quest.showCheckBox(4)
      quest.showCheckBox(5)
      //lady.playAnimation(`HeadShake_No`, true, 1.83)
    },
    isEndOfDialog: true,
  },
]

export let day1Outro: Dialog[] = [
  {
    text: `This is a really interesting finding, well done!`,
    triggeredByNext: () => {
      quest.checkBox(5)
      updateProgression('NPCOutroDay1')
      //lady.playAnimation(`HeadShake_No`, true, 1.83)
    },
  },
  {
    text: `These shoes look just like the ones that the undertaker at the cemetery had on`,
    triggeredByNext: () => {
      // lady.playAnimation(`HeadShake_No`, true, 1.83)
    },
  },
  {
    text: `I tell you what, come by tomorrow, same place, and wee can plan our next moves then!`,
    triggeredByNext: () => {
      //lady.playAnimation(`HeadShake_No`, true, 1.83)

      quest.showCheckBox(5)
      updateProgression('NPCOutroDay1')
      nextDay(2)
      //   if (progression.data.day > 1) {
      //     lady.talk(day2Intro, 0)
      //   }
    },
    isEndOfDialog: true,

    // if can go to day 2, pass over to day 2
  },
]

export let day2Intro: Dialog[] = [
  {
    text: `Hi dear, go check out the graveyard.`,
    isEndOfDialog: true,
    triggeredByNext: () => {
      quest.checkBox(0)
      quest.showCheckBox(1)
      updateProgression('NPCOutroDay2')
    },
  },
]

export let day3Intro: Dialog[] = [
  {
    text: `Hi dear, go do the ray puzzle thing.`,
    isEndOfDialog: true,
    triggeredByNext: () => {
      quest.checkBox(0)
      quest.showCheckBox(1)
      updateProgression('NPCOutroDay3')
    },
  },
]

export let day4Intro: Dialog[] = [
  {
    text: `Hi dear, go check out the monster thing in the farm.`,
    isEndOfDialog: true,
    triggeredByNext: () => {
      quest.checkBox(0)
      quest.showCheckBox(1)
      updateProgression('NPCOutroDay4')
    },
  },
]

export let day5Intro: Dialog[] = [
  {
    text: `Hey. I'm not the old lady. The old lady was a lie.`,
    isEndOfDialog: true,
    triggeredByNext: () => {
      quest.checkBox(0)
      quest.showCheckBox(1)
      updateProgression('NPCOutroDay5')
    },
  },
]

export let dismiss: Dialog[] = [
  {
    text: `Hey old friend!  Look me up tomorrow and we'll continue to unravel this mystery!`,
    isEndOfDialog: true,
  },
  {
    text: `Check in with me tomorrow, same time same place!`,
    isEndOfDialog: true,
  },
  {
    text: `There's clearly more to this mystery than we've found so far! But let me rest my bones a little and we'll continue tomorrow.`,
    isEndOfDialog: true,
  },
]

export let stay: Dialog[] = [
  {
    text: `Don't walk away from the plaza! What we're looking for has to be somewhere here.`,
    isEndOfDialog: true,
  },
]
