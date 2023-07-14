export default function Filter({ data, filterValue, setFilterValue, setCountriesNew, countriesNew }) {

    const removeElement = (indexToRemove) => {
        setCountriesNew((prevArray) => {
            const newArray = [...prevArray];
            newArray.splice(indexToRemove, 1);
            return newArray;
        });
    };


    const handleChange = (e) => {
        const { name, value } = e.target
        setFilterValue(prevValue => ({
            ...prevValue,
            [name]: value
        }))
    }

    const handleCountries = (e) => {
        if (!countriesNew.includes(e.target.value)) {
            setCountriesNew(prevValue => ([
                ...prevValue,
                e.target.value
            ]))
        } else {
            removeElement(countriesNew.indexOf(e.target.value))
        }
    }

    const uniqueCountries = data.reduce((countries, item) => {
        if (!countries.includes(item.Country)) {
            countries.push(item.Country);
        }
        return countries;
    }, []);

    const uniqueSectors = data.reduce((sectors, item) => {
        if (!sectors.includes(item.Sector)) {
            sectors.push(item.Sector);
        }
        return sectors;
    }, []);

    const uniqueSubsectors = data.filter(function (d) { return d.Sector == filterValue.Sector })
        .reduce((subsectors, item) => {
            if (!subsectors.includes(item.Subsector)) {
                subsectors.push(item.Subsector);
            }
            return subsectors;
        }, []);

    const uniqueIndicators = data.filter(function (d) { return d.Subsector == filterValue.Subsector })
        .reduce((indicators, item) => {
            if (!indicators.includes(item.Indicator)) {
                indicators.push(item.Indicator);
            }
            return indicators;
        }, []);

    const uniqueStartYears = data.reduce((startYears, item) => {
        if (!startYears.includes(item.Year)) {
            startYears.push(item.Year);
        }
        return startYears;
    }, []);

    const uniqueEndYears = uniqueStartYears.slice(uniqueStartYears.indexOf(filterValue.StartYear) + 1)

    return (
        <div className="flex h-[58vh] w-full gap-10 mx-20">
            <div className="bg-blue-50 rounded-xl p-6">
                <p className="text-cyan-900 font-bold mb-2 border-b-4 border-cyan-900 pb-2">Country</p>
                <div className="h-80 w-60 overflow-y-scroll">
                    {uniqueCountries.map(c => (
                        <div key={c} className="cursor-pointer">
                            <input
                                type="checkbox"
                                id={c}
                                name={c}
                                value={c}
                                onChange={handleCountries}
                                className="cursor-pointer"
                            />
                            <label className="cursor-pointer" htmlFor={c}>{c}</label>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full bg-blue-50 rounded-xl p-6 grid grid-cols-2 grid-rows-3 gap-4">
                <div className="w">
                    <p className="font-bold mb-2 border-b-4 border-cyan-900 text-cyan-900 pb-2">Sector</p>
                    <select defaultValue="default" disabled={!countriesNew.length} className="cursor-pointer w-full p-2" onChange={handleChange} name="Sector" id="Sector">
                        <option disabled value="default">Multiple Values</option> :
                        {uniqueSectors.map(sector => <option key={sector} value={sector}>{sector}</option>)}
                    </select>
                </div>
                <div className="w">
                    <p className="font-bold mb-2 border-b-4 border-cyan-900 text-cyan-900 pb-2">Subsector</p>
                    <select defaultValue="default" disabled={!filterValue.Sector} className="cursor-pointer w-full p-2" onChange={handleChange} name="Subsector" id="Subsector">
                        <option disabled value="default">Multiple Values</option> :
                        {uniqueSubsectors.map(subsector => <option key={subsector} value={subsector}>{subsector}</option>)}
                    </select>
                </div>
                <div className="col-span-2">
                    <p className="font-bold mb-2 border-b-4 border-cyan-900 text-cyan-900 pb-2">Indicator</p>
                    <select defaultValue="default" disabled={!filterValue.Subsector} className="cursor-pointer w-full p-2" onChange={handleChange} name="Indicator" id="Indicator">
                        <option disabled value="default">Multiple Values</option> :
                        {uniqueIndicators.map(indicator => <option className="w-full" key={indicator} value={indicator}>{indicator}</option>)}
                    </select>
                </div>
                <div className="">
                    <p className="font-bold mb-2 border-b-4 border-cyan-900 text-cyan-900 pb-2">Start Year</p>
                    <select defaultValue="default" disabled={!filterValue.Indicator} className="cursor-pointer w-full p-2" onChange={handleChange} name="StartYear" id="StartYear">
                        <option disabled value="default">Multiple Values</option> :
                        {uniqueStartYears.map(year => <option className="w-100" key={year} value={year}>{year}</option>)}
                    </select>
                </div>
                <div className="">
                    <p className="font-bold mb-2 border-b-4 border-cyan-900 text-cyan-900 pb-2">End Year</p>
                    <select defaultValue="default" disabled={!filterValue.StartYear} className="w-full cursor-pointer p-2 rounded shadow" onChange={handleChange} name="EndYear" id="EndYear">
                        <option disabled value="default">Multiple Values</option> :
                        {uniqueEndYears.map(year => <option className="w-100" key={year} value={year}>{year}</option>)}
                    </select>
                </div>
            </div>
        </div>
    )
}
