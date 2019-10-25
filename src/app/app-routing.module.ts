import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddProjectComponent} from '../app/add-project/add-project.component';
import { AddUserComponent} from '../app/add-user/add-user.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';

const routes: Routes = [{path: 'AddProject',component: AddProjectComponent},
{path:'AddUser',component: AddUserComponent},
{path: 'AddTask', component: AddTaskComponent},
{path: 'ViewTask',component:ViewTaskComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
