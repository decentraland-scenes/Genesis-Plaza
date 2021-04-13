import { NPC, Dialog, FollowPathData } from '@dcl/npc-scene-utils'
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
      position: new Vector3(160, 0.25, 141.4),
      //scale: new Vector3(1.2, 1.2, 1.2),
    },
    'models/core_building/BobOctorossPartA_V42.glb',
    () => {
      octopus.changeIdleAnim('TalkLoop')
      octopus.playAnimation('TalkIntro', true, 0.63)
      octopus.talk(OctoHi)
    },
    {
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
      new Vector3(175, 0.3, 160),
      new Vector3(169, 0.4, 164),
      new Vector3(153, 0.3, 154),
      new Vector3(142, 0.3, 158),
      new Vector3(139, 0.3, 147),
      new Vector3(151, 0.3, 140),
      new Vector3(155, 0.3, 145),
      new Vector3(155, 0.3, 149),
      new Vector3(159, 0.3, 157),
      new Vector3(168, 0.3, 154),
    ],
    loop: true,
  }

  let catGuyPath: FollowPathData = {
    path: [
      new Vector3(181.8, 10.8, 160),
      new Vector3(173.4, 10.8, 168.6),
      new Vector3(145.7, 10.8, 166.3),
      new Vector3(141.1, 10.8, 159.5),
      new Vector3(140.8, 10.8, 137.7),
      new Vector3(161.5, 10.8, 130),
      new Vector3(179.3, 10.8, 139),
      new Vector3(181.3, 10.8, 141.4),
    ],
    loop: true,
    speed: 2,
    curve: false,
    onReachedPointCallback: () => {
      // let randomNum = Math.floor(Math.random() * 4)
      // catGuy.talkBubble(whereCat, randomNum)
    },
  }

  doge = new NPC(
    { position: new Vector3(175, 0.3, 160), scale: new Vector3(2, 2, 2) },
    'models/core_building/dogeNPC.glb',
    () => {
      doge.stopWalking()
      doge.playAnimation('Talk1', true)
      let randomNum = Math.floor(Math.random() * 4)
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
      bubbleHeight: 2.5,
    }
  )
  doge.followPath(dogePath)

  catGuy = new NPC(
    { position: new Vector3(181.8, 11.1, 160) },
    'models/core_building/CatGuy.glb',
    () => {
      catGuy.bubble.closeDialogWindow()
      catGuy.stopWalking()
      catGuy.talk(ILoveCats, 0)
      catGuy.playAnimation(`Head_Yes`, true, 2.63)
    },
    {
      portrait: {
        path: 'images/portraits/catguy.png',
        height: 128,
        width: 128,
      },
      reactDistance: 4,
      idleAnim: `Weight_Shift`,
      walkingAnim: 'Walk',
      dialogSound: `sounds/navigationForward.mp3`,
      faceUser: true,
      darkUI: true,
      walkingSpeed: 2,
      onWalkAway: () => {
        catGuy.followPath()
      },
      textBubble: true,
      bubbleHeight: 2.3,
    }
  )
  catGuy.followPath(catGuyPath)

  wearablesC = new NPC(
    { position: new Vector3(163, 0.3, 133) },
    'models/core_building/WearableConnoisseur.glb',
    async () => {
      // wearablesC.playAnimation('TurnIn', true, 3.13)
      //   wearablesC.changeIdleAnim('Talk')
      let rareItem = await rarestItem(true)

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
      faceUser: true,
      darkUI: true,
      hoverText: 'Talk',
      onlyETrigger: true,
      onWalkAway: () => {
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
    { position: new Vector3(151, 0, 133) },
    'models/core_building/ch1_crowd.glb',
    () => {
      // talk w UI
    },
    {
      darkUI: true,
      hoverText: 'Ask art places',
      onlyETrigger: true,
      onWalkAway: () => {
        // artist1.addComponentOrReplace(new utils.RotateTransformComponent(wearablesC.getComponent(Transform).rotation.clone(), Quaternion.Euler(0, 0, 0), 1))
      },
    }
  )

  artist2 = new NPC(
    { position: new Vector3(150, 0.3, 133) },
    'models/core_building/ch2_crowd.glb',
    () => {
      // wearablesC.playAnimation('TurnIn', true, 3.13)
      //   wearablesC.changeIdleAnim('Talk')
      artist1.talkBubble(artist1Talk, '1st')
    },
    {
      faceUser: true,
      darkUI: true,
      hoverText: 'Talk',
      reactDistance: 5,

      onWalkAway: () => {
        artist1.endInteraction()
        artist2.endInteraction()
        //  wearablesC.addComponentOrReplace(new utils.RotateTransformComponent(wearablesC.getComponent(Transform).rotation.clone(), Quaternion.Euler(0, 0, 0), 1))
      },
    }
  )
}

export function addWenMoon() {
  let wenPath: FollowPathData = {
    path: [
      new Vector3(82, 0.3, 138),
      new Vector3(45, 0.4, 149),
      new Vector3(40, 0.3, 179),
      new Vector3(45, 0.3, 216),
      new Vector3(101, 0.3, 259),
      new Vector3(132, 0.3, 253),
      new Vector3(159, 0.3, 228),
      new Vector3(166, 0.3, 195),
      new Vector3(198, 0.3, 189),
      new Vector3(207, 0.3, 141),
      new Vector3(197, 0.3, 155),
      new Vector3(156, 0.3, 103),
      new Vector3(98, 0.3, 62),
      new Vector3(70, 0.3, 89),
    ],
    loop: true,
  }

  wenMoon = new NPC(
    { position: wenPath.path[0] },
    'models/core_building/wenMoonV10.glb',
    () => {
      wenMoon.stopWalking()
      wenMoon.talk(wenMoonTalk, 0)
      wenMoon.playAnimation(`TurnIn`, true, 5.77)
    },
    {
      portrait: {
        path: 'images/portraits/catguy.png',
        height: 128,
        width: 128,
      },
      reactDistance: 4,
      idleAnim: `Talk`,
      walkingAnim: 'Walk',
      dialogSound: `sounds/navigationForward.mp3`,
      faceUser: true,
      darkUI: true,
      walkingSpeed: 1,
      onWalkAway: () => {
        wenMoon.followPath()
      },
    }
  )
  wenMoon.followPath(wenPath)
}

/// OCTO

export let OctoHi: Dialog[] = [
  {
    text:
      'Hey there ' +
      userData.displayName +
      ', how is it going? I have a long story to tell you',
    skipable: true,
  },
  {
    text: 'Dam, I forgot what it was I wanted to tell you.',

    skipable: true,
  },
  {
    text: 'Want a drink?',
    isQuestion: true,
    buttons: [
      { label: 'YES', goToDialog: 'yes', fontSize: 14 },
      { label: 'NO', goToDialog: 'no', fontSize: 14 },
    ],
  },
  {
    name: 'no',
    text: "Okay, I'll be around if you get thirsty!",

    triggeredByNext: () => {
      backToIdle()
    },
    isEndOfDialog: true,
  },
  {
    name: 'yes',
    text: "I'm all out, sorry",

    triggeredByNext: () => {
      backToIdle()
    },
    isEndOfDialog: true,
  },
]

export function backToIdle() {
  octopus.changeIdleAnim('Idle')
  octopus.playAnimation('TalkOutro', true, 0.63)
}

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
]

