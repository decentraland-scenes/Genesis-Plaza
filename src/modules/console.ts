let baseConsole = new Entity()
baseConsole.addComponent(
  new GLTFShape('models/console-artichoke/base_console.glb')
)
baseConsole.addComponent(
  new Transform({
    position: new Vector3(44.8, 8.5, 36.8),
    rotation: Quaternion.Euler(0, 60, 0),
  })
)
engine.addEntity(baseConsole)

let blueButton = new Entity()
blueButton.addComponent(
  new GLTFShape('models/console-artichoke/blue_button.glb')
)

blueButton.setParent(baseConsole)
engine.addEntity(blueButton)

let greenButton = new Entity()
greenButton.addComponent(
  new GLTFShape('models/console-artichoke/green_button.glb')
)

greenButton.setParent(baseConsole)
engine.addEntity(greenButton)

let lightBlueButton = new Entity()
lightBlueButton.addComponent(
  new GLTFShape('models/console-artichoke/lightblue_button.glb')
)

lightBlueButton.setParent(baseConsole)
engine.addEntity(lightBlueButton)

let redButton = new Entity()
redButton.addComponent(new GLTFShape('models/console-artichoke/red_button.glb'))

redButton.setParent(baseConsole)
engine.addEntity(redButton)

let yellowButton = new Entity()
yellowButton.addComponent(
  new GLTFShape('models/console-artichoke/yellow_button.glb')
)

yellowButton.setParent(baseConsole)
engine.addEntity(yellowButton)

//// stations

//  Rave: https://icecast.ravepartyradio.org/ravepartyradio-192.mp3

// DCL Interviews:  https://dclcoreradio.com/dclradio.ogg
