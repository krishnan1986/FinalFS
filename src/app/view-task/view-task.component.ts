import { Component, OnInit } from '@angular/core';
import {HttpClientService } from '../service/http-client.service';
import { task } from '../model/Task';
import { parentTask } from '../model/parentTask';
import { FormGroup, FormControl } from '@angular/forms';
import { Project } from '../model/project';
import { User } from '../model/userModel';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  isSearched: Boolean =false;
   tasks:task[];
   
   prjcts: Project[];
 users: User[];
   model:task = new task() ;
   viewTaskForm: FormGroup;
   parentTaskfromDB: parentTask = new parentTask();
   editRowId: any;
   selectedProject: string;


  constructor(private httpClientService: HttpClientService) {

    
   }

  ngOnInit() {
    this.viewTaskForm = new FormGroup({
      projects: new FormControl(''),
      users: new FormControl('')
    });

    this.viewTaskForm.get('projects').valueChanges
    .subscribe(data => {console.log('selected'+data)

    this.selectedProject= data;
    console.log('component var'+this.selectedProject)
  
  }// console.log(this.prjcts.filter(d => { return d.projectname == data}))
      );

      this.viewTaskForm.get('users').valueChanges.subscribe(data => {console.log('selected user'+data)
  
      //this.selectedUser= data;
      //console.log('component var'+this.selectedUser)
    
    }// console.log(this.prjcts.filter(d => { return d.projectname == data}))
        );

        this.httpClientService.getProjectList().subscribe
    (
      response => this.handleProjects(response),

    );
    /* this.httpClientService.getUserList().subscribe
    (
      response => this.handleUser(response),

    ); */

    
  }
 searchTaskforProject()
 {
  this.httpClientService.getTaskListForProject(this.selectedProject).subscribe
  (
    response => {this.handle(response),
      console.log(response)
    }

  );
 }
  handleProjects(response)
  {
  this.prjcts=response;
  }
 /*  handleUser(response)
  {
  this.users=response;
  } */
  selectProject()
  {
      this.model.selectedProjectName=this.selectedProject;
      console.log('setting model value'+ this.model.selectedProjectName)
  }
  toggle(id){
    this.editRowId = id;
  }
  handle(response)
  {
  this.tasks=response;
  this.tasks.forEach(function(eachTask)
  {
     console.log("each task"+JSON.stringify(eachTask));
  });
  console.log("tasks"+JSON.stringify(this.tasks))
  }

  searchTaskService(form):void  {
    console.log(form.value)
     this.httpClientService.searchTask(this.model.taskname)
        .subscribe( data => {
          alert("task searched successfully.");
        });

  };

  deleteTask(taskName: string)
  {
    console.log("ending task"+taskName);

    this.httpClientService.endTask(taskName)
  }
}
