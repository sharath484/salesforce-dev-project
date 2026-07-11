import { LightningElement, track } from 'lwc';

export default class ReactivityCheck extends LightningElement {



    @track myPersonalInfo = [{
        id : 1,
        name : 'sharath',
        age : 25,
        address : 'hyderabad',
        phone : 9876543210,
        sex : 'male',
        hobbies : ['reading','coding','playing'],
        isMarried : false,
        isStudent : true,
    },
    {
        id : 2,
        name : 'gopi',
        age : 25,
        address : 'hyderabad',
        phone : 84989738977
    }]

    changeAddress(){
        this.myPersonalInfo[0].address = 'bangalore'

    }
}