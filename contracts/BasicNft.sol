// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

//It provides template for  provides a standard implementation for NFTs.

contract BasicNft is ERC721 {
    string public constant TOKEN_URI =
        "ipfs://bafybeig37ioir76s7mg5oobetncojcm3c3hxasyd4rvid4jqhy4gkaheg4/?filename=0-PUG.json";
    //It represents the IPFS URI where the metadata for the NFT is stored.
    uint256 private s_tokenCounter;

    constructor() ERC721("Dogie", "DOG") {
        // the name of the NFT ("Dogie") and its symbol ("DOG").
        s_tokenCounter = 0;
    }

    function mintNft() public {
        _safeMint(msg.sender, s_tokenCounter);
        s_tokenCounter = s_tokenCounter + 1;
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        // require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return TOKEN_URI;
    }

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }
}
