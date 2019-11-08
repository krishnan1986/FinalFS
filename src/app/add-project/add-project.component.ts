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
  isDatesSelected: boolean = false;
  constructor(private httpClientService: HttpClientService) { }

  ngOnInit() {
  }

  AddProjectToDB(project: Project)
  {
    this.httpClientService.addProject(project).subscribe( data => {
      alert("project created successfully.");
    });;
  }
}
