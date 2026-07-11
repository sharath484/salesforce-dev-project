import { LightningElement } from 'lwc';

export default class CustomEventsChild extends LightningElement {


    handleClick(){
        const myEvent = new CustomEvent('myevent',{
            detail:{
                name:'gopi',
                age:25,
                personalInfo:{
                    address:'hyd',
                    phone:'9876543210',
                    skills:['html','css','js'],
                    hobbies:['cricket','football','coding']
                },
                isMarried:false,
                isEmployed:true
            
            }
        })
        this.dispatchEvent(myEvent);
    }
}