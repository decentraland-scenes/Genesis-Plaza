import * as utils from "@dcl/ecs-scene-utils";
import { movePlayerTo } from "@decentraland/RestrictedActions";
import { REGISTRY } from "src/registry";
import { IntervalUtil } from "./utils/interval-util";
//import { JAIL_POS } from "./constants";
//import { getJailPosition } from "./jail";
//import { PingPongComponent } from "./pingPongComponent";

const CLASSNAME = "CameraPanSystem"

const cameraInst = Camera.instance
export class CameraPanSystem implements ISystem{

  enabled:boolean = false
  target:Entity //thing to look at
  targetVec:Vector3 //look at vec, one or other
  playerPos:Vector3 //player position for moveTo, pass jail position
  stopAtMinDistanceEnabled:boolean=false //if stop when hit min dist
  stopDurationEnabled:boolean=false
  stopDurationInterval:IntervalUtil = new IntervalUtil(1000,'delta')
  stopDist:number=.01 //min distance to stop at 
  onMinDistanceReached:(target:Entity)=>void //on min distance callback

  update(dt: number): void {
    if(!this.enabled ) return;

    let targetPos:Vector3=undefined
    //debugger
    if(this.target){
      targetPos = utils.getEntityWorldPosition(this.target)
      //transform.lookAt()
    }else if(this.targetVec){
      targetPos = this.targetVec
    }
    //if has playerPos use it, otherwise take current player position
    const _playerPos = this.playerPos ? this.playerPos : cameraInst.position

    
    //Quaternion.l
    //move 50% each time
    const newPos = Vector3.Lerp( _playerPos , targetPos, .5 )

    //FIXME this is the wrong math.  need when angle is less than
    //const dist = distance( targetPos, cameraDir )

    //log("CameraPanSystem","_playerPos",_playerPos,"stopAtMinDistanceEnabled",this.stopAtMinDistanceEnabled,"stopDist",this.stopDist,"dot")

    if(this.stopAtMinDistanceEnabled){
      //FIXME NOT WORKING, sdk6 bug movePlayerTo keeps erasing the lookat position :(
      // do computed valu wont update
      const cameraDir = Vector3.Forward().rotate(cameraInst.rotation).normalize()
      const targetDir = targetPos.subtract(_playerPos).normalize()
      
      const dot = Vector3.Dot(cameraDir,targetDir)
      //log("CameraPanSystem","_playerPos",_playerPos,"targetPos",targetPos,"newPos",newPos,"stopAtMinDistanceEnabled",this.stopAtMinDistanceEnabled,"stopDist",this.stopDist,"dot",dot,"targetDir",targetDir,"cameraDir",cameraDir,"Camera.instance.rotation",Camera.instance.rotation)
      if((1-dot) < this.stopDist){
        this.endReached()  
      }
    }else if(this.stopDurationEnabled){
      //log("CameraPanSystem","_playerPos",_playerPos,"targetPos",targetPos,"newPos",newPos,"stopDurationEnabled",this.stopDurationEnabled,"cameraInst.rotation",cameraInst.rotation)
      if(this.stopDurationInterval.update(dt)){
        this.endReached()
      }
    }
    movePlayerTo( _playerPos, newPos )
  }
  enable(){
    if(!this.enabled){
      this.enabled = true
      engine.addSystem(this)
    }
  }
  disable(){
    this.enabled = false
    engine.removeSystem(this)
  }
  endReached(){
    this.disable()
    if(this.onMinDistanceReached) this.onMinDistanceReached(this.target)
  }
  lookAtEntity( target:Entity,opts:{stopAtMinDistanceEnabled?:boolean,stopDurationEnabled?:boolean} ){
    log(CLASSNAME,"lookAtEntity",target)
    this.target = target
    this.targetVec = undefined
    
    this.stopAtMinDistanceEnabled = opts && opts.stopAtMinDistanceEnabled ? true : false
    this.stopDurationEnabled = opts && opts.stopDurationEnabled ? true : false
    this.stopDurationInterval.reset()

    this.enable()
  }
  lookAtLocation( targetVec:Vector3,opts:{stopAtMinDistanceEnabled?:boolean,stopDurationEnabled?:boolean} ){
    //log(CLASSNAME,"lookAtLocation",targetVec,"Camera.instance.position",Camera.instance.position)
    this.targetVec = targetVec
    this.target = undefined
    
    this.stopAtMinDistanceEnabled = opts && opts.stopAtMinDistanceEnabled ? true : false
    this.stopDurationEnabled = opts && opts.stopDurationEnabled ? true : false
    this.stopDurationInterval.reset()

    if(!this.enabled){
      this.enabled = true
      engine.addSystem(this)
    }
  }
}

const cameraPanSystem = new CameraPanSystem()
REGISTRY.cameraPanSystem = cameraPanSystem
//engine.addSystem(cameraPanSystem)

/*
//START HACK TESTING STARTS HERE
    
const posA = new Vector3(1,3,16)
const posB = new Vector3(16,3,16)

const bouncyTestCube = new Entity()
bouncyTestCube.addComponent( new BoxShape() )
bouncyTestCube.addComponent(new Transform({
  position:posA
}))

engine.addEntity(bouncyTestCube)
bouncyTestCube.addComponent( new PingPongComponent(4,6,16,()=>{

}))

cameraPanSystem.target = bouncyTestCube
cameraPanSystem.playerPos = getJailPosition()// JAIL_POS.clone()

//END HACK TESTING STARTS HERE
*/
/*
let counter = 0
const timerEnt = new Entity()
timerEnt.addComponent( new utils.Interval(1000,()=>{
  if(counter %2==0){

  }else{

  }
  counter++
}) )
engine.addEntity(timerEnt)
*/
