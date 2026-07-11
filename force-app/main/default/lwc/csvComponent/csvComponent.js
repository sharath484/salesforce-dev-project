import fetchAccounts from '@salesforce/apex/csvController.fetchAccounts';
import { LightningElement, wire } from 'lwc';
export default class CsvComponent extends LightningElement {

    accountData=[];

    columns = [
    { label: 'Name', fieldName: 'Name', type : 'text' },
    { label: 'Website', fieldName: 'Website', type: 'url' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Industry', fieldName: 'Industry', type: 'text' },
];

    @wire(fetchAccounts) accounts({error,data}){
        if(data){
            console.log('data', data);
                this.accountData = data;
    }
        if(error){
            console.log('error', error);
        }
    }

     get checkRecords(){
        return this.accountData.length > 0 ? false : true;
    }

    exportCSV(){
        let downloadRecords=[];
        let selectedRecords = this.template.querySelector('lightning-datatable').getSelectedRows();
        console.log('selectedRecords', selectedRecords);
        
        if(selectedRecords.length > 0){
              downloadRecords = [...selectedRecords]; 
              console.log('downloadRecords', downloadRecords);
        }
        else {
            downloadRecords = [...this.accountData];
            console.log('downloadRecords', downloadRecords);
        }
      let  csvFile = this.convertArrayToCsv(downloadRecords);
      console.log('csvFile', csvFile);

      this.downloadCsv(csvFile);
    }

    convertArrayToCsv(array){
        let csvHeader = Object.keys(array[0]).join(',');
        let csvRecords = array.map(obj => Object.values(obj).join(','));
        return csvHeader + '\n' + csvRecords.join('\n');
    }

    downloadCsv(csvData){
       
    const downloadLink = document.createElement('a');
    downloadLink.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvData);
    downloadLink.target = '_blank';
    downloadLink.download = 'accounts.csv';
    downloadLink.click();

    }
}