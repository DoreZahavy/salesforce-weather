import { LightningElement, api, track } from 'lwc';
export default class RealtimeWeather extends LightningElement {

    weather = null

    endpoint = 'https://weatherapi-com.p.rapidapi.com/current.json?q='
    options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd3ae5e4a8bmshab21846407cdbbdp1fc038jsnd3418800eeb8',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    }

    // calling API and organizing the response
    @api
    getWeather(city) {
        fetch(this.endpoint + city.lat + ',' + city.lon, this.options)
            .then(res => res.json())
            .then(res => {
                this.weather = {
                    temp: res.current.temp_c,
                    condition: res.current.condition.text,
                    icon: res.current.condition.icon,
                    winddir: res.current.wind_dir,
                    windkph: res.current.wind_kph,
                    humidity: res.current.humidity,
                    name: res.location.name
                }
            })
            .catch(console.log)
    }
}