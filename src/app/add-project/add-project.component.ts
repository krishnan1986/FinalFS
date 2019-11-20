import { Component, OnInit } from '@angular/core';
import { Project } from '../model/project';
import { HttpClientService } from '../service/http-client.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  project: Project = new Project();
  prjcts: Project[] = new Array<Project>();
  sortedProjects: Project[]=new Array<Project>();
  initResProjects: Project[]=new Array<Project>();
  isDatesSelected: boolean = false;
  isCompleted: boolean = false;
  taskNumber: number =1;
  isSorted: boolean =false;
  isSearched: boolean;
  result: Project;
  constructor(private httpClientService: HttpClientService) { }

  ngOnInit() {
    this.httpClientService.getProjectList().subscribe
    (
      response => this.handle(response),

    );
    // get task count for all projects
   /*  console.log("init proejcts"+JSON.stringify(this.initResProjects))
    this.initResProjects.forEach(function(value){
      console.log("getting task count for "+value.projectname);
    this.httpClientService.getTaskCountByPname(value.projectname).
    subscribe(resp =>
       {
         console.log(JSON.stringify(resp))
       }
      )
      }); */
  }

  
  

  handle(response)
  {
  this.prjcts=response;
  this.initResProjects=response;
  let i: number= 0;
  let currdate: Date = new Date();
  console.log("proejcts"+ JSON.stringify(response))
  var year= currdate.getFullYear();
  var month= currdate.getMonth();
  var day= currdate.getDay();
  var checked=[];

  var dateFormat= new Date(year,month,day);
 

  this.prjcts.forEach(function(value){
    let httpClientService: HttpClientService;
    let http: HttpClient;

    console.log("end date :"+value.endDate+"current date"+currdate);
    /* let obj= JSON.parse(v);
     */
    var endDate= new Date(value.endDate);
   
    console.log("day"+currdate.getDate() +"enddate day"+endDate.getDate())
    if(currdate.getDate() >endDate.getDate())
     {
       console.log("updating check to yes")
       value.completed=true;
       //this.handleCheck(true);
     // this.isCompleted = !this.isCompleted
     }
     else{
       value.completed=false;
     }

     /* console.log("getting task count for "+value.projectname);
    http.get('http://localhost:8112/getTaskCountByName'+"/"+value.projectname).
    subscribe(resp =>
       {
         console.log(JSON.stringify(resp))
       }
      ) */
  });
 
   
  
  }

  AddProjectToDB(project: Project)
  {

    if((this.project.StartDate < this.project.endDate ) && (this.project.projectname!=null)){
    this.httpClientService.addProject(project).subscribe( data => {
      alert("project created successfully.");
    });;
    }
    else if(this.project.StartDate > this.project.endDate){
        alert('start date should be less than end date');
    }
    else {
      alert('project name should not be blank')
    }
  }
  //SORT
  sortBySDate()
  {
    this.httpClientService.sortByStartDate().
    subscribe(response=>
      {
        //this.prjcts.push(response);
       // console.log("resp"+JSON.stringify(response))
       this.sortedProjects = JSON.parse(JSON.stringify(response))

        alert('sorted');
        this.isSorted =true;
      });
  }

  sortByEDate()
  {
    this.httpClientService.sortByEndDate().
    subscribe(response=>
      {
        //this.prjcts.push(response);
       // console.log("resp"+JSON.stringify(response))
        this.sortedProjects = JSON.parse(JSON.stringify(response))

       // console.log("sorted obejcts"+JSON.stringify(this.sortedProjects))
        alert('sorted');
        this.isSorted =true;
      });
  }

  sortByPrio()
  {
    this.httpClientService.sortByPrio().
    subscribe(response=>
      {
        this.sortedProjects = JSON.parse(JSON.stringify(response))

       // console.log("sorted obejcts"+JSON.stringify(this.sortedProjects))
        alert('sorted');
        this.isSorted =true;
      });

   /* this.prjcts.sort((l,r) :number =>
   {
     if(l.priority > r.priority)
     {
       return 1;
     }
     if(l.priority<l.priority) return -1;
     return 0;
   }); */
   console.log("sorted arr"+JSON.stringify(this.sortedProjects))
      this.isSorted = true;
  }


  handleSort(response: string)
  {
    console.log("resp sorted"+JSON.stringify(response));
        let P= new Project();
        
        this.sortedProjects.push(JSON.parse(JSON.stringify(response)));

        console.log("prjects array"+JSON.stringify(this.sortedProjects))
       // this.sortedProjects=sortArr;
        alert('sorted');
  }

  searchProject(searchInput): Project{
    this.isSorted=false;
       console.log("executing search..."+ searchInput);
   
       this.httpClientService.searchProject(searchInput).subscribe( data => {
         alert("project searched successfully.");
         this.handleSearch(data);
         this.isSearched=true;
       });
     
       
       return this.result ;
     }
     handleSearch(data)
     {
       console.log("user got is "+JSON.stringify(data))
     this.prjcts.push(data);
     }
  
}
