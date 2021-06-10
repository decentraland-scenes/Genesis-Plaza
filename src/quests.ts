import { RemoteQuestTracker } from '@dcl/ecs-quests'
import { ProgressStatus, QuestState } from 'dcl-quests-client/quests-client-amd'
//import { query } from '@dcl/quests-query'

export enum taskIds {
  intro = 'e173239d-13dd-48bb-9332-b30472e7941a',
  forestHerb = 'fca9b784-bfd7-453c-b51e-34dbb36415e7',
  medievalHerb = 'bee981f6-53b9-4f60-b7c7-3578a325f4fb',
  asianHerb = '8c2c4f32-590c-43ca-ba9c-03768065461a',
  catHair = '812b968f-806d-4194-86ef-35edbd6d7712',
  talkChaman = '285c92a6-84b8-4a68-a083-c8737c89d17a',
  gems = '58e29d3b-bf6e-416b-bb77-35756120ab9c',
  placeGems = 'ae33a6b2-f4d2-48f6-bed6-406a8873b556',
  caliz = 'd142506e-84da-4955-8e56-a3e0fa5ae4b5',
  outro = 'cb67b6df-990c-4bcf-82b9-175126f7a302',
}

export let client: RemoteQuestTracker

export let questProg: QuestState

export async function handleQuests() {
  if (client) return
  client = await new RemoteQuestTracker('18d80de8-9367-4cf1-9eda-de3513dc316d')
  questProg = await client.getCurrentStatePromise()

  log('QUEST ', questProg)
  if (questProg.progressStatus != ProgressStatus.COMPLETED) {
    // if (query(q).isTaskCompleted(taskIds.intro)) {
    // }
  }
}

export async function updateQuests() {
  questProg = await client.getCurrentStatePromise()
  return
}
