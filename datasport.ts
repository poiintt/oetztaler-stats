import { enc, AES } from 'crypto-js'

// from view-source:https://www.datasport.com/live/search/
const key = enc.Base64.parse('UHZ7Ivre3VQZz6OcueH7uw==')
const iv = enc.Base64.parse('ZPIU5yq6wJzBQXLDlH02/g==')

export function encrypt(payload: string): string {
  const encrypted = AES.encrypt(payload, key, { iv })
  return encrypted.toString()
}

export function decrypt(payload: string): string {
  const decrypted = AES.decrypt(payload, key, { iv })
  return decrypted.toString(enc.Utf8)
}