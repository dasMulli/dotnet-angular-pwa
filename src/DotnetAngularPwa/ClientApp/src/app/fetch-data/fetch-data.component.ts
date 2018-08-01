import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[];
  public currentWeather: Weather = null;
  public currentWeatherLoaded: boolean = false;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<WeatherForecast[]>(baseUrl + 'api/SampleData/WeatherForecasts').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
    http.get<Weather>(baseUrl + 'api/SampleData/CurrentWeather').subscribe(result => {
        console.log("got result", result);
        this.currentWeather = result;
        this.currentWeatherLoaded = true;
      },
      error => {
        this.currentWeather = null;
        this.currentWeatherLoaded = true;
      },
      () => {
      });
  }
}

interface Weather {
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

interface WeatherForecast extends Weather {
  dateFormatted: string;
}
