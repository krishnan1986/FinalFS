import { Component, OnInit, ElementRef } from '@angular/core';
import {User} from '../model/userModel';
import {HttpClientService } from '../service/http-client.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
 
  model:User= new User();
  result: User = new User();
  Users: User[]= [];
  searchInput: String;
 // private isEditable: boolean=true;
   
  
  constructor(private httpClientService: HttpClientService) {

    
  }

  makeEditable(user)
  {
   
    console.log("user"+JSON.stringify(user));
    //this.isEditable=false;
    this.httpClientService.updateFirstName(user).subscribe(response =>
      {
      alert("name updated successfully.");
      });

   
   
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

  searchUser(searchInput): User{

    console.log("executing search..."+ searchInput);

    this.httpClientService.searchUser(searchInput).subscribe( data => {
      alert("user searched successfully.");
      this.handle(data);
    });
  
    
    return this.result ;
  }
  handle(data)
  {
    console.log("user got is "+JSON.stringify(data))
  this.Users.push(data);
  }

}
