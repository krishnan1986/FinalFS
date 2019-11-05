import { Component, OnInit } from '@angular/core';
import { Project } from '../model/project';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  project: Project = new Project();
  constructor() { }

  ngOnInit() {
  }

}
