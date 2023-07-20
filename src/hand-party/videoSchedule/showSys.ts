
import * as utils from '@dcl/ecs-scene-utils'
import { handPartyData } from '../handPartyData'
import { showData } from './scheduleSetup'

export class ShowSystem {
    videoTexture: VideoTexture = new VideoTexture(new VideoClip(""))
    videoMaterial: Material = new Material()

    days: any[] = []
    started = false
    intermissionStarted = false
    day: any
    mainShow: any

    seekTime: number = 0

    constructor(days: any) {
        this.setupVideoScreen()
        this.days = days
        //engine.addSystem(this)

        Input.instance.subscribe('BUTTON_DOWN', ActionButton.PRIMARY, false, (e) => {
            let nextshow = Math.round((this.day.shows[0].startTime - Date.now() / 1000) / 60)
            log('NEXT SHOW IN: ', nextshow, "mins", this.day.shows[0].startTime, Date.now() / 1000)
            log(Camera.instance.position)
        })
    }

    private setupVideoScreen() {
        this.videoMaterial.albedoTexture = this.videoTexture
        this.videoMaterial.emissiveTexture = this.videoTexture
        this.videoMaterial.emissiveColor = Color3.White()
        this.videoMaterial.emissiveIntensity = 1.2
        this.videoMaterial.roughness = 0.6

        const screen1 = new Entity()
        screen1.addComponent(new PlaneShape())
        screen1.addComponent(new Transform({
            position: new Vector3(160.007, 3.88876, 173.449),
            rotation: Quaternion.Euler(0, 180, 0),
            scale: new Vector3(11.0332, 5.53546, 1) 
        }))
        screen1.addComponent(this.videoMaterial)
        engine.addEntity(screen1)

        const screen2 = new Entity()
        screen2.addComponent(new PlaneShape())
        screen2.addComponent(new Transform({ position: new Vector3(39.1, 18.11, -7.99), rotation: Quaternion.Euler(0, 270, 0), scale: new Vector3(15.2, 7.1, 1) }))
        screen2.addComponent(this.videoMaterial)
        engine.addEntity(screen2)
        //screen.setParent(centerScene)
    }

    addSystem() {
        log("ADD RUN SHOW SYSTEM")
        this.videoTexture.playing = true
        this.started = false
        this.intermissionStarted = false
        engine.addSystem(this)
    }

    removeSystem() {
        log("REMOVE RUN SHOW SYSTEM")
        this.videoTexture.playing = false
        engine.removeSystem(this)
    }

    update(dt: number) {
        if (this.days.length > 0) {
            this.day = this.days[0]
            let now = Math.floor(Date.now() / 1000)

            if (this.day.shows.length > 0) {
                let start = this.day.start

                if (now >= start) {
                    if (now >= this.day.shows[0].startTime + this.day.shows[0].length) {
                        log('we went past show, load another')

                        this.day.shows.shift()
                        this.started = false
                    }
                    else {
                        if (now >= this.day.shows[0].startTime) {
                            //log('show hasnt started, need to play blank video: ', this.day.shows[0])
                            if (!this.started) {

                                this.started = true
                                this.intermissionStarted = false
                                this.seekTime = now - this.day.shows[0].startTime

                                log('starting show', this.day.shows[0], "at seconds: ", this.seekTime)
                                
                                if (this.seekTime > 5) {
                                    log('starting show', this.day.shows[0], "at seconds: ", this.seekTime)
                                    this.playVideo(this.day.shows[0], this.seekTime)
                                }
                                else {
                                    this.playVideo(this.day.shows[0], 0)
                                }

                                handPartyData.isVideoStarted = true
                            }
                        }
                        else {
                            //log('show hasnt started, need to play blank video: ', this.day.intermission)
                            if (!this.intermissionStarted) {
                                this.intermissionStarted = true
                                log("next show: ", this.day.shows[0])
                                this.playIntermission(this.day.intermission)
                            }
                        }
                    }
                }
                else {
                    log('in between days, need to show something: ', this.day.intermission)
                    if (!this.intermissionStarted) {
                        this.intermissionStarted = true
                        this.playIntermission(this.day.intermission)
                    }
                }
            }
            else {
                log('we ran out of shows for the day')
                if (this.days.length > 1) {
                    if (now >= this.days[1].start) {
                        log("remove day and continue on")
                        this.days.shift()
                    }
                }
                else if (this.days.length === 1) {
                    log("this is last day")
                    this.days.shift()
                }
            }
        }
        else {
            log("no more days, stop system")
            engine.removeSystem(this)
            if (!this.intermissionStarted) {
                this.intermissionStarted = true
                this.playIntermission(this.day.intermission)
            }
        }
    }

    playIntermission(intermission: any) {
        //log('play intermission')//, intermission)
        this.playVideo({ link: intermission })
        this.videoTexture.playing = true
        this.videoTexture.loop = true
    }

    playVideo(show: any, seekTime: number = 0) {
        //log('play main show')//, show)
        this.videoTexture.playing = false
        this.videoTexture.loop = false
        this.videoTexture = new VideoTexture(new VideoClip(show.link))
        this.videoMaterial.albedoTexture = this.videoTexture
        this.videoMaterial.emissiveTexture = this.videoTexture
        this.videoMaterial.emissiveIntensity = 0.8
        this.videoMaterial.emissiveColor = Color3.White()
        this.videoTexture.playing = true
        this.videoTexture.seekTime(seekTime)
    }
}

let runShow = new ShowSystem(showData)

const triggerEntity = new Entity()
triggerEntity.addComponent(new Transform({
    position: new Vector3(160, 10, 155)
}))
let triggerBox = new utils.TriggerBoxShape(new Vector3(50, 25, 50), new Vector3(0, 0, 0))
triggerEntity.addComponent(new utils.TriggerComponent(
    triggerBox,
    {
        enableDebug: false,
        onCameraEnter: () => {
            log("runShow Trigger: ENTER BAR ADD RUN SHOW SYSTEM")
            runShow.addSystem()
            //videoTexture.playing = true
        },
        onCameraExit: () => {
            log("runShow Trigger: EXIT BAR, REMOVE RUN SHOW SYSTEM")
            runShow.removeSystem()
            //videoTexture.playing = false
        }
    }
))
engine.addEntity(triggerEntity)