import React, { useState, useEffect } from 'react';
import '../assets/weather.css';
import Axios from 'axios';
import moment from 'moment';
import Clouds from '../components/Clouds';

const Forecast = () => {
    const [city, setCity] = useState('');
    const [data, setData] = useState({});

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=96c1263a1cddce26bf0772ba670dac50&units=metric`;

    const searchCity = (e) => {
        if (e.key === 'Enter') {
            // call the API
            Axios.get(url)
            .then((res) => {
                setData(res.data);
            })
            // then set the input field to blank
            setCity('');
        }
    }

    //get data from localStorage
    useEffect(() => {
        const dataJSON = JSON.parse(localStorage.getItem("data"));
        if (dataJSON) {
            setData(dataJSON);
        }
    }, []);

    //store API to local storage(temporarily)
    useEffect(() => {
        localStorage.setItem("data", JSON.stringify(data));
    }, [data]);

    return (
        <>
            {/* Search city/location */}
            <div className='search'>
                <input
                    type="text"
                    name="search"
                    placeholder="Try Taipei or Tokyo..."
                    value={ city }
                    onChange={ e => setCity(e.target.value) }
                    onKeyPress={ searchCity }
                />
            </div>

            {/* main body  */}
            <main className='main-content'>
                <div className='side-info'>
                    { data ? 
                        <p>{data.name}
                            {data.sys ? <span>, {data.sys.country}</span> : null} 
                        </p> : null 
                    }
                    { data ? <p className='date'> {moment.unix(data.dt).format("MMM Do ddd")} </p> : null }
                </div>
                <div className='main-info'>
                    { data.main ? <h1 id='temperature'>{ data.main.temp.toFixed() }<span>°C</span></h1> : null }
                    { data.main ?
                        <p className='hi-low'>
                            Hi: {data.main.temp_max.toFixed()} / Low: {data.main.temp_min.toFixed()}
                        </p>
                        : null 
                    }  
                </div>
                <div>
                    <Clouds id='cloud' cloud = {data.weather? data.weather[0].main : null}/>
                </div>
            </main>

            {/* bottom part */}

            <div className='extra'>
                <div className='extra-info humidity'>
                    {data.main ? <p>{data.main.humidity}%</p> : null}
                    <h3>Humidity</h3>
                </div>
                <div className='extra-info visibility'>
                    {data ? <p>{data.visibility / 1000} km</p> : null}
                    <h3>Visibility</h3>
                </div>
                <div className='extra-info air-pressure'>
                    {data.main ? <p>{data.main.pressure} hPa</p> : null}
                    <h3>Air pressure</h3>
                </div>
                <div className='extra-info wind'>
                    {data.wind ? <p>{data.wind.speed} kph</p> : null}
                    <h3>Wind</h3>
                </div>
            </div>
        </>
    );
}
export default Forecast;