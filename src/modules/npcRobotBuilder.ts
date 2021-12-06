import resources from '../resources'
import { tutorialEnableObservable } from './tutorialHandler'
import { NPC, NPCDelay } from '@dcl/npc-scene-utils'
import {
  AliceDialog,
  BelaDialog,
  BettyDialog,
  BobDialog,
  CharlieDialog,
  MarshaDialog,
  RonDialog,
  GrumpyElfDialog
} from './npcDialogData'
import { lobbyCenter, lobbyHeight } from 'src/lobby/resources/globals'
import * as utils from '@dcl/ecs-scene-utils'

/*
  Main = 0 (Alice)
  Shell = 1 (Ron)
  Agora = 2 (Bela)
  Garden = 3 (Betty)
  Trade = 4 (Charlie)
  Artichoke = 5 (Marsha)
  Whale = 6 (Bob)
*/

export let alice: NPC
export let ron: NPC
export let bela: NPC
export let betty: NPC
export let charlie: NPC
export let marsha: NPC
export let bob: NPC
export let grumpyElf: NPC

export function addRobots() {
  log("XXXX add robots called")
  const ringShape = resources.models.robots.rings

  //   alice = new NPC(
  //     {
  //       position: new Vector3(135, 2.25, 159),
  //       rotation: Quaternion.Euler(0, 150, 0),
  //     },
  //     resources.models.robots.alice,
  //     () => {
  //       // animations
  //       alice.playAnimation('Hello', true, 2)

  //       let dummyent = new Entity()
  //       dummyent.addComponent(
  //         new NPCDelay(2, () => {
  //           alice.playAnimation('Talk')
  //         })
  //       )
  //       engine.addEntity(dummyent)

  //       // sound
  //       alice.addComponentOrReplace(
  //         new AudioSource(resources.sounds.robots.alice)
  //       )
  //       alice.getComponent(AudioSource).playOnce()

  //       // dialog UI
  //       alice.talk(AliceDialog)
  //     },
  //     {
  //       faceUser: true,
  //       portrait: {
  //         path: 'images/portraits/alice.png',
  //         height: 256,
  //         width: 256,
  //         section: {
  //           sourceHeight: 384,
  //           sourceWidth: 384,
  //         },
  //       },
  //       onlyETrigger: true,
  //     }
  //   )

  //   tutorialEnableObservable.add((tutorialEnabled) => {
  //     let scale: Vector3 = tutorialEnabled ? Vector3.Zero() : Vector3.One()
  //     alice.getComponent(Transform).scale = scale
  //   })

  //   const aliceRings = new Entity()
  //   aliceRings.addComponent(ringShape)
  //   aliceRings.addComponent(
  //     new Transform({
  //       position: new Vector3(0, -0.65, 0),
  //     })
  //   )
  //   aliceRings.setParent(alice)

  ron = new NPC(
    {
      position: new Vector3(297, 11.365, 123),
      rotation: Quaternion.Euler(0, -110, 0),
    },
    resources.models.robots.ron,
    () => {
      // animations
      ron.playAnimation('Hello', true, 2)

      let dummyent = new Entity()
      dummyent.addComponent(
        new NPCDelay(2, () => {
          ron.playAnimation('Talk')
        })
      )
      engine.addEntity(dummyent)

      // sound
      ron.addComponentOrReplace(new AudioSource(resources.sounds.robots.alice))
      ron.getComponent(AudioSource).playOnce()

      // dialog UI
      ron.talk(RonDialog)
    },
    {
      faceUser: true,
      portrait: {
        path: 'images/portraits/ron.png',
        height: 256,
        width: 256,
        section: {
          sourceHeight: 384,
          sourceWidth: 384,
        },
      },
      onlyETrigger: true,
      reactDistance: 8,
      onWalkAway: () => {
        ron.playAnimation('Goodbye', true, 2)
      },
    }
  )

  const ronRings = new Entity()
  ronRings.addComponent(ringShape)
  ronRings.addComponent(
    new Transform({
      position: new Vector3(0, -0.65, 0),
    })
  )
  ronRings.setParent(ron)

  bela = new NPC(
    {
      position: new Vector3(37.27, 4, 265.32),
      rotation: Quaternion.Euler(0, 90, 0),
    },
    resources.models.robots.bela,
    () => {
      // animations
      bela.playAnimation('Hello', true, 2)

      let dummyent = new Entity()
      dummyent.addComponent(
        new NPCDelay(2, () => {
          bela.playAnimation('Talk')
        })
      )
      engine.addEntity(dummyent)

      // sound
      bela.addComponentOrReplace(new AudioSource(resources.sounds.robots.bela))
      bela.getComponent(AudioSource).playOnce()

      // dialog UI
      bela.talk(BelaDialog)
    },
    {
      faceUser: true,
      portrait: {
        path: 'images/portraits/bela.png',
        height: 256,
        width: 256,
        section: {
          sourceHeight: 384,
          sourceWidth: 384,
        },
      },
      onlyETrigger: true,
      continueOnWalkAway: false,
    }
  )

  const belaRings = new Entity()
  belaRings.addComponent(ringShape)
  belaRings.addComponent(
    new Transform({
      position: new Vector3(0, -0.65, 0),
    })
  )
  belaRings.setParent(bela)

  betty = new NPC(
    {
      position: new Vector3(117.657, 3.6, 39.98),
    },
    resources.models.robots.betty,
    () => {
      // animations
      betty.playAnimation('Hello', true, 2)

      let dummyent = new Entity()
      dummyent.addComponent(
        new NPCDelay(2, () => {
          bela.playAnimation('Talk')
        })
      )
      engine.addEntity(dummyent)

      // sound
      betty.addComponentOrReplace(
        new AudioSource(resources.sounds.robots.betty)
      )
      betty.getComponent(AudioSource).playOnce()

      // dialog UI
      betty.talk(BettyDialog)
    },
    {
      faceUser: true,
      portrait: {
        path: 'images/portraits/betty.png',
        height: 256,
        width: 256,
        section: {
          sourceHeight: 384,
          sourceWidth: 384,
        },
      },
      onlyETrigger: true,
      reactDistance: 8,
      onWalkAway: () => {
        betty.playAnimation('Goodbye', true, 2)
      },
    }
  )

  const bettyRings = new Entity()
  bettyRings.addComponent(ringShape)
  bettyRings.addComponent(
    new Transform({
      position: new Vector3(0, -0.65, 0),
    })
  )
  belaRings.setParent(betty)

  charlie = new NPC(
    {
      position: new Vector3(269.5, 5.35, 42.6),
      rotation: Quaternion.Euler(0, -90, 0),
    },
    resources.models.robots.charlie,
    () => {
      // animations
      charlie.playAnimation('Hello', true, 2)

      let dummyent = new Entity()
      dummyent.addComponent(
        new NPCDelay(2, () => {
          bela.playAnimation('Talk')
        })
      )
      engine.addEntity(dummyent)

      // sound
      charlie.addComponentOrReplace(
        new AudioSource(resources.sounds.robots.charlie)
      )
      charlie.getComponent(AudioSource).playOnce()

      // dialog UI
      charlie.talk(CharlieDialog)
    },
    {
      faceUser: true,
      portrait: {
        path: 'images/portraits/charlie.png',
        height: 256,
        width: 256,
        section: {
          sourceHeight: 384,
          sourceWidth: 384,
        },
      },
      onlyETrigger: true,
      reactDistance: 8,
      onWalkAway: () => {
        charlie.playAnimation('Goodbye', true, 2)
      },
    }
  )

  const charlieRings = new Entity()
  charlieRings.addComponent(ringShape)
  charlieRings.addComponent(
    new Transform({
      position: new Vector3(0, -0.65, 0),
    })
  )
  charlieRings.setParent(charlie)

  marsha = new NPC(
    {
      position: new Vector3(50.945, 9.65, 31.1),
    },
    resources.models.robots.marsha,
    () => {
      // animations
      marsha.playAnimation('Hello', true, 2)

      let dummyent = new Entity()
      dummyent.addComponent(
        new NPCDelay(2, () => {
          bela.playAnimation('Talk')
        })
      )
      engine.addEntity(dummyent)

      // sound
      marsha.addComponentOrReplace(
        new AudioSource(resources.sounds.robots.marsha)
      )
      marsha.getComponent(AudioSource).playOnce()

      // dialog UI
      marsha.talk(MarshaDialog)
    },
    {
      faceUser: true,
      portrait: {
        path: 'images/portraits/marsha.png',
        height: 256,
        width: 256,
        section: {
          sourceHeight: 384,
          sourceWidth: 384,
        },
      },
      onlyETrigger: true,
      reactDistance: 8,
      onWalkAway: () => {
        marsha.playAnimation('Goodbye', true, 2)
      },
    }
  )

  const marshaRings = new Entity()
  marshaRings.addComponent(ringShape)
  marshaRings.addComponent(
    new Transform({
      position: new Vector3(0, -0.65, 0),
    })
  )
  marshaRings.setParent(marsha)

  bob = new NPC(
    {
      position: new Vector3(165.573, 11.5, 252.79),
      rotation: Quaternion.Euler(0, 35, 0),
    },
    resources.models.robots.bob,
    () => {
      // animations
      bob.playAnimation('Hello', true, 2)

      let dummyent = new Entity()
      dummyent.addComponent(
        new NPCDelay(2, () => {
          bela.playAnimation('Talk')
        })
      )
      engine.addEntity(dummyent)

      // sound
      bob.addComponentOrReplace(new AudioSource(resources.sounds.robots.bob))
      bob.getComponent(AudioSource).playOnce()

      // dialog UI
      bob.talk(BobDialog)
    },
    {
      faceUser: true,
      portrait: {
        path: 'images/portraits/bob.png',
        height: 256,
        width: 256,
        section: {
          sourceHeight: 384,
          sourceWidth: 384,
        },
      },
      onlyETrigger: true,
      reactDistance: 8,
      onWalkAway: () => {
        bob.playAnimation('Goodbye', true, 2)
      },
    }
  )

  const bobRings = new Entity()
  bobRings.addComponent(ringShape)
  bobRings.addComponent(
    new Transform({
      position: new Vector3(0, -0.65, 0),
    })
  )
  bobRings.setParent(bob)

  log("grumpy computed pos ")


log("grumpy computed pos " 
  ,new Vector3(lobbyCenter.x-1.2, lobbyHeight+3, lobbyCenter.z-6.4)
  ,new Vector3( 159.90313720703125,  105.0605697631836,  145.15061950683594))
  
  grumpyElf = new NPC(
    { 
      //position: new Vector3(69.5, 0.5, 7.2) 
      position: new Vector3(lobbyCenter.x-2, lobbyHeight+1, lobbyCenter.z-3) //1.1 was eye level but too high?
      //position: new Vector3( 159.90313720703125,  105.0605697631836,  145.15061950683594)
    }, 
    //{ position: new Vector3(0,.15,0) },
    resources.models.robots.xmasElf,
    () => {
      // animations
      grumpyElf.playAnimation('Greet_Bell', true, 4)//Worried_Bell,Greet_Bell

      /*
      let dummyent = new Entity()
      dummyent.addComponent(
        new NPCDelay(2, () => {
          bela.playAnimation('Talk')
        })
      )
      engine.addEntity(dummyent)*/

      // sound
      /*
      betty.addComponentOrReplace(
        new AudioSource(resources.sounds.robots.betty)
      )
      betty.getComponent(AudioSource).playOnce()*/

      // dialog UI
      grumpyElf.talk(GrumpyElfDialog)
    },
    {
      idleAnim: `Idle_Bell_02`,
      faceUser: true,
      portrait: {
        path: 'images/portraits/xmas/elf_03.png',
        height: 256,
        width: 256,
        section: {
          sourceHeight: 256,
          sourceWidth: 256,
        },
      },
      onlyETrigger: false,
      reactDistance: 8,
      onWalkAway: () => {
        grumpyElf.playAnimation('Worried_Bell', true, 4)
      },
    }
  )


  
  const xmasDroneHost = new Entity('xmasDroneHost-xmas')
  engine.addEntity(xmasDroneHost)
  xmasDroneHost.setParent(grumpyElf)
  xmasDroneHost.addComponent(new Transform({
      position: new Vector3(0, -0.15, .1),
      scale: new Vector3(1, 1, 1) ,
      rotation: Quaternion.Euler(0, 20, 0)
    }))

  const xmasDroneHostShape = new GLTFShape('models/xmas/Drone-propellers-anim.glb')
  xmasDroneHostShape.withCollisions = true
  xmasDroneHostShape.isPointerBlocker = true
  //shape.visible = false

  const droneShape = new Entity('xmasDroneHost-shape' )
  droneShape.setParent(xmasDroneHost)
  droneShape.addComponent(new Transform( { 
    scale: new Vector3(.15,.15,.15) } ))
  droneShape.addComponent(xmasDroneHostShape)

  const startingY = grumpyElf.getComponent(Transform).position.y//transform5TestxmasDroneHost.position.y
  const bounceAmount = .06
  const startVector = grumpyElf.getComponent(Transform).position.clone()
  const endVector= grumpyElf.getComponent(Transform).position.clone()
  endVector.y=startingY+bounceAmount//new Vector3(69.5, startingY+bounceAmount, 7.2) 
  grumpyElf.addComponent(
    new utils.Interval(1000, () => {
      const tr = grumpyElf.getComponent(Transform)
      if(tr.position.y - startingY < .05){
        grumpyElf.addComponentOrReplace(new utils.MoveTransformComponent(startVector, endVector, 1))
      }else{
        grumpyElf.addComponentOrReplace(new utils.MoveTransformComponent(endVector, startVector, 1))
      }
    })
  )



  /*

    {
      idleAnim: `Idle_Bell_01`,
      faceUser: true,
      darkUI: true,
    }*/

  /*
  grumpyElf.dialog = new DialogWindow(
    {
      path: 'images/elf_03.png',
      offsetX: 50,
      offsetY: 30,
      width: 256,
      height: 256,
      section: { sourceWidth: 256, sourceHeight: 256 },
    },
    false,
    null,
    xmasTheme
  )
  grumpyElf.dialog.panel.positionY = 20
  grumpyElf.dialog.leftClickIcon.positionX = 340 - 40
  grumpyElf.dialog.leftClickIcon.positionY = -80 + 40
  grumpyElf.dialog.text.fontSize = 18
  grumpyElf.dialog.text.color = Color4.Black()*/

}
