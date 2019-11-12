import { Component, OnInit } from '@angular/core';
import { Project } from '../model/project';
import { HttpClientService } from '../service/http-client.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  project: Project = new Project();
  prjcts: Project[];
  isDatesSelected: boolean = false;
  isCompleted: boolean = false;
  taskNumber: number =1;
  constructor(private httpClientService: HttpClientService) { }

  ngOnInit() {
    this.httpClientService.getProjectList().subscribe
    (
      response => this.handle(response),

    );
  }

  

  handle(response)
  {
  this.prjcts=response;
  let i: number= 0;
  let currdate: Date = new Date();
  console.log("proejcts"+ JSON.stringify(response))
  var year= currdate.getFullYear();
  var month= currdate.getMonth();
  var day= currdate.getDay();
  var checked=[];

  var dateFormat= new Date(year,month,day);
 

  this.prjcts.forEach(function(value){
    

    console.log("end date :"+value.endDate+"current date"+currdate);
    /* let obj= JSON.parse(v);
     */
    var endDate= new Date(value.endDate);
    if(dateFormat>endDate)
     {
       console.log("updating check to yes")

       //this.handleCheck(true);
    //  this.isCompleted = !this.isCompleted
     }
  });
 
   
  
  }

  AddProjectToDB(project: Project)
  {
    this.httpClientService.addProject(project).subscribe( data => {
      alert("project created successfully.");
    });;
  }

  
}
