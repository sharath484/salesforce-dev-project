import createAccRec from '@salesforce/apex/democlassforlwc.createAccRecord';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { LightningElement } from 'lwc';

export default class CreateRecordToastEvent extends NavigationMixin(LightningElement) {
    accName;
    handleAccNameChange(event){
        this.accName = event.target.value;
    }
    createAccountRecord(){
 
        createAccRec({accName:this.accName})
        .then(result=>{
            console.log('result'+result);
            this.showMessage('Success','Account created successfully','success','sticky');
            this.showRecordPage(result);
            
        })
        .catch(error=>{
            console.log('error'+error);
            this.showMessage('Error','Account creation failed','error','sticky')
        })

    }

     showMessage(title,message,variant,mode){

        console.log('inside show message');
        const evt = new ShowToastEvent({
            title: title,
            message:message,
            variant:variant,
            mode:mode
           
        });
        this.dispatchEvent(evt);
        }

        showRecordPage(recordId){
            this[NavigationMixin.Navigate]
            (
                {
                    type:'standard__recordPage',
                    attributes:{
                        recordId:recordId,
                        objectApiName:'Account',
                        actionName:'view'
                    }
                });
        }
    }