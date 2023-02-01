import { NoArgCallBack } from './resources/globals'

@Component("AnimatedItem")
export class AnimatedItem {  
    wasClicked:boolean = false
    isHighlighted:boolean = false
    defaultTransform:TransformConstructorArgs 
    highlightTransform:TransformConstructorArgs
    animFraction:number = 0
    animVeclocity:number = 0
    speed:number = 2   
    done:boolean = false

    constructor(
        _defaultTransform:TransformConstructorArgs, 
        _highlightTransform:TransformConstructorArgs, 
        _speed:number        
        )
        {
        this.defaultTransform = _defaultTransform
        this.highlightTransform = _highlightTransform       
        this.speed = _speed        
    }
    
    activate(){
        this.isHighlighted = true
        this.done = false
    }

    deactivate(){
        this.isHighlighted = false
        this.done = false
    }
}

const SPRING_CONSTANT = 50

class ItemAnimationSystem {

    group = engine.getComponentGroup(AnimatedItem, Transform)
    snapThreshold:number = 0.25

    update(dt:number){

        for(let item of this.group.entities){
            const info = item.getComponent(AnimatedItem)
            const transform = item.getComponent(Transform)
            let scaleDone = false
            let positionDone = false

            if(info.isHighlighted){               

                if(!info.done){
                    if(this.distance(info.highlightTransform.scale, transform.scale) > this.snapThreshold){
                        transform.scale = this.LerpTowards(info.highlightTransform.scale, transform.scale)        
                    }
                    else{
                        transform.scale.copyFrom(info.highlightTransform.scale)
                        scaleDone = true
                    }
                        
                    if(this.distance(info.highlightTransform.position, transform.position) > this.snapThreshold){
                        transform.position = this.LerpTowards(info.highlightTransform.position, transform.position)  
                    }
                    else{
                        transform.position.copyFrom(info.highlightTransform.position)
                        positionDone = true
                    }

                    if(positionDone && scaleDone){
                        info.done = true
                    }
                }
                
                    
            }
            else{
                if(!info.done){
                    if(this.distance(info.defaultTransform.scale, transform.scale) > this.snapThreshold){
                        transform.scale = this.LerpTowards(info.defaultTransform.scale, transform.scale, )
                    }                
                    else{
                        transform.scale.copyFrom(info.defaultTransform.scale)
                        scaleDone = true
                    }

                    if(this.distance(info.defaultTransform.position, transform.position) > this.snapThreshold){
                        transform.position = this.LerpTowards(info.defaultTransform.position, transform.position) 
                    }
                    else{
                        transform.position.copyFrom(info.defaultTransform.position)
                        positionDone = true     
                    } 
                    
                    if(positionDone && scaleDone){
                        info.done = true
                    }
                
                }
            }
        }
    }
    distance(vec1:Vector3, vec2:Vector3):number{
        const a = vec1.x - vec2.x
        const b = vec1.y - vec2.y
        const c = vec1.z - vec2.z
        return Math.sqrt(a * a + b * b + c * c )
        
    }

    // springPos(a_Target:number,
    //     a_Current:number,
    //     a_currentVelocity:number,            
    //     a_TimeStep:number 
    //     ):number
    // {
    // let currentToTarget = a_Target - a_Current
    // let springForce = currentToTarget * 60
    // //let dampingForce = -this.currentVelocity * 2 * Math.sqrt( SPRING_CONSTANT );
    // let dampingForce = -a_currentVelocity * 10 
    // let force = springForce + dampingForce
    // a_currentVelocity += force * a_TimeStep
    // let displacement = a_currentVelocity * a_TimeStep

    // return a_Current + displacement
    // }

    // springVec3(a_Target:Vector3,
    //     a_Current:Vector3,
    //     a_currentVelocity:number,            
    //     a_TimeStep:number 
    //     ):Vector3
    // {
    // let currentToTargetVec = a_Target.subtract(a_Current)
    // let currentToTarget = currentToTargetVec.length()
    // let springForce = currentToTarget * SPRING_CONSTANT
    // let dampingForce = -a_currentVelocity * 2 * Math.sqrt( SPRING_CONSTANT );
    // //let dampingForce = -a_currentVelocity * 10 
    // let force = springForce + dampingForce
    // a_currentVelocity += force * a_TimeStep
    // let displacement = a_currentVelocity * a_TimeStep

    // return a_Current.add(currentToTargetVec.normalize().scale(displacement))
    // }

    LerpTowards(
        a_Target:Vector3,
        a_Current:Vector3
        ):Vector3{

        return Vector3.Lerp(a_Current, a_Target, 0.5)
    }
}
engine.addSystem(new ItemAnimationSystem())