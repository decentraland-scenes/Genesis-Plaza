
//https://www.toni-develops.com/2022/04/12/moving-average-from-data-stream/?utm_source=rss&utm_medium=rss&utm_campaign=moving-average-from-data-stream
//consider altering with this http://www.zrzahid.com/moving-average-of-last-n-numbers-in-a-stream/
//shift has an N cost still https://stackoverflow.com/questions/22614237/javascript-runtime-complexity-of-array-functions/22615787
 export class MovingAverage {
    size:number
    queue:number[]
    average:number
    sum:number
    head:number;
    numberCnt:number // how many we have
    /**
     * @param {number} size
     */
    constructor(size:number){
        this.size = size;
        this.queue = [];
        //init
        for(let x=0;x<this.size;x++){
            this.queue.push(0)
        }
        this.average = 0.0;
        this.sum = 0
        this.head = 0
        this.numberCnt = 0
    }
    add(val:number) {
        if(false){
            if(this.queue.length >= this.size) {
                //PERFORMANCE BOOST: //consider altering with this http://www.zrzahid.com/moving-average-of-last-n-numbers-in-a-stream/
                let removedVal = this.queue.shift();
                this.sum = this.sum - removedVal;
            }
            this.queue.push(val);
            
            this.sum += val;
            //console.log(this.average / this.queue.length);
            this.average = this.sum / this.queue.length;
        }else{
            let prevSum = this.sum //this.numberCnt*this.average;
		
            if(this.numberCnt == this.size){
                prevSum-=this.queue[this.head];
                this.numberCnt--;
            }
            
            this.head = (this.head+1)%this.size;
            const emptyPos = (this.size+this.head-1)%this.size;
            this.queue[emptyPos] = val;
            
            const newSum = prevSum+val;
            this.sum = newSum
            this.numberCnt++;
            this.average = newSum/this.numberCnt;
        }
    };
};