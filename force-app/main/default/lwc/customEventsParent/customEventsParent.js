import { LightningElement } from 'lwc';

export default class CustomEventsParent extends LightningElement {

    myName;
    myAge;
    myAddress;

    handleEvent(event){
        this.myName = event.detail.name;
        this.myAge = event.detail.age;
        this.myAddress = event.detail.personalInfo.address;
    }
}