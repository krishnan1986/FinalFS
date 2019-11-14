import { Component, OnInit , Input, EventEmitter, Output} from '@angular/core';
import {task} from '../model/Task';
import { HttpClientService } from '../service/http-client.service';
import { Project } from '../model/project';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

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
 projectForm: FormGroup;
 @Input() isParentTask: boolean = false;
 @Output() getChange = new EventEmitter();
  postUrl:string ="http://localhost:8112/"
  projects:any = ['a','b'];
  selectedProject: string;
  constructor( private httpClientService: HttpClientService, public fb : FormBuilder) {

    
    
  }
  // /*########### Form ###########*/
  // projectForm = this.fb.group({
  //   projectName: ['']
  // })

  ngOnInit() {
    this.projectForm = new FormGroup({
      projects: new FormControl('')
    });

    this.projectForm.get('projects').valueChanges
    .subscribe(data => {console.log('selected'+data)
    this.selectedProject= data;
    console.log('component var'+this.selectedProject)
  
  }// console.log(this.prjcts.filter(d => { return d.projectname == data}))
      )
    console.log('inside add task comp');
    console.log('loading projects available');
    this.httpClientService.getProjectList().subscribe
    (
      response => this.handle(response),

    );
  }

  handle(response)
  {
  this.prjcts=response;
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

  

  addTaskService():void  {
    //console.log(form.value)
    console.log('adding task')
     this.httpClientService.addTask(this.model)
        .subscribe( data => {
          alert("task created successfully.");
        });

  };

  
  

}
