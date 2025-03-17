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
import { HistoryReportComponent } from './history-report/history-report.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ComisionComponent } from './comision/comision.component';
import { ReporstGeneralComponent } from './reporst-general/reporst-general.component';
import { CodebarNoveltiesComponent } from "./codebar-novelties/codebar-novelties.component";
import { ReportUsedComponent } from "./report-used/report-used.component";
import { ReportSalesComponent } from "./report-sales/report-sales.component";
import { BoatComponent } from "./boat/boat.component";
import { CloseComponent } from "./close/close.component";
import { ComisionsComponent } from "./comisions/comisions.component";
import { ManillasComponent } from "./manillas/manillas.component";
import { ReportComisionistasComponent } from "./report-comisionistas/report-comisionistas.component";
import { ReporteComisionistasGeneralComponent } from "./reporte-comisionistas-general/reporte-comisionistas-general.component";
import { ClientWhatsappComponent } from "./client-whatsapp/client-whatsapp.component";
import { AdminRutaGuard } from "./adminRuta.guard";
import { adminPuntoVentasGuard } from "./adminPuntoVentas.guard";
import { AdminRutaEspecialGuard } from "./adminRutaEspecial.guard";
import { ReportSalesAuditoriaComponent } from "./report-sales-auditoria/report-sales-auditoria.component";

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
        canActivate: [ AdminRutaGuard],
      },

      {
        path: "services",
        component: IndividualServicesComponent,
        canActivate: [ AdminRutaGuard],
      },
      {
        path: "plans",
        component: PlansComponent,
        canActivate: [ AdminRutaGuard],
      },
      {
        path: "comision",
        component: ComisionComponent,
        canActivate: [AdminGuard],
      },
      {
        path: "new-sales",
        component: NewSalesComponent,
        canActivate: [adminPuntoVentasGuard],
      },
      {
        path: "reports",
        component: ReportComponent,
        canActivate: [AdminGuard],
      },
      {
        path: "reportscomision",
        component: ReportComisionistasComponent,
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
        canActivate: [adminPuntoVentasGuard],
      },

      {
        path: "codebar",
        component: CodebarComponent,
        canActivate: [adminPuntoVentasGuard],
      },
      {
        path: "inventory",
        component: InventoryComponent,
        canActivate: [AdminGuard],
      },

      {
        path: "gestion",
        component: ReportAdminComponent,
        canActivate: [AdminGuard],
      },
      {
        path: "history",
        component: HistoryReportComponent,
        canActivate: [AdminGuard],
      },
      {
        path: "general",
        component: ReporstGeneralComponent,
        canActivate: [AdminGuard],
      },
      {
        path: "codebarnovelty",
        component: CodebarNoveltiesComponent,
        canActivate: [AdminGuard],
      },
      {
        path: "reportseller",
        component: ReportSalesComponent,
        canActivate: [AdminRutaGuard],
      },
      {
        path: "used",
        component: ReportUsedComponent,
        canActivate: [AdminGuard],
      },
      {
        path: "boat",
        component: BoatComponent,
        canActivate: [AdminGuard],
      },
      {
        path: "close",
        component: CloseComponent,
        canActivate: [AdminGuard],
      },
      {
        path: "comisionslog",
        component: ComisionsComponent,
        canActivate: [AdminGuard],
      },
      {
        path: "comisionesgeneral",
        component: ReporteComisionistasGeneralComponent,
        canActivate: [AdminGuard],
      },
      {
        path: "manillas",
        component: ManillasComponent,
        canActivate: [AdminGuard],
      },
      {
        path: "clienteswhatsapp",
        component: ClientWhatsappComponent,
        canActivate: [AdminGuard],
      },
      {
        path: "reportgeneral",
        component: ReportSalesAuditoriaComponent,
        canActivate: [AdminRutaEspecialGuard],
      }
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
