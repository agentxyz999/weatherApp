import React from "react";
import { WiRain } from 'react-icons/wi';

function Clouds({data}){
    const {weather} = data;
    weather.map((item)=>{
        console.log(item.id);
    })
    return(
        <WiRain style={{height: "200px", width: "200px", color: "#eee"}} />
    );
}
export default Clouds;