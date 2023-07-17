import * as ui from '@dcl/ui-scene-utils'

export type ClaimUIConfig = {
    bgTexture: string
    claimServer: string
    bgTextureInst?: Texture
    resolveSourceImageSize?: (data: ItemData) => number
    customPromptStyle?: ui.PromptStyles
}


export type RewardData = {
    ok: boolean
    data: ItemData[]
    code?: string
    error?: string
}


export type CaptchaData={
    id: string,
    width: number,
    height: number,
    image: string
}
export type CaptchaResponse={
    ok:boolean,
    data: CaptchaData
}

export enum ChallengeDataStatus{
    None = "None",
    Canceled = "Canceled",
    AnswerProvided = "AnswerProvided",
}

export type ChallengeData={
    challenge:CaptchaResponse;
    answer?:string;
    status:ChallengeDataStatus;
}

export type ItemData = {
    id: string
    user: string
    campaign_id: string
    status: ClaimState
    transaction_hash: string | null
    transaction_id: string | null
    token: string
    value: string
    created_at: string
    updated_at: string
    from_referral: null
    block_number: null
    claim_id: string | null
    target: string
    payload: string | null
    expires_at: string | null
    signature: string | null
    airdrop_type: string
    group: string | null
    priority: string
    campaign_key: string
    assigned_at: string
    image: string
    chain_id: ChainId
}

export enum ChainId {
    ETHEREUM_MAINNET = 1,
    ETHEREUM_ROPSTEN = 3,
    ETHEREUM_RINKEBY = 4,
    ETHEREUM_GOERLI = 5,
    ETHEREUM_KOVAN = 42,
    MATIC_MAINNET = 137,
    MATIC_MUMBAI = 80001,
}

export enum ClaimState {
    ASSIGNED = 'assigned',
    SENDING = 'sending',
    SUCCESS = 'success',
    CONFIRMED = 'confirmed',
    REJECTED = 'rejected',
}

export enum ClaimCodes {
    BENEFICIARY_INVALID = 'beneficiary_invalid',
    BENEFICIARY_NOT_CONNECTED = 'beneficiary_not_connected',
    BENEFICIARY_POSITION = 'beneficiary_position',
    CAMPAIGN_UNINITIATED = 'campaign_uninitiated',
    CAMPAIGN_KEY_UNINITIATED = 'campaign_key_uninitiated',
    CAMPAIGN_KEY_DISABLED = 'campaign_key_disabled',
    CAMPAIGN_FINISHED = 'campaign_finished',
    CAMPAIGN_KEY_FINISHED = 'campaign_key_finished',
    BENEFICIARY_WEB3_CONNECTED = 'beneficiary_not_web3_connected',
    OUT_OF_STOCK = 'out_of_stock',
    ALREADY_HAVE_IT = 'already_have_it',
    CLAIM_IN_PROGRESS = 'claim-in-progress',
    CAPTCHA_INVALID = 'capthcha_invalid'
}

export enum ClaimUiType {
    CLAIM_RESULT = 'claim-result',
    ERROR = 'error',
    CAPTCHA_TIMEOUT = 'captcha-timeout',
    ERROR_NOT_ON_MAP = 'not-on-map',
    OUT_OF_STOCK = 'out_of_stock',
    NOTHING_TO_CLAIM = 'nothing-to-claim',
    REQUIRES_WEB3 = 'requires-web3',
    YOU_ALREADY_HAVE_IT = 'you-already-have-it',
    CLAIM_IN_PROGRESS = 'claim-in-progress'
}

export type DispenserClickableModel = 'button'|'item'|'booth'|'collider'


export type DispenserUI = {
    boothModel: string
    boothModelButton: string
    boothModelItem?:string
    boothCollider?:string
    clickModel?:DispenserClickableModel[]
    hoverText: string
}

export interface IDispenser {
    button: Entity
    item?: Entity
    alreadyAttempted: boolean
    timeToClickable: number
    claimData: ClaimTokenRequestArgs
    wearableUrnsToCheck: string[]
    getOnPointerDown:()=>OnPointerDown
    //claimUI:ClaimUI
    //claimConfig?:ClaimConfigCampaignType
    //lastClaimResult?:ClaimTokenResult
}


export type ClaimDataInst = {
    dispData: DispenserPos
    entity: Entity | IDispenser
}


export type ClaimTokenRequestArgs = {
    claimServer: string
    campaign: string
    campaign_key: string
    claimConfig?: ClaimConfigCampaignType
    challenge?: ChallengeData
}



export type ClaimConfigCampaignType = {
    campaign: string
    campaignKeys: Record<string, string>
    wearableUrnsToCheck: string[]
    refId: string
}

export type DispenserPos = {
    name: string
    model: string | Shape
    claimConfig: ClaimConfigCampaignType
    claimData: ClaimTokenRequestArgs
    dispenserUI: DispenserUI
    wearableUrnsToCheck?: string[]
    claimUIConfig?: ClaimUIConfig
    transform: TransformConstructorArgs
    entityModel?: Entity
}
