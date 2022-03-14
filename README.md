# Description of Traderjoe.xyz

There're 2 core projects, written in Solidity, Traderjoe.xyz consists of: **core** and **lending**.

Here's description of all the public and external functions of the contracts in them.

Assume that `->` means `returns`, and the empty `()` means the standard fallback function.
All the modificators of the functions but `payable` have been omitted.


core > boringcrypto > BoringBatchable:
---

    permitToken(IERC20 token, address from, address to, uint256 amount, uint256 deadline, uint8 v, bytes32 r, bytes32 s)

core > boringcrypto > BoringCryptoDashboardV2:
---
    getPairsFull(address who, address[] calldata addresses) -> (PairFull[])
    getPools(uint256[] calldata pids) -> (PoolsInfo, PoolInfo[])
    findPools(address who, uint256[] calldata pids) -> (PoolInfo[])
    getAVAXRate(address token) -> (uint256)

core > boringcrypto > BoringCryptoTokenScanner:
---
    getTokenInfo(address[] calldata addresses) -> (TokenInfo[])
    findBalances(address who, address[] calldata addresses) -> (Balance[])
    getBalances(address who, address[] calldata addresses, IFactory factory, address currency) -> (BalanceFull[])
    getFactoryInfo(IFactory[] calldata addresses) -> (Factory[])
    getPairs(IFactory factory, uint256 fromID, uint256 toID) -> (Pair[])
    findPairs(address who, IFactory factory, uint256 fromID, uint256 toID) -> (Pair[])
    getPairsFull(address who, address[] calldata addresses) -> (PairFull[])

core > boringcrypto > BoringHelperV1:
---

_This is a helper contract used by Sushiswap frontend to get all pool data. Contract is available only via etherscan: https://etherscan.io/address/0x11ca5375adafd6205e41131a4409f182677996e6#code_

    setContracts(IMasterChef chef_, address maker_, IERC20 joe_, IERC20 WAVAX_, IFactory joeFactory_, IFactory pangolinFactory_, IERC20 bar_)
    getAVAXRate(IERC20 token) -> (uint256)
    getUIInfo(address who, IFactory[] calldata factoryAddresses, IERC20 currency, address[] calldata masterContracts) -> (UIInfo)
    getTokenInfo(address[] calldata addresses) -> (TokenInfo[])
    findBalances(address who, address[] calldata addresses) -> (Balance[])
    getBalances(address who, IERC20[] calldata addresses) -> (BalanceFull[])
    getPairs(IFactory factory, uint256 fromID, uint256 toID) -> (PairBase[])
    pollPairs(address who, IPair[] calldata addresses) -> (PairPoll[])
    getPools(uint256[] calldata pids) -> (PoolsInfo, PoolInfo[])
    findPools(address who, uint256[] calldata pids) -> (PoolFound[])
    pollPools(address who, uint256[] calldata pids) -> (UserPoolInfo[])

core > boringcrypto > BoringOwnable:
---
    transferOwnership(address newOwner, bool direct, bool renounce)
    claimOwnership()


core > rewarders > MasterChefRewarderPerBlock
---

_This is a sample contract to be used in the MasterChefJoeV2 contract for partners to reward stakers with their native token alongside JOE._

_It assumes the project already has an existing MasterChef-style farm contract. In which case, the init() function is called to deposit a dummy token into one of the MasterChef farms so this contract can accrue rewards from that farm._
_The contract then transfers the reward token to the user on each call to onJoeReward()_


    init(IERC20 dummyToken)
    updatePool() public -> (PoolInfo pool)
    setRewardRate(uint256 _tokenPerBlock)
    setAllocPoint(uint256 _allocPoint)
    harvestFromMasterChefV1()
    onJoeReward(address _user, uint256 _lpAmount)
    pendingTokens(address _user) -> (uint256 pending)

core > rewarders > MasterChefRewarderPerSec:
---

_This is a sample contract to be used in the MasterChefJoeV2 contract for partners to reward stakers with their native token alongside JOE._
 
_It assumes the project already has an existing MasterChef-style farm contract. In which case, the init() function is called to deposit a dummy token into oneof the MasterChef farms so this contract can accrue rewards from that farm._
_The contract then transfers the reward token to the user on each call to onJoeReward()._

    init(IERC20 dummyToken)
    updatePool() -> (PoolInfo pool)
    setRewardRate(uint256 _tokenPerSec)
    setAllocPoint(uint256 _allocPoint)
    harvestFromMasterChefV1()
    onJoeReward(address _user, uint256 _lpAmount)
    pendingTokens(address _user) -> (uint256 pending)

core > rewarders > SimpleRewarderPerBlock:
---

_This is a sample contract to be used in the MasterChefJoeV2 contract for partners to reward
stakers with their native token alongside JOE._
_It assumes no minting rights, so requires a set amount of YOUR_TOKEN to be transferred to this contract prior. E.g. say you've allocated 100,000 XYZ to the JOE-XYZ farm over 30 days. Then you would need to transfer 100,000 XYZ and set the block reward accordingly so it's fully distributed after 30 days._

    updatePool() -> (PoolInfo pool)
    setRewardRate(uint256 _tokenPerBlock)
    onJoeReward(address _user, uint256 _lpAmount)
    pendingTokens(address _user) -> (uint256 pending)
    emergencyWithdraw()

core > rewarders > SimpleRewarderPerSec:
---

_This is a sample contract to be used in the MasterChefJoe contract for partners to reward stakers with their native token alongside JOE._
_It assumes no minting rights, so requires a set amount of YOUR_TOKEN to be transferred to this contract prior. E.g. say you've allocated 100,000 XYZ to the JOE-XYZ farm over 30 days. Then you would need to transfer 100,000 XYZ and set the block reward accordingly so it's fully distributed after 30 days._

    updatePool() -> (PoolInfo pool)
    setRewardRate(uint256 _tokenPerSec)
    onJoeReward(address _user, uint256 _lpAmount)
    pendingTokens(address _user) -> (uint256 pending)
    emergencyWithdraw()
    balance() -> (uint256)



core > sushi > MasterChef:
---

_MasterChef is the master of Sushi. He can make Sushi and he is a fair guy._

_Note that it's ownable and the owner wields tremendous power. The ownership will be transferred to a governance smart contract once SUSHI is sufficiently distributed and the community can show to govern itself._

    poolLength() -> (uint256)
    add(uint256 _allocPoint, IERC20 _lpToken, bool _withUpdate)
    set(uint256 _pid, uint256 _allocPoint, bool _withUpdate)
    getMultiplier(uint256 _from, uint256 _to) -> (uint256)
    pendingSushi(uint256 _pid, address _user) -> (uint256)
    massUpdatePools()
    updatePool(uint256 _pid)
    deposit(uint256 _pid, uint256 _amount)
    withdraw(uint256 _pid, uint256 _amount)
    emergencyWithdraw(uint256 _pid)

core > sushi > MasterChefPerSec:
---

_MasterChef is the master of Sushi. He can make Sushi and he is a fair guy._

