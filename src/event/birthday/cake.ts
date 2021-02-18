const launchPadCenter = new Vector3(276.414, 3, 263.844)

// Cake
export const cake = new Entity()
cake.addComponent(new GLTFShape("models/bday/cake.glb"))
cake.addComponent(new Transform({
  position: new Vector3(launchPadCenter.x, -15, launchPadCenter.z),
  rotation: Quaternion.Euler(0, 210, 0),
  scale: new Vector3(2.0, 2.0, 2.0)
}))
engine.addEntity(cake)

export const sauce1 = new Entity()
sauce1.addComponent(new GLTFShape("models/bday/cake_sauce_1.glb"))
sauce1.addComponent(new Transform({
  position: new Vector3(0,0,0),
  
}))
sauce1.setParent(cake)



export const sauce2 = new Entity()
sauce2.addComponent(new GLTFShape("models/bday/cake_sauce_2.glb"))
sauce2.addComponent(new Transform({
  position: new Vector3(0,0,0),  
}))

sauce2.setParent(cake)

const soucePoolRoot = new Entity()
soucePoolRoot.addComponent(new Transform({
  position: new Vector3(launchPadCenter.x, 1.8, launchPadCenter.z),
  scale: new Vector3(1,0,1)
}))
engine.addEntity(soucePoolRoot)

export const soucePoolSpiral1 = new Entity()
soucePoolSpiral1.addComponent(new GLTFShape("models/bday/souce_pool_spiral1.glb"))
soucePoolSpiral1.addComponent(new Transform({
  position: new Vector3(0,0,0),
  
}))
soucePoolSpiral1.setParent(soucePoolRoot)

export const soucePoolSpiral2 = new Entity()
soucePoolSpiral2.addComponent(new GLTFShape("models/bday/souce_pool_spiral2.glb"))
soucePoolSpiral2.addComponent(new Transform({
  position: new Vector3(0,0,0),  
}))
soucePoolSpiral2.setParent(soucePoolRoot)

export class CakeSparklerController {
    sparklersTop:Entity[]
    sparklersMid:Entity[]
    sparklersLow:Entity[]

    topScale:Vector3
    midScale:Vector3
    lowScale:Vector3

    constructor(){
        this.sparklersTop = []
        this.sparklersMid = []
        this.sparklersLow = []

        this.topScale = new Vector3(0.8, 1   + Math.random()* 0.5, 0.8)
        this.midScale = new Vector3(0.8, 0.8 + Math.random()* 0.2, 0.8)
        this.lowScale = new Vector3(0.8, 0.5 + Math.random()* 0.2, 0.8)

        this.addSparklers()
    }

    addSparklers(){
  
        let angle = 0
        let count = 4
        let radiusBottomLevel = 2.5
        let radiusMidLevel = 1.5
      
        // -- LOW SPARKLERS
        for(let i=0; i<count; i++){
      
          angle =  (180/count)*i + ((180/count) *0.5) + 90
      
          let pos = Vector3.Forward().rotate(Quaternion.Euler(0, angle ,0)).multiplyByFloats(radiusBottomLevel,radiusBottomLevel,radiusBottomLevel)
          pos.y = 2
         
      
          let sparkler = new Entity()
          sparkler.addComponent(new GLTFShape("models/bday/sparkler.glb"))
          sparkler.addComponent(new Transform({
             position: new Vector3(pos.x,pos.y,pos.z),  
             rotation: Quaternion.Euler(30, angle ,0),
             scale: new Vector3(0,0,0)
           }))
           sparkler.setParent(cake)

           this.sparklersLow.push(sparkler)
        }
        // -- MID SPARKLERS
        for(let i=0; i<count; i++){
      
          angle =  (180/count)*i + ((180/count) *0.5) + 90
      
          let pos = Vector3.Forward().rotate(Quaternion.Euler(0, angle ,0)).multiplyByFloats(radiusMidLevel,radiusMidLevel,radiusMidLevel)
          pos.y = 3
         
      
          let sparkler = new Entity()
          sparkler.addComponent(new GLTFShape("models/bday/sparkler.glb"))
          sparkler.addComponent(new Transform({
             position: new Vector3(pos.x,pos.y,pos.z),  
             rotation: Quaternion.Euler(15, angle ,0),
             scale: new Vector3(0,0,0)
           }))
           sparkler.setParent(cake)

           this.sparklersMid.push(sparkler)
        }
      
        // -- TOP SPARKLERS
        angle = 180
      
        let pos = Vector3.Forward().rotate(Quaternion.Euler(0, angle ,0)).multiplyByFloats(0.75,0.75,0.75)
        pos.y = 3.8
      
      
        let sparkler = new Entity()
        sparkler.addComponent(new GLTFShape("models/bday/sparkler.glb"))
        sparkler.addComponent(new Transform({
          position: new Vector3(pos.x,pos.y,pos.z),  
          rotation: Quaternion.Euler(0, angle ,0),
          scale: new Vector3(0,0,0)
        }))
        sparkler.setParent(cake)

        this.sparklersTop.push(sparkler)
      
        
      }

      startAllSparklers(){
        for (let entity of this.sparklersLow){
            entity.getComponent(Transform).scale = new Vector3(0.8, 0.5 + Math.random()* 0.2, 0.8)
        }
        for (let entity of this.sparklersMid){
            entity.getComponent(Transform).scale = new Vector3(0.8, 0.8 + Math.random()* 0.2, 0.8)
        }
        for (let entity of this.sparklersTop){
            entity.getComponent(Transform).scale = new Vector3(0.8, 1   + Math.random()* 0.5, 0.8)
        }
      }
      stopAllSparklers(){
        for (let entity of this.sparklersLow){
            entity.getComponent(Transform).scale.setAll(0)
        }
        for (let entity of this.sparklersMid){
            entity.getComponent(Transform).scale.setAll(0)
        }
        for (let entity of this.sparklersTop){
            entity.getComponent(Transform).scale.setAll(0)
        }
      }
      startTopSparklers(){         
        for (let entity of this.sparklersTop){
        entity.getComponent(Transform).scale = new Vector3(0.8, 1   + Math.random()* 0.5, 0.8)
        }
      }
      startMidSparklers(){          
        for (let entity of this.sparklersMid){
            entity.getComponent(Transform).scale = new Vector3(0.8, 0.8 + Math.random()* 0.2, 0.8)
        }
      }
      startLowSparklers(){          
        for (let entity of this.sparklersLow){
            entity.getComponent(Transform).scale = new Vector3(0.8, 0.5 + Math.random()* 0.2, 0.8)
        }
      }

}


export class CakeRaiseSystem {

  fraction:number = 0
  speed:number = 0.04
  endHeight:number = 1.0
  startHeight:number = -12

  update(dt: number) {
    const cakeTransform = cake.getComponent(Transform)
    const souceTransform = soucePoolRoot.getComponent(Transform)
    if (this.fraction < 1) {
      this.fraction += dt * this.speed
      cakeTransform.position = Vector3.Lerp(
        new Vector3(cakeTransform.position.x, this.startHeight, cakeTransform.position.z), 
        new Vector3(cakeTransform.position.x, this.endHeight, cakeTransform.position.z),
        this.fraction
        )

        souceTransform.scale.y = this.fraction
    }
    else{
      cakeTransform.position.y = this.endHeight
    }
  }
}
