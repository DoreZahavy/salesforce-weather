import { LightningElement } from 'lwc';
export default class WeatherApp extends LightningElement {

  handleCoordUpdate(event) {
    this.template.querySelector('c-realtime-weather').getWeather(event.detail);
  }

  // get current position and activate child component if successful.
  // success and failure callbacks 
  getLocalWeather() {
    if (!navigator.geolocation) alert('HTML5 Geolocation is not supported in your browser')
    else navigator.geolocation.getCurrentPosition((position => {
      const { latitude: lat, longitude: lon } = position.coords
      this.template.querySelector('c-realtime-weather').getWeather({ lat, lon })
    }), (err) => {
      alert('unable to retrieve your location')
      console.log('unable to retrieve your location', err)
    })
  }
}