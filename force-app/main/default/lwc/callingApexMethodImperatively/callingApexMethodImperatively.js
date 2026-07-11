import getCases from '@salesforce/apex/democlassforlwc.getMyCases';
import { LightningElement } from 'lwc';

export default class CallingApexMethodImperatively extends LightningElement {
    search;
    myCaseRecords;
    recordsFound = false;

    handleDesChange(event){
        this.search = event.target.value;
    }

   handleSearch(){
       console.log('search value is '+this.search);
     
       console.log('search value is '+this.search)
       getCases({mySubject : this.search})
       .then(result => {
           console.log('result is '+result);
           this.myCaseRecords = result;
           this.recordsFound = true;

       })
       .catch(error => {
           console.log('error is '+error);
       })
   }

}