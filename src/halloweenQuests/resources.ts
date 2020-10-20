import { ImageSection } from '../../node_modules/@dcl/ui-utils/utils/types'

export default {
  buttons: {
    buttonE: {
      sourceWidth: 174,
      sourceHeight: 46,
      sourceLeft: 512,
      sourceTop: 662,
    },
    buttonF: {
      sourceWidth: 174,
      sourceHeight: 46,
      sourceLeft: 512,
      sourceTop: 612,
    },
    roundBlack: {
      sourceWidth: 128,
      sourceHeight: 32,
      sourceLeft: 512,
      sourceTop: 458,
    },
    squareBlack: {
      sourceWidth: 128,
      sourceHeight: 32,
      sourceLeft: 646,
      sourceTop: 457,
    },
    roundWhite: {
      sourceWidth: 128,
      sourceHeight: 32,
      sourceLeft: 512,
      sourceTop: 494,
    },
    squareWhite: {
      sourceWidth: 128,
      sourceHeight: 32,
      sourceLeft: 646,
      sourceTop: 493,
    },
    roundSilver: {
      sourceWidth: 128,
      sourceHeight: 32,
      sourceLeft: 512,
      sourceTop: 531,
    },
    squareSilver: {
      sourceWidth: 128,
      sourceHeight: 32,
      sourceLeft: 646,
      sourceTop: 531,
    },
    roundGold: {
      sourceWidth: 128,
      sourceHeight: 32,
      sourceLeft: 512,
      sourceTop: 567,
    },
    squareGold: {
      sourceWidth: 128,
      sourceHeight: 32,
      sourceLeft: 646,
      sourceTop: 567,
    },
  },
  backgrounds: {
    promptBackground: {
      sourceWidth: 416,
      sourceHeight: 352,
      sourceLeft: 501,
      sourceTop: 12,
    },
    promptLargeBackground: {
      sourceWidth: 480,
      sourceHeight: 384,
      sourceLeft: 7,
      sourceTop: 12,
    },
    promptSlantedBackground: {
      sourceWidth: 486,
      sourceHeight: 326,
      sourceLeft: 7,
      sourceTop: 413,
    },
    NPCDialog: {
      sourceWidth: 766,
      sourceHeight: 248,
      sourceLeft: 22,
      sourceTop: 756,
    },
  },
  icons: {
    closeW: {
      sourceWidth: 32,
      sourceHeight: 32,
      sourceLeft: 942,
      sourceTop: 306,
    },
    closeD: {
      sourceWidth: 32,
      sourceHeight: 32,
      sourceLeft: 986,
      sourceTop: 306,
    },
    closeWLarge: {
      sourceWidth: 64,
      sourceHeight: 64,
      sourceLeft: 512,
      sourceTop: 381,
    },
    closeDLarge: {
      sourceWidth: 64,
      sourceHeight: 64,
      sourceLeft: 583,
      sourceTop: 381,
    },
    closeWNoBack: {
      sourceWidth: 24,
      sourceHeight: 24,
      sourceLeft: 946,
      sourceTop: 252,
    },
    closeDNoBack: {
      sourceWidth: 24,
      sourceHeight: 24,
      sourceLeft: 946,
      sourceTop: 214,
    },
    closeWNoBackLarge: {
      sourceWidth: 32,
      sourceHeight: 32,
      sourceLeft: 987,
      sourceTop: 214,
    },
    closeDNoBackLarge: {
      sourceWidth: 32,
      sourceHeight: 32,
      sourceLeft: 987,
      sourceTop: 260,
    },
    FDark: {
      sourceWidth: 32,
      sourceHeight: 32,
      sourceLeft: 950,
      sourceTop: 4,
    },
    FWhite: {
      sourceWidth: 32,
      sourceHeight: 32,
      sourceLeft: 987,
      sourceTop: 4,
    },
    EDark: {
      sourceWidth: 32,
      sourceHeight: 32,
      sourceLeft: 950,
      sourceTop: 40,
    },
    EWhite: {
      sourceWidth: 32,
      sourceHeight: 32,
      sourceLeft: 987,
      sourceTop: 40,
    },
    Timer: {
      sourceWidth: 24,
      sourceHeight: 32.2,
      sourceLeft: 718,
      sourceTop: 388,
    },
    TimerLarge: {
      sourceWidth: 48,
      sourceHeight: 68,
      sourceLeft: 662,
      sourceTop: 386,
    },
    ClickWhite: {
      sourceWidth: 32,
      sourceHeight: 48,
      sourceLeft: 799,
      sourceTop: 389,
    },
    ClickDark: {
      sourceWidth: 32,
      sourceHeight: 48,
      sourceLeft: 757,
      sourceTop: 389,
    },
  },
  checkboxes: {
    on: {
      sourceWidth: 22,
      sourceHeight: 19,
      sourceLeft: 906,
      sourceTop: 629,
    },
    off: {
      sourceWidth: 16,
      sourceHeight: 16,
      sourceLeft: 906,
      sourceTop: 656,
    },
  },
  dayLabels: {
    1: {
      sourceWidth: 58,
      sourceHeight: 24,
      sourceLeft: 939,
      sourceTop: 628,
    },
    2: {
      sourceWidth: 58,
      sourceHeight: 24,
      sourceLeft: 939,
      sourceTop: 661,
    },
    3: {
      sourceWidth: 58,
      sourceHeight: 24,
      sourceLeft: 939,
      sourceTop: 694,
    },
    4: {
      sourceWidth: 58,
      sourceHeight: 24,
      sourceLeft: 939,
      sourceTop: 727,
    },
    5: {
      sourceWidth: 58,
      sourceHeight: 24,
      sourceLeft: 939,
      sourceTop: 760,
    },
  },
  questItems: {
    default: {
      sourceWidth: 262,
      sourceHeight: 45,
      sourceLeft: 647,
      sourceTop: 502,
    },
    red: {
      sourceWidth: 262,
      sourceHeight: 45,
      sourceLeft: 647,
      sourceTop: 555,
    },
  },
  questBackgrounds: {
    1: {
      sourceWidth: 280,
      sourceHeight: 141,
      sourceLeft: 592,
      sourceTop: 8,
    },
    2: {
      sourceWidth: 280,
      sourceHeight: 190,
      sourceLeft: 592,
      sourceTop: 148,
    },
    3: {
      sourceWidth: 280,
      sourceHeight: 242,
      sourceLeft: 303,
      sourceTop: 301,
    },
    4: {
      sourceWidth: 280,
      sourceHeight: 293,
      sourceLeft: 303,
      sourceTop: 8,
    },
    5: {
      sourceWidth: 280,
      sourceHeight: 347,
      sourceLeft: 10,
      sourceTop: 392,
    },
    6: {
      sourceWidth: 280,
      sourceHeight: 398,
      sourceLeft: 10,
      sourceTop: 8,
    },
  },
  teleportArrow: {
    sourceWidth: 24,
    sourceHeight: 20,
    sourceLeft: 906,
    sourceTop: 675,
  },
}

export function setSection(UIImage: UIImage, section: ImageSection) {
  UIImage.sourceWidth = section.sourceWidth
  UIImage.sourceHeight = section.sourceHeight
  UIImage.sourceLeft = section.sourceLeft ? section.sourceLeft : 0
  UIImage.sourceTop = section.sourceTop ? section.sourceTop : 0
}
