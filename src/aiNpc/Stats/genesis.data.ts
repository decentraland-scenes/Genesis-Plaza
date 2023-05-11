//Forbiden imports here


//Global access to the game data
class GenesisData {

    readonly startPlayTime: number = Date.now()

    private static instanceRef: GenesisData;

    bdeploy: boolean = false;

    private constructor() {

    }
    public static instance(): GenesisData { return this.instanceRef || (this.instanceRef = new this()); }
}