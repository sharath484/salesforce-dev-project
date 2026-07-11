import fetchLookupData from '@salesforce/apex/customLookupController.fetchLookupData';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { LightningElement, api, wire } from 'lwc';
const DELAY= 300;
export default class MultiCustomLookup extends LightningElement {
    searchKey;
    @api objectApiName = 'Account';
    @api label = 'Account';
    @api placeHolder = 'Search Account';
    hasData = false;
    searchOutput = [];
    delayTimeout;
    selectedRecords=[];
   
    

    @wire(fetchLookupData, { searchKey: '$searchKey', objectApiName: '$objectApiName' })
        searchData({ error, data }){
            if(data){
                console.log('data', data);
                this.hasData = data.length > 0 ? true : false;
                this.searchOutput = data;
            }
            if(error){
                console.log('error', error);
            }
        }

        onChangeHandler(event){
            clearTimeout(this.delayTimeout);
            let value = event.target.value;
          this.delayTimeout =  setTimeout(() => {
                this.searchKey = value;
            }, DELAY);
        }

        onClickHandler(event){
            let recId = event.currentTarget.dataset.recordId;
            console.log('recId', recId);
            if(this.validateDuplicateRecords(recId)){
                let selectedRecord = this.searchOutput.find((currItem) => currItem.Id === recId);
            console.log('selectedRecord', selectedRecord);
            let pill =  {
            label: selectedRecord.Name,
             name: recId,
  
        };
                this.selectedRecords = [...this.selectedRecords, pill];
            console.log('this.selectedRecords', this.selectedRecords);
            }
            

        }

        get showPillContainer(){
            return this.selectedRecords.length > 0 ? true : false;
        }


 removePill(event) {
    console.log('remove pill');
    const recordId = event.detail.item.name; // pill name
    console.log('recordId', recordId);
    this.selectedRecords = this.selectedRecords.filter(
        item => item.name !== recordId
    );
}

        validateDuplicateRecords(selectedRecord){
            let isValid = true;
            let isRecordDuplicate = this.selectedRecords.find((currItem) => currItem.name === selectedRecord);
            if(isRecordDuplicate){
                isValid = false;
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Error',
                    message: 'Record already selected',
                    variant: 'error'
                }));
            }
            return isValid;
           
        }


}