import { addArcades } from '../arcades/arcades'
import { addPunchBag } from '../interactiveItems'
import {
  createCollectionsVerticalMenu,
  createWearablesHorizontalMenu,
  updateCollectionsMenu,
} from '../ui/menuMainFunctions'

export let upstairsLoaded: boolean = false

export function upstairsBar() {
  if (upstairsLoaded) return

  upstairsLoaded = true

  addArcades()
  addPunchBag()

  const center = new Vector3(8, 0, 8)
  const collectionMenuOffset = new Vector3(1.6, 2.05, -0.5)
  // Horizontal MENUS
  let rotation = Quaternion.Euler(0, 45 + 180, 0)

  // -- wearables menu
  let wearablesMenu = createWearablesHorizontalMenu(
    {
      position: new Vector3(140.50420880317688, 10.7, 139.12817668914795),
      rotation: rotation,
      scale: new Vector3(1, 1, 1),
    },
    2
  )

  // -- Collections Menu
  let collectionsMenu = createCollectionsVerticalMenu(
    {
      //position: new Vector3(posVec.x -1.6, posVec.y +2.2, posVec.z-0.6),
      position: new Vector3(
        collectionMenuOffset.x,
        collectionMenuOffset.y,
        collectionMenuOffset.z
      ),
      scale: new Vector3(1, 1, 1),
    },
    wearablesMenu,
    7
  )
  updateCollectionsMenu(collectionsMenu, wearablesMenu, 10, true)
}
