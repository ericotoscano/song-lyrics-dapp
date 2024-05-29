// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

contract SongRegister {
    struct Song {
        string title;
        string signature;
    }

    mapping(address => Song[]) internal _songs;
    mapping(address => uint256) public balances;
    address payable public owner;
    bool public isPaused;
    uint256 public immutable cost;

    event Deposited(
        address indexed sender,
        uint256 depositValue,
        uint256 currentBalance
    );

    event Registered(
        address indexed songwriter,
        string songTitle,
        string songSignature
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

    function register(
        string calldata _title,
        string calldata _signature
    ) external pauseCheck {
        if (balances[msg.sender] < cost) {
            revert NoBalance();
        }

        balances[msg.sender] -= cost;

        Song memory song = Song(_title, _signature);

        _songs[msg.sender].push(song);

        emit Registered(msg.sender, _title, _signature);
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

    function getSongs() external view returns (Song[] memory) {
        return _songs[msg.sender];
    }

    function deposit() public payable pauseCheck {
        if (msg.value < cost) {
            revert NoFunds();
        }

        balances[msg.sender] += msg.value;

        emit Deposited(msg.sender, msg.value, balances[msg.sender]);
    }
}
