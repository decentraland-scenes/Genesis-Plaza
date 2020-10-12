import {
  canvas,
  lightTheme,
  SFFont,
} from '../../node_modules/@dcl/ui-utils/utils/default-ui-comopnents'

import resources, {
  setSection,
} from '../../node_modules/@dcl/ui-utils/utils/resources'

export type QuestItem = { label: string; checked: boolean; visible?: boolean }

const ITEM_SPACING = 40
const Y_OFFSET = -10
const X_OFFSET = -100

export class QuestUI extends Entity {
  visibleElements: QuestCheckBox[] = []
  elements: QuestItem[] = []
  UIOpenTime: number
  texture: Texture = lightTheme
  background: UIImage = questBackground

  constructor(list: QuestItem[], width?: number, height?: number) {
    super()

    this.UIOpenTime = +Date.now()

    for (let i = 0; i < list.length; i++) {
      this.elements.push(list[i])
      if (list[i].visible) {
        this.addCheckbox(list[i].label, list[i].checked)
      }
    }

    if (width) {
      this.background.width = width
    }
    if (height) {
      this.background.height = height
    }

    this.background.visible = true
  }
  public close(): void {
    questBackground.visible = false

    for (let element of this.visibleElements) {
      element.hide()
    }
  }
  public reopen(): void {
    questBackground.visible = true

    for (let element of this.visibleElements) {
      element.show()
    }
  }

  public addCheckbox(label: string, checked?: boolean) {
    let posX = X_OFFSET
    let posY = Y_OFFSET - this.visibleElements.length * ITEM_SPACING

    let checkBox = new QuestCheckBox(
      this.texture,
      false,
      label,
      posX,
      posY,
      null,
      null,
      false,
      checked ? checked : null
    )

    this.visibleElements.push(checkBox)
    //this.items.push({ label: label, checked: checked })

    this.background.height = 10 + ITEM_SPACING * this.visibleElements.length

    return checkBox
  }

  public checkBox(index) {
    this.visibleElements[index].check()
  }

  public uncheckBox(index) {
    this.visibleElements[index].uncheck()
  }

  public showCheckBox(index) {
    if (this.elements[index].visible) return
    this.elements[index].visible = true
    this.addCheckbox(this.elements[index].label, this.elements[index].checked)
  }

  public resetBoxes(list: QuestItem[], width?: number, height?: number) {
    for (let i = 0; i < this.visibleElements.length; i++) {
      this.visibleElements[i].hide()
    }
    this.elements = []
    this.visibleElements = []

    for (let i = 0; i < list.length; i++) {
      this.elements.push(list[i])
      if (list[i].visible) {
        this.addCheckbox(list[i].label, list[i].checked)
      }
    }

    if (width) {
      this.background.width = width
    }
    if (height) {
      this.background.height = height
    }
  }

  public removeCheckbox(index) {}
}

export class QuestCheckBox extends Entity {
  label: UIText
  image: UIImage
  checked: boolean
  private darkTheme: boolean
  private large: boolean
  constructor(
    texture: Texture,
    darkTheme: boolean,
    label: string,
    posX: number,
    posY: number,
    onCheck?: () => void,
    onUncheck?: () => void,
    large?: boolean,
    startChecked?: boolean
  ) {
    super()

    this.checked = startChecked == true ? true : false
    this.darkTheme = darkTheme
    this.large = large

    this.image = new UIImage(questBackground, texture)
    this.image.vAlign = 'top'
    this.image.positionX = posX
    this.image.positionY = posY
    this.image.width = large ? 32 : 24
    this.image.height = large ? 32 : 24

    this.label = new UIText(this.image)

    this.label.positionX = large ? 40 : 30

    this.label.color = darkTheme ? Color4.White() : Color4.Black()

    this.label.value = label
    this.label.hTextAlign = 'left'
    this.label.vTextAlign = 'center'
    this.label.fontSize = 14
    this.label.font = SFFont
    this.label.isPointerBlocker = false

    this.image.onClick = new OnClick(() => {
      this.checked = !this.checked
      if (this.checked == false) {
        this.check()
      } else {
        this.uncheck()
      }

      this.checked ? onCheck() : onUncheck()
    })

    if (this.checked == false) {
      this.uncheck()
    } else {
      this.check()
    }
  }

  public hide(): void {
    this.image.visible = false
    this.label.visible = false
  }

  public show(): void {
    this.image.visible = true
    this.label.visible = true
  }

  public uncheck(): void {
    if (this.darkTheme) {
      if (this.large) {
        setSection(this.image, resources.checkboxes.wLargeOff)
      } else {
        setSection(this.image, resources.checkboxes.wOff)
      }
      this.label.color = Color4.White()
    } else {
      if (this.large) {
        setSection(this.image, resources.checkboxes.dLargeOff)
      } else {
        setSection(this.image, resources.checkboxes.dOff)
      }
      this.label.color = Color4.Black()
    }

    //  Change text color?
  }

  public check(): void {
    if (this.darkTheme) {
      if (this.large) {
        setSection(this.image, resources.checkboxes.wLargeOn)
      } else {
        setSection(this.image, resources.checkboxes.wOn)
      }
      this.label.color = Color4.Gray()
    } else {
      if (this.large) {
        setSection(this.image, resources.checkboxes.dLargeOn)
      } else {
        setSection(this.image, resources.checkboxes.dOn)
      }
      this.label.color = Color4.Gray()
    }
  }

