//TODO move to common location


export function distance(pos1: Vector3, pos2: {x:number,y:number,z:number}): number {
    const a = pos1.x - pos2.x
    const b = pos1.z - pos2.z
    return a * a + b * b
}
  
export function realDistance(pos1: Vector3, pos2: Vector3): number 
{
    if(!pos1) log("realDist pos1 is null")
    if(!pos2) log("realDist pos2 is null")
    const a = pos1.x - pos2.x
    const b = pos1.z - pos2.z
    return Math.sqrt(a * a + b * b)
}
  
export function ToDegrees(radians:number)
{
    var pi = Math.PI;
    return radians * (180/pi);
}

export function ToRadian(degrees:number)
{
    var pi = Math.PI;
    return degrees * (pi/180);
}


export function drawLineBetween(A:Vector3, B:Vector3, _offsetZ?:number):Entity{
    let offset =  0.05
    if(_offsetZ){
        offset = _offsetZ
    }
    let line = new Entity()
    let dist = realDistance(A,B)
    let rotAngle = ToDegrees( Vector3.GetAngleBetweenVectors(Vector3.Forward(),A.subtract(B),Vector3.Up()) )  
    line.addComponent(new Transform({
        position: Vector3.Lerp(A,B,0.5),
        scale: new Vector3(dist,0.02,1),
        rotation: Quaternion.Euler(0,90+rotAngle,0)
    }))
    line.getComponent(Transform).rotate(Vector3.Right(),90)
    line.getComponent(Transform).position.y += offset
    line.addComponent(new PlaneShape()).withCollisions = false
    engine.addEntity(line)
    //line.addComponent(new MovesWithWorld())
    
    return line
}

export function moveLineBetween(line:Entity, A:Vector3, B:Vector3){
    if(!A) log("moveLineBetween A is null!!!")
    if(!B) log("moveLineBetween B is null!!!")
    let dist = realDistance(A,B)
    let rotAngle = ToDegrees( Vector3.GetAngleBetweenVectors(Vector3.Forward(),A.subtract(B),Vector3.Up()) )  

    line.getComponent(Transform).position = Vector3.Lerp(A,B,0.5)
    line.getComponent(Transform).position.y += 0.02
    line.getComponent(Transform).scale = new Vector3(dist,0.02,1)
    line.getComponent(Transform).rotation = Quaternion.Euler(0,90+rotAngle,0)
    line.getComponent(Transform).rotate(Vector3.Right(),90)        
}

export function percentOfLine(a:Vector3, b:Vector3, c:Vector3):number{
    const percentDist = Vector3.Distance(a,c)/Vector3.Distance(a,b);

    return percentDist
}

export function getProjectedPointOnLineFast(pos:Vector3, v1:Vector3, v2:Vector3):Vector3
{
  // get dot product of e1, e2
  let  e1 = new Vector2(v2.x - v1.x, v2.z - v1.z)
  let  e2 = new Vector2(pos.x - v1.x, pos.z - v1.z)
  let valDp = Vector2.Dot(e1, e2)

  // get squared length of e1
  let len2 = e1.x * e1.x + e1.y * e1.y
  let result = new Vector3((v1.x + (valDp * e1.x) / len2), 0, (v1.z + (valDp * e1.y) / len2))
  
  return result;
}

export function isPointOnSegment(point:Vector3, segA:Vector3, segB:Vector3):boolean{

    let minX = Math.min(segA.x, segB.x)
    let minZ = Math.min(segA.z, segB.z)
    let maxX = Math.max(segA.x, segB.x)
    let maxZ = Math.max(segA.z, segB.z)
    
    
    if(segA.x == segB.x && segA.z == segB.z){
        return false
    }

    if(point.x >= minX && point.x <= maxX && point.z >= minZ && point.z <= maxZ){
        return true
    }else{
        return false
    }
    
}


export function notNull(obj:any):boolean{
    return obj !== null && obj !== undefined
}
export function isNull(obj:any):boolean{
    return obj === null || obj === undefined
}


/**
 * FIXME make synchronize https://spin.atomicobject.com/2018/09/10/javascript-concurrency/
 * https://www.npmjs.com/package/mutexify
 * 
 * @param name - name of the wrapped promise - for debugging
 * @param proc - promise to be synchronized, prevent concurrent execution 
 * @returns 
 */
 export const preventConcurrentExecution = <T>(name:string,proc: () => PromiseLike<T>) => {
    let inFlight: Promise<T> | false = false;
  
    return () => {
      if (!inFlight) {
        inFlight = (async () => {
          try {
            //  log("preventConcurrentExecution",name," start flight")
            return await proc();
          } finally {
            //log("preventConcurrentExecution",name,"  not in flight")
            inFlight = false;
          }
        })();
      }else{
        //log("preventConcurrentExecution",name," not in flight return same as before")
      }
      return inFlight;
    };
  };

  export function formatTime(timeSeconds: number,fractionDigits:number=1): string {
    if(timeSeconds<=0){
      return "00:00.0"
    /*}else if(timeSeconds<60){
      if(timeSeconds<10){
        return "00:0"+timeSeconds.toFixed(1)
      }else{
        return "00:"+timeSeconds.toFixed(1)
      }*/
    }else{
      //debugger
      //timeSeconds+=50
      let minutes = Math.floor((timeSeconds % ( 60 * 60)) / ( 60));
      let seconds = (timeSeconds % ( 60)) ;
    
      return (minutes < 10 ? "0" + minutes : minutes) + ":"+(seconds < 10 ? "0" + seconds.toFixed(1) : seconds.toFixed(fractionDigits))// + "-"+timeSeconds.toFixed(1)
    
    }
  }

export function createEntityForSound(name:string){
  const entSound = new Entity(name)
  entSound.addComponent(new Transform(
    {
      position: new Vector3(0,0,0)
    }
  ))
  const shape=new BoxShape()
  shape.withCollisions = false
  shape.isPointerBlocker = false
  
  engine.addEntity(entSound)
  entSound.setParent(Attachable.AVATAR)

  return entSound
}
export function createEntitySound(name:string,audioClip:AudioClip|AudioSource|AudioStream,volume?:number,loop?:boolean){
  const entSound = createEntityForSound(name)
   
  //entSound.addComponent(shape)
  if(audioClip instanceof AudioClip ){
      entSound.addComponent(new AudioSource(audioClip))
      entSound.getComponent(AudioSource).volume = volume !== undefined ? volume : 0.5
      entSound.getComponent(AudioSource).loop = loop !== undefined && loop == true
  }else{
      entSound.addComponent(audioClip)
      entSound.getComponent(AudioStream).volume = volume !== undefined ? volume : 0.5
      //entSound.getComponent(AudioStream).loop = loop !== undefined && loop == true
  }
  

  return entSound
}