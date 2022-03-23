import {
  NPC,
  Dialog,
  FollowPathData,
  NPCTriggerComponent,
} from '@dcl/npc-scene-utils'
import { getUserData, UserData } from '@decentraland/Identity'
import * as utils from '@dcl/ecs-scene-utils'
import { rarestItem, rarityLevel } from './rarestWearable'

import { arrow, client, questProg, taskIds, updateQuests } from 'src/quests'
import { query } from '@dcl/quests-query'
import { ProgressStatus } from 'dcl-quests-client/quests-client-amd'
import { Calis1 } from '../interactiveItems/calis'
import { setStreamVolume } from './jukebox'

export let octopus: NPC
export let doge: NPC
export let catGuy: NPC
export let wearablesC: NPC
export let artist1: NPC
export let artist2: NPC
export let wenMoon: NPC

export let areNPCsAdded: boolean = false

export let userData: UserData = {
  displayName: '',
  publicKey: '',
  hasConnectedWeb3: false,
  userId: '',
  avatar: null,
  version: null,
}

export async function fetchUserData() {
  const data = await getUserData()
  log(data.displayName)
  return data
}

export async function setUserData() {
  const data = await getUserData()
  log(data.displayName)
  userData = data
}
setUserData()

export async function addBarNPCs() {
  areNPCsAdded = true

  octopus = new NPC(
    {
      position: new Vector3(160, 0.2, 141.4),
    },
    'models/core_building/BobOctorossV46.glb',
    () => {
      if (octopus.getComponent(NPCTriggerComponent).onCameraEnter) {
        octopus.getComponent(NPCTriggerComponent).onCameraEnter = undefined
      }
      //   if (
      //     questProg.progressStatus != ProgressStatus.COMPLETED &&
      //     query(questProg).isTaskCompleted(taskIds.intro)
      //   ) {
      //     if (!query(questProg).isTaskCompleted(taskIds.catHair)) {
      //       octopus.talk(OctoQuest, 'noHairs')
      //     } else if (!query(questProg).isTaskCompleted(taskIds.bringHair)) {
      //       octopus.talk(OctoQuest, 'quest2')
      //     } else if (
      //       !query(questProg).isTaskCompleted(taskIds.asianHerb) ||
      //       !query(questProg).isTaskCompleted(taskIds.forestHerb) ||
      //       !query(questProg).isTaskCompleted(taskIds.medievalHerb)
      //     ) {
      //       octopus.talk(OctoQuest, 'noHerbs')
      //     } else if (!query(questProg).isTaskCompleted(taskIds.bringHerbs)) {
      //       octopus.talk(OctoQuest, 'quest3')
      //     } else if (!query(questProg).isTaskCompleted(taskIds.caliz)) {
      //       octopus.talk(OctoQuest, 'noCalis')
      //     } else {
      //       // has all ingredients
      //       octopus.talk(OctoQuest, 'makeDrink')
      //     }
      //   } else {
      // quest not started or ended
      octopus.talk(OctoHi)
      //   }

      if (arrow && arrow.getParent() === octopus) {
        arrow.hide()
      }

      // DEBUG
      //   octopus.talk(OctoQuest, 'makeDrink')

      octopus.changeIdleAnim('TalkLoop')
      octopus.playAnimation('TalkIntro', true, 0.63)
    },
    {
      portrait: `images/portraits/bartender.png`,
      dialogSound: `sounds/navigationForward.mp3`,
      idleAnim: 'Idle',
      faceUser: false,
      darkUI: true,
      onWalkAway: () => {
        backToIdle()
      },
    }
  )

  let octopusObjects = new Entity()
  octopusObjects.addComponent(new Transform())
  octopusObjects.addComponent(
    new GLTFShape('models/core_building/BobOctorossPartB_V02.glb')
  )
  engine.addEntity(octopusObjects)
  octopusObjects.setParent(octopus)

  let dogePath: FollowPathData = {
    path: [
      new Vector3(166.7, 0.24, 163.9),
      new Vector3(161, 0.24, 160),
      new Vector3(157.5, 0.24, 157.4),
      new Vector3(153.7, 0.24, 156.2),
      new Vector3(148.1, 0.24, 156.8),

      new Vector3(146.4, 0.24, 156),

      new Vector3(143.1, 0.24, 153.1),
      new Vector3(143, 0.24, 152.8),

      new Vector3(143.2, 0.24, 150.7),

      new Vector3(143.26, 0.24, 147.5),
      new Vector3(148.1, 0.24, 142.3),

      new Vector3(151.9, 0.24, 142.3),
      new Vector3(153.8, 0.24, 144.9),
      new Vector3(154, 0.24, 146.9),

      new Vector3(154.6, 0.24, 149.57),
      new Vector3(156.65, 0.24, 154.7),
      new Vector3(162.3, 0.24, 156.2),

      new Vector3(166.4, 0.24, 156.1),
      new Vector3(169.7, 0.24, 156.2),
      new Vector3(171.9, 0.24, 157.8),
      new Vector3(173.8, 0.24, 158.7),
      new Vector3(173.8, 0.24, 160.1),
      new Vector3(173.15, 0.24, 161.59),
      new Vector3(171.3, 0.24, 163.22),
    ],
    loop: true,
    // curve: true,
  }

  doge = new NPC(
    { position: dogePath.path[0], scale: new Vector3(2, 2, 2) },
    'models/core_building/dogeNPC.glb',
    () => {
      doge.stopWalking()
      artist1.endInteraction()
      artist2.endInteraction()
      doge.playAnimation('Talk1', true)
      let randomNum = Math.floor(Math.random() * 10)
      doge.talkBubble(DogeTalk, randomNum)
    },
    {
      walkingAnim: 'Walk',
      faceUser: true,
      hoverText: 'WOW',
      onlyETrigger: true,
      walkingSpeed: 1.2,
      continueOnWalkAway: true,
      onWalkAway: () => {
        doge.followPath()
      },
      textBubble: true,
      noUI: true,
      bubbleHeight: 2.2,
    }
  )
  doge.followPath(dogePath)

  wearablesC = new NPC(
    { position: new Vector3(162.65, 0.23, 133.15) },
    'models/core_building/WearableConnoisseurRotatedV08.glb',
    async () => {
      // wearablesC.playAnimation('TurnIn', true, 3.13)
      //   wearablesC.changeIdleAnim('Talk')
      let rareItem = await rarestItem(true)
      wearablesC.playAnimation('TurnIn', true, 3.13)

      utils.setTimeout(3130, () => {
        wearablesC.playAnimation('Talk')
      })
      log(rareItem)

      switch (rareItem) {
        case rarityLevel.none:
          wearablesC.talk(wearabesCTalk, 'none')
          break
        case rarityLevel.common:
          wearablesC.talk(wearabesCTalk, 'common')
          break
        case rarityLevel.uncommon:
          wearablesC.talk(wearabesCTalk, 'common')
          break
        case rarityLevel.rare:
          wearablesC.talk(wearabesCTalk, 'common')
          break
        case rarityLevel.epic:
          wearablesC.talk(wearabesCTalk, 'epic')
          break
        case rarityLevel.legendary:
          wearablesC.talk(wearabesCTalk, 'epic')
          break
        case rarityLevel.mythic:
          wearablesC.talk(wearabesCTalk, 'mythic')
          break
        case rarityLevel.unique:
          wearablesC.talk(wearabesCTalk, 'mythic')
          break
      }
    },
    {
      portrait: `images/portraits/WearableConnoisseur.png`,
      faceUser: true,
      darkUI: true,
      dialogSound: `sounds/navigationForward.mp3`,
      hoverText: 'Talk',
      turningSpeed: 0.35,
      onlyETrigger: true,
      onWalkAway: () => {
        wearablesC.endInteraction()
        wearablesC.playAnimation('TurnOut', true, 1.47)
        wearablesC.addComponentOrReplace(
          new utils.RotateTransformComponent(
            wearablesC.getComponent(Transform).rotation.clone(),
            Quaternion.Euler(0, 0, 0),
            1
          )
        )
      },
    }
  )

  artist1 = new NPC(
    {
      position: new Vector3(142.9, -0.2, 165.7),
      rotation: Quaternion.Euler(0, 180 + 90, 0),
    },
    'models/core_building/ch2_crowdV5.glb',
    () => {
      artist1.bubble.closeDialogEndAll()
      artist2.bubble.closeDialogEndAll()
      //  WorldDialogTypeInSystem._instance.done = true

      artist1.talk(artistHints)

      artist1.playAnimation('TurnIn', true, 0.57)
      utils.setTimeout(570, () => {
        artist1.playAnimation('TalkToUser')
      })
      artist2.playAnimation('TurnIn', true, 0.57)
      utils.setTimeout(570, () => {
        artist2.playAnimation('TalkToUser')
      })
    },
    {
      portrait: `images/portraits/ACch2.png`,
      idleAnim: 'Talk',
      darkUI: true,
      faceUser: false,
      dialogSound: `sounds/navigationForward.mp3`,
      hoverText: 'Art Recommendations',
      onlyETrigger: true,
      textBubble: true,
      onWalkAway: () => {
        if (artist1.dialog.container.visible) {
          artist1.bubble.closeDialogEndAll()
          artist2.bubble.closeDialogEndAll()
          artist1.playAnimation('TurnOut', true, 0.5)
          artist2.playAnimation('TurnOut', true, 0.5)

          utils.setTimeout(500, () => {
            artist1.playAnimation('Talk')
            artist2.playAnimation('Talk')
          })
        }
      },
    }
  )

  artist2 = new NPC(
    {
      position: new Vector3(142.9, -0.2, 165.7),
      rotation: Quaternion.Euler(0, 180 + 90, 0),
    },
    'models/core_building/ch1_crowdV5.glb',
    () => {
      // wearablesC.playAnimation('TurnIn', true, 3.13)
      //   wearablesC.changeIdleAnim('Talk')
      artist1.bubble.closeDialogWindow()
      artist2.bubble.closeDialogWindow()
      artist2.endInteraction()
      artist1.talkBubble(artist1Talk, '1st')
    },
    {
      portrait: `images/portraits/ACch2.png`,
      idleAnim: 'Talk',
      faceUser: false,
      darkUI: true,
      hoverText: 'Talk',
      reactDistance: 16,
      textBubble: true,

      onWalkAway: () => {
        artist1.bubble.closeDialogEndAll()
        artist2.bubble.closeDialogEndAll()
        //   WorldDialogTypeInSystem._instance.done = true
        if (!artist1.getComponent(Animator).getClip('Talk').playing) {
          artist1.playAnimation('Talk')
        }
        if (!artist2.getComponent(Animator).getClip('Talk').playing) {
          artist2.playAnimation('Talk')
        }
      },
    }
  )

  artist2.addComponentOrReplace(
    new OnPointerDown(
      () => {
        if (artist1.inCooldown || artist1.dialog.isDialogOpen) return
        artist1.activate()
      },
      { hoverText: 'Art Recommendations', button: ActionButton.PRIMARY }
    )
  )

  artist2.bubble.rootEntity.getComponent(Transform).position = new Vector3(
    -0.1,
    0.6,
    0.8
  )
  artist1.bubble.rootEntity.getComponent(Transform).position = new Vector3(
    0.2,
    0.6,
    -0.3
  )
}

