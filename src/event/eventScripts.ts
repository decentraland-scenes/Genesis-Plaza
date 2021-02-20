import {
  checkTime,
  showPlaying,
  showPlayingFalse,
} from './showPlaying'

// import {
//   dotLightsControl,
//   laserControl,
//   spiralControl,
//   windowControl,
//   smokeControl,
// } from './effectDashboard'
import { PredefinedEmote, triggerEmote } from '@decentraland/RestrictedActions'
import { dj, lights1, lights2 } from './syncableItems'
import {
  balloonControl,
  cakeControl,
  cakeUp,
  confettiControl,
  launchSequence,
  setCakeReady,
  teleportControl
} from './birthday/launch'


export let inShowArea: boolean = false

export let djUp: boolean = false
export let portalUp: boolean = false

export function setInShowArea(state: boolean) {
  inShowArea = state
}

export enum Action {
  STOPALL = 'stopall',
  INTRO = 'intro',
  SEMIHARD = 'semihard',
  HARD = 'hard',
  NORMAL = 'normal',
  NORMAL2 = 'normal2',
  CHILL = 'chill',

  PREEPIC = 'preepic',
  PREEPIC2 = 'preepic2',
  PREEPIC3 = 'preepic3',
  PREEPIC4 = 'preepic4',
  EPIC1 = 'epic1',
  EPIC2 = 'epic2',

  PUNCHI = 'punchi',
  PUNCHI_02 = 'punchi_02',

  // singles ///////////////

  // cake
  CAKE = 'cake',

  // sparlers
  SPARKLERSTOP = 'sparklerstop',
  SPARKLERSMID = 'sparklersmid',
  SPARKLERSLOW = 'sparklerslow',
  SPARKLERSALL = 'sparklersall',
  SPARKLERSOFF = 'sparklersoff',

  // confetti
  CONFETTISHORT = 'confettishort',
  CONFETTIMID = 'confettimid',
  CONFETTILONG = 'confettilong',

  // balloons
  BALLOONSSHORT = 'balloonsshort',
  BALLOONSMID = 'balloonsmid',
  BALLOONSLONG = 'balloonslong',

  // lights

  LIGHTS1 = 'lights1',
  LIGHTS2 = 'lights2',
  LIGHTS3 = 'lights3',
  LIGHTSGO = 'lightsgo',

  LIGHTSBOTTOM1 = 'lightsbottom1',
  LIGHTSBOTTOM2 = 'lightsbottom2',
  LIGHTSBOTTOM3 = 'lightsbottom3',
  LIGHTSBOTTOMGO = 'lightsbottomgo',

  // video
  VIDEOPLAY = 'videoplay',
  VIDEOSTOP = 'videostop',

  // player emotes
  PLAYERWAVE = 'playerwave',
  PLAYERJUMP = 'playerjump',
  PLAYERDANCE = 'playerdance',
  PLAYERHAND = 'playerhand',
  PLAYERCLAP = 'playerclap',
  PLAYERMONEY = 'playermoney',
  PLAYERKISS = 'playerkiss',

  PLAYERTIK = 'playertik',
  PLAYERTEKTO = 'playertekto',
  PLAYERHAMMER = 'playerhammer',

  //   BUBLES = 'bubles',
  //   VIDEOBUBLES = 'videobubles',
  //   FEWVIDOEBUBBLES = 'fewvideobubbles',
  //   BUBLESOFF = 'bublesoff',
  //   VIDEOBUBLESOFF = 'videobublesoff',

  RACAPPEAR = 'racappear',
  RACGO = 'racgo',
  RACBOUNCE = 'racbounce',
  RACWAVE = 'racchill',
  RACCLAP = 'racclap',
  RACEPIC = 'racepic',
  RACHANDUP = 'rachorns',
  RACMIXING = 'racmixing',
  RACPLAY = 'racplay',

  TELEPORT = 'teleport',
  //   RACDECONSTRUCTED = 'racdeconstructed',
  //   RACDECONSTRUCT = 'racdeconstruct',
  //   RACRECONSTRUCT = 'racreconstruct',
  //   RACBURST = 'racburst',
  //   RACGRAVITY = 'racgrav',
  //   RACGTEASER = 'racrgteaser',

  //   TELEPORTS = 'teleports',
}

