import { ethers } from "ethers"
import * as utilities from './utilities.js'

const ADD_LIQUIDITY_FUNC_ABI = 'function addLiquidity(address tokenA, address tokenB, uint amountADesired, uint amountBDesired, uint amountAMin, uint amountBMin, address to, uint deadline) external returns (uint amountA, uint amountB, uint liquidity)';
const ADD_LIQUIDITY_AVAX_FUNC_ABI = 'function addLiquidityAVAX(address token, uint256 amountTokenDesired, uint256 amountTokenMin, uint256 amountAVAXMin, address to, uint256 deadline)';
const LP_ID = 123; //TODO: подставить нужный нам id

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

  const MASTER_CHEFV3_ARTIF = JSON.parse(fs.readFileSync(utilities.MASTER_CHEFV3_ARTIF_FILE_NAME));
  const mcv3 = new ethers.Contract(
    MASTER_CHEFV3_ARTIF.address,
    MASTER_CHEFV3_ARTIF.abi,
    utilities.account
  );

  const lpt0 = new ethers.Contract(
      //используем WAVAX для простоты;
      //в реальном же проэкте - использовать реальный LP-токен
      utilities.addresses.WAVAX, 
      [
        ERC20_ABI
      ],
      utilities.account
  );
  await utilities.approveERC20Token(lpt0, router.address, largeAmount);

  //только для админа
  //добавить и настроить вознограждения для определённого LP-токена
  //вызвать обязательно при первичной настройке, один раз для каждого LP токена;
  const tx = await mcv3.add(
    100,
    utilities.addresses.WAVAX,
    utilities.addresses.zero
  );


  //дезопизит LP-токена
  const deposAmount = ethers.utils.parseUnits('0.001', 'gwei');
  const tx = await mcv3.deposit(
    LP_ID,
    deposAmount
  );

  //NOTE
  //amountLeftWithoutNeedForApproval = largeAmount - deposAmount
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.log(error);
    process.exit(1);
})
