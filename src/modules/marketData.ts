import { MarketData } from './serverHandler'
import { invisibleMaterial } from './museumItems'
import { firstNonBlank, shortenText } from './helperFunctions'

const DATA_NOT_AVAILABLE="data not available"
/////// GET DATA FROM SERVER

////// POSITION ALL PANELS

/// LOWER FLOOR BOARD

const lowerBoardWidth = -3.365

let lowerCenterPiece = new Entity()
lowerCenterPiece.addComponent(
  new Transform({
    position: new Vector3(273.018, 6.5, 37.792),
  })
)

engine.addEntity(lowerCenterPiece)

let lowerRotationPanel1 = new Entity()
lowerRotationPanel1.addComponent(
  new Transform({
    rotation: Quaternion.Euler(0, 293, 0),
  })
)
lowerRotationPanel1.setParent(lowerCenterPiece)

let lowerShiftPanel1 = new Entity()
lowerShiftPanel1.addComponent(
  new Transform({
    position: new Vector3(0, 0, lowerBoardWidth),
  })
)
lowerShiftPanel1.setParent(lowerRotationPanel1)
lowerShiftPanel1.getComponent(Transform).rotate(new Vector3(1, 0, 0), -30)

let lowerRotationPanel2 = new Entity()
lowerRotationPanel2.addComponent(
  new Transform({
    rotation: Quaternion.Euler(0, 353, 0),
  })
)
lowerRotationPanel2.setParent(lowerCenterPiece)

let lowerShiftPanel2 = new Entity()
lowerShiftPanel2.addComponent(
  new Transform({
    position: new Vector3(0, 0, lowerBoardWidth),
  })
)
lowerShiftPanel2.setParent(lowerRotationPanel2)
lowerShiftPanel2.getComponent(Transform).rotate(new Vector3(1, 0, 0), -30)

let lowerRotationPanel3 = new Entity()
lowerRotationPanel3.addComponent(
  new Transform({
    rotation: Quaternion.Euler(0, 53, 0),
  })
)
lowerRotationPanel3.setParent(lowerCenterPiece)

let lowerShiftPanel3 = new Entity()
lowerShiftPanel3.addComponent(
  new Transform({
    position: new Vector3(0, 0, lowerBoardWidth - 0.1),
  })
)
lowerShiftPanel3.setParent(lowerRotationPanel3)
lowerShiftPanel3.getComponent(Transform).rotate(new Vector3(1, 0, 0), -30)

let lowerRotationPanel4 = new Entity()
lowerRotationPanel4.addComponent(
  new Transform({
    rotation: Quaternion.Euler(0, 113, 0),
  })
)
lowerRotationPanel4.setParent(lowerCenterPiece)

let lowerShiftPanel4 = new Entity()
lowerShiftPanel4.addComponent(
  new Transform({
    position: new Vector3(0, 0, lowerBoardWidth),
  })
)
lowerShiftPanel4.setParent(lowerRotationPanel4)
lowerShiftPanel4.getComponent(Transform).rotate(new Vector3(1, 0, 0), -30)

let lowerRotationPanel5 = new Entity()
lowerRotationPanel5.addComponent(
  new Transform({
    rotation: Quaternion.Euler(0, 173, 0),
  })
)
lowerRotationPanel5.setParent(lowerCenterPiece)

let lowerShiftPanel5 = new Entity()
lowerShiftPanel5.addComponent(
  new Transform({
    position: new Vector3(0, 0, lowerBoardWidth),
  })
)
lowerShiftPanel5.setParent(lowerRotationPanel5)
lowerShiftPanel5.getComponent(Transform).rotate(new Vector3(1, 0, 0), -30)

let lowerRotationPanel6 = new Entity()
lowerRotationPanel6.addComponent(
  new Transform({
    rotation: Quaternion.Euler(0, 233, 0),
  })
)
lowerRotationPanel6.setParent(lowerCenterPiece)

let lowerShiftPanel6 = new Entity()
lowerShiftPanel6.addComponent(
  new Transform({
    position: new Vector3(0, 0, lowerBoardWidth),
  })
)
lowerShiftPanel6.setParent(lowerRotationPanel6)
lowerShiftPanel6.getComponent(Transform).rotate(new Vector3(1, 0, 0), -30)

///////// MID FLOOR

let midBoardWidth = lowerBoardWidth * 1.348 //-4.57

let midCenterPiece = new Entity()
midCenterPiece.addComponent(
  new Transform({
    position: new Vector3(273.018, 14.5, 37.792),
  })
)

engine.addEntity(midCenterPiece)

let midRotationPanel1 = new Entity()
midRotationPanel1.addComponent(
  new Transform({
    rotation: Quaternion.Euler(0, 293, 0),
  })
)
midRotationPanel1.setParent(midCenterPiece)

let midShiftPanel1 = new Entity()
midShiftPanel1.addComponent(
  new Transform({
    position: new Vector3(0, 0, midBoardWidth + 0.05),
  })
)
midShiftPanel1.setParent(midRotationPanel1)
midShiftPanel1.getComponent(Transform).rotate(new Vector3(1, 0, 0), -30)

let midRotationPanel2 = new Entity()
midRotationPanel2.addComponent(
  new Transform({
    rotation: Quaternion.Euler(0, 353, 0),
  })
)
midRotationPanel2.setParent(midCenterPiece)

let midShiftPanel2 = new Entity()
midShiftPanel2.addComponent(
  new Transform({
    position: new Vector3(0, 0, midBoardWidth + 0.15),
  })
)
midShiftPanel2.setParent(midRotationPanel2)
midShiftPanel2.getComponent(Transform).rotate(new Vector3(1, 0, 0), -30)

let midRotationPanel3 = new Entity()
midRotationPanel3.addComponent(
  new Transform({
    rotation: Quaternion.Euler(0, 53, 0),
  })
)
midRotationPanel3.setParent(midCenterPiece)

let midShiftPanel3 = new Entity()
midShiftPanel3.addComponent(
  new Transform({
    position: new Vector3(0, 0, midBoardWidth + 0.2),
  })
)
midShiftPanel3.setParent(midRotationPanel3)
midShiftPanel3.getComponent(Transform).rotate(new Vector3(1, 0, 0), -30)

let midRotationPanel4 = new Entity()
midRotationPanel4.addComponent(
  new Transform({
    rotation: Quaternion.Euler(0, 113, 0),
  })
)
midRotationPanel4.setParent(midCenterPiece)

let midShiftPanel4 = new Entity()
midShiftPanel4.addComponent(
  new Transform({
    position: new Vector3(0, 0, midBoardWidth + 0.2),
  })
)
midShiftPanel4.setParent(midRotationPanel4)
midShiftPanel4.getComponent(Transform).rotate(new Vector3(1, 0, 0), -30)

let midRotationPanel5 = new Entity()
midRotationPanel5.addComponent(
  new Transform({
    rotation: Quaternion.Euler(0, 173, 0),
  })
)
midRotationPanel5.setParent(midCenterPiece)

let midShiftPanel5 = new Entity()
midShiftPanel5.addComponent(
  new Transform({
    position: new Vector3(0, 0, midBoardWidth),
  })
)
midShiftPanel5.setParent(midRotationPanel5)
midShiftPanel5.getComponent(Transform).rotate(new Vector3(1, 0, 0), -30)

let midRotationPanel6 = new Entity()
midRotationPanel6.addComponent(
  new Transform({
    rotation: Quaternion.Euler(0, 233, 0),
  })
)
midRotationPanel6.setParent(midCenterPiece)

let midShiftPanel6 = new Entity()
midShiftPanel6.addComponent(
  new Transform({
    position: new Vector3(0, 0, midBoardWidth),
  })
)
midShiftPanel6.setParent(midRotationPanel6)
midShiftPanel6.getComponent(Transform).rotate(new Vector3(1, 0, 0), -30)

