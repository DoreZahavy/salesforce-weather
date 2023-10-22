import { LightningElement , track} from 'lwc';

const filterBy = ''
const cities = []
// const cities = [
//     { id: '1', name: 'New York' },
//     { id: '2', name: 'San Francisco' },
//     { id: '3', name: 'Los Angeles' },
//     // Add more cities to the list
// ];

export default class CitySelect extends LightningElement {
    @track showDropdown = false;
    cities = [];
    filterBy = '';
    debounceTimer

    endpoint = 'https://weatherapi-com.p.rapidapi.com/search.json?q='
    options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'd3ae5e4a8bmshab21846407cdbbdp1fc038jsnd3418800eeb8',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
      }

    handleInput(event){
        console.log('event.target.value:', event.target.value)
        
        this.filterBy = event.target.value
        if (this.filterBy === '') {
            clearTimeout(this.debounceTimer)
            this.showDropdown = false
            return
        }


        this.debouncedGetCities()
        
    }

    debouncedGetCities() {
        this.debounce(() => {
            this.getCities()
        }, 300)
    }

    debounce(func, delay) {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(func, delay);
    }

    getCities(){
        fetch(this.endpoint + this.filterBy , this.options)
        .then(res => res.json())
        .then(res =>{ 
            this.showDropdown = true
            this.cities = res

        })
        .catch(err=>console.log(err))
    }

    selectCity(event) {
        const cityId = event.currentTarget.dataset.id
        const selectedCity = this.filteredCities.find(city => +city.id === +cityId)
        this.filterBy = selectedCity.name
        this.dispatchEvent(new CustomEvent('coord',{ detail: selectedCity }))
        this.showDropdown = false;
    }
}