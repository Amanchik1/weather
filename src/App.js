import React, {useState} from 'react'
import './App.css';
import MyMapComponent from "./map";

const api = {
    key: "7bca518c197c874a5df2c04e109a5bff",
    base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});
    const [latLng, setLatLng] = useState(null)

    const onMap = (data) => {
        fetch(`${api.base}weather?lat=${data.lat}&lon=${data.lon}&APPID=${api.key}`)
            .then(res => res.json())
            .then(result => {
                setWeather(result)
                setLatLng(result.coord)
                setQuery(result.name);
            });
    }
    const search = evt => {
        if (evt.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&APPID=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);
                    setLatLng(result.coord)
                    // setQuery('');
                });
        }
    }

    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }

    return (
        <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
            <main>
                <div className="search-box">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search..."
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={search}
                    />
                </div>
                <div className={'content'}>
                    {(typeof weather.main != "undefined") ? (
                        <div className={'weatherWrapper'}>
                            <div className="location-box">
                                <div className="location">{weather.name}, {weather.sys.country}</div>
                                <div className="date">{dateBuilder(new Date())}</div>
                            </div>
                            <div className="weather-box">
                                <div className="temp">
                                    {Math.round(weather.main.temp)}°c
                                </div>
                                <div className="weather">{weather.weather[0].main}</div>
                            </div>
                        </div>
                    ) : <div />}
                    <div>
                        <MyMapComponent
                            isMarkerShown
                            latLng={latLng}
                            setLatLng={onMap}
                            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyC31ZdDwrrTeMu4oaL5m5q4m6gCqAGkIKM"
                            loadingElement={<div style={{height: `100%`}}/>}
                            containerElement={<div style={{height: `500px`, width: '500px'}}/>}
                            mapElement={<div style={{height: `100%`}}/>}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
