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
  isCompletedCheck: string = "NO";
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
 /*  for(i=0;this.prjcts.length;i++){

     if(currdate.valueOf >Date.parse(this.prjcts[i].endDate).valueOf)
     {
       this.isCompletedCheck = true;
     }
  } */
  this.prjcts.forEach(function(value){
    console.log(value.endDate);
    /* let obj= JSON.parse(v);
     */
    if(currdate.valueOf >Date.parse(value.endDate).valueOf)
     {
       this.isCompletedCheck = "YES";
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
