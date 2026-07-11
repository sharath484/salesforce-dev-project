import CASE_NUMBER from '@salesforce/schema/Case.CaseNumber';
import MY_PRIORITY from '@salesforce/schema/Case.Priority';
import MY_STATUS from '@salesforce/schema/Case.Status';
import MY_SUBJECT from '@salesforce/schema/Case.Subject';
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';
import { LightningElement, api, wire } from 'lwc';
const FIELDS = [CASE_NUMBER, MY_STATUS, MY_PRIORITY, MY_SUBJECT];
export default class WiredAdapterCheck extends LightningElement {

    @api recordId;
   
    @wire(getRecord,{recordId:'$recordId',fields:FIELDS}) 
    myRecord;

    get number(){
        return getFieldValue(this.myRecord.data,CASE_NUMBER);
    }
    get status(){
        return getFieldValue(this.myRecord.data,MY_STATUS);
    }
    get priority(){
        return getFieldValue(this.myRecord.data,MY_PRIORITY);
    }
    get subject(){
        return getFieldValue(this.myRecord.data,MY_SUBJECT);
    }
}