_Note that it's ownable and the owner wields tremendous power. The ownership will be transferred to a governance smart contract once SUSHI is sufficiently distributed and the community can show to govern itself._


    add(uint256 _allocPoint, IERC20 _lpToken, bool _withUpdate)
    set(uint256 _pid, uint256 _allocPoint, bool _withUpdate)
    getMultiplier(uint256 _from, uint256 _to) -> (uint256)
    pendingSushi(uint256 _pid, address _user) -> (uint256)
    massUpdatePools()
    updatePool(uint256 _pid)
    deposit(uint256 _pid, uint256 _amount)
    withdraw(uint256 _pid, uint256 _amount)
    emergencyWithdraw(uint256 _pid)
    dev(address _devaddr)

core > sushi > SushiToken:
---

_SushiToken with Governance._

    mint(address _to, uint256 _amount)
    delegates(address delegator) -> (address)
    delegate(address delegatee)
    delegateBySig(address delegatee, uint256 nonce, uint256 expiry, uint8 v, bytes32 r, bytes32 s)
    getCurrentVotes(address account) -> (uint256)
    getPriorVotes(address account, uint256 blockNumber) -> (uint256)


core > timelock > CustomMasterChefJoeV2Timelock:
---

_COPIED FROM https://github.com/compound-finance/compound-protocol/blob/master/contracts/Governance/GovernorAlpha.sol_

    setDelay(uint256 delay_)
    acceptAdmin()
    setPendingAdmin(address pendingAdmin_)
    queueTransaction(address target, uint256 value, string signature, bytes data, uint256 eta)
    cancelTransaction(address target, uint256 value, string signature, bytes data, uint256 eta)
    executeTransaction(address target, uint256 value, string signature, bytes data, uint256 eta) payable -> (bytes)

core > timelock > Timelock:
---

_COPIED FROM https://github.com/compound-finance/compound-protocol/blob/master/contracts/Governance/GovernorAlpha.sol_

    receive() payable
    setDelay(uint256 delay_)
    acceptAdmin()
    setPendingAdmin(address pendingAdmin_)
    queueTransaction(address target, uint256 value, string signature, bytes data, uint256 eta) -> (bytes32)
    cancelTransaction(address target, uint256 value, string signature, bytes data, uint256 eta)
    executeTransaction(address target, uint256 value, string signature, bytes data, uint256 eta) payable -> (bytes)



core > traderjoe
---
_This is Uniswap V2 Area._
_Code from [Uniswap V2](https://github.com/Uniswap/uniswap-v2-core/tree/27f6354bae6685612c182c3bc7577e61bc8717e3/contracts) with some modifications_

1. _Change contract version to 0.6.12 and do the necessary patching._
2. _Add `migrator` member in `UniswapV2Factory` which can be set by `feeToSetter`._
3. _Allow `migrator` to specify the amount of `liquidity` during the first mint. Disallow first mint if migrator is set._


core > traderjoe > FarmLens:
---
    getAvaxPrice() -> (uint256)
    getPriceInUsd(address tokenAddress) -> (uint256)
    getPriceInAvax(address tokenAddress) -> (uint256)
    getReserveUsd(IJoePair pair) -> (uint256)
    getFarmPairs(address chefAddress, uint256[] calldata whitelistedPids) -> (FarmPair[])
    getAllFarmData(uint256[] calldata whitelistedPidsV2, uint256[] calldata whitelistedPidsV3) -> (AllFarmData)

core > traderjoe > JoeERC20:
---
    approve(address spender, uint256 value) -> (bool)
    transfer(address to, uint256 value) -> (bool)
    transferFrom(address from, address to, uint256 value) -> (bool)
    permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s)

core > traderjoe > JoeFactory:
---
    allPairsLength() -> (uint256)
    pairCodeHash() -> (bytes32)
    createPair(address tokenA, address tokenB) -> (address pair)
    setFeeTo(address _feeTo)
    setMigrator(address _migrator)
    setFeeToSetter(address _feeToSetter)

core > traderjoe > JoePair:
---
    getReserves() -> (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast)
    initialize(address _token0, address _token1)
    mint(address to) -> (uint256 liquidity)
    burn(address to) -> (uint256 amount0, uint256 amount1)
    swap(uint256 amount0Out, uint256 amount1Out, address to, bytes calldata data)
    skim(address to)
    sync()

core > traderjoe > JoeRouter02:
---
    receive() payable
    addLiquidity(address tokenA, address tokenB, uint256 amountADesired, uint256 amountBDesired, uint256 amountAMin, uint256 amountBMin, address to, uint256 deadline) -> (uint256 amountA, uint256 amountB, uint256 liquidity)
    addLiquidityAVAX(address token, uint256 amountTokenDesired, uint256 amountTokenMin, uint256 amountAVAXMin, address to, uint256 deadline) payable -> (uint256 amountToken, uint256 amountAVAX, uint256 liquidity)
    removeLiquidity(address tokenA, address tokenB, uint256 liquidity, uint256 amountAMin, uint256 amountBMin, address to, uint256 deadline) -> (uint256 amountA, uint256 amountB)
    removeLiquidityAVAX(address token, uint256 liquidity, uint256 amountTokenMin, uint256 amountAVAXMin, address to, uint256 deadline)-> (uint256 amountToken, uint256 amountAVAX)
    removeLiquidityWithPermit(address tokenA, address tokenB, uint256 liquidity, uint256 amountAMin, uint256 amountBMin, address to, uint256 deadline, bool approveMax, uint8 v, bytes32 r, bytes32 s) -> (uint256 amountA, uint256 amountB)
    removeLiquidityAVAXWithPermit(address token, uint256 liquidity, uint256 amountTokenMin, uint256 amountAVAXMin, address to, uint256 deadline, bool approveMax, uint8 v, bytes32 r, bytes32 s) -> (uint256 amountToken, uint256 amountAVAX)
    removeLiquidityAVAXSupportingFeeOnTransferTokens(address token, uint256 liquidity, uint256 amountTokenMin, uint256 amountAVAXMin, address to, uint256 deadline) -> (uint256 amountAVAX)
    removeLiquidityAVAXWithPermitSupportingFeeOnTransferTokens(address token, uint256 liquidity, uint256 amountTokenMin, uint256 amountAVAXMin, address to, uint256 deadline, bool approveMax, uint8 v, bytes32 r, bytes32 s) -> (uint256 amountAVAX)
    swapExactTokensForTokens(uint256 amountIn, uint256 amountOutMin, address[] calldata path, address to, uint256 deadline) -> (uint256[] amounts)
    swapTokensForExactTokens(uint256 amountOut, uint256 amountInMax, address[] calldata path, address to, uint256 deadline) -> (uint256[] amounts)
    swapExactAVAXForTokens(uint256 amountOutMin, address[] calldata path, address to, uint256 deadline) payable -> (uint256[] amounts)
    swapTokensForExactAVAX(uint256 amountOut, uint256 amountInMax, address[] calldata path, address to, uint256 deadline) -> (uint256[] amounts)
    swapExactTokensForAVAX(uint256 amountIn, uint256 amountOutMin, address[] calldata path, address to, uint256 deadline) -> (uint256[] amounts)
    swapAVAXForExactTokens(uint256 amountOut, address[] calldata path, address to, uint256 deadline) payable -> (uint256[] amounts)
    swapExactTokensForTokensSupportingFeeOnTransferTokens(uint256 amountIn, uint256 amountOutMin, address[] calldata path, address to, uint256 deadline)
    swapExactAVAXForTokensSupportingFeeOnTransferTokens(uint256 amountOutMin, address[] calldata path, address to, uint256 deadline) payable
    swapExactTokensForAVAXSupportingFeeOnTransferTokens(uint256 amountIn, uint256 amountOutMin, address[] calldata path, address to, uint256 deadline)
    quote(uint256 amountA, uint256 reserveA, uint256 reserveB) -> (uint256 amountB)
    getAmountOut(uint256 amountIn, uint256 reserveIn, uint256 reserveOut) -> (uint256 amountOut)
    getAmountIn(uint256 amountOut, uint256 reserveIn, uint256 reserveOut) -> (uint256 amountIn)
    getAmountsOut(uint256 amountIn, address[] path) -> (uint256[] amounts)
    getAmountsIn(uint256 amountOut, address[] path) -> (uint256[] amounts)




