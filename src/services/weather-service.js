import Axios from 'axios';

export const getWeather = (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=574975b50533de1753dee238137d2945&units=metric`;
    return Axios.get(url);
}