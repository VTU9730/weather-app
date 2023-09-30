import { useRef, useState } from "react";
function Weather(){
    const countryRef=useRef("")
    const [weatherData,setWeatherData]=useState()
    const [forecastData,setForecastData]=useState()
    const [isCelcius,setIsCelcius]=useState(false)
    // to retrive weather datafrom api using fetch method and stored in weatherData state variable
    function hanleWeatherData(){
        fetch(`http://api.weatherapi.com/v1/current.json?key=e36936ef0e1844fcba271008230407&q=${countryRef.current.value}`)
            .then(res=>res.json())
            .then(data=>setWeatherData(data))
        // setForecastData()
    }
    // to retrive forecast datafrom api using fetch method and stored in forecastData state variable
    function handleForecast(){ 
        fetch(`http://api.weatherapi.com/v1/forecast.json?key=e36936ef0e1844fcba271008230407&q=${countryRef.current.value}&days=8&aqi=no&alerts=no`)
            .then(res=>res.json())
            .then(data=>setForecastData(data?.forecast?.forecastday))
        // setWeatherData()
    }
    return(
        <div className="container-fluid" id="main">
            <div className="row">
                <div className="col">
                    <input ref={countryRef} type="text" placeholder="Enter country name"></input>
                    <button onClick={()=>hanleWeatherData()} className="btn btn-primary">Fetch Data</button>
                    <button onClick={()=>handleForecast()} className="btn btn-secondary">Forecast</button>
                </div>
            </div>
            <div className="row">
                <div className="col col-12 col-sm-6 col-md-4 col-md-3">   
                    {
                        weatherData?
                            <div id="weather-data">
                                <h4>Weather of {weatherData?.location?.name}</h4>
                                <div className="weather-condition">
                                    <img src={weatherData?.current?.condition?.icon} alt="weather-icon" width="30px" height="30px" />
                                    <p>  {weatherData?.current?.condition?.text}</p>
                                </div>
                                <div className="weather-condition">
                                    {isCelcius?<p>{weatherData?.current?.feelslike_c} C</p>:<p>{weatherData?.current?.feelslike_f} F</p>}
                                    <button onClick={()=>setIsCelcius(!isCelcius)} type="submit" className="btn btn-dark">Toggle</button>
                                </div>
                            </div>:null
                    }
                </div>
                <div className="col col-12 col-sm-6 col-md-4 col-md-3">
                    {forecastData?<h4>Forecast of {countryRef.current.value}</h4>:null}
                    {
                        forecastData?forecastData.map(day=>
                            <div key={day.date} id="forecast-data">
                                <p>Date: {day?.date}</p>
                                <ul>
                                    <li>Sunrise: {day?.astro?.sunrise}</li>
                                    <li>Sunset: {day?.astro?.sunset}</li>
                                    <li>Max Temparature: {day?.day?.maxtemp_c} C</li>
                                    <li>Max Wind{day?.day?.maxwind_kph} KPH</li>
                                    <li>Max Temparature: {day?.day?.daily_chance_of_rain} %</li>
                                    <li>Max Temparature: {day?.day?.daily_chance_of_snow} %</li>
                                </ul>
                            </div>
                        ):null
                    }
                </div>
            </div>
           
        </div>
    )
}
export default Weather;