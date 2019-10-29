import { Component, OnInit } from '@angular/core';
import {User} from '../model/userModel';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
 
  model:User= new User();
   
  constructor() { }

  ngOnInit() {
  }

}