export function addNPCsOutside() {
  let wenPath: FollowPathData = {
    path: [
      new Vector3(82, 0, 138),
      new Vector3(45, 0, 149),
      new Vector3(40, 0, 179),
      new Vector3(45, 0, 216),
      new Vector3(101, 0, 259),
      new Vector3(132, 0, 253),
      new Vector3(159, 0, 228),
      new Vector3(166, 0, 195),
      new Vector3(198, 0, 189),
      new Vector3(204, 0, 151),
      new Vector3(201.9, 0, 121),
      new Vector3(207.6, 0, 87.3),
      new Vector3(175.6, 0, 70),
      new Vector3(159.8, 0, 75.5),
      new Vector3(139.1, 0, 70),
      new Vector3(116.3, 0, 84.9),
      new Vector3(91, 0, 110),
    ],
    loop: true,
  }

  wenMoon = new NPC(
    { position: wenPath.path[0], scale: new Vector3(1.1, 1.1, 1.1) },
    'models/core_building/wenMoonV12.glb',
    () => {
      wenMoon.stopWalking()
      wenMoon.talk(wenMoonTalk, 0)
      wenMoon.playAnimation(`TurnIn`, true, 5.77)
    },
    {
      portrait: 'images/portraits/wenmoon.png',
      reactDistance: 10,
      idleAnim: `Talk`,
      walkingAnim: 'Walk',
      onlyETrigger: true,
      dialogSound: `sounds/navigationForward.mp3`,
      faceUser: true,
      darkUI: true,
      walkingSpeed: 1,
      onWalkAway: () => {
        // turnOut
        wenMoon.playAnimation(`TurnOut`, true, 0.53)

        utils.setTimeout(2000, () => {
          wenMoon.followPath()
        })
      },
    }
  )
  wenMoon.followPath(wenPath)

  // Cat guy
  catGuy = new NPC(
    {
      position: new Vector3(191.8, 0.225, 68.2),
      rotation: Quaternion.Euler(0, 290, 0),
    },

    'models/core_building/cat_guySittedV12.glb',
    () => {
      if (
        questProg.progressStatus === ProgressStatus.ON_GOING &&
        !query(questProg).isTaskCompleted(taskIds.catHair) &&
        query(questProg).isTaskCompleted(taskIds.intro)
      ) {
        catGuy.talk(catQuest)
      } else {
        catGuy.talk(ILoveCats, 0)
      }

      if (arrow && arrow.getParent() === catGuy) {
        arrow.hide()
      }

      catGuy.playAnimation(`talk`)
    },
    {
      portrait: 'images/portraits/catguy.png',
      reactDistance: 9,
      idleAnim: `idle`,
      onlyETrigger: true,
      dialogSound: `sounds/navigationForward.mp3`,
      faceUser: false,
      darkUI: true,
      onWalkAway: () => {
        catGuy.playAnimation(`idle`)
      },
    }
  )
}

