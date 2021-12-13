import { Dialog } from '@dcl/npc-scene-utils'
import {
  alice,
  ron,
  bela,
  betty,
  charlie,
  marsha,
  bob,
} from './npcRobotBuilder'

// --- Main Dialog (Alice) ---
export let AliceDialog: Dialog[] = [
  {
    text:
      "Hi, I'm Alice - welcome to Genesis Plaza! Would you like to learn more about this place?",
    offsetY: 24,
    isQuestion: true,
    buttons: [
      { label: 'YES', goToDialog: 'yes', fontSize: 14 },
      { label: 'NO', goToDialog: 'no', fontSize: 14 },
    ],
  },
  {
    name: 'no',
    text: "Okay, I'll be around if you get curious!",
    offsetY: 18,
    triggeredByNext: () => {
      alice.playAnimation('Goodbye', true, 2)
      alice.endInteraction()
    },
    isEndOfDialog: true,
  },
  {
    name: 'yes',
    text:
      'We’re currently in the center of the Genesis City map, the roads fan out in all directions from here.',
    offsetY: 18,
  },
  {
    text: "Genesis Plaza is a community-owned space that's open to everyone",
    offsetY: 6,
  },
  {
    text:
      'If you venture out into the world, you’ll see that the content is created by our growing community.',
    offsetY: 6,
  },
  {
    text:
      'Do you want to explore the rest of Genesis Plaza or explore the rest of the world?',
    offsetY: 24,
    isQuestion: true,
    buttons: [
      {
        label: 'PLAZA',
        goToDialog: 'plaza',
        fontSize: 11,

        offsetY: -17.5,
      },
      {
        label: 'WORLD',
        goToDialog: 'world',
        fontSize: 11,

        offsetY: -17.5,
      },
    ],
  },
  {
    name: 'plaza',
    text: 'Great! There’s a lot to see right here.',
    offsetY: 18,
  },
  {
    text:
      'If you walk around you might run into my buddies and each is an expert on a different topic.',
    offsetY: 18,
  },
  {
    text:
      'You can learn a lot from them about how Decentraland works and what makes it special.',
    offsetY: 18,
  },
  {
    text: 'I recommend you start at that boat-shaped building to the North!',
    offsetY: 18,
  },
  {
    text: "Do you also want to learn about what's beyond Genesis Plaza?",
    offsetY: 24,
    isQuestion: true,
    buttons: [
      { label: 'YES', goToDialog: 'world-end' },
      { label: 'NO', goToDialog: 'end' },
    ],
  },
  {
    name: 'world-end',
    text: 'There’s a big world to explore out there!',
    offsetY: 18,
  },
  {
    text:
      "Around Genesis Plaza you'll find several teleports that can take you directly to special scenes marked as points of interest.",
    offsetY: 6,
  },
  {
    text:
      "There's also the 'crowd' teleport, which takes you to the biggest gathering of people in Decentraland so you can meet up and hang out.",
    offsetY: 6,
  },
  {
    text:
      "If you press the 'M' key, you’ll open the map. You'll see markers for points of interest that are worth visiting.",
    offsetY: 6,
  },
  {
    text:
      "Or simply explore the virtual world by foot and plot your own adventure. Just keep in mind that there's a LOT of ground to cover.",
    offsetY: 6,
  },
  {
    text: 'So what are you waiting for? Go and explore the world!',
    offsetY: 18,
    triggeredByNext: () => {
      alice.playAnimation('Goodbye', true, 2)
      alice.endInteraction()
    },
    isEndOfDialog: true,
  },
  {
    name: 'world',
    text: 'There’s a big world to explore out there!',
    offsetY: 18,
  },
  {
    text:
      "Around Genesis Plaza you'll find several teleports that can take you directly to special scenes marked as points of interest.",
    offsetY: 6,
  },
  {
    text:
      "There's also the 'crowd' teleport, which takes you to the biggest gathering of people in Decentraland so you can meet up and hang out.",
    offsetY: 6,
  },
  {
    text:
      "If you press the 'M' key, you’ll open the map. You'll see markers for points of interest that are worth visiting.",
    offsetY: 6,
  },
  {
    text:
      "Or simply explore the virtual world by foot and plot your own adventure. Just keep in mind that there's a LOT of ground to cover.",
    offsetY: 6,
  },
  {
    text: "Do you also want to find out what's here in Genesis Plaza?",
    offsetY: 24,
    isQuestion: true,
    buttons: [
      { label: 'YES', goToDialog: 'plaza-end' },
      { label: 'NO', goToDialog: 'end' },
    ],
  },
  {
    name: 'plaza-end',
    text: 'Great! There’s a lot to see right here.',
    offsetY: 18,
  },
  {
    text:
      'If you walk around you might run into my buddies and each is an expert on a different topic.',
    offsetY: 18,
  },
  {
    text:
      'You can learn a lot from them about how Decentraland works and what makes it special.',
    offsetY: 18,
  },
  {
    text: 'I recommend you start at that boat-shaped building to the North!',
    offsetY: 18,
  },
  {
    name: 'end',
    text:
      "Well that's it from me. So what are you waiting for? Go and explore the world!",
    offsetY: 18,
    triggeredByNext: () => {
      alice.playAnimation('Goodbye', true, 2)
      alice.endInteraction()
    },
    isEndOfDialog: true,
  },
]

