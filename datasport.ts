import CryptoJS from 'crypto-js';

// from view-source:https://www.datasport.com/live/search/

var key = CryptoJS.enc.Base64.parse('UHZ7Ivre3VQZz6OcueH7uw==');
var iv = CryptoJS.enc.Base64.parse('ZPIU5yq6wJzBQXLDlH02/g==');

export function encrypt(payload: string): string {
    console.time('encrypt')
    var encrypted = CryptoJS.AES.encrypt(payload, key, { iv: iv });
    var result = encrypted.toString();
    console.timeEnd('encrypt')
    return result;
}

export function decrypt(payload: string): string {
    console.time('decrypt')
    var decrypted = CryptoJS.AES.decrypt(payload, key, { iv: iv });
    var result = decrypted.toString(CryptoJS.enc.Utf8);
    console.timeEnd('decrypt')
    return result;
}