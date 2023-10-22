import { LightningElement } from 'lwc';

export default class WeatherApp extends LightningElement {
    location =''

    handleCoordUpdate(event) {
  
        console.log('coord in weatherApp',event.detail)
        this.location = event.detail.name
        this.template.querySelector('c-realtime-weather').getWeather(event.detail);
    }

    getLocalWeather(){
      if (!navigator.geolocation) console.log('HTML5 Geolocation is not supported in your browser')
   
      // else navigator.geolocation.getCurrentPosition(this.getLocalWeather, this.handleLocationError)
      else navigator.geolocation.getCurrentPosition((position=>{
        console.log('inside getLocalWeather');
        const { latitude: lat, longitude: lon } = position.coords
        this.location = 'your location'
        this.template.querySelector('c-realtime-weather').getWeather({lat,lon})
        }), (err)=>console.log('unable to retrieve your location', err))
      }

 

      
}