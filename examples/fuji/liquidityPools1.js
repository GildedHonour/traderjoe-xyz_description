import { ethers } from "ethers"
import * as utilities from './utilities.js'

const ADD_LIQUIDITY_FUNC_ABI = 'function addLiquidity(address tokenA, address tokenB, uint amountADesired, uint amountBDesired, uint amountAMin, uint amountBMin, address to, uint deadline) external returns (uint amountA, uint amountB, uint liquidity)';
const ADD_LIQUIDITY_AVAX_FUNC_ABI = 'function addLiquidityAVAX(address token, uint256 amountTokenDesired, uint256 amountTokenMin, uint256 amountAVAXMin, address to, uint256 deadline)';

async function main() {
  const AVAXAmount = ethers.utils.parseEther('0.000001').toHexString();

  //большое кол-во; используется тут только для простоты
  //в реальном проэкте нужно будет использовать только то кол-во, которое необходимо
  const largeAmount = ethers.utils.parseEther('100');

  const gasPrice = ethers.utils.parseUnits('200', 'gwei');
  const gas = {
    gasPrice: gasPrice,
    gasLimit: 300000
  };

  const router = new ethers.Contract(
    utilities.addresses.router,
    [
      ADD_LIQUIDITY_FUNC_ABI,
      ADD_LIQUIDITY_AVAX_FUNC_ABI
    ],
    utilities.account
  );


  //token0
  const t0 = new ethers.Contract(
      utilities.addresses.token0,
      [
        utilities.APPROVE_FUNC_ABI
      ],
      utilities.account
  );
  await utilities.approveERC20Token(t0, router.address, largeAmount);

  //token1
  const t1 = new ethers.Contract(
      utilities.addresses.token1,
      utilities.ERC20_ABI,
      utilities.account
  );
  await utilities.approveERC20Token(t1, router.address, largeAmount);

  //1
  // pair: (AVAX, token)
  const tx = await router.addLiquidityAVAX(
    utilities.addresses.token0,
    largeAmount,
    0,
    0,
    utilities.addresses.mine, //LP tokens will be sent to this address
    ethers.BigNumber.from(utilities.minutesFromNow(30))
  )

  console.log(`adding liquidity to a pool #1...`);
  const receipt = await tx.wait();
  const url = utilities.generateLinkToTransactionInExplorer(tx.hash);
  console.log(`✓ added liquidity: ${url}`);


  //2
  // pair: (token, token)
  const tx2 = await router.addLiquidity(
    utilities.addresses.token0,
    utilities.addresses.token1,
    largeAmount,
    largeAmount,
    0,
    0,
    utilities.addresses.mine, //LP tokens will be sent to this address
    utilities.minutesFromNow(10)
  );

  console.log(`adding liquidity to a pool #2...`);
  const receipt2 = await tx2.wait();
  const url2 = utilities.generateLinkToTransactionInExplorer(tx2.hash);
  console.log(`✓ added liquidity #2: ${url2}`);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.log(error);
    process.exit(1);
})
