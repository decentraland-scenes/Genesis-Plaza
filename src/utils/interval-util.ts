
export type IntervalUtilType = 'delta'|'abs-time'

export class IntervalUtil {
    type:IntervalUtilType = 'delta'
    elapsedTime: number
    targetTime: number
    lastUpdateTime:number=-1
    onTargetTimeReached: () => void

    onTimeReachedCallback?: () => void

    /**
     * @param millisecs - amount of time in milliseconds
     * @param onTimeReachedCallback - callback for when time is reached
     */
    constructor( millisecs: number,type?:IntervalUtilType, onTimeReachedCallback?: () => void) {
        if(type) this.type = type

        this.elapsedTime = 0
        if(this.type == 'delta'){
            this.targetTime = millisecs / 1000
        }else{
            this.targetTime = millisecs
        }

        this.reset()
        this.onTimeReachedCallback = onTimeReachedCallback
        this.onTargetTimeReached = () => {
            this.elapsedTime = 0
            if (this.onTimeReachedCallback) this.onTimeReachedCallback()
        }
    }

    reset(){
        this.elapsedTime = 0
        if(this.type == 'delta'){
        }else{
            this.lastUpdateTime = Date.now()
        }
    }
    setCallback(onTimeReachedCallback: () => void) {
        this.onTimeReachedCallback = onTimeReachedCallback
    }
    /**
     * 
     * @param dt 
     * @returns false if not hit interval, true if hit interval
     */
    update(dt?:number): boolean{
        const now = Date.now()
        if(this.type == 'delta'){
            this.elapsedTime += dt
        }else{
            
            //real time
            this.elapsedTime += now - this.lastUpdateTime

            //log("this.elapsedTime",this.elapsedTime.toFixed(3))
        }

        this.lastUpdateTime = now

        if(this.elapsedTime > this.targetTime){
            this.onTargetTimeReached()
            return true
            //this.elapsedTime -= this.targetTime //push back
        }

        return false;
    }
    
}