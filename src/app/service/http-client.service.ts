import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../model/userModel';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  

//restcallurl ='http://localhost:8111/AddTask/';
  sampleMap = new Map<string, string>();
  

    angular: any;

  constructor(private http: HttpClient) { }

  /* getTaskList()
  {
    // perform DB fetch by invoking rest call
    return this.http.get<task[]>(this.restcallurl);
  } */

  addUser(User)
  {
   console.log('inside add user button fucntion');
   console.log("task obj"+JSON.stringify(User));
   const convMap ={};
   var myJson=JSON.stringify(User);
   //this.sampleMap= JSON.parse(myJson);
   console.log("sampleMap"+this.sampleMap);
  //  this.sampleMap.forEach((val: string ,key:string) => {
  //     convMap[key]=val;
     
  //  });
  //  console.log("map"+ convMap);
  
    return this.http.post<User>("http://localhost:8111/addUser",User);
  }

  /* searchTask(task)
  {
    console.log('inside search task button fucntion');
    return this.http.post<task[]>("http://localhost:8111/searchTask",task);
  }

  endTask(taskName:string)
  {
    let httpParams= new HttpParams();
    httpParams.set('taskName',taskName);
    let options ={ params:httpParams}
    console.log("ending task by calling rest call delete"+ taskName);
    return this.http.delete("http://localhost:8111/ViewTask/endTask",options);
  } */
}
