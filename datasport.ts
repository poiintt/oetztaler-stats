import CryptoJS from 'crypto-js';

// from view-source:https://www.datasport.com/live/search/

function getKey() {
    return { key2: 'UHZ7Ivre3VQZz6OcueH7uw==', iv2: 'ZPIU5yq6wJzBQXLDlH02/g==' }
}

export function encrypt(payload: string): string {
    console.time('encrypt')
    const { key2, iv2 } = getKey();
    var key = CryptoJS.enc.Base64.parse(key2);
    var iv = CryptoJS.enc.Base64.parse(iv2);
    var encrypted = CryptoJS.AES.encrypt(payload, key, { iv: iv });
    var result = encrypted.toString();
    console.timeEnd('encrypt')
    return result;
}

export function decrypt(payload: string): string {
    console.time('decrypt')
    const { key2, iv2 } = getKey();
    var key = CryptoJS.enc.Base64.parse(key2);
    var iv = CryptoJS.enc.Base64.parse(iv2);
    var decrypted = CryptoJS.AES.decrypt(payload, key, { iv: iv });
    var result = decrypted.toString(CryptoJS.enc.Utf8);
    console.timeEnd('decrypt')
    return result;
}