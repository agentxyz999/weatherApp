import React, { useState, useEffect } from 'react';
import '../assets/weather.css';
import Axios from 'axios';
import moment from 'moment';
import Clouds from '../components/Clouds';
import {WiHumidity, WiStrongWind} from 'react-icons/wi';
import {BsThermometerHalf} from 'react-icons/bs';
import {MdOutlineVisibility} from 'react-icons/md';
import {VscLocation} from 'react-icons/vsc';
import {MdCalendarToday} from 'react-icons/md';

const Forecast = () => {
    const [city, setCity] = useState('Manila');
    const [userCity, setUserCity] = useState('');
    const [data, setData] = useState({});

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=96c1263a1cddce26bf0772ba670dac50&units=metric`;

    const searchCity = (e) => {
        if (e.key === 'Enter') {
            setCity(userCity);
            setUserCity('');
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
        Axios.get(url)
        .then((res) => {
            setData(res.data);
        })
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
                    value={ userCity }
                    onChange={ e => setUserCity(e.target.value) }
                    onKeyPress={ searchCity }
                />
            </div>

            {/* main body  */}
            <main className='main-content'>
                <div className='side-info'>
                    { data ? 
                        <p id='city'>
                            <VscLocation className='info-icons'/> 
                            {data.name}
                            {data.sys ? <span>, {data.sys.country}</span> : null} 
                        </p> : null 
                    }
                    { data ? <p id='date'><MdCalendarToday className='info-icons'/> {moment.unix(data.dt).format("MMM Do ddd HH:mm:ss")} </p> : null }
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
                {/* Cloud Ico/image */}
                <div className='cloud-container'>
                    <Clouds cloud = {data.weather? data.weather[0].main : null}/>
                </div>
            </main>
            {/* Sunrise and Sunset */}
            <div className='sunrise-sunset'>
                <p className='sunrise'>Sunrise : {data.sys ? <span>{moment.unix(data.sys.sunrise).format("hh:mm")} AM</span> : null}</p>
                <p className='sunset'>Sunset : {data.sys ? <span>{moment.unix(data.sys.sunset).format("hh:mm")} PM</span> : null}</p>
            </div>
            <div className='cloud-description'>
                    {data.weather? <p>{data.weather[0].description}</p> : null }
            </div>

            {/* bottom part */}

            <div className='extra'>
                <div className='extra-info humidity'>
                    {data.main ? <p><WiHumidity className='info-icons'/> {data.main.humidity}%</p> : null}
                    <h3>Humidity</h3>
                </div>
                <div className='extra-info visibility'>
                    {data ? <p><MdOutlineVisibility className='info-icons'/> {data.visibility / 1000} km</p> : null}
                    <h3>Visibility</h3>
                </div>
                <div className='extra-info air-pressure'>
                    {data.main ? <p><BsThermometerHalf className='info-icons'/> {data.main.pressure} hPa</p> : null}
                    <h3>Air pressure</h3>
                </div>
                <div className='extra-info wind'>
                    {data.wind ? <p><WiStrongWind className='info-icons'/> {data.wind.speed} kph</p> : null}
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