onIdleStateChangedObservable.add(({ isIdle }) => {
  log('Idle State change: ', isIdle)
  if (isIdle) {
    artist1.bubble.closeDialogEndAll()
    artist2.bubble.closeDialogEndAll()
    artist1.playAnimation('Talk')
    artist2.playAnimation('Talk')
  }
})

//////////////////////////////////////////////////////////////////////////////////////////////////

/////////////DIALOGS/////////////////////////

/// OCTO

export let OctoHi: Dialog[] = [
  {
    text: 'Welcome traveler, how can I help you!',
    skipable: true,
  },
  {
    text: 'I may look quite busy, but worry not, I still have like 2 free hands and/or tentacles to spare.',
    skipable: true,
  },
  {
    text: 'Is this your first time here? Do you want some pointers about how you can get around the place?',
    isQuestion: true,
    buttons: [
      {
        label: 'YES',
        goToDialog: 'yes',
      },
      { label: 'NO', goToDialog: 'end' },
    ],
  },
  {
    name: 'end',
    text: 'Oh well, if for any reason you need a hand and/or tentacle, I’ll be here!',
    triggeredByNext: () => {
      //   if (!query(questProg).isTaskCompleted(taskIds.intro)) {
      //     octopus.talk(OctoQuest, 'questQ')
      //   } else {
      octopus.endInteraction()
      log('ended conversation')
      backToIdle()
      //   }
    },
  },
  {
    name: 'yes',
    text: 'Here you can also find funky characters like myself. Don’t be shy, chat them up, everyone has a story to tell.',
    skipable: true,
  },
  {
    text: 'You can also take that glowing beam of light back up to the happy place up in the clouds where you started out.',

    skipable: true,
  },
  {
    text: 'There you can find a whole bunch of suggestions of places inside Decentraland you can visit, including <color="red">live events</color> and other highlights.',

    skipable: true,
  },
  {
    text: 'You can also open up the map and <color="red">fast travel</color> anywhere! Just press <color="red">M</color> on your keyboard and explore it. You’ll see it’s pretty damn big!',

    skipable: true,
  },
  {
    text: 'Or you can just walk out the door and keep walking, and see what you run into.',

    skipable: true,
  },
  {
    text: 'Right now we’re in the center of the <color="red">Genesis Plaza</color>, a community-owned space that´s open to everyone. The roads fan out in all directions from here.',

    skipable: true,
  },
  {
    text: 'If you venture out into the world beyond the plaza, you’ll see that the content is created by our growing community. Randomly bumping into things you didn’t expect is half the fun here.',

    skipable: true,
    triggeredByNext: () => {
      //   if (!query(questProg).isTaskCompleted(taskIds.intro)) {
      //     octopus.talk(OctoQuest, 'questQ')
      //   } else {
      octopus.talk(OctoHi, 'normalEnd')
      //   }
    },
  },
  {
    name: 'normalEnd',
    text: 'Well that´s it from me. So what are you waiting for? Go and explore the world!',

    skipable: true,
    triggeredByNext: () => {
      backToIdle()
    },
    isEndOfDialog: true,
  },
]