core > Cliff:
---

_A token holder contract that can release its token balance with a cliff period. Optionally revocable by the owner._

    release() 
    vestedAmount() -> (uint256)
    blockTimestamp() -> (uint256)

core > JoeBar:
---

_JoeBar is the coolest bar in town. You come in with some Joe, and leave with more! The longer you stay, the more Joe you get._

_This contract handles swapping to and from xJoe, JoeSwap's staking token._

    enter(uint256 _amount)
    leave(uint256 _share)

core > JoeHatToken:
---
    ~

core > JoeMaker:
---
_JoeMaker is MasterJoe's left hand and kinda a wizard. He can cook up Joe from pretty much anything! This contract handles "serving up" rewards for xJoe holders by trading tokens collected from fees for Joe._

    bridgeFor(address token) -> (address bridge)
    setBridge(address token, address bridge)
    convert(address token0, address token1)
    convertMultiple(address[] calldata token0, address[] calldata token1)

core > JoeMakerV2:
---

_JoeMakerV2 is MasterJoe's left hand and kinda a wizard. He can cook up Joe from pretty much anything! This contract handles "serving up" rewards for xJoe holders by trading tokens collected from fees for Joe._

    convert(address token0, address token1)
    convertMultiple(address[] calldata token0, address[] calldata token1)
    bridgeFor(address token) -> (address bridge)
    setBridge(address token, address bridge)

core > JoeMakerV3:
---

_JoeMakerV3 is MasterJoe's left hand and kinda a wizard. He can cook up Joe from pretty much anything! This contract handles "serving up" rewards for xJoe holders by trading tokens collected from fees for Joe._

    addAuth(address _auth)
    revokeAuth(address _auth)
    setAnyAuth(bool access)
    setBridge(address token, address bridge)
    setDevCut(uint256 _amount)
    setDevAddr(address _addr)
    bridgeFor(address token) -> (address bridge)
    convert(address token0, address token1)
    convertMultiple(address[] calldata token0, address[] calldata token1)

core > JoeMakerV4:
---

_JoeMakerV4 is MasterJoe's left hand and kinda a wizard. He can cook up any token from pretty much anything! This contract handles "serving up" rewards for xJoe holders by trading tokens collected from fees._


    addAuth(address _auth)
    revokeAuth(address _auth)
    setAnyAuth(bool access)
    setBridge(address token, address bridge)
    setDevCut(uint256 _amount)
    setDevAddr(address _addr)
    setTokenToAddress(address _tokenTo)
    bridgeFor(address token) -> (address bridge)
    convert(address token0, address token1)
    convertMultiple(address[] calldata token0, address[] calldata token1)

core > JoeRoll:
---

_It helps your migrate your existing Uniswap LP tokens to TraderJoe LP ones_

    migrateWithPermit(address tokenA, address tokenB, uint256 liquidity, uint256 amountAMin, uint256 amountBMin, uint256 deadline, uint8 v, bytes32 r, bytes32 s)
    migrate(address tokenA, address tokenB, uint256 liquidity, uint256 amountAMin, uint256 amountBMin, uint256 deadline)

core > JoeToken:
---

_JoeToken with Governance_

    mint(address _to, uint256 _amount)
    delegates(address delegator) -> (address)
    delegate(address delegatee)
    delegateBySig(address delegatee, uint256 nonce, uint256 expiry, uint8 v, bytes32 r, bytes32 s)
    getCurrentVotes(address account) -> (uint256)
    getPriorVotes(address account, uint256 blockNumber) -> (uint256)


core > JoeVote:
---


    name() -> (string memory)
    symbol() -> (string memory)
    decimals() -> (uint8 memory)
    totalSupply() -> (uint256)
    balanceOf(address owner) -> (uint256)
    allowance(address, address) -> (uint256)
    transfer(address, uint256) -> (bool)
    approve(address, uint256) -> (bool)
    transferFrom(address, address, uint256) -> (bool)

core > MasterChefJoe:
---

_MasterChefJoe is a boss. He says "go f your blocks lego boy, I'm gonna use timestamp instead". And to top it off, it takes no risks. Because the biggest risk is operator error. So we make it virtually impossible for the operator of this contract to cause a bug with people's harvests._

_Note that it's ownable and the owner wields tremendous power. The ownership will be transferred to a governance smart contract once JOE is sufficiently distributed and the community can show to govern itself._

_With thanks to the Lydia Finance team._

    poolLength() -> (uint256)
    add(uint256 _allocPoint, IERC20 _lpToken)
    set(uint256 _pid, uint256 _allocPoint)
    pendingJoe(uint256 _pid, address _user) -> (uint256)
    massUpdatePools()
    updatePool(uint256 _pid)
    deposit(uint256 _pid, uint256 _amount)
    withdraw(uint256 _pid, uint256 _amount)
    emergencyWithdraw(uint256 _pid)
    dev(address _devaddr)
    setDevPercent(uint256 _newDevPercent)
    setTreasuryPercent(uint256 _newTreasuryPercent)
    updateEmissionRate(uint256 _joePerSec)

core > MasterChefJoeV2:
---
_MasterChefJoe is a boss. He says "go f your blocks lego boy, I'm gonna use timestamp instead". And to top it off, it takes no risks. Because the biggest risk is operator error. So we make it virtually impossible for the operator of this contract to cause a bug with people's harvests._

_Note that it's ownable and the owner wields tremendous power. The ownership will be transferred to a governance smart contract once JOE is sufficiently distributed and the community can show to govern itself._

