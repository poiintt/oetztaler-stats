import { decrypt, encrypt } from './datasport'
import axios from 'axios'
import type { SearchResult } from './types'

const baseURL = 'https://www.datasport.com'

/**
 * request the athlete data
 * @param raceNumber id of the race
 * @param startNumber athlete start number
 * @returns the search result
 */
async function search(raceNumber: string, startNumber: string): Promise<SearchResult> {
  const params = new URLSearchParams({
    bib: startNumber,
  }).toString()

  // datasport is weird
  // the parms need to be encrypted
  const encrypted = encrypt(params)

  const payload = encodeURIComponent(encrypted)
  const body = `payload=${payload}`
  
  const requestLog = `request for startNumber ${startNumber}`
  console.time(requestLog)
  const result = await axios.post<string>(`/live/ajax/search/?racenr=${raceNumber}`, body, { baseURL })
  console.timeEnd(requestLog)

  // the result is encrypted by the server and needs to be encrypted here
  const search = decrypt(result.data)

  const json = JSON.parse(search) as SearchResult
  return json
}

/**
 * process the search results
 * @param searchResults 
 * @returns table data
 */
function getTable(searchResults: SearchResult[]) {
  const getFloat = (value: string) => parseFloat(value.replace(`'`, '.'))
  const distanceFirstAthlete = getFloat(searchResults[0].marker[0].meters)

  const table = searchResults.map(r => {
    // get the athletes name
    const innerHtml = /(?<=\<a.*?\>).*?(?=\<\/a\>)/
    const name = r.data[0].aCells[3].toString().match(innerHtml)?.[0].trim()

    const update = r.update.replace('Aktualisiert: ', '')

    const data = r.marker?.map(m => {
      const distance = getFloat(m.meters)

      // calculate the differnce between the first given athlete and each other athlete
      const diff = parseFloat((distance - distanceFirstAthlete).toFixed(3))
      return {
        distance,
        diff,
        speed: m.kmh,
        number: m.bib,
        time: m.time
      }
    })[0]
    return { name, ...data, update }
  })

  // sort athletes desc by distance
  table.sort((a, b) => b.distance - a.distance)
  return table
}

/**
 * load all search results, process and display them
 */
async function start(raceNumber: string, startNumbers: string[]) {
  const promises = startNumbers.map(startNumber => search(raceNumber, startNumber))

  try {
    const searchResults = await Promise.all(promises)

    const table = getTable(searchResults)

    // output the table
    console.table(table)

    for (const starter of table) {
      console.log(`${starter.name}: ${starter.distance} km (${starter.diff} km) ${starter.speed} km/h`)
    }
  } catch (error) {
    console.error(error)
  }
}

const raceNumber = process.argv[2]
const startNumbers = process.argv.slice(3)

start(raceNumber, startNumbers)