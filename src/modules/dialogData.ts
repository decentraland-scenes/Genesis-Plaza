class Dialog {
  text: string
  fontSize?: number
  positionY: number
  isQuestion?: boolean = false
  labelE?: {
    label: string
    fontSize?: number
    positionX?: number
    positionY?: number
  }
  ifPressE?: number
  labelF?: {
    label: string
    fontSize?: number
    positionX?: number
    positionY?: number
  }
  ifPressF?: number
  isEndOfDialog?: boolean = false
  portrait?: { path: string; positionX: number; positionY }
}

class Dialogs {
  dialogs: Dialog[]
}

// TODO: Code logic to set the positionY of all the dialog...(-4, 6, 18, 24)
export const robotDialog: Dialogs[] = [
  // --- Main Dialog (Alice) ---
  {
    dialogs: [
      {
        portrait: {
          path: "images/portraits/alice.png",
          positionX: -272,
          positionY: 5,
        },
        text:
          "Hi, welcome to Genesis Plaza! Would you like to learn more about this place?",
        positionY: 24,
        isQuestion: true,
        labelE: { label: "YES", fontSize: 14, positionX: 64, positionY: -19 },
        ifPressE: 2,
        labelF: { label: "NO", fontSize: 14, positionX: -56, positionY: -19 },
        ifPressF: 1,
      },
      {
        text: "Okay, I'll be around if you get curious!",
        positionY: 18,
        isEndOfDialog: true,
      },
      {
        text:
          "We’re currently in the center of the Genesis City map, the roads fan out in all directions from here.",
        positionY: 18,
      },
      {
        text:
          "Genesis Plaza is built and maintained by the Decentraland Foundation but is still in many ways a community project.",
        positionY: 6,
      },
      {
        text:
          "If you venture out into the world, you’ll see that the content is created by our growing community.",
        positionY: 6,
      },
      {
        text:
          "Do you want to explore the rest of Genesis Plaza or explore the rest of the world?",
        positionY: 24,
        isQuestion: true,
        labelE: {
          label: "PLAZA",
          fontSize: 11,
          positionX: 67,
          positionY: -17.5,
        },
        ifPressE: 6,
        labelF: {
          label: "WORLD",
          fontSize: 11,
          positionX: -50,
          positionY: -17.5,
        },
        ifPressF: 17,
      },
      {
        text: "Great! There’s a lot to see right here.",
        positionY: 18,
      },
      {
        text:
          "If you walk around you might run into my buddies and each is an expert on a different topic.",
        positionY: 18,
      },
      {
        text:
          "You can learn a lot from them about how Decentraland works and what makes it special.",
        positionY: 18,
      },
      {
        text:
          "I recommend you start at that boat-shaped building to the North!",
        positionY: 18,
      },
      {
        text: "Do you also want to learn about what's beyond Genesis Plaza?",
        positionY: 24,
        isQuestion: true,
        labelE: { label: "YES", fontSize: 14, positionX: 64, positionY: -19 },
        ifPressE: 11,
        labelF: { label: "NO", fontSize: 14, positionX: -56, positionY: -19 },
        ifPressF: 27,
      },
      {
        text: "There’s a big world to explore out there!",
        positionY: 18,
      },
      {
        text:
          "Around Genesis Plaza you'll find several teleports that can take you directly to special scenes marked as points of interest.",
        positionY: 6,
      },
      {
        text:
          "There's also the 'crowd' teleport, which takes you to the biggest gathering of people in Decentraland so you can meet up and hang out.",
        positionY: 6,
      },
      {
        text:
          "If you press the 'M' key, you’ll open the map. You'll see markers for points of interest that are worth visiting.",
        positionY: 6,
      },
      {
        text:
          "Or simply explore the virtual world by foot and plot your own adventure. Just keep in mind that there's a LOT of ground to cover.",
        positionY: 6,
      },
      {
        text: "So what are you waiting for? Go and explore the world!",
        positionY: 18,
        isEndOfDialog: true,
      },
      {
        text: "There’s a big world to explore out there!",
        positionY: 18,
      },
      {
        text:
          "Around Genesis Plaza you'll find several teleports that can take you directly to special scenes marked as points of interest.",
        positionY: 6,
      },
      {
        text:
          "There's also the 'crowd' teleport, which takes you to the biggest gathering of people in Decentraland so you can meet up and hang out.",
        positionY: 6,
      },
      {
        text:
          "If you press the 'M' key, you’ll open the map. You'll see markers for points of interest that are worth visiting.",
        positionY: 6,
      },
      {
        text:
          "Or simply explore the virtual world by foot and plot your own adventure. Just keep in mind that there's a LOT of ground to cover.",
        positionY: 6,
      },
      {
        text: "Do you also want to find out what's here in Genesis Plaza?",
        positionY: 24,
        isQuestion: true,
        labelE: { label: "YES", fontSize: 14, positionX: 64, positionY: -19 },
        ifPressE: 23,
        labelF: { label: "NO", fontSize: 14, positionX: -56, positionY: -19 },
        ifPressF: 27,
      },
      {
        text: "Great! There’s a lot to see right here.",
        positionY: 18,
      },
      {
        text:
          "If you walk around you might run into my buddies and each is an expert on a different topic.",
        positionY: 18,
      },
      {
        text:
          "You can learn a lot from them about how Decentraland works and what makes it special.",
        positionY: 18,
      },
      {
        text:
          "I recommend you start at that boat-shaped building to the North!",
        positionY: 18,
      },
      {
        text:
          "Well that's it from me. So what are you waiting for? Go and explore the world!",
        positionY: 18,
        isEndOfDialog: true,
      },
    ],
  },

  // --- Shell Dialog (Ron) ---
  {
    dialogs: [
      {
        portrait: {
          path: "images/portraits/ron.png",
          positionX: -272,
          positionY: 10,
        },
        text:
          "Hi, I’m a tailor – a crafter of wearable items. Would you like to learn more about wearables?",
        positionY: 24,
        isQuestion: true,
        labelE: { label: "YES", fontSize: 14, positionX: 64, positionY: -19 },
        ifPressE: 2,
        labelF: { label: "NO", fontSize: 14, positionX: -56, positionY: -19 },
        ifPressF: 1,
      },
      {
        text: "Okay, I'll be around if you get curious.",
        positionY: 18,
        isEndOfDialog: true,
      },
      {
        text:
          "As you've probably already found out - you can customize your avatar and choose what items to wear.",
        positionY: 6,
      },
      {
        text:
          "You may have also noticed that other players have fancy outfits that you can’t find in your item menu.",
        positionY: 6,
      },
      {
        text: "That’s because certain wearables must be bought or earned.",
        positionY: 18,
      },
      {
        text: "Do you want to know how wearables relate to the blockchain?",
        positionY: 24,
        isQuestion: true,
        labelE: { label: "YES", fontSize: 14, positionX: 64, positionY: -19 },
        ifPressE: 6,
        labelF: { label: "NO", fontSize: 14, positionX: -56, positionY: -19 },
        ifPressF: 7,
      },
      {
        text:
          "Wearables are traded on the blockchain as non-fungible tokens (NFTs). This makes each item unique, with a traceable and unique history.",
        positionY: 6,
      },
      {
        text:
          "If you go north to the boat-shaped building, I have a friend there who knows a lot about this stuff.",
        positionY: 6,
      },
      {
        text:
          "Except for the default set of wearables you get when you start out, each wearable model has a limited supply.",
        positionY: 6,
      },
      {
        text:
          "Some are rarer than others. The rarest ones can get to be super valuable.",
        positionY: 18,
      },
      {
        text:
          "You can buy and sell wearables in the Decentraland Marketplace. To learn more about this topic, head to the Trade Center building.",
        positionY: 6,
      },
      {
        text:
          "Before you go though, there are several wearables on display here. Take a look around!",
        positionY: 18,
      },
      {
        text:
          "The wearables here are linked to the Marketplace so if you see anything you like, you can buy it from the community member who owns it.",
        positionY: 6,
      },
      {
        text:
          "I hope you found this information useful and have fun expressing yourself with your new wearables!",
        positionY: 6,
        isEndOfDialog: true,
      },
    ],
  },

  // --- Agora Dialog (Bela) ---
  {
    dialogs: [
      {
        text:
          "Hey, would you like to learn more about how the community shapes Decentraland?",
        positionY: 24,
        isQuestion: true,
        labelE: { label: "YES", fontSize: 14, positionX: 64, positionY: -19 },
        ifPressE: 2,
        labelF: { label: "NO", fontSize: 14, positionX: -56, positionY: -19 },
        ifPressF: 1,
        portrait: {
          path: "images/portraits/bela.png",
          positionX: -264,
          positionY: -10,
        },
      },
      {
        text: "Okay, I'll be around if you get curious.",
        positionY: 18,
        isEndOfDialog: true,
      },
      {
        text:
          "Decentraland is designed to be run 100% by the community. In the future, all governance decisions will be taken by us.",
        positionY: 6,
      },
      {
        text:
          "The foundation that started Decentraland has had this goal from the very beginning.",
        positionY: 18,
      },
      {
        text:
          "As things start to take flight, they'll be relinquishing more control to the community.",
        positionY: 18,
      },
      {
        text:
          "There's already been several petitions that have been voted on. Anyone with MANA or LAND can vote and determine the future of Decentraland.",
        positionY: 6,
      },
      {
        text:
          "For example, the community decided through a vote that each land parcel should measure 16x16 meters instead of the original 10x10 meters.",
        positionY: 6,
      },
      {
        text:
          "There will gradually be more and more ways in which you can pitch in to help shape the direction of the virtual world.",
        positionY: 6,
      },
      {
        text:
          "You've joined us at a really exciting time, when we can own and shape the virtual spaces where we hang out.",
        positionY: 6,
      },
      {
        text: "I hope you found this information interesting!",
        positionY: 18,
        isEndOfDialog: true,
      },
    ],
  },

  // --- Garden Text (Betty) ---
  {
    dialogs: [
      {
        text:
          "Hi, I’m a content creator! Would you like to learn about how content in Decentraland is made?",
        positionY: 24,
        isQuestion: true,
        labelE: { label: "YES", fontSize: 14, positionX: 64, positionY: -19 },
        ifPressE: 2,
        labelF: { label: "NO", fontSize: 14, positionX: -56, positionY: -19 },
        ifPressF: 1,
        portrait: {
          path: "images/portraits/betty.png",
          positionX: -264,
          positionY: 15,
        },
      },
      {
        text: "Okay, I'll be around if you get curious.",
        positionY: 18,
        isEndOfDialog: true,
      },
      {
        text:
          "Decentraland is made up of scenes and each scene is its own self-contained world that sits next to other scenes.",
        positionY: 6,
      },
      {
        text:
          "A scene can take up a single LAND parcel or as many parcels as you want. Each LAND parcel measures 16x16 meters.",
        positionY: 6,
      },
      {
        text:
          "With the exception of public spaces like plazas and roads, everything you see is created by members of the community like yourself.",
        positionY: 6,
      },
      {
        text:
          "There are two different tools that can be used to build. First there's The Builder - an easy drag and drop tool.",
        positionY: 6,
      },
      {
        text:
          "Then there's the SDK (Software Development Kit), which is a more powerful coding tool for developers.",
        positionY: 6,
      },
      {
        text: "Which one do you want to learn about first?",
        positionY: 24,
        isQuestion: true,
        labelE: {
          label: "BUILDER",
          fontSize: 10,
          positionX: 70,
          positionY: -17,
        },
        ifPressE: 8,
        labelF: { label: "SDK", fontSize: 14, positionX: -56, positionY: -19 },
        ifPressF: 21,
      },
      {
        text:
          "The Builder is a lot of fun! You can drag and drop pre-made 3D items of a variety of themes into your scene.",
        positionY: 6,
      },
      {
        text:
          "Some items come with built-in behaviors. You can use these as building-blocks to make up a whole game.",
        positionY: 6,
      },
      {
        text:
          "If you’re a 3D artist, or want to import 3D content, you have the ability to import your own.",
        positionY: 18,
      },
      {
        text:
          "Do you want to also learn about the SDK (Software Development Kit)?",
        positionY: 24,
        isQuestion: true,
        labelE: { label: "YES", fontSize: 14, positionX: 64, positionY: -19 },
        ifPressE: 12,
        labelF: { label: "NO", fontSize: 14, positionX: -56, positionY: -19 },
        ifPressF: 32,
      },
      {
        text:
          "The SDK is a very powerful tool that gives you a lot of freedom by writing your scenes in code.",
        positionY: 18,
      },
      {
        text:
          "It is based on TypeScript, a language that’s very similar to JavaScript but more reliable.",
        positionY: 18,
      },
      {
        text:
          "There are several great examples out in the world of scenes written with the SDK.",
        positionY: 18,
      },
      {
        text:
          "Many of the teleports around this plaza take you to such scenes.",
        positionY: 18,
      },
      {
        text:
          "You can also use the SDK to create your own smart items with built-in logic.",
        positionY: 18,
      },
      {
        text:
          "These can then be easily used in the Builder by dragging and dropping them.",
        positionY: 18,
      },
      {
        text:
          "You can also start a scene using the Builder. Lay out the parts before exporting them to add specific functionality with code, using the SDK.",
        positionY: 6,
      },
      {
        text:
          "Remember you can always visit docs.decentraland.org for a more in-depth guide on building scenes",
        positionY: 6,
      },
      {
        text:
          "Hope that gets you excited about creating and sharing great things. Can't wait to see what you come up with!",
        positionY: 6,
        isEndOfDialog: true,
      },
      {
        text:
          "The SDK is a very powerful tool that gives you a lot of freedom by writing your scenes in code.",
        positionY: 18,
      },
      {
        text:
          "It is based on TypeScript, a language that’s very similar to JavaScript but more reliable.",
        positionY: 18,
      },
      {
        text:
          "There are several great examples out in the world of scenes written with the SDK.",
        positionY: 18,
      },
      {
        text:
          "Many of the teleports around this plaza take you to such scenes.",
        positionY: 18,
      },
      {
        text:
          "You can also use the SDK to create your own smart items with built-in logic.",
        positionY: 18,
      },
      {
        text:
          "These can then be easily used in the Builder by dragging and dropping them.",
        positionY: 18,
      },
      {
        text:
          "You can also start a scene using the Builder. Lay out the parts before exporting them to add specific functionality with code, using the SDK.",
        positionY: 6,
      },
      {
        text:
          "Do you also want to learn about the Builder, our visual editor tool?",
        positionY: 24,
        isQuestion: true,
        labelE: { label: "YES", fontSize: 14, positionX: 64, positionY: -19 },
        ifPressE: 29,
        labelF: { label: "NO", fontSize: 14, positionX: -56, positionY: -19 },
        ifPressF: 32,
      },
      {
        text:
          "The Builder is a lot of fun! You can drag and drop pre-made 3D items of a variety of themes into your scene.",
        positionY: 6,
      },
      {
        text:
          "Some items come with built-in behaviors. You can use these as building-blocks to make up a whole game.",
        positionY: 6,
      },
      {
        text:
          "If you’re a 3D artist, or want to import 3D content, you have the ability to import your own.",
        positionY: 18,
      },
      {
        text:
          "Remember you can always visit docs.decentraland.org for a more in-depth guide on building scenes",
        positionY: 6,
      },
      {
        text:
          "Hope that gets you excited about creating and sharing great things. Can't wait to see what you come up with!",
        positionY: 6,
        isEndOfDialog: true,
      },
    ],
  },

  // --- Trade Dialog (Charlie) ---
  {
    dialogs: [
      {
        text:
          "Hi, I’m a trader. Would you like to learn more about the Decentraland Marketplace?",
        positionY: 24,
        isQuestion: true,
        labelE: { label: "YES", fontSize: 14, positionX: 64, positionY: -19 },
        ifPressE: 2,
        labelF: { label: "NO", fontSize: 14, positionX: -56, positionY: -19 },
        ifPressF: 1,
        portrait: {
          path: "images/portraits/charlie.png",
          positionX: -292,
          positionY: -10,
        },
      },
      {
        text: "Okay, I'll be around if you get curious.",
        positionY: 18,
        isEndOfDialog: true,
      },
      {
        text:
          "This is the Metaverse Trade Center. Here you can see live stats from the Decentraland Marketplace.",
        positionY: 6,
      },
      {
        text:
          "There’s a thriving economy behind Decentraland and every day people buy and sell unique items.",
        positionY: 18,
      },
      {
        text: "Items like LAND parcels, wearable items and reserved names.",
        positionY: 18,
      },
      {
        text:
          "This living sculpture behind me is a dynamic representation of the Marketplace.",
        positionY: 18,
      },
      {
        text:
          "As more trading happens on the platform, it grows and moves faster.",
        positionY: 18,
      },
      {
        text:
          "You can explore this building to find real-time stats about what goes on in the Marketplace.",
        positionY: 18,
      },
      {
        text:
          "Do you want to know more about how the Marketplace uses the blockchain?",
        positionY: 24,
        isQuestion: true,
        labelE: { label: "YES", fontSize: 14, positionX: 64, positionY: -19 },
        ifPressE: 9,
        labelF: { label: "NO", fontSize: 14, positionX: -56, positionY: -19 },
        ifPressF: 13,
      },
      {
        text:
          "All sales, bids and other operations are transactions on the blockchain.",
        positionY: 18,
      },
      {
        text:
          "Like all transactions, they require a small gas fee that is paid to the network of miners.",
        positionY: 18,
      },
      {
        text:
          "The Marketplace charges a small fee over all transactions. This fee doesn't go into anyone's pocket. Instead it gets burned.",
        positionY: 6,
      },
      {
        text:
          "'Burning' reduces the amount of MANA in circulation; the remaining MANA becomes more valuable, which benefits the wider community of MANA holders.",
        positionY: -4,
      },
      {
        text:
          "Remember to visit market.decentraland.org - over there you can buy or sell LAND, wearables or unique names. Happy shopping!",
        positionY: 6,
        isEndOfDialog: true,
      },
    ],
  },

  // --- Artichoke Dialog (Marsha) ---
  {
    dialogs: [
      {
        text:
          "Hi, I’m here to have fun! Would you like to learn more about how to interact with other players?",
        positionY: 24,
        isQuestion: true,
        labelE: { label: "YES", fontSize: 14, positionX: 64, positionY: -19 },
        ifPressE: 2,
        labelF: { label: "NO", fontSize: 14, positionX: -56, positionY: -19 },
        ifPressF: 1,
        portrait: {
          path: "images/portraits/marsha.png",
          positionX: -264,
          positionY: -10,
        },
      },
      {
        text: "Okay, I'll be around if you get curious.",
        positionY: 18,
        isEndOfDialog: true,
      },
      {
        text:
          "You can perform emotes, like dances, hand waves, etc. Other players will see you when you do them.",
        positionY: 6,
      },
      {
        text:
          "To do so, just press the 'B' key to open up the menu before clicking on one of the emote icons.",
        positionY: 18,
      },
      {
        text:
          "When you write into the chat box, what you send can be read by all players nearby. ",
        positionY: 18,
      },
      {
        text:
          "You can also add people to your friends list and then message them privately.",
        positionY: 18,
      },
      {
        text:
          "If you click on a player you can read their bio, see what wearables they own etc.",
        positionY: 18,
      },
      {
        text:
          "If at any point you find someone that acts abusively, you can block them so that they can no longer bother you.",
        positionY: 6,
      },
      {
        text:
          'To do so, simply click on them to open the menu, and select "block player".',
        positionY: 18,
      },
      {
        text:
          "If you can't find anyone around, there's a 'crowd' teleport just north of the main building that takes you to wherever there's a group of people.",
        positionY: 6,
      },
      {
        text:
          'You can also type "/goto crowd" into the chat window to take you there, no matter where you are.',
        positionY: 6,
      },
      {
        text:
          "Well that's it from me, don't want to keep you here any longer. There are folks out there who are a lot more interesting to talk to. Enjoy!",
        positionY: 6,
        isEndOfDialog: true,
      },
    ],
  },

  // --- Whale Dialog (Bob) ---
  {
    dialogs: [
      {
        text:
          "Hi, I'm a blockchain specialist. Would you like to learn more about how Decentraland started?",
        positionY: 24,
        isQuestion: true,
        labelE: { label: "YES", fontSize: 14, positionX: 64, positionY: -19 },
        ifPressE: 2,
        labelF: { label: "NO", fontSize: 14, positionX: -56, positionY: -19 },
        ifPressF: 1,
        portrait: {
          path: "images/portraits/bob.png",
          positionX: -276,
          positionY: 30,
        },
      },
      {
        text: "Okay, I'll be around if you get curious.",
        positionY: 18,
        isEndOfDialog: true,
      },
      {
        text:
          "Decentraland's unique proposal is to create a virtual world governed by its users.",
        positionY: 18,
      },
      {
        text:
          "This little museum takes you through some of the milestones in Decentraland's history.",
        positionY: 18,
      },
      {
        text:
          "Some key events in the history of the project were: the Terraform Event, which had the first LAND sale.",
        positionY: 6,
      },
      {
        text:
          "The second auction in late 2018; the creation of Avatars and Wearables in 2019; the release of the open source client and the DAO in 2020.",
        positionY: 6,
      },
      {
        text: "So much has happened already, and we're just getting started...",
        positionY: 18,
      },
      {
        text:
          "Take a look around. If you're interested in any of the items, click on them and I'll tell you the background story.",
        positionY: 6,
        isEndOfDialog: true,
      },
    ],
  },
]
