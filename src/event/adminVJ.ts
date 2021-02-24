import * as ui from '@dcl/ui-scene-utils'
import { getUserData, UserData } from '@decentraland/Identity'
import { Action, djUp, portalUp, runAction } from './eventScripts'
import { isPreviewMode } from '@decentraland/EnvironmentAPI'

import {
  checkEventServer,
  checkTime,
  freeMode,
  setFreeMode,
  showPlayingFalse,
  StartShow,
} from './showPlaying'
import { movePlayerTo } from '@decentraland/RestrictedActions'
import { lights1 } from './syncableItems'
import { cakeUp } from './birthday/launch'

export let userData: UserData

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

export let whiteListedIds = [
  'NicoE',
  'sam',
  'Jungle',
  'MANA',
  'Bence',
  'Tak',
  'KJWalker',
  'Shibu',
  'imoasis',
]

export let whiteListedAddresses = ['0x47e33894eD60A691a5c795325dAE461363863c8c']

export const sceneMessageBus = new MessageBus()

let VJUI: ui.CustomPrompt

let bouncerUI: ui.FillInPrompt

export async function initiateVJUI() {
  if (!userData) {
    await setUserData()
  }

  let authorized = false

  if (await isPreviewMode()) {
    authorized = true
  } else {
    for (let id of whiteListedIds) {
      if (userData && id == userData.displayName) {
        authorized = true
        break
      }
    }

    for (let address of whiteListedAddresses) {
      if (userData && address == userData.publicKey) {
        authorized = true
        break
      }
    }
  }

  if (authorized) {
    VJUI = new ui.CustomPrompt(ui.PromptStyles.DARKLARGE, null, null, true)
    VJUI.background.positionX = 380

    VJUI.background.height = 650

    VJUI.addText('VJTron 2000', 0, 320, Color4.Gray(), 25)

    VJUI.addText('Make Announcement', -140, 280)

    let submittedText: string = ''
    let textBox = VJUI.addTextBox(-80, 230, 'Announcement', (e: string) => {
      submittedText = e
    })
    VJUI.addButton('Send MSG', -150, 180, () => {
      sceneMessageBus.emit('announcement', { text: submittedText })
    })

    VJUI.addButton(
      'TELEPORT',
      140,
      -140,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.TELEPORT,
          freeMode: freeMode,
          cake: cakeUp,
          dj: djUp,
          portal: portalUp,
        })
      },
      ui.ButtonStyles.RED
    )

    // switches
    let light1 = VJUI.addSwitch(
      'Lights Top',
      -190,
      90,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.LIGHTS1,
          freeMode: freeMode,
          cake: cakeUp,
          dj: djUp,
          portal: portalUp,
        })
        l1.check()
      },
      () => {
        sceneMessageBus.emit('action', {
          action: Action.LIGHTSGO,
          freeMode: freeMode,
          cake: cakeUp,
          dj: djUp,
          portal: portalUp,
        })
        l1.uncheck()
        l2.uncheck()
        l3.uncheck()
      },
      ui.SwitchStyles.SQUAREGREEN,
      true
    )

    light1.image.height = 25
    light1.image.width = 50
    light1.label.fontSize = 14
    light1.label.positionX = 55

    let l1 = VJUI.addSwitch(
      '1',
      -40,
      90,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.LIGHTS1,
          freeMode: freeMode,
          cake: cakeUp,
          dj: djUp,
          portal: portalUp,
        })
        l2.uncheck()
        l3.uncheck()
        light1.check()
      },
      () => {
        sceneMessageBus.emit('action', {
          action: Action.LIGHTSGO,
          freeMode: freeMode,
          cake: cakeUp,
          dj: djUp,
          portal: portalUp,
        })
        l1.uncheck()
        l2.uncheck()
        l3.uncheck()
      },
      ui.SwitchStyles.ROUNDGREEN,
      true
    )

    let l2 = VJUI.addSwitch(
      '2',
      60,
      90,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.LIGHTS2,
          freeMode: freeMode,
          cake: cakeUp,
          dj: djUp,
          portal: portalUp,
        })
        l1.uncheck()
        l3.uncheck()
        light1.check()
      },
      () => {
        sceneMessageBus.emit('action', {
          action: Action.LIGHTSGO,
          freeMode: freeMode,
          cake: cakeUp,
          dj: djUp,
          portal: portalUp,
        })
        l1.uncheck()
        l2.uncheck()
        l3.uncheck()
      },
      ui.SwitchStyles.ROUNDGREEN,
      true
    )

    let l3 = VJUI.addSwitch(
      '3',
      180,
      90,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.LIGHTS3,
          freeMode: freeMode,
          cake: cakeUp,
          dj: djUp,
          portal: portalUp,
        })

        l1.uncheck()
        l2.uncheck()
        light1.check()
      },
      () => {
        sceneMessageBus.emit('action', {
          action: Action.LIGHTSGO,
          freeMode: freeMode,
          cake: cakeUp,
          dj: djUp,
          portal: portalUp,
        })
        l1.uncheck()
        l2.uncheck()
        l3.uncheck()
      },
      ui.SwitchStyles.ROUNDGREEN,
      true
    )

    l1.image.height = 25
    l1.image.width = 50
    l1.label.fontSize = 14
    l1.label.positionX = 55

    l2.image.height = 25
    l2.image.width = 50
    l2.label.fontSize = 14
    l2.label.positionX = 55

    l3.image.height = 25
    l3.image.width = 50
    l3.label.fontSize = 14
    l3.label.positionX = 55

    // switches
    let light2 = VJUI.addSwitch(
      'LightBottom',
      -190,
      60,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.LIGHTSBOTTOM1,
          freeMode: freeMode,
          cake: cakeUp,
          dj: djUp,
          portal: portalUp,
        })
        lb1.check()
      },
      () => {
        sceneMessageBus.emit('action', {
          action: Action.LIGHTSBOTTOMGO,
          freeMode: freeMode,
          cake: cakeUp,
          dj: djUp,
          portal: portalUp,
        })
        lb1.uncheck()
        lb2.uncheck()
        lb3.uncheck()
      },
      ui.SwitchStyles.SQUAREGREEN,
      true
    )

    light2.image.height = 25
    light2.image.width = 50
    light2.label.fontSize = 14
    light2.label.positionX = 55

    let lb1 = VJUI.addSwitch(
      '1',
      -40,
      60,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.LIGHTSBOTTOM1,
          freeMode: freeMode,
          cake: cakeUp,
          dj: djUp,
          portal: portalUp,
        })
        lb2.uncheck()
        lb3.uncheck()
        light2.check()
      },
      () => {
        sceneMessageBus.emit('action', {
          action: Action.LIGHTSBOTTOMGO,
          freeMode: freeMode,
          cake: cakeUp,
          dj: djUp,
          portal: portalUp,
        })
        lb1.uncheck()
        lb2.uncheck()
        lb3.uncheck()
      },
      ui.SwitchStyles.ROUNDGREEN,
      true
    )

    let lb2 = VJUI.addSwitch(
      '2',
      60,
      60,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.LIGHTSBOTTOM2,
          freeMode: freeMode,
          cake: cakeUp,
          dj: djUp,
          portal: portalUp,
        })
        lb1.uncheck()
        lb3.uncheck()
        light2.check()
      },
      () => {
        sceneMessageBus.emit('action', {
          action: Action.LIGHTSBOTTOMGO,
          freeMode: freeMode,
          cake: cakeUp,
          dj: djUp,
          portal: portalUp,
        })
        lb1.uncheck()
        lb2.uncheck()
        lb3.uncheck()
      },
      ui.SwitchStyles.ROUNDGREEN,
      true
    )

    let lb3 = VJUI.addSwitch(
      '3',
      180,
      60,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.LIGHTSBOTTOM3,
          freeMode: freeMode,
          cake: cakeUp,
          dj: djUp,
          portal: portalUp,
        })

        lb1.uncheck()
        lb2.uncheck()
        light2.check()
      },
      () => {
        sceneMessageBus.emit('action', {
          action: Action.LIGHTSBOTTOMGO,
          freeMode: freeMode,
          cake: cakeUp,
          dj: djUp,
          portal: portalUp,
        })
        lb1.uncheck()
        lb2.uncheck()
        lb3.uncheck()
      },
      ui.SwitchStyles.ROUNDGREEN,
      true
    )

    lb1.image.height = 25
    lb1.image.width = 50
    lb1.label.fontSize = 14
    lb1.label.positionX = 55

    lb2.image.height = 25
    lb2.image.width = 50
    lb2.label.fontSize = 14
    lb2.label.positionX = 55

    lb3.image.height = 25
    lb3.image.width = 50
    lb3.label.fontSize = 14
    lb3.label.positionX = 55

    let balloonsShort = VJUI.addButton('Balloons 5', -180, 20, () => {
      sceneMessageBus.emit('action', {
        action: Action.BALLOONSSHORT,
        freeMode: freeMode,
        cake: cakeUp,
        dj: djUp,
        portal: portalUp,
      })
    })
    balloonsShort.image.width = 100
    balloonsShort.image.height = 40
    balloonsShort.label.fontSize = 12

    let balloonsMid = VJUI.addButton('Balloons 20', -50, 20, () => {
      sceneMessageBus.emit('action', {
        action: Action.BALLOONSMID,
        freeMode: freeMode,
        cake: cakeUp,
        dj: djUp,
        portal: portalUp,
      })
    })

    balloonsMid.image.width = 100
    balloonsMid.image.height = 40
    balloonsMid.label.fontSize = 12

    let balloonsLong = VJUI.addButton('Balloons 40', 80, 20, () => {
      sceneMessageBus.emit('action', {
        action: Action.BALLOONSLONG,
        freeMode: freeMode,
        cake: cakeUp,
        dj: djUp,
        portal: portalUp,
      })
    })

    balloonsLong.image.width = 100
    balloonsLong.image.height = 40
    balloonsLong.label.fontSize = 12

    let confettiShort = VJUI.addButton('Confetti 5', -180, -25, () => {
      sceneMessageBus.emit('action', {
        action: Action.CONFETTISHORT,
        freeMode: freeMode,
        cake: cakeUp,
        dj: djUp,
        portal: portalUp,
      })
    })
    confettiShort.image.width = 100
    confettiShort.image.height = 40
    confettiShort.label.fontSize = 12

    let confettiMid = VJUI.addButton('Confetti 20', -50, -25, () => {
      sceneMessageBus.emit('action', {
        action: Action.CONFETTIMID,
        freeMode: freeMode,
        cake: cakeUp,
        dj: djUp,
        portal: portalUp,
      })
    })

    confettiMid.image.width = 100
    confettiMid.image.height = 40
    confettiMid.label.fontSize = 12

    let confettiLong = VJUI.addButton('Confetti 40', 80, -25, () => {
      sceneMessageBus.emit('action', {
        action: Action.CONFETTILONG,
        freeMode: freeMode,
        cake: cakeUp,
        dj: djUp,
        portal: portalUp,
      })
    })

    confettiLong.image.width = 100
    confettiLong.image.height = 40
    confettiLong.label.fontSize = 12

    let sparkles = VJUI.addSwitch(
      'SPARKLES',
      -200,
      -70,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.SPARKLERSALL,
          freeMode: freeMode,
          cake: cakeUp,
          dj: djUp,
          portal: portalUp,
        })
      },
      () => {
        sceneMessageBus.emit('action', {
          action: Action.SPARKLERSOFF,
          freeMode: freeMode,
          cake: cakeUp,
          dj: djUp,
          portal: portalUp,
        })
        s1.uncheck()
        s2.uncheck()
        s3.uncheck()
      },
      ui.SwitchStyles.SQUAREGREEN,
      true
    )

    sparkles.image.height = 25
    sparkles.image.width = 50
    sparkles.label.fontSize = 14
    sparkles.label.positionX = 55

    let s1 = VJUI.addSwitch(
      'T',
      -40,
      -70,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.SPARKLERSTOP,
          freeMode: freeMode,
          cake: cakeUp,
          dj: djUp,
          portal: portalUp,
        })

        sparkles.uncheck()
      },
      () => {
        sceneMessageBus.emit('action', {
          action: Action.SPARKLERSOFF,
          freeMode: freeMode,
          cake: cakeUp,
          dj: djUp,
          portal: portalUp,
        })
      },
      ui.SwitchStyles.ROUNDGREEN,
      true
    )

    let s2 = VJUI.addSwitch(
      'M',
      60,
      -70,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.SPARKLERSMID,
          freeMode: freeMode,
          cake: cakeUp,
          dj: djUp,
          portal: portalUp,
        })

        sparkles.uncheck()
      },
      () => {
        sceneMessageBus.emit('action', {
          action: Action.SPARKLERSOFF,
          freeMode: freeMode,
          cake: cakeUp,
          dj: djUp,
          portal: portalUp,
        })
      },
      ui.SwitchStyles.ROUNDGREEN,
      true
    )

    let s3 = VJUI.addSwitch(
      'L',
      180,
      -70,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.SPARKLERSLOW,
          freeMode: freeMode,
          cake: cakeUp,
          dj: djUp,
          portal: portalUp,
        })

        sparkles.uncheck()
      },
      () => {
        sceneMessageBus.emit('action', {
          action: Action.SPARKLERSOFF,
          freeMode: freeMode,
        })
      },
      ui.SwitchStyles.ROUNDGREEN,
      true
    )

    s1.image.height = 25
    s1.image.width = 50
    s1.label.fontSize = 14
    s1.label.positionX = 55

    s2.image.height = 25
    s2.image.width = 50
    s2.label.fontSize = 14
    s2.label.positionX = 55

    s3.image.height = 25
    s3.image.width = 50
    s3.label.fontSize = 14
    s3.label.positionX = 55

    let jump = VJUI.addButton(
      'Jump',
      -20,
      180,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.PLAYERJUMP,
          freeMode: freeMode,
          cake: cakeUp,
          dj: djUp,
          portal: portalUp,
        })
      },
      ui.ButtonStyles.RED
    )

    let money = VJUI.addButton(
      'Money',
      -20,
      130,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.PLAYERMONEY,
          freeMode: freeMode,
          cake: cakeUp,
          dj: djUp,
          portal: portalUp,
        })
      },
      ui.ButtonStyles.RED
    )

    let clap = VJUI.addButton(
      'Clap',
      45,
      180,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.PLAYERCLAP,
          freeMode: freeMode,
          cake: cakeUp,
          dj: djUp,
          portal: portalUp,
        })
      },
      ui.ButtonStyles.RED
    )

    let dance = VJUI.addButton(
      'Dance',
      45,
      130,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.PLAYERDANCE,
          freeMode: freeMode,
          cake: cakeUp,
          dj: djUp,
          portal: portalUp,
        })
      },
      ui.ButtonStyles.RED
    )

    let hand = VJUI.addButton(
      'Hand',
      105,
      180,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.PLAYERHAND,
          freeMode: freeMode,
          cake: cakeUp,
          dj: djUp,
          portal: portalUp,
        })
      },
      ui.ButtonStyles.RED
    )

    let tik = VJUI.addButton(
      'Tik',
      105,
      130,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.PLAYERTIK,
          freeMode: freeMode,
          cake: cakeUp,
          dj: djUp,
          portal: portalUp,
        })
      },
      ui.ButtonStyles.RED
    )

    let tektonik = VJUI.addButton(
      'Tekto',
      165,
      180,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.PLAYERTEKTO,
          freeMode: freeMode,
          cake: cakeUp,
          dj: djUp,
          portal: portalUp,
        })
      },
      ui.ButtonStyles.RED
    )

    let hammer = VJUI.addButton(
      'Hammer',
      165,
      130,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.PLAYERHAMMER,
          freeMode: freeMode,
          cake: cakeUp,
          dj: djUp,
          portal: portalUp,
        })
      },
      ui.ButtonStyles.RED
    )

    jump.image.width = 50
    jump.image.height = 40
    jump.label.fontSize = 12
    jump.label.positionX = -25

    money.image.width = 50
    money.image.height = 40
    money.label.fontSize = 12
    money.label.positionX = -25

    clap.image.width = 50
    clap.image.height = 40
    clap.label.fontSize = 12
    clap.label.positionX = -30

    dance.image.width = 50
    dance.image.height = 40
    dance.label.fontSize = 12
    dance.label.positionX = -25

    hand.image.width = 50
    hand.image.height = 40
    hand.label.fontSize = 12
    hand.label.positionX = -25

    tik.image.width = 50
    tik.image.height = 40
    tik.label.fontSize = 12
    tik.label.positionX = -25

    tektonik.image.width = 50
    tektonik.image.height = 40
    tektonik.label.fontSize = 12
    tektonik.label.positionX = -25

    hammer.image.width = 50
    hammer.image.height = 40
    hammer.label.fontSize = 12
    hammer.label.positionX = -25

    let racBounce = VJUI.addButton(
      'Bounce',
      -190,
      -190,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.RACBOUNCE,
          freeMode: freeMode,
          cake: cakeUp,
          dj: djUp,
          portal: portalUp,
        })
      },
      ui.ButtonStyles.SQUAREGOLD
    )

    let racChill = VJUI.addButton(
      'Wave',
      -100,
      -190,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.RACWAVE,
          freeMode: freeMode,
          cake: cakeUp,
          dj: djUp,
          portal: portalUp,
        })
      },
      ui.ButtonStyles.SQUAREGOLD
    )

    let racClap = VJUI.addButton(
      'Clap',
      -10,
      -190,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.RACCLAP,
          freeMode: freeMode,
          cake: cakeUp,
          dj: djUp,
          portal: portalUp,
        })
      },
      ui.ButtonStyles.SQUAREGOLD
    )

    let racEpic = VJUI.addButton(
      'Epic',
      80,
      -190,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.RACEPIC,
          freeMode: freeMode,
          cake: cakeUp,
          dj: djUp,
          portal: portalUp,
        })
      },
      ui.ButtonStyles.SQUAREGOLD
    )

    let racHorns = VJUI.addButton(
      'HandUp',
      170,
      -190,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.RACHANDUP,
          freeMode: freeMode,
          cake: cakeUp,
          dj: djUp,
          portal: portalUp,
        })
      },
      ui.ButtonStyles.SQUAREGOLD
    )

    let racMix = VJUI.addButton(
      'Mix',
      40,
      -240,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.RACMIXING,
          freeMode: freeMode,
          cake: cakeUp,
          dj: djUp,
          portal: portalUp,
        })
      },
      ui.ButtonStyles.SQUAREGOLD
    )

    let racPlay = VJUI.addButton(
      'Play',
      -50,
      -240,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.RACPLAY,
          freeMode: freeMode,
          cake: cakeUp,
          dj: djUp,
          portal: portalUp,
        })
      },
      ui.ButtonStyles.SQUAREGOLD
    )

    VJUI.addSwitch(
      'DJ',
      -190,
      -240,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.RACAPPEAR,
          freeMode: freeMode,
          cake: cakeUp,
          dj: djUp,
          portal: portalUp,
        })
      },
      () => {
        sceneMessageBus.emit('action', {
          action: Action.RACGO,
          freeMode: freeMode,
          cake: cakeUp,
          dj: djUp,
          portal: portalUp,
        })
      },
      ui.SwitchStyles.ROUNDGREEN,
      true
    )

    racBounce.image.width = 75
    racBounce.image.height = 40
    racBounce.label.fontSize = 12

    racChill.image.width = 75
    racChill.image.height = 40
    racChill.label.fontSize = 12

    racEpic.image.width = 75
    racEpic.image.height = 40
    racEpic.label.fontSize = 12

    racClap.image.width = 75
    racClap.image.height = 40
    racClap.label.fontSize = 12

    racHorns.image.width = 75
    racHorns.image.height = 40
    racHorns.label.fontSize = 12

    racPlay.image.width = 75
    racPlay.image.height = 40
    racPlay.label.fontSize = 12

    racMix.image.width = 75
    racMix.image.height = 40
    racMix.label.fontSize = 12

    // player actions

    VJUI.addSwitch(
      'DEFAULT SEQ',
      -190,
      -300,
      () => {
        sceneMessageBus.emit('playshow', { show: 'server' })
      },
      () => {
        sceneMessageBus.emit('playshow', { show: 'free' })
      },
      ui.SwitchStyles.SQUARERED
    )

    VJUI.addButton(
      'Cake time!',
      -140,
      -140,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.CAKE,
          freeMode: freeMode,
          cake: cakeUp,
          dj: djUp,
          portal: portalUp,
        })
      },
      ui.ButtonStyles.RED
    )

    // VJUI.addButton('DEFAULT SHOW', -130, -60, () => {
    //   sceneMessageBus.emit('playshow', { show: 'default' })
    // })

    // VJUI.addButton('FROM SERVER', -150, -70, () => {
    //   sceneMessageBus.emit('playshow', { show: 'server' })
    // })

    // VJUI.addButton('SHOW 2', -150, -100, () => {
    //   sceneMessageBus.emit('playshow', { show: 2 })
    // })

    // VJUI.addButton('FREE MODE', -130, -130, () => {
    //   sceneMessageBus.emit('playshow', { show: 'free' })
    // })

    bouncerUI = new ui.FillInPrompt(
      'Digital Bouncer',
      (e: string) => {
        sceneMessageBus.emit('kick', {
          player: e,
        })
      },
      'Kick',
      'player name',
      true
    )
    bouncerUI.hide()

    Input.instance.subscribe(
      'BUTTON_DOWN',
      ActionButton.PRIMARY,
      false,
      (e) => {
        if (VJUI) {
          if (!VJUI.background.visible) {
            VJUI.show()
          } else {
            VJUI.hide()
          }
        }
      }
    )

    Input.instance.subscribe(
      'BUTTON_DOWN',
      ActionButton.SECONDARY,
      false,
      (e) => {
        if (bouncerUI) {
          if (!bouncerUI.background.visible) {
            bouncerUI.show()
          } else {
            bouncerUI.hide()
          }
        }
      }
    )
  }

  sceneMessageBus.on('announcement', (e) => {
    ui.displayAnnouncement(e.text)
  })

  sceneMessageBus.on('action', (e) => {
    if (e.freeMode) {
      setFreeMode()
    }
    if (e.cake && !cakeUp) {
      runAction(Action.CAKE)
    }
    if (e.dj && !djUp) {
      runAction(Action.RACAPPEAR)
    }
    if (e.portal && !portalUp) {
      runAction(Action.TELEPORT)
    }

    runAction(e.action)
  })

  sceneMessageBus.on('playshow', (e) => {
    if (e.show == 'default') {
      checkTime()
    } else if (e.show == 'free') {
      setFreeMode()
    } else if (e.show == 2) {
      StartShow(2, Date.now())
    } else if (e.show == 'server') {
      checkEventServer('bdayRac')
    }
  })
}

sceneMessageBus.on('kick', async (e) => {
  if (!userData) {
    await setUserData()
  }

  if (e.player == userData.displayName) {
    movePlayerTo({ x: 60, y: 5, z: 32 })
  }
})
