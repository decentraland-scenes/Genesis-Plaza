import { getCurrentRealm, Realm } from '@decentraland/EnvironmentAPI'
import { getUserData, UserData } from '@decentraland/Identity'

export let userData: UserData
export let playerRealm: Realm

let rarestEquippedItem: rarityLevel = 0

export async function fetchUserData() {
  const data = await getUserData()
  if (data) {
    log(data.displayName)
  }

  return data
}

export async function setUserData() {
  const data = await getUserData()
  if (data) {
    log(data.displayName)
    userData = data
    userData.userId = userData.userId.toLocaleLowerCase()
  }
}

// fetch the player's realm
export async function setRealm() {
  let realm = await getCurrentRealm()
  if (realm) {
    log(`You are in the realm: ${JSON.stringify(realm.displayName)}`)
    playerRealm = realm
    if (
      realm.domain === 'http://127.0.0.1:8000' ||
      realm.domain === 'http://192.168.0.18:8000'
    ) {
      realm.domain = 'https://peer.decentraland.org'
      log('CHANGED REALM TO: ', realm.domain)
    }
  }
}

/**
 * Returns profile of an address
 *
 * @param address ETH address
 */
export async function getUserInfo() {
  return (await fetch(
    `${playerRealm.domain}/content/entities/profiles?pointer=${userData.userId}`
  )
    .then((res) => res.json())
    .then((res) => {
      //  log('USERINF:', res)
      return res.length ? res[0] : res
    })) as Profiles
}

/**
 * Returns wearables inventory of an address
 *
 * @param address ETH address
 */
export async function getUserInventory() {
  log(
    `${playerRealm.domain}/lambdas/collections/wearables-by-owner/${userData.userId}?includeDefinitions`
  )
  const response = await fetch(
    `${playerRealm.domain}/lambdas/collections/wearables-by-owner/${userData.userId}?includeDefinitions`
  )
  const inventory = await response.json()

  //const response = await fetch(
  //   `https://wearable-api.decentraland.org/v2/addresses/${userData.userId}/wearables`
  // )
  //const inventory: Wearable[] = await response.json()

  return inventory
}

/**
 * Returns boolean if the user has an item in their inventory or equiped
 *
 * @param wearable DCL name of the wearable ('dcl://dcl_launch/razor_blade_upper_body')
 * @param equiped true if currently wearing
 */
export async function rarestItem(
  equiped: boolean = false
): Promise<rarityLevel> {
  if (!userData) await setUserData()
  if (!playerRealm) await setRealm()
  if (!userData.hasConnectedWeb3) return rarityLevel.none

  const profile = await getUserInfo()
  //log('PROFILE:, ',profile )
  const inventory = await getUserInventory()
  //log('INVENTORY:, ',inventory )
  if (!profile || !inventory) return rarityLevel.none
  // log('PROFILE: ', profile)
  //log('INVENTORY :', inventory)
  if (equiped) {
    const equipedAsUrn =
      profile.metadata.avatars[0]?.avatar?.wearables?.map(mapToUrn)
    for (const item of equipedAsUrn) {
      for (let invItem of inventory) {
        if (item === invItem.definition.id && invItem.definition.rarity) {
          updateRarity(invItem.definition.rarity)
          log('ONE ITEM OF RARITY ', invItem.definition.rarity)
        }
      }
    }
  } else {
    for (let invItem of inventory) {
      if (invItem.definition.rarity) {
        updateRarity(invItem.definition.rarity)
      }
    }
  }
  // log(rarityLevel[rarestEquippedItem])
  return rarestEquippedItem
}

export function updateRarity(rarity: Rarity) {
  let rarityNum: number = 0
  switch (rarity) {
    case 'common':
      rarityNum = 1
      break
    case 'uncommon':
      rarityNum = 2
      break
    case 'rare':
      rarityNum = 3
      break
    case 'epic':
      rarityNum = 4
      break
    case 'legendary':
      rarityNum = 5
      break
    case 'mythic':
      rarityNum = 6
      break
    case 'unique':
      rarityNum = 7
      break
    default:
      rarityNum = 0
      break
  }
  if (rarityNum > rarestEquippedItem) {
    rarestEquippedItem = rarityNum
    //log('new Rarest ', rarestEquippedItem, ' ')
  }
}

