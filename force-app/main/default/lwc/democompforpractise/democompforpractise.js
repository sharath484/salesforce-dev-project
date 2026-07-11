import { LightningElement } from 'lwc';

export default class Democompforpractise extends LightningElement {
     name='';
     age = 25;

     handleChange(event) {
         this.name = event.target.value;
     }

     _totalAmount =50;

    get totalAmount() {
         return this._totalAmount;
     }

     set totalAmount(value) {
    
        if(value > 1000 )
         this._totalAmount = 5000;
      else{
         this._totalAmount = value ;
     }
    }

     amountChange(event) {
         this.totalAmount = event.target.value;
     }  
}