import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../model/userModel';
import { map } from 'rxjs/operators';
import { task } from '../model/Task';
import { Project } from '../model/project';
import {HttpHeaders} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  

//restcallurl ='http://localhost:8111/AddTask/';
restcallurl ='http://localhost:8112/ViewTask/tasks';
getProjects="http://localhost:8112/viewProjects";
getUsers="http://localhost:8112/viewUsers";
  sampleMap = new Map<string, string>();
  
  

    angular: any;

  constructor(private http: HttpClient) { }

  /* getTaskList()
  {
    // perform DB fetch by invoking rest call
    return this.http.get<task[]>(this.restcallurl);
  } */

  addUser(User: User)
  {
   console.log('inside add user button fucntion');
   console.log("user obj"+JSON.stringify(User));
   const convMap ={};
   var myJson=JSON.stringify(User);
   //this.sampleMap= JSON.parse(myJson);
   console.log("sampleMap"+this.sampleMap);
  //  this.sampleMap.forEach((val: string ,key:string) => {
  //     convMap[key]=val;
     
  //  });
  //  console.log("map"+ convMap);
  
    return this.http.post<User>("http://localhost:8112/addUser",User);
  }

  searchUser(id: String)
  {
    console.log('inside search user button fucntion'+ id);
    return this.http.get("http://localhost:8112/searchUser"+"/"+id);
  }

  updateFirstName(newUser: User)
  {
    console.log("updating firstname");
    return this.http.put("http://localhost:8112/UpdateUser",newUser);

  }

  deleteUser(user)
  {
    console.log("deleting user"+ user.id)
    return this.http.delete("http://localhost:8112/deleteUser"+"/"+user.id);
  }
  

  updateUser(user)
  {
   let  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = {headers : headers};
  
    console.log("updating user "+JSON.stringify(user))
    
    return this.http.put("http://localhost:8112/UpdateUser",user,options);
  }
  /* 

  endTask(taskName:string)
  {
    let httpParams= new HttpParams();
    httpParams.set('taskName',taskName);
    let options ={ params:httpParams}
    console.log("ending task by calling rest call delete"+ taskName);
    return this.http.delete("http://localhost:8111/ViewTask/endTask",options);
  } */

  addTask(task)
  {
   console.log('inside add task button fucntion');
   console.log("task obj"+JSON.stringify(task));
   const convMap ={};
   var myJson=JSON.stringify(task);
   //this.sampleMap= JSON.parse(myJson);
   console.log("sampleMap"+this.sampleMap);
  //  this.sampleMap.forEach((val: string ,key:string) => {
  //     convMap[key]=val;
     
  //  });
  //  console.log("map"+ convMap);
  
    return this.http.post<task>("http://localhost:8112/addTask",task);
  }

  addProject(project : Project)
  {
   console.log('inside add project button fucntion');
   console.log("project obj"+JSON.stringify(project));
   const convMap ={};
   var myJson=JSON.stringify(project);
   //this.sampleMap= JSON.parse(myJson);
   console.log("sampleMap"+this.sampleMap);
  //  this.sampleMap.forEach((val: string ,key:string) => {
  //     convMap[key]=val;
     
  //  });
  //  console.log("map"+ convMap);
  
    return this.http.post<Project>("http://localhost:8112/addProject",project);
  }

  searchTask(task)
  {
    console.log('inside search task button fucntion');
    return this.http.post<task[]>("http://localhost:8112/searchTask",task);
  }

  getTaskList()
  {
    // perform DB fetch by invoking rest call
    return this.http.get<task[]>(this.restcallurl);
  }

  getTaskListForProject(projectName: string)
  {
    // perform DB fetch by invoking rest call
    return this.http.get<task[]>("http://localhost:8112/ViewTask"+"/"+projectName);
  }

  getProjectList()
  {
    return this.http.get<Project>(this.getProjects);
    }

    getUserList()
  {
    return this.http.get<User>(this.getUsers);
    }

  endTask(taskName:string)
  {
    let httpParams= new HttpParams();
    httpParams.set('taskName',taskName);
    let options ={ params:httpParams}
    console.log("ending task by calling rest call delete"+ taskName);
    return this.http.delete("http://localhost:8112/endTask"+"/"+taskName,options);
  }

  sortByStartDate()
  {
    return this.http.get('http://localhost:8112/sortBySDate');
  }

  sortByEndDate()
  {
    return this.http.get('http://localhost:8112/sortByEDate');
  }
  sortByPrio()
  {
    return this.http.get<Project[]>('http://localhost:8112/sortByPrio');
  }

  sortByFname()
  {
    return this.http.get<User[]>('http://localhost:8112/sortByFname');
  }
  
  sortByLname()
  {
    return this.http.get<User[]>('http://localhost:8112/sortByLname');
  }
  sortByUserId()
  {
    return this.http.get<User[]>('http://localhost:8112/sortByUserId');
  }
  
}
