//  let now = String(Math.floor(Date.now() / 1000))
//  let day = String(Math.floor(Date.now() / 1000 - (1 * 24  * 60 * 60)))
//  let seven_days = String(Math.floor(Date.now() / 1000 - (7 * 24  * 60 * 60)))
//  let thirty_days = String(Math.floor(Date.now() / 1000 - (30 * 24  * 60 * 60)))

// async function getMarketData(wearableName: string) {
//   let now = String(Math.floor(Date.now() / 1000))
//   const query =
//     `
// 		{
// 			nfts(first: 1,  orderBy: searchOrderPrice, orderDirection: asc, where:{ category: wearable, searchText: "` +
//     wearableName +
//     `", searchOrderStatus:open, searchOrderExpiresAt_gt:` +
//     now +
//     `
// 		  }) {
// 			  id
// 			name
// 			image
// 			contractAddress
// 			tokenId
// 			wearable{ name, representationId, collection, description, category, rarity, bodyShapes }
// 			searchOrderPrice
// 			searchOrderStatus
// 			owner{address}
// 			activeOrder {
// 				id
// 			  }
// 			}
// 		}`

//   log('query: ', query)

//   // const variables = { x, y }
//   try {
//     let response = queryGraph(query)
//     log('wearable info: ', await response)
//     return response
//   } catch (error) {
//     log(`Error fetching wearable dat `, error)
//     throw error
//   }
// }

// async function queryGraph(query: string) {
//   const url = 'https://api.thegraph.com/subgraphs/name/decentraland/marketplace'
//   const opts = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ query }),
//   }
//   const res = await fetch(url, opts)
//   return res.json()
// }
