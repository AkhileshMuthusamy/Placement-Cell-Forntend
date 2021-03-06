import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule
} from '@angular-material-components/datetime-picker';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
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
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxEditorModule} from 'ngx-editor';
import {AdminLayoutComponent} from './admin/admin-layout.component';
import {AdminProfileComponent} from './admin/admin-profile/admin-profile.component';
import {EditAdminProfileComponent} from './admin/edit-admin-profile/edit-admin-profile.component';
import {EditUserComponent} from './admin/edit-user/edit-user.component';
import {ManageFacultyComponent} from './admin/manage-faculty/manage-faculty.component';
import {ManageStudentComponent} from './admin/manage-student/manage-student.component';
import {RegisterUserComponent} from './admin/register-user/register-user.component';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {EditFacultyProfileComponent} from './faculty/edit-faculty-profile/edit-faculty-profile.component';
import {FacultyActivityComponent} from './faculty/faculty-activity/faculty-activity.component';
import {FacultyLayoutComponent} from './faculty/faculty-layout.component';
import {FacultyProfileComponent} from './faculty/faculty-profile/faculty-profile.component';
import {UploadGradeComponent} from './faculty/upload-grade/upload-grade.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {LoginComponent} from './login/login.component';
import {EditPlacementProfileComponent} from './placement/edit-placement-profile/edit-placement-profile.component';
import {AddEditEventComponent} from './placement/event/add-edit-event/add-edit-event.component';
import {ManageEventComponent} from './placement/event/manage-event/manage-event.component';
import {AddSkillComponent} from './placement/manage-skill/add-skill/add-skill.component';
import {ManageSkillComponent} from './placement/manage-skill/manage-skill.component';
import {PlacementLayoutComponent} from './placement/placement-layout.component';
import {PlacementProfileComponent} from './placement/placement-profile/placement-profile.component';
import {SendEmailComponent} from './placement/skill-support/send-email/send-email.component';
import {SkillSupportComponent} from './placement/skill-support/skill-support.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {DragDropDirective} from './shared/directives/drag-drop.directive';
import {LoaderDirective} from './shared/directives/loader.directive';
import {OrderByPipe} from './shared/pipes/order-by.pipe';
import {HttpInterceptorService} from './shared/services/http-interceptor.service';
import {EditStudentProfileComponent} from './student/edit-student-profile/edit-student-profile.component';
import {StudentGradeComponent} from './student/student-grade/student-grade.component';
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
    EditStudentProfileComponent,
    EditPlacementProfileComponent,
    EditFacultyProfileComponent,
    EditAdminProfileComponent,
    UploadGradeComponent,
    LoaderDirective,
    DragDropDirective,
    EditUserComponent,
    StudentGradeComponent,
    FacultyActivityComponent,
    OrderByPipe,
    ManageEventComponent,
    AddEditEventComponent,
    SkillSupportComponent,
    SendEmailComponent,
    ManageSkillComponent,
    AddSkillComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
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
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    NgxEditorModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
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
