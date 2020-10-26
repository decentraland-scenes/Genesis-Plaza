import { canvas, SFFont } from '../../node_modules/@dcl/ui-utils/index'

import resources, { setSection } from './resources'

export type QuestItem = {
  label: string
  checked: boolean
  visible?: boolean
  coords?: string
}

const ITEM_SPACING = 50
const Y_OFFSET = -59
const X_OFFSET = -10

export enum Coords {
  GenesisCoords = `0,0`,
  CemeteryCoords = `60,-60`,
  TempleCoords = `100,100`,
  FarmCoords = `50,50`,
  Secret = `secret`,
}

export let halloweenTheme = new Texture('images/HalloweentAtlas.png')

export class QuestUI extends Entity {
  visibleElements: QuestCheckBox[] = []
  elements: QuestItem[] = []
  UIOpenTime: number
  texture: Texture = halloweenTheme
  background: UIImage = questBackground
  day: number
  title: UIImage
  currentCoords: Coords
  constructor(
    list: QuestItem[],
    day: number,
    currentCoords: Coords,
    width?: number
  ) {
    super()

    this.UIOpenTime = +Date.now()

    this.background.visible = true

    this.currentCoords = currentCoords

    this.title = new UIImage(this.background, halloweenTheme)
    this.title.vAlign = 'top'
    this.title.positionX = 0
    this.title.positionY = -12
    this.title.width = 58
    this.title.height = 24

    switch (day) {
      case 1:
        setSection(this.title, resources.dayLabels[1])
        break
      case 2:
        setSection(this.title, resources.dayLabels[2])
        break
      case 3:
        setSection(this.title, resources.dayLabels[3])
        break
      case 4:
        setSection(this.title, resources.dayLabels[4])
        break
      case 5:
        setSection(this.title, resources.dayLabels[5])
        break
    }

    for (let i = 0; i < list.length; i++) {
      this.elements.push(list[i])
      if (list[i].visible) {
        this.addCheckbox(list[i].label, list[i].checked, list[i].coords)
      }
    }

    switch (this.visibleElements.length) {
      case 1:
        setSection(this.background, resources.questBackgrounds[1])
        this.background.height = 141
        break
      case 2:
        setSection(this.background, resources.questBackgrounds[2])
        this.background.height = 190
        break
      case 3:
        setSection(this.background, resources.questBackgrounds[3])
        this.background.height = 242
        break
      case 4:
        setSection(this.background, resources.questBackgrounds[4])
        this.background.height = 293
        break
      case 5:
        setSection(this.background, resources.questBackgrounds[5])
        this.background.height = 347
        break
      case 6:
        setSection(this.background, resources.questBackgrounds[5])
        this.background.height = 398
        break
    }

    //this.background.height = 55 + 50 * this.visibleElements.length

    if (width) {
      this.background.width = width
    } else {
      this.background.width = 280
    }
  }
  public close(): void {
    questBackground.visible = false
    this.title.visible = false

    for (let element of this.visibleElements) {
      element.hide()
    }
  }
  public reopen(): void {
    questBackground.visible = true
    this.title.visible = true

    for (let element of this.visibleElements) {
      element.show()
    }
  }

  public addCheckbox(
    label: string,
    checked?: boolean,
    teleportLocation?: string
  ) {
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
      checked ? checked : null,
      teleportLocation && teleportLocation != this.currentCoords
        ? teleportLocation
        : null
    )

    this.visibleElements.push(checkBox)
    //this.items.push({ label: label, checked: checked })

    //this.background.height = 10 + ITEM_SPACING * this.visibleElements.length

    switch (this.visibleElements.length) {
      case 1:
        setSection(this.background, resources.questBackgrounds[1])
        this.background.height = 141
        break
      case 2:
        setSection(this.background, resources.questBackgrounds[2])
        this.background.height = 190
        break
      case 3:
        setSection(this.background, resources.questBackgrounds[3])
        this.background.height = 242
        break
      case 4:
        setSection(this.background, resources.questBackgrounds[4])
        this.background.height = 293
        break
      case 5:
        setSection(this.background, resources.questBackgrounds[5])
        this.background.height = 347
        break
      case 6:
        setSection(this.background, resources.questBackgrounds[5])
        this.background.height = 398
        break
    }

    //this.background.height = 55 + 50 * this.visibleElements.length

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
    this.addCheckbox(
      this.elements[index].label,
      this.elements[index].checked,
      this.elements[index].coords
    )
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

  public isChecked(index) {
    return this.visibleElements[index].checked
  }

  public removeCheckbox(index) {}
}

