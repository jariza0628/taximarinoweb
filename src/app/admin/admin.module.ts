import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectUpdateComponent } from './project-update/project-update.component';
import { ProjectComponent } from './project/project.component';
import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PointSaleComponent } from './point-sale/point-sale.component';
import { AgencyComponent } from './agency/agency.component';
import { SalesComponent } from './sales/sales.component';
import { IndividualServicesComponent } from './individual-services/individual-services.component';
import { PlansComponent } from './plans/plans.component';


@NgModule({
  declarations: [
    ProjectListComponent, ProjectCreateComponent, ProjectUpdateComponent,
    ProjectComponent, LoginComponent, PointSaleComponent, AgencyComponent, SalesComponent, IndividualServicesComponent, PlansComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AngularFirestore],

})
export class AdminModule { }
