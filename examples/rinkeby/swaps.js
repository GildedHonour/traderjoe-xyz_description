import { ethers } from "ethers"
import dotenv from "dotenv"
import fs from "fs"
import readFile from "fs/promises"

import * as utilities from './utilities.js'

async function main() {
    const JOE_ROUTER02_ARTIFACT = JSON.parse(fs.readFileSync(utilities.JOE_ROUTER02_ARTIF_FILE_NAME));

    const router02 = new ethers.Contract(
        JOE_ROUTER02_ARTIFACT.address,
        JOE_ROUTER02_ARTIFACT.abi,

        //TODO:
        //or
        //  sig
        //  wallet
        //  provider

        utilities.signer
    );


    const origAddr = process.env.RINKEBY_RECIPIENT_ADDRESS;
    const pairAddress = [utilities.WAVAX_ADDR, utilities.USDC_ADDR];
    const amountIn = ethers.utils.parseUnits('0.01', 6);
    // const amountIn = ethers.utils.parseEther('0.0001', 18);
    // let amounts = await router02.getAmountsOut(
    //     amountIn,
    //     pairAddress
    // );
    // console.log(`amounts: ${amounts.hash}`);



    const wavaxToken = new ethers.Contract(
        utilities.WAVAX_ADDR,
        utilities.ERC20_ABI,
        utilities.signer
    );

    let slipapge = 1; // or amounts[1].sub(amounts[1].div(slippage)); //slipapge
    const to = process.env.FUJI_RECIPIENT_ADDRESS;
    const deadline = Math.floor(Date.now() / 1000) + 60 * 10; //10 mins
    // const val = ethers.utils.parseEther("0.01"); //or .parseUnits(amount, "ether");
    const val = ethers.utils.parseUnits("0.01", 6); //or .parseUnits(amount, "ether");
    await utilities.approveERC20Token(wavaxToken, router02.address, val);


    // const amtOut = ethers.utils.parseEther("0.000001");
    const amtOut = ethers.utils.parseUnits("0.000001", 6);
    // const amtOut = 0;
    const tx = await router02.swapExactAVAXForTokens(
        amtOut,
        pairAddress,
        to,
        deadline,
        {
            value: val,
            gasPrice: provider.getGasPrice(), //25000000000
            gasLimit: 8000000
        }
    );

    console.log(`transaction submitted: ${tx.hash}`);
    receipt = await tx.wait();
    console.log(receipt);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.log(error);
    process.exit(1);
})