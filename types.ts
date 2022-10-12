export interface SearchResult {
  dataCell: string[],
  eventstatus: 'live' | '',
  marker: [
    {
      posbez: 'Letzte Zeit',
      katrang: number,
      meters: string,
      color: string,
      kmh: number,
      bib: number,
      time: string,
      fore: string,
      lat: number,
      name: string,
      long: number
    }
  ] | [],
  dataCellS: [],
  track: number,
  dt: number,
  dtc: string,
  infotext: string,
  refnr: number,
  data: [
    {
      datatyp: string,
      color: string,
      class: string,
      aCells: (string | number)[]
    }
  ],
  paging: boolean,
  update: string,
  statusinfo: 1 | 0
}