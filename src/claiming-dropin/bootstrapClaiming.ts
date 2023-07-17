//import { initRegistry } from "src/festival-mgmt-dropin/registry";
import { CONFIG, initConfig } from "src/config";
import { updateConfigToTesting } from "./claiming/loot-config";


export async function bootStrapClaimingDropins(){
    //initRegistry()
    initConfig()
    updateConfigToTesting(CONFIG.CLAIM_TESTING_ENABLED);
}