export let OctoQuest: Dialog[] = [
  {
    name: 'questQ',
    text: '',
    skipable: true,
  },
  {
    text: "There's an item that's not on our menu, but if you're willing to fetch the ingredients I can make it for you",
    skipable: true,
  },
  {
    text: `A drink so amazing, it's been called <color="red">The drink of the gods</color> by... well by some drunk that tried it. Do you want me to make it for you?`,
    isQuestion: true,
    buttons: [
      {
        label: 'YES',
        goToDialog: 'quest1',
        triggeredActions: () => {
          client.startQuest()
          arrow.move(catGuy, new Vector3(0, 0, 0), new Vector3(0, 1.5, 0))
          arrow.show()
        },
      },
      { label: 'NO', goToDialog: 'end' },
    ],
  },
  {
    name: 'end',
    text: 'Oh well, if for any reason you need a hand and/or tentacle, I’ll be here!',
    triggeredByNext: () => {
      log('ended conversation')
      backToIdle()
    },
    isEndOfDialog: true,
  },
  {
    name: 'quest1',
    text: "Alright! This is a rich herbal concoction, so I'm going to need some exotic spices from a few places.",

    skipable: true,
  },
  {
    text: `But let's start with the most unusual and controversial ingredient in the list, this one really puts the drink together, you'll see!`,
    skipable: true,
  },
  {
    text: `We need to make an infusion with just a few <color="red">cat hairs</color>. Sounds weird, right? But it gives it that extra oomph. If you're allergic, even better!`,
    skipable: true,
  },
  {
    text: `I'm sure you can get some cat hairs from the <color="red">Cat Guy</color>. He's somewhere here in Genesis Plaza. Last time I saw him he was South of here.`,
    skipable: true,
  },
  {
    text: `Let's start with that. Bring me some cat hairs first so I can get that infusion going, and then I'll tell you what I need next.`,

    skipable: true,
    triggeredByNext: () => {
      client.makeProgress(taskIds.intro, {
        type: 'single',
        status: ProgressStatus.COMPLETED,
      })
      updateQuests()
      backToIdle()
    },
    isEndOfDialog: true,
  },

  {
    name: 'quest2',
    text: `Great! Those hairs are nice and scruffy, you'll taste them for sure! Let's get down to the rest of the ingredients.`,
    skipable: true,
    triggeredByNext: () => {
      arrow.hide()
    },
  },
  {
    name: 'ingredients',
    text: 'We start with some sweet <color="red">sugar berries</color>, you can find those in the <color="red">Forest Plaza</color>: 0, 80.',
    skipable: true,
    image: {
      path: 'images/quest/berryThumb.png',
      offsetY: 20,
      offsetX: -20,
      section: { sourceHeight: 512, sourceWidth: 512 },
    },
  },
  {
    text: 'This plant tends to grow near water, so look out for the shores of lakes and ponds in that plaza.',
    skipable: true,
    image: {
      path: 'images/quest/berryThumb.png',
      offsetY: 20,
      offsetX: -20,
      section: { sourceHeight: 512, sourceWidth: 512 },
    },
  },
  {
    text: 'We balance that out with some acidity from some <color="red">kim-kim</color>, you can find that in the <color="red">Asian Plaza</color>: 60, -60.',
    skipable: true,
    image: {
      path: 'images/quest/kimkimThumb.png',
      offsetY: 10,
      offsetX: -25,
      section: { sourceHeight: 512, sourceWidth: 512 },
    },
  },
  {
    text: 'This plant only grows at some altitude, so make sure you check out the higher spots on Asian Plaza.',
    skipable: true,
    image: {
      path: 'images/quest/kimkimThumb.png',
      offsetY: 10,
      offsetX: -25,
      section: { sourceHeight: 512, sourceWidth: 512 },
    },
  },
  {
    text: 'And finally add some smoky notes from a <color="red">dried leather vine</color>, you can find that growing in the <color="red">Medieval Plaza</color>: -60, -60.',
    skipable: true,
    image: {
      path: 'images/quest/vineThumb.png',
      offsetY: 15,
      offsetX: -20,
      section: { sourceHeight: 512, sourceWidth: 512 },
    },
  },
  {
    text: 'This plant grows best near human settlements. It probably has to do with the manure from the farm animals... the less you know the better, really.',
    skipable: true,
    image: {
      path: 'images/quest/vineThumb.png',
      offsetY: 15,
      offsetX: -20,
      section: { sourceHeight: 512, sourceWidth: 512 },
    },
  },
  {
    text: `Bring me those and then I'll tell you what's next in the list. You can ask me to go over those ingredients again any time.`,

    skipable: true,
    triggeredByNext: () => {
      backToIdle()

      client.makeProgress(taskIds.bringHair, {
        type: 'single',
        status: ProgressStatus.COMPLETED,
      })
      updateQuests()
    },
    isEndOfDialog: true,
  },

  {
    name: 'quest3',
    text: `Super, all of these ingredients you collected smell super fresh.`,
    triggeredByNext: () => {
      arrow.hide()
    },
    skipable: true,
  },
  {
    text: `We can't just serve that in any regular glass. I'm going to need a special <color="red">Chalice</color> for that. Look for the chaman in <color="red">Gamer Plaza</color>, 80,0, he'll know.`,
    skipable: true,
  },
  {
    text: "When you have that ready, come back to me and I'll make you the drink. It's going to be worth it, I promise!",
    triggeredByNext: () => {
      client.makeProgress(taskIds.bringHerbs, {
        type: 'single',
        status: ProgressStatus.COMPLETED,
      })
      updateQuests()

      backToIdle()
    },

    isEndOfDialog: true,
  },

  {
    name: 'noHerbs',
    text: "Looks like we're still missing some ingredients. If you bring them all, I can make you the drink!",
    skipable: true,
    triggeredByNext: () => {
      backToIdle()
    },
  },
  {
    text: 'Do you want me to go over the list of ingredients again?',
    isQuestion: true,
    buttons: [
      {
        label: 'YES',
        goToDialog: 'ingredients',
      },
      { label: 'NO', goToDialog: 'end' },
    ],
  },

  {
    name: 'noHairs',
    text: "We're still missing the key ingredient, the cat hairs! I refuse to do this without following the recipe to the letter. Look for the cat guy, he's sitting somewhere south of here in this same plaza.",
    skipable: true,
    triggeredByNext: () => {
      backToIdle()
    },
    isEndOfDialog: true,
  },
  {
    name: 'noCalis',
    text: "We have all the ingredients, but we wouldn't do the drink justice if we just served it in a regular glass. Go to the Chaman on Gamer Plaza, he'll know where you can get something worthy of it.",
    skipable: true,
    triggeredByNext: () => {
      backToIdle()
    },
    isEndOfDialog: true,
  },
  {
    name: 'makeDrink',
    text: 'Amazing, you found everything! Time to do my magic',
    triggeredByNext: () => {
      arrow.hide()
      octopus.playAnimation('CalisPrep', true, 7.17)
      octopus.getComponent(NPCTriggerComponent).onCameraExit = () => {}
      prepareOctoTrip()
      utils.setTimeout(7250, () => {
        octopus.talk(OctoQuest, 'serveDrink')
        Calis1.pickup(() => {
          setStreamVolume(0.5)
        })
      })
    },
    isEndOfDialog: true,
  },
  {
    name: 'serveDrink',
    text: `Here you go. Enjoy it, it's not every day that you can get to taste of such a rare elixir. \nHit <color="red">F</color> to drink up!`,
    triggeredByNext: () => {
      client.makeProgress(taskIds.outro, {
        type: 'single',
        status: ProgressStatus.COMPLETED,
      })
      updateQuests()
      octoTrip()
    },
    isEndOfDialog: true,
  },
]

