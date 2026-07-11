import { NavigationMixin } from 'lightning/navigation';
import { LightningElement } from 'lwc';

export default class NavigationCheck extends NavigationMixin(LightningElement) {

    navigateToAccountRecord(){

        this[NavigationMixin.Navigate]({
            type : 'standard__recordPage',
            attributes:{
                recordId : '001dM000002FgdiQAC',
                objectApiName : 'Account',
                actionName : 'view'
            }
        });
    }
    navigateToWebPage(){
        this[NavigationMixin.Navigate]
        ({
            type : 'standard__webPage',
            attributes:{
                url : 'https://www.google.com'
            }
        });


    }

    navigateToAccListView(){
        this[NavigationMixin.Navigate]({
            type : 'standard__objectPage',
            attributes:{
                objectApiName : 'Account',
                actionName : 'list'
            },
            state:{
                filterName : 'AllAccounts'
            }
           
        });
    }

    navigateToCustomTab(){
        this[NavigationMixin.Navigate]({
            type : 'standard__navItemPage',
            attributes:{
                
                apiName : 'Candidates'

            }

        });
    }
    
}