_With thanks to the Lydia Finance team_

    poolLength() -> (uint256)
    add(uint256 _allocPoint, IERC20 _lpToken, IRewarder _rewarder)
    set(uint256 _pid, uint256 _allocPoint, IRewarder _rewarder, bool overwrite)
    pendingTokens(uint256 _pid, address _user) -> (uint256 pendingJoe, address bonusTokenAddress, string memory bonusTokenSymbol, uint256 pendingBonusToken)
    rewarderBonusTokenInfo(uint256 _pid) -> (address bonusTokenAddress, string memory bonusTokenSymbol)
    massUpdatePools()
    updatePool(uint256 _pid)
    deposit(uint256 _pid, uint256 _amount)
    withdraw(uint256 _pid, uint256 _amount)
    emergencyWithdraw(uint256 _pid)
    dev(address _devAddr)
    setDevPercent(uint256 _newDevPercent)
    setTreasuryAddr(address _treasuryAddr)
    setTreasuryPercent(uint256 _newTreasuryPercent)
    setInvestorAddr(address _investorAddr)
    setInvestorPercent(uint256 _newInvestorPercent)
    updateEmissionRate(uint256 _joePerSec)

core > MasterChefJoeV3:
---

_The (older) MasterChefJoeV2 contract gives out a constant number of JOE tokens per block. It is the only address with minting rights for JOE._

_The idea for this MasterChefJoeV3 (MCJV3) contract is therefore to be the owner of a dummy token that is deposited into the MasterChefJoeV2 (MCJV2) contract._

_The allocation point for this pool on MCJV3 is the total allocation point for all pools that receive double incentives._

    init(IERC20 dummyToken)
    poolLength() -> (uint256 pools)
    add(uint256 _allocPoint, IERC20 _lpToken, IRewarder _rewarder)
    set(uint256 _pid, uint256 _allocPoint, IRewarder _rewarder, bool overwrite)
    pendingTokens(uint256 _pid, address _user) -> (uint256 pendingJoe, address bonusTokenAddress, string memory bonusTokenSymbol, uint256 pendingBonusToken)
    massUpdatePools(uint256[] calldata pids)
    joePerSec() -> (uint256 amount)
    updatePool(uint256 pid)
    deposit(uint256 pid, uint256 amount)
    withdraw(uint256 _pid, uint256 _amount)
    harvestFromMasterChef()
    emergencyWithdraw(uint256 pid)

core > TokenVesting:
---

_A token holder contract that can release its token balance gradually like a typical vesting scheme, with a cliff and vesting period. Optionally revocable by the owner._

    beneficiary() -> (address)
    cliff() -> (uint256)
    start() -> (uint256)
    duration() -> (uint256)
    revocable() -> (bool)
    released(address token) -> (uint256)
    revoked(address token) -> (bool)
    release(IERC20 token)
    revoke(IERC20 token)

core > Zap:
---
    initialize(address _joe, address _router)
    receive() payable}
    isLP(address _address) -> (bool)
    routePair(address _address) -> (address)
    zapInToken(address _from, uint256 amount, address _to)
    zapIn(address _to) payable
    zapOut(address _from, uint256 amount)
    setRoutePairAddress(address asset, address route)
    setNotLP(address token)
    removeToken(uint256 i)
    sweep()
    withdraw(address token)







lending > CarefulMath:
---
    ~

lending > JoetrollerErrorReporter:
---
    ~

lending > TokenErrorReporter:
---
    ~

lending > Exponential:
---
    ~

lending > FlashloanLender:
---
    maxFlashLoan(address token) -> (uint256)
    flashFee(address token, uint256 amount) -> (uint256)
    flashLoan(ERC3156FlashBorrowerInterface receiver, address token, uint256 amount, bytes calldata data) -> (bool)
    updateUnderlyingMapping(JToken[] calldata jTokens) onlyOwner -> (bool)
    removeUnderlyingMapping(JToken[] calldata jTokens) onlyOwner -> (bool)


lending > InterestRateModel:
---

_Compound's InterestRateModel Interface_

_author: Compound_

    getBorrowRate(uint256 cash, uint256 borrows, uint256 reserves) -> (uint256)
    getSupplyRate(uint256 cash, uint256 borrows, uint256 reserves, uint256 reserveFactorMantissa) -> (uint256)

lending > JAvax:
---

_JAvax Contract; JToken which wraps Ether_

_author: Compound_

    mint() payable
    redeem(uint256 redeemTokens) -> (uint256)
    redeemUnderlying(uint256 redeemAmount) -> (uint256)
    redeemUnderlying(uint256 redeemAmount) -> (uint256)
    repayBorrow() payable
    liquidateBorrow(address borrower, JTokenDeprecated jTokenCollateral) payable
    function() payable


lending > JCapableErc20:
---

_Deprecated Cream's JCapableErc20 Contract; JTokens which wrap an EIP-20 underlying_

_author: Cream_

    initialize(address underlying_, JoetrollerInterface joetroller_, InterestRateModel interestRateModel_, uint256 initialExchangeRateMantissa_, string memory name_, string memory symbol_, uint8 decimals_)
    mint(uint256 mintAmount) -> (uint256)
    redeem(uint256 redeemTokens) -> (uint256)
    redeemUnderlying(uint256 redeemAmount) -> (uint256)
    borrow(uint256 borrowAmount) -> (uint256)
    repayBorrow(uint256 repayAmount) -> (uint256)
    repayBorrowBehalf(address borrower, uint256 repayAmount) -> (uint256)
    liquidateBorrow(address borrower, uint256 repayAmount, JTokenInterface jTokenCollateral) -> (uint256)
    gulp()
    flashLoan(address receiver, uint256 amount, bytes calldata params)

lending > JCapableErc20Delegate:
---

_Joeound's JCapableErc20Delegate Contract; JTokens which wrap an EIP-20 underlying and are delegated to_

_author: Joeound_

    _becomeImplementation(bytes memory data)
    _resignImplementation()


lending > JCollateralCapErc20:
---

_Cream's JCollateralCapErc20 Contract; JTokens which wrap an EIP-20 underlying with collateral cap_
_author: Cream_

    initialize(address underlying_, JoetrollerInterface joetroller_, InterestRateModel interestRateModel_, uint256 initialExchangeRateMantissa_, string memory name_, string memory symbol_, uint8 decimals_)
    mint(uint256 mintAmount) -> (uint256)
    redeem(uint256 redeemTokens) -> (uint256)
    redeemUnderlying(uint256 redeemAmount) -> (uint256)
    borrow(uint256 borrowAmount) -> (uint256)
    repayBorrow(uint256 repayAmount) -> (uint256)
    repayBorrowBehalf(address borrower, uint256 repayAmount) -> (uint256)
    liquidateBorrow(address borrower, uint256 repayAmount, JTokenInterface jTokenCollateral) -> (uint256)
    _addReserves(uint256 addAmount) -> (uint256)
    _setCollateralCap(uint256 newCollateralCap) 
    gulp()
    maxFlashLoan() -> (uint256)
    flashFee(uint256 amount) -> (uint256)
    flashLoan(ERC3156FlashBorrowerInterface receiver, address initiator, uint256 amount, bytes calldata data)  -> (bool)
    registerCollateral(address account) -> (uint256)
    unregisterCollateral(address account)
    _setProtocolSeizeShare(uint256 newProtocolSeizeShareMantissa) -> (uint256)

lending > JCollateralCapErc20Delegate:
---

