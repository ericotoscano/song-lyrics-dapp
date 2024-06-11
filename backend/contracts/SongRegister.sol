// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

contract SongRegister {
    struct Song {
        string title;
        string signature;
    }

    mapping(address => Song[]) internal _songs;
    address payable public owner;
    bool public isPaused;
    uint256 public immutable cost;

    event Registered(
        address indexed songwriter,
        string songTitle,
        string songSignature
    );

    error NotOwner();
    error Paused();
    error ValueMustBeEqualCost();

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

    constructor(uint256 _cost) {
        owner = payable(msg.sender);
        isPaused = false;
        cost = _cost;
    }

    function withdraw() external onlyOwner {
        owner.transfer(address(this).balance);
    }

    function switchIsPaused() external onlyOwner {
        isPaused = !isPaused;
    }

    function getSongs() external view returns (Song[] memory) {
        return _songs[msg.sender];
    }

    function register(
        string calldata _title,
        string calldata _signature
    ) external payable pauseCheck {
        if (msg.value != cost) {
            revert ValueMustBeEqualCost();
        }

        Song memory song = Song(_title, _signature);

        _songs[msg.sender].push(song);

        emit Registered(msg.sender, _title, _signature);
    }
}
