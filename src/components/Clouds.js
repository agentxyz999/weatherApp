import React from "react";
import { WiRain, WiThunderstorm, WiCloudy } from 'react-icons/wi';
import { BsCloudHaze, BsCloudDrizzle, BsSnow } from 'react-icons/bs';
import { IoMdSunny } from 'react-icons/io';

function Clouds({ cloud }){
    let icon;
    switch (cloud) {
        case 'Clouds':
          icon = <WiCloudy style={{width: '400px', height: '400px', color: '#FFD99B'}} />;
          break;
        case 'Haze':
          icon = <BsCloudHaze style={{width: '400px', height: '400px', color: '#796D8E'}}/>;
          break;
        case 'Rain':
          icon = <WiRain style={{width: '400px', height: '400px', color: '#6B7399'}}/>;
          break;
        case 'Clear':
          // "Clear"
          icon = <IoMdSunny style={{width: '400px', height: '400px', color: '#F4C673'}}/>;
          break;
        case 'Drizzle':
          icon = <BsCloudDrizzle style={{width: '400px', height: '400px', color: '#98A695'}}/>;
          break;
        case 'Snow':
          icon = <BsSnow style={{width: '400px', height: '400px', color: '#3CC5C9'}}/>;
          break;
        case 'Thunderstorm':
          icon = <WiThunderstorm style={{width: '400px', height: '400px', color: '#6D2B43'}}/>;
          break;

        default: icon = <WiRain style={{width: '400px', height: '400px', color: '#6B7399'}}/>
      }

    return(
        <div> {icon} </div>
    );
}
export default Clouds;