/**
 * Returns a Snapshots object, containing URLs to various snapshots of a player's face and full body
 *
 * @param playerID the ID of the player
 */
export async function getPlayerSnapshots(
  playerId?: string
): Promise<Snapshots | null> {
  if (!playerId) {
    const profile = await getUserInfo()
    playerId = profile.id
  }
  const realm = await getCurrentRealm().then((r: any) =>
    r.domain != 'http://127.0.0.1:8000'
      ? r.domain
      : 'https://peer.decentraland.org'
  )

  return await fetch(
    `${realm}/lambdas/profiles?field=snapshots&id=${playerId.toLowerCase()}`
  )
    .then((res) => res.json())
    .then((res) => {
      // log(res)
      return res[0].avatars.length
        ? (res[0].avatars[0].avatar.snapshots as Snapshots)
        : null
    })
  //
  // )
}

function mapToUrn(wearableId: string) {
  if (wearableId.indexOf('dcl://') < 0) {
    // Already urn
    return wearableId
  }
  const [collectionName, wearableName] = wearableId
    .replace('dcl://', '')
    .split('/')
  if (collectionName === 'base-avatars') {
    return `urn:decentraland:off-chain:base-avatars:${wearableName}`
  } else {
    return `urn:decentraland:ethereum:collections-v1:${collectionName}:${wearableName}`
  }
}

export enum rarityLevel {
  none,
  common,
  uncommon,
  rare,
  epic,
  legendary,
  mythic,
  unique,
}

export interface Profiles {
  id: string
  type: string
  timestamp: number
  pointers: string[]
  content: any[]
  metadata: Metadata
}

export interface Metadata {
  avatars: AvatarElement[]
}

export interface AvatarElement {
  userId: string
  email: string
  name: string
  hasClaimedName: boolean
  description: string
  ethAddress: string
  version: number
  avatar: AvatarAvatar
  inventory: string[]
  blocked: string[]
  tutorialStep: number
}

export interface AvatarAvatar {
  bodyShape: string
  snapshots: Snapshots
  eyes: Eyes
  hair: Eyes
  skin: Eyes
  wearables: string[]
  version: number
}

export interface Eyes {
  color: EyesColor
}

export interface EyesColor {
  color: ColorColor
}

export interface ColorColor {
  r: number
  g: number
  b: number
  a: number
}

export interface Snapshots {
  face: string
  face128: string
  face256: string
  body: string
}

export interface Wearable {
  id: string
  representations: Representation[]
  type: Type
  category: Category
  tags: string[]
  baseUrl: string
  i18n: I18N[]
  thumbnail: string
  image: string
  replaces?: Category[]
  hides?: Category[]
  description?: string
  rarity?: Rarity
}

export enum Category {
  BodyShape = 'body_shape',
  Earring = 'earring',
  Empty = '',
  Eyebrows = 'eyebrows',
  Eyes = 'eyes',
  Eyewear = 'eyewear',
  FacialHair = 'facial_hair',
  Feet = 'feet',
  Hair = 'hair',
  Hat = 'hat',
  Head = 'head',
  Helmet = 'helmet',
  LowerBody = 'lower_body',
  Mask = 'mask',
  Mouth = 'mouth',
  Tiara = 'tiara',
  TopHead = 'top_head',
  UpperBody = 'upper_body',
}

export interface I18N {
  code: Code
  text: string
}

export enum Code {
  En = 'en',
  Es = 'es',
}

export enum Rarity {
  Unique = 'unique',
  Mythic = 'mythic',
  Legendary = 'legendary',
  Epic = 'epic',
  Rare = 'rare',
  Uncommon = 'uncommon',
  Common = 'common',
}

export interface Representation {
  bodyShapes: BodyShape[]
  mainFile: string
  contents: Content[]
  overrideReplaces?: any[]
  overrideHides?: any[]
}

export enum BodyShape {
  Basefemale = 'Basefemale',
  DCLBaseAvatarsBaseFemale = 'dcl://base-avatars/BaseFemale',
  DCLBaseAvatarsBaseMale = 'dcl://base-avatars/BaseMale',
}

export interface Content {
  file: string
  hash: string
}

export enum Type {
  Wearable = 'wearable',
}

export interface Snapshots {
  face: string
  face128: string
  face256: string
  body: string
}
