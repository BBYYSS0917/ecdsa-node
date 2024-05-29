const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex } = require("ethereum-cryptography/utils");

const privateKey = secp.utils.randomPrivateKey();
const publicKey = secp.getPublicKey(privateKey);
const address = keccak256(publicKey.slice(1)).slice(-20);

console.log("privateKey:",toHex(privateKey));
console.log("publicKey:", toHex(publicKey));
console.log("address:", toHex(address));

// privateKey: 334b7e21c9825f1a18e3af16ff2b9786a054f1219056e88ec72520f62866ae7f
// publicKey: 044517e593322730fe75c03c4a0ec715d538e8cb0af9d06246035e975d3e4feabf5c284e59e457f847bd90364e56235b3ef1725a5221bef2b07f1bf52f183f1d87
// address: 4b1ff8bd3d734a4bd54ef0d540d84320023c9a78

// privateKey: 0ab02194b1399fc0b687b28c3810a30c560a90d95b9f4d153865a9ebb9dec944
// publicKey: 048a066b9eabaccc4a2da059d641baef74e301d3b68a5b0fc0c1fda6b84abc5e2851cd8e854084a2229868fc61808ba6ce03398f05d478aaffd097b289c2d96e3c
// address: 11307d5607b3bd583aadb35aad0a8f4924d13cfd

// privateKey: 2af16de0feeca3f853030d75f72818582eaf2b404ea3a7fd8f05a2d5a11e0fa5
// publicKey: 04e1494991e01e92afe928ab130c778ba7a1c03bae12598b919a0b3ca22494383e9073e545d7fccec920d79af2aca2ec6bb9f251f36b6262a613030430b967c21f
// address: 0d797b0a80a0984846980a7248c0cc247c8d6403