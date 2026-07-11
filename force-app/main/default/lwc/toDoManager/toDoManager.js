import { refreshApex } from '@salesforce/apex';
import loadCompletedTasks from '@salesforce/apex/toDoManagerController.loadCompletedTasks';
import loadIncompleteTasks from '@salesforce/apex/toDoManagerController.loadIncompleteTasks';
import TASK_OBJECT from '@salesforce/schema/Task_Manager__c';
import TASK_COMPLETED_DATE_FIELD from '@salesforce/schema/Task_Manager__c.Completed_Date__c';
import TASK_ID_FIELD from '@salesforce/schema/Task_Manager__c.Id';
import TASK_STATUS_FIELD from '@salesforce/schema/Task_Manager__c.Is_Completed__c';
import TASK_NAME_FIELD from '@salesforce/schema/Task_Manager__c.Name';
import TASK_DATE_FIELD from '@salesforce/schema/Task_Manager__c.Task_Date__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord, deleteRecord, updateRecord } from 'lightning/uiRecordApi';
import { LightningElement, wire } from 'lwc';
export default class ToDoManager extends LightningElement {

    taskName;
    taskEndDate = null;
    incompleteTasks = [];
    completedTasks = [];
    inCompleteTasksResult;
    completeTasksResult;

   @wire(loadIncompleteTasks) 
    loadIncompleteTasks(result){
        this.inCompleteTasksResult = result;
        const {data,error} = result;
        if(data){
            this.incompleteTasks = data.map((item) => ({
                                       
                    taskId : item.Id,
                    taskName:item.Name,
                    taskEndDate:item.Task_Date__c
        }));

        console.log("incompleted tasks",this.incompleteTasks)
        }
        else if(error){
            console.log("Error Occured",error);
        }
    }

    @wire(loadCompletedTasks) 
    loadCompletedTasks(result){
        this.completeTasksResult = result;
        const {data,error} = result;
        if(data){
            this.completedTasks = data.map((item) => ({
                 
                    taskId : item.Id,
                    taskName:item.Name,
                    taskEndDate:item.Task_Date__c
        }));

        console.log("completed tasks",this.completeTasks)
        }
        else if(error){
            console.log("Error Occured",error);
        }
    }

    changeHandler(event){
        let{name,value} = event.target;
        if(name === 'taskName'){
                this.taskName = value;
        }
        else if(name === 'taskDate'){
            this.taskEndDate = value;
        }
    }

    resetHandler(){
        this.taskName = '';
        this.taskEndDate = null;
    }

    addTaskHandler(){
       if(this.taskEndDate === null){
           this.taskEndDate = new Date().toISOString().slice(0,10);
        }
       if(this.validateTask()){
        //     this.incompleteTasks=[...this.incompleteTasks,{
        //         taskName:this.taskName,
        //         taskEndDate:this.taskEndDate
        //     }];

        //     this.resetHandler();
        //    let sortedArray = this.sortTasks(this.incompleteTasks);
        //     this.incompleteTasks=[...sortedArray];
        //     console.log("array updated")
        //     console.log(JSON.stringify(this.incompleteTasks));

        const fields = {};
        fields[TASK_NAME_FIELD.fieldApiName] = this.taskName;
        fields[TASK_DATE_FIELD.fieldApiName] = this.taskEndDate;
        fields[TASK_STATUS_FIELD.fieldApiName] = false;
        const recordInput = { apiName: TASK_OBJECT.objectApiName, fields: fields };
        createRecord(recordInput)
        .then(task => {
            console.log("Record Created Successfully",task);
            this.showToast("Success","Task Added Successfully","success");
            refreshApex(this.inCompleteTasksResult);
        });
        this.resetHandler();
        
      }
    
    }
    

