import { enc, AES } from 'crypto-js'

// from view-source:https://www.datasport.com/live/search/
const key = enc.Base64.parse('UHZ7Ivre3VQZz6OcueH7uw==')
const iv = enc.Base64.parse('ZPIU5yq6wJzBQXLDlH02/g==')

export function encrypt(payload: string): string {
  console.time('encrypt')
  const encrypted = AES.encrypt(payload, key, { iv })
  const result = encrypted.toString()
  console.timeEnd('encrypt')
  return result
}

export function decrypt(payload: string): string {
  console.time('decrypt')
  const decrypted = AES.decrypt(payload, key, { iv })
  const result = decrypted.toString(enc.Utf8)
  console.timeEnd('decrypt')
  return result
}