export function runAction(action: Action) {
  switch (action) {
    case Action.STOPALL:
      //   Pyrotechnics.hide()
      //   lights_center_stage.hide()
      //   lights_side_stage.hide()
      //   flame.hide()
      //   runAction(Action.SPEAKERSOFF)
      //   runAction(Action.ELECTRICOFF)
      //   runAction(Action.TRIANGLESOFF)
      //   runAction(Action.FLARESOFF)
      //   runAction(Action.FLOWEROFF)
      //   stopLiftBubbles(bubbleLiftSystem)
      //   FireConcertStage.hide()
      //   bubbleScreenController.stopRandomBubbles()
      //   bubbleScreenController.stopSpeakerBubbles()
      //   deck1.hide()
      //   deck2.hide()

      break

    case Action.INTRO:
      //   runAction(Action.CENTERLIGHTS1)
      //   runAction(Action.SIDELIGHTS2)
      //   runAction(Action.SPEAKERS1)
      //   runAction(Action.FLAMES3)
      break

    case Action.SEMIHARD:
      //   runAction(Action.CENTERLIGHTS3)
      //   runAction(Action.SIDELIGHTS1)
      //   runAction(Action.SPEAKERS1)
      //   runAction(Action.ELECTRIC1)
      //   runAction(Action.TRIANGLES3)
      //   runAction(Action.FLARES2)
      //   runAction(Action.FLOWEROFF)

      break

    case Action.HARD:
      //   runAction(Action.CENTERLIGHTS2)
      //   runAction(Action.SIDELIGHTS3)
      //   runAction(Action.SPEAKERS2)
      //   runAction(Action.FLAMES1)
      //   runAction(Action.ELECTRIC2)
      //   runAction(Action.TRIANGLES3)
      //   runAction(Action.FLARES2)
      //   runAction(Action.FLOWEROFF)

      break

    case Action.NORMAL:
      //   runAction(Action.CENTERLIGHTS1)
      //   runAction(Action.SIDELIGHTS1)
      //   runAction(Action.SPEAKERS1)
      //   runAction(Action.ELECTRICOFF)
      //   runAction(Action.TRIANGLES2)
      //   runAction(Action.FLARESOFF)
      //   runAction(Action.FLOWER1)

      break

    case Action.NORMAL2:
      //   runAction(Action.CENTERLIGHTS3)
      //   runAction(Action.SIDELIGHTS2)
      //   runAction(Action.SPEAKERS1)
      //   runAction(Action.ELECTRICOFF)
      //   runAction(Action.TRIANGLES2)
      //   runAction(Action.FLARESOFF)
      //   runAction(Action.FLOWER1)

      break

    case Action.CHILL:
      //   runAction(Action.CENTERLIGHTS3)
      //   runAction(Action.SIDELIGHTS2)
      //   runAction(Action.SPEAKERSOFF)
      //   runAction(Action.ELECTRICOFF)
      //   runAction(Action.TRIANGLES1)
      //   runAction(Action.FLARES1)
      //   runAction(Action.FLOWER1)
      break

    /// SINGLE ACTIONS

    case Action.CAKE:
      if (cakeUp) return

      if (inShowArea) {
        launchSequence()
      } else {
        setCakeReady()
      }
      break

    case Action.SPARKLERSTOP:
      cakeControl.stopAllSparklers()
      cakeControl.startTopSparklers()

      break

    case Action.SPARKLERSMID:
      cakeControl.stopAllSparklers()
      cakeControl.startMidSparklers()
      break

    case Action.SPARKLERSLOW:
      cakeControl.stopAllSparklers()
      cakeControl.startLowSparklers()
      break

    case Action.SPARKLERSALL:
      cakeControl.startAllSparklers()
      break

    case Action.SPARKLERSOFF:
      cakeControl.stopAllSparklers()
      break

    case Action.CONFETTISHORT:
      confettiControl.startConfetti(5)
      break

    case Action.CONFETTIMID:
      confettiControl.startConfetti(20)
      break

    case Action.CONFETTILONG:
      confettiControl.startConfetti(40)
      break

    case Action.BALLOONSSHORT:
      balloonControl.startBalloons(5)
      break

    case Action.BALLOONSMID:
      balloonControl.startBalloons(20)
      break

    case Action.BALLOONSLONG:
      balloonControl.startBalloons(40)
      break

    case Action.TELEPORT:
      if (!cakeUp) return
      cakeControl.removeCake()
      balloonControl.startBalloons(5)
      confettiControl.startConfetti(6)
      dj.hide()
      teleportControl.showTeleport()
      //engine.addEntity(portalEntrance)

      djUp = false
      portalUp = true

      // hide cake & add teleport

      break

    case Action.LIGHTSGO:
      lights1.hide()

      break

    case Action.LIGHTS1:
      lights1.playAnimation('Action_01', false)

      break

    case Action.LIGHTS2:
      lights1.playAnimation('Action_02', false)

      break

    case Action.LIGHTS3:
      lights1.playAnimation('Action_03.001', false)

      break

    case Action.LIGHTSBOTTOMGO:
      lights2.hide()

      break

    case Action.LIGHTSBOTTOM1:
      lights2.playAnimation('Lights_Bottom_Action_01', false)

      break

    case Action.LIGHTSBOTTOM2:
      lights2.playAnimation('Lights_Bottom_Action_02', false)

      break

    case Action.LIGHTSBOTTOM3:
      lights2.playAnimation('Lights_Bottom_Action_03.001', false)

      break

    // case Action.SMOKE:
    //   smokeControl.startSmoke()
    //   break
    // case Action.SMOKESTOP:
    //   smokeControl.stopSmoke()
    //   break
    // // glass
    // case Action.GLASSBREAK:
    //   windowControl.shatterGlasses()
    //   break
    // case Action.GLASSBREAKRANDOM:
    //   let window = Math.floor(Math.random() * 12)
    //   windowControl.shatterGlass(window)
    //   break
    // // dots
    // case Action.DOTSSHOW:
    //   dotLightsControl.show()
    //   break
    // case Action.DOTSHIDE:
    //   dotLightsControl.hide()
    //   break
    // case Action.DOTSPULSE:
    //   dotLightsControl.show()
    //   dotLightsControl.activatePulse()
    //   break
    // case Action.DOTSSTOPPULSE:
    //   dotLightsControl.show()
    //   dotLightsControl.deactivatePulse()
    //   break
    // // laser
    // case Action.LASERSHOW:
    //   laserControl.show()
    //   break
    // case Action.LASERHIDE:
    //   laserControl.hide()
    //   break
    // case Action.LASERROT:
    //   laserControl.show()
    //   laserControl.rotate(true)

    //   break
    // case Action.LASERROTOFF:
    //   laserControl.show()
    //   laserControl.rotate(false)

    //   break
    // case Action.LASERROTFAST:
    //   laserControl.show()
    //   laserControl.changeRotationSpeedBy(10)
    //   break
    // case Action.LASERROTSLOW:
    //   laserControl.show()
    //   laserControl.changeRotationSpeedBy(-10)
    //   break
    // case Action.LASERPULSE:
    //   laserControl.show()
    //   laserControl.activateFanPulse(true)
    //   break
    // case Action.LASERPULSEOFF:
    //   laserControl.show()
    //   laserControl.activateFanPulse(false)
    //   break
    // // spiral
    // case Action.SPIRALSHOW:
    //   spiralControl.showAll()
    //   break
    // case Action.SPIRALHIDE:
    //   spiralControl.hideAll()
    //   break
    // case Action.SPIRAL1SHOW:
    //   spiralControl.showFirst()
    //   spiralControl.hideSecond()
    //   break
    // case Action.SPIRAL1HIDE:
    //   spiralControl.hideFirst()
    //   break
    // case Action.SPIRAL2SHOW:
    //   spiralControl.showSecond()
    //   spiralControl.hideFirst()
    //   break
    // case Action.SPIRAL2HIDE:
    //   spiralControl.hideSecond()
    //   break

    // player emotes
    case Action.PLAYERWAVE:
      if (inShowArea) {
        triggerEmote({ predefined: PredefinedEmote.WAVE })
      }

      break
    case Action.PLAYERJUMP:
      if (inShowArea) {
        triggerEmote({ predefined: PredefinedEmote.FIST_PUMP })
      }

      break
    case Action.PLAYERDANCE:
      if (inShowArea) {
        triggerEmote({ predefined: PredefinedEmote.ROBOT })
      }

      break
    case Action.PLAYERHAND:
      if (inShowArea) {
        triggerEmote({ predefined: PredefinedEmote.RAISE_HAND })
      }

      break
    case Action.PLAYERCLAP:
      if (inShowArea) {
        triggerEmote({ predefined: PredefinedEmote.CLAP })
      }

      break
    case Action.PLAYERMONEY:
      if (inShowArea) {
        triggerEmote({ predefined: PredefinedEmote.MONEY })
      }

      break
    case Action.PLAYERKISS:
      if (inShowArea) {
        triggerEmote({ predefined: PredefinedEmote.KISS })
      }

      break

    case Action.PLAYERTIK:
      if (inShowArea) {
        triggerEmote({ predefined: 'tik' })
      }

      break

    case Action.PLAYERTEKTO:
      if (inShowArea) {
        triggerEmote({ predefined: 'tektonik' })
      }

      break

    case Action.PLAYERHAMMER:
      if (inShowArea) {
        triggerEmote({ predefined: 'hammer' })
      }

      break

    //vide
    case Action.VIDEOPLAY:
      break

    case Action.VIDEOSTOP:
      break

    // case Action.SPEAKERS1:
    //   speakers.appear()
    //   speakers.playAnimation('Speaker_01')
    //   break
    // case Action.SPEAKERS1:
    //   speakers.appear()
    //   speakers.playAnimation('Speaker_02')
    //   break
    // case Action.SPEAKERSOFF:
    //   speakers.hide()
    //   break

    case Action.RACBOUNCE:
      if (inShowArea) {
        dj.playAnimation('Bounce', true, 2.37)
      }

      break
    case Action.RACWAVE:
      if (inShowArea) {
        dj.playAnimation('WaveArms', true, 6.7)
      }

      break
    case Action.RACCLAP:
      if (inShowArea) {
        dj.playAnimation('Clap', true, 2.87)
      }

      break
    case Action.RACEPIC:
      if (inShowArea) {
        dj.playAnimation('EpicMoment', true, 5.03)
      }

      break
    case Action.RACHANDUP:
      if (inShowArea) {
        dj.playAnimation('HandUp', true, 4)
      }

      break
    case Action.RACMIXING:
      if (inShowArea) {
        dj.playAnimation('Mixing', true, 8.7)
      }

      break
    case Action.RACPLAY:
      if (inShowArea) {
        dj.playAnimation('PushButton.001', true, 1.03)
      }

      break

    // case Action.RACDECONSTRUCT:
    //   dj.playAnimation('deconstruct', true, 1.13)
    //   dj2.playAnimation('deconstruct', true, 1.13)
    //   dj.setNewIdleAnim('burst')
    //   dj2.setNewIdleAnim('burst')
    //   break
    // case Action.RACRECONSTRUCT:
    //   dj.playAnimation('reconstruct', true, 1)
    //   dj2.playAnimation('reconstruct', true, 1)
    //   dj.setNewIdleAnim('idle')
    //   dj2.setNewIdleAnim('idle')
    //   deck1.appear()
    //   deck2.appear()
    //   break
    // case Action.RACBURST:
    //   dj.playAnimation('burst', true, 1)
    //   dj2.playAnimation('burst', true, 1)
    //   break
    // case Action.RACGRAVITY:
    //   dj.playAnimation('gravity', true, 2)
    //   dj2.playAnimation('gravity', true, 2)
    //   break
    // case Action.RACGTEASER:
    //   dj.playAnimation('gravity_teaser', true, 1)
    //   dj2.playAnimation('gravity_teaser', true, 1)
    //   break

    // case Action.RACDECONSTRUCTED:
    //   dj.appear()
    //   dj2.appear()
    //   dj.playAnimation('burst')
    //   dj2.playAnimation('burst')
    //   dj.setNewIdleAnim('burst')
    //   dj2.setNewIdleAnim('burst')
    //   break

    case Action.RACAPPEAR:
      if (!cakeUp) {
        runAction(Action.CAKE)
      }
      cakeControl.removeCandle()
      cakeControl.raiseDJPlatform()
      dj.appear()

      djUp = true

      break
    case Action.RACGO:
      dj.hide()

      djUp = false

      break

    // case Action.BUBLES:
    //   startLiftBubbles(bubbleLiftSystem)
    //   break
    // case Action.BUBLESOFF:
    //   stopLiftBubbles(bubbleLiftSystem)
    //   break
    // case Action.VIDEOBUBLES:
    //   bubbleScreenController.startRandomBubbles()
    //   bubbleScreenController.startSpeakerBubbles()

    //   break
    // case Action.VIDEOBUBLESOFF:
    //   bubbleScreenController.stopRandomBubbles()
    //   bubbleScreenController.stopSpeakerBubbles()
    //   break

    // case Action.TELEPORTS:
    //   telport1.show()
    //   telport2.show()
    //   break
    // case Action.NYBANNER:
    //   //
    //   break
  }
}

