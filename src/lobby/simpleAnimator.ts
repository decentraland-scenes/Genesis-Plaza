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
}

const SPRING_CONSTANT = 50

class ItemAnimationSystem {

    group = engine.getComponentGroup(AnimatedItem, Transform)

    update(dt:number){

        for(let item of this.group.entities){
            const info = item.getComponent(AnimatedItem)
            const transform = item.getComponent(Transform)

            if(info.isHighlighted){

                transform.scale = this.springVec3(info.highlightTransform.scale, transform.scale, info.animVeclocity, info.speed*dt)        
                transform.position = this.springVec3(info.highlightTransform.position, transform.position, info.animVeclocity, info.speed*dt)  
            }
            else{
                transform.scale = this.springVec3(info.defaultTransform.scale, transform.scale, info.animVeclocity, info.speed*dt)
                transform.position = this.springVec3(info.defaultTransform.position, transform.position, info.animVeclocity, info.speed*dt)              
                
            }
        }
    }

    springPos(a_Target:number,
        a_Current:number,
        a_currentVelocity:number,            
        a_TimeStep:number 
        ):number
    {
    let currentToTarget = a_Target - a_Current
    let springForce = currentToTarget * 60
    //let dampingForce = -this.currentVelocity * 2 * Math.sqrt( SPRING_CONSTANT );
    let dampingForce = -a_currentVelocity * 10 
    let force = springForce + dampingForce
    a_currentVelocity += force * a_TimeStep
    let displacement = a_currentVelocity * a_TimeStep

    return a_Current + displacement
    }

    springVec3(a_Target:Vector3,
        a_Current:Vector3,
        a_currentVelocity:number,            
        a_TimeStep:number 
        ):Vector3
    {
    let currentToTargetVec = a_Target.subtract(a_Current)
    let currentToTarget = currentToTargetVec.length()
    let springForce = currentToTarget * SPRING_CONSTANT
    let dampingForce = -a_currentVelocity * 2 * Math.sqrt( SPRING_CONSTANT );
    //let dampingForce = -a_currentVelocity * 10 
    let force = springForce + dampingForce
    a_currentVelocity += force * a_TimeStep
    let displacement = a_currentVelocity * a_TimeStep

    return a_Current.add(currentToTargetVec.normalize().multiplyByFloats(displacement,displacement,displacement))
    }
}
engine.addSystem(new ItemAnimationSystem())