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
    this.httpClientService.getUserList().
    subscribe(
      response => this.handleUsers(response))
  }

  handleUsers(data)
  {
      this.Users=data;
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

  sortByFname()
  {
    console.log('sorting..')
   var sortedArr= this.Users.sort((a,b) =>{
      console.log('afname bfname->'+a.firstName+b.firstName)
      if(a.firstName > b.firstName)
      {
          return 1;
      }
      if(a.firstName > b.firstName)
      {
        return -1;
      }
      return 0;
    });
    console.log('after sorting..'+ sortedArr[0].firstName +':::'+sortedArr[1].firstName)
  }

  sortByLname()
  {
    console.log('sorting..')
    this.Users.sort((a,b) =>{
      if(a.lastName > b.lastName)
      {
          return 1;
      }
      if(a.lastName > b.lastName)
      {
        return -1;
      }
      return 0;
    });
    console.log('after sorting..'+ this.Users)
  }

  sortByUserid()
  {
    this.Users.sort((a,b) =>{
      if(a.id > b.id)
      {
          return 1;
      }
      if(a.id > b.id)
      {
        return -1;
      }
      return 0;
    });
  }

  deleteUser(user)
  {
    this.httpClientService.deleteUser(user).subscribe
    (response => {
      alert('deleted successfully');
    });
  }

}
