import { changeMural } from './serverHandler'
import resources from "../resources"

// Setup for multiplayer
export const sceneMessageBus = new MessageBus()
export let tiles: Tile[] = []

export let tileNumbers: number[] = []

// Colors to cycle through (7 main colours + white + black)
const colors: Color3[] = [
  Color3.White(), // White
  Color3.FromHexString('#ff363f'), // Red
  Color3.FromHexString('#ff881f'), // Orange
  Color3.FromHexString('#ffea00'), // Yellow
  Color3.FromHexString('#00b37b'), // Green
  Color3.FromHexString('#006a7a'), // Blue
  Color3.FromHexString('#875a95'), // Purple
  Color3.FromHexString('#e86cd2'), // Pink
  Color3.FromHexString('#222222'), // Black
]

const materials: Material[] = []

// Material setup
for (let i = 0; i < colors.length; i++) {
  const material = new Material()
  material.albedoColor = colors[i]
  material.metallic = 0.2
  material.roughness = 1.0
  materials.push(material)
}

export class Tile extends Entity {
  public color: Color3
  private colorIndex: number = 0
  private tileIndex: number

  constructor(
    model: BoxShape,
    transform: Transform,
    tileIndex: number,
    colorIndex?: number
  ) {
    super()
    // engine.addEntity(this)
    this.addComponent(model)
    this.addComponent(transform)
    if (colorIndex) this.colorIndex = colorIndex
    this.addComponent(materials[this.colorIndex])

    // Flip sound when changing tile color
    const sound = new Entity()
    sound.addComponent(new Transform())
    sound.getComponent(Transform).position = Camera.instance.position
    sound.addComponent(
      new AudioSource(resources.sounds.ui.navigationForward)
    )
    engine.addEntity(sound)

    // Tile ID
    this.tileIndex = tileIndex

    this.addComponent(
      new OnPointerDown(
        () => {
          sound.getComponent(AudioSource).playOnce()
          // Send tile and color index message to all players
          sceneMessageBus.emit('setTileColor', {
            tileIndex: this.tileIndex,
            colorIndex: this.colorIndex,
          })
          changeMural()
        },
        { button: ActionButton.POINTER, hoverText: 'Change Color' }
      )
    )
  }

  public setColor(colorIndex: number): void {
    this.colorIndex < colors.length - 1
      ? (this.colorIndex = colorIndex + 1)
      : (this.colorIndex = 0)

    this.addComponentOrReplace(materials[this.colorIndex])
  }
}

// Receiving tile and color message from player
sceneMessageBus.on('setTileColor', (e) => {
  tiles[e.tileIndex].setColor(e.colorIndex)
  tileNumbers[e.tileIndex] = e.colorIndex
})
