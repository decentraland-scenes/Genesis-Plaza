import { ThumbnailPlane } from "./thumbnail";
import { cleanString, monthToString, wordWrap, ethClean } from "./helperFunctions";
import { AnimatedItem } from "./simpleAnimator";
import * as resource from "./resources/resources";
import { MenuItem } from "./menuItem";
import { createComponents, buy } from "../store/index";
import * as sfx from "./resources/sounds";
import { lobbyCenter } from "./resources/globals";

//const clickableGroup = engine.getComponentGroup(ClickableItem, Transform)

export class WearableMenuItem extends MenuItem {
  public thumbNail: ThumbnailPlane;
  public scale: Vector3;
  public scaleMultiplier: number;

  itemCard: Entity;
  cardOffset: Vector3;
  cardPadding: number;
  row1Height: number;
  row2Height: number;
  row3Height: number;
  rowPriceHeight: number;

  title: Entity;
  titleText: TextShape;
  collectionText: Entity;
  collectionTextShape: TextShape;
  priceTextRoot: Entity;
  priceTextShape: TextShape;
  rarityBG: Entity;
  rarityTextRoot: Entity;
  rarityTextShape: TextShape;
  rarityLabel: Entity;
  rarityLabelText: TextShape;
  leftDetailsRoot: Entity;
  detailsRoot: Entity;
  detailsCard: Entity;
  buyButton: Entity;
  buyButtonText: TextShape;
  buyButtonTextRoot: Entity;
  availableCounter: Entity;
  availableText: TextShape;
  availableLabel: Entity;
  availableLabelText: TextShape;

  highlightRays: Entity;
  highlightFrame: Entity;

  // detailEventTitle:Entity
  // detailTitle:TextShape
  // detailTextContent:TextShape
  // detailText:Entity
  // detailTextPanel:Entity

