import { robots } from './npcRobotBuilder'
import { robotDialog } from './npcDialogData'
import resources from '../resources'
import { TrackUserSlerp } from './npcFaceUserSystem'

export enum ConfirmMode {
  Confirm = 0,
  Cancel = 1,
  Next = 2,
}

export class DialogWindow {
  private container: UIContainerRect
  private textPanel: UIImage
  private portrait: UIImage
  private text: UIText
  private buttonE: UIImage
  private labelE: UIText
  private buttonF: UIImage
  private labelF: UIText
  private leftClickIcon: UIImage
  public isDialogOpen: boolean
  public isQuestionPanel: boolean
  public activeBotId: number
  public activeTextId: number

  constructor(canvas: UICanvas) {
    // Container
    this.container = new UIContainerRect(canvas)
    this.container.adaptWidth = true
    this.container.width = '100%'
    this.container.vAlign = 'bottom'
    this.container.positionY = 100
    this.container.visible = false

    // Text Panel
    this.textPanel = new UIImage(this.container, resources.textures.textPanel)
    this.textPanel.sourceWidth = 768
    this.textPanel.sourceHeight = 244
    this.textPanel.width = 512
    this.textPanel.height = 162
    this.textPanel.onClick = new OnClick((): void => {
      this.confirmText(ConfirmMode.Next)
    })

    // Portrait
    this.portrait = new UIImage(this.container, new Texture("images/portraits/alice.png"))
    this.portrait.sourceWidth = 384
    this.portrait.sourceHeight = 384
    this.portrait.width = 256
    this.portrait.height = 256
    this.portrait.positionX = -256
    this.portrait.positionY = 0
    this.portrait.onClick = new OnClick((): void => {
      this.confirmText(ConfirmMode.Next)
    })

    // Dialog Text
    this.text = new UIText(this.container)
    this.text.adaptWidth = false
    this.text.textWrapping = true
    this.text.width = 340
    this.text.positionX = 10
    this.text.hAlign = 'center'
    this.text.vAlign = 'center'
    this.text.fontSize = 14
    this.text.fontWeight = 'normal'
    this.text.color = Color4.Black()
    this.text.isPointerBlocker = false

    // Button E
    this.buttonE = new UIImage(this.container, resources.textures.buttonE)
    this.buttonE.sourceWidth = 202
    this.buttonE.sourceHeight = 62
    this.buttonE.width = 100
    this.buttonE.height = 30
    // this.buttonE.positionX = -60
    this.buttonE.positionX = 60
    this.buttonE.positionY = -35
    this.buttonE.visible = false
    this.buttonE.isPointerBlocker = true
    this.buttonE.onClick = new OnClick((): void => {
      this.confirmText(ConfirmMode.Confirm)
    })

    // Label E Text
    this.labelE = new UIText(this.container)
    this.labelE.adaptWidth = true
    this.labelE.hAlign = 'center'
    this.labelE.vAlign = 'center'

    this.labelE.fontWeight = 'bold'
    this.labelE.color = Color4.White()
    // this.labelE.positionX = -52
    this.labelE.positionX = 64
    this.labelE.positionY = -19

    // Button F
    this.buttonF = new UIImage(this.container, resources.textures.buttonF)
    this.buttonF.sourceWidth = 202
    this.buttonF.sourceHeight = 62
    this.buttonF.width = 100
    this.buttonF.height = 30
    // this.buttonF.positionX = 60
    this.buttonF.positionX = -60
    this.buttonF.positionY = -35
    this.buttonF.visible = false
    this.buttonF.isPointerBlocker = true
    this.buttonF.onClick = new OnClick((): void => {
      this.confirmText(ConfirmMode.Cancel)
    })

    // Label F Text
    this.labelF = new UIText(this.container)
    this.labelF.adaptWidth = true
    this.labelF.hAlign = 'center'
    this.labelF.vAlign = 'center'
    this.labelF.fontWeight = 'bold'
    this.labelF.color = Color4.White()
    // this.labelF.positionX = 64
    this.labelF.positionX = -56
    this.labelF.positionY = -19

    // Left Click Icon
    this.leftClickIcon = new UIImage(
      this.container,
      resources.textures.leftClickIcon
    )
    this.leftClickIcon.sourceWidth = 38
    this.leftClickIcon.sourceHeight = 54
    this.leftClickIcon.width = 19
    this.leftClickIcon.height = 27
    this.leftClickIcon.positionX = 220
    this.leftClickIcon.positionY = -44
    this.leftClickIcon.visible = false
  }

