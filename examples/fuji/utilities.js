import { ethers } from "ethers"
import dotenv from "dotenv"
import fs from "fs"
import readFile from "fs/promises"


const CONTRACT_ARTIFACTS_PATH = "contract_artifacts";
const FUJI_NETWORK = "fuji";

export const FUJI_RPC_URL = "https://api.avax-test.network/ext/bc/C/rpc";
export const USDC_ADDR_FUJI = "0x5425890298aed601595a70ab815c96711a31bc65";
export const WAVAX_ADDR = "0xd00ae08403B9bbb9124bB305C09058E32C39A48c";
export const USDC_ADDR = "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664";
export const JOE_ROUTER02_ARTIF_FILE_NAME = `./${CONTRACT_ARTIFACTS_PATH}/${FUJI_NETWORK}/JoeRouter02.json`;
export const ERC20_ABI = JSON.parse(fs.readFileSync(`./${CONTRACT_ARTIFACTS_PATH}/ERC20.abi.json`));
export const APPROVE_FUNC_ABI = "function approve(address spender, uint256 amount) external returns (bool)";
export const MASTER_CHEFV3_ARTIF_FILE_NAME = `./${CONTRACT_ARTIFACTS_PATH}/${FUJI_NETWORK}/MasterChefJoeV3.json`;

dotenv.config();

//FUJI
export const addresses = {
  WAVAX: WAVAX_ADDR,

  // router: "0xD8D37bA976D29D55c70Bc4f025Da14BD3013CDda",  //our Router02 contract - for some reason it'll cause an error
  router: "0x60aE616a2155Ee3d9A68541Ba4544862310933d4",     //third-party Router02 contract

  mine: "0x8935737fE9f2ba410d48a625575858CB9b5Bf279",
  token0: "0xcf1954aC926E559d84B7ADc334Fe7E071860d269", //(JoeToken)
  token1: USDC_ADDR
};

export function minutesFromNow(minAmount) {
  return Math.floor(Date.now() / 1000) + 60 * minAmount;
};

export function amountWithDecimals(amount, decimals) {
  const oneUnit = ethers.BigNumber.from(10).pow(decimals);
  const bigAmount = ethers.BigNumber.from(amount).mul(oneUnit).toString();
  return bigAmount;
};

export async function approveERC20Token(token, approvedForAddr, amount) {
  const tx = await token.approve(approvedForAddr, amount);
  console.log(`approving ${amount} wei of token...`); //todo - add the name of a toke
  const receipt = await tx.wait();
  console.log('✓ approved');
};


//Fuji
export function generateLinkToTransactionInExplorer(txHash) {
  return `https://testnet.snowtrace.io/tx/${txHash}`;
}

export const provider = new ethers.providers.JsonRpcProvider(FUJI_RPC_URL);
const wallet = new ethers.Wallet.fromMnemonic(
  process.env.MNEMONIC
);

export const account = wallet.connect(provider);
