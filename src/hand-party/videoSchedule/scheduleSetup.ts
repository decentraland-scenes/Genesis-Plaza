import { CONFIG } from "../../config"

let dayStart = Math.floor(Date.now() / 1000) - 5

let startTime = CONFIG.DEBUG_ACTIVE_SCENE_TRIGGER_ENABLED ? dayStart + 20 : 1680120000 //Wednesday, March 29, 2023 20: 00: 00
let duration = CONFIG.DEBUG_ACTIVE_SCENE_TRIGGER_ENABLED ? 60 : 1 * 60 * 60 + 3 * 60

export const showData =[
    {
        start: dayStart,
        shows: [
            //DIESEL PARTY
            {
                name: "HAND_PARTY",
                //startTime: dayStart + 20,
                //length: 20,
                startTime: startTime, //1680120000, Wednesday, March 29, 2023 20:00:00
                length: duration,
                link: "https://player.vimeo.com/external/552481870.m3u8?s=c312c8533f97e808fccc92b0510b085c8122a875"
            },
        ],
        //VIDEO LOOP
        intermission: "https://player.vimeo.com/external/843206751.m3u8?s=ad9e81b120faa9fa68506ed337e6095ac1de3f78"
    }
]
