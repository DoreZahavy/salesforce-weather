import { LightningElement , api, track } from 'lwc';

export default class RealtimeWeather extends LightningElement {

    weather = null;

    // @api
    // updateWeather(weather) {
    //   this.weather = weather;
    // }

    endpoint = 'https://weatherapi-com.p.rapidapi.com/current.json?q='
    options = {
        method: 'GET',
        // params: {q: '<REQUIRED>'},
        headers: {
          'X-RapidAPI-Key': 'd3ae5e4a8bmshab21846407cdbbdp1fc038jsnd3418800eeb8',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
      }

    connectedCallback(){
        console.log('hello weather');
        // this.getWeather()
    }

    @api
    getWeather(city){
        fetch(this.endpoint + city.lat + ',' + city.lon , this.options)
            .then(res => res.json())
            .then(res =>{ 
                this.weather = {
                    temp: res.current.temp_c,
                    condition: res.current.condition.text,
                    icon: res.current.condition.icon,
                    winddir:res.current.wind_dir,
                    windkph:res.current.wind_kph,
                    humidity: res.current.humidity,
                    name: res.location.name
                }
                // this.weather = res
                console.log('weather res',res)
            })
            .catch(err=>console.log(err))
    }

    

}