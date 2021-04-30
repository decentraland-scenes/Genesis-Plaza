
const modelFolder = "models/lobby/"


export let roundedSquareAlpha = new Texture ("images/rounded_alpha_square.png")
export let dummySceneBG = new Texture ("images/dummy_scene.png")
export let beamUIBG = new Texture ("images/ui_beam_up_bg.png")

//SOCIAL LINKS
export let discordShape =           new GLTFShape(modelFolder + "icons/discord.glb")
export let twitterShape =           new GLTFShape(modelFolder + "icons/twitter.glb")

//BEAM
export let portalSpiralShape =      new GLTFShape(modelFolder + "portal_lift_spiral.glb")
export let beamShape =              new GLTFShape(modelFolder + "beam.glb")

//MENU
export let menuPillarsShape =       new GLTFShape(modelFolder + "menu_pillars.glb")
export let menuBaseShape =          new GLTFShape(modelFolder + "menu_base.glb")
export let menuTopEventsShape =     new GLTFShape(modelFolder + "menu_top_events.glb")
export let menuTopCrowdShape =      new GLTFShape(modelFolder + "menu_top_crowd.glb")
export let menuTopClassicsShape =   new GLTFShape(modelFolder + "menu_top_classics.glb")
export let dateBGShape =            new GLTFShape(modelFolder + "date_bg.glb")
export let shelfShape =             new GLTFShape(modelFolder + "shelf_clickable.glb")
export let jumpInButtonShape =      new GLTFShape(modelFolder + "jump_in_btn.glb")
export let detailsBGShape =         new GLTFShape(modelFolder + "details_bg.glb")
export let highlightFrameShape =    new GLTFShape(modelFolder + "highlight_frame.glb")
export let highlightRaysShape =     new GLTFShape(modelFolder + "highlight_rays.glb")
export let readMoreBtnShape =       new GLTFShape(modelFolder + "read_more_btn.glb")
export let coordsPanelShape =       new GLTFShape(modelFolder + "coords_panel.glb")
export let menuTitleBGShape =       new GLTFShape(modelFolder + "menu_title_bg.glb")
export let liveSignShape =          new GLTFShape(modelFolder + "live_bg.glb")
export let timePanelShape =         new GLTFShape(modelFolder + "time_panel.glb")
export let scrollInstructionShape = new GLTFShape(modelFolder + "scroll_instructions.glb")
export let playerCounterBGShape =   new GLTFShape(modelFolder + "player_counter_bg.glb")
export let refreshShape =           new GLTFShape(modelFolder + "refresh_button.glb")
export let loadMoreShape =          new GLTFShape(modelFolder + "load_more_btn.glb")

// CLOUDS
export let cloudDissolveShape=      new GLTFShape(modelFolder + "cloud_dissolve.glb")
export let cloudPuffShape=          new GLTFShape(modelFolder + "cloud_puff.glb")
export let cloudSmallShape=         new GLTFShape(modelFolder + "clouds_small.glb")
export let cloudSmall2Shape=        new GLTFShape(modelFolder + "clouds_small2.glb")
export let cloudBigShape=           new GLTFShape(modelFolder + "clouds_big.glb")

// PLATFORM
export let vortex1Shape=            new GLTFShape(modelFolder + "vortex1.glb")
export let vortex2Shape=            new GLTFShape(modelFolder + "vortex2.glb")
export let divingSignShape=         new GLTFShape(modelFolder + "diving_sign.glb")


export const dateBGColor:Color3 = Color3.FromHexString("#cdcdcd")
export const dateMonthColor:Color3 = Color3.FromHexString("#ff3333")
export const dateDayColor:Color3 = Color3.FromHexString("#000000")

export let dateUIBGMaterial = new Material()
dateUIBGMaterial.albedoColor = dateBGColor
dateUIBGMaterial.alphaTexture = roundedSquareAlpha
dateUIBGMaterial.transparencyMode = 2
dateUIBGMaterial.metallic = 0
dateUIBGMaterial.roughness = 1
dateUIBGMaterial.specularIntensity = 0


