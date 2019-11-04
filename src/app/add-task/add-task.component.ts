import { Component, OnInit , Input, EventEmitter, Output} from '@angular/core';
import {task} from '../model/Task';
import { HttpClientService } from '../service/http-client.service';
import { Project } from '../model/project';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

 
 // model:task = new task("test",1,1,new Date(2013,12,1),new Date(2014,1,1));
 model:task= new task();
 projectModel: Project = new Project();
 @Input() isParentTask: boolean = false;
 @Output() getChange = new EventEmitter();
  postUrl:string ="http://localhost:8112/"
  projects:any = ['a','b'];
  constructor( private httpClientService: HttpClientService, public fb : FormBuilder) {

    
    
  }
  /*########### Form ###########*/
  projectForm = this.fb.group({
    projectName: ['']
  })

  ngOnInit() {
    console.log('inside add task comp');
  }

  checkParent(isParentTask)
  {
    alert(isParentTask);
    this.getChange.emit(this.isParentTask);
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
