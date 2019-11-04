import { Component, OnInit } from '@angular/core';
import {HttpClientService } from '../service/http-client.service';
import { task } from '../model/Task';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  isSearched: Boolean =false;
   tasks:task[];
   model:task = new task();
   editRowId: any;


  constructor(private httpClientService: HttpClientService) {

    
   }

  ngOnInit() {
    this.httpClientService.getTaskList().subscribe
    (
      response => this.handle(response),

    );
  }

  toggle(id){
    this.editRowId = id;
  }
  handle(response)
  {
  this.tasks=response;
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
