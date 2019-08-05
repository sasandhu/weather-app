import React, { Component } from 'react';
import NavBar from './NavBar/NavBar';
import WeatherForecast from './WeatherForecast/WeatherForecast';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <WeatherForecast />
      </div>
    );
  }
}

export default App;
