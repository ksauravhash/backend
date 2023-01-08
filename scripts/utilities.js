import aes256 from "aes256";
import fs from "fs";
import { exec } from "child_process";
import "dotenv/config";
import mime from "mime";
import { NFTStorage, File } from "nft.storage";
import path from "path";

let key;

const NFT_STORAGE_KEY = process.env.NFT_STORAGE_KEY;

function toJson(data) {
  let dnow = new Date();
  let doi = `${dnow.getFullYear()}:${dnow.getMonth()}:${dnow.getDate()}`;
  const { phone, dob } = data;
  key =
    phone.substring(data.phone.length - 1 - 3, data.phone.length) +
    data.dob.substring(0, 4) +
    data.phone.substring(0, 4);
  data.doi = doi;
  return JSON.stringify(data);
}

function toEncryptedKey(jsonData) {
  let encryptedData = aes256.encrypt(key, jsonData.toString());
  fs.writeFileSync("out/enc.txt", encryptedData);
}

function toCarFile() {
  exec("npm ipfs --pack out/enc.txt --output out/data.car");
}

async function fileFromPath(filePath) {
  const content = await fs.promises.readFile(filePath);
  const type = mime.getType(filePath);
  return new File([content], path.basename(filePath), { type });
}

async function storeNFT() {
  const image = await fileFromPath("out/data.car");
  const description = "Stores the encrypted data for the driving license";

  // create a new NFTStorage client using our API key
  const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });

  // call client.store, passing in the image & metadata
  return nftstorage.store({
    name: "Driving License",
    description,
    image,
  });
}

export { toJson, toEncryptedKey, storeNFT, toCarFile };
