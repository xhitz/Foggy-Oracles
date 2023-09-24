// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract cmx_nft is ERC721 {
    
    address private admin;
    mapping(uint => uint) private projects;
    mapping(uint => string) private pNames;
    uint private p;
    uint private t;
    string private diasbase;
    modifier onlyA() {
        if(msg.sender != admin) revert();
        _;
    }
    constructor() ERC721("Tokenized Carbon","tCO2") {
        admin = msg.sender;
        t = makeStamp();
        diasbase = "https://ipfs.io/ipfs/";
    }

    function addProject(string memory _name) external onlyA returns(bool){
        projects[p] = p*10**9;
        pNames[p] = _name;
        p++;
        return true;
    }
    
    function mint(uint project) external {
        uint it = makeStamp();
        uint id = projects[project] + it; 
        _mint(msg.sender,id);
    } 

    function makeStamp() internal view returns(uint){
        return block.timestamp;
    }
}