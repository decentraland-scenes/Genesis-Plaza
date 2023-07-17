
let handEntity = new Entity()

// Add a 3D model to it
handEntity.addComponent(new GLTFShape("models/clapmeter/Hand5.glb"))
    .visible = true
handEntity.addComponent(new Transform({
    position: new Vector3(154.5, 0.75, 168),
    rotation: Quaternion.Euler(0, 180 - 37.5, 0),
    scale: new Vector3(2, 2, 2)
}))

// Create animator component
let animator = new Animator()
handEntity.addComponent(animator)

//HandIntro Play Once then goes to the following anim
const RightHandIntro = new AnimationState("RightHandIntro", { layer: 0 })
const LeftHandIntro = new AnimationState("LeftHandIntro", { layer: 1 })

//HandClap play in loop
const RightHandClap = new AnimationState("RightHandClap", { layer: 0 })
const LeftHandClap = new AnimationState("LeftHandClap", { layer: 1 })

//HandGive and LootAppear play at the same time when the user receives the price 
const RightHandGive = new AnimationState("RightHandGive", { layer: 0 })
const LeftHandGive = new AnimationState("LeftHandGive", { layer: 1 })

// Add animation clip to Animator component
animator.addClip(RightHandIntro)
animator.addClip(LeftHandIntro)
animator.addClip(RightHandClap)
animator.addClip(LeftHandClap)
animator.addClip(RightHandGive)
animator.addClip(LeftHandGive)

LeftHandIntro.looping = false
RightHandIntro.looping = false
LeftHandClap.looping = true
RightHandClap.looping = true
LeftHandGive.looping = false
RightHandGive.looping = false

LeftHandIntro.playing = false
RightHandIntro.playing = false
LeftHandClap.playing = false
RightHandClap.playing = false
LeftHandGive.playing = false
RightHandGive.playing = false

function playHandClap() {
    RightHandIntro.stop()
    LeftHandIntro.stop()
    RightHandGive.stop()
    LeftHandGive.stop()
    RightHandClap.play(true)
    LeftHandClap.play(true)
}

function playHandIntro() {
    RightHandIntro.play(true)
    LeftHandIntro.play(true)
    RightHandGive.stop()
    LeftHandGive.stop()
    RightHandClap.stop()
    LeftHandClap.stop()
}

function playHandGive() {
    RightHandIntro.stop()
    LeftHandIntro.stop()
    RightHandGive.play(true)
    LeftHandGive.play(true)
    RightHandClap.stop()
    LeftHandClap.stop()
}

export const hand = {
    entity: handEntity,
    playHandClap: playHandClap,
    playHandIntro: playHandIntro,
    playhandgive: playHandGive
}