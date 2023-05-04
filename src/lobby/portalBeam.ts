import { TriggerBox } from '../modules/triggerBox'
import { player } from '../modules/player'
import { movePlayerTo } from '@decentraland/RestrictedActions'
import { lobbyCenter, lobbyHeight } from './resources/globals'
import { showTeleportUI, setTeleportCountdown } from '../modules/ui'
import * as resource from './resources/resources'
import * as sfx from './resources/sounds'
import { tutorialEnableObservable } from 'src/modules/tutorialHandler'
import { isInBar, setBarMusicOn } from 'src/modules/bar/jukebox'

@Component('DelayedTriggerBox')
export class DelayedTriggerBox {
  delay: number = 2
  elapsed: number = 0

  constructor(_delay: number) {
    this.delay = _delay
  }
}
// AMBIENT SOUND, WATER + BIRDS
let ambienceBox = new Entity()
ambienceBox.addComponent(sfx.lobbyAmbienceSource)
ambienceBox.addComponent(
  new Transform({
    position: new Vector3(lobbyCenter.x, lobbyHeight, lobbyCenter.z),
  })
)
sfx.lobbyAmbienceSource.loop = true
sfx.lobbyAmbienceSource.playing = true

engine.addEntity(ambienceBox)

// LOBBY MUSIC
let musicBox = new Entity()
musicBox.addComponent(
  new Transform({
    position: new Vector3(0, 2, 0),
  })
)
musicBox.addComponent(sfx.lobbyMusicSource)
sfx.lobbyMusicSource.loop = true
sfx.lobbyMusicSource.playing = true

engine.addEntity(musicBox)
musicBox.setParent(Attachable.AVATAR)

tutorialEnableObservable.add((tutorialEnabled) => {
  if (tutorialEnabled) {
    sfx.lobbyMusicSource.playing = false
    tutorialRunning = true
  } else {
    // tutorial over
    tutorialRunning = false
    if (player.camera.position.y > 30) {
      sfx.lobbyMusicSource.playing = true
    } else if (isInBar) {
      setBarMusicOn()
    }
  }

  sfx.lobbyMusicSource.playing = tutorialEnabled ? false : true
})

export let tutorialRunning: boolean = false

// BEAM MESH
let beam = new Entity()
beam.addComponent(
  new Transform({
    position: new Vector3(lobbyCenter.x, lobbyCenter.y, lobbyCenter.z),
  })
)
beam.addComponent(resource.beamShape)
engine.addEntity(beam)

export class TeleportController {
  triggerBoxUp: TriggerBox
  triggerBoxDown: TriggerBox
  triggerBoxFallCheck: TriggerBox
  triggers: TriggerBox[]
  delayedTriggers: TriggerBox[]
  portalSys: PortalCheckSystem
  portalLiftSpiral: Entity
  beamFireSound: Entity
  beamFallSound: Entity
  impactSound: Entity

