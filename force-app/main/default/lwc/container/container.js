import { LightningElement, api } from 'lwc';

export default class Container extends LightningElement {
   @api name;

   myAge = 23;

   @api hasData = false;

   
   @api myInfo(){
      this.hasData = true;
   }
   
   

   

}