_Cream's JCollateralCapErc20Delegate Contract; JTokens which wrap an EIP-20 underlying and are delegated to_

_author: Cream_

    _becomeImplementation(bytes memory data)
    _resignImplementation()


lending > JCollateralCapErc20Delegator:
---

_Cream's JCollateralCapErc20Delegator Contract; JTokens which wrap an EIP-20 underlying and delegate to an implementation_

_author: Cream_

    _setImplementation(address implementation_, bool allowResign, bytes memory becomeImplementationData)
    mint(uint256 mintAmount) -> (uint256)
    redeem(uint256 redeemTokens) -> (uint256)
    redeemUnderlying(uint256 redeemAmount) -> (uint256)
    borrow(uint256 borrowAmount) -> (uint256)
    repayBorrow(uint256 repayAmount) -> (uint256)
    repayBorrowBehalf(address borrower, uint256 repayAmount) -> (uint256)
    liquidateBorrow(address borrower, uint256 repayAmount, JTokenInterface jTokenCollateral) -> (uint256)
    transfer(address dst, uint256 amount) -> (bool)
    transferFrom(address src, address dst, uint256 amount) -> (bool)
    approve(address spender, uint256 amount) -> (bool)
    gulp()
    flashLoan(ERC3156FlashBorrowerInterface receiver, address initiator, uint256 amount, bytes calldata data) -> (bool)
    registerCollateral(address account) -> (uint256)
    unregisterCollateral(address account) 
    allowance(address owner, address spender) -> (uint256)
    balanceOf(address owner) -> (uint256)
    balanceOfUnderlying(address owner) -> (uint256)
    getAccountSnapshot(address account) -> (uint256, uint256, uint256, uint256)
    borrowRatePerSecond() -> (uint256)
    supplyRatePerSecond() -> (uint256)
    totalBorrowsCurrent() -> (uint256)
    borrowBalanceCurrent(address account) -> (uint256)
    borrowBalanceStored(address account) public -> (uint256)
    exchangeRateCurrent() public -> (uint256)
    exchangeRateStored() public -> (uint256)
    getCash() -> (uint256)
    accrueInterest() public -> (uint256)
    seize(address liquidator, address borrower, uint256 seizeTokens) -> (uint256)
    _setPendingAdmin(address payable newPendingAdmin) -> (uint256)
    _setJoetroller(JoetrollerInterface newJoetroller) public -> (uint256)
    _setReserveFactor(uint256 newReserveFactorMantissa) -> (uint256)
    _acceptAdmin() -> (uint256)
    _addReserves(uint256 addAmount) -> (uint256)
    _reduceReserves(uint256 reduceAmount) -> (uint256)
    _setInterestRateModel(InterestRateModel newInterestRateModel) public -> (uint256)
    _setCollateralCap(uint256 newCollateralCap) 
    delegateToImplementation(bytes memory data) public -> (bytes memory)
    delegateToViewImplementation(bytes memory data) public -> (bytes memory)
    () payable


lending > JErc20:
---

_Compound's JErc20 Contract; JTokens which wrap an EIP-20 underlying_

_author: Compound_


    initialize(address underlying_, JoetrollerInterface joetroller_, InterestRateModel interestRateModel_, uint256 initialExchangeRateMantissa_, string memory name_, string memory symbol_, uint8 decimals_)
    mint(uint256 mintAmount) -> (uint256)
    redeem(uint256 redeemTokens) -> (uint256)
    redeemUnderlying(uint256 redeemAmount) -> (uint256)
    borrow(uint256 borrowAmount) -> (uint256)
    repayBorrow(uint256 repayAmount) -> (uint256)
    repayBorrowBehalf(address borrower, uint256 repayAmount) -> (uint256)
    liquidateBorrow(address borrower, uint256 repayAmount, JTokenInterface jTokenCollateral) -> (uint256)
    _addReserves(uint256 addAmount) -> (uint256)


lending > JErc20Delegate:
---

_Compound's JErc20Delegate Contract; JTokens which wrap an EIP-20 underlying and are delegated to_

_author: Compound_

    _becomeImplementation(bytes memory data)
    _resignImplementation()


lending > JErc20Delegator:
---

_Compound's JErc20Delegator Contract; JTokens which wrap an EIP-20 underlying and delegate to an implementation_
_author: Compound_

    _setImplementation(address implementation_, bool allowResign, bytes memory becomeImplementationData)
    mint(uint256 mintAmount) -> (uint256)
    redeem(uint256 redeemTokens) -> (uint256)
    redeemUnderlying(uint256 redeemAmount) -> (uint256)
    borrow(uint256 borrowAmount) -> (uint256)
    repayBorrow(uint256 repayAmount) -> (uint256)
    repayBorrowBehalf(address borrower, uint256 repayAmount) -> (uint256)
    liquidateBorrow(address borrower, uint256 repayAmount, JTokenInterface jTokenCollateral) -> (uint256)
    transfer(address dst, uint256 amount) -> (bool)
    transferFrom(address src, address dst, uint256 amount) -> (bool)
    approve(address spender, uint256 amount) -> (bool)
    allowance(address owner, address spender) -> (uint256)
    balanceOf(address owner) -> (uint256)
    balanceOfUnderlying(address owner) -> (uint256)
    getAccountSnapshot(address account) -> ( uint256, uint256, uint256, uint256)
    borrowRatePerSecond() -> (uint256)
    supplyRatePerSecond() -> (uint256)
    totalBorrowsCurrent() -> (uint256)
    borrowBalanceCurrent(address account) -> (uint256)
    borrowBalanceStored(address account) -> (uint256)
    exchangeRateCurrent() -> (uint256)
    exchangeRateStored() -> (uint256)
    getCash() -> (uint256)
    accrueInterest() -> (uint256)
    seize(address liquidator, address borrower, uint256 seizeTokens) -> (uint256)
    _setPendingAdmin(address payable newPendingAdmin) -> (uint256)
    _setJoetroller(JoetrollerInterface newJoetroller) -> (uint256)
    _setReserveFactor(uint256 newReserveFactorMantissa) -> (uint256)
    _acceptAdmin() -> (uint256)
    _addReserves(uint256 addAmount) -> (uint256)
    _reduceReserves(uint256 reduceAmount) -> (uint256)
    _setInterestRateModel(InterestRateModel newInterestRateModel) -> (uint256)
    delegateToImplementation(bytes memory data) -> (bytes memory)
    delegateToViewImplementation(bytes memory data) -> (bytes memory)
    () payable


lending > JErc20Immutable:
---
    ~

lending > JJLPDelegate:
---

_Cream's JJoeLP's Contract; JToken which wraps Joe's LP token_

_author: Cream_

    _becomeImplementation(bytes memory data)
    claimJoe(address account) -> (uint256)


lending > JJTokenDelegate:
---

_Cream's JJToken's Contract; JToken which wraps Compound's Ctoken_

_author: Cream_

    _becomeImplementation(bytes memory data)
    claimJoe(address account) -> (uint256)


lending > Joetroller:
---

_Compound's Joetroller Contract_

