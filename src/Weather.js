import react, { useState } from "react";
import "./Weather.css";
import axios from "axios";
import SearchEngine from "./SearchEngine";
import WeatherIcon from "./WeatherIcon";
import CurrentLocation from "./CurrentLocation";
import Api from "./Api";

export default function Weather() {
  state = {
    city: this.props.city,
  };

  refreshWeather();
  {
    let url = `${Api.url}/data/2.5/weather?appid=${Api.key}&units=metric&${params}`;
    axios.get(url).then((response) => {
      this.setState({
        city: response.data.name,
        weather: {
          description: response.data.weather[0].main,
          icon: response.data.weather[0].icon,
          precipitation: Math.round(response.data.main.humidity) + "%",
          temperature: Math.round(response.data.main.temp),
          time: Date(response.data.dt * 1000).dayTime(),
          wind: Math.round(response.data.wind.speed) + "km/h",
        },
      });
    });
  }

  refreshWeatherFromLatitudeAndLongitude = (latitude, longitude) => {
    this.refreshWeather(`lat=${latitude}&lon=${longitude}`);
  };

  refresh = (city) => {
    this.refreshWeather(`q=${city}`);
  };

  return (
    <div className="Weather">
      <form className="mb-3">
        <div className="row">
          <div className="col-9">
            <div className="WeatherSearch">
              <div className="clearfix">
                <SearchEngine refresh={this.refresh} />
                <CurrentLocation
                  refresh={this.refreshWeatherFromLatitudeAndLongitude}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="weather-summary">
        <div className="weather-summary-header">
          <h1>{this.state.city}</h1>
          <div className="weather-detail__text">{this.state.weather.time}</div>
          <div className="weather-detail__text">
            {this.state.weather.description}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="row">
          <div className="col-sm-6">
            <div className="clearfix">
              <div className="float-left weather-icon">
                <WeatherIcon iconName={this.state.weather.icon} />
              </div>
              <div className="weather-temp weather-temp--today">
                {this.state.weather.temperature}
              </div>
              <div className="weather-unit__text weather-unit__text--today">
                °C
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="weather-detail__text">
              Precipitation: {this.state.weather.precipitation}
            </div>
            <div className="weather-detail__text">
              Wind: {this.state.weather.wind}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
