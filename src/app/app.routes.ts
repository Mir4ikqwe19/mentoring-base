import { Routes } from '@angular/router';
import { UsersListComponent } from './users/users-list/users-list.component';
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { TodosListComponent } from './todos/todos-list/todos-list.component';

export const routes: Routes = [
    {path: '', component: HomepageComponent},
    {path: 'users', component: UsersListComponent},
    {path: 'todos', component: TodosListComponent},
];
