import { MarketData, Rarity, Direction, CoinData } from './custonTypes'
import { uploadMarketData } from './awsUpload'

require('isomorphic-fetch')

// Open Sea Keys
const OpenSea = require('../keys/opensea-key.json')

//// MAIN FUNCTIONS

export async function updateMarketData() {
  let dataToSend: MarketData = {
    coins: null,
    landSalesYesterday: 0,
    landSalesWeek: 0,
    landSalesMonth: 0,
    cheapestLandYesterday: 0,
    cheapestLandWeek: 0,
    cheapestLandMonth: 0,
    expensiveLandYesterday: 0,
    expensiveLandWeek: 0,
    expensiveLandMonth: 0,
    expensiveEstateYesterday: 0,
    expensiveEstateWeek: 0,
    expensiveEstateMonth: 0,
    totalMANALandAndEstateYesterday: 0,
    totalMANALandAndEstateWeek: 0,
    totalMANALandAndEstateMonth: 0,
    cheapestLandNow: null,
    wearableSalesYesterday: 0,
    wearableSalesWeek: 0,
    wearableSalesMonth: 0,
    expensiveWearableYesterday: 0,
    expensiveWearableWeek: 0,
    expensiveWearableMonth: 0,
    expensiveWearableNameYesterday: '',
    expensiveWearableNameWeek: '',
    expensiveWearableNameMonth: '',
    uncommonWearableMonthSales: 0,
    uncommonWearableMonthMANA: 0,
    uncommonWearableMonthExpensive: null,
    rareWearableMonthSales: 0,
    rareWearableMonthMANA: 0,
    rareWearableMonthExpensive: null,
    epicWearableMonthSales: 0,
    epicWearableMonthMANA: 0,
    epicWearableMonthExpensive: null,
    legendaryWearableMonthSales: 0,
    legendaryWearableMonthMANA: 0,
    legendaryWearableMonthExpensive: null,
    mythicWearableMonthSales: 0,
    mythicWearableMonthMANA: 0,
    mythicWearableMonthExpensive: null,
    totalMANAWearablesYesterday: 0,
    totalMANAWearablesWeek: 0,
    totalMANAWearablesMonth: 0,
    cheapRareNow: null,
    cheapEpicNow: null,
    cheapLegendaryNow: null,
    cheapMythicNow: null,
  }

  let dateNow = Math.floor(Date.now() / 1000)

  let dateYesterday = Math.floor(Date.now() / 1000 - 1 * 24 * 60 * 60)

  let dateWeekAgo = Math.floor(Date.now() / 1000 - 7 * 24 * 60 * 60)

  let dateMonthAgo = Math.floor(Date.now() / 1000 - 30 * 24 * 60 * 60)

  let landContract = '0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d'

  let estateContract = '0x959e104e1a4db6317fa58f8295f586e1a978c297'

  let wearablesContract = '0xc04528c14c8ffd84c7c1fb6719b4a89853035cdd'
  //{  "ExclusiveMasksCollection": "0xc04528c14c8ffd84c7c1fb6719b4a89853035cdd",
  //   "Halloween2019Collection": "0xc1f4b0eea2bd6690930e6c66efd3e197d620b9c2",
  //   "Halloween2019CollectionFactory": "0x07ccfd0fbada4ac3c22ecd38037ca5e5c0ad8cfa",
  //   "Xmas2019Collection": "0xc3af02c0fd486c8e9da5788b915d6fff3f049866",
  //   "MCHCollection": "0xf64dc33a192e056bb5f0e5049356a0498b502d50",
  //   "CommunityContestCollection": "0x32b7495895264ac9d0b12d32afd435453458b1c6",
  //   "DCLLaunchCollection": "0xd35147be6401dcb20811f2104c33de8e97ed6818",
  //   "DCGCollection": "0x3163d2cfee3183f9874e2869942cc62649eeb004"
  //   }

  let yesterdayLandSales = await getOpenSeaEventsJSON(
    'https://api.opensea.io/api/v1/events?only_opensea=false&asset_contract_address=' +
      landContract +
      '&offset=0&event_type=successful&occurred_after=' +
      dateYesterday +
      '&limit=300'
  )
  let weekLandSales = await getOpenSeaEventsJSON(
    'https://api.opensea.io/api/v1/events?only_opensea=false&asset_contract_address=' +
      landContract +
      '&offset=0&event_type=successful&occurred_after=' +
      dateWeekAgo +
      '&limit=300'
  )
  let monthLandSales = await getOpenSeaEventsJSON(
    'https://api.opensea.io/api/v1/events?only_opensea=false&asset_contract_address=' +
      landContract +
      '&offset=0&event_type=successful&occurred_after=' +
      dateMonthAgo +
      '&limit=300'
  )

  let yesterdayWearablesSales = await getOpenSeaEventsJSON(
    'https://api.opensea.io/api/v1/events?only_opensea=false&asset_contract_address=' +
      wearablesContract +
      '&offset=0&event_type=successful&occurred_after=' +
      dateYesterday +
      '&limit=300'
  )
  let weekWearablesSales = await getOpenSeaEventsJSON(
    'https://api.opensea.io/api/v1/events?only_opensea=false&asset_contract_address=' +
      wearablesContract +
      '&offset=0&event_type=successful&occurred_after=' +
      dateWeekAgo +
      '&limit=300'
  )
  let monthWearablesSales = await getOpenSeaEventsJSON(
    'https://api.opensea.io/api/v1/events?only_opensea=false&asset_contract_address=' +
      wearablesContract +
      '&offset=0&event_type=successful&occurred_after=' +
      dateMonthAgo +
      '&limit=300'
  )

  dataToSend.coins = await updateCoinData()

  /// LAND YESTERDAY

  for (let i = 0; i < yesterdayLandSales.length; i++) {
    if (
      yesterdayLandSales[i] &&
      yesterdayLandSales[i].payment_token &&
      yesterdayLandSales[i].payment_token.symbol != 'MANA'
    ) {
      continue
    }
    if (!yesterdayLandSales[i].asset) {
      continue
    }

    dataToSend.totalMANALandAndEstateYesterday += toMana(
      yesterdayLandSales[i].total_price
    )

    if (yesterdayLandSales[i].asset.asset_contract.address === landContract) {
      if (
        toMana(yesterdayLandSales[i].total_price) >
        dataToSend.expensiveLandYesterday
      ) {
        dataToSend.expensiveLandYesterday = toMana(
          yesterdayLandSales[i].total_price
        )
      }
      if (
        toMana(yesterdayLandSales[i].total_price) <
          dataToSend.cheapestLandYesterday ||
        dataToSend.cheapestLandYesterday === 0
      ) {
        dataToSend.cheapestLandYesterday = toMana(
          yesterdayLandSales[i].total_price
        )
      }
    } else if (
      yesterdayLandSales[i].asset.asset_contract.address === estateContract
    ) {
      if (
        toMana(yesterdayLandSales[i].total_price) >
        dataToSend.expensiveEstateYesterday
      ) {
        dataToSend.expensiveEstateYesterday = toMana(
          yesterdayLandSales[i].total_price
        )
      }
    }
  }
  dataToSend.landSalesYesterday = yesterdayLandSales.length

  // LAND WEEK
  for (let i = 0; i < weekLandSales.length; i++) {
    if (
      weekLandSales[i] &&
      weekLandSales[i].payment_token &&
      weekLandSales[i].payment_token.symbol != 'MANA'
    ) {
      continue
    }
    if (!weekLandSales[i].asset) {
      continue
    }

    dataToSend.totalMANALandAndEstateWeek += toMana(
      weekLandSales[i].total_price
    )

    if (weekLandSales[i].asset.asset_contract.address === landContract) {
      if (toMana(weekLandSales[i].total_price) > dataToSend.expensiveLandWeek) {
        dataToSend.expensiveLandWeek = toMana(weekLandSales[i].total_price)
      }
      if (
        toMana(weekLandSales[i].total_price) < dataToSend.cheapestLandWeek ||
        dataToSend.cheapestLandWeek === 0
      ) {
        dataToSend.cheapestLandWeek = toMana(weekLandSales[i].total_price)
      }
    } else if (
      weekLandSales[i].asset.asset_contract.address === estateContract
    ) {
      if (
        toMana(weekLandSales[i].total_price) > dataToSend.expensiveEstateWeek
      ) {
        dataToSend.expensiveEstateWeek = toMana(weekLandSales[i].total_price)
      }
    }
  }
  dataToSend.landSalesWeek = weekLandSales.length

  /// LAND MONTH

  for (let i = 0; i < monthLandSales.length; i++) {
    if (
      monthLandSales[i] &&
      monthLandSales[i].payment_token &&
      monthLandSales[i].payment_token.symbol != 'MANA'
    ) {
      continue
    }
    if (!monthLandSales[i].asset) {
      continue
    }

    dataToSend.totalMANALandAndEstateMonth += toMana(
      monthLandSales[i].total_price
    )

    if (monthLandSales[i].asset.asset_contract.address === landContract) {
      if (
        toMana(monthLandSales[i].total_price) > dataToSend.expensiveLandMonth
      ) {
        dataToSend.expensiveLandMonth = toMana(monthLandSales[i].total_price)
      }
      if (
        toMana(monthLandSales[i].total_price) < dataToSend.cheapestLandMonth ||
        dataToSend.cheapestLandMonth === 0
      ) {
        dataToSend.cheapestLandMonth = toMana(monthLandSales[i].total_price)
      }
    } else if (
      monthLandSales[i].asset.asset_contract.address === estateContract
    ) {
      if (
        toMana(monthLandSales[i].total_price) > dataToSend.expensiveEstateMonth
      ) {
        dataToSend.expensiveEstateMonth = toMana(monthLandSales[i].total_price)
      }
    }
  }
  dataToSend.landSalesMonth = monthLandSales.length

  //// WEARABLES YESTERDAY

  for (let i = 0; i < yesterdayWearablesSales.length; i++) {
    if (
      yesterdayWearablesSales[i] &&
      yesterdayWearablesSales[i].payment_token &&
      yesterdayWearablesSales[i].payment_token.symbol != 'MANA'
    ) {
      continue
    }

    if (yesterdayWearablesSales[i].asset) {
      if (
        toMana(yesterdayWearablesSales[i].total_price) >
          dataToSend.expensiveWearableYesterday ||
        dataToSend.expensiveWearableYesterday === 0
      ) {
        dataToSend.expensiveWearableYesterday = toMana(
          yesterdayWearablesSales[i].total_price
        )
        dataToSend.expensiveWearableNameYesterday =
          yesterdayWearablesSales[i].asset.name
      }
    }

    dataToSend.totalMANAWearablesYesterday += toMana(
      yesterdayWearablesSales[i].total_price
    )
  }
  dataToSend.wearableSalesYesterday = yesterdayWearablesSales.length

  //// WEARABLES WEEK
  for (let i = 0; i < weekWearablesSales.length; i++) {
    if (
      weekWearablesSales[i] &&
      weekWearablesSales[i].payment_token &&
      weekWearablesSales[i].payment_token.symbol != 'MANA'
    ) {
      continue
    }

    if (weekWearablesSales[i] && weekWearablesSales[i].asset) {
      if (
        toMana(weekWearablesSales[i].total_price) >
          dataToSend.expensiveWearableWeek ||
        dataToSend.expensiveWearableWeek === 0
      ) {
        dataToSend.expensiveWearableWeek = toMana(
          weekWearablesSales[i].total_price
        )
        dataToSend.expensiveWearableNameWeek = weekWearablesSales[i].asset.name
      }
    }

    dataToSend.totalMANAWearablesWeek += toMana(
      weekWearablesSales[i].total_price
    )
  }
  dataToSend.wearableSalesWeek = weekWearablesSales.length

  //// WEARABLES MONTH

  for (let i = 0; i < monthWearablesSales.length; i++) {
    if (
      monthWearablesSales[i] &&
      monthWearablesSales[i].payment_token &&
      monthWearablesSales[i].payment_token.symbol != 'MANA'
    ) {
      continue
    }

    if (monthWearablesSales[i].asset) {
      if (
        toMana(monthWearablesSales[i].total_price) >
          dataToSend.expensiveWearableMonth ||
        dataToSend.expensiveWearableMonth === 0
      ) {
        dataToSend.expensiveWearableNameMonth =
          monthWearablesSales[i].asset.name

        dataToSend.expensiveWearableMonth = toMana(
          monthWearablesSales[i].total_price
        )
      }

      let rarity = rarityFromDesc(monthWearablesSales[i].asset.description)

      switch (rarity) {
        case Rarity.UNCOMMON:
          dataToSend.uncommonWearableMonthMANA += toMana(
            monthWearablesSales[i].total_price
          )
          dataToSend.uncommonWearableMonthSales += 1

          if (
            !dataToSend.uncommonWearableMonthExpensive ||
            toMana(monthWearablesSales[i].total_price) >
              dataToSend.uncommonWearableMonthExpensive.price
          ) {
            dataToSend.uncommonWearableMonthExpensive = {
              name: monthWearablesSales[i].asset.name,
              price: toMana(monthWearablesSales[i].total_price),
              image: monthWearablesSales[i].asset.image_thumbnail_url,
              rarity: rarity,
            }
          }

          break
        case Rarity.RARE:
          dataToSend.rareWearableMonthMANA += toMana(
            monthWearablesSales[i].total_price
          )
          dataToSend.rareWearableMonthSales += 1

          if (
            !dataToSend.rareWearableMonthExpensive ||
            toMana(monthWearablesSales[i].total_price) >
              dataToSend.rareWearableMonthExpensive.price
          ) {
            dataToSend.rareWearableMonthExpensive = {
              name: monthWearablesSales[i].asset.name,
              price: toMana(monthWearablesSales[i].total_price),
              image: monthWearablesSales[i].asset.image_thumbnail_url,
              rarity: rarity,
            }
          }
          break
        case Rarity.EPIC:
          dataToSend.epicWearableMonthMANA += toMana(
            monthWearablesSales[i].total_price
          )
          dataToSend.epicWearableMonthSales += 1

          if (
            !dataToSend.epicWearableMonthExpensive ||
            toMana(monthWearablesSales[i].total_price) >
              dataToSend.epicWearableMonthExpensive.price
          ) {
            dataToSend.epicWearableMonthExpensive = {
              name: monthWearablesSales[i].asset.name,
              price: toMana(monthWearablesSales[i].total_price),
              image: monthWearablesSales[i].asset.image_thumbnail_url,
              rarity: rarity,
            }
          }
          break
        case Rarity.LEGENDARY:
          dataToSend.legendaryWearableMonthMANA += toMana(
            monthWearablesSales[i].total_price
          )
          dataToSend.legendaryWearableMonthSales += 1

          if (
            !dataToSend.legendaryWearableMonthExpensive ||
            toMana(monthWearablesSales[i].total_price) >
              dataToSend.legendaryWearableMonthExpensive.price
          ) {
            dataToSend.legendaryWearableMonthExpensive = {
              name: monthWearablesSales[i].asset.name,
              price: toMana(monthWearablesSales[i].total_price),
              image: monthWearablesSales[i].asset.image_thumbnail_url,
              rarity: rarity,
            }
          }
          break
        case Rarity.MYTHIC:
          dataToSend.mythicWearableMonthMANA += toMana(
            monthWearablesSales[i].total_price
          )
          dataToSend.mythicWearableMonthSales += 1

          if (
            !dataToSend.mythicWearableMonthExpensive ||
            toMana(monthWearablesSales[i].total_price) >
              dataToSend.mythicWearableMonthExpensive.price
          ) {
            dataToSend.mythicWearableMonthExpensive = {
              name: monthWearablesSales[i].asset.name,
              price: toMana(monthWearablesSales[i].total_price),
              image: monthWearablesSales[i].asset.image_thumbnail_url,
              rarity: rarity,
            }
          }
          break
        case Rarity.UNIQUE:
          break
      }
    }

    dataToSend.totalMANAWearablesMonth += toMana(
      monthWearablesSales[i].total_price
    )
  }
  dataToSend.wearableSalesMonth = monthWearablesSales.length

  //// wearable sales examples

  dataToSend.cheapRareNow = await getMarketplaceWearable(
    Rarity.RARE,
    Direction.ASC,
    dateNow
  )

  dataToSend.cheapEpicNow = await getMarketplaceWearable(
    Rarity.EPIC,
    Direction.ASC,
    dateNow
  )

  dataToSend.cheapLegendaryNow = await getMarketplaceWearable(
    Rarity.LEGENDARY,
    Direction.ASC,
    dateNow
  )

  dataToSend.cheapMythicNow = await getMarketplaceWearable(
    Rarity.MYTHIC,
    Direction.ASC,
    dateNow
  )

  dataToSend.cheapestLandNow = await getMarketplaceParcel(dateNow)

  console.log('DATA TO SEND: ', dataToSend)

  if (
    dataToSend.wearableSalesMonth < dataToSend.wearableSalesYesterday ||
    dataToSend.totalMANALandAndEstateMonth <
      dataToSend.totalMANALandAndEstateYesterday
  ) {
    console.log('data incomplete, will not upload')
    return
  }
  uploadMarketData(dataToSend)
}

