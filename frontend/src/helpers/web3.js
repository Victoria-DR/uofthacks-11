import {Web3Storage} from "web3.storage";

function makeStorageClient() {
    return new Web3Storage({token: "did:key:z6MkmxpPoEh5EQroAqMqS54xN6N1iWzFdnPQnnq2TXbiqUHa"});
}

const client = makeStorageClient();
export async function storeFiles(files) {
    var output;
    const cid = await client.put(files);
    console.log(cid);
    const res = await client.get(cid);
    console.log(res);
    const filesD = await res.files();
    for(const file of filesD) {
        output = file.cid;
    }
    console.log(output);
    return output;
}