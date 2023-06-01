//TAG-mirage-workaround/bug that lets models still be rendered, the outer appearance of the bar-want still visible when player outside scene load radius
//trigger just inside 1 parcel of the bar, we dont know the settings of their load radiu so assuming smallest
//if player has a 1 scene load radius that center wont be visible till they get within 1 parcel of the bar

const entities:Entity[] = []
export function addMirageEntity(ent:Entity){
  entities.push(ent)
}

export function activateMirage(){
  for(const p of entities){
    if(!p.alive) engine.addEntity(p)
  }
}
export function deActivateMirage(){
  for(const p of entities){
    if(p.alive) engine.removeEntity(p)
  }
}