// --- Shell Dialog (Ron) ---
export let RonDialog: Dialog[] = [
  {
    text:
      "Hi! I'm Ron – a crafter of wearable items. Would you like to learn more about wearables?",
    offsetY: 24,
    isQuestion: true,
    buttons: [
      { label: 'YES', goToDialog: 'yes' },
      { label: 'NO', goToDialog: 'no' },
    ],
  },
  {
    name: 'no',
    text: "Okay, I'll be around if you get curious.",
    offsetY: 18,
    triggeredByNext: () => {
      ron.playAnimation('Goodbye', true, 2)
      ron.endInteraction()
    },
    isEndOfDialog: true,
  },
  {
    name: 'yes',
    text:
      "As you've probably already found out - you can customize your avatar and choose what items to wear.",
    offsetY: 6,
  },
  {
    text:
      'You may have also noticed that other players have fancy outfits that you can’t find in your item menu.',
    offsetY: 6,
  },
  {
    text: 'That’s because certain wearables must be bought or earned.',
    offsetY: 18,
  },
  {
    text: 'Do you want to know how wearables relate to the blockchain?',
    offsetY: 24,
    isQuestion: true,
    buttons: [
      { label: 'YES', goToDialog: 'blockchain' },
      { label: 'NO', goToDialog: 'no-chain' },
    ],
  },
  {
    name: 'blockchain',
    text:
      'Wearables are traded on the blockchain as non-fungible tokens (NFTs). This makes each item unique, with a traceable and unique history.',
    offsetY: 6,
  },
  {
    name: 'no-chain',
    text:
      'If you go north to the boat-shaped building, I have a friend there who knows a lot about this stuff.',
    offsetY: 6,
  },
  {
    text:
      'Except for the default set of wearables you get when you start out, each wearable model has a limited supply.',
    offsetY: 6,
  },
  {
    text: 'Some wearables are more rare than others.',
    offsetY: 18,
  },
  {
    text:
      'You can buy and sell wearables in the Decentraland Marketplace. To learn more about this topic, head to the Trade Center building.',
    offsetY: 6,
  },
  {
    text:
      'Before you go though, there are several wearables on display here. Take a look around!',
    offsetY: 18,
  },
  {
    text:
      'The wearables here are linked to the Marketplace so if you see anything you like, you can buy it from the community member who owns it.',
    offsetY: 6,
  },
  {
    text:
      'I hope you found this information useful and have fun expressing yourself with your new wearables!',
    offsetY: 6,
    isEndOfDialog: true,
  },

  // --- YELLOW TEXT ---
  // Christmas
  {
    text:
      'These wearables are from the Cyberchristmas 2019 collection. Real flashy huh?',
    offsetY: 18,
    triggeredByNext: () => {
      ron.playAnimation('Goodbye', true, 2)
      ron.endInteraction()
    },
    isEndOfDialog: true,
  },

  // Halloween
  {
    text:
      'These wearables are from the Halloween 2019 collection. Pretty creepy looking huh?',
    offsetY: 18,
    triggeredByNext: () => {
      ron.playAnimation('Goodbye', true, 2)
      ron.endInteraction()
    },
    isEndOfDialog: true,
  },
]

