import { Component, OnInit } from '@angular/core';
import {task} from '../model/Task';
import { HttpClientService } from '../service/http-client.service';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

 
 // model:task = new task("test",1,1,new Date(2013,12,1),new Date(2014,1,1));
 model:task= new task();
  postUrl:string ="http://localhost:8112/"

  constructor( private httpClientService: HttpClientService) {

    
  }

  ngOnInit() {
    console.log('inside add task comp');
  }

  addTaskService():void  {
    //console.log(form.value)
    console.log('adding task')
     this.httpClientService.addTask(this.model)
        .subscribe( data => {
          alert("task created successfully.");
        });

  };

  
  

}
