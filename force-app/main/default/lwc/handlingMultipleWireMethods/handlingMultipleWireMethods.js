import getCase from '@salesforce/apex/democlassforlwc.getCaseRecords';
import getAccounts from '@salesforce/apex/democlassforlwc.getMyAccounts';
import { LightningElement, wire } from 'lwc';

export default class HandlingMultipleWireMethods extends LightningElement {
    caseRecords;
    accountRecords;

    @wire(getCase) cases({error,data}){
        if(data){
            this.caseRecords = data;
            console.log('data',data);
        }
        if(error){
            console.log('error',error);
        }}


        @wire(getAccounts) accounts({error,data}){
            if(data){
                 this.accountRecords = data;
            }
            if(error){
                console.log('error',error);
            }
        }


}