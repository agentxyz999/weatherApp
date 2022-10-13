import React, { useState, useEffect } from 'react';
import '../assets/weather.css';
import Axios from 'axios';
import moment from 'moment';
import Clouds from '../components/Clouds';
import {WiHumidity, WiStrongWind} from 'react-icons/wi';
import {MdOutlineVisibility} from 'react-icons/md';
import {BsThermometerHalf} from 'react-icons/bs';
import {VscLocation} from 'react-icons/vsc';
import {MdCalendarToday} from 'react-icons/md';


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
                        <p id='city'><VscLocation/> {data.name}
                            {data.sys ? <span>, {data.sys.country}</span> : null} 
                        </p> : null 
                    }
                    { data ? <p className='date'><MdCalendarToday /> {moment.unix(data.dt).format("MMM Do ddd")} </p> : null }
                </div>
                <div className='main-info'>
                    { data.main ? <h1 id='temperature'>{ data.main.temp.toFixed() }<span>°C</span></h1> : null }
                    { data.main ?
                        <p>
                            Hi: {data.main.temp_max.toFixed(1)} °C / Low: {data.main.temp_min.toFixed(1)} °C
                        </p>
                        : null 
                    }  
                </div>
                <div className='cloud-container'>
                    <Clouds cloud = {data.weather? data.weather[0].main : null}/>
                </div>
            </main>
            
            <div className='cloud-description'>
                    {data.weather? <p>{data.weather[0].description}</p> : null }
            </div>

            {/* bottom part */}

            <div className='extra'>
                <div className='extra-info humidity'>
                    {data.main ? <p><WiHumidity/> {data.main.humidity}%</p> : null}
                    <h3>Humidity</h3>
                </div>
                <div className='extra-info visibility'>
                    {data ? <p><MdOutlineVisibility/> {data.visibility / 1000} km</p> : null}
                    <h3>Visibility</h3>
                </div>
                <div className='extra-info air-pressure'>
                    {data.main ? <p><BsThermometerHalf/> {data.main.pressure} hPa</p> : null}
                    <h3>Air pressure</h3>
                </div>
                <div className='extra-info wind'>
                    {data.wind ? <p><WiStrongWind/> {data.wind.speed} kph</p> : null}
                    <h3>Wind</h3>
                </div>
            </div>
            <footer>
                <h5>Data provided by: <a href='https://www.openweathermap.org'>openweathermap.org</a></h5>
            </footer>
        </>
    );
}
export default Forecast;