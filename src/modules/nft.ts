import { NFTWindow } from "./nftWindow"
import resources from "../resources"
import { updateOpenUITime, setUiOpener } from "./ui"

export class NFT extends Entity {
  public id: number
  private sound: Entity = new Entity()

  constructor(
    nft: NFTShape,
    transform: Transform,
    color: Color3,
    id: number,
    nftWindow: NFTWindow
  ) {
    super()
    engine.addEntity(this)
    this.addComponent(nft)
    this.addComponent(transform)
    this.getComponent(NFTShape).color = color
    this.id = id

    // Sound
    this.sound.addComponent(new Transform())
    this.sound.getComponent(Transform).position = Camera.instance.position
    this.sound.addComponent(new AudioSource(resources.sounds.ui.navigationForward))
    engine.addEntity(this.sound)

    this.addComponent(
      new OnPointerDown(
        (e): void => {
          this.sound.getComponent(AudioSource).playOnce()
          nftWindow.openNFTWindow(this.id)
          // used for closing UI when walking away or clicking
          updateOpenUITime()
          setUiOpener(this)
        },
        {
          button: ActionButton.PRIMARY,
          hoverText: "More Info",
          distance: 8,
        }
      )
    )
  }
}
