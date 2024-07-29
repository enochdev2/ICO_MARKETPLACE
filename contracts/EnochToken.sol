// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

contract EnochToken is ERC20 {
    constructor() ERC20("@enochPromise", "EPT")  {
        _mint(msg.sender, 50000 * 10 ** 18);
    }
}