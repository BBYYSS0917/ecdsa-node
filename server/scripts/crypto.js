const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const secp = require("ethereum-cryptography/secp256k1");

function hashMessage(message) {
    let bytes=utf8ToBytes(message);
    return keccak256(bytes);
}

async function signMessage(msg,privateKey) {
    const messageHash = hashMessage(msg);
    return secp.sign(messageHash, privateKey, { recovered: true });
}

async function recoverPublicKey(message, signature) {
    const hash = hashMessage(message);
    const fullSignatureBytes = hexToBytes(signature);
    const recoveryBit = fullSignatureBytes[0];
    const signatureBytes = fullSignatureBytes.slice(1);
  
    return secp.recoverPublicKey(hash, signatureBytes, recoveryBit);
}


const pubKeyToAddress = (pubKey) => {
    const hash = keccak256(pubKey.slice(1));
    return toHex(hash.slice(-20)).toUpperCase();
};

module.exports={
    hashMessage,
    recoverPublicKey,
    pubKeyToAddress
}