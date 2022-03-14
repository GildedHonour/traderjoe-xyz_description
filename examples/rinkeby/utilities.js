import { ethers } from "ethers"
import dotenv from "dotenv"
import fs from "fs"
import readFile from "fs/promises"


const CONTRACT_ARTIFACTS_PATH = "contract_artifacts";
const RINKEBY_NETWORK = "rinkeby";

export const RINKEBY_RPC_URL = "???";
export const USDC_ADDR_RINKEBY = "0xeb8f08a975ab53e34d8a0330e0d34de942c95926";
export const WAVAX_ADDR = "0xd00ae08403B9bbb9124bB305C09058E32C39A48c";
export const USDC_ADDR = "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664";
export const JOE_TOKEN_ARTIF_FILE_NAME = "???";
export const JOE_ROUTER02_ARTIF_FILE_NAME = `./${CONTRACT_ARTIFACTS_PATH}/${RINKEBY_NETWORK}/JoeRouter02.json`;
export const ERC20_ABI = JSON.parse(fs.readFileSync(`./${CONTRACT_ARTIFACTS_PATH}/ERC20.abi.json`));

dotenv.config();

export async function approveERC20Token(token, approvedForAddr, amount) {
  const tx = await token.approve(approvedForAddr, amount, {
    gasPrice: provider.getGasPrice(),
    gasLimit: 100000,
  });

  console.log('approving...');
  console.log(`transaction submitted: ${tx.hash}`);
  const receipt = await tx.wait();
  console.log('approved');
};

export const provider = new ethers.providers.InfuraProvider("rinkeby", process.env.INFURA_API_KEY);
export const wallet = new ethers.Wallet.fromMnemonic(
  process.env.MNEMONIC
);


//(?)
//1
// const account = wallet.connect(provider);

//or
//2
// const [sig] = await ethers.getSigners();

//or
//3
//const signer = new ethers.Wallet(PRIVATE_KEY, provider);
export const signer = new ethers.Wallet(wallet.privateKey, provider);
//(?)
