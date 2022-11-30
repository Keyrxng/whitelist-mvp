pragma solidity ^0.8.0;

contract whitelist {
    uint8 public maxWLAddrs;

    mapping(address => bool) public wlAddrs;

    uint8 public addrsWLed;

    constructor(uint8 _maxWLAddrs) {
        maxWLAddrs = _maxWLAddrs;
    }

    error AlreadyInitialized();
    error MaxWhitelisted();

    function addToWhitelist() public {
        if (wlAddrs[msg.sender]) revert AlreadyInitialized();
        if (addrsWLed == maxWLAddrs) revert MaxWhitelisted();
        wlAddrs[msg.sender] = true;
        addrsWLed += 1;
    }
}
