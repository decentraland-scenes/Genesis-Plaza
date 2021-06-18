
const modelFolder = "models/menu/"


export let roundedSquareAlpha = new Texture ("images/rounded_alpha_square.png")
export let dummySceneBG = new Texture ("images/dummy_scene.png")

//MENU
export let wardrobeShape =          new GLTFShape(modelFolder + "wardrobe.glb")
export let smallCardShape =         new GLTFShape(modelFolder + "small_card.glb")
export let smallCardHighlightShape =new GLTFShape(modelFolder + "collection_highlight.glb")
export let cardClickableShape =     new GLTFShape(modelFolder + "card_clickable.glb")
export let collectionMenuShape =    new GLTFShape(modelFolder + "collection_menu_bg.glb")
export let menuPillarsShape =       new GLTFShape(modelFolder + "menu_pillars.glb")
export let menuBaseShape =          new GLTFShape(modelFolder + "menu_base.glb")
export let menuTopEventsShape =     new GLTFShape(modelFolder + "menu_top_events.glb")
export let menuTopCrowdShape =      new GLTFShape(modelFolder + "menu_top_crowd.glb")
export let menuTopClassicsShape =   new GLTFShape(modelFolder + "menu_top_classics.glb")
export let dateBGShape =            new GLTFShape(modelFolder + "date_bg.glb")
export let hangerShape =            new GLTFShape(modelFolder + "hanger_clickable.glb")
export let shelvesShape =            new GLTFShape(modelFolder + "shelves.glb")
export let buyButtonShape =         new GLTFShape(modelFolder + "buy_btn.glb")
export let detailsBGShape =         new GLTFShape(modelFolder + "details_bg.glb")
export let highlightFrameShape =    new GLTFShape(modelFolder + "highlight_frame.glb")
export let highlightRaysShape =     new GLTFShape(modelFolder + "highlight_rays.glb")
export let readMoreBtnShape =       new GLTFShape(modelFolder + "read_more_btn.glb")
export let coordsPanelShape =       new GLTFShape(modelFolder + "coords_panel.glb")
export let detailsCardShape =       new GLTFShape(modelFolder + "wearable_details_card.glb")
export let liveSignShape =          new GLTFShape(modelFolder + "live_bg.glb")
export let timePanelShape =         new GLTFShape(modelFolder + "time_panel.glb")
export let scrollInstructionShape = new GLTFShape(modelFolder + "scroll_instructions.glb")
export let refreshShape =           new GLTFShape(modelFolder + "refresh_button.glb")
export let loadMoreShape =          new GLTFShape(modelFolder + "load_more_btn.glb")

//RARITY BG
export let rareBGShape =            new GLTFShape(modelFolder + "rarity_bg_rare.glb")
export let epicBGShape =            new GLTFShape(modelFolder + "rarity_bg_epic.glb")
export let legendaryBGShape =       new GLTFShape(modelFolder + "rarity_bg_legendary.glb")
export let mythicBGShape =          new GLTFShape(modelFolder + "rarity_bg_mythic.glb")
export let uniqueBGShape =          new GLTFShape(modelFolder + "rarity_bg_unique.glb")


export const dateBGColor:Color3 = Color3.FromHexString("#cdcdcd")
export const dateMonthColor:Color3 = Color3.FromHexString("#ff3333")
export const dateDayColor:Color3 = Color3.FromHexString("#000000")

//RARITY COLORS
export const commonColor: Color3 = Color3.FromHexString("#ABC1C1"); //Color3.FromHexString("#37d17a")
export const uncommonColor: Color3 = Color3.FromHexString("#ED6D4F"); //Color3.FromHexString("#37d17a")
export const rareColor: Color3 = Color3.FromHexString("#36CF75"); //Color3.FromHexString("#37d17a")
export const epicColor: Color3 = Color3.FromHexString("#3D85E6"); //Color3.FromHexString("#4f8eec")
export const legendaryColor: Color3 = Color3.FromHexString("#842DDA"); //Color3.FromHexString("#923ee2")
export const mythicColor: Color3 = Color3.FromHexString("#FF63E1"); //Color3.FromHexString("#fe6ce2")
export const uniqueColor: Color3 = Color3.FromHexString("#FFB626"); //Color3.FromHexString("#fdc648")

export let dateUIBGMaterial = new Material()
dateUIBGMaterial.albedoColor = dateBGColor
dateUIBGMaterial.alphaTexture = roundedSquareAlpha
dateUIBGMaterial.transparencyMode = 2
dateUIBGMaterial.metallic = 0
dateUIBGMaterial.roughness = 1
dateUIBGMaterial.specularIntensity = 0

//rare material
export let commonMat = new Material()
commonMat.albedoColor = commonColor
commonMat.alphaTexture = roundedSquareAlpha
commonMat.transparencyMode = 2
commonMat.metallic = 0
commonMat.roughness = 1
commonMat.specularIntensity = 0

//uncommon material
export let uncommonMat = new Material()
uncommonMat.albedoColor = uncommonColor
uncommonMat.alphaTexture = roundedSquareAlpha
uncommonMat.transparencyMode = 2
uncommonMat.metallic = 0
uncommonMat.roughness = 1
uncommonMat.specularIntensity = 0

//rare material
export let rareMat = new Material()
rareMat.albedoColor = rareColor
rareMat.alphaTexture = roundedSquareAlpha
rareMat.transparencyMode = 2
rareMat.metallic = 0
rareMat.roughness = 1
rareMat.specularIntensity = 0

//epic material
export let epicMat = new Material()
epicMat.albedoColor = epicColor
epicMat.alphaTexture = roundedSquareAlpha
epicMat.transparencyMode = 2
epicMat.metallic = 0
epicMat.roughness = 1
epicMat.specularIntensity = 0

//legendary material
export let legendaryMat = new Material()
legendaryMat.albedoColor = legendaryColor
legendaryMat.alphaTexture = roundedSquareAlpha
legendaryMat.transparencyMode = 2
legendaryMat.metallic = 0
legendaryMat.roughness = 1
legendaryMat.specularIntensity = 0

//mythic material
export let mythicMat = new Material()
mythicMat.albedoColor = mythicColor
mythicMat.alphaTexture = roundedSquareAlpha
mythicMat.transparencyMode = 2
mythicMat.metallic = 0
mythicMat.roughness = 1
mythicMat.specularIntensity = 0

//unique material
export let uniqueMat = new Material()
uniqueMat.albedoColor = uniqueColor
uniqueMat.alphaTexture = roundedSquareAlpha
uniqueMat.transparencyMode = 2
uniqueMat.metallic = 0
uniqueMat.roughness = 1
uniqueMat.specularIntensity = 0