/////// TOP FLOOR

let topBoardWidth = lowerBoardWidth * 1.98 //-6

let topCenterPiece = new Entity()
topCenterPiece.addComponent(
  new Transform({
    position: new Vector3(273.19, 23.5, 37.85),
  })
)

engine.addEntity(topCenterPiece)

let topRotationPanel1 = new Entity()
topRotationPanel1.addComponent(
  new Transform({
    rotation: Quaternion.Euler(0, 293, 0),
  })
)
topRotationPanel1.setParent(topCenterPiece)

let topShiftPanel1 = new Entity()
topShiftPanel1.addComponent(
  new Transform({
    position: new Vector3(0, 0, topBoardWidth),
  })
)
topShiftPanel1.setParent(topRotationPanel1)
topShiftPanel1.getComponent(Transform).rotate(new Vector3(1, 0, 0), -30)

let topRotationPanel2 = new Entity()
topRotationPanel2.addComponent(
  new Transform({
    rotation: Quaternion.Euler(0, 353, 0),
  })
)
topRotationPanel2.setParent(topCenterPiece)

let topShiftPanel2 = new Entity()
topShiftPanel2.addComponent(
  new Transform({
    position: new Vector3(0, 0, topBoardWidth + 0.15),
  })
)
topShiftPanel2.setParent(topRotationPanel2)
topShiftPanel2.getComponent(Transform).rotate(new Vector3(1, 0, 0), -30)

let topRotationPanel3 = new Entity()
topRotationPanel3.addComponent(
  new Transform({
    rotation: Quaternion.Euler(0, 53, 0),
  })
)
topRotationPanel3.setParent(topCenterPiece)

let topShiftPanel3 = new Entity()
topShiftPanel3.addComponent(
  new Transform({
    position: new Vector3(0, 0, topBoardWidth + 0.2),
  })
)
topShiftPanel3.setParent(topRotationPanel3)
topShiftPanel3.getComponent(Transform).rotate(new Vector3(1, 0, 0), -30)

let topRotationPanel4 = new Entity()
topRotationPanel4.addComponent(
  new Transform({
    rotation: Quaternion.Euler(0, 113, 0),
  })
)
topRotationPanel4.setParent(topCenterPiece)

let topShiftPanel4 = new Entity()
topShiftPanel4.addComponent(
  new Transform({
    position: new Vector3(0, 0, topBoardWidth + 0.1),
  })
)
topShiftPanel4.setParent(topRotationPanel4)
topShiftPanel4.getComponent(Transform).rotate(new Vector3(1, 0, 0), -30)

let topRotationPanel5 = new Entity()
topRotationPanel5.addComponent(
  new Transform({
    rotation: Quaternion.Euler(0, 173, 0),
  })
)
topRotationPanel5.setParent(topCenterPiece)

let topShiftPanel5 = new Entity()
topShiftPanel5.addComponent(
  new Transform({
    position: new Vector3(0, 0, topBoardWidth),
  })
)
topShiftPanel5.setParent(topRotationPanel5)
topShiftPanel5.getComponent(Transform).rotate(new Vector3(1, 0, 0), -30)

let topRotationPanel6 = new Entity()
topRotationPanel6.addComponent(
  new Transform({
    rotation: Quaternion.Euler(0, 233, 0),
  })
)
topRotationPanel6.setParent(topCenterPiece)

let topShiftPanel6 = new Entity()
topShiftPanel6.addComponent(
  new Transform({
    position: new Vector3(0, 0, topBoardWidth - 0.05),
  })
)
topShiftPanel6.setParent(topRotationPanel6)
topShiftPanel6.getComponent(Transform).rotate(new Vector3(1, 0, 0), -30)

////// FLAT WEARABLE BOARDS

let mythicBoard1 = new Entity()
mythicBoard1.addComponent(
  new Transform({
    position: new Vector3(271.09, 21.6, 14.38),
    rotation: Quaternion.Euler(0, 204, 0),
    scale: new Vector3(0.7, 0.7, 0.7),
  })
)

engine.addEntity(mythicBoard1)

let mythicBoard2 = new Entity()
mythicBoard2.addComponent(
  new Transform({
    position: new Vector3(258.25, 21.6, 19.46),
    rotation: Quaternion.Euler(0, 203, 0),
    scale: new Vector3(0.7, 0.7, 0.7),
  })
)

engine.addEntity(mythicBoard2)

let legendaryBoard1 = new Entity()
legendaryBoard1.addComponent(
  new Transform({
    position: new Vector3(296.2, 21.6, 35.56),
    rotation: Quaternion.Euler(0, 113, 0),
    scale: new Vector3(0.7, 0.7, 0.7),
  })
)

engine.addEntity(legendaryBoard1)

let legendaryBoard2 = new Entity()
legendaryBoard2.addComponent(
  new Transform({
    position: new Vector3(291.21, 21.6, 22.68),
    rotation: Quaternion.Euler(0, 114, 0),
    scale: new Vector3(0.7, 0.7, 0.7),
  })
)

engine.addEntity(legendaryBoard2)

let epicBoard1 = new Entity()
epicBoard1.addComponent(
  new Transform({
    position: new Vector3(249.42, 21.6, 39.43),
    rotation: Quaternion.Euler(0, 293, 0),
    scale: new Vector3(0.7, 0.7, 0.7),
  })
)

engine.addEntity(epicBoard1)

let epicBoard2 = new Entity()
epicBoard2.addComponent(
  new Transform({
    position: new Vector3(254.54, 21.6, 52.54),
    rotation: Quaternion.Euler(0, 292, 0),
    scale: new Vector3(0.7, 0.7, 0.7),
  })
)

engine.addEntity(epicBoard2)

let rareBoard1 = new Entity()
rareBoard1.addComponent(
  new Transform({
    position: new Vector3(275.07, 21.6, 61.29),
    rotation: Quaternion.Euler(0, 24, 0),
    scale: new Vector3(0.7, 0.7, 0.7),
  })
)

engine.addEntity(rareBoard1)

let rareBoard2 = new Entity()
rareBoard2.addComponent(
  new Transform({
    position: new Vector3(288.03, 21.6, 56),
    rotation: Quaternion.Euler(0, 24, 0),
    scale: new Vector3(0.7, 0.7, 0.7),
  })
)

engine.addEntity(rareBoard2)

////// UPDATE BOARDS




export enum StockDataRowTypes {
  LABEL_VALUE_UNIT = 'label-value-unit',
  LABEL_VALUE = 'label-value'
}

export enum StockDataTypes {
  BIGTITLE = 'bigtitle',
  BIGVALUE = 'bigvalue',
  TITLE = 'title',
  LABEL = 'label',
  VALUE = 'value',
  UNIT = 'unit',
  TINYVALUE = 'tinyvalue',
  TINYTITLE = 'tinytitle'
}

let SFFont = new Font(Fonts.SanFrancisco)

export class StockData extends Entity {
  textShape:TextShape

