import Filter from "./components/Filter"
import { useEffect, useState } from 'react'
import * as d3 from "d3"
import Result from "./components/Result"

function App() {
  const [filterValue, setFilterValue] = useState({
    Sector: '',
    Subsector: '',
    Indicator: '',
    StartYear: '',
    EndYear: ''
  })
  const [data, setData] = useState([])

  const [results, setResults] = useState([])

  const [countriesNew, setCountriesNew] = useState([])


  useEffect(() => {
    d3.csv('/MergedDataset.csv').then((data) => {
      setData(data)
    })
  }, [])

  return (
    <div className="w-100 min-h-screen pb-10 h-full bg-cyan-900">
      <div className="w-100 h-100 flex flex-col text-center p-10">
        <h1 className=" font-bold text-4xl text-stone-50">Country Comparison</h1>
      </div>

      <div className="grid grid-cols-2 w-100">
        {data.length > 0 ?
          <Filter countriesNew={countriesNew} setCountriesNew={setCountriesNew} data={data} filterValue={filterValue} setFilterValue={setFilterValue} /> :
          <p className="text-xl text-white">Loading...</p>
        }
        {data.length > 0 ?
          <Result results={results} setResults={setResults} countriesNew={countriesNew} filterValue={filterValue} data={data} /> :
          <p className="text-xl text-white">Loading...</p>
        }
      </div>
    </div>
  )
}

export default App
