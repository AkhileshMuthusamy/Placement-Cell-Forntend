import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminLayoutComponent} from './admin/admin-layout.component';
import {FacultyLayoutComponent} from './faculty/faculty-layout.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {LoginComponent} from './login/login.component';
import {PlacementLayoutComponent} from './placement/placement-layout.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {AuthGuardService} from './shared/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'reset-password/:token',
    component: ResetPasswordComponent
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'faculty',
    component: FacultyLayoutComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'placement',
    component: PlacementLayoutComponent,
    canActivate: [AuthGuardService]
  },
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