export async function updateCoinData(): Promise<CoinData> {
  let data: CoinData = {
    MANAETH: 0,
    ETHUSDT: 0,
    BTCUSDT: 0,
    MANAUSD: 0,
  }

  try {
    let targetUrl = 'https://api.binance.com/api/v1/ticker/allPrices'
    let response = await fetch(targetUrl)
    let json = await response.json()

    for (var i = 0; i < json.length; i++) {
      switch (json[i].symbol) {
        case 'MANAETH':
          data.MANAETH = parseFloat(json[i].price)
          break
        case 'ETHUSDT':
          data.ETHUSDT = parseFloat(json[i].price)
          break
        case 'BTCUSDT':
          data.BTCUSDT = parseFloat(json[i].price)
          break
      }
    }

    data.MANAUSD = data.MANAETH * data.ETHUSDT

    return data
  } catch {
    console.log('Failed to connect to Binance API.')
    return data
  }
}

/// HELPER FUNCTIONS

export async function getOpenSeaEventsJSON(
  url: string,
  alreadyCollected?: [],
  offset?: number
): Promise<any[]> {
  try {
    let finalURL = url
    if (offset) {
      finalURL = url + '&offset=' + offset
    }
    const opts = { headers: { 'X-API-KEY': OpenSea.OpenSeaKey } }

    let response = await fetch(finalURL, opts).then()
    let json = await response.json()
    let fullList = json.asset_events
    if (alreadyCollected) {
      fullList = json.asset_events.concat(alreadyCollected)
    }

    if (json.asset_events.length >= 300) {
      console.log('long response for ', finalURL)

      let offset: number = 0

      offset = fullList.length

      return await getOpenSeaEventsJSON(url, fullList, offset)
    } else {
      return fullList
    }
  } catch {
    console.log('error fetching from OpenSea API')
    console.log('url used: ', url, ' offset ', offset)
    if (alreadyCollected) {
      return alreadyCollected
    }
    return []
  }
}