  //  Change text color?
}

export const questBackground = new UIImage(canvas, lightTheme)
setSection(questBackground, resources.backgrounds.promptBackground)
questBackground.hAlign = 'left'
questBackground.vAlign = 'top'
questBackground.width = 300
questBackground.height = 50
questBackground.positionY = -200
questBackground.visible = false

export type HalloweenData = {
  // day 1
  house1: boolean
  house2: boolean
  house3: boolean
  house4: boolean
  house5: boolean
  foundBody: boolean
  phone: boolean
  NPCIntroDay1: boolean
  pumpkinDone: boolean
  w1Found: boolean
  w1Claimed: boolean
  NPCOutroDay1: boolean

  // day 2
  NPCIntroDay2: boolean
  ghostIntro: boolean
  ghostsDone: boolean
  w2Found: boolean
  w2Claimed: boolean
  NPCOutroDay2: boolean

  // day 3
  NPCIntroDay3: boolean
  puzzleDone: boolean
  w3Found: boolean
  w3Claimed: boolean
  NPCOutroDay3: boolean

  // day 4
  NPCIntroDay4: boolean
  monsterDefeated: boolean
  w4Found: boolean
  w4Claimed: boolean
  NPCOutroDay4: boolean

  // day 5
  NPCIntroDay5: boolean // ghost buster
  waypoint1: boolean
  waypoint2: boolean
  waypoint3: boolean
  waypoint4: boolean
  waypoint5: boolean
  ghostDefeated: boolean
  NPCOutroDay5: boolean // ghost buster
  w5Claimed: boolean
}

export type HalloweenState = { data: HalloweenData; day: number }

export let quest

export function initialQuestUI(data: HalloweenData, day: number) {
  /// limit max day w call to api

  if (data.NPCOutroDay4 && day >= 5) {
    // day 5
    quest = new QuestUI([
      { label: 'Find the Old lady', checked: data.waypoint5, visible: true },
      {
        label: 'Follow the clues to the mansion',
        checked: data.waypoint5,
        visible: data.NPCIntroDay5,
      },
      {
        label: 'Defeat the evil ghost',
        checked: data.ghostDefeated,
        visible: data.waypoint5,
      },
      {
        label: 'Speak to the GhostControl crew',
        checked: data.NPCOutroDay5,
        visible: data.ghostDefeated,
      },
    ])
  } else if (data.NPCOutroDay3 && day >= 4) {
    // day 4
    quest = new QuestUI([
      { label: 'Talk to Old lady', checked: data.NPCIntroDay4, visible: true },
      {
        label: 'Defeat the interdimensional monster',
        checked: data.monsterDefeated,
        visible: data.NPCIntroDay4,
      },
      {
        label: 'Talk to the farmer',
        checked: data.NPCOutroDay4,
        visible: data.monsterDefeated,
      },
    ])
  } else if (data.NPCOutroDay2 && day >= 3) {
    // day 3
    quest = new QuestUI([
      { label: 'Talk to Old lady', checked: data.NPCIntroDay3, visible: true },
      {
        label: 'Solve the castle puzzle',
        checked: data.puzzleDone,
        visible: data.NPCIntroDay3,
      },
      {
        label: 'Talk to the casle guy',
        checked: data.NPCOutroDay3,
        visible: data.puzzleDone,
      },
    ])
  } else if (data.NPCOutroDay1 && day >= 2) {
    // day2

    quest = new QuestUI([
      { label: 'Talk to Old lady', checked: data.NPCIntroDay2, visible: true },
      {
        label: "Talk to mayor's ghost",
        checked: data.ghostIntro,
        visible: data.NPCIntroDay2,
      },
      {
        label: 'Return ghotst to their graves',
        checked: data.ghostsDone,
        visible: data.ghostIntro,
      },
      {
        label: 'Break into graveyard shack',
        checked: data.w2Found,
        visible: data.ghostIntro,
      },
      {
        label: 'Bring your findings back to the Old lady',
        checked: data.NPCOutroDay2,
        visible: data.ghostsDone,
      },
    ])
  } else {
    // day 1
    quest = new QuestUI([
      {
        label: 'Visit all the houses',
        checked:
          data.house1 &&
          data.house2 &&
          data.house3 &&
          data.house4 &&
          data.house5,
        visible: true,
      },
      {
        label: 'Pick up the phone',
        checked: data.phone,
        visible: data.foundBody,
      },
      {
        label: 'Meet mysterious caller in Genesis Plaza',
        checked: data.NPCIntroDay1,
        visible: data.phone,
      },
      {
        label: 'Destroy all the pumpkins',
        checked: data.pumpkinDone,
        visible: data.NPCIntroDay1,
      },
      {
        label: 'Look for clues behind the trade center building',
        checked: data.w1Found,
        visible: data.pumpkinDone,
      },
      {
        label: 'Bring your findings back to the Old lady',
        checked: data.NPCOutroDay1,
        visible: data.pumpkinDone,
      },
    ])
  }
}
