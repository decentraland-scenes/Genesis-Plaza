import { auditoriumCenter } from "../globals"

const confettiShape = new GLTFShape('models/bday/confetti.glb')
const confettiRegionHeight = 110

@Component("confettiBig")
export class confettiBig {  
    lifeSpan:number = 100

    constructor(_lifeSpan:number){
        this.lifeSpan = _lifeSpan
    }
}

export class ConfettiController {

    confettiGroup:Entity[]
    confettiSystem:ConfettiBigSystem

    constructor(){
        this.confettiGroup = []
        this.addAuditoriumConfetti()
        this.confettiSystem = new ConfettiBigSystem()
        engine.addSystem(this.confettiSystem)
    }

    addAuditoriumConfetti(){
        
        for (let i=0; i< 5; i++){
            let confetti1 = new Entity()  
            confetti1.addComponent(confettiShape)          
            confetti1.addComponent(new Transform({position: new Vector3(auditoriumCenter.x + Math.random(),  -20, auditoriumCenter.z  + Math.random()),
                scale: new Vector3(0,0,0),
            rotation: Quaternion.Euler(0,0,0)}))        
            engine.addEntity(confetti1)

            this.confettiGroup.push(confetti1)
            
        }         
    }

    startConfetti(_duration:number){

        this.confettiSystem.setDuration(_duration)
        //CONFETTI
        for (let i=0; i< this.confettiGroup.length; i++){
            
            
            this.confettiGroup[i].addComponentOrReplace(new confettiBig(_duration))
            this.confettiGroup[i].getComponent(Transform).position = new Vector3(auditoriumCenter.x + Math.random(),  1+Math.random()*2 + i*confettiRegionHeight/5, auditoriumCenter.z  + Math.random())
            this.confettiGroup[i].getComponent(Transform).scale = new Vector3(1,1,1)
            this.confettiGroup[i].getComponent(Transform).rotation = Quaternion.Euler(0,Math.random()*360,Math.random()*360)       
                 
            
        }
        
    
            
    }
    
}



class ConfettiBigSystem {

    group = engine.getComponentGroup(confettiBig, Transform)
    duration = 100
    elapsed = 0
    startHeight = 40
    fallSpeed = 10
    cutoffHeight = -10
    
    setDuration(_duration:number){
        this.duration = _duration
        this.elapsed = 0
    }

    update(dt:number){
       
        this.elapsed += dt        

        for(let entity of this.group.entities){
            const cInfo = entity.getComponent(confettiBig)

            entity.getComponent(Transform).rotate(Vector3.Forward(), dt*35)
            entity.getComponent(Transform).translate(Vector3.Down().multiplyByFloats(0, this.fallSpeed*dt, 0))
            cInfo.lifeSpan -=dt

            if(entity.getComponent(Transform).position.y < this.cutoffHeight){
                if(cInfo.lifeSpan > 0){
                    entity.getComponent(Transform).position.y += confettiRegionHeight
                }
                else{
                    entity.getComponent(Transform).position.y = -25
                    entity.removeComponent(confettiBig)
                }
                
            }
        }

        if(this.elapsed > this.duration){
            for(let entity of this.group.entities){
                entity.getComponent(Transform).position.y = -20
                entity.removeComponent(confettiBig)
            }
           // engine.removeSystem(this)
        }
        
    }
}



// export function StartAuditoriumConfetti(){

//     //CONFETTI
//     for (let i=0; i< 5; i++){
//         let confetti1 = new Entity()
//         confetti1.addComponent(confettiShape)
//         confetti1.addComponent(new confettiBig())
//         confetti1.addComponent(new Transform({position: new Vector3(auditorimCenter.x + Math.random(),  1+Math.random()*2 + i*confettiRegionHeight/5, auditorimCenter.z  + Math.random()),
//             scale: new Vector3(3,3,0.5),
//         rotation: Quaternion.Euler(0,Math.random()*360,Math.random()*360)}))        
//         engine.addEntity(confetti1)
//     }

//     engine.addSystem(new confettiBigSystem())    
// }

