// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

contract SongRegister {
    mapping(address => bytes32[]) internal _songs;
    mapping(address => uint256) public balances;
    address payable public owner;
    bool public isPaused;
    uint256 immutable public cost;

    event Deposited(
        address indexed _account,
        uint256 _deposit,
        uint256 _balance
    );
    event Registered(
        address indexed _writer,
        bytes32 _hash,
        uint256 _blockNumber
    );

    error NotOwner();
    error Paused();
    error Unpaused();
    error NoFunds();
    error NoBalance();

    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert NotOwner();
        }
        _;
    }

    modifier pauseCheck() {
        if (isPaused == true) {
            revert Paused();
        }
        _;
    }

    modifier unpauseCheck() {
        if (isPaused == false) {
            revert Unpaused();
        }
        _;
    }

    constructor(uint256 _cost) {
        owner = payable(msg.sender);
        isPaused = false;
        cost = _cost;
    }

    function register(bytes32 _songHash) external pauseCheck {
        if (balances[msg.sender] < cost) {
            revert NoBalance();
        }

        balances[msg.sender] -= cost;

        _songs[msg.sender].push(_songHash);

        emit Registered(msg.sender, _songHash, block.number);
    }

    function withdraw() external onlyOwner {
        owner.transfer(address(this).balance);
    }

    function pause() external onlyOwner pauseCheck {
        isPaused = true;
    }

    function unpause() external onlyOwner unpauseCheck {
        isPaused = false;
    }

    function getSongs(
        address _songwriter
    ) external view returns (bytes32[] memory) {
        return _songs[_songwriter];
    }

    function deposit() public payable pauseCheck {
        if (msg.value < cost) {
            revert NoFunds();
        }

        balances[msg.sender] += msg.value;

        emit Deposited(msg.sender, msg.value, balances[msg.sender]);
    }
}
