import aes256 from "aes256";
import fs from "fs";
import { exec } from "child_process";
import "dotenv/config";

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
  return jsonData;
}

function toEncryptedKey(jsonData) {
  let encryptedData = aes256.encrypt(key, jsonData.toString());
  fs.writeFileSync("out/enc.txt", encryptedData);
}

function toCarFile() {
  exec("ipfs --pack encryptedData.txt --output data.car");
}

async function fileFromPath(filePath) {
  const content = await fs.promises.readFile(filePath);
  const type = mime.getType(filePath);
  return new File([content], path.basename(filePath), { type });
}

async function storeNFT() {
  const data = encryptedData;
  const image = await fileFromPath("data.car");
  const description = "Stores the encrypted data for the driving license";

  // create a new NFTStorage client using our API key
  const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });

  // call client.store, passing in the image & metadata
  return nftstorage.store({
    name: "Driving License",
    data,
    description,
    image,
  });
}

export { toJson, toEncryptedKey, storeNFT, toCarFile };