export let ILoveCats: Dialog[] = [
  {
    text: `I love cats. I love every kind of cat`,
    triggeredByNext: () => {
      catGuy.playAnimation(`HeadShake_No`, true, 1.83)
    },
    skipable: true,
  },
  {
    text: `I just want to hug them all. But I can't hug every cat.`,
    triggeredByNext: () => {
      catGuy.playAnimation(`Annoyed_HeadShake`, true, 2.6)
    },
    skipable: true,
  },
  {
    text: `Can't hug every cat.`,

    triggeredByNext: () => {
      catGuy.playAnimation(`Dismissing`, true, 3.3)
    },
    skipable: true,
  },
  {
    text: `...so anyway.`,
    triggeredByNext: () => {
      catGuy.playAnimation(`Cocky`, true, 2.93)
    },
    skipable: true,
  },
  {
    text: `I am a cat person, and I love to run.`,
    triggeredByNext: () => {
      catGuy.playAnimation(`Annoyed_HeadShake`, true, 2.6)
    },
    skipable: true,
  },
  {
    text: `Oh sorry I'm thinking about cats again.`,
    triggeredByNext: () => {
      catGuy.playAnimation(`Acknowledging`, true, 1.97)
    },
    skipable: true,
  },
  {
    text: `I really Lo-ove cats. Really Lo-ove cats.`,
    triggeredByNext: () => {
      catGuy.followPath()
    },
    skipable: true,
  },
  {
    text: `This is the really important part.`,
  },
  {
    text: `The one that you can't skip. Capiche?`,
    isEndOfDialog: true,
  },
]

