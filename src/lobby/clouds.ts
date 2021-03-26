import {lobbyCenter, lobbyHeight, lobbyRadius} from './resources/globals'
import * as resource from "./resources/resources"

@Component("CloudRotate")
export class CloudRotate {  
    left:boolean = false
    speed:number = 1  

    constructor(_left:boolean, _speed:number){
        this.left = _left              
        this.speed = _speed              
    }    
}

function addClouds(_count:number, _radius:number, _center:Vector3){

    let angle = 0
    let pos = Vector3.Forward()
    let stepAngle = 360/_count
    let randScale = 1

    for(let i = 0; i< _count; i++){
        angle = i*stepAngle
        let offset = _radius + Math.random()*20
        pos = _center.add(Vector3.Forward().rotate(Quaternion.Euler(0,angle+Math.random()*20,0)).multiplyByFloats(offset, offset ,offset))
        randScale = 1+Math.random()*3
        let cloudDissolve = new Entity()
        cloudDissolve.addComponent(resource.cloudPuffShape)
        cloudDissolve.addComponent(
          new Transform({
              position: new Vector3(pos.x, pos.y-Math.random()*3, pos.z),
              rotation: Quaternion.Euler(Math.random()*360, Math.random()*360, Math.random()*360),
              scale: new Vector3(randScale, randScale, randScale)
          })
        )
        engine.addEntity(cloudDissolve)
    }
}

addClouds(
    16, 
    20, 
    new Vector3(lobbyCenter.x, lobbyHeight, lobbyCenter.z)
    )


    let cloudsSmall = new Entity()
    
    cloudsSmall.addComponent(
      new Transform({
          position: new Vector3(lobbyCenter.x,lobbyHeight-0.2,lobbyCenter.z),
          rotation: Quaternion.Euler(0, 0, 0),
          scale: new Vector3(1.0,1.0,1.0)          
      })
    )
    cloudsSmall.addComponent(resource.cloudSmallShape)
    cloudsSmall.addComponent(new CloudRotate(false,2))
    engine.addEntity(cloudsSmall)

    let cloudsSmall2 = new Entity()
    
    cloudsSmall2.addComponent(
      new Transform({
          position: new Vector3(lobbyCenter.x,lobbyHeight-0.2,lobbyCenter.z),
          rotation: Quaternion.Euler(0, 0, 0),          
      })
    )
    cloudsSmall2.addComponent(resource.cloudSmall2Shape)
    cloudsSmall2.addComponent(new CloudRotate(true,1.5))
    engine.addEntity(cloudsSmall2)

    let cloudsBig = new Entity()
    
    cloudsBig.addComponent(
      new Transform({
          position: new Vector3(lobbyCenter.x,lobbyHeight,lobbyCenter.z),
          rotation: Quaternion.Euler(0, 0, 0),          
      })
    )
    cloudsBig.addComponent(resource.cloudBigShape)
    cloudsBig.addComponent(new CloudRotate(true,1))
    engine.addEntity(cloudsBig)

    class CloudSystem {        
      
      groupClouds = engine.getComponentGroup(CloudRotate, Transform)

      update(dt: number) {       
        
        for(let entity of this.groupClouds.entities){
          const transform = entity.getComponent(Transform)
          const info = entity.getComponent(CloudRotate)

          if(info.left){
            transform.rotate(Vector3.Down(), info.speed*dt)
          }
          else{
            transform.rotate(Vector3.Up(), info.speed*dt)
          }
         
        }
        
      }
    }
    engine.addSystem(new CloudSystem())