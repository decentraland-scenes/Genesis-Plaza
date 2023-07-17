

export type CampaignDataType ={
  defaultShow:CampaignDayType
  shows: CampaignDayType[]
}

export type CampaignDayType = {
  refId: string
  startTime: number
  //startTimeMS: number
  length: number
  campaigns:CampaignInstType[],
}
export type CampaignInstType = {
  refId: string
  campaignId: string
  campaignKey: string
}

export type ShowTypePlayListType = {
  lastShow: CampaignDayType
  currentShow: CampaignDayType
  nextShow: CampaignDayType
}

//export let currentlyPlaying: number | null


export type ShowResultType={
  show?:CampaignDayType
  offset?: number
  index?: number
}

export type ShowMatchRangeResult = {
  lastShow?: ShowResultType
  currentShow?: ShowResultType
  nextShow?: ShowResultType
}