// --- Agora Dialog (Bela) ---
export let BelaDialog: Dialog[] = [
  {
    text:
      "Hello, I'm Bela - would you like to learn more about how the community shapes Decentraland?",
    offsetY: 24,
    isQuestion: true,
    buttons: [
      { label: 'YES', goToDialog: 'yes' },
      { label: 'NO', goToDialog: 'no' },
    ],
  },
  {
    name: 'no',
    text: "Okay, I'll be around if you get curious.",
    offsetY: 18,
    triggeredByNext: () => {
      bela.playAnimation('Goodbye', true, 2)
      bela.endInteraction()
    },
    isEndOfDialog: true,
  },
  {
    name: 'yes',
    text: 'Decentraland is designed to be run 100% by the community.',
    offsetY: 18,
  },
  {
    text:
      "There's already been several petitions that have been voted on. Anyone with MANA or LAND can vote and determine the future of Decentraland.",
    offsetY: 6,
  },
  {
    text:
      'For example, the community decided through a vote that each land parcel should measure 16x16 meters instead of the original 10x10 meters.',
    offsetY: 6,
  },
  {
    text:
      'There will gradually be more and more ways in which you can pitch in to help shape the direction of the virtual world.',
    offsetY: 6,
  },
  {
    text:
      "You've joined us at a really exciting time, when we can own and shape the virtual spaces where we hang out.",
    offsetY: 6,
  },
  {
    text: 'I hope you found this information interesting!',
    offsetY: 18,
    triggeredByNext: () => {
      bela.playAnimation('Goodbye', true, 2)
      bela.endInteraction()
    },
    isEndOfDialog: true,
  },
]

