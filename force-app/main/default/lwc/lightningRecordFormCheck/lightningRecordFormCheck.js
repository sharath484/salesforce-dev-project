import { LightningElement, api } from 'lwc';

export default class LightningRecordFormCheck extends LightningElement {
    @api recordId;
    objectApiName = 'Case';
    fields = ['Subject','Status','Priority','Description']
}