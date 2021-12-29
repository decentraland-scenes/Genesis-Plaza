import { ThumbnailPlane } from './thumbnail'
import { monthToString, wordWrap } from './helperFunctions'
import * as resource from './resources/resources'
import { AnimatedItem } from './simpleAnimator'
import { Teleport } from './teleports'
import { MenuItem } from './menuItem'

//const clickableGroup = engine.getComponentGroup(ClickableItem, Transform)

export class ClassicMenuItem extends MenuItem {
  public thumbNail: ThumbnailPlane
  public scale: Vector3
  public scaleMultiplier: number
  teleportMesh: GLTFShape
  itemBox: Entity
  teleportLocation: string
  detailsRoot: Entity
  detailTextPanel: Entity
  detailTitle: Entity
  detailTextBody: Entity
  highlightRays: Entity
  jumpInButton: Entity
  coordsPanel: Entity

  constructor(
    _transform: TranformConstructorArgs,
    _name: string,
    _description: string,
    _location: string,
    _mesh: GLTFShape
  ) {
    super()
    this.addComponent(new Transform(_transform))

    this.defaultItemScale = new Vector3(1, 1, 1)
    // event card root
    this.itemBox = new Entity()
    this.itemBox.addComponent(
      new Transform({
        position: new Vector3(0, 0, -0.2),
        scale: new Vector3(0.75, 0.75, 0.75),
      })
    )
    this.itemBox.addComponent(_mesh)
    this.itemBox.getComponent(GLTFShape).isPointerBlocker = false
    this.itemBox.addComponent(new Billboard(false, true, false))
    this.itemBox.setParent(this)

    this.scaleMultiplier = 1.2

    this.teleportLocation = _location

    //selection event animation
    this.addComponent(
      new AnimatedItem(
        {
          position: new Vector3(0, 0, -0.2),
          scale: new Vector3(
            this.defaultItemScale.x,
            this.defaultItemScale.y,
            this.defaultItemScale.z
          ),
        },
        {
          position: new Vector3(-0.7, 0, -0.2),
          scale: new Vector3(1, 1, 1),
        },
        2
      )
    )

    // DETAILS APPEARING ON SELECTION EVENT
    this.detailsRoot = new Entity()
    this.detailsRoot.addComponent(
      new Transform({
        position: new Vector3(0, 0.15, 0),
        rotation: Quaternion.Euler(0, 180, 0),
      })
    )
    this.detailsRoot.setParent(this)

    // EVENT DETAILS TEXT
    this.detailTextPanel = new Entity()
    this.detailTextPanel.addComponent(
      new Transform({
        position: new Vector3(0.9, 0, 0),
        rotation: Quaternion.Euler(0, 15, 0),
      })
    )
    this.detailTextPanel.addComponent(resource.detailsBGShape)
    this.detailTextPanel.setParent(this.detailsRoot)
    this.detailTextPanel.addComponent(
      new AnimatedItem(
        {
          position: new Vector3(0.8, 0, 0.2),
          scale: new Vector3(0, 0.8, 0),
        },
        {
          position: new Vector3(0.9, 0, -0.1),
          scale: new Vector3(1.5, 1.5, 1.5),
        },
        2.2
      )
    )

    let detailTitle = new TextShape()
    detailTitle.value = _name
    detailTitle.font = new Font(Fonts.SanFrancisco_Heavy)
    detailTitle.height = 20
    detailTitle.width = 2
    detailTitle.fontSize = 3
    detailTitle.color = Color3.Black()
    detailTitle.hTextAlign = 'left'
    detailTitle.vTextAlign = 'top'

    this.detailTitle = new Entity()
    this.detailTitle.addComponent(
      new Transform({
        position: new Vector3(0.1, 0.5, 0),
        scale: new Vector3(0.4, 0.4, 0.4),
      })
    )
    this.detailTitle.addComponent(detailTitle)
    this.detailTitle.setParent(this.detailTextPanel)

    let detailTextContent = new TextShape()
    detailTextContent.value =
      '\n\n' + wordWrap(_description, 75, 11) + '</cspace>'
    detailTextContent.font = new Font(Fonts.SanFrancisco_Semibold)
    detailTextContent.height = 20
    detailTextContent.width = 2

    detailTextContent.fontSize = 2
    detailTextContent.color = Color3.FromHexString('#111111')
    detailTextContent.hTextAlign = 'left'
    detailTextContent.vTextAlign = 'top'
    detailTextContent.lineSpacing = '0'

    this.detailTextBody = new Entity()
    this.detailTextBody.addComponent(
      new Transform({
        position: new Vector3(0.1, 0.4, 0),
        scale: new Vector3(0.3, 0.3, 0.3),
      })
    )
    this.detailTextBody.addComponent(detailTextContent)
    this.detailTextBody.setParent(this.detailTextPanel)

    // -- COORDS PANEL
    this.coordsPanel = new Entity()
    this.coordsPanel.addComponent(
      new Transform({
        position: new Vector3(-0.3, -0.2, 0),
        scale: new Vector3(0.4, 0.4, 0.4),
      })
    )
    this.coordsPanel.addComponent(resource.coordsPanelShape)
    this.coordsPanel.setParent(this.detailTextPanel)
    this.coordsPanel.addComponent(
      new AnimatedItem(
        {
          position: new Vector3(0, 0.0, 0.2),
          scale: new Vector3(0.1, 0.1, 0.1),
        },
        {
          position: new Vector3(1.1, -0.3, -0.05),
          scale: new Vector3(0.5, 0.5, 0.5),
        },
        1.9
      )
    )

    // -- JUMP IN BUTTON
    this.jumpInButton = new Entity()
    this.jumpInButton.addComponent(
      new Transform({
        position: new Vector3(0, -0.2, 0),
        scale: new Vector3(0.4, 0.4, 0.4),
      })
    )
    this.jumpInButton.addComponent(resource.jumpInButtonShape)
    this.jumpInButton.setParent(this.detailTextPanel)
    this.jumpInButton.addComponent(
      new AnimatedItem(
        {
          position: new Vector3(0, 0.0, 0.2),
          scale: new Vector3(0.1, 0.1, 0.1),
        },
        {
          position: new Vector3(0.35, -0.3, -0.05),
          scale: new Vector3(0.5, 0.5, 0.5),
        },
        1.8
      )
    )

    let jumpButtonText = new Entity()
    let jumpButtonTextShape = new TextShape()

    jumpButtonTextShape.color = Color3.FromHexString('#FFFFFF')
    jumpButtonTextShape.font = new Font(Fonts.SanFrancisco_Heavy)
    jumpButtonTextShape.hTextAlign = 'center'

    jumpButtonText.addComponent(jumpButtonTextShape)
    jumpButtonText.addComponent(
      new Transform({
        position: new Vector3(0, -0.33, -0.05),
        scale: new Vector3(0.22, 0.22, 0.22),
      })
    )

    jumpButtonTextShape.value = 'JUMP IN'
    this.jumpInButton.addComponent(
      new OnPointerDown(
        async function () {
          teleportTo(_location)
        },
        {
          button: ActionButton.POINTER,
          hoverText: 'JUMP IN',
        }
      )
    )

    jumpButtonText.setParent(this.jumpInButton)

    let coords = new Entity()
    let coordsText = new TextShape()
    coordsText.value = _location
    coordsText.color = Color3.FromHexString('#111111')
    coordsText.font = new Font(Fonts.SanFrancisco_Heavy)

    coords.addComponent(coordsText)
    coords.addComponent(
      new Transform({
        position: new Vector3(0.18, -0.33, -0.05),
        scale: new Vector3(0.18, 0.18, 0.18),
      })
    )

    coords.setParent(this.coordsPanel)

    // highlights BG on selection
    this.highlightRays = new Entity()
    this.highlightRays.addComponent(new Transform())
    this.highlightRays.addComponent(resource.highlightRaysShape)
    this.highlightRays.setParent(this.detailsRoot)
    this.highlightRays.addComponent(
      new AnimatedItem(
        {
          position: new Vector3(0, 0, 0.3),
          scale: new Vector3(0, 0, 0),
        },
        {
          position: new Vector3(0, 0, 0.3),
          scale: new Vector3(1, 1, 1),
        },
        3
      )
    )
    this.highlightRays.addComponent(new Billboard(false, true, false))
  }
  select() {
    if (!this.selected) {
      this.selected = true
      //teleportTo(this.teleportLocation)
      this.jumpInButton.getComponent(AnimatedItem).isHighlighted = true
      this.detailTextPanel.getComponent(AnimatedItem).isHighlighted = true
      this.highlightRays.getComponent(AnimatedItem).isHighlighted = true
      this.coordsPanel.getComponent(AnimatedItem).isHighlighted = true
    }
  }
  deselect() {
    this.selected = false
    this.jumpInButton.getComponent(AnimatedItem).isHighlighted = false
    this.detailTextPanel.getComponent(AnimatedItem).isHighlighted = false
    this.highlightRays.getComponent(AnimatedItem).isHighlighted = false
    this.coordsPanel.getComponent(AnimatedItem).isHighlighted = false
    //    // this.timePanel.getComponent(AnimatedItem).isHighlighted = false
  }
  show() {}
  hide() {}
}
