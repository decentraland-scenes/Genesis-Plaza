


 export const CUSTOM_CODE_MANUAL_ERROR_MSG = 4001

export function decodeConnectionCode(code: number,theDefault?:string):string {
    switch(code){
      case 1000: return 'Successful operation / regular socket shutdown'
      case 1001: return 'Client is leaving (browser tab closing)'
      case 1002: return 'Endpoint received a malformed frame'
      case 1003: return 'Endpoint received an unsupported frame (e.g. binary-only endpoint received text frame)'
      case 1004: return 'Reserved for internal use'
      case 1005: return 'Expected close status, received none'
      case 1006: return 'No close code frame has been receieved'
      case 1007: return 'Endpoint received inconsistent message (e.g. malformed UTF-8)'
      case 1008: return 'Generic code used for situations other than 1003 and 1009'
      case 1009: return "Endpoint won't process large frame"
      case 1010: return "Client wanted an extension which server did not negotiate"
      case 1011: return "Internal server error while operating"
      case 1012: return "Server/service is restarting"
      case 1013: return "Temporary server condition forced blocking client's request"
      case 1014: return "Server acting as gateway received an invalid response"
      case 1015: return "No	Transport Layer Security handshake failure"
     
      //custom
      case 4401: return "Unable to authenticate your session.  Login and try again."
    }
    if(theDefault!==undefined){
      return theDefault
    }
    return 'Unrecognized Code:'+code;
  }
  export function isErrorCode(code: number) {
    log("isErrorCode " , code  )
    //https://docs.colyseus.io/colyseus/server/room/#table-of-websocket-close-codes
    switch(code){
      case 1000:
      case 1001:
        return false
        break;
      case 1002: //malformed frame
      case 1003: //malformed frame
      case 1004: //reserved
      case 1005: //expected close but did not, is this even an error?
      case 1006:///abnormal close, is this even an error?
      case 1007://inconsitant message, malformed
      case 1008: //policy violation
      case 1009: //close too late,is this even an error?
      case 1010: //extention denied
      case 1011: //server error
      case 1012: //service restarting
      case 1013: //service denied requset temporily
      case 1014: //bad gateway
      case 1015: //tls failure
      //custom
      case 4401: //unauthorized
        return true
      //custom
      case CUSTOM_CODE_MANUAL_ERROR_MSG: //custom error msg
        return true
        break;
    }
    return false
  }
  
    