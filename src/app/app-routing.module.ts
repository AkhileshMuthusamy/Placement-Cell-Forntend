import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminLayoutComponent} from './admin/admin-layout.component';
import {AdminProfileComponent} from './admin/admin-profile/admin-profile.component';
import {ManageFacultyComponent} from './admin/manage-faculty/manage-faculty.component';
import {FacultyLayoutComponent} from './faculty/faculty-layout.component';
import {FacultyProfileComponent} from './faculty/faculty-profile/faculty-profile.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {LoginComponent} from './login/login.component';
import {PlacementLayoutComponent} from './placement/placement-layout.component';
import {PlacementProfileComponent} from './placement/placement-profile/placement-profile.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {AuthGuardService} from './shared/services/auth-guard.service';
import {StudentLayoutComponent} from './student/student-layout.component';
import {StudentProfileComponent} from './student/student-profile/student-profile.component';

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
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'profile',
        component: AdminProfileComponent
      },
      {
        path: 'manage-faculty',
        component: ManageFacultyComponent
      }
    ]
  },
  {
    path: 'faculty',
    component: FacultyLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'profile',
        component: FacultyProfileComponent
      },
    ]
  },
  {
    path: 'placement',
    component: PlacementLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'profile',
        component: PlacementProfileComponent
      },
    ]
  },
  {
    path: 'student',
    component: StudentLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'profile',
        component: StudentProfileComponent
      },
    ]
  },
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