  constructor(
    type: StockDataTypes,
    text: string,
    transform: TranformConstructorArgs,
    parent: Entity
  ) {
    super()
    engine.addEntity(this)

    this.addComponent(new Transform(transform))
    this.setParent(parent)

    let shape = this.textShape = new TextShape(text)
  
    shape.font = SFFont
    shape.width = 10

    switch (type) {
      case StockDataTypes.BIGTITLE:
        shape.fontSize = 6
        shape.color = Color3.White()
        shape.vTextAlign = 'center'
        break
      case StockDataTypes.BIGVALUE:
        shape.fontSize = 3
        shape.color = Color3.Green()
        shape.vTextAlign = 'center'
        break

      case StockDataTypes.TITLE:
        shape.fontSize = 3
        shape.color = Color3.White()
        shape.vTextAlign = 'center'
        shape.width = 10
        break
      case StockDataTypes.TINYTITLE:
        shape.fontSize = 2
        shape.color = Color3.White()
        shape.vTextAlign = 'center'
        shape.width = 10
        break
      case StockDataTypes.LABEL:
        shape.fontSize = 3
        shape.color = Color3.White()
        shape.vTextAlign = 'left'
        break
      case StockDataTypes.VALUE:
        shape.fontSize = 3
        shape.color = Color3.Green()
        shape.vTextAlign = 'right'
        break
      case StockDataTypes.TINYVALUE:
        shape.fontSize = 2
        shape.color = Color3.Green()
        shape.vTextAlign = 'right'
        break

      case StockDataTypes.UNIT:
        shape.fontSize = 2
        shape.color = Color3.White()
        shape.vTextAlign = 'right'
        break
    }

    this.addComponent(shape)
  }
}

export class WearablePreview extends Entity {
  constructor(
    image: string,
    transform: TranformConstructorArgs,
    parent: Entity
  ) {
    super()
    engine.addEntity(this)

    this.setParent(parent)

    this.addComponent(new Transform(transform))

    this.getComponent(Transform).scale = new Vector3(1.5, 1.5, 1)

    this.getComponent(Transform).rotation = Quaternion.Euler(180, 0, 0)

    let wearableImage = new Texture(image)
    let wearableMaterial = new Material()
    wearableMaterial.roughness = 1
    wearableMaterial.albedoTexture = wearableImage

    this.addComponent(new PlaneShape())
    this.addComponent(wearableMaterial)
  }
}

// To convert values in weis
export function toMana(longNum: number) {
  let shortNum = longNum / 1000000000000000000
  let squaredNum = shortNum * Math.pow(10, 4)
  return Math.round(squaredNum) / Math.pow(10, 4)
}

