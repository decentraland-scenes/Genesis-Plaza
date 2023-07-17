import { DispenserPos, ItemData } from "./claimTypes"
import { WearableEnum, WearableEnumInst } from "./loot-config"


export function testForAddress(data:ItemData,wearable:WearableEnumInst):boolean{
    //address in image workaround for now
    //example https://peer-lb.decentraland.org/lambdas/collections/contents/urn:decentraland:matic:collections-v2:0xaca87498d8eb13c1209373bf5bfcf98a55c24b3a:1/thumbnail
    const matchedImage = ( wearable.address  !== undefined && data.image.toLocaleLowerCase().indexOf(wearable.address.toLocaleLowerCase())>0 )
    
    const val =matchedImage
    log("testForAddress",data,wearable,val,"matchedImage",matchedImage,wearable.urn) 
    return val
}


export function testForPortableXP(data:ItemData):boolean{
    //TODO can we detect portable xp?
    return false
}

//get a diff backdrop black on black hard to see
export function testForExpression(data:ItemData):boolean{
    //TODO can we detect expressions?
    return false
}

export function testForWearable(data:ItemData,wearable:WearableEnumInst):boolean{
    const matchedToken = (wearable.urn !== undefined && (data.token === wearable.urn||data.token === wearable.name))
    const matchedTarget = false//(wearable.address !== undefined && data.target === wearable.address) for this its not specific enough because they share
    const matchedImage = ( wearable.urn  !== undefined && data.image.toLocaleLowerCase().indexOf(wearable.urn.toLocaleLowerCase())>0 )
    
    const val = matchedToken
                || matchedTarget
                || matchedImage
    log("testForWearable",data,wearable,val,"matchedToken",matchedToken,"matchedTarget",matchedTarget,"matchedImage",matchedImage,wearable.urn) 
    return val
}


export function customResolveSourceImageSize(data:ItemData):number{
    let sourceSize = 1024 

    //if 0x956b8d57066fc3d2562de22efd63624a1ba56e35 then its 1024

    if(testForWearable(data,WearableEnum.PLACEHOLDER_TODO_NEED_ACTUAL_WEARBLE_DATA_HERE) ){
        sourceSize = 1024 
    }
    
    return sourceSize
}


export function lookUpDispenserDefByRefId(refId:string,dispensers:DispenserPos[]):DispenserPos|undefined{
    for(const p in dispensers){
        if(dispensers[p].name == refId){
            return dispensers[p]
        }
    }
    return undefined
}