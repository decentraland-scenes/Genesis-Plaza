//cannot import this or will cause cylic depedency
//import { CONFIG, initConfig } from "src/config"

//import { CONFIG } from "src/config"

//initConfig()


export function initClaimConfig(){

}

const PROD_PARCHUTE_CAMP_KEY = "PROVIDE_PRODUCTION_KEY_HERE"
const PROD_PARCHUTE_CAMP_KEY_KRAKEN = "PROVIDE_PRODUCTION_KEY_HERE"


function toStringURLArray(wearableInstArr: WearableEnumInst[]): string[] {
  const urnArr: string[] = []
  for (const p in wearableInstArr) {
    const urn = wearableInstArr[p].urn
    if (urn !== undefined) {
      urnArr.push(urn)
    }
  }
  return urnArr
}

export type WearableEnumConstructorArg = {
  address?: string
  urn?: string
  name?: string
  itemId?: string
}
export class WearableEnumInst {
  name?: string
  address?: string
  urn?: string
  itemId?: string

  constructor(args: WearableEnumConstructorArg) {
    if (args && args.name) this.name = args.name
    if (args && args.address) this.address = args.address
    if (args && args.itemId) this.itemId = args.itemId
    if (args && args.urn) this.urn = args.urn
    if (this.address && this.itemId && this.urn) {
      if (this.urn.indexOf(this.address + ":" + this.itemId)) {
        log("WARNING address + itemId vs urn missmatch!!", this.urn, "vs", this.address, this.itemId, "for", this.name)
        log("WARNING address + itemId vs urn missmatch!!", this.urn, "vs", this.address, this.itemId, "for", this.name)
        log("WARNING address + itemId vs urn missmatch!!", this.urn, "vs", this.address, this.itemId, "for", this.name)
      }
    } else if (this.address && this.urn) {
      if (this.urn.indexOf(this.address)) {
        log("WARNING address  vs urn missmatch!!", this.urn, "vs", this.address, this.itemId, "for", this.name)
        log("WARNING address  vs urn missmatch!!", this.urn, "vs", this.address, this.itemId, "for", this.name)
        log("WARNING address  vs urn missmatch!!", this.urn, "vs", this.address, this.itemId, "for", this.name)
      }
    }
  }
}
//json is json copied from reward server UI
function createWerableEnumInst(json:{collectionAddress:string,collectionName:string,itemName:string,itemId:string,rarity:string}){
  return new WearableEnumInst({ name: json.itemName, address: json.collectionAddress, itemId: json.itemName, urn: 'urn:decentraland:matic:collections-v2:'+json.collectionAddress+':'+json.itemId+'' })
}
export class WearableEnum {
  //0 is bucket hat
  //2 is raincoat

  static PLACEHOLDER_TODO_NEED_ACTUAL_WEARBLE_DATA_HERE = new WearableEnumInst({ name: "PLACEHOLDER_TODO_NEED_ACTUAL_WEARBLE_DATA_HERE", address: "0xa4a345afb8fa378cdabc68e83e1a578c810f0abb", itemId: "5", urn: 'urn:decentraland:matic:collections-v2:0xa4a345afb8fa378cdabc68e83e1a578c810f0abb:5' })

    static HAND_WEARABLE = createWerableEnumInst(
        { "collectionAddress": "0xbdbee960fb7ce6267c467665dea046d0a4849cda", "collectionName": "Adidas DCL Wallrunner", "itemName": "Adidas Virtual Gear MVFW23", "itemId": "0", "rarity": "rare" }
    )
    //static CK_BUBBLES = createWerableEnumInst(
    //    { "collectionAddress": "0x37d6fa1df63975056d444f72f268cd7c1251a053", "collectionName": "MVFW 2023 Bubble Babes Space Age", "itemName": "Bubble Babes Space Bow", "itemId": "1", "rarity": "rare" }
    //)
}

