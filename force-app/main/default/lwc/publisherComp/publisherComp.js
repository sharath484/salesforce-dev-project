import COMMUNICATION_CHANNEL from '@salesforce/messageChannel/SampleMessageChannel__c';
import { MessageContext, publish } from 'lightning/messageService';
import { LightningElement, wire } from 'lwc';

export default class PublisherComp extends LightningElement {
    message = '';
    description = '';
    handleMessageChange(event) {
        this.message = event.target.value;
    }

    handleDescriptionChange(event) {
        this.description = event.target.value;
    }

    @wire(MessageContext) 
    messageContext;

    publishMessage(){
        const payload = {
            message: this.message,
            description: this.description
        };
        publish(this.messageContext, COMMUNICATION_CHANNEL, payload);
    }
}