import React, { useEffect, useState } from 'react'
import { TfiStatsUp, TfiStatsDown, TfiArrowRight } from 'react-icons/tfi'
import { MdDisabledByDefault } from 'react-icons/md'
import MissingFlag from '../assets/missing_flag.png'
import { Slide } from 'react-awesome-reveal'

export default function CountryComponent({ c, data, filterValue }) {

    const [flag, setFlag] = useState([])

    const end = data.filter(function (d) { return (d.Country == c && d.Sector == filterValue.Sector && d.Subsector == filterValue.Subsector && d.Indicator == filterValue.Indicator && d.Year == filterValue.EndYear) })[0]
    const start = data.filter(function (d) { return (d.Country == c && d.Sector == filterValue.Sector && d.Subsector == filterValue.Subsector && d.Indicator == filterValue.Indicator && d.Year == filterValue.StartYear) })[0]
    const progress = (start && end) && (Number(end.Rank) - Number(start.Rank)).toFixed(0)
    const progressIcon = progress == 0 ? <TfiArrowRight /> : progress > 0 ? <TfiStatsUp /> : <TfiStatsDown />

    useEffect(() => {
        fetch(`https://restcountries.com/v3.1/name/${c}`)
            .then((response) => response.json())
            .then((res) => {
                setFlag(res[0].flags.png);
            })
            .catch((err) => {
                setFlag(MissingFlag);
            });
    }, []);

    const notFoundStatus = (!end && !start) ? "No data for both years" : !end ? "No data for last year" : !start ? "No data for first year" : ""

    return (
        <Slide triggerOnce={true} direction='down'>
            <div className="flex text-stone-700 items-center justify-between">
                <div className="font-bold flex gap-2">
                    <img className='w-8' src={flag} alt={c + '_flag'} />
                    <p>{c}</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className='text-sm text-stone-400'>{notFoundStatus}</span>
                    <p>{progress || <MdDisabledByDefault className='text-cyan-900 text-2xl' />}</p>
                    {progress &&
                        <div className={`text-white p-2 rounded ${progress == 0 ? 'bg-blue-500' : progress < 0 ? 'bg-red-500' : 'bg-green-500'}`}>
                            {progressIcon}
                        </div>}
                </div>
            </div>
        </Slide>

    )
}