export let OctoComments: Dialog[] = [
  {
    name: 'firstBeer',
    text: 'Hey you found a mug!\nYou`re welcome to jump behind the bar, put the mug under a tap and and pour yourself one.',
    // isFixedScreen: true,
    skipable: true,
    isEndOfDialog: true,
  },
  {
    name: 'firstServe',
    text: 'Hit F to drink up.',
    // isFixedScreen: true,
    skipable: true,
    isEndOfDialog: true,
  },
  {
    name: 'thirdBeer',
    text: 'Wohooo pace your self a little buddy.',
    // isFixedScreen: true,
    skipable: true,
    isEndOfDialog: true,
  },
  {
    name: 'mic',
    text: 'Ohh that old thing is broken. But if you want to talk, just keep T pressed. Works anywhere.',
    // isFixedScreen: true,
    skipable: true,
    isEndOfDialog: true,
  },
]

export let DogeTalk: Dialog[] = [
  {
    text: 'Wow, so very game changing revolutionary use case of blockchain technology',
    triggeredByNext: () => {
      doge.followPath()
    },
    timeOn: 4.1,
    isEndOfDialog: true,
  },
  {
    text: 'Such community generated content.',
    triggeredByNext: () => {
      doge.followPath()
    },
    timeOn: 4.1,
    isEndOfDialog: true,
  },
  {
    text: 'How true asset ownership!',
    triggeredByNext: () => {
      doge.followPath()
    },
    timeOn: 4.1,
    isEndOfDialog: true,
  },
  {
    text: 'Very potential to become the so awaited true incarnation of the metaverse',
    triggeredByNext: () => {
      doge.followPath()
    },
    timeOn: 4.1,
    isEndOfDialog: true,
  },
  {
    text: 'So decentralized governance by community voting',
    triggeredByNext: () => {
      doge.followPath()
    },
    timeOn: 4.1,
    isEndOfDialog: true,
  },
  {
    text: 'Much open source',
    triggeredByNext: () => {
      doge.followPath()
    },
    timeOn: 4.1,
    isEndOfDialog: true,
  },
  {
    text: 'So 3d social platform',
    triggeredByNext: () => {
      doge.followPath()
    },
    timeOn: 4.1,
    isEndOfDialog: true,
  },
  {
    text: 'How social experiment in self-governance',
    triggeredByNext: () => {
      doge.followPath()
    },
    timeOn: 4.1,
    isEndOfDialog: true,
  },
  {
    text: 'Very redefining how we interchange value with each other',
    triggeredByNext: () => {
      doge.followPath()
    },
    timeOn: 4.1,
    isEndOfDialog: true,
  },
  {
    text: 'Much persistent virtual world',
    triggeredByNext: () => {
      doge.followPath()
    },
    timeOn: 4.1,
    isEndOfDialog: true,
  },
]

export let ILoveCats: Dialog[] = [
  {
    text: `Hey there! Let me introduce myself. I’m the cat guy`,
    skipable: true,
  },
  {
    text: `That’s what everyone calls me. Or well, my cats don’t call me anything really, I wish they did. But if people other than my cats were to hang out with me, that’s what they’d call me for sure.`,
    skipable: true,
  },
  {
    text: `You’re welcome to call me that, but no pressure. But you see I’m really into cats, that’s my thing.`,
    skipable: true,
  },
  {
    text: `So it would make sense to call me the  <color="red">cat guy </color>.`,

    skipable: true,
  },
  {
    text: `I’m sorry, I’m talking about cats again. Such a broken record, aren’t I? Like a cat that won’t stop meowing all day.`,

    skipable: true,
  },
  {
    text: `Dammit!`,
    skipable: true,
    isEndOfDialog: true,
    triggeredByNext: () => {
      catGuy.playAnimation('idle')
    },
  },
]

let catIsOut: boolean = false