// --- Garden Text (Betty) ---
export let BettyDialog: Dialog[] = [
  {
    text:
      "Hi, I'm Betty - a content creator! Would you like to learn about how content in Decentraland is made?",
    offsetY: 24,
    isQuestion: true,
    buttons: [
      { label: 'YES', goToDialog: 'yes' },
      { label: 'NO', goToDialog: 'no' },
    ],
  },
  {
    name: 'no',
    text: "Okay, I'll be around if you get curious.",
    offsetY: 18,
    triggeredByNext: () => {
      betty.playAnimation('Goodbye', true, 2)
      betty.endInteraction()
    },
    isEndOfDialog: true,
  },
  {
    name: 'yes',
    text:
      'Decentraland is made up of scenes and each scene is its own self-contained world that sits next to other scenes.',
    offsetY: 6,
  },
  {
    text:
      'A scene can take up a single LAND parcel or as many parcels as you want. Each LAND parcel measures 16x16 meters.',
    offsetY: 6,
  },
  {
    text:
      'With the exception of public spaces like plazas and roads, everything you see is created by members of the community like yourself.',
    offsetY: 6,
  },
  {
    text:
      "There are two different tools that can be used to build. First there's The Builder - an easy drag and drop tool.",
    offsetY: 6,
  },
  {
    text:
      "Then there's the SDK (Software Development Kit), which is a more powerful coding tool for developers.",
    offsetY: 6,
  },
  {
    text: 'Which one do you want to learn about first?',
    offsetY: 24,
    isQuestion: true,
    buttons: [
      {
        label: 'BUILDER',
        fontSize: 10,
        goToDialog: 'builder',
      },
      { label: 'SDK', goToDialog: 'sdk' },
    ],
  },
  {
    name: 'builder',
    text:
      'The Builder is a lot of fun! You can drag and drop pre-made 3D items of a variety of themes into your scene.',
    offsetY: 6,
  },
  {
    text:
      'Some items come with built-in behaviors. You can use these as building-blocks to make up a whole game.',
    offsetY: 6,
  },
  {
    text:
      'If you’re a 3D artist, or want to import 3D content, you have the ability to import your own.',
    offsetY: 18,
  },
  {
    text: 'Do you want to also learn about the SDK (Software Development Kit)?',
    offsetY: 24,
    isQuestion: true,
    buttons: [
      { label: 'YES', goToDialog: 'sdk-end' },
      { label: 'NO', goToDialog: 'end' },
    ],
  },
  {
    name: 'sdk-end',
    text:
      'The SDK is a very powerful tool that gives you a lot of freedom by writing your scenes in code.',
    offsetY: 18,
  },
  {
    text:
      'It is based on TypeScript, a language that’s very similar to JavaScript but more reliable.',
    offsetY: 18,
  },
  {
    text:
      'There are several great examples out in the world of scenes written with the SDK.',
    offsetY: 18,
  },
  {
    text: 'Many of the teleports around this plaza take you to such scenes.',
    offsetY: 18,
  },
  {
    text:
      'You can also use the SDK to create your own smart items with built-in logic.',
    offsetY: 18,
  },
  {
    text:
      'These can then be easily used in the Builder by dragging and dropping them.',
    offsetY: 18,
  },
  {
    text:
      'You can also start a scene using the Builder. Lay out the parts before exporting them to add specific functionality with code, using the SDK.',
    offsetY: 6,
  },
  {
    text:
      'Remember you can always visit docs.decentraland.org for a more in-depth guide on building scenes',
    offsetY: 6,
  },
  {
    text:
      "Hope that gets you excited about creating and sharing great things. Can't wait to see what you come up with!",
    offsetY: 6,
    triggeredByNext: () => {
      betty.playAnimation('Goodbye', true, 2)
      betty.endInteraction()
    },
    isEndOfDialog: true,
  },
  {
    name: 'sdk',
    text:
      'The SDK is a very powerful tool that gives you a lot of freedom by writing your scenes in code.',
    offsetY: 18,
  },
  {
    text:
      'It is based on TypeScript, a language that’s very similar to JavaScript but more reliable.',
    offsetY: 18,
  },
  {
    text:
      'There are several great examples out in the world of scenes written with the SDK.',
    offsetY: 18,
  },
  {
    text: 'Many of the teleports around this plaza take you to such scenes.',
    offsetY: 18,
  },
  {
    text:
      'You can also use the SDK to create your own smart items with built-in logic.',
    offsetY: 18,
  },
  {
    text:
      'These can then be easily used in the Builder by dragging and dropping them.',
    offsetY: 18,
  },
  {
    text:
      'You can also start a scene using the Builder. Lay out the parts before exporting them to add specific functionality with code, using the SDK.',
    offsetY: 6,
  },
  {
    text:
      'Do you also want to learn about the Builder, our visual editor tool?',
    offsetY: 24,
    isQuestion: true,
    buttons: [
      { label: 'YES', goToDialog: 'builder-end' },
      { label: 'NO', goToDialog: 'end' },
    ],
  },
  {
    name: 'builder-end',
    text:
      'The Builder is a lot of fun! You can drag and drop pre-made 3D items of a variety of themes into your scene.',
    offsetY: 6,
  },
  {
    text:
      'Some items come with built-in behaviors. You can use these as building-blocks to make up a whole game.',
    offsetY: 6,
  },
  {
    text:
      'If you’re a 3D artist, or want to import 3D content, you have the ability to import your own.',
    offsetY: 18,
  },
  {
    text:
      'Remember you can always visit docs.decentraland.org for a more in-depth guide on building scenes',
    offsetY: 6,
  },
  {
    name: 'end',
    text:
      "Hope that gets you excited about creating and sharing great things. Can't wait to see what you come up with!",
    offsetY: 6,
    triggeredByNext: () => {
      betty.playAnimation('Goodbye', true, 2)
      betty.endInteraction()
    },
    isEndOfDialog: true,
  },

  // --- YELLOW TEXT ---
  // Builder
  {
    text:
      'This is what a basic Builder scene looks like. There are tons of prefab items you can just drag and drop to create an experience of your own.',
    offsetY: 6,
    isEndOfDialog: true,
  },

  // Smart Items
  {
    text:
      'This is what a Builder scene looks like with some smart items in it.',
    offsetY: 18,
  },
  {
    text:
      'Smart items can be dragged in just as easily as other items, but can make things so much more interesting!',
    offsetY: 6,
    triggeredByNext: () => {
      betty.playAnimation('Goodbye', true, 2)
      betty.endInteraction()
    },
    isEndOfDialog: true,
  },
]

