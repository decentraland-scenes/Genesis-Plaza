export default {
  models: {
    pool: new GLTFShape('models/zenquencer/pool.glb'),
    stone: new GLTFShape('models/zenquencer/stone.glb'),
    linearButton: new GLTFShape('models/zenquencer/linear.glb'),
    randomButton: new GLTFShape('models/zenquencer/random.glb'),
    speedButton: new GLTFShape('models/zenquencer/speedButton.glb'),
    tube: new GLTFShape('models/zenquencer/tube.glb'),
  },
  sounds: {
    kalimbaNotes: {
      f3: new AudioClip('sounds/zenquencer/f3.mp3'),
      a3: new AudioClip('sounds/zenquencer/a3.mp3'),
      c3: new AudioClip('sounds/zenquencer/c3.mp3'),
      a4: new AudioClip('sounds/zenquencer/a4.mp3'),
      e4: new AudioClip('sounds/zenquencer/e4.mp3'),
      f4: new AudioClip('sounds/zenquencer/f4.mp3'),
      g4: new AudioClip('sounds/zenquencer/g4.mp3'),
    },
  },
}