  constructor(_transform: TranformConstructorArgs, _alphaTexture: Texture, _collection: any, _item: any) {
    super();
    this.addComponent(new Transform(_transform));
    this.scale = new Vector3(1, 0.5, 1);
    this.scaleMultiplier = 1.2;
    this.defaultItemScale = new Vector3(1, 1, 1);
    this.cardOffset = new Vector3(0, -0.5, -0);
    this.cardPadding = 0.45;
    this.row1Height = 0.1;
    this.row2Height = 0.25;
    this.row3Height = 0.4;
    this.rowPriceHeight = 0.58;

    let textColor1 = Color3.Black();

    //selection event animation
    this.addComponent(
      new AnimatedItem(
        {
          position: new Vector3(0, 0, 0),
          scale: new Vector3(this.defaultItemScale.x, this.defaultItemScale.y, this.defaultItemScale.z),
          rotation: Quaternion.Euler(0, 0, 0),
        },
        {
          position: new Vector3(0, 0.3, -0.7),
          scale: new Vector3(
            this.defaultItemScale.x * this.scaleMultiplier,
            this.defaultItemScale.y * this.scaleMultiplier,
            this.defaultItemScale.z * this.scaleMultiplier
          ),
          rotation: Quaternion.Euler(0, 0, 0),
        },
        2
      )
    );

    // event card root
    this.itemCard = new Entity();
    this.itemCard.addComponent(
      new Transform({
        position: new Vector3(this.cardOffset.x, this.cardOffset.y, this.cardOffset.z),
        scale: new Vector3(1, 1, 1),
      })
    );
    // this.itemCard.addComponent(resource.detailsCardShape)
    this.itemCard.setParent(this);

    this.thumbNail = new ThumbnailPlane(
      new Texture(_item.image),
      {
        position: new Vector3(0, 0.0, -0.05),
        scale: new Vector3(1, 1, 1),
      },
      _alphaTexture
    );

    this.thumbNail.setParent(this.itemCard);

    this.leftDetailsRoot = new Entity();
    this.leftDetailsRoot.addComponent(
      new Transform({
        position: new Vector3(-0.32, 0.28, -0.02),
        scale: new Vector3(0.9, 0.9, 0.9),
      })
    );
    this.leftDetailsRoot.setParent(this.itemCard);

    this.collectionText = new Entity();
    this.collectionTextShape = new TextShape();

    // DETAILS APPEARING ON SELECTION EVENT
    this.detailsRoot = new Entity();
    this.detailsRoot.addComponent(new Transform());
    this.detailsRoot.setParent(this);

    // -- DETAILS CARD
    this.detailsCard = new Entity();
    this.detailsCard.addComponent(
      new Transform({
        position: new Vector3(this.cardOffset.x, this.cardOffset.y - 0.2, this.cardOffset.z),
        scale: new Vector3(0.4, 0.4, 0.4),
      })
    );
    this.detailsCard.addComponent(resource.detailsCardShape);
    this.detailsCard.setParent(this.detailsRoot);
    this.detailsCard.addComponent(
      new AnimatedItem(
        {
          position: new Vector3(this.cardOffset.x, this.cardOffset.y, this.cardOffset.z + 0.05),
          scale: new Vector3(1, 1, 1),
          rotation: Quaternion.Euler(0, 0, 0),
        },
        {
          position: new Vector3(this.cardOffset.x, this.cardOffset.y - 0.51, this.cardOffset.z),
          scale: new Vector3(1, 1, 1),
          rotation: Quaternion.Euler(0, 0, 0),
        },
        1.5
      )
    );
    this.detailsCard.setParent(this.detailsRoot);

    const detailFontSize = 1;

    // TITLE
    this.titleText = new TextShape();
    this.title = new Entity();
    let rawText: string = _item.metadata.wearable.name;
    log("item name: " + rawText);
    //  remove non-UTF-8 characters
    rawText = cleanString(rawText);

    rawText = wordWrap(rawText, 20, 3);
    this.titleText.value = rawText;
    this.titleText.font = new Font(Fonts.SanFrancisco_Heavy);
    this.titleText.height = 20;
    this.titleText.width = 2;
    this.titleText.resizeToFit = true;

    this.titleText.fontSize = 2;
    this.titleText.color = textColor1;
    this.titleText.hTextAlign = "center";
    this.titleText.vTextAlign = "center";

    this.title.addComponent(
      new Transform({
        position: new Vector3(0, -this.row1Height, -0.01),
        scale: new Vector3(0.3, 0.3, 0.3),
      })
    );
    this.title.addComponent(this.titleText);

    this.title.setParent(this.detailsCard);

    // PRICE
    this.priceTextRoot = new Entity();
    this.priceTextRoot.addComponent(
      new Transform({
        position: new Vector3(0, -this.rowPriceHeight, 0),
      })
    );

    this.priceTextShape = new TextShape();
    if (ethClean(_item.price) === "0") this.priceTextShape.value = "Free";
    else this.priceTextShape.value = ethClean(_item.price) + " MANA";

    this.priceTextShape.fontSize = detailFontSize;
    this.priceTextShape.font = new Font(Fonts.SanFrancisco_Heavy);

    this.priceTextRoot.addComponent(this.priceTextShape);
    this.priceTextRoot.setParent(this.detailsCard);

    // RARITY
    this.rarityTextRoot = new Entity();
    this.rarityTextRoot.addComponent(
      new Transform({
        position: new Vector3(this.cardPadding, -this.row2Height, 0),
      })
    );

    this.rarityTextShape = new TextShape();
    this.rarityTextShape.value = _item.rarity;
    this.rarityTextShape.color = textColor1;
    this.rarityTextShape.fontSize = detailFontSize;
    this.rarityTextShape.font = new Font(Fonts.SanFrancisco_Heavy);
    this.rarityTextShape.hTextAlign = "right";

    this.rarityTextRoot.addComponent(this.rarityTextShape);
    this.rarityTextRoot.setParent(this.detailsCard);

    //RARITY LABEL
    this.rarityLabelText = new TextShape();
    this.rarityLabelText.value = "Rarity:";
    this.rarityLabelText.color = textColor1;
    this.rarityLabelText.fontSize = 1;
    this.rarityLabelText.font = new Font(Fonts.SanFrancisco_Heavy);
    this.rarityLabelText.hTextAlign = "left";

    this.rarityLabel = new Entity();
    this.rarityLabel.addComponent(
      new Transform({
        position: new Vector3(-this.cardPadding, -this.row2Height, 0),
        scale: new Vector3(0.65, 0.65, 0.65),
      })
    );
    this.rarityLabel.addComponent(this.rarityLabelText);
    this.rarityLabel.setParent(this.detailsCard);

    //RARITY BG
    this.rarityBG = new Entity();
    this.rarityBG.addComponent(new Transform());
    // this.rarityBG.addComponent(new PlaneShape())

    switch (_item.rarity) {
      case "common": {
        this.rarityBG.addComponent(resource.rareBGShape);
        this.rarityTextShape.color = resource.commonColor;
        break;
      }
      case "uncommon": {
        this.rarityBG.addComponent(resource.rareBGShape);
        this.rarityTextShape.color = resource.uncommonColor;
        break;
      }
      case "rare": {
        this.rarityBG.addComponent(resource.rareBGShape);
        this.rarityTextShape.color = resource.rareColor;
        break;
      }
      case "epic": {
        this.rarityBG.addComponent(resource.epicBGShape);
        this.rarityTextShape.color = resource.epicColor;
        break;
      }
      case "legendary": {
        this.rarityBG.addComponent(resource.legendaryBGShape);
        this.rarityTextShape.color = resource.legendaryColor;
        break;
      }
      case "mythic": {
        this.rarityBG.addComponent(resource.mythicBGShape);
        this.rarityTextShape.color = resource.mythicColor;
        break;
      }
      case "unique": {
        this.rarityBG.addComponent(resource.uniqueBGShape);
        this.rarityTextShape.color = resource.uniqueColor;
        break;
      }
    }

    this.rarityBG.setParent(this.itemCard);
    // this.rarityBG.getComponent(GLTFShape).isPointerBlocker = false
    // this.rarityBG.getComponent(PlaneShape).visible = true

    //AVAILABLE COUNT
    this.availableCounter = new Entity();
    this.availableCounter.addComponent(
      new Transform({
        position: new Vector3(this.cardPadding, -this.row3Height, 0),
        scale: new Vector3(0.75, 0.75, 0.75),
      })
    );

    this.availableText = new TextShape();
    this.availableText.value = _item.available + "/" + _item.maxSupply;
    this.availableText.color = textColor1;
    this.availableText.fontSize = detailFontSize;
    this.availableText.font = new Font(Fonts.SanFrancisco_Heavy);
    this.availableText.hTextAlign = "right";

    this.availableCounter.addComponent(this.availableText);
    this.availableCounter.setParent(this.detailsCard);

    this.availableLabelText = new TextShape();
    this.availableLabelText.value = "Available:";
    this.availableLabelText.color = textColor1;
    this.availableLabelText.fontSize = 1;
    this.availableLabelText.font = new Font(Fonts.SanFrancisco_Heavy);
    this.availableLabelText.hTextAlign = "left";

    this.availableLabel = new Entity();
    this.availableLabel.addComponent(
      new Transform({
        position: new Vector3(-this.cardPadding, -this.row3Height, 0),
        scale: new Vector3(0.65, 0.65, 0.65),
      })
    );
    this.availableLabel.addComponent(this.availableLabelText);
    this.availableLabel.setParent(this.detailsCard);

    // -- BUY BUTTON
    this.buyButton = new Entity();
    this.buyButton.addComponent(
      new Transform({
        position: new Vector3(this.cardOffset.x, this.cardOffset.y - 0.2, this.cardOffset.z),
        scale: new Vector3(0.1, 0.1, 0.1),
      })
    );
    this.buyButton.addComponent(resource.buyButtonShape);
    this.buyButton.setParent(this.detailsCard);
    this.buyButton.addComponent(
      new AnimatedItem(
        {
          position: new Vector3(0, 0, 0.1),
          scale: new Vector3(0.1, 0.1, 0.1),
          rotation: Quaternion.Euler(0, 0, 0),
        },
        {
          position: new Vector3(0.52, 0, -0.05),
          scale: new Vector3(0.75, 0.75, 0.75),
          rotation: Quaternion.Euler(0, 0, 0),
        },
        1.8
      )
    );

    this.buyButtonTextRoot = new Entity();
    this.buyButtonText = new TextShape();

    this.buyButtonText.color = Color3.FromHexString("#FFFFFF");
    this.buyButtonText.font = new Font(Fonts.SanFrancisco_Heavy);
    this.buyButtonText.hTextAlign = "center";

    this.buyButtonTextRoot.addComponent(this.buyButtonText);
    this.buyButtonTextRoot.addComponent(
      new Transform({
        position: new Vector3(0, 0.0, -0.05),
        scale: new Vector3(0.1, 0.1, 0.1),
      })
    );

    this.buyButtonTextRoot.setParent(this.buyButton);

    this.buyButtonText.value = "BUY";
    this.buyButton.addComponent(
      new OnPointerDown(
        async () => {
          buy(_collection.id, _item.blockchainId, _item.price, this);
        },
        {
          button: ActionButton.POINTER,
          hoverText: "BUY WEARABLE",
        }
        //movePlayerTo({ x: lobbyCenter.x, y: 110, z: lobbyCenter.z-8 } )
      )
    );

    // highlights BG on selection
    this.highlightRays = new Entity();
    this.highlightRays.addComponent(new Transform());
    this.highlightRays.addComponent(resource.highlightRaysShape);
    this.highlightRays.setParent(this.detailsRoot);
    this.highlightRays.addComponent(
      new AnimatedItem(
        {
          position: new Vector3(this.cardOffset.x, this.cardOffset.y, this.cardOffset.z + 0.05),
          scale: new Vector3(0, 0, 0),
          rotation: Quaternion.Euler(0, 0, 0),
        },
        {
          position: new Vector3(this.cardOffset.x, this.cardOffset.y, this.cardOffset.z + 0.05),
          scale: new Vector3(1, 1, 1),
          rotation: Quaternion.Euler(0, 0, 0),
        },
        6
      )
    );

    this.highlightFrame = new Entity();
    this.highlightFrame.addComponent(new Transform());
    this.highlightFrame.addComponent(resource.highlightFrameShape);
    this.highlightFrame.setParent(this.highlightRays);
  }

