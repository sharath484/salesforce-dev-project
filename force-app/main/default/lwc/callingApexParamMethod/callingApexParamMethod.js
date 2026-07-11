import getCases from '@salesforce/apex/democlassforlwc.getCases';
import { LightningElement, wire } from 'lwc';
export default class CallingApexParamMethod extends LightningElement {

    myCases;
 

    @wire(getCases,{mySubject:'demo'})myRecs({data,error}){
        if(data){
            this.myCases = data;
            console.log('data',data);
        }
        if(error){
            console.log('error',error);
        }
    }
  
}