import utils from '../../node_modules/decentraland-ecs-utils/index'
import { MarketData } from './serverHandler'

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

let topPanel1Title = new Entity()
topPanel1Title.addComponent(new TextShape('Board 1'))
topPanel1Title.setParent(topShiftPanel1)
topPanel1Title.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
  })
)

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
    position: new Vector3(0, 0, topBoardWidth + 0.05),
  })
)
topShiftPanel2.setParent(topRotationPanel2)
topShiftPanel2.getComponent(Transform).rotate(new Vector3(1, 0, 0), -30)

let topPanel2Title = new Entity()
topPanel2Title.addComponent(new TextShape('Board 2'))
topPanel2Title.setParent(topShiftPanel2)
topPanel2Title.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
  })
)

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
    position: new Vector3(0, 0, topBoardWidth + 0.1),
  })
)
topShiftPanel3.setParent(topRotationPanel3)
topShiftPanel3.getComponent(Transform).rotate(new Vector3(1, 0, 0), -30)

let topPanel3Title = new Entity()
topPanel3Title.addComponent(new TextShape('Board 3'))
topPanel3Title.setParent(topShiftPanel3)
topPanel3Title.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
  })
)

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
    position: new Vector3(0, 0, topBoardWidth + 0.05),
  })
)
topShiftPanel4.setParent(topRotationPanel4)
topShiftPanel4.getComponent(Transform).rotate(new Vector3(1, 0, 0), -30)

let topPanel4Title = new Entity()
topPanel4Title.addComponent(new TextShape('Board 4'))
topPanel4Title.setParent(topShiftPanel4)
topPanel4Title.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
  })
)

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

let topPanel5Title = new Entity()
topPanel5Title.addComponent(new TextShape('Board 5'))
topPanel5Title.setParent(topShiftPanel5)
topPanel5Title.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
  })
)

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

let topPanel6Title = new Entity()
topPanel6Title.addComponent(new TextShape('Board 6'))
topPanel6Title.setParent(topShiftPanel6)
topPanel6Title.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
  })
)

////// FLAT WEARABLE BOARDS

let mythicBoard1 = new Entity()
mythicBoard1.addComponent(
  new Transform({
    position: new Vector3(271.09, 21.6, 14.38),
    rotation: Quaternion.Euler(0, 205, 0),
  })
)

engine.addEntity(mythicBoard1)

let mythicBoard1Title = new Entity()
mythicBoard1Title.addComponent(new TextShape('Stonks'))
mythicBoard1Title.setParent(mythicBoard1)
mythicBoard1Title.addComponent(
  new Transform({
    position: new Vector3(0, 1, -0.2),
  })
)

let mythicBoard2 = new Entity()
mythicBoard2.addComponent(
  new Transform({
    position: new Vector3(258.25, 21.6, 19.46),
    rotation: Quaternion.Euler(0, 205, 0),
  })
)

engine.addEntity(mythicBoard2)

let mythicBoard2Title = new Entity()
mythicBoard2Title.addComponent(new TextShape('Stonks'))
mythicBoard2Title.setParent(mythicBoard2)
mythicBoard2Title.addComponent(
  new Transform({
    position: new Vector3(0, 1, -0.2),
  })
)

let legendaryBoard1 = new Entity()
legendaryBoard1.addComponent(
  new Transform({
    position: new Vector3(296.55, 21.6, 35.86),
    rotation: Quaternion.Euler(0, 115, 0),
  })
)

engine.addEntity(legendaryBoard1)

let legendaryBoard1Title = new Entity()
legendaryBoard1Title.addComponent(new TextShape('Stonks'))
legendaryBoard1Title.setParent(legendaryBoard1)
legendaryBoard1Title.addComponent(
  new Transform({
    position: new Vector3(0, 1, -0.2),
  })
)

let legendaryBoard2 = new Entity()
legendaryBoard2.addComponent(
  new Transform({
    position: new Vector3(291.21, 21.6, 22.68),
    rotation: Quaternion.Euler(0, 115, 0),
  })
)

engine.addEntity(legendaryBoard2)

let legendaryBoard2Title = new Entity()
legendaryBoard2Title.addComponent(new TextShape('Stonks'))
legendaryBoard2Title.setParent(legendaryBoard2)
legendaryBoard2Title.addComponent(
  new Transform({
    position: new Vector3(0, 1, -0.2),
  })
)

let swankyBoard1 = new Entity()
swankyBoard1.addComponent(
  new Transform({
    position: new Vector3(275.07, 21.6, 61.29),
    rotation: Quaternion.Euler(0, 25, 0),
  })
)

