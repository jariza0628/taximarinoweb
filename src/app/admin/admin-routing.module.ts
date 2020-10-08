import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProjectComponent } from "./project/project.component";
import { ProjectListComponent } from "./project-list/project-list.component";
import { ProjectCreateComponent } from "./project-create/project-create.component";
import { ProjectUpdateComponent } from "./project-update/project-update.component";
import { LoginComponent } from "./login/login.component";
import { AdminGuard } from "./admin.guard";
import { PointSaleComponent } from "./point-sale/point-sale.component";
import { AgencyComponent } from "./agency/agency.component";
import { SalesComponent } from "./sales/sales.component";
import { IndividualServicesComponent } from "./individual-services/individual-services.component";
import { PlansComponent } from "./plans/plans.component";
import { NewSalesComponent } from "./new-sales/new-sales.component";
import { ReceiptComponent } from "./new-sales/receipt/receipt.component";
import { ReportComponent } from "./report/report.component";
import { DetailComponent } from "./report/detail/detail.component";
import { CodebarComponent } from "./codebar/codebar.component";
import { ReportAdminComponent } from "../report-admin/report-admin.component";

const routes: Routes = [
  {
    path: "admin",
    component: ProjectComponent,
    children: [
      {
        path: "sales",
        component: SalesComponent,
        canActivate: [AdminGuard],
      },
      {
        path: "list",
        component: SalesComponent,
        canActivate: [AdminGuard],
      },
      {
        path: "create",
        component: ProjectCreateComponent,
        canActivate: [AdminGuard],
      },
      {
        path: "update",
        component: ProjectUpdateComponent,
        canActivate: [AdminGuard],
      },
      {
        path: "ponitsale",
        component: PointSaleComponent,
        canActivate: [AdminGuard],
      },
      {
        path: "agency",
        component: AgencyComponent,
        canActivate: [AdminGuard],
      },

      {
        path: "services",
        component: IndividualServicesComponent,
        canActivate: [AdminGuard],
      },
      {
        path: "plans",
        component: PlansComponent,
        canActivate: [AdminGuard],
      },
      {
        path: "new-sales",
        component: NewSalesComponent,
        canActivate: [AdminGuard],
      },
      {
        path: "reports",
        component: ReportComponent,
        canActivate: [AdminGuard],
      },
      {
        path: "reports-detail/:id",
        component: DetailComponent,
        canActivate: [AdminGuard],
      },
      {
        path: "daily-reports",
        loadChildren: "./reports/reports.module#ReportsModule",
        canActivate: [AdminGuard],
      },

      {
        path: "codebar",
        component: CodebarComponent,
        canActivate: [AdminGuard],
      },

      {
        path: "gestion",
        component: ReportAdminComponent,
        canActivate: [AdminGuard],
      },
    ],
  },
  {
    path: "login",
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
