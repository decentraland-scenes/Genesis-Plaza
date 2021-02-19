//import { sendpoap } from './poap'
//piñata

const confettiShape = new GLTFShape('models/bday/confetti.glb')
const hitClip = new AudioClip('sounds/collision_wood_soft_02.mp3')
const hitSource = new AudioSource(hitClip)

const pinataBreakClip = new AudioClip('sounds/smartbomb_01.mp3')
const breakSource = new AudioSource(pinataBreakClip)


const player = Camera.instance

const poapShape = new GLTFShape('models/bday/pinata_poap.glb')

const pinataLocation = new Vector3(243,0,212)

let poapDummy = new Entity()
poapDummy.addComponent(new Transform({position: new Vector3(105,-10,80)}))
poapDummy.addComponent( poapShape)
engine.addEntity(poapDummy)

let confettiDummy = new Entity()
confettiDummy.addComponent(new Transform({
    position: new Vector3(105,-20,80),
    scale: new Vector3(0.1,0.1,0.01)
}))
confettiDummy.addComponent( confettiShape)
engine.addEntity(confettiDummy)

const pinataFrame = new Entity()
const pinataTransform = new Transform({
  position: new Vector3(pinataLocation.x, pinataLocation.y, pinataLocation.z),
  rotation: Quaternion.Euler(0, 20, 0),
  scale: new Vector3(4, 4, 4),
})

pinataFrame.addComponent(new GLTFShape('models/bday/pinata_frame.glb'))
pinataFrame.addComponent(breakSource)
pinataFrame.addComponent(pinataTransform)
engine.addEntity(pinataFrame)

const pinataChainTransform = new Transform({
    position: new Vector3(0, 2.85, 0),
    rotation: Quaternion.Euler(0, 0, 0),
    scale: new Vector3(1, 1, 1),
  })




const pinataChain = new Entity()
pinataChain.addComponent(new GLTFShape('models/bday/pinata_chain.glb'))
pinataChain.addComponent(pinataChainTransform)
pinataChain.setParent(pinataFrame)


const pinataMainTransform = new Transform({
    position: new Vector3(0, -1.85, 0),
    rotation: Quaternion.Euler(0, 0, 0),
    scale: new Vector3(1, 1, 1),
  })


const pinataBroken = new Entity()

pinataBroken.addComponent(new GLTFShape('models/bday/pinata_broken.glb'))
pinataBroken.addComponent(new Transform())
pinataBroken.getComponent(Transform).position.y =-10
pinataBroken.setParent(pinataFrame)
//engine.addEntity(pinataBroken)

function breakPinata(){
    pinataBroken.getComponent(Transform).position.y = 0.01
    pinataFrame.getComponent(AudioSource).playOnce()
    StartPinataConfetti()
    //sendpoap('newyear')
}


let isHit = false
let pinataIsAlive = true
let pinataHP = 15
let chainAmp = 45
let pinataAmp = 30
let vectorToPlayer = new Vector3(0,0,-1)
let rotateAxis = new Vector3(1,0,0)

function hitPinata(){
    pinataMain.getComponent(AudioSource).playOnce()
    if(pinataHP > 0){
        pinataHP--
    }
    else{
        pinataHP = 0

        if(pinataIsAlive){
            pinataIsAlive = false
            log("Pinata destroyed")

            //TRIGGER POAP REWARD
            breakPinata()
            pinataMain.addComponentOrReplace(poapShape)
        }
        
    }
}

const pinataMain = new Entity()
pinataMain.addComponent(new GLTFShape('models/bday/pinata_main.glb'))
pinataMain.addComponent(pinataMainTransform)
pinataMain.addComponent(new OnPointerDown( () => {
    isHit = true
    chainAmp = 45
    pinataAmp = 30
    vectorToPlayer = player.position.subtract(pinataFrame.getComponent(Transform).position).multiplyByFloats(1,0,1).normalize()
   // rotateAxis = Vector3.Left().rotate(Quaternion.FromToRotation(Vector3.Forward(), pinataFrame.getComponent(Transform).position.subtract(player.position)))
    rotateAxis = Vector3.Cross(vectorToPlayer, Vector3.Down())
    
    hitPinata()
},{ button: ActionButton.POINTER, showFeedback: true, hoverText: "HIT PINATA" }))
pinataMain.addComponent(hitSource)
pinataMain.setParent(pinataChain)