//const TEST_CAMPAIGN_ID = '649c5e38-bef8-4bd6-b13f-bd6a2bdcc096'
//const TEST_CAMPAIGN_KEY = 'eyJpZCI6ImJjMmQ1NWRjLWY3Y2UtNDEyOS05ODMxLWE5Nzk4ZTlmMTRiMSIsImNhbXBhaWduX2lkIjoiNjQ5YzVlMzgtYmVmOC00YmQ2LWIxM2YtYmQ2YTJiZGNjMDk2In0=.ECydl7nxWNUAgPWNgskHcFsqRGArULfHRtMyfc1UXIY='

const TEST_CAMPAIGN_ID = '7a7c87db-801a-4427-bf2b-2fab3d518b58'
//captcha
//const TEST_CAMPAIGN_KEY = 'eyJpZCI6Ijg4ZTdmYmVlLTQzYTctNGUwMy1hNWQzLTY4NmY3YjIzODkyYSIsImNhbXBhaWduX2lkIjoiN2E3Yzg3ZGItODAxYS00NDI3LWJmMmItMmZhYjNkNTE4YjU4In0=.z6mAsJ2YmjhQAbXwZ5hSMbiMvJ0iHIq2fwtWktmDeRM='
//non cpatcha
const TEST_CAMPAIGN_KEY = 'eyJpZCI6IjY2NThmOGRiLWZjNGItNDQyMC05NTUzLWYyZDQxODRjZDY3YiIsImNhbXBhaWduX2lkIjoiN2E3Yzg3ZGItODAxYS00NDI3LWJmMmItMmZhYjNkNTE4YjU4In0=.lu0GNQ/5Tjl4QvAvJuFJ5hhjIPfyaeqVcWluMX/3WyY='


const PROVIDE_PRODUCTION_KEY_HERE = "4f39311b-8bd6-4dc0-b481-d2d12350a1b7"
/**
 * artnet
 * burton
 * dcl_artweek
 * dcl_artweek_px
 */

//workaround will rewrite in booststrap
const CONFIG_CLAIM_TESTING_ENABLED = false



export type ClaimConfigInstType = {
  refId: string,
  campaign: string,
  campaignKeys: Record<string,string>
  wearableUrnsToCheck: string[]
}

 

export const ClaimConfig = {
  //rewardsServer: CONFIG_CLAIM_TESTING_ENABLED ? 'https://rewards.decentraland.io' : 'https://rewards.decentraland.org',
  rewardsServer: CONFIG_CLAIM_TESTING_ENABLED ? 'https://rewards.decentraland.zone' : 'https://rewards.decentraland.org',
    campaign: {
        HAND: {
            refId: "hand-wearable",
            campaign: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_ID : "",
            campaignKeys: {
                key1: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY
                    : "",
                  },
                  wearableUrnsToCheck: toStringURLArray([
                      WearableEnum.HAND_WEARABLE
                  ])
              },
              //CK: {
              //    refId: "ck",
              //    campaign: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_ID : "b4d4b83a-badf-4e2c-b069-ddc61bde1ec2",
              //    campaignKeys: {
              //        key1: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY
              //            : "PROVIDE_PRODUCTION_KEY_HERE",
              //    },
              //    wearableUrnsToCheck: toStringURLArray([
              //        WearableEnum.CK_BUBBLES
              //    ])
              //},
        }
}

export function updateConfigToTesting(testing:boolean){
  if(testing==false){
    return;
  }
  log("updateConfigToTesting in testing rewriting all")
  ClaimConfig.rewardsServer = 'https://rewards.decentraland.zone'
  for(const p in ClaimConfig.campaign){
    const obj = (ClaimConfig.campaign as any)[p]

    if(obj !== undefined){
        obj.campaign = TEST_CAMPAIGN_ID
      if(obj.campaignKeys !== undefined){
        for(const q in obj.campaignKeys){
          obj.campaignKeys[q] = TEST_CAMPAIGN_KEY
        }
      }
    }
  }
}