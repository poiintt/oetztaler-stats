import CryptoJS from 'crypto-js';

// from view-source:https://www.datasport.com/live/search/

const key = CryptoJS.enc.Base64.parse('UHZ7Ivre3VQZz6OcueH7uw==');
const iv = CryptoJS.enc.Base64.parse('ZPIU5yq6wJzBQXLDlH02/g==');

export function encrypt(payload: string): string {
    console.time('encrypt')
    const encrypted = CryptoJS.AES.encrypt(payload, key, { iv });
    const result = encrypted.toString();
    console.timeEnd('encrypt')
    return result;
}

export function decrypt(payload: string): string {
    console.time('decrypt')
    const decrypted = CryptoJS.AES.decrypt(payload, key, { iv });
    const result = decrypted.toString(CryptoJS.enc.Utf8);
    console.timeEnd('decrypt')
    return result;
}