export function updateTradeCentrer(data: MarketData) {
  //// LOWER FLOOR

  //1
  let lowerPanel1Title = new StockData(
    StockDataTypes.BIGTITLE,
    'BTC Price',
    {
      position: new Vector3(0, 0.4, 0),
    },
    lowerShiftPanel1
  )

  let lowerPanel1Value = new StockData(
    StockDataTypes.BIGVALUE,
    (data.coins && data.coins.BTCUSDT) ? data.coins.BTCUSDT.toString() + ' USD' : DATA_NOT_AVAILABLE,
    {
      position: new Vector3(0, -0.3, 0),
    },
    lowerShiftPanel1
  )

  //2
  let lowerPanel2Title = new StockData(
    StockDataTypes.BIGTITLE,
    'ETH Price',
    {
      position: new Vector3(0, 0.4, 0),
    },
    lowerShiftPanel2
  )

  let lowerPanel2Value = new StockData(
    StockDataTypes.BIGVALUE,
    (data.coins && data.coins.ETHUSDT) ? data.coins.ETHUSDT.toString() + ' USD' : DATA_NOT_AVAILABLE,
    {
      position: new Vector3(0, -0.3, 0),
    },
    lowerShiftPanel2
  )

  //3
  let lowerPanel3itle = new StockData(
    StockDataTypes.BIGTITLE,
    'MANA Price',
    {
      position: new Vector3(0, 0.4, 0),
    },
    lowerShiftPanel3
  )

  let lowerPanel3Value = new StockData(
    StockDataTypes.BIGVALUE,
    (data.coins && data.coins.MANAETH) ? data.coins.MANAETH.toString().slice(0, 10) + ' ETH' : DATA_NOT_AVAILABLE,
    {
      position: new Vector3(0, -0.3, 0),
    },
    lowerShiftPanel3
  )

  //4
  let lowerPanel4itle = new StockData(
    StockDataTypes.BIGTITLE,
    'MANA Price',
    {
      position: new Vector3(0, 0.4, 0),
    },
    lowerShiftPanel4
  )

  let lowerPanel4Value = new StockData(
    StockDataTypes.BIGVALUE,
    (data.coins && data.coins.MANAUSD) ? data.coins.MANAUSD.toString().slice(0, 8) + ' USD' : DATA_NOT_AVAILABLE,
    {
      position: new Vector3(0, -0.3, 0),
    },
    lowerShiftPanel4
  )

  //5
  let lowerPanel5itle = new StockData(
    StockDataTypes.TITLE,
    'DCL token transactions',
    {
      position: new Vector3(0, 0.5, 0),
    },
    lowerShiftPanel5
  )
  let lowerPanel5itle2 = new StockData(
    StockDataTypes.TITLE,
    'last 7 days',
    {
      position: new Vector3(0, 0.15, 0),
    },
    lowerShiftPanel5
  )

  let totalTokenSalesWeek = data.landSalesWeek + data.wearableSalesWeek

  let lowerPanel5Value = new StockData(
    StockDataTypes.BIGVALUE,
    (totalTokenSalesWeek != 0 ) ? totalTokenSalesWeek.toString() + ' tokens' : DATA_NOT_AVAILABLE,
    {
      position: new Vector3(0, -0.3, 0),
    },
    lowerShiftPanel5
  )

  //6
  let lowerPanel6itle = new StockData(
    StockDataTypes.TITLE,
    'DCL token transactions',
    {
      position: new Vector3(0, 0.5, 0),
    },
    lowerShiftPanel6
  )
  let lowerPanel6itle2 = new StockData(
    StockDataTypes.TITLE,
    'last 7 days',
    {
      position: new Vector3(0, 0.15, 0),
    },
    lowerShiftPanel6
  )

  let totalTokenManaWeek =
    (data.totalMANALandAndEstateWeek + data.totalMANAWearablesWeek) *
    data.coins.MANAUSD
  let roundedTotalTokenManaWeek = Math.floor(totalTokenManaWeek * 100) / 100

  let lowerPanel6Value = new StockData(
    StockDataTypes.BIGVALUE,
    (roundedTotalTokenManaWeek != 0 ) ? roundedTotalTokenManaWeek.toString() + ' USD' : DATA_NOT_AVAILABLE,
    {
      position: new Vector3(0, -0.3, 0),
    },
    lowerShiftPanel6
  )

  ///// MID FLOOR (LAND)

  //1

  let midPanel1Title = new StockData(
    StockDataTypes.TITLE,
    'Parcel + Estate sales',
    {
      position: new Vector3(0, 1.5, 0),
    },
    midShiftPanel1
  )

  let midPanel1Value1 = createStockPanelRow(
    2,3,
    StockDataRowTypes.LABEL_VALUE,
    ['Yesterday',data.landSalesYesterday.toString()],
    {
      position: new Vector3(-0.7, 0.9, 0),
    },
    midShiftPanel1
  )

  let midPanel1Value2 = createStockPanelRow(
    2,3,
    StockDataRowTypes.LABEL_VALUE,
    ['7 Days',data.landSalesWeek.toString()],
    {
      position: new Vector3(-0.7, 0.4, 0),
    },
    midShiftPanel1
  )

  let midPanel1Value3 = createStockPanelRow(
    2,3,
    StockDataRowTypes.LABEL_VALUE,
    ['30 Days',data.landSalesMonth.toString()],
    {
      position: new Vector3(-0.7, -0.1, 0),
    },
    midShiftPanel1
  )

  //2

  let midPanel2Title = new StockData(
    StockDataTypes.TITLE,
    'Cheapest Parcel Sold',
    {
      position: new Vector3(0, 1.5, 0),
    },
    midShiftPanel2
  )

  let midPanel2Value1 = createStockPanelRow(
    2,1,
    StockDataRowTypes.LABEL_VALUE_UNIT,
    ['Yesterday',data.cheapestLandYesterday.toString(),'MANA'],
    {
      position: new Vector3(-1, 0.9, 0),//position: new Vector3(0.7, 0.9, 0),
    },
    midShiftPanel2
  )

  let midPanel2Value2 = createStockPanelRow(
    2,2,
    StockDataRowTypes.LABEL_VALUE_UNIT,
    ['7 Days',data.cheapestLandWeek.toString(),'MANA'],
    {
      position: new Vector3(-1, 0.4, 0),//position: new Vector3(0.7, 0.4, 0),
    },
    midShiftPanel2
  )

  let midPanel2Value3 = createStockPanelRow(
    2,3,
    StockDataRowTypes.LABEL_VALUE_UNIT,
    ['30 Days',data.cheapestLandMonth.toString(),'MANA'],
    {
      position: new Vector3(-1, -0.1, 0),
    },
    midShiftPanel2
  )

  //3

  let midPanel3Title = new StockData(
    StockDataTypes.TITLE,
    'Most Expensive Single Parcel',
    {
      position: new Vector3(0, 1.5, 0),
    },
    midShiftPanel3
  )

  let midPanel3Value1 = createStockPanelRow(
    2,3, 
    StockDataRowTypes.LABEL_VALUE_UNIT,
    ['Yesterday',data.expensiveLandYesterday.toString(),'MANA'],
    {
      position: new Vector3(-1, 0.9, 0),//position: new Vector3(0.7, 0.9, 0),
    },
    midShiftPanel3
  )

  let midPanel3Value2 = createStockPanelRow(
    2,2,
    StockDataRowTypes.LABEL_VALUE_UNIT,
    ['7 Days',data.expensiveLandWeek.toString(),'MANA'],
    {
      position: new Vector3(-1, 0.4, 0),//position: new Vector3(0.7, 0.4, 0),
    },
    midShiftPanel3
  )

  let midPanel3Value3 = createStockPanelRow(
    2,3,
    StockDataRowTypes.LABEL_VALUE_UNIT,
    ['30 Days',data.expensiveLandMonth.toString(),'MANA'],
    {
      position: new Vector3(-1, -0.1, 0),//position: new Vector3(0.7, -0.1, 0),
    },
    midShiftPanel3
  )


  //4

  let midPanel4Title = new StockData(
    StockDataTypes.TITLE,
    'Most Expensive Estate',
    {
      position: new Vector3(0, 1.5, 0),
    },
    midShiftPanel4
  )

  let midPanel4Value1 = createStockPanelRow(
    2,1,
    StockDataRowTypes.LABEL_VALUE_UNIT,
    ['Yesterday',data.expensiveEstateYesterday.toString(),'MANA'],
    {
      position: new Vector3(-1, 0.9, 0),//position: new Vector3(0.7, 0.9, 0),
    },
    midShiftPanel4
  )

  let midPanel4Value2 = createStockPanelRow(
    2,2,
    StockDataRowTypes.LABEL_VALUE_UNIT,
    ['7 Days', data.expensiveEstateWeek.toString(),'MANA'],
    {
      position: new Vector3(-1, 0.4, 0),//position: new Vector3(0.7, 0.4, 0),
    },
    midShiftPanel4
  )

  let midPanel4Value3 = createStockPanelRow(
    2,3,
    StockDataRowTypes.LABEL_VALUE_UNIT,
    ['30 Days',data.expensiveEstateMonth.toString(),'MANA'],
    {
      position: new Vector3(-1, -0.1, 0),//position: new Vector3(0.7, -0.1, 0),
    },
    midShiftPanel4
  )

  //5

  let midPanel5Title = new StockData(
    StockDataTypes.TITLE,
    'LAND Transaction Volume',
    {
      position: new Vector3(0, 1.5, 0),
    },
    midShiftPanel5
  )

  let midPanel5Value1 = createStockPanelRow(
    2,1,
    StockDataRowTypes.LABEL_VALUE_UNIT,
    ['Yesterday',data.totalMANALandAndEstateYesterday.toString(),'MANA'],
    {
      position: new Vector3(-1, 0.9, 0),//position: new Vector3(0.7, 0.9, 0),
    },
    midShiftPanel5
  )

  let midPanel5Value2 = createStockPanelRow(
    2,2,
    StockDataRowTypes.LABEL_VALUE_UNIT,
    ['7 Days',data.totalMANALandAndEstateWeek.toString(),'MANA'],
    {
      position: new Vector3(-1, 0.4, 0),//position: new Vector3(0.7, 0.4, 0),
    },
    midShiftPanel5
  )

  let midPanel5Value3 = createStockPanelRow(
    2,3,
    StockDataRowTypes.LABEL_VALUE_UNIT,
    ['30 Days',data.totalMANALandAndEstateMonth.toString(),'MANA'],
    {
      position: new Vector3(-1, -0.1, 0),//position: new Vector3(0.7, -0.1, 0),
    },
    midShiftPanel5
  )


  //6
  // link to parcel on market
  let linkToParcel = new Entity()
  linkToParcel.setParent(midShiftPanel6)
  linkToParcel.addComponent(new PlaneShape())
  linkToParcel.addComponent(
    new Transform({
      position: new Vector3(0, 0.5, -0.25),
      scale: new Vector3(3, 3, 3),
    })
  )
  linkToParcel.addComponent(invisibleMaterial)
  linkToParcel.addComponent(
    new OnPointerDown(
      (e) => {
        let url =
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/' +
          data.cheapestLandNow.parcel.tokenId
        openExternalURL(url)
      },
      {
        button: ActionButton.PRIMARY,
        hoverText: 'Open in Market',
      }
    )
  )
  engine.addEntity(linkToParcel)

  let midPane6Title = new StockData(
    StockDataTypes.TITLE,
    'Cheapest Parcel On Sale',
    {
      position: new Vector3(0, 1.6, 0),
    },
    midShiftPanel6
  )

  let midPane6Title2 = new StockData(
    StockDataTypes.TITLE,
    'now in the market',
    {
      position: new Vector3(0, 1.3, 0),
    },
    midShiftPanel6
  )

  let midPane6Title3 = new StockData(
    StockDataTypes.BIGTITLE,
    data.cheapestLandNow.parcel.x.toString() +
      ', ' +
      data.cheapestLandNow.parcel.y.toString(),
    {
      position: new Vector3(0, 0.8, 0),
    },
    midShiftPanel6
  )

  let cheapParcelPrice = toMana(
    data.cheapestLandNow.searchOrderPrice
  ).toString()

  let midPane6Value1 = new StockData(
    StockDataTypes.VALUE,
    cheapParcelPrice,
    {
      position: new Vector3(-0.65, 0, 0),
    },
    midShiftPanel6
  )

  let midPane6VUnit1 = new StockData(
    StockDataTypes.UNIT,
    'MANA',
    {
      position: new Vector3(0.65, 0, 0),
    },
    midShiftPanel6
  )

  let midPane6VLabel1 = new StockData(
    StockDataTypes.LABEL,
    'owner:',
    {
      position: new Vector3(-1, -0.4, 0),
    },
    midShiftPanel6
  )

  let shortenedOwner =
    data.cheapestLandNow.owner.address.slice(0, 5) +
    '...' +
    data.cheapestLandNow.owner.address.slice(
      data.cheapestLandNow.owner.address.length - 4
    )

  let midPane6Value2 = new StockData(
    StockDataTypes.VALUE,
    shortenedOwner,
    {
      position: new Vector3(0.5, -0.4, 0),
    },
    midShiftPanel6
  )

  //TODO

  ///// TOP FLOOR (WEARABLES)
  //1

  let topPanel1Title = new StockData(
    StockDataTypes.BIGTITLE,
    'Wearable Sales',
    {
      position: new Vector3(0, 0.9, 0),
    },
    topShiftPanel1
  )


  let topPanel1Value1 = createStockPanelRow(
    3,1,
    StockDataRowTypes.LABEL_VALUE,
    ['Yesterday',data.wearableSalesYesterday.toString()],
    {
      position: new Vector3(-0.7, 0, 0),
    },
    topShiftPanel1
  )

  let topPanel1Value2 = createStockPanelRow(
    3,2,
    StockDataRowTypes.LABEL_VALUE,
    ['7 Days',data.wearableSalesWeek.toString()],
    {
      position: new Vector3(-0.7, -0.5, 0),
    },
    topShiftPanel1
  )

  let topPanel1Value3 = createStockPanelRow(
    3,3,
    StockDataRowTypes.LABEL_VALUE,
    ['30 Days',data.wearableSalesMonth.toString()],
    {
      position: new Vector3(-0.7, -1, 0),
    },
    topShiftPanel1
  )

  //2

  let topPanel2Title = new StockData(
    StockDataTypes.BIGTITLE,
    'Most Expensive Wearable',
    {
      position: new Vector3(0.2, 0.9, 0),
    },
    topShiftPanel2
  )

  let topPanel2Value1 = createStockPanelRow(
    3,1,
    StockDataRowTypes.LABEL_VALUE_UNIT,
    ['Yesterday',shortenText(data.expensiveWearableYesterday.toString(), 24),'MANA'],
    {
      position: new Vector3(-1, 0, 0),//position: new Vector3(0.7, 0, 0),
    }, 
    topShiftPanel2
  )
 
  let topPanel2Value2 = createStockPanelRow(
    3,2,
    StockDataRowTypes.LABEL_VALUE_UNIT,
    ['7 Days',shortenText(data.expensiveWearableWeek.toString(), 24),'MANA'],
    {
      position: new Vector3(-1, -0.5, 0),//position: new Vector3(0.7, -0.5, 0),
    },
    topShiftPanel2
  )

  let topPanel2Value3 = createStockPanelRow(
    3,3,
    StockDataRowTypes.LABEL_VALUE_UNIT,
    ['30 Days',shortenText(data.expensiveWearableMonth.toString(), 24),'MANA'],
    {
      position: new Vector3(-1, -1, 0),//position: new Vector3(0.7, -1, 0),
    },
    topShiftPanel2
  )

  //3

  let topPanel3Title = new StockData(
    StockDataTypes.BIGTITLE,
    'Most Expensive Wearable',
    {
      position: new Vector3(0.2, 0.9, 0),
    },
    topShiftPanel3
  )

  let topPanel3Label1 = new StockData(
    StockDataTypes.LABEL,
    'Yesterday',
    {
      position: new Vector3(-1.8, 0, 0),
    },
    topShiftPanel3
  )
  let topPanel3Label2 = new StockData(
    StockDataTypes.LABEL,
    '7 days',
    {
      position: new Vector3(-1.8, -0.5, 0),
    },
    topShiftPanel3
  )
  let topPanel3Label3 = new StockData(
    StockDataTypes.LABEL,
    '30 days',
    {
      position: new Vector3(-1.8, -1, 0),
    },
    topShiftPanel3
  )

  let topPanel3Value1 = new StockData(
    StockDataTypes.VALUE,
    firstNonBlank([shortenText(data.expensiveWearableNameYesterday, 24)],DATA_NOT_AVAILABLE),
    {
      position: new Vector3(1.2, 0, 0),
    },
    topShiftPanel3
  )

  let topPanel3Value2 = new StockData(
    StockDataTypes.VALUE,
    firstNonBlank( [shortenText(data.expensiveWearableNameWeek, 24)],DATA_NOT_AVAILABLE),
    {
      position: new Vector3(1.2, -0.5, 0),
    },
    topShiftPanel3
  )

  let topPanel3Value3 = new StockData(
    StockDataTypes.VALUE,
    firstNonBlank([shortenText(data.expensiveWearableNameMonth, 24)],DATA_NOT_AVAILABLE),
    {
      position: new Vector3(1.2, -1, 0),
    },
    topShiftPanel3
  )

  //4

  let topPanel4Title = new StockData(
    StockDataTypes.BIGTITLE,
    'Wearable Transactions',
    {
      position: new Vector3(0, 0.9, 0),
    },
    topShiftPanel4
  )

  let topPanel4Value1 = createStockPanelRow(
    3,1,
    StockDataRowTypes.LABEL_VALUE_UNIT,
    ['Yesterday',Math.floor(data.totalMANAWearablesYesterday).toString(),'MANA'],
    {
      position: new Vector3(-1.3, 0, 0),//position: new Vector3(0.7, 0, 0),
    },
    topShiftPanel4
  )

  let topPanel4Value2 = createStockPanelRow(
    3,2,
    StockDataRowTypes.LABEL_VALUE_UNIT,
    ['7 Days',Math.floor(data.totalMANAWearablesWeek).toString(),'MANA'],
    {
      position: new Vector3(-1.3, -0.5, 0),//position: new Vector3(0.7, -0.5, 0),
    },
    topShiftPanel4
  )

  let topPanel4Value3 = createStockPanelRow(
    3,3,
    StockDataRowTypes.LABEL_VALUE_UNIT,
    ['30 Days',Math.floor(data.totalMANAWearablesMonth).toString(),'MANA'],
    {
      position: new Vector3(-1.3, -1, 0),//position: new Vector3(0.7, -1, 0),
    },
    topShiftPanel4
  )

  //5

  let topPanel5Title = new StockData(
    StockDataTypes.BIGTITLE,
    'Wearable Transactions',
    {
      position: new Vector3(0, 1.05, 0),
    },
    topShiftPanel5
  )

  let topPanel5Title2 = new StockData(
    StockDataTypes.TITLE,
    'last 30 days',
    {
      position: new Vector3(0, 0.6, 0),
    },
    topShiftPanel5
  )


  let topPanel5Value1 = createStockPanelRow(
    3,1,
    StockDataRowTypes.LABEL_VALUE,
    ['Uncommon',data.uncommonWearableMonthSales.toString()],
    {
      position: new Vector3(-1.3, 0.2, 0),
    },
    topShiftPanel5
  )

  let topPanel5Value2 = createStockPanelRow(
    3,2,
    StockDataRowTypes.LABEL_VALUE,
    ['Rare',data.rareWearableMonthSales.toString()],
    {
      position: new Vector3(-1.3, -0.3, 0),
    },
    topShiftPanel5
  )

  let topPanel5Value3 = createStockPanelRow(
    3,3,
    StockDataRowTypes.LABEL_VALUE,
    ['Epic',data.epicWearableMonthSales.toString()],
    {
      position: new Vector3(-1.3, -0.8, 0),
    },
    topShiftPanel5
  )

  let topPanel5Value4 = createStockPanelRow(
    3,4,
    StockDataRowTypes.LABEL_VALUE,
    ['Legendary',data.legendaryWearableMonthSales.toString()],
    {
      position: new Vector3(-1.3, -1.3, 0),
    },
    topShiftPanel5
  )
 
  let topPanel5Value5 = createStockPanelRow(
    3,5,
    StockDataRowTypes.LABEL_VALUE,
    ['Mythic',data.mythicWearableMonthSales.toString()],
    {
      position: new Vector3(-1.3, -1.8, 0),
    },
    topShiftPanel5
  )

  //6

  let topPanel6Title = new StockData(
    StockDataTypes.BIGTITLE,
    'Average Price',
    {
      position: new Vector3(0, 1.05, 0),
    },
    topShiftPanel6
  )

  let topPanel6Title2 = new StockData(
    StockDataTypes.TITLE,
    'last 30 days',
    {
      position: new Vector3(0, 0.6, 0),
    },
    topShiftPanel6
  )

  let avUncommonPrice =
    avgPrice(
      data.uncommonWearableMonthMANA , data.uncommonWearableMonthSales )

  let topPanel6Value1 = createStockPanelRow(
    3,1,
    StockDataRowTypes.LABEL_VALUE_UNIT,
    ['Uncommon',avUncommonPrice.toString(),'MANA'],
    {
      position: new Vector3(-1.3, 0.2, 0),
    },
    topShiftPanel6
  )

  let avRarePrice =
    avgPrice(
      data.rareWearableMonthMANA , data.rareWearableMonthSales)

  let topPanel6Value2 = createStockPanelRow(
    3,2,
    StockDataRowTypes.LABEL_VALUE_UNIT,
    ['Rare',avRarePrice.toString(),'MANA'],
    {
      position: new Vector3(-1.3, -0.3, 0),
    },
    topShiftPanel6
  )

  let avEpicPrice =
    avgPrice(
      data.epicWearableMonthMANA , data.epicWearableMonthSales)

  let topPanel6Value3 = createStockPanelRow(
    3,3,
    StockDataRowTypes.LABEL_VALUE_UNIT,
    ['Epic',avEpicPrice.toString(),'MANA'],
    {
      position: new Vector3(-1.3, -0.8, 0),
    },
    topShiftPanel6
  )

  let avLegendaryPrice =
    avgPrice(
      data.legendaryWearableMonthMANA , data.legendaryWearableMonthSales)

  let topPanel6Value4 = createStockPanelRow(
    3,4,
    StockDataRowTypes.LABEL_VALUE_UNIT,
    ['Legendary',avLegendaryPrice.toString(),'MANA'],
    {
      position: new Vector3(-1.3, -1.3, 0),
    },
    topShiftPanel6
  )

  let avMythicPrice =
    avgPrice(
      data.mythicWearableMonthMANA , data.mythicWearableMonthSales)
    

  let topPanel6Value5 = createStockPanelRow(
    3,5,
    StockDataRowTypes.LABEL_VALUE_UNIT,
    ['Mythic',avMythicPrice.toString(),'MANA'],
    {
      position: new Vector3(-1.3, -1.8, 0),
    },
    topShiftPanel6
  )


  /////// FLAT SCREENS

  // cheap Rare

  let cheapRareTitle = new StockData(
    StockDataTypes.TINYTITLE,
    'Cheapest Rare Wearable',
    {
      position: new Vector3(0, 3.8, -0.2),
    },
    rareBoard1
  )

  let cheapRareTitle2 = new StockData(
    StockDataTypes.TINYTITLE,
    'now in the market',
    {
      position: new Vector3(0, 3.6, -0.2),
    },
    rareBoard1
  )

  let cheapRareTitle3 = new StockData(
    StockDataTypes.TINYVALUE,
    firstNonBlank([shortenText(data.cheapRareNow.name, 24)],DATA_NOT_AVAILABLE),
    {
      position: new Vector3(0, 2.9, -0.2),
    },
    rareBoard1
  )
  cheapRareTitle3.getComponent(TextShape).color = Color3.FromHexString(
    '#3AD682'
  )

  let cheapRarePreview = new WearablePreview(
    data.cheapRareNow.image,
    {
      position: new Vector3(0, 1.5, -0.2),
    },
    rareBoard1
  )

  let cheapRareValue1 = new StockData(
    StockDataTypes.VALUE,
    toMana(data.cheapRareNow.searchOrderPrice).toString(),
    {
      position: new Vector3(0, 0.4, -0.2),
    },
    rareBoard1
  )
  cheapRareValue1.getComponent(TextShape).color = Color3.FromHexString(
    '#3AD682'
  )

  let cheapRareUnit = new StockData(
    StockDataTypes.UNIT,
    'MANA',
    {
      position: new Vector3(0, 0.1, -0.2),
    },
    rareBoard1
  )

  let cheapRareLabel = new StockData(
    StockDataTypes.TINYTITLE,
    'owner:',
    {
      position: new Vector3(-0.6, -0.4, -0.2),
    },
    rareBoard1
  )

  let shortenedRareOwner =
    data.cheapRareNow.owner.address.slice(0, 5) +
    '...' +
    data.cheapRareNow.owner.address.slice(
      data.cheapRareNow.owner.address.length - 4
    )

  let cheapRareValue = new StockData(
    StockDataTypes.TINYVALUE,
    shortenedRareOwner,
    {
      position: new Vector3(0.5, -0.4, -0.2),
    },
    rareBoard1
  )
  cheapRareValue.getComponent(TextShape).color = Color3.FromHexString('#3AD682')

  cheapRarePreview.addComponent(
    new OnPointerDown(
      (e) => {
        let url =
          'https://market.decentraland.org/contracts/' +
          data.cheapRareNow.contractAddress +
          '/tokens/' +
          data.cheapRareNow.tokenId
        openExternalURL(url)
      },
      {
        button: ActionButton.PRIMARY,
        hoverText: 'Open in Market',
      }
    )
  )

  /// expensive rare

  let expensiveRareTitle = new StockData(
    StockDataTypes.TINYTITLE,
    'Priciest Rare Wearable',
    {
      position: new Vector3(0, 3.8, -0.2),
    },
    rareBoard2
  )

  let expensiveRareTitle2 = new StockData(
    StockDataTypes.TINYTITLE,
    'sold in last 30 days',
    {
      position: new Vector3(0, 3.6, -0.2),
    },
    rareBoard2
  )

  let expensiveRareTitle3 = new StockData(
    StockDataTypes.TINYVALUE,
    firstNonBlank([shortenText(data.rareWearableMonthExpensive.name, 24)],DATA_NOT_AVAILABLE),
    {
      position: new Vector3(0, 2.9, -0.2),
    },
    rareBoard2
  )
  expensiveRareTitle3.getComponent(TextShape).color = Color3.FromHexString(
    '#3AD682'
  )

  let expensiveRarePreview = new WearablePreview(
    data.rareWearableMonthExpensive.image,
    {
      position: new Vector3(0, 1.5, -0.2),
    },
    rareBoard2
  )

  let expensiveRareValue1 = new StockData(
    StockDataTypes.VALUE,
    data.rareWearableMonthExpensive.price.toString(),
    {
      position: new Vector3(0, 0.4, -0.2),
    },
    rareBoard2
  )
  expensiveRareValue1.getComponent(TextShape).color = Color3.FromHexString(
    '#3AD682'
  )

  let expensiveRareUnit = new StockData(
    StockDataTypes.UNIT,
    'MANA',
    {
      position: new Vector3(0, 0.1, -0.2),
    },
    rareBoard2
  )

  // cheap epic

  let cheapEpicTitle = new StockData(
    StockDataTypes.TINYTITLE,
    'Cheapest Epic Wearable',
    {
      position: new Vector3(0, 3.8, -0.05),
    },
    epicBoard1
  )

  let cheapEpicTitle2 = new StockData(
    StockDataTypes.TINYTITLE,
    'now in the market',
    {
      position: new Vector3(0, 3.6, -0.05),
    },
    epicBoard1
  )

  let cheapEpicTitle3 = new StockData(
    StockDataTypes.TINYVALUE,
    shortenText(data.cheapEpicNow.name, 24),
    {
      position: new Vector3(0, 2.9, -0.05),
    },
    epicBoard1
  )
  cheapEpicTitle3.getComponent(TextShape).color = Color3.FromHexString(
    '#6297F2'
  )

  let cheapEpicPreview = new WearablePreview(
    data.cheapEpicNow.image,
    {
      position: new Vector3(0, 1.5, 0),
    },
    epicBoard1
  )

  let cheapEpicValue1 = new StockData(
    StockDataTypes.VALUE,
    toMana(data.cheapEpicNow.searchOrderPrice).toString(),
    {
      position: new Vector3(0, 0.4, -0.05),
    },
    epicBoard1
  )
  cheapEpicValue1.getComponent(TextShape).color = Color3.FromHexString(
    '#6297F2'
  )

  let cheapEpicUnit = new StockData(
    StockDataTypes.UNIT,
    'MANA',
    {
      position: new Vector3(0, 0.1, -0.05),
    },
    epicBoard1
  )

  let cheapEpicLabel = new StockData(
    StockDataTypes.TINYTITLE,
    'owner:',
    {
      position: new Vector3(-0.6, -0.4, -0.05),
    },
    epicBoard1
  )

  let shortenedepicOwner =
    data.cheapEpicNow.owner.address.slice(0, 5) +
    '...' +
    data.cheapEpicNow.owner.address.slice(
      data.cheapEpicNow.owner.address.length - 4
    )

  let cheapEpicValue = new StockData(
    StockDataTypes.TINYVALUE,
    shortenedepicOwner,
    {
      position: new Vector3(0.5, -0.4, -0.1),
    },
    epicBoard1
  )
  cheapEpicValue.getComponent(TextShape).color = Color3.FromHexString('#6297F2')

  cheapEpicPreview.addComponent(
    new OnPointerDown(
      (e) => {
        let url =
          'https://market.decentraland.org/contracts/' +
          data.cheapEpicNow.contractAddress +
          '/tokens/' +
          data.cheapEpicNow.tokenId
        openExternalURL(url)
      },
      {
        button: ActionButton.PRIMARY,
        hoverText: 'Open in Market',
      }
    )
  )

  /// expensive epic

  let expensiveEpicTitle = new StockData(
    StockDataTypes.TINYTITLE,
    'Priciest Epic Wearable',
    {
      position: new Vector3(0, 3.8, -0.2),
    },
    epicBoard2
  )

  let expensiveEpicTitle2 = new StockData(
    StockDataTypes.TINYTITLE,
    'sold in last 30 days',
    {
      position: new Vector3(0, 3.6, -0.2),
    },
    epicBoard2
  )

  let expensiveEpicTitle3 = new StockData(
    StockDataTypes.TINYVALUE,
    shortenText(data.epicWearableMonthExpensive.name, 24),
    {
      position: new Vector3(0, 2.9, -0.2),
    },
    epicBoard2
  )
  expensiveEpicTitle3.getComponent(TextShape).color = Color3.FromHexString(
    '#6297F2'
  )

  let expensiveEpicPreview = new WearablePreview(
    data.epicWearableMonthExpensive.image,
    {
      position: new Vector3(0, 1.5, -0.2),
    },
    epicBoard2
  )

  let expensiveEpicValue1 = new StockData(
    StockDataTypes.VALUE,
    data.epicWearableMonthExpensive.price.toString(),
    {
      position: new Vector3(0, 0.4, -0.2),
    },
    epicBoard2
  )
  expensiveEpicValue1.getComponent(TextShape).color = Color3.FromHexString(
    '#6297F2'
  )

  let expensiveEpicUnit = new StockData(
    StockDataTypes.UNIT,
    'MANA',
    {
      position: new Vector3(0, 0.1, -0.2),
    },
    epicBoard2
  )

  // cheap legendary

  let cheapLegendaryTitle = new StockData(
    StockDataTypes.TINYTITLE,
    'Cheapest Legendary Wearable',
    {
      position: new Vector3(-0.2, 3.8, 0),
    },
    legendaryBoard1
  )

  let cheapLegendaryTitle2 = new StockData(
    StockDataTypes.TINYTITLE,
    'now in the market',
    {
      position: new Vector3(-0.2, 3.6, 0),
    },
    legendaryBoard1
  )

  let cheapLegendaryTitle3 = new StockData(
    StockDataTypes.TINYVALUE,
    shortenText(data.cheapLegendaryNow.name, 24),
    {
      position: new Vector3(-0.2, 2.9, 0),
    },
    legendaryBoard1
  )
  cheapLegendaryTitle3.getComponent(TextShape).color = Color3.FromHexString(
    '#9E55E2'
  )

  let cheapLegendaryPreview = new WearablePreview(
    data.cheapLegendaryNow.image,
    {
      position: new Vector3(-0.2, 1.5, 0),
    },
    legendaryBoard1
  )

  let cheapLegendaryValue1 = new StockData(
    StockDataTypes.VALUE,
    toMana(data.cheapLegendaryNow.searchOrderPrice).toString(),
    {
      position: new Vector3(-0.2, 0.4, 0),
    },
    legendaryBoard1
  )
  cheapLegendaryValue1.getComponent(TextShape).color = Color3.FromHexString(
    '#9E55E2'
  )

  let cheapLegendaryUnit = new StockData(
    StockDataTypes.UNIT,
    'MANA',
    {
      position: new Vector3(-0.2, 0.1, 0),
    },
    legendaryBoard1
  )

  let cheapLegendaryLabel = new StockData(
    StockDataTypes.TINYTITLE,
    'owner:',
    {
      position: new Vector3(-0.8, -0.4, 0),
    },
    legendaryBoard1
  )

  let shortenedLegendaryOwner =
    data.cheapLegendaryNow.owner.address.slice(0, 5) +
    '...' +
    data.cheapLegendaryNow.owner.address.slice(
      data.cheapLegendaryNow.owner.address.length - 4
    )

  let cheapLegendaryValue = new StockData(
    StockDataTypes.TINYVALUE,
    shortenedLegendaryOwner,
    {
      position: new Vector3(0.3, -0.4, 0),
    },
    legendaryBoard1
  )
  cheapLegendaryValue.getComponent(TextShape).color = Color3.FromHexString(
    '#9E55E2'
  )

  cheapLegendaryPreview.addComponent(
    new OnPointerDown(
      (e) => {
        let url =
          'https://market.decentraland.org/contracts/' +
          data.cheapLegendaryNow.contractAddress +
          '/tokens/' +
          data.cheapLegendaryNow.tokenId
        openExternalURL(url)
      },
      {
        button: ActionButton.PRIMARY,
        hoverText: 'Open in Market',
      }
    )
  )

  /// expensive legendary

  let expensiveLegendaryTitle = new StockData(
    StockDataTypes.TINYTITLE,
    'Priciest Legendary Wearable',
    {
      position: new Vector3(0, 3.8, -0.2),
    },
    legendaryBoard2
  )

  let expensiveLegendaryTitle2 = new StockData(
    StockDataTypes.TINYTITLE,
    'sold in last 30 days',
    {
      position: new Vector3(0, 3.6, -0.2),
    },
    legendaryBoard2
  )

  let expensiveLegendaryTitle3 = new StockData(
    StockDataTypes.TINYVALUE,
    shortenText(data.legendaryWearableMonthExpensive.name, 24),
    {
      position: new Vector3(0, 2.9, -0.2),
    },
    legendaryBoard2
  )
  expensiveLegendaryTitle3.getComponent(TextShape).color = Color3.FromHexString(
    '#9E55E2'
  )

  let expensiveLegendaryPreview = new WearablePreview(
    data.legendaryWearableMonthExpensive.image,
    {
      position: new Vector3(0, 1.5, -0.2),
    },
    legendaryBoard2
  )

  let expensiveLegendaryValue1 = new StockData(
    StockDataTypes.VALUE,
    data.legendaryWearableMonthExpensive.price.toString(),
    {
      position: new Vector3(0, 0.4, -0.2),
    },
    legendaryBoard2
  )
  expensiveLegendaryValue1.getComponent(TextShape).color = Color3.FromHexString(
    '#9E55E2'
  )

  let expensiveLegendaryUnit = new StockData(
    StockDataTypes.UNIT,
    'MANA',
    {
      position: new Vector3(0, 0.1, -0.2),
    },
    legendaryBoard2
  )

  // cheap mythic

  let cheapMythicTitle = new StockData(
    StockDataTypes.TINYTITLE,
    'Cheapest Mythic Wearable',
    {
      position: new Vector3(0, 3.8, -0.1),
    },
    mythicBoard1
  )

  let cheapMythicTitle2 = new StockData(
    StockDataTypes.TINYTITLE,
    'now in the market',
    {
      position: new Vector3(0, 3.6, -0.1),
    },
    mythicBoard1
  )

  let cheapMythicTitle3 = new StockData(
    StockDataTypes.TINYVALUE,
    shortenText(data.cheapMythicNow.name, 24),
    {
      position: new Vector3(0, 2.9, -0.1),
    },
    mythicBoard1
  )
  cheapMythicTitle3.getComponent(TextShape).color = Color3.FromHexString(
    '#E43EC6'
  )

  let cheapMythicPreview = new WearablePreview(
    data.cheapMythicNow.image,
    {
      position: new Vector3(0, 1.5, -0.1),
    },
    mythicBoard1
  )

  let cheapMythicValue1 = new StockData(
    StockDataTypes.VALUE,
    toMana(data.cheapMythicNow.searchOrderPrice).toString(),
    {
      position: new Vector3(0, 0.4, -0.1),
    },
    mythicBoard1
  )
  cheapMythicValue1.getComponent(TextShape).color = Color3.FromHexString(
    '#E43EC6'
  )

  let cheapMythicUnit = new StockData(
    StockDataTypes.UNIT,
    'MANA',
    {
      position: new Vector3(0, 0.1, -0.1),
    },
    mythicBoard1
  )

  let cheapMythicLabel = new StockData(
    StockDataTypes.TINYTITLE,
    'owner:',
    {
      position: new Vector3(-0.6, -0.4, -0.1),
    },
    mythicBoard1
  )
  cheapMythicLabel.getComponent(TextShape).color = Color3.FromHexString(
    '#E43EC6'
  )

  let shortenedMythicOwner =
    data.cheapMythicNow.owner.address.slice(0, 5) +
    '...' +
    data.cheapMythicNow.owner.address.slice(
      data.cheapMythicNow.owner.address.length - 4
    )

  let cheapMythicValue = new StockData(
    StockDataTypes.TINYVALUE,
    shortenedMythicOwner,
    {
      position: new Vector3(0.5, -0.4, -0.1),
    },
    mythicBoard1
  )
  cheapMythicValue.getComponent(TextShape).color = Color3.FromHexString(
    '#E43EC6'
  )

  cheapMythicPreview.addComponent(
    new OnPointerDown(
      (e) => {
        let url =
          'https://market.decentraland.org/contracts/' +
          data.cheapMythicNow.contractAddress +
          '/tokens/' +
          data.cheapMythicNow.tokenId
        openExternalURL(url)
      },
      {
        button: ActionButton.PRIMARY,
        hoverText: 'Open in Market',
      }
    )
  )

  /// expensive mythic

  let expensiveMythicTitle = new StockData(
    StockDataTypes.TINYTITLE,
    'Priciest Mythic Wearable',
    {
      position: new Vector3(0, 3.8, -0.2),
    },
    mythicBoard2
  )

  let expensiveMythicTitle2 = new StockData(
    StockDataTypes.TINYTITLE,
    'sold in last 30 days',
    {
      position: new Vector3(0, 3.6, -0.2),
    },
    mythicBoard2
  )

  let expensiveMythicTitle3 = new StockData(
    StockDataTypes.TINYVALUE,
    shortenText(data.mythicWearableMonthExpensive.name, 24),
    {
      position: new Vector3(0, 2.9, -0.2),
    },
    mythicBoard2
  )
  expensiveMythicTitle3.getComponent(TextShape).color = Color3.FromHexString(
    '#E43EC6'
  )

  let expensiveMythicPreview = new WearablePreview(
    data.mythicWearableMonthExpensive.image,
    {
      position: new Vector3(0, 1.5, -0.2),
    },
    mythicBoard2
  )

  let expensiveMythicValue1 = new StockData(
    StockDataTypes.VALUE,
    data.mythicWearableMonthExpensive.price.toString(),
    {
      position: new Vector3(0, 0.4, -0.2),
    },
    mythicBoard2
  )
  expensiveMythicValue1.getComponent(TextShape).color = Color3.FromHexString(
    '#E43EC6'
  )

  let expensiveMythicUnit = new StockData(
    StockDataTypes.UNIT,
    'MANA',
    {
      position: new Vector3(0, 0.1, -0.2),
    },
    mythicBoard2
  )
}

