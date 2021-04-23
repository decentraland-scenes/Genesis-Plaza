import {
  NPC,
  Dialog,
  FollowPathData,
  NPCTriggerComponent,
} from '@dcl/npc-scene-utils'
import { getUserData, UserData } from '@decentraland/Identity'
import * as utils from '@dcl/ecs-scene-utils'
import { rarestItem, rarityLevel } from './rarestWearable'
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
  // fetch player name
  //setUserData()
  areNPCsAdded = true

  octopus = new NPC(
    {
      position: new Vector3(160, 0.2, 141.4),
      //scale: new Vector3(1.2, 1.2, 1.2),
    },
    'models/core_building/BobOctorossV44.glb',
    () => {
      if (octopus.getComponent(NPCTriggerComponent).onCameraEnter) {
        octopus.getComponent(NPCTriggerComponent).onCameraEnter = undefined
      }
      octopus.changeIdleAnim('TalkLoop')
      octopus.playAnimation('TalkIntro', true, 0.63)
      octopus.talk(OctoHi)
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

  // octopus.addComponentOrReplace(new OnPointerDown(
  //   ()=>{
  //     if(octopus.inCooldown)return
  //     octopus.changeIdleAnim('TalkLoop')
  //     octopus.playAnimation('TalkIntro', true, 0.63)
  //     octopus.talk(OctoHi)
  //   }, {
  //     hoverText: 'Talk'
  //   , button: ActionButton.PRIMARY
  //   }
  // ))

  let octopusObjects = new Entity()
  octopusObjects.addComponent(new Transform())
  octopusObjects.addComponent(
    new GLTFShape('models/core_building/BobOctorossPartB_V02.glb')
  )
  engine.addEntity(octopusObjects)
  octopusObjects.setParent(octopus)

  let dogePath: FollowPathData = {
    path: [
      // new Vector3(169, 0.24, 160),
      // new Vector3(172, 0.24, 159),
      // new Vector3(169.2, 0.24, 163.5),
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

      switch (rareItem) {
        case rarityLevel.none:
          wearablesC.talk(wearabesCTalk, 'none')
          break
        case rarityLevel.common | rarityLevel.uncommon | rarityLevel.rare:
          wearablesC.talk(wearabesCTalk, 'common')
          break
        case rarityLevel.epic | rarityLevel.legendary:
          wearablesC.talk(wearabesCTalk, 'epic')
          break
        case rarityLevel.mythic | rarityLevel.unique:
          wearablesC.talk(wearabesCTalk, 'mythic')
          break
      }
    },
    {
      portrait: `images/portraits/WearableConnoisseur.png`,
      faceUser: true,
      darkUI: true,
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
      hoverText: 'Art Recommendations',
      onlyETrigger: true,
      textBubble: true,
      onWalkAway: () => {
        if (artist1.dialog.container.visible) {
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
    { position: wenPath.path[0] },
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

    'models/core_building/cat_guySittedV10.glb',
    () => {
      catGuy.talk(ILoveCats, 0)
      catGuy.playAnimation(`talk`)
    },
    {
      portrait: 'images/portraits/catguy.png',
      turningSpeed: 0.8,
      reactDistance: 4,
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

//////////////////////////////////////////////////////////////////////////////////////////////////

/////////////DIALOGS/////////////////////////

/// OCTO

export function backToIdle() {
  octopus.changeIdleAnim('Idle')
  octopus.playAnimation('TalkOutro', true, 0.63)
}

export let OctoHi: Dialog[] = [
  {
    text: 'Welcome traveler, how can I help you!',
    skipable: true,
  },
  {
    text:
      'I may look quite busy, but worry not, I still have like 2 free hands and/or tentacles to spare.',
    skipable: true,
  },
  {
    text:
      'Is this your first time here? Do you want some pointers about how you can get around the place?',
    isQuestion: true,
    buttons: [
      { label: 'YES', goToDialog: 'yes', fontSize: 14 },
      { label: 'NO', goToDialog: 'nope', fontSize: 14 },
    ],
  },
  {
    name: 'nope',
    text:
      'Oh well, if for any reason you need a hand and/or tentacle, I’ll be here!',
    triggeredByNext: () => {
      backToIdle()
    },
    isEndOfDialog: true,
  },
  {
    name: 'yes',
    text:
      'Here you can also find funky characters like myself. Don’t be shy, chat them up, everyone has a story to tell.',
    skipable: true,
  },
  {
    text:
      'You can also take that glowing beam of light back up to the happy place up in the clouds where you started out.',

    skipable: true,
  },
  {
    text:
      'There you can find a whole bunch of suggestions of places inside Decentraland you can visit, including live events and other highlights.',

    skipable: true,
  },
  {
    text:
      'You can also open up the map and fast travel anywhere! Just press M on your keyboard and explore it. You’ll see it’s pretty damn big!',

    skipable: true,
  },
  {
    text:
      'Or you can just walk out the door and keep walking, and see what you run into.',

    skipable: true,
  },
  {
    text:
      'Right now we’re in the center of the Genesis Plaza, a community-owned space that´s open to everyone. The roads fan out in all directions from here.',

    skipable: true,
  },
  {
    text:
      'If you venture out into the world beyond the plaza, you’ll see that the content is created by our growing community. Randomly bumping into things you didn’t expect is half the fun here.',

    skipable: true,
  },
  {
    text:
      'Well that´s it from me. So what are you waiting for? Go and explore the world!',

    skipable: true,
    triggeredByNext: () => {
      backToIdle()
    },
    isEndOfDialog: true,
  },
]

export let DogeTalk: Dialog[] = [
  {
    text:
      'Wow, so very game changing revolutionary use case of blockchain technology',
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
    text:
      'Very potential to become the so awaited true incarnation of the metaverse',
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

export let wearabesCTalk: Dialog[] = [
  {
    name: 'none',
    text:
      'Why? … Umm, what would someone <i>dressed like you</i> have to say to me?',
    skipable: true,
  },
  {
    text:
      'Clearly you just put on whatever rags you slept in and think that’s an outfit, let me tell you something: you don’t cause a good impression on me like that.',
    skipable: true,
  },
  {
    text:
      'I guess you’re fine, I mean <i>we’re not going to be friends</i>, but I’m feeling generous today and will acknowledge that you exist.',
    skipable: true,
    triggeredByNext: () => {
      wearablesC.talk(wearabesCTalk, 'default')
    },
  },
  {
    name: 'common',
    text:
      'Well look at you, <i>all dressed up</i> with outlet-grade clothes that you probably bought at a gas station.',
    skipable: true,
  },
  {
    text:
      'I guess you’re fine, I mean <i>we’re not going to be friends</i>, but I’m feeling generous today and will acknowledge that you exist.',
    skipable: true,
    triggeredByNext: () => {
      wearablesC.talk(wearabesCTalk, 'default')
    },
  },
  {
    name: 'epic',
    text:
      'I see that you know how to present yourself. If only everyone had a baseline of taste like yours. <i>Not that it’s a very high bar</i>, but it would be quite an improvement.',
    skipable: true,
    triggeredByNext: () => {
      wearablesC.talk(wearabesCTalk, 'default')
    },
  },
  {
    name: 'mythic',
    text:
      'Oh well _finally_ someone I can talk to here without feeling embarrassed to be seen. You sir know how to dress, well done!',
    skipable: true,
    triggeredByNext: () => {
      wearablesC.talk(wearabesCTalk, 'default')
    },
  },
  {
    // had to add a dummy to skip to
    name: 'default',
    text:
      'I always say <i>“you are what you wear”</i>. So true. Dressing up is all about expressing who you want to be in the eyes of others',
    skipable: true,
  },
  {
    text:
      'I always say <i>“you are what you wear”</i>. So true. Dressing up is all about expressing who you want to be in the eyes of others',
    skipable: true,
  },
  {
    text:
      'Me, as you can tell, I’m <i>one of a kind</i>. Dressed in the finest Non-Fungible Tokens in the marketplace. Worthy of a queen!',
    skipable: true,
  },
  {
    text:
      'And you, who do your clothes say you are? <i>Have a think about that, hun</i>.',
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
    text:
      'So there I was, questioning what my work really meant to me as an artist, after having spent <b>so much</b> time on it and put <b>so much</b> of myself into it.',
  },
  {
    text:
      'Now locked up in a container where no one can see my work, where it would hopefully gain value with time or if I die in some <i>flamboyant scandalous way</i>.',
    isEndOfDialog: true,

    triggeredByNext: () => {
      artist2.talkBubble(artist2Talk, '1st')
    },
  },
  {
    name: '2nd',
    text:
      'Well yeah, but back then there wasn’t much of a market for NFTs, <i>or I didn’t know about it at least</i>. I was just trying to make a living by selling canvases, like everyone else.',
    isEndOfDialog: true,

    triggeredByNext: () => {
      artist2.talkBubble(artist2Talk, '2nd')
    },
  },
  {
    name: '3rd',
    text:
      ' The thing is <b>I would still be removing my work from the public view</b>, the form of payment doesn’t change that.',
  },
  {
    text:
      'My audience suddenly got reduced to some rich guy and <i>maybe</i> his occasional dinner guests. That’s the part that upset me.',
    isEndOfDialog: true,

    triggeredByNext: () => {
      artist2.talkBubble(artist2Talk, '3rd')
    },
  },
  {
    name: '4th',
    text:
      'Kinda… <i>yes and no</i>. The owner of the work might be just one person, but it’s still available for any curious eyes out there.',
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
    text:
      'Yeah, otherwise our rambling would have bored you to death by now. If all of this space is new to you, <i>you’re in for a treat!</i>',
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
    text:
      'And that was <i>such a good time</i> to get into ether, so cheap back then. Imagine if you sold those for eth then?',
    isEndOfDialog: true,

    triggeredByNext: () => {
      artist1.talkBubble(artist1Talk, '2nd')
    },
  },
  {
    name: '2nd',
    text:
      ' Just imagine if you sold a painting for 200 eth, it was <b>nothing</b> back then.',
    isEndOfDialog: true,

    triggeredByNext: () => {
      artist1.talkBubble(artist1Talk, '3rd')
    },
  },
  {
    name: '3rd',
    text:
      'But your NFTs also end up going to the wallet of some rich whale just the same.',
    isEndOfDialog: true,

    triggeredByNext: () => {
      artist1.talkBubble(artist1Talk, '4th')
    },
  },
  {
    name: '4th',
    text:
      'Speaking of audiences, looks like we have one here. Hey! I take it that you have an interest in art',
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
    text:
      'A ton of places you can check out. With <b>crazy expensive</b> virtual art on display. You can’t imagine what some of these cost!',
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
    text:
      'Ok, so first there’s <color="red">Voltaire District</color>, at x & x. Lots of big players in the crypto art space have spot there.',
    isQuestion: true,
    buttons: [
      {
        label: 'Visit',
        goToDialog: 'dummy',
        triggeredActions: () => {
          artist1.endInteraction()
          artistsBackToNormal()
          teleportTo('50,50')
        },
      },
      { label: 'More', goToDialog: 'museum' },
    ],
  },
  {
    name: 'museum',
    text:
      'There’s the <color="red"> Museum District</color> at 20,80, quite a pioneer of the metaverse.',
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
    text:
      'The  <color="red">Rapture Gallery</color> at -88,-65 is also a really hip spot worth visiting',
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
    text:
      'Also  <color="red">100x Gallery</color>, at X,Y, there’s a whole bunch of things around that area.',
    isQuestion: true,
    buttons: [
      {
        label: 'Visit',
        goToDialog: 'dummy',
        triggeredActions: () => {
          artist1.endInteraction()
          artistsBackToNormal()
          teleportTo('50,50')
        },
      },
      { label: 'More', goToDialog: 'momus' },
    ],
  },
  {
    name: 'momus',
    text:
      ' <color="red">Momus Park</color> covers a huge area made up of passages, it’s quite a scenic route. You could start your visti at 8,43.',
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
    text:
      'Also the <color="red">Vegas Art Village</color> atX,Y includes a whole assortment of very creative small museums from the community.',
    isQuestion: true,
    buttons: [
      {
        label: 'Visit',
        goToDialog: 'dummy',
        triggeredActions: () => {
          artist1.endInteraction()
          artistsBackToNormal()
          teleportTo('50,50')
        },
      },
      { label: 'Done', goToDialog: 'end' },
    ],
  },
  {
    name: 'end',
    text:
      'Those are the ones that come to mind to me right now. But there´s a LOT more to explore too.',
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
    text:
      'Hey there! Seen any promising new coins? It’s full of them, all over the place. You just need to be at the <i>right place</i> at the <i>right time</i>..',
    skipable: true,
  },
  {
    text:
      'I’m  <color="red">Wen Moon </color>, a future millionaire, you’ll see. Any minute now!',
    skipable: true,
  },
  {
    text:
      'Everyone gets a break except me. But it’s a matter of time now, I got a bit of everything, you never know what’s the next big thing.',
    skipable: true,
  },
  {
    text:
      'For example, my friend was really psyched about Ponzy Coin, you heard of it? He says it’s going to be huge, and he’ll even cut me a special deal if I buy it from him.',
    skipable: true,
  },
  {
    text:
      'Then there’s Bad Press Coin: its value is directly tied to how many negative mentions it gets on twitter. You think it’s a bad idea? <i>Go tweet about it haha</i>',
    skipable: true,
  },
  {
    text: 'Any of these could be the <i>next bitcoin</i>...',
    skipable: true,
  },
  {
    text:
      '<i>Gotta get them all!</i> Haha You know, just like that yellow cat says..',
    skipable: true,
  },
  {
    text:
      'You know the one… The one from that famous comic book kids read today, Poker Nom ...or something',
    skipable: true,
  },
  {
    text:
      'Anyway, I’ll keep looking. I’m gonna miss my big break if I stay chatting here. See you around!',
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
