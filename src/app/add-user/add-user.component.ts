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
  sortedUsers: User[]= new Array<User>();
  isSorted: boolean =false;
  isSearched : boolean =false;
 // private isEditable: boolean=true;
   
  
  constructor(private httpClientService: HttpClientService) {

    
  }

  makeEditable(user)
  {
   
    console.log("user"+JSON.stringify(user));
    //this.isEditable=false;
    /* this.httpClientService.updateFirstName(user).subscribe(response =>
      {
      alert("name updated successfully.");
      });
 */

   this.model = user;
   document.getElementById("toggleButton").setAttribute("value","Update");
   
   
  }
  ngOnInit() {
    
    this.httpClientService.getUserList().
    subscribe(
      
      response => this.handleUsers(response))
  }

  handleUsers(data)
  {
    console.log(JSON.stringify(data));
      this.Users=data;
  }

  addUsertoDB():void  {

    if((this.model.firstName==null || this.model.lastName== null || this.model.employeeID == null )
    
    ||
    (this.model.firstName=="" || this.model.lastName== "" || this.model.employeeID == "" )
    
    )
    {
      alert("values cannot be blank");
    }
    else{
      if(document.getElementById("toggleButton").getAttribute("value")== "Add"){
      
    console.log("adding user");
    this.httpClientService.addUser(this.model)
    .subscribe( data => {
      alert("user added successfully.");
    });
    }
    else {

      // update

      this.httpClientService.updateUser(this.model)
      .subscribe(data => {
        alert('user updated successfully');
      })

    }
  }
  }

  searchUser(searchInput): User{
 this.isSorted=false;
    console.log("executing search..."+ searchInput);

    this.httpClientService.searchUser(searchInput).subscribe( data => {
      alert("user searched successfully.");
      this.handle(data);
      this.isSearched=true;
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
   /*  console.log('sorting..')
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


  */
 
      this.httpClientService.sortByFname().subscribe(response =>{
        this.sortedUsers = JSON.parse(JSON.stringify(response))

       // console.log("sorted obejcts"+JSON.stringify(this.sortedProjects))
        alert('sorted');
        this.isSorted =true;
        }
        )
}

  sortByLname()
  {
    console.log('sorting..')
    /* this.Users.sort((a,b) =>{
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
    console.log('after sorting..'+ this.Users)*/
    this.httpClientService.sortByLname().subscribe(response =>{
      this.sortedUsers = JSON.parse(JSON.stringify(response))

     // console.log("sorted obejcts"+JSON.stringify(this.sortedProjects))
      alert('sorted');
      this.isSorted =true;
      }
      )
  } 

  sortByUserid()
  {
   /*  this.Users.sort((a,b) =>{
      if(a.id > b.id)
      {
          return 1;
      }
      if(a.id > b.id)
      {
        return -1;
      }
      return 0;
    }); */

    this.httpClientService.sortByUserId().subscribe(response =>{
      this.sortedUsers = JSON.parse(JSON.stringify(response))

     // console.log("sorted obejcts"+JSON.stringify(this.sortedProjects))
      alert('sorted');
      this.isSorted =true;
      }
      );
  }

  deleteUser(user)
  {
    this.httpClientService.deleteUser(user).subscribe
    (response => {
      alert('deleted successfully');
    });
  }

}
