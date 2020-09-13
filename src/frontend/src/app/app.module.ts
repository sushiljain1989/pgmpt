import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProjectsComponent } from './projects/projects.component';
import { ClientsComponent } from './clients/clients.component';
import { UsersComponent } from './users/users.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    ClientsComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'dashboard', component: AppComponent},
      {path: 'projects', component: ProjectsComponent},
      {path: 'clients', component: ClientsComponent},
      {path: 'users', component: UsersComponent}
    ]),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