export let ShowScripts: any = {
  DEFAULT: [],
  RAC: [
    { event: Action.STOPALL, time: 0 },
    { event: Action.CAKE, time: 0 },
    { event: Action.SPARKLERSTOP, time: 5 },
    { event: Action.SPARKLERSALL, time: 10 },
    { event: Action.CONFETTIMID, time: 15 },
    { event: Action.SPARKLERSOFF, time: 30 },
    { event: Action.RACAPPEAR, time: 40 },
    { event: Action.RACEPIC, time: 45 },
    { event: Action.LIGHTS1, time: 45 },
    { event: Action.LIGHTSBOTTOM1, time: 45 },
    { event: Action.PLAYERCLAP, time: 45 },
    { event: Action.LIGHTSGO, time: 60 },
    { event: Action.LIGHTS2, time: 116 },
    { event: Action.RACWAVE, time: 116 },
    { event: Action.LIGHTSBOTTOM2, time: 132 },
    { event: Action.LIGHTSGO, time: 132 },
    { event: Action.RACHANDUP, time: 132 },
    { event: Action.RACBOUNCE, time: 172 },
    { event: Action.CONFETTILONG, time: 172 },
    { event: Action.LIGHTSGO, time: 172 },
    { event: Action.LIGHTSBOTTOMGO, time: 172 },
    { event: Action.RACMIXING, time: 205 },
    { event: Action.RACBOUNCE, time: 224 },
    { event: Action.LIGHTSBOTTOM3, time: 271 },
    { event: Action.BALLOONSSHORT, time: 279 },
    { event: Action.SPARKLERSLOW, time: 295 },
    { event: Action.SPARKLERSOFF, time: 304 },
    { event: Action.RACBOUNCE, time: 304 },
    { event: Action.RACWAVE, time: 324 },
    { event: Action.RACWAVE, time: 350 },
    { event: Action.RACWAVE, time: 370 },
    { event: Action.LIGHTSBOTTOM1, time: 384 },
    { event: Action.RACCLAP, time: 384 },
    { event: Action.LIGHTS1, time: 403 },
    { event: Action.RACMIXING, time: 426 },
    { event: Action.RACMIXING, time: 446 },
    { event: Action.RACCLAP, time: 464 },
    { event: Action.RACEPIC, time: 482 },
    { event: Action.LIGHTSBOTTOM2, time: 507 },
    { event: Action.RACEPIC, time: 507 },
    { event: Action.RACMIXING, time: 543 },
    { event: Action.RACBOUNCE, time: 591 },
    { event: Action.BALLOONSLONG, time: 591 },
    { event: Action.RACMIXING, time: 636 },
    { event: Action.RACPLAY, time: 657 },
    { event: Action.RACMIXING, time: 681 },
    { event: Action.LIGHTSBOTTOM1, time: 723 },
    { event: Action.RACEPIC, time: 723 },
    { event: Action.PLAYERTIK, time: 778 },
    { event: Action.LIGHTS1, time: 778 },
    { event: Action.RACCLAP, time: 778 },
    { event: Action.RACMIXING, time: 841 },
    { event: Action.LIGHTSGO, time: 841 },
    { event: Action.LIGHTSBOTTOMGO, time: 841 },
    { event: Action.RACPLAY, time: 884 },
    { event: Action.BALLOONSLONG, time: 884 },
    { event: Action.RACMIXING, time: 927 },
    { event: Action.PLAYERTEKTO, time: 976 },
    { event: Action.LIGHTS2, time: 976 },
    { event: Action.CONFETTIMID, time: 976 },
    { event: Action.RACEPIC, time: 976 },
    { event: Action.RACMIXING, time: 1006 },
    { event: Action.RACCLAP, time: 1020 },
    { event: Action.RACMIXING, time: 1064 },
    { event: Action.RACEPIC, time: 1072 },
    { event: Action.CONFETTILONG, time: 1072 },
    { event: Action.CHILL, time: 1088 },
    { event: Action.BALLOONSSHORT, time: 1088 },
    { event: Action.LIGHTS3, time: 1104 },
    { event: Action.LIGHTSBOTTOM1, time: 1121 },
    { event: Action.LIGHTSGO, time: 1121 },
    { event: Action.PLAYERDANCE, time: 1121 },
    { event: Action.RACMIXING, time: 1136 },
    { event: Action.RACEPIC, time: 1161 },
    { event: Action.BALLOONSSHORT, time: 1232 },
    { event: Action.RACCLAP, time: 1232 },
    { event: Action.RACMIXING, time: 1383 },
    { event: Action.RACCLAP, time: 1440 },
    { event: Action.RACMIXING, time: 1484 },
    { event: Action.RACMIXING, time: 1505 },
    { event: Action.LIGHTSBOTTOMGO, time: 1505 },
    { event: Action.LIGHTS2, time: 1505 },
    { event: Action.CONFETTISHORT, time: 1540 },
    { event: Action.RACMIXING, time: 1569 },
    { event: Action.RACPLAY, time: 1630 },
    { event: Action.BALLOONSSHORT, time: 1650 },
    { event: Action.PLAYERMONEY, time: 1650 },
    { event: Action.RACHANDUP, time: 1650 },
    { event: Action.RACEPIC, time: 1673 },
    { event: Action.RACMIXING, time: 1695 },
    { event: Action.RACPLAY, time: 1752 },
    { event: Action.RACMIXING, time: 1780 },
    { event: Action.LIGHTSGO, time: 1800 },
    { event: Action.RACCLAP, time: 1863 },
    { event: Action.LIGHTSBOTTOM2, time: 1863 },
    { event: Action.RACMIXING, time: 1912 },
    { event: Action.BALLOONSMID, time: 1927 },
    { event: Action.RACBOUNCE, time: 1927 },
    { event: Action.RACMIXING, time: 1980 },
    { event: Action.RACCLAP, time: 2000 },
    { event: Action.RACBOUNCE, time: 2040 },
    { event: Action.LIGHTS1, time: 2040 },
    { event: Action.RACMIXING, time: 2106 },
    { event: Action.RACCLAP, time: 2160 },
    { event: Action.BALLOONSMID, time: 2160 },
    { event: Action.LIGHTSBOTTOM2, time: 2160 },
    { event: Action.RACMIXING, time: 2175 },
    { event: Action.RACMIXING, time: 2218 },
    { event: Action.RACCLAP, time: 2240 },
    { event: Action.RACPLAY, time: 2304 },
    { event: Action.RACMIXING, time: 2340 },
    { event: Action.RACCLAP, time: 2383 },
    { event: Action.CONFETTISHORT, time: 2383 },
    { event: Action.LIGHTSGO, time: 2383 },
    { event: Action.LIGHTSBOTTOMGO, time: 2383 },
    { event: Action.RACMIXING, time: 2448 },
    { event: Action.LIGHTSBOTTOM2, time: 2467 },
    { event: Action.RACEPIC, time: 2467 },
    { event: Action.RACMIXING, time: 2529 },
    { event: Action.RACPLAY, time: 2546 },
    { event: Action.RACMIXING, time: 2582 },
    { event: Action.RACEPIC, time: 2624 },
    { event: Action.RACMIXING, time: 2648 },
    { event: Action.LIGHTS1, time: 2671 },
    { event: Action.CONFETTIMID, time: 2671 },
    { event: Action.RACCLAP, time: 2671 },
    { event: Action.RACPLAY, time: 2700 },
    { event: Action.RACMIXING, time: 2740 },
    { event: Action.RACCLAP, time: 2785 },
    { event: Action.BALLOONSSHORT, time: 2785 },
    { event: Action.LIGHTS3, time: 2785 },
    { event: Action.RACMIXING, time: 2825 },
    { event: Action.CHILL, time: 2835 },
    { event: Action.LIGHTSBOTTOM1, time: 2835 },
    { event: Action.CONFETTISHORT, time: 2835 },
    { event: Action.LIGHTSGO, time: 2853 },
    { event: Action.LIGHTSBOTTOM2, time: 2860 },
    { event: Action.RACEPIC, time: 2970 },
    { event: Action.BALLOONSMID, time: 3008 },
    { event: Action.CONFETTISHORT, time: 3008 },
    { event: Action.RACCLAP, time: 3026 },
    { event: Action.PLAYERTEKTO, time: 3040 },
    { event: Action.LIGHTS1, time: 3040 },
    { event: Action.RACEPIC, time: 3072 },
    { event: Action.RACEPIC, time: 3168 },
    { event: Action.CONFETTISHORT, time: 3200 },
    { event: Action.PLAYERTEKTO, time: 3200 },
    { event: Action.LIGHTSBOTTOMGO, time: 3200 },
    { event: Action.RACBOUNCE, time: 3200 },
    { event: Action.LIGHTS3, time: 3280 },
    { event: Action.RACBOUNCE, time: 3280 },
    { event: Action.BALLOONSSHORT, time: 3280 },
    { event: Action.RACPLAY, time: 3344 },
    { event: Action.PLAYERHAMMER, time: 3344 },
    { event: Action.CONFETTISHORT, time: 3407 },
    { event: Action.RACEPIC, time: 3407 },
    { event: Action.RACCLAP, time: 3464 },
    { event: Action.SPARKLERSMID, time: 3464 },
    { event: Action.RACEPIC, time: 3500 },
    { event: Action.RACCLAP, time: 3516 },
    { event: Action.CONFETTIMID, time: 3528 },
    { event: Action.BALLOONSMID, time: 3576 },
    { event: Action.RACCLAP, time: 3576 },
    { event: Action.SPARKLERSALL, time: 3624 },
    { event: Action.PLAYERCLAP, time: 3624 },
    { event: Action.RACGO, time: 3624 },
    { event: Action.BALLOONSMID, time: 3624 },
    { event: Action.CONFETTIMID, time: 3624 },
    { event: Action.SPARKLERSOFF, time: 3660 },
    { event: Action.PLAYERCLAP, time: 3660 },
    { event: Action.TELEPORT, time: 3660 },
  ],
  TEST: [
    { time: 0, event: Action.RACBOUNCE },
    { time: 5, event: Action.RACCLAP },
    { time: 10, event: Action.RACEPIC },
    { time: 20, event: Action.RACWAVE },
    { time: 20, event: Action.PLAYERCLAP },
    { time: 30, event: Action.PLAYERDANCE },
    { time: 30, event: Action.RACHANDUP },
    { time: 50, event: Action.PLAYERKISS },
    { time: 60, event: Action.PLAYERCLAP },
  ],
}

