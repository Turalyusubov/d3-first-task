import CountryComponent from './CountryComponent'

export default function Result({ data, countriesNew, filterValue }) {

    return (
        <div className='mx-20 h-[58vh] overflow-y-scroll px-10 py-6 ml-40 bg-blue-50 rounded-xl'>
            <div className="flex flex-col gap-4">
                {countriesNew.map(c => <CountryComponent key={c} c={c} data={data} filterValue={filterValue} />)}
            </div>
        </div>

    )
}
