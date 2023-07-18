import { clapMeterBoard } from "./clapMeter"
import { hand } from "./hand"
import { loot } from "./loot"

class HandParty {
    isStarted: boolean = false

    constructor() {

    }
    init() {
        clapMeterBoard.activate()
    }
    start() {
        if (!this.isStarted) {
            this.isStarted = true

            //show hand model
            hand.handAppear()

            //
            clapMeterBoard.isPartyStarted = true
        }
    }
    stop() {
        this.isStarted = false
    }
}

export const handParty = new HandParty()