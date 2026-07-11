import getCase from '@salesforce/apex/democlassforlwc.getCaseRecords';
import { LightningElement, wire } from 'lwc';
export default class CallingApexMethodUsingWire extends LightningElement {

    caseRecords;

    @wire(getCase) cases({error,data}){
        if(data){
            this.caseRecords = data;
            console.log('data',data);
        }
        if(error){
            console.log('error',error);
        }}
}