engine.addEntity(swankyBoard1)

let swankyBoard1Title = new Entity()
swankyBoard1Title.addComponent(new TextShape('Stonks'))
swankyBoard1Title.setParent(swankyBoard1)
swankyBoard1Title.addComponent(
  new Transform({
    position: new Vector3(0, 1, -0.2),
  })
)

let swankyBoard2 = new Entity()
swankyBoard2.addComponent(
  new Transform({
    position: new Vector3(288.03, 21.6, 56),
    rotation: Quaternion.Euler(0, 25, 0),
  })
)

engine.addEntity(swankyBoard2)

let swankyBoard2Title = new Entity()
swankyBoard2Title.addComponent(new TextShape('Stonks'))
swankyBoard2Title.setParent(swankyBoard2)
swankyBoard2Title.addComponent(
  new Transform({
    position: new Vector3(0, 1, -0.2),
  })
)

let epicBoard1 = new Entity()
epicBoard1.addComponent(
  new Transform({
    position: new Vector3(249.42, 21.6, 39.43),
    rotation: Quaternion.Euler(0, 295, 0),
  })
)

engine.addEntity(epicBoard1)

let epicBoard1Title = new Entity()
epicBoard1Title.addComponent(new TextShape('Stonks'))
epicBoard1Title.setParent(epicBoard1)
epicBoard1Title.addComponent(
  new Transform({
    position: new Vector3(0, 1, -0.2),
  })
)

let epicBoard2 = new Entity()
epicBoard2.addComponent(
  new Transform({
    position: new Vector3(254.54, 21.6, 52.54),
    rotation: Quaternion.Euler(0, 295, 0),
  })
)

engine.addEntity(epicBoard2)

let epicBoard2Title = new Entity()
epicBoard2Title.addComponent(new TextShape('Stonks'))
epicBoard2Title.setParent(epicBoard2)
epicBoard2Title.addComponent(
  new Transform({
    position: new Vector3(0, 1, -0.2),
  })
)

////// UPDATE BOARDS

export enum StockDataTypes {
  BIGTITLE = 'bigtitle',
  BIGVALUE = 'bigvalue',
  TITLE = 'title',
  LABEL = 'label',
  VALUE = 'value',
  UNIT = 'unit',
}

let SFFont = new Font(Fonts.SanFrancisco)

//// CLEAR OLD TEXT SHAPES

export class StockData extends Entity {
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