type scheduledEvent = {
  event: Action
  time: number
}

type show = scheduledEvent[]

export class RunEvents {
  static _instance: RunEvents | null = null
  currentTime: number
  eventScript: show
  active: boolean
  update(dt: number) {
    if (!this.active) return
    this.currentTime += dt

    if (this.currentTime >= this.eventScript[0].time) {
      runAction(this.eventScript[0].event)
      this.eventScript.shift()
      //log('coming parts ', this.eventScript)

      if (this.eventScript.length == 0) {
        log('Show over!')
        this.active = false

        if (showPlaying == 1) {
          checkTime()
        } else {
          runAction(Action.STOPALL)
          showPlayingFalse()
        }
        //engine.removeSystem(this)
      }
    }
  }
  constructor(script: show, startTime?: number) {
    RunEvents._instance = this
    this.eventScript = script
    this.currentTime = startTime ? startTime : 0
  }

  static createAndAddToEngine(script: show, startTime?: number): RunEvents {
    if (this._instance == null) {
      this._instance = new RunEvents(script, startTime)
      engine.addSystem(this._instance)
    } else {
      this._instance.eventScript = script
      this._instance.currentTime = startTime ? startTime : 0
    }
    this._instance.active = true

    log('starting show ', script)
    return this._instance
  }

  stopShow() {
    this.eventScript = []
    this.active = false
    this.currentTime = 0
    runAction(Action.STOPALL)
    log('STOPPING SHOW!')
  }
}
