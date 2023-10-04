// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract cmx_nft is ERC721 {
    
    address private admin;
    mapping (address => bool) private isAdmin;
    uint[] private mt;
    struct Project{
        uint id;
        string name;
        bytes desc;
        uint[] topics;
        uint t;
        bool a;
    }
    mapping(uint => Project) public projects;
    struct Topic{
        uint id;
        uint pid;
        string name;
        bytes desc;
    }
    mapping(uint => Topic) public topics;
    uint private p;
    mapping(uint => uint) private t;
    uint public d;

    string private diasbase;
    modifier onlyA() {
        if(msg.sender != admin) revert();
        _;
    }
    modifier isA() {
        if(!isAdmin[msg.sender]) revert();
        _;
    }
    constructor() ERC721("Tokenized Carbon Asset","tCO2") {
        admin = msg.sender;
        d = makeStamp();
        p = 1;

        diasbase = "https://ipfs.io/ipfs/";
    }
    function makeA(address _a) external onlyA returns(bool){
        return isAdmin[_a] = true;
    }
    function addProject(string memory _name,string memory _desc) external isA returns(bool){
        projects[p] = Project(p,_name,bytes(_desc),mt,t[p],true);
        p++;
        return true;
    }
    function addTopic(uint _p,string memory _name,string memory _desc) external isA returns(bool){
        if(!projects[_p].a) revert();
        projects[_p].topics.push(t[_p]);
        topics[t[_p]] = Topic(t[_p],_p,_name,bytes(_desc));
        t[_p]++;
        return true;
    }
    
    function coinMint(uint project, uint topic) external payable {
        // get usd price of matic
        // calculate on base denomination
        uint price;
        if(msg.value < price) revert();
        uint it = makeStamp();
        uint py = projects[project].id * 10 ** 12;
        uint ty = topics[topic].id * 10 ** 10;
        uint id =  py + ty + it; 
        _mint(msg.sender,id);
    }

    function tokenMint(uint _project, uint _topic,address _erc) external {
        ERC20 token = ERC20(_erc);
        address xco2 = 0xF8be55D705cB3ce9c38cc8F395c0640ec9899892;
        address weth = 0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619; // 18 digits
        address usdc = 0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174; // 6 digit currency
        uint price;
        if(_erc == xco2) {price = 10*10**18;} // fixed price
        else if(_erc == weth) {
            // get usd price of weth
            // calculate on base denomination
            price = 10*10**18;
            }
        else if(_erc == usdc) {
            // get usd price of matic
            // calculate on base denomination
            price = 10*10**6;
            }
        else revert();
        if(token.balanceOf(msg.sender) < price) revert(); 
        uint it = makeStamp();
        uint py = projects[_project].id * 10 ** 12;
        uint ty = topics[_topic].id * 10 ** 10;
        uint id =  py + ty + it; 
        _mint(msg.sender,id);
    } 

    function aMint(uint project, uint topic) external isA {
        uint it = makeStamp();
        uint py = projects[project].id * 10 ** 12;
        uint ty = topics[topic].id * 10 ** 10;
        uint id =  py + ty + it; 
        _mint(msg.sender,id);
        tokenURI(id);
    } 

    function _baseURI() internal view virtual override returns (string memory) {
        return "https://ipfs.io/ipfs/folder/?id:";
    }

    function makeStamp() internal view returns(uint){
        return block.timestamp;
    }
}