export class QuestCheckBox extends Entity {
  label: UIText
  background: UIImage
  image: UIImage
  teleportArrow: UIImage
  checked: boolean
  teleportLocation: string
  private darkTheme: boolean
  constructor(
    texture: Texture,
    darkTheme: boolean,
    label: string,
    posX: number,
    posY: number,
    onCheck?: () => void,
    onUncheck?: () => void,
    large?: boolean,
    startChecked?: boolean,
    teleportLocation?: string
  ) {
    super()

    this.checked = startChecked == true ? true : false
    this.darkTheme = darkTheme

    this.background = new UIImage(questBackground, texture)
    this.background.positionX = posX
    this.background.positionY = posY
    this.background.width = 262
    this.background.height = 45
    this.background.vAlign = 'top'
    if (teleportLocation && !startChecked) {
      // red
      setSection(this.background, resources.questItems.red)
      this.teleportArrow = new UIImage(this.background, texture)
      this.teleportArrow.positionX = -10
      this.teleportArrow.positionY = -10
      this.teleportArrow.width = 24
      this.teleportArrow.height = 20
      this.teleportArrow.hAlign = 'right'
      this.teleportArrow.vAlign = 'top'
      this.teleportArrow.isPointerBlocker = false

      setSection(this.teleportArrow, resources.teleportArrow)
    } else {
      // default
      setSection(this.background, resources.questItems.default)
    }

    if (teleportLocation) {
      this.teleportLocation = teleportLocation
      this.background.onClick = new OnClick(() => {
        log('teleporting!')
        teleportTo(teleportLocation)
      })
    }

    this.image = new UIImage(this.background, texture)
    this.image.vAlign = 'bottom'
    this.image.hAlign = 'left'

    this.image.width = 16
    this.image.height = 16
    this.image.positionX = 15
    this.image.positionY = 14

    this.label = new UIText(this.image)

    this.label.positionX = large ? 40 : 30

    this.label.color = darkTheme ? Color4.White() : Color4.Black()

    this.label.value = label
    this.label.hTextAlign = 'left'
    this.label.vTextAlign = 'center'
    this.label.fontSize = 13
    this.label.font = SFFont
    this.label.isPointerBlocker = false

    // this.image.onClick = new OnClick(() => {
    //   this.checked = !this.checked
    //   if (this.checked == false) {
    //     this.check()
    //   } else {
    //     this.uncheck()
    //   }

    //   this.checked ? onCheck() : onUncheck()
    // })

    if (this.checked == false) {
      this.uncheck()
    } else {
      this.check()
    }
  }

  public hide(): void {
    this.image.visible = false
    this.label.visible = false
    this.background.visible = false
  }

  public show(): void {
    this.image.visible = true
    this.label.visible = true
  }

  public uncheck(): void {
    this.checked = false
    if (this.darkTheme) {
      setSection(this.image, resources.checkboxes.off)
      this.image.width = 16
      this.image.height = 16
      this.label.color = Color4.White()
    } else {
      setSection(this.image, resources.checkboxes.off)

      this.label.color = Color4.Black()
    }

    if (this.teleportLocation) {
      setSection(this.background, resources.questItems.red)
    }

    //  Change text color?
  }

  public check(): void {
    this.checked = true
    if (this.darkTheme) {
      setSection(this.image, resources.checkboxes.on)

      this.label.color = Color4.Gray()
    } else {
      setSection(this.image, resources.checkboxes.on)
      this.image.width = 22
      this.image.height = 19

      this.label.color = Color4.Gray()
    }

    if (this.teleportLocation) {
      setSection(this.background, resources.questItems.default)
    }
  }

  //  Change text color?
}

export const questBackground = new UIImage(canvas, halloweenTheme)
setSection(questBackground, resources.backgrounds.promptBackground)
questBackground.hAlign = 'left'
questBackground.vAlign = 'top'
questBackground.width = 280
questBackground.height = 50
questBackground.positionY = -140
questBackground.visible = false

export type HalloweenData = {
  // day 1
  allHouses: boolean
  phone: boolean
  pumpkinDone: boolean
  w1Found: boolean

  // day 2
  NPCIntroDay2: boolean
  ghostsDone: boolean
  w2Found: boolean

  // day 3
  NPCIntroDay3: boolean
  puzzleDone: boolean
  w3Found: boolean

  // day 4
  NPCIntroDay4: boolean
  monsterDefeated: boolean
  w4Found: boolean

  // day 5
  NPCIntroDay5: boolean // ghost buster
  waypoint1: boolean
  waypoint2: boolean
  waypoint3: boolean
  waypoint4: boolean
  waypoint5: boolean
  ghostDefeated: boolean
  w5Found: false

  // extra
  house1?: boolean
  house2?: boolean
  house3?: boolean
  egg1?: boolean
  egg2?: boolean
  egg3?: boolean
  egg4?: boolean
  egg5?: boolean
}

