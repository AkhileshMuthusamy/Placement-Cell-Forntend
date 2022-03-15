import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AdminLayoutComponent} from './admin/admin-layout.component';
import {AdminProfileComponent} from './admin/admin-profile/admin-profile.component';
import {ManageFacultyComponent} from './admin/manage-faculty/manage-faculty.component';
import {ManageStudentComponent} from './admin/manage-student/manage-student.component';
import {RegisterUserComponent} from './admin/register-user/register-user.component';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {FacultyLayoutComponent} from './faculty/faculty-layout.component';
import {FacultyProfileComponent} from './faculty/faculty-profile/faculty-profile.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {LoginComponent} from './login/login.component';
import {PlacementLayoutComponent} from './placement/placement-layout.component';
import {PlacementProfileComponent} from './placement/placement-profile/placement-profile.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {HttpInterceptorService} from './shared/services/http-interceptor.service';
import {StudentLayoutComponent} from './student/student-layout.component';
import {StudentProfileComponent} from './student/student-profile/student-profile.component';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    AppComponent,
    FacultyLayoutComponent,
    ForgotPasswordComponent,
    LoginComponent,
    ManageFacultyComponent,
    PlacementLayoutComponent,
    RegisterUserComponent,
    ResetPasswordComponent,
    StudentLayoutComponent,
    ChangePasswordComponent,
    AdminProfileComponent,
    FacultyProfileComponent,
    PlacementProfileComponent,
    StudentProfileComponent,
    ManageStudentComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
