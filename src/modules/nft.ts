import { NFTWindow } from './nftWindow'
import resources from '../resources'
import { updateOpenUITime, setUiOpener } from './ui'

export class NFT extends Entity {
  public id: number

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
    this.addComponent(new AudioSource(resources.sounds.navigationForward))

    this.addComponent(
      new OnPointerDown(
        (e): void => {
          this.getComponent(AudioSource).playOnce()
          nftWindow.openNFTWindow(this.id, transform.position)
          // used for closing UI when walking away or clicking
          updateOpenUITime()
          setUiOpener(this)
        },
        {
          button: ActionButton.POINTER,
          showFeedback: true,
          hoverText: 'More Info',
          distance: 8,
        }
      )
    )
  }
}
