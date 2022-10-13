import React from "react";
import { WiRain, WiThunderstorm, WiCloudy } from 'react-icons/wi';
import { BsCloudHaze, BsCloudDrizzle, BsSnow } from 'react-icons/bs';
import { IoMdSunny } from 'react-icons/io';

function Clouds({ cloud }){
    let icon;
    switch (cloud) {
        case 'Clouds':
          icon = <WiCloudy style={{width: '200px', height: '200px', color: '#eee'}} />;
          break;
        case 'Haze':
          icon = <BsCloudHaze style={{width: '200px', height: '200px', color: '#eee'}}/>;
          break;
        case 'Rain':
          icon = <WiRain style={{width: '200px', height: '200px', color: '#eee'}}/>;
          break;
        case 'Clear':
          icon = <IoMdSunny style={{width: '200px', height: '200px', color: '#eee'}}/>;
          break;
        case 'Drizzle':
          icon = <BsCloudDrizzle style={{width: '200px', height: '200px', color: '#eee'}}/>;
          break;
        case 'Snow':
          icon = <BsSnow style={{width: '200px', height: '200px', color: '#eee'}}/>;
          break;
        case 'Thunderstorm':
          icon = <WiThunderstorm style={{width: '200px', height: '200px', color: '#eee'}}/>;
          break;

        default: icon = <WiRain style={{width: '200px', height: '200px', color: '#eee'}}/>
      }

    return(
        <div> {icon} </div>
    );
}
export default Clouds;