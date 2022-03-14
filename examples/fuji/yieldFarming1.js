import { ethers } from "ethers"
import * as utilities from './utilities.js'

const ADD_LIQUIDITY_FUNC_ABI = 'function addLiquidity(address tokenA, address tokenB, uint amountADesired, uint amountBDesired, uint amountAMin, uint amountBMin, address to, uint deadline) external returns (uint amountA, uint amountB, uint liquidity)';
const ADD_LIQUIDITY_AVAX_FUNC_ABI = 'function addLiquidityAVAX(address token, uint256 amountTokenDesired, uint256 amountTokenMin, uint256 amountAVAXMin, address to, uint256 deadline)';
const LP_ID = 123; //TODO - does it have to be found out from a DEX?

async function main() {
  const AVAXAmount = ethers.utils.parseEther('0.000001').toHexString();
  const largeAmount = ethers.utils.parseEther('100');
  const gasPrice = ethers.utils.parseUnits('200', 'gwei');
  const gas = {
    gasPrice: gasPrice,
    gasLimit: 300000
  };

  const MASTER_CHEFV3_ARTIF = JSON.parse(fs.readFileSync(utilities.MASTER_CHEFV3_ARTIF_FILE_NAME));

  const router = new ethers.Contract(
    MASTER_CHEFV3_ARTIF.address,
    MASTER_CHEFV3_ARTIF.abi,
    utilities.account
  );

  const mcv3 = new ethers.Contract(
    utilities.addresses.masterChefV3,
    [
      
    ],
    utilities.account
  );
  //TODO
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.log(error);
    process.exit(1);
})
