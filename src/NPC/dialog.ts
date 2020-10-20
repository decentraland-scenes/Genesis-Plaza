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
    triggeredByNext: () => {
      lady.playAnimation(`HeadShake_No`, true, 1.83)
    },
  },
  {
    text: `So terrible what happened to that poor girl. Something really strange happened to me that I think could be connected.`,
    triggeredByNext: () => {
      lady.playAnimation(`Happy Hand Gesture`, true, 2.97)
    },
  },

  {
    text: `I'll tell you all about it, but first I could use a little help around here.`,
    triggeredByNext: () => {
      lady.playAnimation(`HeadShake_No`, true, 1.83)
    },
  },

  {
    text: `There's these rotting pumpkins scattered all over the plaza... people throw them about to decorate things weeks before halloween.`,
    triggeredByNext: () => {
      quest.showCheckBox(3)
      lady.playAnimation(`Relieved`, true, 3.03)
    },
  },
  {
    text: `The thing is, these things then rot, and no one bothers to pick them up.`,
    triggeredByNext: () => {
      quest.showCheckBox(3)
      lady.playAnimation(`Happy Hand Gesture`, true, 2.97)
    },
  },
  {
    text: `Would you mind taking a look around and getting rid of the rotting ones?`,
    isQuestion: true,
    ifPressE: 6,
    ifPressF: 7,
    triggeredByE: () => {
      lady.playAnimation(`Head_Yes`, true, 2.63)
    },
    triggeredByF: () => {
      lady.playAnimation(`Dismissing`, true, 3.3)
    },
  },
  {
    text: `Oh good, I could see the kindness in your eyes, I knew you were good hearted!`,
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
    text: `That felt good, right? There are plenty more around the plaza, go find them!`,
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
    text: `Too slow, we should start over!`,
    isEndOfDialog: true,
  },
]

export let allPumpkins: Dialog[] = [
  {
    text: `Great job, that's the last one! Come on over here and we'll have a chat.`,
    isEndOfDialog: true,
  },
]

export let day1Success: Dialog[] = [
  {
    text: `Thank you so much! I can already smell the difference, can you?  Maybe I just have a really acute sense of smell.`,
    triggeredByNext: () => {
      lady.playAnimation(`Hard Head`, true, 1.67)
    },
  },
  {
    text: `Let me tell you what I know. So this shady person came to me and was asking me to wash their clothes... the nerve on that guy!`,
    triggeredByNext: () => {
      lady.playAnimation(`Lengthy`, true, 1.77)
    },
  },
  {
    text: `Why bring your clothes to me? Not just that, these clothes were all stained in blood. Super weird.`,
    triggeredByNext: () => {
      lady.playAnimation(`Happy Hand Gesture`, true, 2.97)
    },
  },
  {
    text: `When I heard about the dead body it was easy to tie those two together. Town gossip... you know?`,
    triggeredByNext: () => {
      lady.playAnimation(`Acknowledging`, true, 1.97)
    },
  },
  {
    text: `After a very awkward exchange, he ran off towards the East, into the wearables building.`,
    triggeredByNext: () => {
      lady.playAnimation(`HeadShake_No`, true, 1.83)
    },
  },
  {
    text: `I did't see him leave since he went in, I kept a close watch. So he could still be inside.`,
    triggeredByNext: () => {
      lady.playAnimation(`Look Away`, true, 2.37)
    },
  },
  {
    text: `But maybe he changed clothes and left looking like someone else ...that could also be the case.`,
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
    text: `These shoes look just like the ones that he had on, they're very peculiar!`,
    triggeredByNext: () => {
      lady.playAnimation(`HeadShake_No`, true, 1.83)
    },
  },
  {
    text: `Looks like he got away. The fact that he discarded his clothes and changed makes him super suspicious.`,
    triggeredByNext: () => {
      quest.checkBox(5)
      lady.playAnimation(`Happy Hand Gesture`, true, 2.97)
    },
  },

  {
    text: `I tell you what, I'll ask around. I know people, people who like me have a lot of spare time to peep into other's lives, if you catch my drift.`,
    triggeredByNext: () => {
      lady.playAnimation(`Head_Yes`, true, 2.63)
    },
  },
  {
    text: `Meet me tomorrow same time, same place, and we'll pull on this string. If there's one thing I'm good at it's knitting up strings into a nice crochet.`,
    triggeredByNext: () => {
      quest.showCheckBox(5)
      nextDay(2)
      //   if (progression.data.day > 1) {
      //     lady.talk(day2Intro, 0)
      //   }
    },
    isEndOfDialog: true,
  },
]

export let day2Intro: Dialog[] = [
  {
    text: `Hi dear, good to see you again!`,
    triggeredByNext: () => {
      lady.playAnimation(`HeadShake_No`, true, 1.83)
    },
  },
  {
    text: `I've been asking the girls about this strange garment, no one has any clues yet.`,
    triggeredByNext: () => {
      lady.playAnimation(`Happy Hand Gesture`, true, 2.97)
    },
  },
  {
    text: `But something strange happened last night at the cemetery, and I got the feeling that this is all connected as well`,
    triggeredByNext: () => {
      lady.playAnimation(`Head_Yes`, true, 2.63)
    },
  },
  {
    text: `Head out there to 60,50 and check it out!`,
    isEndOfDialog: true,
    triggeredByNext: () => {
      quest.checkBox(0)
      quest.showCheckBox(1)
      updateProgression('NPCIntroDay2')
    },
  },
]

export let day3Intro: Dialog[] = [
  {
    text: `The garments you have been finding seem ceremonial, of some sort.`,
    triggeredByNext: () => {
      quest.checkBox(0)
      quest.showCheckBox(1)
      updateProgression('NPCIntroDay3')
      //lady.playAnimation(`Head_Yes`, true, 2.63)
    },
  },
  {
    text: `So my best guess is that this has to be connected with the temple that Tak is making`,
    triggeredByNext: () => {
      quest.checkBox(0)
      quest.showCheckBox(1)
      updateProgression('NPCIntroDay3')
      //lady.playAnimation(`Head_Yes`, true, 2.63)
    },
  },
  {
    text: `Head over to 100,100. There's someone in charge who's usually there... shady odd guy. He could know something... or who knows, it could even be him.`,
    isEndOfDialog: true,
    triggeredByNext: () => {
      quest.checkBox(0)
      quest.showCheckBox(1)
      updateProgression('NPCIntroDay3')
    },
  },
]

export let day4Intro: Dialog[] = [
  {
    text: `The strangest thing happened! Looks like some kind of portal into another dimension opened up.`,
    triggeredByNext: () => {
      //lady.playAnimation(`Head_Yes`, true, 2.63)
    },
  },
  {
    text: `You haven't been playing around with casting rays of light onto magical runes by any chance, have you?`,
    triggeredByNext: () => {
      //lady.playAnimation(`Head_Yes`, true, 2.63)
    },
  },
  {
    text: `You have? Oh lord... I should have warned you about that when I sent you.`,
    triggeredByNext: () => {
      //lady.playAnimation(`Head_Yes`, true, 2.63)
    },
  },
  {
    text: `Looks like something terrifying crept out of that portal, and it's stuck on old farmer Joe's farm`,
    triggeredByNext: () => {
      //lady.playAnimation(`Head_Yes`, true, 2.63)
    },
  },
  {
    text: `Could you please go help him out? He's at 150,150`,
    isEndOfDialog: true,
    triggeredByNext: () => {
      quest.checkBox(0)
      quest.showCheckBox(1)
      updateProgression('NPCIntroDay4')
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
      updateProgression('NPCIntroDay5')
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