_author: Compound (modified by Cream)_


    getAllMarkets() -> (JToken[] memory)
    getBlockTimestamp() -> (uint256)
    getAssetsIn(address account) -> (JToken[] memory)
    checkMembership(address account, JToken jToken) -> (bool)
    enterMarkets(address[] memory jTokens) -> (uint256[] memory)
    exitMarket(address jTokenAddress) -> (uint256)
    isMarketListed(address jTokenAddress) -> (bool)
    mintAllowed(address jToken, address minter, uint256 mintAmount) -> (uint256)
    mintVerify(address jToken, address minter, uint256 actualMintAmount, uint256 mintTokens)
    redeemAllowed(address jToken, address redeemer, uint256 redeemTokens) -> (uint256)
    redeemVerify(address jToken, address redeemer, uint256 redeemAmount, uint256 redeemTokens)
    borrowAllowed(address jToken, address borrower, uint256 borrowAmount)
    borrowVerify(address jToken, address borrower, uint256 borrowAmount)
    repayBorrowAllowed(address jToken, address payer, address borrower, uint256 repayAmount) -> (uint256)
    repayBorrowVerify(address jToken, address payer, address borrower, uint256 actualRepayAmount, uint256 borrowerIndex)
    liquidateBorrowAllowed(address jTokenBorrowed, address jTokenCollateral, address liquidator, address borrower, uint256 repayAmount) -> (uint256)
    liquidateBorrowVerify(address jTokenBorrowed, address jTokenCollateral, address liquidator, address borrower, uint256 actualRepayAmount, uint256 seizeTokens)
    seizeAllowed(address jTokenCollateral, address jTokenBorrowed, address liquidator, address borrower, uint256 seizeTokens) -> (uint256)
    seizeVerify(address jTokenCollateral, address jTokenBorrowed, address liquidator, address borrower, uint256 seizeTokens)
    transferAllowed(address jToken, address src, address dst, uint256 transferTokens) -> (uint256)
    transferVerify(address jToken, address src, address dst, uint256 transferTokens)
    flashloanAllowed(address jToken, address receiver, uint256 amount, bytes calldata params) -> (bool)
    updateJTokenVersion(address jToken, Version newVersion)
    isCreditAccount(address account) -> (bool)
    getAccountLiquidity(address account) -> (uint256, uint256, uint256)
    getHypotheticalAccountLiquidity(address account, address jTokenModify, uint256 redeemTokens, uint256 borrowAmount)  -> (uint256, uint256, uint256)
    liquidateCalculateSeizeTokens(address jTokenBorrowed, address jTokenCollateral, uint256 actualRepayAmount) -> (uint256, uint256)
    _setRewardDistributor(address payable newRewardDistributor) -> (uint256)
    _setPriceOracle(PriceOracle newOracle) -> (uint256)
    _setCloseFactor(uint256 newCloseFactorMantissa) -> (uint256)
    _setCollateralFactor(JToken jToken, uint256 newCollateralFactorMantissa) -> (uint256)
    _setLiquidationIncentive(uint256 newLiquidationIncentiveMantissa) -> (uint256)
    _supportMarket(JToken jToken, Version version) -> (uint256)
    _delistMarket(JToken jToken)
    _setSupplyCapGuardian(address newSupplyCapGuardian)
    _setMarketSupplyCaps(JToken[] calldata jTokens, uint256[] calldata newSupplyCaps)
    _setMarketBorrowCaps(JToken[] calldata jTokens, uint256[] calldata newBorrowCaps)
    _setBorrowCapGuardian(address newBorrowCapGuardian)
    _setPauseGuardian(address newPauseGuardian) -> (uint256)
    _setMintPaused(JToken jToken, bool state) -> (bool)
    _setBorrowPaused(JToken jToken, bool state) -> (bool)
    _setFlashloanPaused(JToken jToken, bool state) -> (bool)
    _setTransferPaused(bool state) -> (bool)
    _setSeizePaused(bool state) -> (bool)
    _become(Unitroller unitroller)
    _setCreditLimit(address protocol, uint256 creditLimit)
    claimReward(uint8 rewardType, address payable holder)
    claimReward(uint8 rewardType, address payable holder, JToken[] memory jTokens)
    claimReward(uint8 rewardType, address payable[] memory holders, JToken[] memory jTokens, bool borrowers, bool suppliers) payable


lending > JoetrollerInterface:
---
    enterMarkets(address[] calldata jTokens) -> (uint256[] memory)
    exitMarket(address jToken) -> (uint256)
    mintAllowed(address jToken, address minter, uint256 mintAmount) -> (uint256)
    mintVerify(address jToken, address minter, uint256 mintAmount, uint256 mintTokens)
    redeemAllowed(address jToken, address redeemer, uint256 redeemTokens) -> (uint256)
    redeemVerify(address jToken, address redeemer, uint256 redeemAmount, uint256 redeemTokens)
    borrowAllowed(address jToken, address borrower, uint256 borrowAmount) -> (uint256)
    borrowVerify(address jToken, address borrower, uint256 borrowAmount)
    repayBorrowAllowed(address jToken, address payer, address borrower, uint256 repayAmount) -> (uint256)
    repayBorrowVerify(address jToken, address payer, address borrower, uint256 repayAmount, uint256 borrowerIndex)
    liquidateBorrowAllowed(address jTokenBorrowed, address jTokenCollateral, address liquidator, address borrower, uint256 repayAmount) -> (uint256)
    liquidateBorrowVerify(address jTokenBorrowed, address jTokenCollateral, address liquidator, address borrower, uint256 repayAmount, uint256 seizeTokens)
    seizeAllowed(address jTokenCollateral, address jTokenBorrowed, address liquidator, address borrower, uint256 seizeTokens) -> (uint256)
    seizeVerify(address jTokenCollateral, address jTokenBorrowed, address liquidator, address borrower, uint256 seizeTokens)
    transferAllowed(address jToken, address src, address dst, uint256 transferTokens) -> (uint256)
    transferVerify(address jToken, address src, address dst, uint256 transferTokens)
    liquidateCalculateSeizeTokens(address jTokenBorrowed, address jTokenCollateral, uint256 repayAmount) -> (uint256, uint256)


lending > UnitrollerAdminStorage:
---
    ~

lending > JoetrollerV1Storage:
---
    ~


lending > JToken:
---

_Compound's JToken Contract; Abstract base for JTokens_

