import { LightningElement } from 'lwc';

export default class LifeCycleHookCheck extends LightningElement {
    constructor(){
        super();
        console.log('parent constructor');
    }
    connectedCallback(){
        console.log('parent connectedCallback');
    }
    renderedCallback(){
        console.log('parent renderedCallback');
    }
    disconnectedCallback(){
        console.log('parent disconnectedCallback');
    }
    errorCallback(){
        console.log('parent errorCallback');
    }
}