import { LightningElement } from 'lwc'

export default class CitySelect extends LightningElement {
    showDropdown = false
    cities = []
    filterBy = ''
    debounceTimer

    endpoint = 'https://weatherapi-com.p.rapidapi.com/search.json?q='
    options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd3ae5e4a8bmshab21846407cdbbdp1fc038jsnd3418800eeb8',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    }

    handleInput(event) {
        this.filterBy = event.target.value

        // when deleting text
        if (this.filterBy === '') {
            clearTimeout(this.debounceTimer)
            this.showDropdown = false
            return
        }
        // handling API calls using debounce
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

    getCities() {
        fetch(this.endpoint + this.filterBy, this.options)
            .then(res => res.json())
            .then(res => {
                this.showDropdown = true
                this.cities = res
            })
            .catch(err => console.log(err))
    }

    selectCity(event) {
        // finding the city by comparing id
        const cityId = event.currentTarget.dataset.id
        const selectedCity = this.cities.find(city => +city.id === +cityId)
        // updating the input text
        this.filterBy = selectedCity.name
        // emitting city to parent cmp
        this.dispatchEvent(new CustomEvent('coord', { detail: selectedCity }))
        this.showDropdown = false;
    }
}