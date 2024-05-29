const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex } = require("ethereum-cryptography/utils");


const privateKey = secp.secp256k1.utils.randomPrivateKey();
const publicKey = secp.secp256k1.getPublicKey(privateKey);
const address = keccak256(publicKey.slice(1)).slice(-20);

console.log("privateKey:",toHex(privateKey));
console.log("publicKey:", toHex(publicKey));
console.log("address:", toHex(address));

// privateKey: 99a002fa4d2240ddae5b975b60dcb23052b27bd66b9bc004b93100bcf68ac825
// publicKey: 037935e0fb18fb585e28415b509830e62e741ce8b7281222efdb6f9031ea4ccc9f
// address: 03815bf0ec559946a5a598128f7129bad86288fa

// privateKey: 6643738caddea266aaae3d4ccdc35298983bbe08bb46bd2d0b84a5cf95121531
// publicKey: 034c587830e53d18cc34ea50c3ac346b188e3d259e777dd0936e4e534792b28f0b
// address: f058b5fa6012ebdec2a3959724e29c72c532e0ac

// privateKey: 3ab240025ebc214e84cac05a0dba1bd360721006cb2c7e29975e40e247583aa4
// publicKey: 0302bba8cbe82d11d60263539e57be045858cae2a06806adba05e14d54f5b0e2e4
// address: 22c4c7765a52fb30d87424944bee413702fbdad7