export let whereCat: Dialog[] = [
  {
    text: `Where did that rascal go?`,
    isEndOfDialog: true,
  },
  {
    text: `Come oooooooooon,  come out and play, it's just me`,
    isEndOfDialog: true,
  },
  {
    text: `Where could he be now?`,
    isEndOfDialog: true,
  },
]

export let wearabesCTalk: Dialog[] = [
  {
    name: 'none',
    text: 'Why? … Umm, what would someone dressed like you have to say to me?',
    skipable: true,
  },
  {
    text:
      'Clearly you just put on whatever rags you slept in and think that’s an outfit, let me tell you something: you don’t cause a good impression on me like that.',
    skipable: true,
  },
  {
    text:
      'I guess you’re fine, I mean we’re not going to be friends, but I’m feeling generous today and will acknowledge that you exist.',
    skipable: true,
    triggeredByNext: () => {
      wearablesC.talk(wearabesCTalk, 'default')
    },
  },
  {
    name: 'common',
    text:
      'Well look at you, all dressed up with outlet-grade clothes that you probably bought at a gas station.',
    skipable: true,
  },
  {
    text:
      'I guess you’re fine, I mean we’re not going to be friends, but I’m feeling generous today and will acknowledge that you exist.',
    skipable: true,
    triggeredByNext: () => {
      wearablesC.talk(wearabesCTalk, 'default')
    },
  },
  {
    name: 'epic',
    text:
      'I see that you know how to present yourself. If only everyone had a baseline of taste like yours. Not that it’s a very high bar, but it would be quite an improvement.',
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
      'I always say “you are what you wear”. So true. Dressing up is all about expressing who you want to be in the eyes of others',
    skipable: true,
  },
  {
    text:
      'I always say “you are what you wear”. So true. Dressing up is all about expressing who you want to be in the eyes of others',
    skipable: true,
  },
  {
    text:
      'And me, as you can tell I’m one of a kind. Dressed in the finest Non-Fungible Tokens in the marketplace. Worthy of a queen!',
    skipable: true,
  },
  {
    text:
      'And you, who do your clothes say you are? Have a think about that, hun.',
    skipable: true,
    isEndOfDialog: true,

    triggeredByNext: () => {
      wearablesC.endInteraction()
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
      'So there I was, questioning what my work really meant to me as an artist, after having spent so much time on it and put so much of myself into it.',
  },
  {
    text:
      'Now locked up in a container where no one can see my work, where it would hopefully gain value with time or if I die in some flamboyant scandalous way.',
    isEndOfDialog: true,

    triggeredByNext: () => {
      artist2.talkBubble(artist2Talk, '1st')
    },
  },
  {
    name: '2nd',
    text:
      'Well yeah, but back then there wasn’t much of a market for NFTs, or I didn’t know about it at least. I was just trying to make a living by selling canvases, like everyone else.',
    isEndOfDialog: true,

    triggeredByNext: () => {
      artist2.talkBubble(artist2Talk, '2nd')
    },
  },
  {
    name: '3rd',
    text:
      ' The thing is I would still be removing my work from the public view, the form of payment doesn’t change that.',
  },
  {
    text:
      'My audience suddenly got reduced to some rich guy and maybe his occasional dinner guests. That’s the part that upset me.',
    isEndOfDialog: true,

    triggeredByNext: () => {
      artist2.talkBubble(artist2Talk, '3rd')
    },
  },
  {
    name: '4th',
    text:
      'Kinda… yes and no. The owner of the work might be just one person, but it’s still available for any curious eyes out there.',
    isEndOfDialog: true,

    triggeredByNext: () => {
      artist2.talkBubble(artist2Talk, '4th')
      artist2.playAnimation('TurnIn', true, 0.57)
    },
  },
  {
    name: '5th',
    text:
      'Yeah, otherwise our rambling would have bored you to death by now. If all of this space is new to you, you’re in for a treat!',
    isEndOfDialog: true,

    triggeredByNext: () => {
      artist2.talkBubble(artist2Talk, '5th')
      artist2.playAnimation('Talk')
    },
  },
  {
    name: '6th',
    text: 'Yeah and well… it’s good art too. A lot of it, at least.',
  },
  {
    text: 'Ask me and I’ll give you some hints.',
    isEndOfDialog: true,
  },
]

export let artist2Talk: Dialog[] = [
  {
    name: '1st',
    text:
      'And that was such a good time to get into ether, so cheap back then. Imagine if you sold those for eth then?',
    isEndOfDialog: true,

    triggeredByNext: () => {
      artist1.talkBubble(artist1Talk, '2nd')
    },
  },
  {
    name: '2nd',
    text:
      ' Just imagine if you sold a painting for 200 eth, it was nothing back then.',
    isEndOfDialog: true,

    triggeredByNext: () => {
      artist1.talkBubble(artist1Talk, '3rd')
    },
  },
  {
    name: '3nd',
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
      artist1.talkBubble(artist1Talk, '5th')
    },
  },
  {
    name: '5th',
    text:
      'A ton of places you can check out. With crazy expensive virtual art on display. You can’t imagine what some of these cost!',
    isEndOfDialog: true,

    triggeredByNext: () => {
      artist1.talkBubble(artist1Talk, '6th')
    },
  },
]

