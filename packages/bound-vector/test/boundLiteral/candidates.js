import { SimpleVectorCollection } from '@foba/foo'
import { indexed }                from '@vect/object-mapper'

export const VectorCollection = {}

for (let [k, body] of indexed(SimpleVectorCollection)) {
  if (Array.isArray(body)) {
    VectorCollection[k] = body
  } else {
    VectorCollection[k] = Object.values(body)
  }
}
VectorCollection.combined = ['foo', 'bar', 'zen', '-127', 0, 127]
VectorCollection.countries = ['GBR', 'KOR', 'JPN', 'IND', 'DEU', 'CHN', 'USA']
VectorCollection.cities = ['Erbil', 'Abuja', 'Cochin', 'Stockton,Ranchi', 'Kathmandu', 'Madras', 'Ndjamena']

VectorCollection |> console.log

