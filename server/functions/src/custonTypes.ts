export type messageBoard = {
  name: string
  messages: string[]
}

export type WearableData = {
  activeOrder: { id: string }
  id: string
  name: string
  owner: { address: string }
  contractAddress: string
  tokenId: string
  image: string
  searchOrderPrice: number
  searchOrderStatus: string
  wearable: {
    bodyShapes: string[]
    category: string
    collection: string
    description: string
    name: string
    rarity: string
    representationId: string
  }
}

export type WearableDataMini = {
  name: string
  price: number
  image: string
  rarity: string
}

export type ParcelData = {
  id: string
  name: string
  searchOrderPrice: number
  parcel: { x: number; y: number; tokenId: string }
  owner: { address: string }
}

export type CoinData = {
  MANAETH: number
  ETHUSDT: number
  BTCUSDT: number
  MANAUSD: number
}

export type MarketData = {
  coins: CoinData | null
  landSalesYesterday: number
  landSalesWeek: number
  landSalesMonth: number
  cheapestLandYesterday: number
  cheapestLandWeek: number
  cheapestLandMonth: number
  expensiveLandYesterday: number
  expensiveLandWeek: number
  expensiveLandMonth: number
  expensiveEstateYesterday: number
  expensiveEstateWeek: number
  expensiveEstateMonth: number
  totalMANALandAndEstateYesterday: number
  totalMANALandAndEstateWeek: number
  totalMANALandAndEstateMonth: number
  cheapestLandNow: ParcelData | null
  wearableSalesYesterday: number
  wearableSalesWeek: number
  wearableSalesMonth: number
  expensiveWearableYesterday: number
  expensiveWearableWeek: number
  expensiveWearableMonth: number
  expensiveWearableNameYesterday: string
  expensiveWearableNameWeek: string
  expensiveWearableNameMonth: string
  uncommonWearableMonthSales: number
  uncommonWearableMonthMANA: number
  uncommonWearableMonthExpensive: WearableDataMini | null
  rareWearableMonthSales: number
  rareWearableMonthMANA: number
  rareWearableMonthExpensive: WearableDataMini | null
  epicWearableMonthSales: number
  epicWearableMonthMANA: number
  epicWearableMonthExpensive: WearableDataMini | null
  legendaryWearableMonthSales: number
  legendaryWearableMonthMANA: number
  legendaryWearableMonthExpensive: WearableDataMini | null
  mythicWearableMonthSales: number
  mythicWearableMonthMANA: number
  mythicWearableMonthExpensive: WearableDataMini | null
  totalMANAWearablesYesterday: number
  totalMANAWearablesWeek: number
  totalMANAWearablesMonth: number
  cheapRareNow: WearableData | null
  cheapEpicNow: WearableData | null
  cheapLegendaryNow: WearableData | null
  cheapMythicNow: WearableData | null
}

export enum Direction {
  ASC = 'asc',
  DESC = 'desc',
}

export enum Rarity {
  COMMON = '"common"',
  UNCOMMON = '"uncommon"',
  RARE = '"rare"',
  EPIC = '"epic"',
  LEGENDARY = '"legendary"',
  MYTHIC = '"mythic"',
  UNIQUE = '"unique"',
}
