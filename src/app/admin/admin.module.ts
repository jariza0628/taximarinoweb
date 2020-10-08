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
import { NewSalesComponent } from './new-sales/new-sales.component';
import { ReceiptComponent } from './new-sales/receipt/receipt.component';
import { ReportComponent } from './report/report.component';
import { DetailComponent } from './report/detail/detail.component';
import { CodebarComponent } from './codebar/codebar.component';
import { ReportAdminComponent } from '../report-admin/report-admin.component';


@NgModule({
  declarations: [
    ProjectListComponent, ProjectCreateComponent, ProjectUpdateComponent,
    ProjectComponent, LoginComponent, ReportAdminComponent, PointSaleComponent, AgencyComponent, SalesComponent,
    IndividualServicesComponent, PlansComponent, NewSalesComponent, ReceiptComponent, ReportComponent, DetailComponent, CodebarComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AngularFirestore],

})
export class AdminModule {
}