_author: Compound_


    initialize(JoetrollerInterface joetroller_, InterestRateModel interestRateModel_, uint256 initialExchangeRateMantissa_, string memory name_, string memory symbol_, uint8 decimals_)
    transfer(address dst, uint256 amount) -> (bool)
    transferFrom(address src, address dst, uint256 amount) -> (bool)
    approve(address spender, uint256 amount) -> (bool)
    allowance(address owner, address spender) -> (uint256)
    balanceOf(address owner) -> (uint256)
    balanceOfUnderlying(address owner) -> (uint256)
    getAccountSnapshot(address account) -> (uint256, uint256, uint256, uint256)
    borrowRatePerSecond() -> (uint256) 
    supplyRatePerSecond() -> (uint256)
    estimateBorrowRatePerSecondAfterChange(uint256 change, bool repay) -> (uint256)
    estimateSupplyRatePerSecondAfterChange(uint256 change, bool repay) -> (uint256)
    totalBorrowsCurrent() -> (uint256)
    borrowBalanceCurrent(address account) -> (uint256)
    borrowBalanceStored(address account) -> (uint256)
    exchangeRateCurrent() -> (uint256)
    exchangeRateStored() -> (uint256)
    getCash() -> (uint256)
    accrueInterest() -> (uint256)
    seize(address liquidator, address borrower, uint256 seizeTokens) -> (uint256)
    _setPendingAdmin(address payable newPendingAdmin) -> (uint256)
    _acceptAdmin() -> (uint256)
    _setJoetroller(JoetrollerInterface newJoetroller) -> (uint256)
    _setReserveFactor(uint256 newReserveFactorMantissa) -> (uint256)
    _reduceReserves(uint256 reduceAmount) -> (uint256)
    _setInterestRateModel(InterestRateModel newInterestRateModel) -> (uint256)


lending > JTokenAdmin:
---
    getJTokenAdmin(address jToken) -> (address)
    _setPendingAdmin(address jToken, address payable newPendingAdmin) -> (uint256)
    _acceptAdmin(address jToken) -> (uint256)
    _setJoetroller(address jToken, JoetrollerInterface newJoetroller) -> (uint256)
    _setReserveFactor(address jToken, uint256 newReserveFactorMantissa) -> (uint256)
    _reduceReserves(address jToken, uint256 reduceAmount) -> (uint256)
    _setInterestRateModel(address jToken, InterestRateModel newInterestRateModel) -> (uint256)
    _setCollateralCap(address jToken, uint256 newCollateralCap)
    _setImplementation(address jToken, address implementation, bool allowResign, bytes calldata becomeImplementationData)
    extractReserves(address jToken, uint256 reduceAmount) onlyReserveManager
    seize(address token)
    setAdmin(address payable newAdmin)
    setReserveManager(address payable newReserveManager)
    () payable


lending > JTokenDeprecated:
---

_Deprecated JToken Contract only for JAvax. JAvax will not be used anymore and existing JAvax can't be upgraded._
_author: Cream_


    initialize(JoetrollerInterface joetroller_, InterestRateModel interestRateModel_, uint256 initialExchangeRateMantissa_, string memory name_, string memory symbol_, uint8 decimals_)
    transfer(address dst, uint256 amount) -> (bool)
    transferFrom(address src, address dst, uint256 amount) -> (bool)
    approve(address spender, uint256 amount) -> (bool)
    allowance(address owner, address spender) -> (uint256)
    balanceOf(address owner) -> (uint256)
    balanceOfUnderlying(address owner) -> (uint256)
    getAccountSnapshot(address account) -> (uint256, uint256, uint256, uint256)
    borrowRatePerSecond() -> (uint256)
    supplyRatePerSecond() -> (uint256)
    totalBorrowsCurrent() -> (uint256)
    borrowBalanceCurrent(address account) -> (uint256)
    borrowBalanceStored(address account) -> (uint256)
    exchangeRateCurrent() -> (uint256)
    exchangeRateStored() -> (uint256)
    getCash() -> (uint256)
    accrueInterest() -> (uint256)
    seize(address liquidator, address borrower, uint256 seizeTokens) -> (uint256)
    _setPendingAdmin(address payable newPendingAdmin) -> (uint256)
    _acceptAdmin() -> (uint256)
    _setJoetroller(JoetrollerInterface newJoetroller) -> (uint256)
    _setReserveFactor(uint256 newReserveFactorMantissa) -> (uint256)
    _reduceReserves(uint256 reduceAmount) -> (uint256)
    _setInterestRateModel(InterestRateModel newInterestRateModel) -> (uint256)


lending > JTokenStorage:
---
    ~

lending > JErc20Storage:
---
    ~

lending > JSupplyCapStorage:
---
    ~

lending > JCollateralCapStorage:
---
    ~

lending > JTokenInterface:
---
    ~

lending > JumpRateModelV2:
---

_Compound's JumpRateModel Contract V2; it modifies Version 1 by enabling updateable parameters._

_author: Compound (modified by Dharma Labs)_

    updateJumpRateModel(uint256 baseRatePerYear, uint256 multiplierPerYear, uint256 jumpMultiplierPerYear, uint256 kink_, uint256 roof_)
    utilizationRate(uint256 cash, uint256 borrows, uint256 reserves) -> (uint256)
    getBorrowRate(uint256 cash, uint256 borrows, uint256 reserves) -> (uint256)
    getSupplyRate(uint256 cash, uint256 borrows, uint256 reserves, uint256 reserveFactorMantissa) -> (uint256)


lending > JWrappedNative:
---

_Wrapped native token interface_

    initialize(address underlying_, JoetrollerInterface joetroller_, InterestRateModel interestRateModel_, uint256 initialExchangeRateMantissa_, string memory name_, string memory symbol_, uint8 decimals_)
    mint(uint256 mintAmount) -> (uint256)
    mintNative() payable -> (uint256)
    redeem(uint256 redeemTokens) -> (uint256)
    redeemNative(uint256 redeemTokens) -> (uint256)
    redeemUnderlying(uint256 redeemAmount) -> (uint256)
    redeemUnderlyingNative(uint256 redeemAmount) -> (uint256)
    borrow(uint256 borrowAmount) -> (uint256)
    borrowNative(uint256 borrowAmount) -> (uint256)
    repayBorrow(uint256 repayAmount) -> (uint256)
    repayBorrowNative() payable -> (uint256)
    repayBorrowBehalf(address borrower, uint256 repayAmount) -> (uint256)
    repayBorrowBehalfNative(address borrower) payable -> (uint256)
    liquidateBorrow(address borrower, uint256 repayAmount, JTokenInterface jTokenCollateral) -> (uint256)
    liquidateBorrowNative(address borrower, JTokenInterface jTokenCollateral) -> (uint256)
    maxFlashLoan() -> (uint256)
    flashFee(uint256 amount) -> (uint256)
    flashLoan(ERC3156FlashBorrowerInterface receiver, address initiator, uint256 amount, bytes calldata data) -> (bool)
    () payable
    _addReserves(uint256 addAmount) -> (uint256)
    _addReservesNative() payable -> (uint256)
    _setProtocolSeizeShare(uint256 newProtocolSeizeShareMantissa) -> (uint256)


lending > JWrappedNativeDelegate:
---

_Cream's JWrappedNativeDelegate Contract; JTokens which wrap an EIP-20 underlying and are delegated to_

_author: Cream_

    _becomeImplementation(bytes memory data)
    _resignImplementation()



lending > JWrappedNativeDelegator:
---

_Compound's JWrappedNativeDelegator Contract; JTokens which wrap an EIP-20 underlying and delegate to an implementation_