    let shape = new TextShape(text)

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
      case StockDataTypes.UNIT:
        shape.fontSize = 2
        shape.color = Color3.White()
        shape.vTextAlign = 'right'
        break
    }

    this.addComponent(shape)
  }
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
    data.coins.BTCUSDT.toString() + ' USD',
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
    data.coins.ETHUSDT.toString() + ' USD',
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
    data.coins.MANAETH.toString() + ' ETH',
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
    data.coins.MANAUSD.toString() + ' USD',
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
    totalTokenSalesWeek.toString() + ' tokens',
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
    roundedTotalTokenManaWeek.toString() + ' USD',
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

  let midPanel1Label1 = new StockData(
    StockDataTypes.LABEL,
    'Yesterday',
    {
      position: new Vector3(-0.7, 0.9, 0),
    },
    midShiftPanel1
  )
  let midPanel1Label2 = new StockData(
    StockDataTypes.LABEL,
    '7 days',
    {
      position: new Vector3(-0.7, 0.4, 0),
    },
    midShiftPanel1
  )
  let midPanel1Label3 = new StockData(
    StockDataTypes.LABEL,
    '30 days',
    {
      position: new Vector3(-0.7, -0.1, 0),
    },
    midShiftPanel1
  )

  let midPanel1Value1 = new StockData(
    StockDataTypes.VALUE,
    data.landSalesYesterday.toString(),
    {
      position: new Vector3(0.7, 0.9, 0),
    },
    midShiftPanel1
  )

  let midPanel1Value2 = new StockData(
    StockDataTypes.VALUE,
    data.landSalesWeek.toString(),
    {
      position: new Vector3(0.7, 0.4, 0),
    },
    midShiftPanel1
  )

  let midPanel1Value3 = new StockData(
    StockDataTypes.VALUE,
    data.landSalesMonth.toString(),
    {
      position: new Vector3(0.7, -0.1, 0),
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

  let midPanel2Label1 = new StockData(
    StockDataTypes.LABEL,
    'Yesterday',
    {
      position: new Vector3(-1, 0.9, 0),
    },
    midShiftPanel2
  )
  let midPanel2Label2 = new StockData(
    StockDataTypes.LABEL,
    '7 days',
    {
      position: new Vector3(-1, 0.4, 0),
    },
    midShiftPanel2
  )
  let midPanel2Label3 = new StockData(
    StockDataTypes.LABEL,
    '30 days',
    {
      position: new Vector3(-1, -0.1, 0),
    },
    midShiftPanel2
  )

  let midPanel2Value1 = new StockData(
    StockDataTypes.VALUE,
    data.cheapestLandYesterday.toString(),
    {
      position: new Vector3(0.7, 0.9, 0),
    },
    midShiftPanel2
  )

  let midPanel2Value2 = new StockData(
    StockDataTypes.VALUE,
    data.cheapestLandWeek.toString(),
    {
      position: new Vector3(0.7, 0.4, 0),
    },
    midShiftPanel2
  )

  let midPanel2Value3 = new StockData(
    StockDataTypes.VALUE,
    data.cheapestLandMonth.toString(),
    {
      position: new Vector3(0.7, -0.1, 0),
    },
    midShiftPanel2
  )

  let midPanel2Unit1 = new StockData(
    StockDataTypes.UNIT,
    'MANA',
    {
      position: new Vector3(1.7, 0.9, 0),
    },
    midShiftPanel2
  )

  let midPanel2Unit2 = new StockData(
    StockDataTypes.UNIT,
    'MANA',
    {
      position: new Vector3(1.7, 0.4, 0),
    },
    midShiftPanel2
  )

  let midPanel2Unit3 = new StockData(
    StockDataTypes.UNIT,
    'MANA',
    {
      position: new Vector3(1.7, -0.1, 0),
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

  let midPanel3Label1 = new StockData(
    StockDataTypes.LABEL,
    'Yesterday',
    {
      position: new Vector3(-1, 0.9, 0),
    },
    midShiftPanel3
  )
  let midPanel3Label2 = new StockData(
    StockDataTypes.LABEL,
    '7 days',
    {
      position: new Vector3(-1, 0.4, 0),
    },
    midShiftPanel3
  )
  let midPanel3Label3 = new StockData(
    StockDataTypes.LABEL,
    '30 days',
    {
      position: new Vector3(-1, -0.1, 0),
    },
    midShiftPanel3
  )

  let midPanel3Value1 = new StockData(
    StockDataTypes.VALUE,
    data.expensiveLandYesterday.toString(),
    {
      position: new Vector3(0.7, 0.9, 0),
    },
    midShiftPanel3
  )

  let midPanel3Value2 = new StockData(
    StockDataTypes.VALUE,
    data.expensiveLandWeek.toString(),
    {
      position: new Vector3(0.7, 0.4, 0),
    },
    midShiftPanel3
  )

  let midPanel3Value3 = new StockData(
    StockDataTypes.VALUE,
    data.expensiveLandMonth.toString(),
    {
      position: new Vector3(0.7, -0.1, 0),
    },
    midShiftPanel3
  )

  let midPanel3Unit1 = new StockData(
    StockDataTypes.UNIT,
    'MANA',
    {
      position: new Vector3(1.7, 0.9, 0),
    },
    midShiftPanel3
  )

  let midPanel3Unit2 = new StockData(
    StockDataTypes.UNIT,
    'MANA',
    {
      position: new Vector3(1.7, 0.4, 0),
    },
    midShiftPanel3
  )

  let midPanel3Unit3 = new StockData(
    StockDataTypes.UNIT,
    'MANA',
    {
      position: new Vector3(1.7, -0.1, 0),
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

  let midPanel4Label1 = new StockData(
    StockDataTypes.LABEL,
    'Yesterday',
    {
      position: new Vector3(-1, 0.9, 0),
    },
    midShiftPanel4
  )
  let midPanel4Label2 = new StockData(
    StockDataTypes.LABEL,
    '7 days',
    {
      position: new Vector3(-1, 0.4, 0),
    },
    midShiftPanel4
  )
  let midPanel4Label3 = new StockData(
    StockDataTypes.LABEL,
    '30 days',
    {
      position: new Vector3(-1, -0.1, 0),
    },
    midShiftPanel4
  )

  let midPanel4Value1 = new StockData(
    StockDataTypes.VALUE,
    data.expensiveEstateYesterday.toString(),
    {
      position: new Vector3(0.7, 0.9, 0),
    },
    midShiftPanel4
  )

  let midPanel4Value2 = new StockData(
    StockDataTypes.VALUE,
    data.expensiveEstateWeek.toString(),
    {
      position: new Vector3(0.7, 0.4, 0),
    },
    midShiftPanel4
  )

  let midPanel4Value3 = new StockData(
    StockDataTypes.VALUE,
    data.expensiveEstateMonth.toString(),
    {
      position: new Vector3(0.7, -0.1, 0),
    },
    midShiftPanel4
  )

  let midPanel4Unit1 = new StockData(
    StockDataTypes.UNIT,
    'MANA',
    {
      position: new Vector3(1.7, 0.9, 0),
    },
    midShiftPanel4
  )

  let midPanel4Unit2 = new StockData(
    StockDataTypes.UNIT,
    'MANA',
    {
      position: new Vector3(1.7, 0.4, 0),
    },
    midShiftPanel4
  )

  let midPanel4Unit3 = new StockData(
    StockDataTypes.UNIT,
    'MANA',
    {
      position: new Vector3(1.7, -0.1, 0),
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

  let midPanel5Label1 = new StockData(
    StockDataTypes.LABEL,
    'Yesterday',
    {
      position: new Vector3(-1, 0.9, 0),
    },
    midShiftPanel5
  )
  let midPanel5Label2 = new StockData(
    StockDataTypes.LABEL,
    '7 days',
    {
      position: new Vector3(-1, 0.4, 0),
    },
    midShiftPanel5
  )
  let midPanel5Label3 = new StockData(
    StockDataTypes.LABEL,
    '30 days',
    {
      position: new Vector3(-1, -0.1, 0),
    },
    midShiftPanel5
  )

  let midPanel5Value1 = new StockData(
    StockDataTypes.VALUE,
    data.totalMANALandAndEstateYesterday.toString(),
    {
      position: new Vector3(0.7, 0.9, 0),
    },
    midShiftPanel5
  )

  let midPanel5Value2 = new StockData(
    StockDataTypes.VALUE,
    data.totalMANALandAndEstateWeek.toString(),
    {
      position: new Vector3(0.7, 0.4, 0),
    },
    midShiftPanel5
  )

  let midPanel5Value3 = new StockData(
    StockDataTypes.VALUE,
    data.totalMANALandAndEstateMonth.toString(),
    {
      position: new Vector3(0.7, -0.1, 0),
    },
    midShiftPanel5
  )

  let midPanel5Unit1 = new StockData(
    StockDataTypes.UNIT,
    'MANA',
    {
      position: new Vector3(1.7, 0.9, 0),
    },
    midShiftPanel5
  )

  let midPanel5Unit2 = new StockData(
    StockDataTypes.UNIT,
    'MANA',
    {
      position: new Vector3(1.7, 0.4, 0),
    },
    midShiftPanel5
  )

  let midPanel5Unit3 = new StockData(
    StockDataTypes.UNIT,
    'MANA',
    {
      position: new Vector3(1.7, -0.1, 0),
    },
    midShiftPanel5
  )

  //6

  let midPane61Title = new StockData(
    StockDataTypes.BIGTITLE,
    'Cheapest Parcel On Sale',
    {
      position: new Vector3(0, 1.5, 0),
    },
    midShiftPanel6
  )

  ///// TOP FLOOR (WEARABLES)
  //1
}

////// ROOFTOP MUSIC

const rooftopStation = 'https://edge.singsingmusic.net/MC2.mp3'

const marketMusicStreamEnt = new Entity()
engine.addEntity(marketMusicStreamEnt)

let marketMusicStream = new AudioStream(rooftopStation)
marketMusicStream.playing = false
marketMusicStreamEnt.addComponent(marketMusicStream)

const marketRoofTrigger = new Entity()
marketRoofTrigger.addComponent(
  new Transform({ position: new Vector3(272, 29.7, 36) })
)

let marketRoofTriggerBox = new utils.TriggerBoxShape(
  new Vector3(60, 6, 69),
  Vector3.Zero()
)
marketRoofTrigger.addComponent(
  new utils.TriggerComponent(
    marketRoofTriggerBox, //shape
    0, //layer
    0, //triggeredByLayer
    null, //onTriggerEnter
    null, //onTriggerExit
    () => {
      marketMusicStream.playing = true
    },
    () => {
      marketMusicStream.playing = false
    }, //onCameraExit
    false
  )
)
engine.addEntity(marketRoofTrigger)