  boughtOne():void {
      const [available, maxSupply] = this.availableText.value.split('/')
      if(+available>0) this.availableText.value = +available-1 + "/" + maxSupply;
  }

  updateItemInfo(_collection: any, _item: any) {
    //image
    if (_item.image == "images/dummy_scene.png") {
      this.thumbNail.updateImage(new Texture(_item.image));
    } else {
      //this.thumbNail.updateImage(new Texture(fixImageUrl(_item.image)))
      this.thumbNail.updateImage(new Texture(_item.image));
    }

    //price
    if (ethClean(_item.price) === "0") this.priceTextShape.value = "Free";
    else this.priceTextShape.value = ethClean(_item.price) + " MANA";

    //rarity
    this.rarityTextShape.value = _item.rarity;
    switch (_item.rarity) {
      case "common": {
        this.rarityBG.addComponent(resource.rareBGShape);
        this.rarityTextShape.color = resource.commonColor;
        break;
      }
      case "uncommon": {
        this.rarityBG.addComponent(resource.rareBGShape);
        this.rarityTextShape.color = resource.uncommonColor;
        break;
      }
      case "rare": {
        this.rarityBG.addComponentOrReplace(resource.rareBGShape);
        this.rarityTextShape.color = resource.rareColor;
        break;
      }
      case "epic": {
        this.rarityBG.addComponentOrReplace(resource.epicBGShape);
        this.rarityTextShape.color = resource.epicColor;
        break;
      }
      case "legendary": {
        this.rarityBG.addComponentOrReplace(resource.legendaryBGShape);
        this.rarityTextShape.color = resource.legendaryColor;
        break;
      }
      case "mythic": {
        this.rarityBG.addComponentOrReplace(resource.mythicBGShape);
        this.rarityTextShape.color = resource.mythicColor;
        break;
      }
      case "unique": {
        this.rarityBG.addComponentOrReplace(resource.uniqueBGShape);
        this.rarityTextShape.color = resource.uniqueColor;
        break;
      }
    }

    //available
    this.availableText.value = _item.available + "/" + _item.maxSupply;

    //update buy button
    this.buyButtonText.value = "BUY";
    this.buyButton.getComponent(OnPointerDown).callback = async () => {
      buy(_collection.id, _item.blockchainId, _item.price, this);
    };
    this.buyButton.getComponent(OnPointerDown).hoverText = "BUY";
    this.buyButton.getComponent(OnPointerDown).button = ActionButton.POINTER;

    //title
    let rawText: string = _item.metadata.wearable.name;
    //  remove non-UTF-8 characters
    rawText = cleanString(rawText);
    rawText = wordWrap(rawText, 25, 2);
    this.title.getComponent(TextShape).value = rawText;

    //detail text
    //remove non-UTF-8 characters and wrap
    //this.detailTitle.value = wordWrap( cleanString(_item.metadata.wearable.name ),45,3)

    //remove non-UTF-8 characters and wrap
    //this.detailTextContent.value = ("\n\n" + wordWrap(cleanString("details"), 75, 11) + "</cspace>")
  }
  select() {
    if (!this.selected) {
      // engine.addEntity(this.detailsRoot)
      this.selected = true;
      this.buyButton.getComponent(AnimatedItem).isHighlighted = true;
      this.detailsCard.getComponent(AnimatedItem).isHighlighted = true;
      this.highlightRays.getComponent(AnimatedItem).isHighlighted = true;
    }
  }
  deselect(_silent?: boolean) {
    if (this.selected) {
      this.selected = false;
    }
    this.buyButton.getComponent(AnimatedItem).isHighlighted = false;
    this.detailsCard.getComponent(AnimatedItem).isHighlighted = false;
    this.highlightRays.getComponent(AnimatedItem).isHighlighted = false;
  }
  show() {}
  hide() {}
}
