import { isPreviewMode } from '@decentraland/EnvironmentAPI'


const ENV = "dev";

const DEBUG_FLAGS:Record<string,boolean>={
  "local":true,
  "prd-demo":false,
  "prd":false
}
const CLAIM_TESTING_ENABLED:Record<string,boolean>={
  "local":false,
  "prd-demo":false,
  "prd":false
}
const DEBUG_SHOW_ASTAR_OBSTICLES_FLAG:Record<string,boolean>={
  "local":true,
  "prd-demo":false,
  "prd":true
} 


//rx0ym1.colyseus.dev is hosed, made a new non prod - laashk.colyseus.dev
const COLYSEUS_ENDPOINT_URL: Record<string, string> = {
  local: "ws://127.0.0.1:2567",   
  localColyseus: "ws://127.0.0.1:2567",
  dev: "wss://rnd-colyseus-service.decentraland.today",
  stg: "wss://rnd-colyseus-service.decentraland.today",
  prd: "wss://rnd-colyseus-service.decentraland.org", 
};

const TOUR_DEFAULT_NON_EVENT_DAY = 4

const ADMIN_RIGHTS_ANYONE:Record<string,string[]>={
  "local":["0xbd5b79D53D75497673e699A571AFA85492a2cc74","any"],
  "prd-demo":["0xbd5b79D53D75497673e699A571AFA85492a2cc74"],
  "prd":["0xbd5b79D53D75497673e699A571AFA85492a2cc74","any"]
}
const TOUR_DEFAULT_DAY_VALS:Record<string,number>={
  "local":0,
  "prd-demo":TOUR_DEFAULT_NON_EVENT_DAY,//4 is non event day
  "prd":TOUR_DEFAULT_NON_EVENT_DAY
}


const TOUR_SCHEDULER_INTERVAL_CHECK_VALS:Record<string,number>={
  "local":1,
  "prd-demo":15,//4 is non event day
  "prd":15
}
 
//Request URL: https://decentrally-service.decentraland.net/player/data/put?=3&address=0x9849977a23e0692939fdcbf4c516a9d53f3144d2&key=mvmf_followWhiteRabbitProgress&value=%7B%22activeDay%22%3A0%2C%22daysCompleted%22%3A%5B%7B%22day%22%3A0%2C%22completedOn%22%3A1667872350458%7D%2C%7B%22day%22%3A1%2C%22completedOn%22%3A-1%7D%2C%7B%22day%22%3A2%2C%22completedOn%22%3A-1%7D%2C%7B%22day%22%3A3%2C%22completedOn%22%3A-1%7D%2C%7B%22day%22%3A4%2C%22completedOn%22%3A-1%7D%2C%7B%22day%22%3A5%2C%22completedOn%22%3A-1%7D%5D%2C%22finalDayComplete%22%3Afalse%7D
 
//https://decentrally-service.decentraland.net/admin/player/data/get?=3&address=me&key=test4&value=testxx
const PLAYER_DATA_ENDPOINT_VALS: Record<string, string> = {
  "local": "https://decentrally-service.decentraland.net",//TODO get io 
  "stg": "https://decentrally-service.decentraland.net",
  "prd-demo": "https://decentrally-service.decentraland.org",
  "prd": "https://decentrally-service.decentraland.org",
};
//DO NOT COMMIT WITH REAL VALUES!!!
const PLAYER_DATA_ENDPOINT_STATIC_PARAMS_VALS: Record<string, string> = {
  "local": "",//TODO get io
  "stg": "",
  "prd-demo": "",
  "prd": "",
};
//DO NOT COMMIT WITH REAL VALUES!!!
//""


const ParcelCountX:number = 20
const ParcelCountZ:number = 20
export class Config{
  sizeXParcels:number=ParcelCountX
  sizeZParcels:number=ParcelCountZ
  sizeTourXParcels:number=ParcelCountX + 4
  sizeTourZParcels:number=ParcelCountZ + 4
  sizeX!:number
  sizeY!:number
  sizeZ!:number
  TEST_CONTROLS_ENABLE:boolean  = true

  ADMINS = ADMIN_RIGHTS_ANYONE[ENV]


  DEBUG_SHOW_CONNECTION_INFO = false;
  DEBUG_SHOW_PLAYER_LOGIN_INFO = false;
  
  TEST_CONTROLS_DEFAULT_EXPANDED = false; //if test controls expanded by default


  initAlready:boolean = false 

  COLYSEUS_ENDPOINT_LOCAL = "see #initForEnv";
  COLYSEUS_ENDPOINT_NON_LOCAL = "see #initForEnv"; // prod environment
  COLYSEUS_HTTP_ENDPOINT = "see #initForEnv"; // prod environment

  IN_PREVIEW = false
  FORCE_PREVIEW_ENABLED = true
  
  //do has check, maybe dont do it so always feel like won
  //reward server will enforce if u got it
  CLAIM_DO_HAS_WEARABLE_CHECK = false
   
  PLAYER_DATA_ENDPOINT = PLAYER_DATA_ENDPOINT_VALS[ENV]
  PLAYER_DATA_ENDPOINT_STATIC_PARAMS = PLAYER_DATA_ENDPOINT_STATIC_PARAMS_VALS[ENV]

  DEBUG_ACTIVE_SCENE_TRIGGER_ENABLED = DEBUG_FLAGS[ENV]
  DEBUG_PORTAL_TRIGGER_ENABLED = DEBUG_FLAGS[ENV]

  DEBUG_2D_PANEL_ENABLED = DEBUG_FLAGS[ENV]
  DEBUG_UI_ANNOUNCE_ENABLED = DEBUG_FLAGS[ENV]
  
  DEBUG_SHOW_NPC_PATH = DEBUG_FLAGS[ENV] //if npc path is lit up
  DEBUG_SHOW_ASTAR_OBSTICLES = DEBUG_SHOW_ASTAR_OBSTICLES_FLAG[ENV]

  //START claiming/dispensers
  CLAIM_TESTING_ENABLED = CLAIM_TESTING_ENABLED[ENV]
  CLAIM_DATE_TESTING_ENABLED = false
  //DISPENSER_POSITIONS:DispenserPos[] = [] 
  //END claiming/dispensers
  

  center!:Vector3
  centerGround!:Vector3
  init(){
    const env = ENV;
    
    this.sizeX = ParcelCountX*16
    this.sizeZ = ParcelCountZ*16 
    this.sizeY = (Math.log((ParcelCountX*ParcelCountZ) + 1) * Math.LOG2E) * 20// log2(n+1) x 20 //Math.log2( ParcelScale + 1 ) * 20
    this.center = new Vector3(this.sizeX/2,this.sizeY/2,this.sizeZ/2)
    this.centerGround = new Vector3(this.sizeX/2,0,this.sizeZ/2)
    this.COLYSEUS_ENDPOINT_NON_LOCAL = COLYSEUS_ENDPOINT_URL[env]
    this.COLYSEUS_ENDPOINT_LOCAL = COLYSEUS_ENDPOINT_URL[env]
    this.COLYSEUS_HTTP_ENDPOINT = COLYSEUS_ENDPOINT_URL[env].replace("wss://","https://").replace("ws://","http://")
    
        
  }
}

export const CONFIG = new Config()

export function initConfig(){
  log('stage',CONFIG,"initConfig() with ")// + DEFAULT_ENV)
  CONFIG.init()

  isPreviewMode().then( (val:boolean) =>{
    log("IN_PREVIEW",CONFIG.IN_PREVIEW,val)
    CONFIG.IN_PREVIEW = val || CONFIG.FORCE_PREVIEW_ENABLED
  })
  return CONFIG
}