export let catQuest: Dialog[] = [
  {
    text: `Hey there! Let me introduce myself. I’m the cat guy`,
    skipable: true,
  },
  {
    text: `That’s what everyone calls me. Or well, my cats don’t call me anything really, I wish they did. But if people other than my cats were to hang out with me, that’s what they’d call me for sure.`,
    skipable: true,
  },
  {
    text: "Oh so you're also into that weird fad of drinking cat hairs, huh?",
    skipable: true,
  },
  {
    text: "Pretty strange if you ask me. Then they say I'm the freak just because I eat cat food.",
    skipable: true,
    triggeredByNext: () => {
      if (!catIsOut) {
        catIsOut = true
        releaseCat()
      }
    },
  },
  {
    text: "Well, if you really want to go forward with that... here's whiskers. You can pinch some of his hairs and be done with it.",
    skipable: true,
    isEndOfDialog: true,
  },
  {
    name: 'collect',
    text: 'Be gentle, you weirdo!',
    skipable: true,
    isEndOfDialog: true,
  },
]

export let wearabesCTalk: Dialog[] = [
  {
    name: 'none',
    text: 'Why? … Umm, what would someone <i>dressed like you</i> have to say to me?',
    skipable: true,
  },
  {
    text: 'Clearly you just put on whatever rags you slept in and think that’s an outfit, let me tell you something: you don’t cause a good impression on me like that.',
    skipable: true,
  },
  {
    text: 'I guess you’re fine, I mean <i>we’re not going to be friends</i>, but I’m feeling generous today and will acknowledge that you exist.',
    skipable: true,
    triggeredByNext: () => {
      wearablesC.talk(wearabesCTalk, 'default')
    },
  },
  {
    name: 'common',
    text: 'Well look at you, <i>all dressed up</i> with outlet-grade clothes that you probably bought at a gas station.',
    skipable: true,
  },
  {
    text: 'I guess you’re fine, I mean <i>we’re not going to be friends</i>, but I’m feeling generous today and will acknowledge that you exist.',
    skipable: true,
    triggeredByNext: () => {
      wearablesC.talk(wearabesCTalk, 'default')
    },
  },
  {
    name: 'epic',
    text: 'I see that you know how to present yourself. If only everyone had a baseline of taste like yours. <i>Not that it’s a very high bar</i>, but it would be quite an improvement.',
    skipable: true,
    triggeredByNext: () => {
      wearablesC.talk(wearabesCTalk, 'default')
    },
  },
  {
    name: 'mythic',
    text: 'Oh well <i>finally</i> someone I can talk to here without feeling embarrassed to be seen. You sir know how to dress, well done!',
    skipable: true,
    triggeredByNext: () => {
      wearablesC.talk(wearabesCTalk, 'default')
    },
  },
  {
    // had to add a dummy to skip to
    name: 'default',
    text: 'I always say <i>“you are what you wear”</i>. So true. Dressing up is all about expressing who you want to be in the eyes of others.',
    skipable: true,
  },
  {
    text: 'I always say <i>“you are what you wear”</i>. So true.\nDressing up is all about expressing who you want to be in the eyes of others.',
    skipable: true,
  },
  {
    text: 'Me, as you can tell, I’m <i>one of a kind</i>. Dressed in the finest Non-Fungible Tokens in the marketplace. Worthy of a queen!',
    skipable: true,
  },
  {
    text: 'And you, who do your clothes say you are?\n<i>Have a think about that, hun</i>.',
    skipable: true,
    isEndOfDialog: true,

    triggeredByNext: () => {
      wearablesC.endInteraction()
      wearablesC.playAnimation('TurnOut', true, 1.47)
      wearablesC.addComponentOrReplace(
        new utils.RotateTransformComponent(
          wearablesC.getComponent(Transform).rotation.clone(),
          Quaternion.Euler(0, 0, 0),
          1
        )
      )
    },
  },
]

export let artist1Talk: Dialog[] = [
  {
    name: '1st',
    text: 'So there I was, questioning what my work really meant to me as an artist, after having spent <b>so much</b> time on it and put <b>so much</b> of myself into it.',
  },
  {
    text: 'Now locked up in a container where no one can see my work, where it would hopefully gain value with time or if I die in some <i>flamboyant scandalous way</i>.',
    isEndOfDialog: true,

    triggeredByNext: () => {
      artist2.talkBubble(artist2Talk, '1st')
    },
  },
  {
    name: '2nd',
    text: 'Well yeah, but back then there wasn’t much of a market for NFTs, <i>or I didn’t know about it at least</i>. I was just trying to make a living by selling canvases, like everyone else.',
    isEndOfDialog: true,

    triggeredByNext: () => {
      artist2.talkBubble(artist2Talk, '2nd')
    },
  },
  {
    name: '3rd',
    text: ' The thing is <b>I would still be removing my work from the public view</b>, the form of payment doesn’t change that.',
  },
  {
    text: 'My audience suddenly got reduced to some rich guy and <i>maybe</i> his occasional dinner guests. That’s the part that upset me.',
    isEndOfDialog: true,

    triggeredByNext: () => {
      artist2.talkBubble(artist2Talk, '3rd')
    },
  },
  {
    name: '4th',
    text: 'Kinda… <i>yes and no</i>. The owner of the work might be just one person, but it’s still available for any curious eyes out there.',
    isEndOfDialog: true,

    triggeredByNext: () => {
      artist2.talkBubble(artist2Talk, '4th')
      artist2.playAnimation('TurnIn', true, 0.57)

      utils.setTimeout(570, () => {
        artist2.playAnimation('TalkToUser')
      })
    },
  },
  {
    name: '5th',
    text: 'Yeah, otherwise our rambling would have bored you to death by now. If all of this space is new to you, <i>you’re in for a treat!</i>',
    isEndOfDialog: true,

    triggeredByNext: () => {
      artist2.talkBubble(artist2Talk, '5th')
      artist2.playAnimation('Talk')
    },
  },
  {
    name: '6th',
    text: 'Yeah and well… it’s <i>good</i> art too. A lot of it, at least.',
  },
  {
    text: 'Ask me and I’ll give you some hints.',
    triggeredByNext: () => {
      artist2.playAnimation('TurnOut', true, 0.5)
      artist1.playAnimation('TurnOut', true, 0.5)

      utils.setTimeout(500, () => {
        artist2.playAnimation('Talk')
        artist1.playAnimation('Talk')
        artist1.talkBubble(artist1Talk, '1st')
      })
    },

    isEndOfDialog: true,
  },
]

