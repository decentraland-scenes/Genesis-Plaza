/**
 * TODO implement this some day
 * https://www.npmjs.com/package/ts-log
 * https://www.npmjs.com/package/loglevel
 */

/**
 * types of log levels
 */
//export type LoggerLevel =  'ERROR' | 'WARN' | 'INFO'  | 'DEBUG' | 'TRACE' | 'LOG'

export enum LogLevel{
    LOG=5,
    ERROR=4,
    WARN=3,
    INFO=2,
    DEBUG=1,
    TRACE=0
}

/**
 * This is equivalent to:
 * type LogLevelStrings = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
 */
export type LogLevelStrings = keyof typeof LogLevel;

export class LoggingConfiguration{
    static instance:LoggingConfiguration

    defaultLevel: LogLevel = LogLevel.INFO
    
    public static getInstance(): LoggingConfiguration {
        if (!LoggingConfiguration.instance) {
            LoggingConfiguration.instance = new LoggingConfiguration();
        }
    
        return LoggingConfiguration.instance;
    }
}
/*
export type LoggerContextData = {
    channelId?:string
    userId?:string
    displayName?:string
}*/
export class LoggerFactory{
    static loggerRegistry:Record<string,Logger>={}
    static getLogger(name:string){
        let logger = LoggerFactory.loggerRegistry[name]
        if(!logger){
            logger = new Logger(name)
            logger.setLevel( LoggingConfiguration.getInstance().defaultLevel )
            LoggerFactory.loggerRegistry[name] = logger
        }
        return logger
    }
}

export class Logger {
    name:string
    //contextData:LoggerContextData
    level:LogLevel = LogLevel.INFO

    constructor( name:string/*,contextData?:LoggerContextData*/ ){
        this.name = name
       // this.contextData = contextData
    }
    setLevel(level:LogLevel){
        this.level = level
    }

    //2021-03-16 13:58:10.817  INFO [traceid= spanid= parentspanid=] 58189 --- [           main] c.c.c.ConfigServicePropertySourceLocator : Fetching config from server at : http://localhost:8888
    trace(method:string,msg:string,...args:any){
        if( LogLevel.TRACE < this.level ) return
        this.logIt(LogLevel.TRACE,  method, msg, ...args);
    }
    info(method:string,msg:string,...args:any[]){
        if( LogLevel.INFO < this.level ) return
        this.logIt(LogLevel.INFO,  method, msg, ...args);
    }
    log(method:string,msg:string,...args:any[]){
        if( LogLevel.LOG < this.level ) return
        this.logIt(LogLevel.LOG,  method, msg, ...args);
    }
    debug(method:string,msg:string,...args:any[]){
        if( LogLevel.DEBUG < this.level ) return
        this.logIt(LogLevel.DEBUG,  method, msg, ...args);
    }
    warn(method:string,msg:string,...args:any[]){
        if( LogLevel.WARN < this.level ) return
        this.logIt(LogLevel.WARN,  method, msg, ...args);
    }
    error(method:string,msg:string,...args:any[]){
        if( LogLevel.ERROR < this.level ) return
        this.logIt(LogLevel.ERROR,  method, msg,...args);
    }
    logIt(level:LogLevel,method:string,msg:string, ...args:any[]){
        if(msg.indexOf("parse")){
            //debugger
        }
        
        //log("TEST OG NOT ENABLED FOR  ",level,this.level, "level < this.level",level < this.level)
        if( level < this.level ){
            //log("LOG.NOT ENABLED FOR  ",LogLevel[level],'default:',LogLevel[this.level])
            return 
        }
        let contextStr = " "// + this.
        /*if(this.contextData){
            contextStr+=" ["
            if(this.contextData.channelId) contextStr +=this.contextData.channelId
            contextStr+="]";
        }*/
        
        log(LogLevel[level] , contextStr , this.name , method ,":", msg , ...args)
        
    }

    isWarnEnabled(){
        return LogLevel.WARN >= this.level
    }
    isDebugEnabled(){
        return LogLevel.DEBUG  >= this.level
    }
    isInfoEnabled(){
        return LogLevel.INFO  >= this.level 
    }
    isTraceEnabled(){
        return LogLevel.TRACE >= this.level 
    }
    isErrorEnabled(){
        return LogLevel.ERROR >= this.level
    }
}
