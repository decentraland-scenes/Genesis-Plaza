export enum Locations {
  CROWD = 'crowd',
  MAGIC = 'magic',
  MEDIEVAL = '-71,-71',
  SALMONOMICON = '-55,1',
  GOLD = '-71,-38',
  MOLES = '-71,-71', /// NEED REAL LOCATION
  PRESENT = '-40,-49',
}

declare const dcl: any

export function teleport(coords: string) {
  let message = '/goto '.concat(coords).concat('\n').toString()
  //let message = '/goto crowd\n'
  log(message)

  dcl.loadModule('@decentraland/ChatController').then(($: any) => {
    dcl.callRpc($.rpcHandle, 'send', [message])
  })
}