_author: Compound_


    _setImplementation(address implementation_, bool allowResign, bytes memory becomeImplementationData)
    mint(uint256 mintAmount) -> (uint256)
    mintNative() payable -> (uint256)
    redeem(uint256 redeemTokens) -> (uint256)
    redeemNative(uint256 redeemTokens) -> (uint256)
    redeemUnderlying(uint256 redeemAmount) -> (uint256)
    redeemUnderlyingNative(uint256 redeemAmount) -> (uint256)
    borrow(uint256 borrowAmount) -> (uint256)
    borrowNative(uint256 borrowAmount) -> (uint256)
    repayBorrow(uint256 repayAmount) -> (uint256)
    repayBorrowNative() payable -> (uint256)
    repayBorrowBehalf(address borrower, uint256 repayAmount) -> (uint256)
    repayBorrowBehalfNative(address borrower) payable -> (uint256)
    liquidateBorrow(address borrower, uint256 repayAmount, JTokenInterface jTokenCollateral) -> (uint256)
    liquidateBorrowNative(address borrower, JTokenInterface jTokenCollateral) payable -> (uint256)
    flashLoan(ERC3156FlashBorrowerInterface receiver, address initiator, uint256 amount, bytes calldata data) -> (bool)
    transfer(address dst, uint256 amount) -> (bool)
    transferFrom(address src, address dst, uint256 amount) -> (bool)
    approve(address spender, uint256 amount) -> (bool)
    allowance(address owner, address spender) -> (uint256)
    balanceOf(address owner) -> (uint256)
    balanceOfUnderlying(address owner) -> (uint256)
    getAccountSnapshot(address account) -> (uint256, uint256, uint256, uint256)
    borrowRatePerSecond() -> (uint256)
    supplyRatePerSecond() -> (uint256)
    totalBorrowsCurrent() -> (uint256)
    borrowBalanceCurrent(address account) -> (uint256)
    borrowBalanceStored(address account) -> (uint256)
    exchangeRateCurrent() -> (uint256)
    exchangeRateStored() -> (uint256)
    getCash() -> (uint256)
    accrueInterest() -> (uint256)
    seize(address liquidator, address borrower, uint256 seizeTokens) -> (uint256)
    _setPendingAdmin(address payable newPendingAdmin) -> (uint256)
    _setJoetroller(JoetrollerInterface newJoetroller) -> (uint256)
    _setReserveFactor(uint256 newReserveFactorMantissa) -> (uint256)
    _acceptAdmin() -> (uint256)
    _addReserves(uint256 addAmount) -> (uint256)
    _addReservesNative() payable -> (uint256)
    _reduceReserves(uint256 reduceAmount) -> (uint256)
    _setInterestRateModel(InterestRateModel newInterestRateModel) -> (uint256)
    delegateToImplementation(bytes memory data) -> (bytes memory)
    delegateToViewImplementation(bytes memory data) -> (bytes memory)
    () payable


lending > Maximillion:
---

_Compound's Maximillion Contract_

_author: Compound_

    repayBehalf(address borrower) payable
    repayBehalfExplicit(address borrower, JWrappedNative jAvax_) payable
    repayBehalfExplicit(address borrower, JWrappedNative jAvax_) payable


lending > RewardDistributorStorage:
---
    ~

lending > RewardDistributor:
---
    initialize()
    _setRewardSpeed(uint8 rewardType, JToken jToken, uint256 rewardSupplySpeed, uint256 rewardBorrowSpeed)
    updateAndDistributeSupplierRewardsForToken(address jToken, address supplier)
    updateAndDistributeBorrowerRewardsForToken(address jToken, address borrower, Exp calldata marketBorrowIndex)
    claimReward(uint8 rewardType, address payable holder)
    claimReward(uint8 rewardType, address payable holder, JToken[] memory jTokens)
    claimReward(uint8 rewardType, address payable[] memory holders, JToken[] memory jTokens, bool borrowers, bool suppliers) payable
    _grantReward(uint8 rewardType, address payable recipient, uint256 amount)
    setJoeAddress(address newJoeAddress)
    setJoetroller(address _joetroller)
    setAdmin(address _newAdmin)
    () payable
    getBlockTimestamp() -> (uint256)


lending > TripleSlopeRateModel:
---

_CREAM's TripleSlopeRateModel Contract_

_author: C.R.E.A.M. Finance_


    updateTripleRateModel(uint256 baseRatePerYear, uint256 multiplierPerYear, uint256 jumpMultiplierPerYear, uint256 kink1_, uint256 kink2_, uint256 roof_)
    utilizationRate(uint256 cash, uint256 borrows, uint256 reserves) -> (uint256)
    getBorrowRate(uint256 cash, uint256 borrows, uint256 reserves) -> (uint256)
    getSupplyRate(uint256 cash, uint256 borrows, uint256 reserves, uint256 reserveFactorMantissa ) -> (uint256)


lending > Unitroller:
---

_JoetrollerCore; Storage for the joetroller is at this address, while execution is delegated to the `implementation`. JTokens should reference this contract as their joetroller._

    _setPendingImplementation(address newPendingImplementation) -> (uint256)
    _acceptImplementation() -> (uint256)
    _setPendingAdmin(address newPendingAdmin) -> (uint256)
    _acceptAdmin() -> (uint256)
    () payable



lending > Lens > JoeLens:
---

_This is a version of JoeLens that contains write transactions. Call these functions as dry-run transactions for the frontend._


    jTokenMetadataAll(JToken[] calldata jTokens) -> (JTokenMetadata[] memory)
    jTokenMetadata(JToken jToken) -> (JTokenMetadata memory)
    jTokenBalancesAll(JToken[] memory jTokens, address account) -> (JTokenBalances[] memory)
    jTokenBalances(JToken jToken, address account) -> (JTokenBalances memory)
    getAccountLimits(Joetroller joetroller, address account) -> (AccountLimits memory)
    getClaimableRewards(uint8 rewardType, address joetroller, address joe, address payable account) -> (uint256)


lending > Lens > JoeLensView:
---

_This is a version of JoeLens that only contains view functions._

    jTokenMetadataAll(JToken[] calldata jTokens) -> (JTokenMetadata[] memory)
    jTokenMetadata(JToken jToken) -> (JTokenMetadata memory)
    jTokenBalancesAll(JToken[] memory jTokens, address account) -> (JTokenBalances[] memory)
    jTokenBalances(JToken jToken, address account) -> (JTokenBalances memory)
    getAccountLimits(Joetroller joetroller, address account) -> (AccountLimits memory)



lending > PriceOracle > PriceOracle:
---
    ~

lending > PriceOracle > PriceOracleProxyUSD:
---
    getUnderlyingPrice(JToken jToken) -> (uint256)
    _setGuardian(address _guardian)
    _setAdmin(address _admin)
    _setAggregators(address[] calldata jTokenAddresses, address[] calldata sources)
    _setUnderlyingPrice(JToken jToken, uint256 underlyingPriceMantissa)
    setDirectPrice(address asset, uint256 price)

lending > PriceOracle > SimplePriceOracle:
---
    getUnderlyingPrice(JToken jToken) -> (uint256)
    setUnderlyingPrice(JToken jToken, uint256 underlyingPriceMantissa)
    setDirectPrice(address asset, uint256 price)
    assetPrices(address asset) -> (uint256)