function createStockPanelRow(floor: number, row: number, type: StockDataRowTypes, text: string[], position:TranformConstructorArgs, parent: Entity) {
  let midPanel5LabelPos:TranformConstructorArgs 
  let midPanel5TextPos:TranformConstructorArgs 
  let midPanel5UnitPos:TranformConstructorArgs 

  let positionVec =  position.position.clone()

  midPanel5LabelPos = {
    position: new Vector3(-1, positionVec.y, 0),
  }
  midPanel5TextPos = {
    position: new Vector3(0.7, positionVec.y, 0),
  }
  midPanel5UnitPos = {
    position: new Vector3(1.7, positionVec.y, 0),
  }

  let textVal = text[1]
  const hasNoData = textVal === undefined || textVal === 'NaN' || textVal ==='0'
  if(hasNoData){
    textVal = DATA_NOT_AVAILABLE 
  } 

  let midPanel5Label1 = new StockData(
    StockDataTypes.LABEL,
    text[0],
    midPanel5LabelPos,
    parent
  )
 
  let midPanel5Value1 = new StockData(
    StockDataTypes.VALUE,
    textVal,
    midPanel5TextPos,
    parent
  )

  let midPanel5Unit1:StockData|undefined
  if(type == StockDataRowTypes.LABEL_VALUE_UNIT){
    midPanel5Unit1 = new StockData(
      StockDataTypes.UNIT,
      text[2],
      midPanel5UnitPos,
      parent
    )
  }


  if(hasNoData){
    //stockData.textShape.width = 30
    midPanel5Value1.textShape.fontSize = midPanel5Value1.textShape.fontSize -1 
    midPanel5Value1.textShape.hTextAlign = 'center' 

    if(midPanel5Unit1 && midPanel5Unit1.hasComponent(TextShape)){
      midPanel5Unit1.getComponent(TextShape).visible=false
    } else{
      log("tried to remove but has TextShape shape??" ,midPanel5Unit1)
    }
  }

}

