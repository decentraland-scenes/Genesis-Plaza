
@Component("CooldownActivated")
export class CooldownActivated{  

    active:boolean = true
    elapsed:number = 0    
    cooldownLength:number = 20  
    originalHoverText:string  
    inactiveHoverText:string  

    constructor(cooldownLength:number, _originalHoverText:string, _inactiveHoverText:string){
      this.cooldownLength = cooldownLength          
      this.originalHoverText = _originalHoverText          
      this.inactiveHoverText = _inactiveHoverText          
    }

    startCooldown(){
        this.elapsed = 0
    }

}

class CooldownSystem {

    group = engine.getComponentGroup(CooldownActivated, Transform)

    update(dt:number){

        for(let item of this.group.entities){
            const cooldownInfo = item.getComponent(CooldownActivated)
            
            if(cooldownInfo.elapsed < cooldownInfo.cooldownLength){
                cooldownInfo.elapsed += dt
                cooldownInfo.active = false

                if(item.hasComponent(TextShape)){
                    item.getComponent(TextShape).visible = true 
                    item.getComponent(TextShape).value = Math.ceil(cooldownInfo.cooldownLength - cooldownInfo.elapsed).toString() 
                }

                if(item.hasComponent(OnPointerDown)){
                    item.getComponent(OnPointerDown).hoverText = cooldownInfo.inactiveHoverText
                }                    
                
            }
            else{
                cooldownInfo.active = true
                if(item.hasComponent(TextShape)){
                     item.getComponent(TextShape).visible = false 
                }
                if(item.hasComponent(OnPointerDown)){
                    item.getComponent(OnPointerDown).hoverText = cooldownInfo.originalHoverText
                } 
            }
        }
    }

}
engine.addSystem(new CooldownSystem())