// --- Trade Dialog (Charlie) ---
export let CharlieDialog: Dialog[] = [
  {
    text:
      "Hey, I'm Charlie - a master trader. Would you like to learn more about the Decentraland Marketplace?",
    offsetY: 24,
    isQuestion: true,
    buttons: [
      { label: 'YES', goToDialog: 'yes' },
      { label: 'NO', goToDialog: 'no' },
    ],
  },
  {
    name: 'no',
    text: "Okay, I'll be around if you get curious.",
    offsetY: 18,
    triggeredByNext: () => {
      charlie.playAnimation('Goodbye', true, 2)
      charlie.endInteraction()
    },
    isEndOfDialog: true,
  },
  {
    name: 'yes',
    text:
      'This is the Metaverse Trade Center. Here you can see live stats from the Decentraland Marketplace.',
    offsetY: 6,
  },
  {
    text:
      'There’s a thriving economy behind Decentraland and every day people buy and sell unique items.',
    offsetY: 18,
  },
  {
    text: 'Items like LAND parcels, wearable items and reserved names.',
    offsetY: 18,
  },
  {
    text: 'As more trading happens on the platform, it grows and moves faster.',
    offsetY: 18,
  },
  {
    text:
      'You can explore this building to find real-time stats about what goes on in the Marketplace.',
    offsetY: 18,
  },
  {
    text:
      'Do you want to know more about how the Marketplace uses the blockchain?',
    offsetY: 24,
    isQuestion: true,
    buttons: [
      { label: 'YES', goToDialog: 'blockchain' },
      { label: 'NO', goToDialog: 'no-blockchain' },
    ],
  },
  {
    name: 'blockchain',
    text:
      'All sales, bids and other operations are transactions on the blockchain.',
    offsetY: 18,
  },
  {
    text:
      'Like all transactions, they require a small gas fee that is paid to the network of miners.',
    offsetY: 18,
  },
  {
    text:
      "The Marketplace charges a small fee over all transactions. This fee doesn't go into anyone's pocket. Instead it gets burned.",
    offsetY: 6,
  },
  {
    name: 'no-blockchain',
    text:
      'Remember to visit market.decentraland.org - over there you can buy or sell LAND, wearables or unique names. Happy shopping!',
    offsetY: 6,
    triggeredByNext: () => {
      charlie.playAnimation('Goodbye', true, 2)
      charlie.endInteraction()
    },
    isEndOfDialog: true,
  },

  // --- YELLOW TEXT ---
  // Parcels
  {
    text:
      'All of Decentraland is made up of parcels of LAND. Each parcel is 16x16 meters (~17.5 yards)',
    offsetY: 18,
  },
  {
    text:
      'Some parcels of LAND are plazas or bits of road, those are owned by the Decentraland DAO.',
    offsetY: 18,
  },
  {
    text:
      'Together they make up all the public spaces of Decentraland and therefore cannot be traded on the market.',
    offsetY: 6,
  },
  {
    text: 'People buy and sell LAND in the Marketplace.',
    offsetY: 18,
    triggeredByNext: () => {
      charlie.playAnimation('Goodbye', true, 2)
      charlie.endInteraction()
    },
    isEndOfDialog: true,
  },

  // Estate
  {
    text:
      'If you have several adjacent parcels of LAND, you can form an Estate to group these together and trade them as a single token.',
    offsetY: 6,
    triggeredByNext: () => {
      charlie.playAnimation('Goodbye', true, 2)
      charlie.endInteraction()
    },
    isEndOfDialog: true,
  },

  // Wearable Rarity
  {
    text:
      'Not all wearables are created equal. We have a few categories available to help distinguish their rarity.',
    offsetY: 6,
  },
  {
    text:
      "If a wearable is 'Epic' then there are a maximum of 1000 of its kind in circulation.",
    offsetY: 18,
  },
  {
    text: "If a wearable is 'Legendary' then there are only 100 of its kind.",
    offsetY: 18,
  },
  {
    text:
      "If a wearable is 'Mythic' then there are just 10. If it is 'Unique' then...well you get the picture.",
    offsetY: 18,
  },
  {
    text: "'Rare', 'Common' and 'Uncommon' rarities are relatively abundant.",
    offsetY: 18,
    triggeredByNext: () => {
      charlie.playAnimation('Goodbye', true, 2)
      charlie.endInteraction()
    },
    isEndOfDialog: true,
  },
]

// --- Artichoke Dialog (Marsha) ---
export let MarshaDialog: Dialog[] = [
  {
    text:
      'Hey there! My name is Marsha and I’m here to have fun! Would you like to learn more about how to interact with other players?',
    offsetY: 24,
    isQuestion: true,
    buttons: [
      { label: 'YES', goToDialog: 'yes' },
      { label: 'NO', goToDialog: 'no' },
    ],
  },
  {
    name: 'no',
    text: "Okay, I'll be around if you get curious.",
    offsetY: 18,
    triggeredByNext: () => {
      marsha.playAnimation('Goodbye', true, 2)
      marsha.endInteraction()
    },
    isEndOfDialog: true,
  },
  {
    name: 'yes',
    text:
      'You can perform emotes, like dances, hand waves, etc. Other players will see you when you do them.',
    offsetY: 6,
  },
  {
    text:
      "To do so, just press the 'B' key to open up the menu before clicking on one of the emote icons.",
    offsetY: 18,
  },
  {
    text:
      'When you write into the chat box, what you send can be read by all players nearby.',
    offsetY: 18,
  },
  {
    text:
      'If you click on a player you can read their bio, see what wearables they own etc.',
    offsetY: 18,
  },
  {
    text:
      'If at any point you find someone that acts abusively, you can block them so that they can no longer bother you.',
    offsetY: 6,
  },
  {
    text:
      'To do so, simply click on them to open the menu, and select "block player".',
    offsetY: 18,
  },
  {
    text:
      "If you can't find anyone around, there's a 'crowd' teleport just north of the main building that takes you to wherever there's a group of people.",
    offsetY: 6,
  },
  {
    text:
      'You can also type "/goto crowd" into the chat window to take you there, no matter where you are.',
    offsetY: 6,
  },
  {
    text:
      "Well that's it from me, don't want to keep you here any longer. There are folks out there who are a lot more interesting to talk to. Enjoy!",
    offsetY: 6,
    triggeredByNext: () => {
      marsha.playAnimation('Goodbye', true, 2)
      marsha.endInteraction()
    },
    isEndOfDialog: true,
  },
]

