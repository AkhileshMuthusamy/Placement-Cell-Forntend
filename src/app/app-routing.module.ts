import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminLayoutComponent} from './admin/admin-layout.component';
import {AppComponent} from './app.component';
import {FacultyLayoutComponent} from './faculty/faculty-layout.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {LoginComponent} from './login/login.component';
import {PlacementLayoutComponent} from './placement/placement-layout.component';

const routes: Routes = [
  {
    path: '', component: AppComponent,
    children: [
      {
        path: 'admin',
        component: AdminLayoutComponent
      },
      {
        path: 'faculty',
        component: FacultyLayoutComponent
      },
      {
        path: 'placement',
        component: PlacementLayoutComponent
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
