import { nftData } from './nftData'
import resources from '../resources'
import { updateOpenUITime, setUiOpener } from './ui'

export class NFTWindow {
  public container: UIContainerRect
  public nftPanel: UIImage
  private nftImage: UIImage
  private nftType: UIText
  private nftTypeBlankButton: UIImage
  private nftTypeLink: string
  private nftTitle: UIText
  private nftDetails: UIText
  private nftDirectLink: UIText
  private nftDirectLinkBlankButton: UIImage
  private sound: Entity = new Entity()

  constructor(canvas: UICanvas) {
    // Container
    this.container = new UIContainerRect(canvas)
    this.container.width = '100%'
    this.container.height = '100%'
    this.container.positionY = 25
    this.container.visible = false

    // NFT Panel
    this.nftPanel = new UIImage(this.container, resources.textures.nftPanel)
    this.nftPanel.sourceWidth = 720
    this.nftPanel.sourceHeight = 900
    this.nftPanel.width = 480
    this.nftPanel.height = 600

    // NFT Type
    this.nftType = new UIText(this.container)
    this.nftType.hAlign = 'center'
    this.nftType.vAlign = 'center'
    this.nftType.positionX = -143
    this.nftType.positionY = 265
    this.nftType.font = new Font(Fonts.SanFrancisco_Semibold)
    this.nftType.fontSize = 16
    this.nftType.fontWeight = 'normal'
    this.nftType.color = new Color4(1.2, 0.07, 0.38)
    this.nftType.value = 'Not Found'
    this.nftType.visible = false

    // NFT Type Blank Button
    this.nftTypeBlankButton = new UIImage(
      this.container,
      resources.textures.blank
    )
    this.nftTypeBlankButton.sourceWidth = 1
    this.nftTypeBlankButton.sourceHeight = 1
    this.nftTypeBlankButton.positionX = -20
    this.nftTypeBlankButton.positionY = 250
    this.nftTypeBlankButton.width = 350
    this.nftTypeBlankButton.height = 20
    this.nftTypeBlankButton.visible = true
    this.nftTypeBlankButton.isPointerBlocker = true
    this.nftTypeBlankButton.onClick = new OnClick((): void => {
      this.closeNFTWindow(true)
      this.openExternalLink(this.nftTypeLink)
    })

    // NFT Title
    this.nftTitle = new UIText(this.container)
    this.nftTitle.hAlign = 'center'
    this.nftTitle.vAlign = 'center'
    this.nftTitle.positionX = -143
    this.nftTitle.positionY = 232
    this.nftTitle.font = new Font(Fonts.SanFrancisco_Heavy)
    this.nftTitle.fontSize = 24
    this.nftTitle.fontWeight = 'bold'
    this.nftTitle.color = Color4.Black()
    this.nftTitle.value = 'Not Found'
    this.nftTitle.isPointerBlocker = false
    this.nftTitle.visible = false

    // Image
    this.nftImage = new UIImage(
      this.container,
      resources.textures.placeholder // Default image if nothing is found ...
    )
    this.nftImage.sourceWidth = 384
    this.nftImage.sourceHeight = 384
    this.nftImage.width = 384
    this.nftImage.height = 384
    this.nftImage.visible = false

    // Close button to the top right
    const closeButton = new UIImage(
      this.container,
      resources.textures.closeButton
    )
    closeButton.sourceWidth = 50
    closeButton.sourceHeight = 50
    closeButton.width = 37.5
    closeButton.height = 37.5
    closeButton.positionX = 206
    closeButton.positionY = 265
    closeButton.isPointerBlocker = true
    closeButton.onClick = new OnClick((): void => {
      this.closeNFTWindow(true)
    })

    // NFT Details
    this.nftDetails = new UIText(this.container)
    this.nftDetails.adaptWidth = true
    this.nftDetails.hAlign = 'center'
    this.nftDetails.vAlign = 'center'
    this.nftDetails.positionY = -208
    this.nftDetails.fontSize = 18
    this.nftDetails.font = new Font(Fonts.SanFrancisco_Semibold)
    this.nftDetails.color = Color4.Black()
    this.nftDetails.value = 'Not Found'
    this.nftDetails.visible = false

    // NFT Direct Link
    this.nftDirectLink = new UIText(this.container)
    this.nftDirectLink.adaptWidth = true
    this.nftDirectLink.hAlign = 'center'
    this.nftDirectLink.vAlign = 'center'
    this.nftDirectLink.positionY = -233
    this.nftDirectLink.fontSize = 10
    this.nftDirectLink.font = new Font(Fonts.SanFrancisco)
    this.nftDirectLink.color = new Color4(1.2, 0.07, 0.38)
    this.nftDirectLink.value = 'Not Found'
    this.nftDirectLink.visible = false

    // Direct Link Blank Button
    this.nftDirectLinkBlankButton = new UIImage(
      this.container,
      resources.textures.blank
    )
    this.nftDirectLinkBlankButton.sourceWidth = 1
    this.nftDirectLinkBlankButton.sourceHeight = 1
    this.nftDirectLinkBlankButton.positionY = -250
    this.nftDirectLinkBlankButton.width = 370
    this.nftDirectLinkBlankButton.height = 15
    this.nftDirectLinkBlankButton.visible = true
    this.nftDirectLinkBlankButton.onClick = new OnClick((): void => {
      this.closeNFTWindow(true)
      this.openExternalLink(this.nftDirectLink.value)
    })

    // Sound
    this.sound.addComponent(new Transform())
    this.sound.setParent(Attachable.PLAYER)
    this.sound.addComponent(
      new AudioSource(resources.sounds.ui.navigationBackward)
    )
    engine.addEntity(this.sound)
  }

  public openNFTWindow(id: number): void {
    for (let i = 0; i < nftData.length; i++) {
      if (id == nftData[i].id) {
        this.nftImage.source = new Texture(nftData[i].images)
        this.nftType.value = nftData[i].type.name
        this.nftTypeLink = nftData[i].type.link
        this.nftTitle.value = nftData[i].title.name
        this.nftTitle.fontSize = nftData[i].title.fontSize
        this.nftDetails.value = nftData[i].details.info
        this.nftDetails.fontSize = nftData[i].details.fontSize
        this.nftDirectLink.value = nftData[i].directLink.link
        this.nftDirectLink.fontSize = nftData[i].directLink.fontSize
      }
    }

    this.container.visible = true
    this.nftType.visible = true
    this.nftTitle.visible = true
    this.nftImage.visible = true
    this.nftDetails.visible = true
    this.nftDirectLink.visible = true
  }

  private openExternalLink(link: string) {
    openExternalURL(link)
  }

  public closeNFTWindow(playAudio: boolean): void {
    this.container.visible = false
    this.nftType.visible = false
    this.nftTitle.visible = false
    this.nftImage.visible = false
    this.nftDetails.visible = false
    this.nftDirectLink.visible = false

    if (playAudio) this.sound.getComponent(AudioSource).playOnce()
  }
}