export async function getMarketplaceWearable(
  rarity: Rarity,
  direction: Direction,
  maxDate: number
) {
  const url = 'https://api.thegraph.com/subgraphs/name/decentraland/marketplace'

  let query =
    `{
	  nfts(orderDirection: ` +
    direction +
    `, orderBy: searchOrderPrice, first:1, where:{ searchWearableRarity: ` +
    rarity +
    `, category: wearable, searchOrderStatus:open, searchOrderExpiresAt_gt:` +
    maxDate * 1000 +
    `
	}) {
	  id
	  name
	   owner{address}
	  image
	  contractAddress
	  tokenId
	  searchOrderPrice
		searchOrderStatus
	  wearable{ name, representationId, collection, description, category, rarity, bodyShapes }
	  }
  }
	  `
  const opts = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  }

  try {
    const res = await fetch(url, opts)
    let json = await res.json()
    return json.data.nfts[0]
  } catch (error) {
    console.log(`Error fetching wearable dat `, error)
    throw error
  }
}

export async function getMarketplaceParcel(maxDate: number) {
  const url = 'https://api.thegraph.com/subgraphs/name/decentraland/marketplace'

  let query =
    ` {
			  nfts(orderBy: searchOrderPrice, orderDirection: asc,  first: 1, where:{ category: parcel, searchOrderStatus:open, searchOrderExpiresAt_gt: ` +
    maxDate * 1000 +
    `})
				  {
					id
					 name
				searchOrderPrice
				parcel{x,y, tokenId}
				owner{address}
			}
			}
		`
  const opts = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  }

  try {
    const res = await fetch(url, opts)
    let json = await res.json()
    return json.data.nfts[0]
  } catch (error) {
    console.log(`Error fetching wearable dat `, error)
    throw error
  }
}

export function rarityFromDesc(desc: string) {
  //"DCL Wearable 2754/5000"
  //"DCL Wearable 659/1000"
  //"DCL Wearable 17/100"
  //"DCL Wearable 17/10"

  let type: Rarity = Rarity.COMMON
  // fetch everything after last slash
  let tokenCount = desc.match('([^/]+$)')

  if (tokenCount) {
    switch (tokenCount[1]) {
      case '10000':
        type = Rarity.UNCOMMON
        break
      case '5000':
        type = Rarity.RARE
        break
      case '1000':
        type = Rarity.EPIC
        break
      case '100':
        type = Rarity.LEGENDARY
        break
      case '10':
        type = Rarity.MYTHIC
        break
      case '1':
        type = Rarity.UNIQUE
        break
    }
  }

  return type
}

export function toMana(longNum: string) {
  let shortNum = parseFloat(longNum) / 1000000000000000000
  let squaredNum = shortNum * Math.pow(10, 4)
  return Math.round(squaredNum) / Math.pow(10, 4)
}
