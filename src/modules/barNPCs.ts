import { NPC, Dialog, FollowPathData } from '@dcl/npc-scene-utils'
import { getUserData, UserData } from '@decentraland/Identity'

export let octopus: NPC
export let doge: NPC
export let catGuy: NPC

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
      let randomNum = Math.floor(Math.random() * 4)
      catGuy.talkBubble(whereCat, randomNum)
    },
  }

  doge = new NPC(
    { position: new Vector3(175, 0.3, 160), scale: new Vector3(2, 2, 2) },
    'models/core_building/dogeNPCV04.glb',
    () => {
      doge.stopWalking()
      doge.playAnimation('Talk1', true)
      let randomNum = Math.floor(Math.random() * 4)
      doge.talkBubble(DogeTalk, randomNum)
    },
    {
      walkingAnim: 'Walk',
      faceUser: true,
      darkUI: true,
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