    validateTask(){
        let isValid = true;
        let element = this.template.querySelector(".taskDetails");
     
        if(this.taskName===''){
            isValid= false;
        }
        else {
           let taskItem = this.incompleteTasks.find((current) => 
    current.taskName === this.taskName &&
    current.taskEndDate === this.taskEndDate
);
            
                if(taskItem){
                    isValid = false;
                    console.log("task already exists");
                    element.setCustomValidity("Task Already Exists");
                }
        }

        if(isValid){
            element.setCustomValidity("");
        }
        element.reportValidity();
        return isValid;
     }
    

    sortTasks(array){
      let sortedArray = array.sort((a,b) => {
        return new Date(a.taskEndDate) - new Date(b.taskEndDate);
    });
    return sortedArray;
 }

  deleteTask(event){
    // let index = event.target.name;
    // this.incompleteTasks.splice(index,1);
    // let sortedArray = this.sortTasks(this.incompleteTasks);
    //         this.incompleteTasks=[...sortedArray];
    //         console.log("array updated")
    //         console.log(JSON.stringify(this.incompleteTasks));
  let recId = event.target.name;
    deleteRecord(recId)
    .then(() => {
        console.log("Record Deleted Successfully");
        this.showToast("Deleted","Task Deleted Successfully","success");
        refreshApex(this.inCompleteTasksResult);
    })
    .catch(error => {
        console.log("Error Occured",error);
    });
}

  markAsCompleted(event){
    // let index = event.target.name;
    // let task = this.incompleteTasks[index];
    // this.completedTasks=[...this.completedTasks,task];
    // this.incompleteTasks.splice(index,1);
    // let sortedArray = this.sortTasks(this.incompleteTasks);
    //         this.incompleteTasks=[...sortedArray];
    //         console.log("array updated")
    //         console.log(JSON.stringify(this.incompleteTasks));
     console.log("mark as complete clicked");
    let recId = event.target.name;
    let fields = {};
    
    fields[TASK_ID_FIELD.fieldApiName] = recId;
    fields[TASK_STATUS_FIELD.fieldApiName] = true;
    fields[TASK_COMPLETED_DATE_FIELD.fieldApiName] = new Date().toISOString().slice(0,10);
    let recordInput = { fields: fields };
   
    updateRecord(recordInput)
    .then(() => {
        console.log("Record Updated Successfully");
        this.showToast("Success","Task Marked as Completed","success");
        refreshApex(this.inCompleteTasksResult);
        refreshApex(this.completeTasksResult);
  })
    .catch(error => {
        console.log("Error Occured",error);
    });
}

  dragHandler(event){
    event.dataTransfer.setData("index",event.target.dataset.item);

  }
  dragOverHandler(event){
    event.preventDefault();
  }

  dropHandler(event){
    
    let recId = event.dataTransfer.getData("index");
    let fields = {};
    
    fields[TASK_ID_FIELD.fieldApiName] = recId;
    fields[TASK_STATUS_FIELD.fieldApiName] = true;
    fields[TASK_COMPLETED_DATE_FIELD.fieldApiName] = new Date().toISOString().slice(0,10);
    let recordInput = { fields: fields };
   
    updateRecord(recordInput)
    .then(() => {
        console.log("Record Updated Successfully");
        this.showToast("Success","Task Marked as Completed","success");
        refreshApex(this.inCompleteTasksResult);
        refreshApex(this.completeTasksResult);
  })
    .catch(error => {
        console.log("Error Occured",error);
    });
    // let task = this.incompleteTasks[index];
    // this.completedTasks=[...this.completedTasks,task];
    // this.incompleteTasks.splice(index,1);
    // let sortedArray = this.sortTasks(this.incompleteTasks);
    //         this.incompleteTasks=[...sortedArray];
    //         console.log("array updated")
    //         console.log(JSON.stringify(this.incompleteTasks));

  }

  showToast(title, message, variant) {
    const event = new ShowToastEvent({
      title: title,
      message:
        message,
      variant: variant,
    });
    this.dispatchEvent(event);
  }
}