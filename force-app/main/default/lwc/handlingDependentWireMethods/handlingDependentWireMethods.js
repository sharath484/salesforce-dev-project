import getMyContacts from '@salesforce/apex/democlassforlwc.getMyContacts';
import BillingCity from '@salesforce/schema/Account.BillingCity';
import BillingState from '@salesforce/schema/Account.BillingState';
import Name from '@salesforce/schema/Account.Name';
import Phone from '@salesforce/schema/Account.Phone';
import { getRecord } from 'lightning/uiRecordApi';
 const accFields=[Name,Phone,BillingCity,BillingState];

import { LightningElement, api, wire } from 'lwc';

export default class HandlingDependentWireMethods extends LightningElement {
    @api recordId;
    accountData;
    contactsData;
    accName;
    

      

    @wire(getRecord, { recordId: '$recordId', fields : accFields }) acct({data,error}){
        if(data){
            console.log('data is '+data);
            this.accName = data.fields.Name.value;
            this.accountData = data;

        }
        if(error){
            console.log('error is '+error);
        }

    }


    @wire(getMyContacts,{accName : '$accName'}) contacts({data,error}){
            if(data){
                console.log('data is '+data);
                this.contactsData = data;
            }
            if(error){
                console.log('error is '+error);
            }
}
    
    
}