function avgPrice(arg0: number,arg1: number) {
  if(arg0 === undefined || arg1 === undefined || arg1 == 0){
    return 0
  }
  return Math.floor(
    (arg0 / arg1) * 100
  ) / 100
}
////// ROOFTOP MUSIC

//   const rooftopStation = 'https://edge.singsingmusic.net/MC2.mp3'

//   const marketMusicStreamEnt = new Entity()
//   engine.addEntity(marketMusicStreamEnt)

//   let marketMusicStream = new AudioStream(rooftopStation)
//   marketMusicStream.playing = false
//   marketMusicStreamEnt.addComponent(marketMusicStream)

//   const marketRoofTrigger = new Entity()
//   marketRoofTrigger.addComponent(
//     new Transform({ position: new Vector3(272, 29.7, 36) })
//   )

//   let marketRoofTriggerBox = new utils.TriggerBoxShape(
//     new Vector3(60, 6, 69),
//     Vector3.Zero()
//   )
//   marketRoofTrigger.addComponent(
//     new utils.TriggerComponent(
//       marketRoofTriggerBox, //shape
//       0, //layer
//       0, //triggeredByLayer
//       null, //onTriggerEnter
//       null, //onTriggerExit
//       () => {
//         marketMusicStream.playing = true
//       },
//       () => {
//         marketMusicStream.playing = false
//       }, //onCameraExit
//       false
//     )
//   )
//   engine.addEntity(marketRoofTrigger)
// }
