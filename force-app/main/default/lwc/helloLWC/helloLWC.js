import { LightningElement } from 'lwc';

export default class HelloLWC extends LightningElement {

    connectedCallback(){
        console.log('hello Wrold')
    }
    greeting = 'World';
    changeHandler(event) {
      this.greeting = event.target.value;
    }
}