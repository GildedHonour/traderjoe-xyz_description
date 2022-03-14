import { ethers } from "ethers"
import * as utilities from './utilities.js'

const SWAP_EXACT_AVAX_FOR_TOKENS_FUNC_ABI = "function swapExactAVAXForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint256[] memory amounts)";

async function main() {
  const AVAXAmount = ethers.utils.parseEther('0.000001').toHexString();
  const gasPrice = ethers.utils.parseUnits('200', 'gwei');
  const gas = {
    gasPrice: gasPrice,
    gasLimit: 300000
  };

  const router = new ethers.Contract(
    utilities.addresses.router,
    [
      SWAP_EXACT_AVAX_FOR_TOKENS_FUNC_ABI
    ],
    utilities.account
  );

  const val0 = ethers.utils.parseEther('0.00000001');
  const t0 = new ethers.Contract(
      utilities.addresses.token0,
      [
        utilities.APPROVE_FUNC_ABI
      ],
      utilities.account
  );
  await utilities.approveERC20Token(t0, router.address, val0);

  const tx = await router.swapExactAVAXForTokens(
    0, //TODO calculate
    [utilities.addresses.WAVAX, utilities.addresses.token0],
    utilities.addresses.mine,
    ethers.BigNumber.from(utilities.minutesFromNow(30)),
    {
        ...gas,
        value: AVAXAmount,
    }
  );

  console.log(`swapping AVAX for tokens...`);
  const receipt = await tx.wait();
  const url = utilities.generateLinkToTransactionInExplorer(tx.hash);
  console.log(`✓ swapped: ${url}`);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.log(error);
    process.exit(1);
})