//--- Whale Dialog (Bob) ---
export let BobDialog: Dialog[] = [
  {
    text:
      "G'day human! My name is Bob and I'm a robot. Would you like to learn more about the history of Decentraland and how it all started?",
    offsetY: 24,
    isQuestion: true,
    buttons: [
      { label: 'YES', goToDialog: 'yes' },
      { label: 'NO', goToDialog: 'no' },
    ],
  },
  {
    name: 'no',
    text: "Okay, I'll be around if you get curious.",
    offsetY: 18,
    triggeredByNext: () => {
      bob.playAnimation('Goodbye', true, 2)
      bob.endInteraction()
    },
    isEndOfDialog: true,
  },
  {
    name: 'yes',
    text:
      "Decentraland's unique proposal is to create a virtual world governed by its users.",
    offsetY: 18,
  },
  {
    text:
      "This little museum takes you through some of the milestones in Decentraland's history.",
    offsetY: 18,
  },
  {
    text:
      'Some key events in the history of the project were: the Terraform Event, which had the first LAND auction.',
    offsetY: 6,
  },
  {
    text:
      'In late 2018 a second auction was held. This was followed by the creation of Avatars and Wearables in 2019.',
    offsetY: 6,
  },
  {
    text:
      "And in 2020, the open source client and the DAO were released. So much has happened already, and we're just getting started...",
    offsetY: 6,
  },
  {
    text:
      "Take a look around. If you're interested in any of the items, click on them and I'll tell you the background story.",
    offsetY: 6,
    triggeredByNext: () => {
      bob.playAnimation('Goodbye', true, 2)
      bob.endInteraction()
    },
    isEndOfDialog: true,
  },

  // --- YELLOW TEXT ---
  // DAO
  {
    text:
      'A DAO is a Decentralized Autonomous Organization - the embodiment of decentralization.',
    offsetY: 6,
  },
  {
    text:
      "An entity that carries out its functions following pre-established rules that no person can alter. To put it another way, it's governance as code.",
    offsetY: 6,
  },
  {
    text:
      'Through a DAO, we can guarantee that what the community votes for is truly what gets done, and that nobody can stop that.',
    offsetY: 6,
    isEndOfDialog: true,
  },

  // Vision
  {
    text:
      'Decentraland really took shape in 2017 amongst an exciting wave of enthusiasm around blockchain technologies.',
    offsetY: 6,
  },
  {
    text:
      'The transparency and fairness that smart contracts might bring has the potential to transform the way we interact with the world.',
    offsetY: 6,
    isEndOfDialog: true,
  },

  // First Experiments
  {
    text:
      'The first few versions of Decentraland were not actually Ethereum-based!',
    offsetY: 18,
  },
  {
    text:
      'It actually started as a fork of Bitcoin back in 2015 before Ethereum was even launched.',
    offsetY: 18,
  },
  {
    text:
      'This map was the first little experiment with tokenized land as 2D pixels, each one is minted by miners.',
    offsetY: 6,
    triggeredByNext: () => {
      bob.playAnimation('Goodbye', true, 2)
      bob.endInteraction()
    },
    isEndOfDialog: true,
  },

  // First 3D Version
  {
    text:
      'The first 3D versions were based on hexagon-shaped land. Though quite limited, it was an exciting experiment already.',
    offsetY: 6,
    isEndOfDialog: true,
  },

  // Declaration
  {
    text:
      'A sign on this early 3D version spelled out a brave declaration of what we were setting off to build!',
    offsetY: 6,
    isEndOfDialog: true,
  },

  // Original Logo
  {
    text:
      'Our first logo was quite nice and unique - makes me feel nostalgic just looking at it...',
    offsetY: 18,
    isEndOfDialog: true,
  },

  // First avatars
  {
    text:
      "Slowly things started to get more concrete. These guys were the first fun lively avatars we had. Don't they look happy?",
    offsetY: 6,
    isEndOfDialog: true,
  },

  // First Avatar
  {
    text:
      "This guy was around in the early days. All he could do was float and move his head around - well if you ask me, that's plenty already.",
    offsetY: 6,
    isEndOfDialog: true,
  },

  // Fox Avatar
  {
    text:
      "Then came the fox and the robots. This dude looks so cool, doesn't he?",
    offsetY: 18,
  },
  {
    text:
      'At the time, they were designed for VR so the hands and head were meant to match VR controllers.',
    offsetY: 6,
    isEndOfDialog: true,
  },

  // Robot Avatar 1
  {
    text:
      "Floating made it simpler, as we didn't have to think about legs or walking animations - oh and I know all about that...",
    offsetY: 6,
    isEndOfDialog: true,
  },

  // Robot Avatar 2
  {
    text:
      "Look at this classy little fellow, now here's someone I can relate to! Well at least for me that is, you know?",
    offsetY: 6,
    isEndOfDialog: true,
  },

  // Avatar Male
  {
    text:
      "And that brings us to the latest in human-shaped avatars! Like the one you're sporting now.",
    offsetY: 18,
    isEndOfDialog: true,
  },

  // Avatar Female
  {
    text:
      'Fully animated, super customizeable, charismatic, and fun. A huge leap forward!',
    offsetY: 18,
  },
  {
    text:
      'Even though... you know, *cough* robots are *cough* the future. *cough* Sorry did you say something?',
    offsetY: 6,
    isEndOfDialog: true,
  },

  // First Auction
  {
    text:
      'And then came the LAND auctions! The definitive map of Genesis City was laid out before each parcel was minted.',
    offsetY: 6,
  },
  {
    text:
      'That marked the start of a virtual real-estate market that continues to flourish to this day.',
    offsetY: 18,
    isEndOfDialog: true,
  },

  // Second Auction
  {
    text:
      'Not all land was sold on the first auction, 9,300 parcels remained unclaimed.',
    offsetY: 18,
  },
  {
    text:
      'So in December 2018 came the second auction, where the community claimed the remaining ones.',
    offsetY: 6,
    isEndOfDialog: true,
  },

  // New Logo
  {
    text:
      'Decentraland needed a more modern look and with it a new logo. The design needed to look great even when viewed at a smaller scale.',
    offsetY: 6,
  },
  {
    text: 'So in early 2019 this beauty was created... looking sleek right?',
    offsetY: 18,
    isEndOfDialog: true,
  },

  // Landing
  {
    text:
      'At the time, the world was still in closed beta, so something attractive was needed for those that could not yet enter.',
    offsetY: 6,
  },
  {
    text:
      'A pretty slick landing site with a beautiful 3D intro was launched that made the promise of a 3D world more real.',
    offsetY: 6,
  },
  {
    text:
      "Come to think of it... this plaza we're on resembles that vision quite a lot - how cool is that?",
    offsetY: 6,
    isEndOfDialog: true,
  },

  // Builder
  {
    text:
      'With 90,000 parcels of LAND to fill, creating content needs to be fun and easy to enable mass adoption.',
    offsetY: 6,
  },
  {
    text:
      'So, on April 2018, the Builder was launched. A visual tool designed to make content creation simple.',
    offsetY: 6,
  },
  {
    text:
      'Head on over to builder.decentraland.org to get building right away! ',
    offsetY: 18,
    isEndOfDialog: true,
  },

  // Player Passport
  {
    text:
      "Another important milestone was creating player passports, which linked a player's identity to an ethereum wallet.",
    offsetY: 6,
    isEndOfDialog: true,
  },

  // Token Wearables
  {
    text:
      'With the addition of tokenized wearables, players were now able to customize their avatars a lot further.',
    offsetY: 6,
  },
  {
    text:
      'Beyond the collection of basic wearables, special ones became available that were more elaborate in design and also much rarer.',
    offsetY: 6,
  },
  {
    text:
      'A few of these were given out during the Halloween event and also in the Christmas event, as well as the official launch event.',
    offsetY: 6,
    isEndOfDialog: true,
  },

  // Parcel
  {
    text:
      'All of Decentraland is made up of parcels of LAND. Each parcel is 16x16meters (~17.5 yards)',
    offsetY: 18,
  },
  {
    text:
      'Most parcels are privately owned and the owner of the LAND can do anything they want with it. Create a game, a virtual store, anything they like.',
    offsetY: 6,
  },
  {
    text:
      'LAND parcels start empty until the owner or someone with permission from the owner uploads content onto it.',
    offsetY: 6,
    isEndOfDialog: true,
  },

  // Estate
  {
    text:
      'With several adjacent parcels of LAND, you can form an Estate to group these together and trade them as a single token.',
    offsetY: 6,
    isEndOfDialog: true,
  },

  // Roads
  {
    text:
      'Roads guarantee easy movement through the world even if people build towering structures in their privately-owned land.',
    offsetY: 6,
    isEndOfDialog: true,
  },

  // Plazas
  {
    text:
      "There are several plazas in Decentraland like the one we're in. Plazas are open to everyone and are owned by the Decentraland DAO.",
    offsetY: 6,
  },
  {
    text:
      'Each plaza has its own special theme so get out there and explore them!',
    offsetY: 18,
    isEndOfDialog: true,
  },

  // Districts
  {
    text:
      'Districts are special privately-owned parcels of LAND. They appear as violet colored boxes on the map.',
    offsetY: 6,
  },
  {
    text:
      'Districts are owned by groups of people, who during the early days got together around a common theme and proposal.',
    offsetY: 6,
  },
  {
    text: 'Many districts are thriving communities with a specific goal.',
    offsetY: 18,
    isEndOfDialog: true,
  },

  // Museum District
  {
    text:
      'The museum district is a great example of a District. This one focuses on providing artists a place to display their work.',
    offsetY: 6,
  },
  {
    text:
      'Amongst the other districts, you can find a university, a convention center, a vegas-themed area, a virtual shopping mall...',
    offsetY: 6,
  },
  {
    text:
      ".. an amusement park, a place for music festivals, a gamer's battleground and so much more!",
    offsetY: 6,
    isEndOfDialog: true,
  },

  // Builder Constest April 2019
  {
    text:
      'With the launch of the Builder back in April 2019, there was a contest for creating the best scenes using just the Builder.',
    offsetY: 6,
  },
  {
    text:
      'Even with the limitations of that first version, the community blew everyone away with their creativity!',
    offsetY: 6,
    isEndOfDialog: true,
  },

  // Builder Constest December 2019
  {
    text:
      'With the release of Smart items in December 2019 came another creator contest using the Builder.',
    offsetY: 6,
  },
  {
    text:
      'This time, people could add items that were interactive, enabling all sorts of fun game mechanics.',
    offsetY: 6,
  },
  {
    text:
      'Again, it was amazing to see what can be created with a library of simple building blocks.',
    offsetY: 18,
    isEndOfDialog: true,
  },

  // Mana
  {
    text:
      'MANA is a virtual currency that can be used to perform in-world transactions.',
    offsetY: 18,
  },
  {
    text:
      'Also, it can be used to trade LAND, wearables and unique names in the marketplace.',
    offsetY: 18,
  },
  {
    text: 'Furthermore, MANA tokens give you also voting powers on the DAO...',
    offsetY: 18,
  },
  {
    text:
      'the decision making smart contract that governs many of the policy aspects of Decentraland.',
    offsetY: 18,
    isEndOfDialog: true,
  },

  // Hackathon 2019
  {
    text:
      'Many great scenes were created by developers writing code. A few Game Jams took place with amazing results.',
    offsetY: 6,
    isEndOfDialog: true,
  },

  // Hackathon September 2019
  {
    text:
      'A huge number of really high-quality scenes were submitted at these competitions and there are many out there now.',
    offsetY: 6,
  },
  {
    text:
      'Some of which you can visit via one of the teleporters located on this plaza!',
    offsetY: 18,
    isEndOfDialog: true,
  },

  // Community Wearables
  {
    text:
      'At the start of 2020, the community held a contest to come up with designs for wearables.',
    offsetY: 18,
  },
  {
    text:
      'These were then crafted following specifications set out by the contestants.	',
    offsetY: 18,
  },
  {
    text:
      'Some really fun and imaginative ideas came out from that. You can see some of those wearables circling around in the marketplace.',
    offsetY: 6,
    isEndOfDialog: true,
  },
]
