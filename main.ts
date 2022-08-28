import { decrypt, encrypt } from './datasport'
import axios from 'axios'

const url = 'https://www.datasport.com'

async function search(raceNumber: string, startNumber: string) {
  try {
    const org = new URLSearchParams({
      bib: startNumber,
    }).toString()

    const encrypted = encrypt(org)
    const payload = encodeURIComponent(encrypted);
    const body = `payload=${payload}`

    const search = await axios.post(`${url}/live/ajax/search/?racenr=${raceNumber}`, body)

    const result = decrypt(search.data);
    const json = JSON.parse(result)
    return json;
  } catch (error) {
    console.error(error)
  }
}
async function start(raceNumber: string, startNumbers: string[]) {

  const promises = startNumbers.map<any>(startNumber => search(raceNumber, startNumber));
  console.time('requests /search')
  const allResults = await Promise.all(promises);
  console.timeEnd('requests /search')

  const table = allResults.map(r => {
    const innerHtml = /(?<=\<a.*?\>).*?(?=\<\/a\>)/
    const name = r.data[0].aCells[3].match(innerHtml)[0].trim()

    const data = r.marker?.map(m => ({ distance: parseFloat(m.meters.replace(`'`,'.')), speed: m.kmh, number: m.bib, time: m.time }))[0]
    return { name, ...data, update: r.update.replace('Aktualisiert: ', '') }
  }
  )
  table.sort((a,b) => b.distance - a.distance)
  console.table(table)
}

const raceNumber = process.argv[2]
const startNumbers = process.argv.slice(3)

start(raceNumber, startNumbers);