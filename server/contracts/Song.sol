// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

contract Song {
    mapping(address => bytes32[]) public songs;
    mapping(address => uint256) public balances;
    address payable owner;
    bool private isPaused;

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

    error NotOwner();
    error Paused();
    error Unpaused();
    error NoFunds();
    error NoBalance();

    event Deposited(
        address indexed _account,
        uint256 _deposit,
        uint256 _balance
    );
    event SongRegistered(
        address indexed _writer,
        bytes32 _hash,
        uint256 _timestamp
    );

    constructor() {
        owner = payable(msg.sender);
        isPaused = false;
    }

    function deposit() public payable pauseCheck {
        if (msg.value < 1 gwei) {
            revert NoFunds();
        }

        balances[msg.sender] += msg.value;

        emit Deposited(msg.sender, msg.value, balances[msg.sender]);
    }

    function register(bytes32 _songHash) external pauseCheck {
        if (balances[msg.sender] < 1 gwei) {
            revert NoBalance();
        }

        balances[msg.sender] -= 1 gwei;

        songs[msg.sender].push(_songHash);

        emit SongRegistered(msg.sender, _songHash, block.timestamp);
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
}
