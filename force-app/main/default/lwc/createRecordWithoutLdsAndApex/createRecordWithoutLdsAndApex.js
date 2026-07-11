import DESCRIPTION from '@salesforce/schema/Case.Description';
import PRIORITY from '@salesforce/schema/Case.Priority';
import STATUS from '@salesforce/schema/Case.Status';
import { createRecord } from 'lightning/uiRecordApi';
import { LightningElement } from 'lwc';

export default class CreateRecordWithoutLdsAndApex extends LightningElement {
    priority;
    description;
    status;
    options=[
        {label:'High',value:'High'},
        {label:'Medium',value:'Medium'},
        {label:'Low',value:'Low'}];
  
        priorityOptions=[
            {label:'New',value:'New'},
            {label:'Working',value:'Working'},
            {label:'Closed',value:'Closed'}];

    handlePriorityChange(event){
        this.priority = event.target.value;
    }
    handleDesChange(event){
        this.description = event.target.value;
    }
    handleStatusChange(event){
        this.status = event.target.value;
    }

    createRecord(){
        const fields = {};
        fields[PRIORITY.fieldApiName] = this.priority;
        fields[DESCRIPTION.fieldApiName] = this.description;
        fields[STATUS.fieldApiName] = this.status;
        const recordInput = {apiName:'Case',fields};
        createRecord(recordInput)
        .then(caseRecord => {
            alert('case record created'+caseRecord.id);

    })
            .catch(error => {
                console.log('error',error);
            })
  }
}