export let wenMoonTalk: Dialog[] = [
  {
    text:
      'Hey there! Seen any promising new coins? It’s full of them, all over the place. You just need to be at the right place at the right time.. Imagine if you sold those for eth then?',
  },
  {
    text: 'I’m Wen Moon, a future millionaire, you’ll see. Any minute now!',
  },
  {
    text:
      'Everyone gets a break except me. But it’s a matter of time now, I got a bit of everything, you never know what’s the next big thing.',
  },
  {
    text:
      'For example, my friend was really psyched about Ponzy Coin, you heard of it? He says it’s going to be huge, and he’ll even cut me a special deal if I buy it from him.',
  },
  {
    text:
      'Then there’s Bad Press Coin: its value is directly tied to how many negative mentions it gets on twitter. You think it’s a bad idea? Go tweet about it haha',
  },
  {
    text: 'Any of these could be the next bitcoin...',
  },
  {
    text:
      '<i>Gotta get them all!<i> Haha You know, just like that yellow cat says..',
  },
  {
    text:
      'You know the one… The one from that famous comic book kids read today, Poker Nom ...or something',
  },
  {
    text:
      'Anyway, I’ll keep looking. I’m gonna miss my big break if I stay chatting here. See you around!',
    isEndOfDialog: true,

    triggeredByNext: () => {
      wenMoon.endInteraction()
      wenMoon.followPath()
    },
  },
]
