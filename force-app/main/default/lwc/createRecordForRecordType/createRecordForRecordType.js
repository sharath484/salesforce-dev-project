import CASE_OBJECT from '@salesforce/schema/Case';
import DESCRIPTION from '@salesforce/schema/Case.Description';
import PRIORITY from '@salesforce/schema/Case.Priority';
import RECORD_TYPE_ID from '@salesforce/schema/Case.RecordTypeId';
import STATUS from '@salesforce/schema/Case.Status';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { createRecord } from 'lightning/uiRecordApi';
import { LightningElement, wire } from 'lwc';

export default class CreateRecordForRecordType extends LightningElement {
    priority;
    description;
    status;
    recordTypeId;
    options=[
        {label:'High',value:'High'},
        {label:'Medium',value:'Medium'},
        {label:'Low',value:'Low'}];
  
        priorityOptions=[
            {label:'New',value:'New'},
            {label:'Working',value:'Working'},
            {label:'Closed',value:'Closed'}];


            @wire(getObjectInfo,{objectApiName: CASE_OBJECT })objInfo({data, error}){
                if(data){
                   console.log('data',data);
                   const recordDetails = data.recordTypeInfos;
                  Object.keys(recordDetails).forEach(key => {
                    const recordType = recordDetails[key];
                      if(recordType.name == 'Product Support'){
                        console.log('record type name',recordType.name)
                          this.recordTypeId = recordType.recordTypeId;
                          console.log('recordid found');
                      }
                      
                  })
                }
                if(error){
                    console.log('error',error);
                }
            }

    handlePriorityChange(event){
        this.priority = event.target.value;
    }
    handleDesChange(event){
        this.description = event.target.value;
    }
    handleStatusChange(event){
        this.status = event.target.value;
    }

    createCaseRecord(){
        console.log('create record called');
        const fields = {};
        fields[PRIORITY.fieldApiName] = this.priority;
        fields[DESCRIPTION.fieldApiName] = this.description;
        fields[STATUS.fieldApiName] = this.status;
        fields[RECORD_TYPE_ID.fieldApiName] = this.recordTypeId;
        const recordInput = {apiName: CASE_OBJECT.objectApiName ,fields};
        createRecord(recordInput)
        .then(caseRecord => {
            console.log('case record created'+caseRecord.id);
            alert('case record created'+caseRecord.id);

    })
            .catch(error => {

                console.log('error',error);
            })
  } 
}