  public openDialogWindow(botId: number, textId: number): void {

    // this.isDialogOpen = true

    // Set current active bot and text
    this.activeBotId = botId
    this.activeTextId = textId

    let robotText = robotDialog[botId].dialogs[textId]

    // Set portrait
    // Portrait is always set at the 0 index of the robot's dialog
    this.portrait.source = new Texture(
      robotDialog[botId].dialogs[0].portrait.path
    )
    this.portrait.positionX = robotDialog[botId].dialogs[0].portrait.positionX
    this.portrait.positionY = robotDialog[botId].dialogs[0].portrait.positionY
    this.portrait.visible = true

    // Set text
    this.text.value = robotText.text
    if (robotText.fontSize) this.text.fontSize = robotText.fontSize
    this.text.positionY = robotText.positionY
    this.text.visible = true
    this.container.visible = true

    // Layout panel buttons and icon
    this.layoutDialogWindow(botId, textId)
  }

  // Progresses text
  public confirmText(mode: ConfirmMode): void {
    let activeRobotText =
      robotDialog[this.activeBotId].dialogs[this.activeTextId]

    // Update active text
    if (mode == ConfirmMode.Next) {
      if (activeRobotText.isEndOfDialog) {
        this.closeDialogWindow()
        return
      } else if (!activeRobotText.isQuestion) {
        this.activeTextId++
      }
    }

    if (mode == ConfirmMode.Confirm && activeRobotText.ifPressE) {
      this.activeTextId = activeRobotText.ifPressE
    }

    if (mode == ConfirmMode.Cancel && activeRobotText.ifPressF) {
      this.activeTextId = activeRobotText.ifPressF
    }

    // Update active robot text with new active text
    activeRobotText = robotDialog[this.activeBotId].dialogs[this.activeTextId]

    // Update text
    this.text.value = activeRobotText.text
    if (activeRobotText.fontSize) this.text.fontSize = activeRobotText.fontSize
    this.text.positionY = activeRobotText.positionY
    this.layoutDialogWindow(this.activeBotId, this.activeTextId)
  }

  // Adds the buttons or mouse icon depending on the type of window
  private layoutDialogWindow(botId: number, textId: number): void {
    let robotText = robotDialog[botId].dialogs[textId]

    this.isQuestionPanel = robotText.isQuestion

    if (robotText.isQuestion) {
      // Button E and label
      if (robotText.labelE['positionX'] || robotText.labelE['positionY']) {
        this.labelE.positionX = robotText.labelE['positionX']
        this.labelE.positionY = robotText.labelE['positionY']
      }
      this.buttonE.visible = true
      this.labelE.value = robotText.labelE['label']
      this.labelE.fontSize = robotText.labelE['fontSize']
      this.labelE.visible = true

      // Button F and label
      if (robotText.labelF['positionX'] || robotText.labelF['positionY']) {
        this.labelF.positionX = robotText.labelF['positionX']
        this.labelF.positionY = robotText.labelF['positionY']
      }

      this.buttonF.visible = true
      this.labelF.value = robotText.labelF['label']
      this.labelF.fontSize = robotText.labelF['fontSize']
      this.labelF.visible = true

      // Mouse icon
      this.leftClickIcon.visible = false
    } else {
      this.buttonE.visible = false
      this.labelE.visible = false
      this.buttonF.visible = false
      this.labelF.visible = false
      this.leftClickIcon.visible = true
    }
  }

  public closeDialogWindow(): void {
    // Stop robot from tracking the user
    if (this.isDialogOpen) {
      for (let i = 0; i < robots.length; i++) {
        // Play goodbye animation after talking to user
        if (this.activeBotId == robots[i].robotID && robots[i].hasComponent(TrackUserSlerp)) {
          robots[i].removeComponent(TrackUserSlerp)
          robots[i].playGoodbye()
        } else {
          // Play idle animation after talking about an item e.g. museum piece, wearables etc.
          robots[i].playIdle()
        }
      }

      this.isDialogOpen = false
      this.container.visible = false
      this.portrait.visible = false
      this.text.visible = false
      this.buttonE.visible = false
      this.labelE.visible = false
      this.buttonF.visible = false
      this.labelF.visible = false
      this.leftClickIcon.visible = false
    }
  }
}
