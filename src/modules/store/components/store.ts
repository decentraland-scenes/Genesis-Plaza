import { getUserAccount } from "@decentraland/EthereumController";
import { getProvider, Provider } from "@decentraland/web3-provider";
import * as dclTx from "decentraland-transactions";
import * as eth from "eth-connect";
import { Providers } from "../index";

export function createStoreComponent({
  provider,
  requestManager,
  metaProvider,
  metaRequestManager,
  fromAddress,
}: Providers) {
  async function getContract() {
    const storeConfig = dclTx.getContract(dclTx.ContractName.CollectionStore, 137);
    let contract: any = await new eth.ContractFactory(metaRequestManager, storeConfig.abi).at(storeConfig.address);

    return {
      storeConfig,
      contract,
    };
  }

  async function buy(collectionId: string, blockchainId: string, price: string) {
    log("buy", collectionId, blockchainId, price);

    const { contract, storeConfig } = await getContract();
    const functionSignature = contract.buy.toPayload([[collectionId, [blockchainId], [price], [fromAddress]]]);
    log(functionSignature);

    try {
      const result = await dclTx.sendMetaTransaction(
        requestManager as any,
        metaRequestManager as any,
        functionSignature.data,
        storeConfig,
        { serverURL: "https://transactions-api.decentraland.org/v1" }
      );
      log(result);
      return true;
    } catch (error) {
      log(error);
      return false;
    }
  }
  async function buyMultipleItems(collectionId: string, items: { blockchainId: string; price: string }[]) {
    log("buy", collectionId, JSON.stringify(items));
    const { contract, storeConfig } = await getContract();
    const bIds: Array<string> = [];
    const prices: Array<string> = [];
    for (const item of items) {
      bIds.push(item.blockchainId);
      prices.push(item.price);
    }
    const functionSignature = contract.buy.toPayload([[collectionId, bIds, prices, [fromAddress]]]);
    log(functionSignature);

    dclTx
      .sendMetaTransaction(requestManager as any, metaRequestManager as any, functionSignature.data, storeConfig, {
        serverURL: "https://transactions-api.decentraland.org/v1",
      })
      .then((tx) => {
        log(tx);
      })
      .catch((e) => {
        log(e);
      });
  }
  return { buy, buyMultipleItems };
}
