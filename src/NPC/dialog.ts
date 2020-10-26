import { Dialog } from '../../node_modules/@dcl/ui-utils/utils/types'
import { nextDay, updateProgression } from '../halloweenQuests/progression'
import { quest } from '../halloweenQuests/quest'
import * as ui from '../../node_modules/@dcl/ui-utils/index'
import { lady } from '../game'
import { startGemUI } from '../halloweenQuests/pumpkin'

/// DAY 1

export let day1Intro: Dialog[] = [
  {
    text: `Hello dear, we haven't met before, have we? You seem somewhat familiar.`,
    triggeredByNext: () => {
      lady.playAnimation(`HeadShake_No`, true, 1.83)
    },
  },
  {
    text: `Did you hear what happened to that poor girl? Tongues are wagging. Nothing like this ever happened back in my day… `,
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
    text: `The plaza smells awful, it’s full of pumpkins, which I like, don’t get me wrong. But when they rot, boy do they stink!`,
    triggeredByNext: () => {
      quest.showCheckBox(3)
      lady.playAnimation(`Relieved`, true, 3.03)
    },
  },
  {
    text: `I’d get rid of them myself but my eyesight isn’t what it once was and it’s so dark!`,
    triggeredByNext: () => {
      quest.showCheckBox(3)
      lady.playAnimation(`Happy Hand Gesture`, true, 2.97)
    },
  },
  {
    text: `Would you mind taking a look around the plaza and getting rid of the rotten pumpkins?`,
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
    text: `Oh, why thank you, dear! I knew you were a kind soul.`,
    triggeredByNext: () => {
      startGemUI()
    },
    isEndOfDialog: true,
  },
  {
    text: `That’s a shame, I guess I’ll do it myself and keep my stories to myself too!`,
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
    text: `Well, have another 10 minutes ...what's the rush anyway?`,
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
    text: `Let me tell you what I know… So this random person came to me and asked me to wash their clothes... the nerve of some people!`,
    triggeredByNext: () => {
      lady.playAnimation(`Lengthy`, true, 1.77)
    },
  },
  {
    text: `Do I look like a laundrette?! Not only that, but the clothes were all stained in blood. Quite unsettling.`,
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
    text: `I haven’t seen him leave, I’ve been keeping an eye on the entrance, so he could still be inside.`,
    triggeredByNext: () => {
      lady.playAnimation(`Look Away`, true, 2.37)
    },
  },
  {
    text: `But it is halloween so he may have changed into a costume and left… I don’t know. I hope not, stay safe, dear.`,
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
    text: `It looks like he’s changed clothes and got away. I sure hope people lock their doors tonight!`,
    triggeredByNext: () => {
      quest.checkBox(5)
      lady.playAnimation(`Happy Hand Gesture`, true, 2.97)
    },
  },

  {
    text: `Anyway, I think I remember you now, wasn’t it you who picked up the telephone? I’m sure it was your voice. I have a bad feeling about this. We need to stop it from happening again.`,
    triggeredByNext: () => {
      lady.playAnimation(`Head_Yes`, true, 2.63)
      if (nextDay(2)) {
        lady.talk(day2Intro, 0)
      }
    },
  },
  {
    text: `Meet me tomorrow same time, same place, ok?`,
    triggeredByNext: () => {
      //   if (progression.data.day > 1) {
      //     lady.talk(day2Intro, 0)
      //   }
    },
    isEndOfDialog: true,
  },
]

export let day2Intro: Dialog[] = [
  {
    text: `Why hello, dear, good to see you again!`,
    triggeredByNext: () => {
      lady.playAnimation(`HeadShake_No`, true, 1.83)
    },
  },
  {
    text: `I've been asking around about this strange garment, no one has any clues yet.`,
    triggeredByNext: () => {
      lady.playAnimation(`Happy Hand Gesture`, true, 2.97)
    },
  },
  {
    text: `But something strange did happened last night at the cemetery, and I have the feeling that this is all connected somehow.`,
    triggeredByNext: () => {
      lady.playAnimation(`Head_Yes`, true, 2.63)
    },
  },
  {
    text: `You should really go and see it for yourself, but take care!`,
    triggeredByNext: () => {
      lady.playAnimation(`Head_Yes`, true, 2.63)
    },
  },
  {
    text: `Head out to the cemetery at -13,-3 and see what happened!`,
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
    text: `Ceremonial clothing like that is usually only worn by the temple goers, maybe you should look there for clues.`,
    triggeredByNext: () => {
      quest.checkBox(0)
      quest.showCheckBox(1)
      updateProgression('NPCIntroDay3')
      //lady.playAnimation(`Head_Yes`, true, 2.63)
    },
  },
  {
    text: `Head over to 100,100. There's usually someone there who’s in charge of temple operations, odd chap. Maybe he knows something... or who knows, it could even have been him who killed that poor girl.`,
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
    text: `You haven't been playing around, casting rays of light onto magical runes by any chance, have you?`,
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
    text: `Ha! I had you fooled! Chasing after an innocent neighbour like that, muahahaha you should be ashamed of yourself!`,
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
