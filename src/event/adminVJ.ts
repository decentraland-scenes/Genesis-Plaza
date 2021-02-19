import * as ui from '@dcl/ui-scene-utils'
import { getUserData, UserData } from '@decentraland/Identity'
import { Action, runAction } from './eventScripts'
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
]

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
      -150,
      130,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.TELEPORT,
          freeMode: freeMode,
        })
      },
      ui.ButtonStyles.RED
    )

    // switches
    // VJUI.addSwitch(
    //   'SMOKE',
    //   -190,
    //   100,
    //   () => {
    //     sceneMessageBus.emit('action', {
    //       action: Action.SMOKE,
    //       freeMode: freeMode,
    //     })
    //   },
    //   () => {
    //     sceneMessageBus.emit('action', {
    //       action: Action.SMOKESTOP,
    //       freeMode: freeMode,
    //     })
    //   },
    //   ui.SwitchStyles.SQUAREGREEN
    // )

    // let dots = VJUI.addSwitch(
    //   'DOTS',
    //   -190,
    //   65,
    //   () => {
    //     sceneMessageBus.emit('action', {
    //       action: Action.DOTSSHOW,
    //       freeMode: freeMode,
    //     })
    //   },
    //   () => {
    //     sceneMessageBus.emit('action', {
    //       action: Action.DOTSHIDE,
    //       freeMode: freeMode,
    //     })
    //   },
    //   ui.SwitchStyles.SQUAREGREEN
    // )

    // VJUI.addSwitch(
    //   'PULSE',
    //   -30,
    //   65,
    //   () => {
    //     sceneMessageBus.emit('action', {
    //       action: Action.DOTSPULSE,
    //       freeMode: freeMode,
    //     })
    //     dots.check()
    //   },
    //   () => {
    //     sceneMessageBus.emit('action', {
    //       action: Action.DOTSSTOPPULSE,
    //       freeMode: freeMode,
    //     })
    //   }
    // )

    // let laser = VJUI.addSwitch(
    //   'LASER',
    //   -190,
    //   30,
    //   () => {
    //     sceneMessageBus.emit('action', {
    //       action: Action.LASERSHOW,
    //       freeMode: freeMode,
    //     })
    //   },
    //   () => {
    //     sceneMessageBus.emit('action', {
    //       action: Action.LASERHIDE,
    //       freeMode: freeMode,
    //     })
    //   },
    //   ui.SwitchStyles.SQUAREGREEN
    // )

    // VJUI.addSwitch(
    //   'ROT',
    //   -30,
    //   30,
    //   () => {
    //     sceneMessageBus.emit('action', {
    //       action: Action.LASERROT,
    //       freeMode: freeMode,
    //     })
    //     laser.check()
    //   },
    //   () => {
    //     sceneMessageBus.emit('action', {
    //       action: Action.LASERROTOFF,
    //       freeMode: freeMode,
    //     })
    //   }
    // )

    // VJUI.addSwitch(
    //   'PULSE',
    //   60,
    //   30,
    //   () => {
    //     sceneMessageBus.emit('action', {
    //       action: Action.LASERPULSE,
    //       freeMode: freeMode,
    //     })
    //     laser.check()
    //   },
    //   () => {
    //     sceneMessageBus.emit('action', {
    //       action: Action.LASERPULSEOFF,
    //       freeMode: freeMode,
    //     })
    //   }
    // )

    let balloonsShort = VJUI.addButton('Balloons 5', -180, 30, () => {
      sceneMessageBus.emit('action', {
        action: Action.BALLOONSSHORT,
        freeMode: freeMode,
      })
    })
    balloonsShort.image.width = 100
    balloonsShort.image.height = 40
    balloonsShort.label.fontSize = 12

    let balloonsMid = VJUI.addButton('Balloons 20', -50, 30, () => {
      sceneMessageBus.emit('action', {
        action: Action.BALLOONSMID,
        freeMode: freeMode,
      })
    })

    balloonsMid.image.width = 100
    balloonsMid.image.height = 40
    balloonsMid.label.fontSize = 12

    let balloonsLong = VJUI.addButton('Balloons 40', 80, 30, () => {
      sceneMessageBus.emit('action', {
        action: Action.BALLOONSLONG,
        freeMode: freeMode,
      })
    })

    balloonsLong.image.width = 100
    balloonsLong.image.height = 40
    balloonsLong.label.fontSize = 12

    let confettiShort = VJUI.addButton('Confetti 5', -180, -15, () => {
      sceneMessageBus.emit('action', {
        action: Action.CONFETTISHORT,
        freeMode: freeMode,
      })
    })
    confettiShort.image.width = 100
    confettiShort.image.height = 40
    confettiShort.label.fontSize = 12

    let confettiMid = VJUI.addButton('Confetti 20', -50, -15, () => {
      sceneMessageBus.emit('action', {
        action: Action.CONFETTIMID,
        freeMode: freeMode,
      })
    })

    confettiMid.image.width = 100
    confettiMid.image.height = 40
    confettiMid.label.fontSize = 12

    let confettiLong = VJUI.addButton('Confetti 40', 80, -15, () => {
      sceneMessageBus.emit('action', {
        action: Action.CONFETTILONG,
        freeMode: freeMode,
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
        })
      },
      () => {
        sceneMessageBus.emit('action', {
          action: Action.SPARKLERSOFF,
          freeMode: freeMode,
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

    let s2 = VJUI.addSwitch(
      'M',
      60,
      -70,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.SPARKLERSMID,
          freeMode: freeMode,
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

    let s3 = VJUI.addSwitch(
      'L',
      180,
      -70,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.SPARKLERSLOW,
          freeMode: freeMode,
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
        })
      },
      () => {
        sceneMessageBus.emit('action', {
          action: Action.RACGO,
          freeMode: freeMode,
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
      100,
      -290,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.CAKE,
          freeMode: freeMode,
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