export type HalloweenState = { data: HalloweenData; day: number }

export let quest

export function initialQuestUI(
  data: HalloweenData,
  day: number,
  currentCoords: Coords
) {
  /// limit max day w call to api

  if (data.w4Found && day >= 5) {
    // day 5
    quest = new QuestUI(
      [
        {
          label: 'Find the Old lady',
          checked: data.waypoint5,
          visible: true,
          coords: Coords.Secret,
        },
        {
          label: 'Follow the clues to the mansion',
          checked: data.waypoint5,
          visible: data.NPCIntroDay5,
          coords: Coords.Secret,
        },
        {
          label: 'Defeat the evil ghost',
          checked: data.ghostDefeated,
          visible: data.waypoint5,
          coords: Coords.Secret,
        },
        {
          label: 'Speak to the GhostControl crew',
          checked: data.waypoint5,
          visible: data.ghostDefeated,
          coords: Coords.GenesisCoords,
        },
      ],
      5,
      currentCoords
    )
  } else if (data.w3Found && day >= 4) {
    // day 4
    quest = new QuestUI(
      [
        {
          label: 'Talk to Old lady',
          checked: data.NPCIntroDay4,
          visible: true,
          coords: Coords.GenesisCoords,
        },
        {
          label: 'Defeat the interdimensional monster',
          checked: data.monsterDefeated,
          visible: data.NPCIntroDay4,
          coords: Coords.FarmCoords,
        },
        {
          label: 'Talk to the farmer',
          checked: data.monsterDefeated,
          visible: data.monsterDefeated,
          coords: Coords.FarmCoords,
        },
      ],
      4,
      currentCoords
    )
  } else if (data.w2Found && day >= 3) {
    // day 3
    quest = new QuestUI(
      [
        {
          label: 'Talk to Old lady',
          checked: data.NPCIntroDay3,
          visible: true,
          coords: Coords.GenesisCoords,
        },
        {
          label: 'Solve the castle puzzle',
          checked: data.puzzleDone,
          visible: data.NPCIntroDay3,
          coords: Coords.TempleCoords,
        },
        {
          label: 'Talk to the casle guy',
          checked: data.puzzleDone,
          visible: data.puzzleDone,
          coords: Coords.TempleCoords,
        },
      ],
      3,
      currentCoords
    )
  } else if (data.w1Found && day >= 2) {
    // day2

    quest = new QuestUI(
      [
        {
          label: 'Talk to Old lady',
          checked: data.NPCIntroDay2,
          visible: true,
          coords: Coords.GenesisCoords,
        },
        {
          label: "Talk to mayor's ghost",
          checked: data.ghostsDone,
          visible: data.NPCIntroDay2,
          coords: Coords.CemeteryCoords,
        },
        {
          label: 'Return ghotst to their graves',
          checked: data.ghostsDone,
          visible: data.ghostsDone,
          coords: Coords.CemeteryCoords,
        },
        {
          label: 'Break into graveyard shack',
          checked: data.w2Found,
          visible: data.ghostsDone,
          coords: Coords.CemeteryCoords,
        },
      ],
      2,
      currentCoords
    )
  } else {
    // day 1
    quest = new QuestUI(
      [
        {
          label: 'Visit all 10 houses',
          checked: data.allHouses,
          visible: true,
          coords: Coords.CemeteryCoords,
        },
        {
          label: 'Pick up the phone',
          checked: data.phone,
          visible: data.phone,
          coords: Coords.CemeteryCoords,
        },
        {
          label: 'Meet caller near 0,0',
          checked: data.pumpkinDone,
          visible: data.phone,
          coords: Coords.GenesisCoords,
        },
        {
          label: 'Destroy all the pumpkins',
          checked: data.pumpkinDone,
          visible: data.pumpkinDone,
          coords: Coords.GenesisCoords,
        },
        {
          label: 'Search the wearables building',
          checked: data.w1Found,
          visible: data.pumpkinDone,
          coords: Coords.GenesisCoords,
        },
        {
          label: 'Return to the Old lady',
          checked: data.w1Found,
          visible: data.pumpkinDone,
          coords: Coords.GenesisCoords,
        },
      ],
      1,
      currentCoords
    )
  }
}
