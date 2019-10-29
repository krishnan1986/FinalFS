import { Component, OnInit } from '@angular/core';
import {User} from '../model/userModel';
import {HttpClientService } from '../service/http-client.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
 
  model:User= new User();
   
  
  constructor(private httpClientService: HttpClientService) {

    
  }

  ngOnInit() {
  }

  addUsertoDB():void  {
    console.log("adding user");
    this.httpClientService.addUser(this.model)
    .subscribe( data => {
      alert("user added successfully.");
    });
  }

}
