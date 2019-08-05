import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';

class WeatherForecast extends Component {
  constructor(props) {
    super(props);
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);

    this.state = {
      forecast: null,
      searchText: 'vancouver'
    };
  }

  handleSearchTextChange(e){
    this.setState({
      searchText: e.target.value
    })
  }

  handleSearchClick(e){
    this.getForecast();
  }

  async componentDidMount() {
    this.getForecast();
  }

  getForecast(){
    let url = `http://api.openweathermap.org/data/2.5/forecast?q=${this.state.searchText}&APPID=f97f67c39eae92e85f1adbe526ab968e&units=metric`;
    axios
      .get(url)
      .then(response => {
        this.setState({
          forecast : this.formatData(response.data)
        })
      })
      .catch(error => {
        console.log(error);
      });
  }

  formatData(response){
    let result = {},
        list = response.list,
        formattedList = [],
        listItem,
        dateTime;

    list.forEach(function(item){
      listItem = {};
      dateTime = moment(item.dt_txt);
      listItem.day = dateTime.format('ddd, DD MMM');
      listItem.time = dateTime.format('HH:mm');
      listItem.dt = item.dt;
      listItem.temp = item.main.temp;
      listItem.maxTemp = item.main.temp_max;
      listItem.minTemp = item.main.temp_min;
      listItem.pressure = item.main.pressure;
      listItem.humidity = item.main.humidity;
      listItem.weatherId = item.weather[0].id;
      listItem.weatherDescription = item.weather[0].description;
      listItem.weatherIcon = `http://openweathermap.org/img/w/${item.weather[0].icon}.png`;
      listItem.clouds = item.clouds.all;
      listItem.windSpeed = item.wind.speed;

      formattedList.push(listItem);
    });

    result.city = response.city.name;
    result.country = response.city.country;
    result.list = formattedList;

    return result;

  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {this.state.forecast === null && <p>Loading weather data...</p>}
          {
            this.state.forecast &&
            <div className="container">
              <div className="row">
                <div className="col col-6"></div>
                <div className="col col-6">
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Enter valid city ex:London/Paris" onChange={this.handleSearchTextChange}/>
                    <div className="input-group-append">
                      <button className="btn btn-md btn-dark m-0 px-3 py-2 z-depth-0 waves-effect" type="button" onClick={this.handleSearchClick}>Search</button>
                    </div>
                 </div>
               </div>
              </div>
              <div className="row">
                <div className="col col-12 mb-2">
                    <h5 className="justify-content-center"> 5 day forecast for { this.state.forecast.city}, {this.state.forecast.country} </h5>
                </div>
              </div>
              <div className="row mr-0">
                <div className="col col-12">
                  <div className="table-responsive">
                    <table className="table table-dark table-bordered table-striped ">
                      <thead>
                        <tr>
                          <th scope="col" className="align-middle text-center">DateTime</th>
                          <th scope="col" className="align-middle text-center">Weather</th>
                          <th scope="col" className="align-middle text-center">Max Temp </th>
                          <th scope="col" className="align-middle text-center">Min Temp </th>
                          <th scope="col" className="align-middle text-center">Clouds (%)</th>
                          <th scope="col" className="align-middle text-center">Humidity (%)</th>
                          <th scope="col" className="align-middle text-center">Wind Speed (m/s) </th>
                        </tr>
                      </thead>
                      <tbody>
                      {
                        this.state.forecast.list.map(item => (
                          <tr key={item.dt}>
                            <td className="align-middle text-center">{ item.day } { item.time }</td>
                            <td className="align-middle text-center"><img src={item.weatherIcon} className="weather-icon" alt="Weather icon" />{ item.temp } &#8451; , {item.weatherDescription} </td>
                            <td className="align-middle text-center">{ item.maxTemp } &#8451;</td>
                            <td className="align-middle text-center">{ item.minTemp } &#8451;</td>
                            <td className="align-middle text-center">{ item.clouds }</td>
                            <td className="align-middle text-center">{ item.humidity }</td>
                            <td className="align-middle text-center">{ item.windSpeed }</td>
                          </tr>
                        ))
                      }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            }
        </div>
      </div>
    )
  }
}

export default WeatherForecast;
