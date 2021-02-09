import resources from '../resources'
import { nftData } from './nftData'

export class NFT extends Entity {
  public id: number
  private sound: Entity = new Entity()

  constructor(nft: NFTShape, transform: Transform, color: Color3, id: number) {
    super()
    engine.addEntity(this)
    this.addComponent(nft)
    this.addComponent(transform)
    this.getComponent(NFTShape).color = color
    this.id = id

    // Sound
    this.sound.addComponent(new Transform())
    this.sound.addComponent(
      new AudioSource(resources.sounds.ui.navigationForward)
    )
    engine.addEntity(this.sound)
    this.sound.setParent(Attachable.AVATAR)

    this.addComponent(
      new OnPointerDown(
        (e): void => {
          this.sound.getComponent(AudioSource).playOnce()
          openNFTDialog(nft.src, nftData[this.id].details.info)
        },
        {
          button: ActionButton.PRIMARY,
          hoverText: 'More Info',
          distance: 8,
        }
      )
    )
  }
}
