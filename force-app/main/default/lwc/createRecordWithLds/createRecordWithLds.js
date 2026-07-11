import { LightningElement } from 'lwc';

export default class CreateRecordWithLds extends LightningElement {
    objectApiName = 'Case';
    fields = ['CaseNumber', 'Priority', 'Status', 'Subject'];
}