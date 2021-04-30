export function splitTextIntoLines(
  text: string,
  maxLenght: number,
  maxLines?: number
) {
  let finalText: string = ''
  for (let i = 0; i < text.length; i++) {
    let lines = finalText.split('\n')

    if (lines[lines.length - 1].length >= maxLenght && i !== text.length) {
      if (finalText[finalText.length - 1] !== ' ') {
        if (maxLines && lines.length >= maxLines) {
          finalText = finalText.concat('...')
          return finalText
        } else {
          finalText = finalText.concat('-')
        }
      }
      finalText = finalText.concat('\n')
      if (text[i] === ' ') {
        continue
      }
    }

    finalText = finalText.concat(text[i])
  }

  return finalText
}

export function cleanString(input) {
  var output = "";
  for (var i=0; i<input.length; i++) {
      if (input.charCodeAt(i) <= 127 || input.charCodeAt(i) >= 160 && input.charCodeAt(i) <= 255) {
          output += input.charAt(i);
      }
  }
  return output;
}

export function wordWrap(str:string, maxWidth:number, maxLines:number) {
  let newLineStr = "\n"
  let done = false 
  let res = ''
  let linesSeparate = str.split(newLineStr)
  let lines = ''

  //log("original lines: " + str.split(newLineStr).length)
  
for( let j=0; j< linesSeparate.length; j++){
  res = ''
  done = false 
  //process each line for linebreaks
  while (linesSeparate[j].length > maxWidth) {  
   
    let found = false;
    // Inserts new line at first whitespace of the line
    for (let i = maxWidth - 1; i >= 0; i--) {
        if (testWhite(linesSeparate[j].charAt(i))) {
            res = res + [linesSeparate[j].slice(0, i), newLineStr].join('');
            linesSeparate[j] = linesSeparate[j].slice(i + 1);
            found = true;            
            break;
        }
    }
    // Inserts new line at maxWidth position, the word is too long to wrap
    if (!found) {
        res += [linesSeparate[j].slice(0, maxWidth), newLineStr].join('');
        linesSeparate[j] = linesSeparate[j].slice(maxWidth);        
    }
  } 

  lines +=  res + linesSeparate[j] + "\n"

}
    
  
  //let lines = res + str
  let finalLines = lines.split('\n') 
  let croppedResult = ''

  for(let i=0; i < maxLines && i < finalLines.length; i++){
    croppedResult += finalLines[i] + '\n'  
  }
  if(finalLines.length > maxLines){
    croppedResult += '...'
  }

  return croppedResult;
}

function testWhite(x:string) {
  var white = new RegExp(/^\s$/);
  return white.test(x.charAt(0));
}


export function shortenText(text: string, maxLenght: number) {
  let finalText: string = ''

  if (text.length > maxLenght) {
    finalText = text.substring(0, maxLenght)
    finalText = finalText.concat('...')
  } else {
    finalText = text
  }

  return finalText
}

export function monthToString(_monthID:number):string{
  
  switch(_monthID){
    case 0: {
      return "Jan"
    }
    case 1: {
      return "Feb"
    }
    case 2: {
      return "Mar"
    }
    case 3: {
      return "Apr"
    }
    case 4: {
      return "May"
    }
    case 5: {
      return "Jun"
    }
    case 6: {
      return "Jul"
    }
    case 7: {
      return "Aug"
    }
    case 8: {
      return "Sep"
    }
    case 9: {
      return "Oct"
    }
    case 10: {
      return "Nov"
    }
    case 11: {
      return "Dec"
    }
  }
  
  return "N/A"
}
