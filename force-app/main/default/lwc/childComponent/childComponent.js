import { LightningElement } from 'lwc';

export default class ChildComponent extends LightningElement {
    myName = 'Sharath Kumar Gopi';

    handleClick(){
        this.template.querySelector('c-container').myInfo();
    }

}