import { Component, OnInit , Input, EventEmitter, Output} from '@angular/core';
import {task} from '../model/Task';
import { HttpClientService } from '../service/http-client.service';
import { Project } from '../model/project';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { User } from '../model/userModel';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

 
 // model:task = new task("test",1,1,new Date(2013,12,1),new Date(2014,1,1));
 model:task= new task();
 projectModel: Project = new Project();
 prjcts: Project[];
 users: User[];
 projectForm: FormGroup;
 @Input() isParentTask: boolean = false;
 @Output() getChange = new EventEmitter();
  postUrl:string ="http://localhost:8112/"
  projects:any = ['a','b'];
  selectedProject: string;
  selectedUser: string;
  constructor( private httpClientService: HttpClientService, public fb : FormBuilder) {

    
    
  }
  // /*########### Form ###########*/
  // projectForm = this.fb.group({
  //   projectName: ['']
  // })

  ngOnInit() {
    this.projectForm = new FormGroup({
      projects: new FormControl(''),
      users: new FormControl('')
    });

    this.projectForm.get('projects').valueChanges
    .subscribe(data => {console.log('selected'+data)

    this.selectedProject= data;
    console.log('component var'+this.selectedProject)
  
  }// console.log(this.prjcts.filter(d => { return d.projectname == data}))
      );

      this.projectForm.get('users').valueChanges.subscribe(data => {console.log('selected user'+data)
  
      this.selectedUser= data;
      console.log('component var'+this.selectedUser)
    
    }// console.log(this.prjcts.filter(d => { return d.projectname == data}))
        );
    console.log('inside add task comp');
    console.log('loading projects available');
    this.httpClientService.getProjectList().subscribe
    (
      response => this.handle(response),

    );
    this.httpClientService.getUserList().subscribe
    (
      response => this.handleUser(response),

    );
  }

  handle(response)
  {
  this.prjcts=response;
  }
  handleUser(response)
  {
  this.users=response;
  }

  checkParent(isParentTask)
  {
    alert(isParentTask);
    this.getChange.emit(this.isParentTask);
  }

  selectProject()
  {
      this.model.selectedProjectName=this.selectedProject;
      console.log('seetting model value'+ this.model.selectedProjectName)
  }

  selectUsers()
  {
      this.model.taskOwner=this.selectedUser;
      console.log('setting task owner value'+ this.model.taskOwner)
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
