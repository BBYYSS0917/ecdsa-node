import * as secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { hexToBytes, toHex } from "ethereum-cryptography/utils";


const ACCOUNTS=new Map([
    [
        "03815bf0ec559946a5a598128f7129bad86288fa",
        {
            "privateKey":"99a002fa4d2240ddae5b975b60dcb23052b27bd66b9bc004b93100bcf68ac825",
            "publicKey":"037935e0fb18fb585e28415b509830e62e741ce8b7281222efdb6f9031ea4ccc9f"
        }
    ],
    [
        "f058b5fa6012ebdec2a3959724e29c72c532e0ac",
        {
            "privateKey":"6643738caddea266aaae3d4ccdc35298983bbe08bb46bd2d0b84a5cf95121531",
            "publicKey":"034c587830e53d18cc34ea50c3ac346b188e3d259e777dd0936e4e534792b28f0b"
        }
    ],
    [
        "22c4c7765a52fb30d87424944bee413702fbdad7",
        {
            "privateKey":"3ab240025ebc214e84cac05a0dba1bd360721006cb2c7e29975e40e247583aa4",
            "publicKey":"0302bba8cbe82d11d60263539e57be045858cae2a06806adba05e14d54f5b0e2e4"
        }
    ]
])


const hashMessage = (message) => keccak256(Uint8Array.from(message));

const getPublicKey=(address)=>{
    return ACCOUNTS.get(address).publicKey;
}

const sign=async(address,message)=>{
    const privateKey=hexToBytes(ACCOUNTS.get(address).privateKey);
    const messageHash = hashMessage(message);

    const [signature,recoveryBit]=await secp.sign(messageHash, privateKey, { recovered: true });

    const fullSignature = new Uint8Array([recoveryBit, ...signature]);

    return toHex(fullSignature);
}


function test(){
    let promise=sign("03815bf0ec559946a5a598128f7129bad86288fa","123123123");
    promise.then(result=>{
        console.log(result);
    })
}


test();

const wallet ={
    getPublicKey,
    sign
}

export default wallet;