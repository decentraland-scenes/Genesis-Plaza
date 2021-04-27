# Genesis-Plaza

_A few screenshots of Genesis Plaza._

![screenshots](https://github.com/decentraland-scenes/Genesis-Plaza/blob/master/screenshots/genesis-plaza-final.jpg)

## Description
The newly revamped [Genesis Plaza](https://play.decentraland.org/).

Read the behind the scenes from this scene in these blog posts:
- [Creating Genesis Plaza Part 1](https://decentraland.org/blog/tutorials/creating-genesis-plaza-part-1/)
- [Creating Genesis Plaza Part 2](https://decentraland.org/blog/tutorials/creator-genesis-plaza-part-2/)

This scene contains a lot of useful mechanics, including:
- Interacting with an NPC
- Fetching data from APIs
- Adding teleports to other scenes
- Adding external links outside Decentraland
- Syncing player actions with the messagebus
- Streaming audio
- Streaming video
- Displaying a custom UI

Because it can be hard to find specific things in such a large repository, some of the most interesting bits of the scene have been exported into their own example repos:

- [NPC Dialog](https://github.com/decentraland-scenes/npc-dialog-example-scene): A UI window presents texts from an NPC, allowing you to use the Right Click, E and F keys to advance the conversation or answer questions.
- [NFT](https://github.com/decentraland-scenes/Certified-criptokitty): Display a 2D NFT in a picture frame.
- [Events API](https://github.com/decentraland-scenes/Events-API): Query the Decentraland Events API for any events that are currently active to display their info. If more than one, flip through them on the display.
- [Piano Floor](https://github.com/decentraland-scenes/piano-floor-example-scene): Play the keys of this piano by stepping on them. All players will hear the notes that are played.
- [Zenquencer](https://github.com/decentraland-scenes/Zenquencer): Create musical patterns that are played in sequence. Players are synced through both the messagebus and a DB in a server.


## Try it out

**Install the CLI**

Download and install the Decentraland CLI by running the following command:

```bash
npm i -g decentraland
```

**Previewing the scene**

Download this example and navigate to its directory, then run:

```
$:  dcl start
```

Any dependencies are installed and then the CLI opens the scene in a new browser tab.

**Setting up the server**

The scene is set up to make use of the same server that's used by Genesis Plaza. To launch your own server, we recommend you deploy what's in the `/server` folder to your own Firebase account, following the steps in [this tutorial](https://decentraland.org/blog/tutorials/servers-part-2/). To store data on an Amazon S3 server, as done here, you'll also need to set up your own Amazon S3, and fetch credentials for that account to include in your server folder.

Learn more about how to build your own scenes in our [documentation](https://docs.decentraland.org/) site.

If something doesn’t work, please [file an issue](https://github.com/decentraland-scenes/Awesome-Repository/issues/new).



## Links
- [NPC Dialog](https://docs.google.com/spreadsheets/d/1cpD_T0jgLFA0zrU5izp5y60Q2nof2ok-Eof1mbTBfgE/edit?usp=sharing) 
- [NFT Data](https://docs.google.com/spreadsheets/d/157IMZB91LFsBRnEofxlBO0nqjDAWLITOFLWnA414Pck/edit?usp=sharing)
- [Teleporter Data](https://docs.google.com/spreadsheets/d/1Hhv_B8lq9hDAmONi9iqcBRZXN2TIoaNx6SKs71Cfqj8/edit?usp=sharing)

## Acknowledgements
- Thank you to [Polygonal Mind](https://www.polygonalmind.com/) for providing sample code of the NPC used in [Tomb Chaser](https://play.decentraland.org/?position=12,46) 
- _alice.mp3_ modified from https://freesound.org/people/mik300z/sounds/103525/
- _bela.mp3_ modified from https://freesound.org/people/AderuMoro/sounds/213282/
- _betty_.mp3_ modified from https://freesfx.co.uk/Category/Robots/83
- _bob.mp3_ modified from https://freesound.org/people/mik300z/sounds/103525/ 
- _charlie_.mp3_ modified from https://freesound.org/people/Satoration/sounds/57296/ 
- _marsha.mp3_ modified from https://freesound.org/people/urupin/sounds/199905/
- _ron.mp3_ modified from https://freesound.org/people/xtrgamr/sounds/257808/
- _beerPump.mp3_ modified from https://freesound.org/people/RG_Campus/sounds/392893/
- _error.mp3_ modified from https://freesound.org/people/distillerystudio/sounds/327736/
- _pickUp.mp3_ modified from https://freesound.org/people/drummerman/sounds/368130/
- _putDown.mp3_ modified from https://freesound.org/people/Nightflame/sounds/368614/
- _swallow.mp3_ modified from https://freesound.org/people/freakinbehemoth/sounds/243635/
- _micFeedback.mp3_ modified from https://freesound.org/people/chimerical/sounds/105980/

## Copyright info

This scene is protected with a standard Apache 2 licence. See the terms and conditions in the [LICENSE](/LICENSE) file.

