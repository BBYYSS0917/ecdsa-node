const { keccak256 } = require("ethereum-cryptography/keccak");
const { hexToBytes, toHex } = require("ethereum-cryptography/utils");
const secp = require("ethereum-cryptography/secp256k1");

const hashMessage = (message) => keccak256(Uint8Array.from(message));

function recoverPublicKey(message, signature) {
    const hash = hashMessage(message);

    console.log("hash:",hash);
    const fullSignatureBytes = hexToBytes(signature);
    const recoveryBit = fullSignatureBytes[0];
    const signatureBytes = fullSignatureBytes.slice(1);

    console.log("signatureBytes:",signatureBytes);
    console.log("toHex(signatureBytes)",toHex(signatureBytes));

    console.log("recoveryBit:",recoveryBit);
  
    return secp.recoverPublicKey(hash, signatureBytes, recoveryBit);
}


const pubKeyToAddress = (publicKey) => {

    console.log(toHex(publicKey));

    return toHex(keccak256(publicKey.slice(1)).slice(-20));
    // const hash = keccak256(publicKey.slice(1));
    // return toHex(hash.slice(-20)).toUpperCase();
};

module.exports={
    hashMessage,
    recoverPublicKey,
    pubKeyToAddress
}