// const pinataMain = new Entity()
// pinataMain.addComponent(new GLTFShape('models/piñataInteractive.glb'))
// pinataMain.addComponent(pinataTransform)
// engine.addEntity(pinataMain)

export function ToDegrees(radians)
{
    var pi = Math.PI;
    return radians * (180/pi);
}

export function ToRadian(degrees)
{
    var pi = Math.PI;
    return degrees * (pi/180);
}


class PinataSystem {

    elapsedChainTime:number = 0
    elapsedPinataTime:number = 0
   

    chainDamp:number = 3

    update(dt:number){

        if(isHit){


            const chainTransform = pinataChain.getComponent(Transform)
            const pinataTransform = pinataMain.getComponent(Transform)

            this.elapsedChainTime += dt
            this.elapsedPinataTime += dt

            chainTransform.rotation = Quaternion.RotationAxis(rotateAxis, ToDegrees(Math.sin(this.elapsedChainTime*3) * chainAmp)) 
            pinataTransform.rotation = Quaternion.RotationAxis(rotateAxis, ToDegrees(Math.sin(this.elapsedPinataTime*6) * pinataAmp)) 

            chainAmp -= this.chainDamp*this.chainDamp*dt
            pinataAmp -= this.chainDamp*this.chainDamp*dt

            if (pinataAmp < 0.05){
                pinataAmp = 0
            }
            if (chainAmp < 0.05){
                chainAmp = 0
            }

            if (chainAmp < 0.05 && pinataAmp < 0.05){
                isHit = false                
                this.elapsedChainTime = 0
                this.elapsedPinataTime = 0
            }



        }
    }   
}

engine.addSystem(new PinataSystem())





@Component("confettiSpin")
export class confettiSpin {  
    lifeSpan:number = 10
}

class confettiSystem {

    group = engine.getComponentGroup(confettiSpin, Transform)
   // timeout = 36
    elapsed = 0

    update(dt:number){

       // if(this.elapsed <= this.timeout)
       // {
            this.elapsed += dt

            if(this.elapsed > 20){
                engine.removeSystem(this)
            }
            for(let entity of this.group.entities){
                const cInfo = entity.getComponent(confettiSpin)

                entity.getComponent(Transform).rotate(Vector3.Forward(), dt*75)
                entity.getComponent(Transform).translate(Vector3.Down().multiplyByFloats(0,3*dt,0))
                cInfo.lifeSpan -=dt

                if(entity.getComponent(Transform).position.y < 0){
                    if(cInfo.lifeSpan > 0){
                        entity.getComponent(Transform).position.y += 6
                    }
                    else{
                        entity.getComponent(Transform).position.y = -10
                        entity.removeComponent(confettiSpin)
                    }
                    
                }
            }
       // }

        // else{
        //     while(this.group.entities.length > 0){
        //         engine.removeEntity(this.group.entities[0])
        //     }            
        //     engine.removeSystem(this)
            
        // }
        
    }
}

export function StartPinataConfetti(){

    //CONFETTI
    for (let i=0; i< 5; i++){
        let confetti1 = new Entity()
        confetti1.addComponent(confettiShape)
        confetti1.addComponent(new confettiSpin())
        confetti1.addComponent(new Transform({position: new Vector3(pinataTransform.position.x + Math.random(),  1+Math.random()*5, pinataTransform.position.z  + Math.random()),
            scale: new Vector3(0.2,0.2,0.2),
        rotation: Quaternion.Euler(0,Math.random()*360,Math.random()*360)}))        
        engine.addEntity(confetti1)
    }

    engine.addSystem(new confettiSystem())
    //mySounds.playCelebrationMusic()
}

