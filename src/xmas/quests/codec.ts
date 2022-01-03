// class Replacement {
//   from: string
//   to: string
// }

// let conversions: Replacement[] = [
//   { from: '"', to: 'af7gh' },
//   { from: ':', to: 'xxt95' },
//   { from: ',', to: 'd1ph' },
//   { from: 'a', to: '4sgsg8' },
//   { from: 'e', to: 'dy7hnp' },
//   { from: 'i', to: 'o4dhhp' },
//   { from: 'o', to: 'ad09' },
//   { from: 'u', to: '3o84' },
//   { from: 'd', to: 'ag1gp' },
//   { from: 'j', to: '1340js' },
//   { from: 'c', to: '0934n' },
//   { from: 'r', to: '12ji3' },
//   { from: 'g', to: 'o2i3' },
//   { from: 'm', to: 'sdo78a' },
//   { from: 'n', to: 'oi234n' },
//   { from: 's', to: '3oi4' },
//   { from: 't', to: 'pi4lp' },
//   { from: 'p', to: '3oi3' },
//   { from: '1', to: '9fgn' },
//   { from: '2', to: 'sd90' },
//   { from: '3', to: 'ot5tg' },
//   { from: '4', to: 'fg8fg' },
//   { from: '5', to: 'fid0f' },
//   { from: '6', to: '02kp9' },
//   { from: '7', to: 'sdpf9o' },
//   { from: '8', to: '4khj' },
//   { from: '9', to: 'ijf4' },
//   { from: '0', to: 'orr7t' },
// ]

// export function superSecretEncode(input: string) {
//   let encoded: string = encodeStringReplace(input)

//   return Base64.encode(encoded)
// }

// export function superSecretDecode(input: string) {
//   let decoded: string = Base64.decode(input)

//   return decodeStringReplace(decoded)
// }

// export function encodeStringReplace(input: string) {
//   let finalString = input
//   for (let i = 0; i < 2; i++) {
//     for (let conv of conversions) {
//       finalString = finalString.replace(conv.from, conv.to)
//       //log('coding ', conv.from)
//     }
//   }
//   return finalString
// }

// export function decodeStringReplace(input: string) {
//   let finalString = input
//   for (let i = 0; i <= 2; i++) {
//     for (let j = conversions.length - 1; j >= 0; j--) {
//       finalString = finalString.replace(conversions[j].to, conversions[j].from)
//       //log('decoding ', conversions[j].from)
//     }
//   }
//   return finalString
// }

// const Base64 = {
//   // private property
//   _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

//   // public method for encoding
//   encode: function (input: string) {
//     var output: string = ''
//     var chr1, chr2, chr3, enc1, enc2, enc3, enc4
//     var i = 0

//     input = Base64._utf8_encode(input)

//     while (i < input.length) {
//       chr1 = input.charCodeAt(i++)
//       chr2 = input.charCodeAt(i++)
//       chr3 = input.charCodeAt(i++)

//       enc1 = chr1 >> 2
//       enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
//       enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
//       enc4 = chr3 & 63

//       if (isNaN(chr2)) {
//         enc3 = enc4 = 64
//       } else if (isNaN(chr3)) {
//         enc4 = 64
//       }

//       output =
//         output +
//         this._keyStr.charAt(enc1) +
//         this._keyStr.charAt(enc2) +
//         this._keyStr.charAt(enc3) +
//         this._keyStr.charAt(enc4)
//     }

//     return output
//   },

//   // public method for decoding
//   decode: function (input: string) {
//     var output: string = ''
//     var chr1, chr2, chr3
//     var enc1, enc2, enc3, enc4
//     var i = 0

//     input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '')

//     while (i < input.length) {
//       enc1 = this._keyStr.indexOf(input.charAt(i++))
//       enc2 = this._keyStr.indexOf(input.charAt(i++))
//       enc3 = this._keyStr.indexOf(input.charAt(i++))
//       enc4 = this._keyStr.indexOf(input.charAt(i++))

//       chr1 = (enc1 << 2) | (enc2 >> 4)
//       chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
//       chr3 = ((enc3 & 3) << 6) | enc4

//       output = output + String.fromCharCode(chr1)

//       if (enc3 != 64) {
//         output = output + String.fromCharCode(chr2)
//       }
//       if (enc4 != 64) {
//         output = output + String.fromCharCode(chr3)
//       }
//     }

//     output = Base64._utf8_decode(output)

//     return output
//   },

//   // private method for UTF-8 encoding
//   _utf8_encode: function (string: string) {
//     string = string.replace(/\r\n/g, '\n')
//     var utftext: string = ''

//     for (var n = 0; n < string.length; n++) {
//       var c = string.charCodeAt(n)

//       if (c < 128) {
//         utftext += String.fromCharCode(c)
//       } else if (c > 127 && c < 2048) {
//         utftext += String.fromCharCode((c >> 6) | 192)
//         utftext += String.fromCharCode((c & 63) | 128)
//       } else {
//         utftext += String.fromCharCode((c >> 12) | 224)
//         utftext += String.fromCharCode(((c >> 6) & 63) | 128)
//         utftext += String.fromCharCode((c & 63) | 128)
//       }
//     }

//     return utftext
//   },

//   // private method for UTF-8 decoding
//   _utf8_decode: function (utftext: string) {
//     var string: string = ''
//     var i = 0
//     var c = 0
//     var c1 = 0
//     var c2 = 0
//     var c3 = 0

//     while (i < utftext.length) {
//       c = utftext.charCodeAt(i)

//       if (c < 128) {
//         string += String.fromCharCode(c)
//         i++
//       } else if (c > 191 && c < 224) {
//         c2 = utftext.charCodeAt(i + 1)
//         string += String.fromCharCode(((c & 31) << 6) | (c2 & 63))
//         i += 2
//       } else {
//         c2 = utftext.charCodeAt(i + 1)
//         c3 = utftext.charCodeAt(i + 2)
//         string += String.fromCharCode(
//           ((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)
//         )
//         i += 3
//       }
//     }

//     return string
//   },
// }

// // let base41: string = convertBase(base64, 64, 41)

// // log('BASE 41: ', base41)

// // let decodedBase: string = convertBase(base41, 41, 64)

// // log('DECODED FROM BASE 41: ', decodedBase)

// // let validChars =
// //   'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=' //_-{}"=:,

// // function convertBase(value, from_base: number, to_base: number) {
// //   var range = validChars.split('')
// //   var from_range = range.slice(0, from_base)
// //   var to_range = range.slice(0, to_base)

// //   var dec_value = value
// //     .split('')
// //     .reverse()
// //     .reduce(function (carry, digit, index) {
// //       if (from_range.indexOf(digit) === -1)
// //         throw new Error(
// //           'Invalid digit `' + digit + '` for base ' + from_base + '.'
// //         )
// //       return (carry += from_range.indexOf(digit) * Math.pow(from_base, index))
// //     }, 0)

// //   var new_value = ''
// //   while (dec_value > 0) {
// //     new_value = to_range[dec_value % to_base] + new_value
// //     dec_value = (dec_value - (dec_value % to_base)) / to_base
// //   }
// //   return new_value || '0'
// // }