export let artist2Talk: Dialog[] = [
  {
    name: '1st',
    text: 'And that was <i>such a good time</i> to get into ether, so cheap back then. Imagine if you sold those for eth then?',
    isEndOfDialog: true,

    triggeredByNext: () => {
      artist1.talkBubble(artist1Talk, '2nd')
    },
  },
  {
    name: '2nd',
    text: ' Just imagine if you sold a painting for 200 eth, it was <b>nothing</b> back then.',
    isEndOfDialog: true,

    triggeredByNext: () => {
      artist1.talkBubble(artist1Talk, '3rd')
    },
  },
  {
    name: '3rd',
    text: 'But your NFTs also end up going to the wallet of some rich whale just the same.',
    isEndOfDialog: true,

    triggeredByNext: () => {
      artist1.talkBubble(artist1Talk, '4th')
    },
  },
  {
    name: '4th',
    text: 'Speaking of audiences, looks like we have one here. Hey! I take it that you have an interest in art',
    isEndOfDialog: true,

    triggeredByNext: () => {
      artist1.playAnimation('TurnIn', true, 0.57)
      utils.setTimeout(570, () => {
        artist1.playAnimation('TalkToUser')
      })

      artist1.talkBubble(artist1Talk, '5th')
    },
  },
  {
    name: '5th',
    text: 'A ton of places you can check out. With <b>crazy expensive</b> virtual art on display. You can’t imagine what some of these cost!',
    isEndOfDialog: true,

    triggeredByNext: () => {
      artist1.talkBubble(artist1Talk, '6th')
    },
  },
]

export function artistsBackToNormal() {
  artist1.playAnimation('TurnOut', true, 0.57)
  artist2.playAnimation('TurnOut', true, 0.57)
  utils.setTimeout(570, () => {
    artist1.playAnimation('Talk')
    artist2.playAnimation('Talk')
  })

  artist1.talkBubble(artist1Talk, '1st')
}

export let artistHints: Dialog[] = [
  {
    text: 'Hey so you want to find out where you can find good art to admire?',
    isQuestion: true,
    buttons: [
      { label: 'yes', goToDialog: 'voltaire' },
      { label: 'no', goToDialog: 'no' },
    ],
  },
  {
    name: 'no',
    text: 'Alright, I’ll be around if you want to hear more.',
    triggeredByNext: () => {
      artistsBackToNormal()
    },
    isEndOfDialog: true,
  },
  {
    name: 'dummy',
    text: '',
    isEndOfDialog: true,
  },
  {
    name: 'voltaire',
    text: 'Ok, so first there’s <color="red">Voltaire District</color>, at 55,97. Lots of big players in the crypto art space have spot there.',
    isQuestion: true,
    buttons: [
      {
        label: 'Visit',
        goToDialog: 'dummy',
        triggeredActions: () => {
          artist1.endInteraction()
          artistsBackToNormal()
          teleportTo('55,97')
        },
      },
      { label: 'More', goToDialog: 'museum' },
    ],
  },
  {
    name: 'museum',
    text: 'There’s the <color="red"> Museum District</color> at 20,80, quite a pioneer of the metaverse.',
    isQuestion: true,
    buttons: [
      {
        label: 'Visit',
        goToDialog: 'dummy',
        triggeredActions: () => {
          artist1.endInteraction()
          artistsBackToNormal()
          teleportTo('20,80')
        },
      },
      { label: 'More', goToDialog: 'rapture' },
    ],
  },
  {
    name: 'rapture',
    text: 'The  <color="red">Rapture Gallery</color> at -88,-65 is also a really hip spot worth visiting',
    isQuestion: true,
    buttons: [
      {
        label: 'Visit',
        goToDialog: 'dummy',
        triggeredActions: () => {
          artist1.endInteraction()
          artistsBackToNormal()
          teleportTo('-88,-65')
        },
      },
      { label: 'More', goToDialog: '100x' },
    ],
  },
  {
    name: '100x',
    text: 'Also  <color="red">100x Gallery</color>, at 86,-24, there’s a whole bunch of things around that area.',
    isQuestion: true,
    buttons: [
      {
        label: 'Visit',
        goToDialog: 'dummy',
        triggeredActions: () => {
          artist1.endInteraction()
          artistsBackToNormal()
          teleportTo('86,-24')
        },
      },
      { label: 'More', goToDialog: 'momus' },
    ],
  },
  {
    name: 'momus',
    text: ' <color="red">Momus Park</color> covers a huge area made up of passages, it’s quite a scenic route. You could start your visti at 8,43.',
    isQuestion: true,
    buttons: [
      {
        label: 'Visit',
        goToDialog: 'dummy',
        triggeredActions: () => {
          artist1.endInteraction()
          artistsBackToNormal()
          teleportTo('8,43')
        },
      },
      { label: 'More', goToDialog: 'vegas' },
    ],
  },
  {
    name: 'vegas',
    text: 'Also the <color="red">Vegas Art Village</color> at -125,100 includes a whole assortment of very creative small museums from the community.',
    isQuestion: true,
    buttons: [
      {
        label: 'Visit',
        goToDialog: 'dummy',
        triggeredActions: () => {
          artist1.endInteraction()
          artistsBackToNormal()
          teleportTo('-125,100')
        },
      },
      { label: 'More', goToDialog: 'skate' },
    ],
  },
  {
    name: 'skate',
    text: 'If you´re looking for a place with a more edgy underground vibe, check out the <color="red">Vegas City Skatepark Gallery</color> at -100,150.',
    isQuestion: true,
    buttons: [
      {
        label: 'Visit',
        goToDialog: 'dummy',
        triggeredActions: () => {
          artist1.endInteraction()
          artistsBackToNormal()
          teleportTo('-100,150')
        },
      },
      { label: 'Done', goToDialog: 'end' },
    ],
  },
  {
    name: 'end',
    text: 'Those are the ones that come to mind to me right now. But there´s a LOT more to explore too.',
  },
  {
    isEndOfDialog: true,
    text: 'Hope you have fun exploring!',
    triggeredByNext: () => {
      artistsBackToNormal()
    },
  },
]