  constructor() {
    this.triggers = []
    this.delayedTriggers = []

    // Trigger to handle teleporting the player up to the cloud
    this.triggerBoxUp = new TriggerBox(
      new Vector3(lobbyCenter.x, lobbyCenter.y, lobbyCenter.z),
      new Vector3(6, 4.5, 6),
      () => {
        movePlayerTo(
          { x: lobbyCenter.x + 5, y: 140, z: lobbyCenter.z - 10 },
          { x: lobbyCenter.x, y: 80, z: lobbyCenter.z }
        )
        if (!tutorialRunning) {
          sfx.lobbyMusicSource.playing = true
        }
        sfx.lobbyAmbienceSource.playing = true
        //enable fall sound trigger
        this.triggerBoxFallCheck.active = true
      }
    )
    this.triggerBoxUp.addComponent(new DelayedTriggerBox(3))

    engine.addEntity(this.triggerBoxUp)

    // Trigger that handles landing offset
    this.triggerBoxDown = new TriggerBox(
      new Vector3(lobbyCenter.x, lobbyCenter.y + 8, lobbyCenter.z),
      new Vector3(6, 6, 6),
      () => {
        movePlayerTo(
          { x: lobbyCenter.x - 5, y: 0, z: lobbyCenter.z + 2 },
          { x: lobbyCenter.x, y: 2, z: lobbyCenter.z - 12 }
        )
        sfx.lobbyMusicSource.playing = false
        sfx.lobbyAmbienceSource.playing = false
        this.impactSound.getComponent(AudioSource).playOnce()
      }
    )
    engine.addEntity(this.triggerBoxDown)

    // Trigger to play fall SFX
    this.triggerBoxFallCheck = new TriggerBox(
      new Vector3(lobbyCenter.x, lobbyCenter.y + 90, lobbyCenter.z),
      new Vector3(6, 10, 6),
      () => {
        sfx.lobbyMusicSource.playing = false
        sfx.lobbyAmbienceSource.playing = false
        this.beamFallSound.getComponent(AudioSource).playOnce()

        //disable after one fire
        this.triggerBoxFallCheck.active = false
      }
    )
    engine.addEntity(this.triggerBoxFallCheck)

    this.delayedTriggers.push(this.triggerBoxUp)
    this.triggers.push(this.triggerBoxDown)
    this.triggers.push(this.triggerBoxFallCheck)

    this.portalLiftSpiral = new Entity()
    this.portalLiftSpiral.addComponent(
      new Transform({
        position: new Vector3(lobbyCenter.x, lobbyCenter.y, lobbyCenter.z),
        scale: new Vector3(1, 0, 1),
      })
    )
    this.portalLiftSpiral.addComponent(resource.portalSpiralShape)
    this.portalLiftSpiral.addComponent(sfx.beamChargeSource)

    engine.addEntity(this.portalLiftSpiral)

    this.portalSys = new PortalCheckSystem(this)
    engine.addSystem(this.portalSys)

    //beam teleport sound attached to player
    this.beamFireSound = new Entity()
    this.beamFireSound.addComponent(
      new Transform({
        //position: new Vector3(lobbyCenter.x, lobbyHeight+40, lobbyCenter.z-7)
        position: new Vector3(0, 1, 0),
      })
    )
    this.beamFireSound.addComponent(sfx.beamFireSource)
    engine.addEntity(this.beamFireSound)
    this.beamFireSound.setParent(Attachable.AVATAR)

    //beam fall sound attached to player
    this.beamFallSound = new Entity()
    this.beamFallSound.addComponent(
      new Transform({
        position: new Vector3(0, 4, 0),
      })
    )
    this.beamFallSound.addComponent(sfx.beamFallSource)
    engine.addEntity(this.beamFallSound)
    this.beamFallSound.setParent(Attachable.AVATAR)

    //impact sound when landing
    this.impactSound = new Entity()
    this.impactSound.addComponent(
      new Transform({
        position: new Vector3(0, 1, 0),
      })
    )
    this.impactSound.addComponent(sfx.impactHardSource)
    engine.addEntity(this.impactSound)
    this.impactSound.setParent(Attachable.AVATAR)
  }

  showTeleport() {
    this.triggerBoxUp.getComponent(Transform).position.y = lobbyCenter.y
    this.triggerBoxUp.updatePosition()
  }
  hideTeleport() {
    this.triggerBoxUp.getComponent(Transform).position.y = lobbyCenter.y - 10
    this.triggerBoxUp.updatePosition()
  }

  collideSimple() {
    for (let i = 0; i < this.triggers.length; i++) {
      this.triggers[i].collide(player.feetPos)
    }
  }
  collideDelayed(dt: number) {
    const liftSpiralTransform = this.portalLiftSpiral.getComponent(Transform)

    for (let i = 0; i < this.delayedTriggers.length; i++) {
      if (this.delayedTriggers[i].collide(player.feetPos, true)) {
        const delayInfo =
          this.delayedTriggers[i].getComponent(DelayedTriggerBox)
        delayInfo.elapsed += dt
        showTeleportUI(true)
        let countDownNum = delayInfo.delay - delayInfo.elapsed + 1
        if (countDownNum < 1) countDownNum = 1
        setTeleportCountdown(countDownNum.toFixed(0))
        liftSpiralTransform.scale.y += dt / delayInfo.delay
        liftSpiralTransform.position.y += 0.9 * dt

        if (!this.portalLiftSpiral.getComponent(AudioSource).playing) {
          this.portalLiftSpiral.getComponent(AudioSource).playOnce()
        }

        if (delayInfo.elapsed > delayInfo.delay) {
          this.delayedTriggers[i].fire()
          this.portalLiftSpiral.getComponent(AudioSource).playing = false
          this.beamFireSound.getComponent(AudioSource).playOnce()
          delayInfo.elapsed = 0
          liftSpiralTransform.scale.y = 0
          liftSpiralTransform.position.y = lobbyCenter.y
        }
      } else {
        this.delayedTriggers[i].getComponent(DelayedTriggerBox).elapsed = 0
        showTeleportUI(false)
        setTeleportCountdown('0')
        liftSpiralTransform.scale.y = 0
        liftSpiralTransform.position.y = lobbyCenter.y

        this.portalLiftSpiral.getComponent(AudioSource).playing = false
        // this.beamFireSound.getComponent(AudioSource).playing = false
      }
    }
  }
}

class PortalCheckSystem {
  teleportControl: TeleportController

  constructor(_teleportController: TeleportController) {
    this.teleportControl = _teleportController
  }

  update(dt: number) {
    this.teleportControl.collideDelayed(dt)
    this.teleportControl.collideSimple()
  }
}
