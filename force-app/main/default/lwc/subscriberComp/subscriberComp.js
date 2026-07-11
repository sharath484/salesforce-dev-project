import COMMUNICATION_CHANNEL from '@salesforce/messageChannel/SampleMessageChannel__c';
import { MessageContext, subscribe } from 'lightning/messageService';
import { LightningElement, wire } from 'lwc';

export default class SubscriberComp extends LightningElement {

    receivedMessage;
    receivedDescription;

    @wire(MessageContext)
    messageContext;

    connectedCallback(){
        subscribe(this.messageContext, COMMUNICATION_CHANNEL, (data) => {
            this.receivedMessage = data.message;
            this.receivedDescription = data.description;
        });
    }


}