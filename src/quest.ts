import { RemoteQuestTracker } from '@dcl/ecs-quests'
import { ProgressStatus } from 'dcl-quests-client/quests-client-amd'
import { QuestState } from 'node_modules/dcl-quests-client/index'
//import { query } from '@dcl/quests-query'

export enum taskIds {
  intro = '1100d825-8047-406c-bc71-cf60b53f41b1',
  catGuy = '3ce03e46-0b47-4411-811a-657267dc9c30',
  findCat = '4ccc0ed4-4f76-415a-95d9-aa87ecf0ed6b',
  catGuyEnd = 'ffa02dc8-6d70-4c91-949b-54448e0c47be',
  wearables = 'c5e8018a-37b3-43dc-9d66-21aeb2ef3c34',
  findWearable = 'cec5d55d-b312-47bd-bdd6-9b84df5ef73f',
  wenMoon = '334b14e4-169d-497c-9599-244dde08bf61',
  coins = '91e1f3ed-f443-43c1-bdca-1bcf41509aaa',
  wenMoonEnd = '74410d43-c9a1-4efb-b3c3-cd2080e2b18e',
  outro = 'c92128f1-48f3-4756-a471-28f92ff98d7f',
}

export let client: RemoteQuestTracker

export let questProg: QuestState

export async function handleQuests() {
  client = await new RemoteQuestTracker('12ab0f81-b1ea-4c67-941c-8f6b0fe7b966')
  questProg = await client.getCurrentStatePromise()

  log('QUEST ', questProg)
  if (questProg.progressStatus != ProgressStatus.COMPLETED) {
    // if (query(q).isTaskCompleted(taskIds.intro)) {
    // }
  }
}
