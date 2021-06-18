const menuUpClip = new AudioClip('sounds/wearables/menu_woosh_up.mp3')
export const menuUpSource = new AudioSource(menuUpClip)
menuUpSource.volume = 1

const menuDownClip = new AudioClip('sounds/wearables/menu_woosh.mp3')
export const menuDownSource = new AudioSource(menuDownClip)
menuDownSource.volume = 1

const menuScrollEndClip = new AudioClip('sounds/wearables/menu_scroll_end.mp3')
export const menuScrollEndSource = new AudioSource(menuScrollEndClip)
menuScrollEndSource.volume = 1

const menuSelectClip = new AudioClip('sounds/wearables/menu_select.mp3')
export const menuSelectSource = new AudioSource(menuSelectClip)
menuSelectSource.volume = 1

const menuDeselectClip = new AudioClip('sounds/wearables/menu_deselect.mp3')
export const menuDeselectSource = new AudioSource(menuDeselectClip)
menuDeselectSource.volume = 1

const refreshSuccessClip = new AudioClip('sounds/wearables/refresh.mp3')
export const refreshSource = new AudioSource(refreshSuccessClip)
refreshSource.volume = 1

const menuErrorClip = new AudioClip('sounds/wearables/menu_error.mp3')
export const menuErrorSource = new AudioSource(menuErrorClip)
menuErrorSource.volume = 0.8
