import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";


// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProjectsComponent } from './projects/projects.component';
import { ClientsComponent } from './clients/clients.component';
import { UsersComponent } from './users/users.component';
import { HttpClientModule } from '@angular/common/http';
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    ClientsComponent,
    UsersComponent,
    PaginationComponent
  ],
    imports: [
        BrowserModule,
        RouterModule.forRoot([
            {path: 'dashboard', component: AppComponent},
            {path: 'projects', component: ProjectsComponent},
            {path: 'clients', component: ClientsComponent},
            {path: 'users', component: UsersComponent}
        ]),
        HttpClientModule,
        NgbModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
