pragma solidity ^0.8.0;

contract whitelist {
    uint8 public maxWLAddrs;
    uint8 public numAddressesWhitelisted;

    address owner;

    mapping(address => bool) public wlAddrs;

    constructor(uint8 _maxWLAddrs) {
        maxWLAddrs = _maxWLAddrs;
        owner = msg.sender;
    }

    error AlreadyInitialized();
    error MaxWhitelisted();
    error NotInitialized();
    error AuthenticationError();

    function addToWhitelist(address _who) public {
        if (wlAddrs[_who]) revert AlreadyInitialized();
        if (numAddressesWhitelisted == maxWLAddrs) revert MaxWhitelisted();
        wlAddrs[_who] = true;
        numAddressesWhitelisted += 1;
    }

    function isWhitelisted(address _who) public view returns (bool) {
        if (!wlAddrs[_who]) revert NotInitialized();
        return wlAddrs[_who];
    }

    function getTotalWhitelisted() public view returns (uint8) {
        return numAddressesWhitelisted;
    }

    function getMaxWhitelistable() public view returns (uint8) {
        return maxWLAddrs;
    }

    function removeFromWhitelist(address _who) public {
        if (!wlAddrs[_who]) revert NotInitialized();
        if (msg.sender != _who) revert AuthenticationError();
        wlAddrs[_who] = false;
        numAddressesWhitelisted -= 1;
    }

    function removeFromWhitelistOP(address _who) public {
        if (msg.sender != owner) revert AuthenticationError();
        wlAddrs[_who] = false;
        numAddressesWhitelisted -= 1;
    }
}