export let wenMoonTalk: Dialog[] = [
  {
    text: 'Hey there! Seen any promising new coins? It’s full of them, all over the place. You just need to be at the <i>right place</i> at the <i>right time</i>..',
    skipable: true,
  },
  {
    text: 'I’m  <color="red">Wen Moon </color>, a future millionaire, you’ll see. Any minute now!',
    skipable: true,
  },
  {
    text: 'Everyone gets a break except me. But it’s a matter of time now, I got a bit of everything, you never know what’s the next big thing.',
    skipable: true,
  },
  {
    text: 'For example, my friend was really psyched about Ponzi Coin, you heard of it? He says it’s going to be huge, and he’ll even cut me a special deal if I buy it from him.',
    skipable: true,
  },
  {
    text: 'Then there’s Bad Press Coin: its value is directly tied to how many negative mentions it gets on twitter. You think it’s a bad idea? <i>Go tweet about it haha</i>',
    skipable: true,
  },
  {
    text: 'Any of these could be the <i>next bitcoin</i>...',
    skipable: true,
  },
  {
    text: '<i>Gotta get them all!</i> Haha You know, just like that yellow cat says..',
    skipable: true,
  },
  {
    text: 'You know the one… The one from that famous comic book kids read today, Poker Nom ...or something',
    skipable: true,
  },
  {
    text: 'Anyway, I’ll keep looking. I’m gonna miss my big break if I stay chatting here. See you around!',
    skipable: true,
    isEndOfDialog: true,

    triggeredByNext: () => {
      wenMoon.playAnimation(`TurnOut`, true, 0.53)

      utils.setTimeout(535, () => {
        wenMoon.followPath()
      })
    },
  },
]

export function endArtistTalk() {
  artist1.bubble.closeDialogEndAll()
  artist2.bubble.closeDialogEndAll()
}

function releaseCat() {
  let cat = new Entity()
  cat.addComponent(new GLTFShape('models/core_building/cat_orange.glb'))
  cat.addComponent(
    new Transform({
      position: new Vector3(191.9, 0.225, 68.2),
      scale: new Vector3(0.45, 0.45, 0.45),
      rotation: Quaternion.Euler(0, -10, 0),
    })
  )
  cat.addComponent(new Animator())

  let walkAnim = new AnimationState('WalkCycle')

  cat.getComponent(Animator).addClip(walkAnim)

  utils.setTimeout(4000, () => {
    walkAnim.play()
    cat.addComponent(
      new utils.MoveTransformComponent(
        cat.getComponent(Transform).position,
        cat.getComponent(Transform).position.add(new Vector3(-0.15, 0, 1)),
        4,
        () => {
          let idleAnim = new AnimationState('IdleNorm')
          cat.getComponent(Animator).addClip(idleAnim)
          idleAnim.play()
          arrow.move(cat, new Vector3(0, 0, 0), new Vector3(0, 1, 0))
        }
      )
    )
  })

  cat.addComponent(
    new OnPointerDown(
      () => {
        let swooshAnim = new AnimationState('IdleTailSwoosh')
        cat.getComponent(Animator).addClip(swooshAnim)
        swooshAnim.play()

        cat.addComponent(new AudioSource(new AudioClip('sounds/cat.mp3')))
        cat.getComponent(AudioSource).playOnce()

        // back to idle

        utils.setTimeout(1000, () => {
          catGuy.talk(catQuest, 'collect')
          client.makeProgress(taskIds.catHair, {
            type: 'single',
            status: ProgressStatus.COMPLETED,
          })
          updateQuests()
        })

        arrow.move(
          octopus,
          new Vector3(0, 0, 0),
          new Vector3(-0.5, 2.5, -0.3),
          new Vector3(1.5, 1.5, 1.5)
        )
      },
      {
        button: ActionButton.PRIMARY,
        hoverText: 'Pick hair',
      }
    )
  )
  engine.addEntity(cat)
}

// Calis1.pickup(() => {
//   setStreamVolume(0.5)
// })

export function backToIdle() {
  octopus.changeIdleAnim('Idle')
  octopus.playAnimation('TalkOutro', true, 0.63)
}

let tripOcto = new Entity()
tripOcto.addComponent(
  new Transform({
    position: new Vector3(160, -4, 141.4),
  })
)
engine.addEntity(tripOcto)

function prepareOctoTrip() {
  if (!tripOcto.hasComponent(GLTFShape)) {
    tripOcto.addComponent(
      new GLTFShape('models/core_building/BobOctorossTripOnly.glb')
    )
    tripOcto.getComponent(GLTFShape).visible = false
    tripOcto
      .addComponent(new Animator())
      .addClip(new AnimationState('Trip', { looping: false }))
  }
}

export function octoTrip() {
  if (tripOcto.hasComponent(GLTFShape)) {
    octopus.getComponent(GLTFShape).visible = false

    tripOcto.getComponent(GLTFShape).visible = true
    tripOcto.getComponent(Transform).position = new Vector3(160, 0.2, 141.4)
    tripOcto.getComponent(Animator).getClip('Trip').play()

    utils.setTimeout(7330, () => {
      tripOcto.getComponent(GLTFShape).visible = false

      octopus.getComponent(GLTFShape).visible = true
      octopus.playAnimation('Idle')
    })
  }
}
