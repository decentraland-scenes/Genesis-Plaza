import { auditorimCenter } from "./globals"

const balloonShape1 = new GLTFShape('models/bday/balloon_group01.glb')
const ballonTravelHeight = 60

@Component("BalloonUpwards")
export class BalloonUpwards {  
    lifeSpan:number = 100
    leftHanded:boolean = false

    constructor(_lifeSpan:number, _leftHanded:boolean){
        this.lifeSpan = _lifeSpan
        this.leftHanded = _leftHanded
    }
}

export class BalloonController {

    balloonGroup1:Entity[]

    constructor(){
        this.balloonGroup1 = []
        this.addBalloons()
    }

    addBalloons(){
        
        for (let i=0; i< 5; i++){
            let balloon = new Entity()            
            balloon.addComponent(new Transform({position: new Vector3(auditorimCenter.x + Math.random(),  -20, auditorimCenter.z  + Math.random()),
                scale: new Vector3(0,0,0),
            rotation: Quaternion.Euler(0,0,0)}))        
            engine.addEntity(balloon)

            this.balloonGroup1.push(balloon)
            
        }         
    }

    startBalloons(_duration:number){

        //Balloons
        for (let i=0; i< this.balloonGroup1.length; i++){
            this.balloonGroup1[i]
            this.balloonGroup1[i].addComponent(balloonShape1)
            this.balloonGroup1[i].addComponent(new BalloonUpwards(_duration, (i%2)?true:false))
            this.balloonGroup1[i].getComponent(Transform).position = new Vector3(auditorimCenter.x + Math.random(),  1+Math.random()*2 + i*ballonTravelHeight/5, auditorimCenter.z  + Math.random())
            this.balloonGroup1[i].getComponent(Transform).scale = new Vector3(1,1,1)
            this.balloonGroup1[i].getComponent(Transform).rotation = Quaternion.Euler(0,Math.random()*360,0)       
                 
            
        }
        engine.addSystem(new BalloonUpSystem(_duration + 20))
    
            
    }
    
}



class BalloonUpSystem {

    group = engine.getComponentGroup(BalloonUpwards, Transform)
    duration = 100
    elapsed = 0
    startHeight = 40
    riseSpeed = 20
    cutoffHeight = 50
    
    constructor(_duration:number){
        this.duration = _duration
    }

    update(dt:number){
       
        this.elapsed += dt        

        for(let entity of this.group.entities){
            const bInfo = entity.getComponent(BalloonUpwards)
            const transform = entity.getComponent(Transform)

           
           if(bInfo.leftHanded){
            transform.rotate(Vector3.Up(), dt*30)
           }
           else{
            transform.rotate(Vector3.Up(), -dt*30)
           }
           transform.translate(Vector3.Up().multiplyByFloats(0, this.riseSpeed*dt, 0))
            bInfo.lifeSpan -=dt

            if(entity.getComponent(Transform).position.y > this.cutoffHeight){
                if(bInfo.lifeSpan > 0){
                    entity.getComponent(Transform).position.y -= this.cutoffHeight
                }
                else{
                    entity.getComponent(Transform).position.y = -20
                    entity.removeComponent(BalloonUpwards)
                }
                
            }
        }

        if(this.elapsed > this.duration){
            for(let entity of this.group.entities){
                entity.getComponent(Transform).position.y = -20
                entity.removeComponent(BalloonUpwards)
            }
           // engine.removeSystem(this)
        }
        
    }
}


