import utils from "../../node_modules/decentraland-ecs-utils/index"
import { NFT } from "./nft"
import { nftData } from "./nftData"
import { NFTWindow } from "./nftWindow"

export function addNFTs(): void {
  // UI Elements
  const canvas = new UICanvas()
  const nftWindow = new NFTWindow(canvas)

  // NFTs
  const cryptoKittiesNFT = new NFT(
    new NFTShape("ethereum://" + nftData[0].address),
    new Transform({
      position: new Vector3(126.94, 5, 93.823),
      rotation: Quaternion.Euler(0, 36.068 + 180, 0),
      scale: new Vector3(4, 4, 2),
    }),
    new Color3(0.75, 0.75, 1.5),
    nftData[0].id,
    nftWindow
  )

  const makersPlaceNFT1 = new NFT(
    new NFTShape("ethereum://" + nftData[1].address),
    new Transform({
      position: new Vector3(124.055, 5, 95.885),
      rotation: Quaternion.Euler(0, 36.068 + 180, 0),
      scale: new Vector3(4, 4, 2),
    }),
    new Color3(0.0, 1.0, 1.5),
    nftData[1].id,
    nftWindow
  )

  const knownOriginNFT1 = new NFT(
    new NFTShape("ethereum://" + nftData[2].address),
    new Transform({
      position: new Vector3(116.075, 5, 102.364),
      rotation: Quaternion.Euler(0, 40.278 + 180, 0),
      scale: new Vector3(4, 4, 2),
    }),
    new Color3(1.5, 0.5, 0.0),
    nftData[2].id,
    nftWindow
  )

  const axieInfinityNFT = new NFT(
    new NFTShape("ethereum://" + nftData[3].address),
    new Transform({
      position: new Vector3(113.39, 5, 104.817),
      rotation: Quaternion.Euler(0, 45.432 + 180, 0),
      scale: new Vector3(5, 5, 2),
    }),
    new Color3(1.25, 1.25, 1.25),
    nftData[3].id,
    nftWindow
  )

  const myCryptoHeroesNFT = new NFT(
    new NFTShape("ethereum://" + nftData[4].address),
    new Transform({
      position: new Vector3(106.977, 5, 113.486),
      rotation: Quaternion.Euler(0, 61.533 + 180, 0),
      scale: new Vector3(4, 4, 2),
    }),
    new Color3(0.25, 0.5, 1.5),
    nftData[4].id,
    nftWindow
  )

  const mlbChampionsNFT = new NFT(
    new NFTShape("ethereum://" + nftData[5].address),
    new Transform({
      position: new Vector3(105.261, 5, 116.672),
      rotation: Quaternion.Euler(0, 61.533 + 180, 0),
      scale: new Vector3(4, 4, 2),
    }),
    new Color3(0.25, 0.25, 0.25),
    nftData[5].id,
    nftWindow
  )

  const blockchainCutiesNFT = new NFT(
    new NFTShape("ethereum://" + nftData[6].address),
    new Transform({
      position: new Vector3(111.754, 5, 120.193),
      rotation: Quaternion.Euler(0, 61.533, 0),
      scale: new Vector3(4, 4, 2),
    }),
    new Color3(1.0, 1.1, 0.85),
    nftData[6].id,
    nftWindow
  )

  const hyperDragonsNFT = new NFT(
    new NFTShape("ethereum://" + nftData[7].address),
    new Transform({
      position: new Vector3(113.465, 5, 117.004),
      rotation: Quaternion.Euler(0, 61.533, 0),
      scale: new Vector3(4, 4, 2),
    }),
    new Color3(0.5, 1.0, 1.0),
    nftData[7].id,
    nftWindow
  )

  const chainGuardiansNFT = new NFT(
    new NFTShape("ethereum://" + nftData[8].address),
    new Transform({
      position: new Vector3(118.655, 5, 110.005),
      rotation: Quaternion.Euler(0, 44.895, 0),

      scale: new Vector3(4, 4, 2),
    }),
    new Color3(0.0, 1.0, 1.5),
    nftData[8].id,
    nftWindow
  )

  const cryptoMorphNFT = new NFT(
    new NFTShape("ethereum://" + nftData[9].address),
    new Transform({
      position: new Vector3(120.991, 5, 107.84),
      rotation: Quaternion.Euler(0, 40.278, 0),
      scale: new Vector3(4, 4, 2),
    }),
    new Color3(0.9, 0.25, 1.25),
    nftData[9].id,
    nftWindow
  )

  const josieNFT = new NFT(
    new NFTShape("ethereum://" + nftData[10].address),
    new Transform({
      position: new Vector3(128.412, 5, 101.866),
      rotation: Quaternion.Euler(0, 36.068, 0),
      scale: new Vector3(4, 4, 2),
    }),
    new Color3(1.5, 0.5, 0.0),
    nftData[10].id,
    nftWindow
  )

  const superRareNFT = new NFT(
    new NFTShape("ethereum://" + nftData[11].address),
    new Transform({
      position: new Vector3(131.283, 5, 99.787),
      rotation: Quaternion.Euler(0, 36.068, 0),
      scale: new Vector3(4, 4, 2),
    }),
    new Color3(1.25, 0.5, 1.5),
    nftData[11].id,
    nftWindow
  )

  const makersPlaceNFT2 = new NFT(
    new NFTShape("ethereum://" + nftData[12].address),
    new Transform({
      position: new Vector3(136.106, 5, 89.079),
      rotation: Quaternion.Euler(0, 23.725 + 180, 0),
      scale: new Vector3(4, 4, 2),
    }),
    new Color3(1.0, 1.0, 1.0),
    nftData[12].id,
    nftWindow
  )

  const makersPlaceNFT3 = new NFT(
    new NFTShape("ethereum://" + nftData[13].address),
    new Transform({
      position: new Vector3(139.43, 5, 95.704),
      rotation: Quaternion.Euler(0, 23.725, 0),
      scale: new Vector3(4, 4, 2),
    }),
    new Color3(1.5, 0.0, 0.0),
    nftData[13].id,
    nftWindow
  )

  const knownOriginNFT2 = new NFT(
    new NFTShape("ethereum://" + nftData[14].address),
    new Transform({
      position: new Vector3(100.982, 5, 125.806),
      rotation: Quaternion.Euler(0, 65.83 + 180, 0),
      scale: new Vector3(4, 4, 2),
    }),
    new Color3(0.5, 0.0, 1.5),
    nftData[14].id,
    nftWindow
  )

  const knownOriginNFT3 = new NFT(
    new NFTShape("ethereum://" + nftData[15].address),
    new Transform({
      position: new Vector3(107.804, 5, 128.694),
      rotation: Quaternion.Euler(0, 65.83, 0),
      scale: new Vector3(4, 4, 2),
    }),
    new Color3(0.5, 0.0, 1.5),
    nftData[15].id,
    nftWindow
  )

  // Trigger
  const nftTrigger = new Entity()
  nftTrigger.addComponent(
    new Transform({
      position: new Vector3(120.491, 5, 108.638),
    })
  )
  let triggerBox = new utils.TriggerBoxShape(
    new Vector3(60, 10, 60),
    Vector3.Zero()
  )
  nftTrigger.addComponent(
    new utils.TriggerComponent(
      triggerBox, //shape
      0, //layer
      0, //triggeredByLayer
      null, //onTriggerEnter
      null, //onTriggerExit
      null, //onCameraEnter
      () => {
        log("exit trigger area")
        nftWindow.closeNFTWindow(false)
      }, //onCameraExit
      false // enableDebug
    )
  )
  engine.addEntity(nftTrigger)
}
