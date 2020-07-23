import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ɵMatchMedia, BreakPointRegistry, PrintHook } from '@angular/flex-layout/core';
import {
  StyleUtils, StylesheetMap, LayoutStyleBuilder,
  MediaMarshaller, FlexAlignStyleBuilder,LayoutAlignStyleBuilder, FlexStyleBuilder
} from '@angular/flex-layout';

import { AppComponent } from './app.component';

//Angular Material Components
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AnnouncementComponent } from './announcement/announcement.component';
import { AnnouncementPreviewComponent } from './announcement/announcement-preview/announcement-preview.component';
import { AnnouncementCreateComponent } from './announcement/announcement-create/announcement-create.component';
import { AnnouncementDetailsComponent } from './announcement/announcement-details/announcement-details.component';
import { AnnouncementEditComponent } from './announcement/announcement-edit/announcement-edit.component';
import { SimilarAnnouncementComponent } from './announcement/announcement-details/similar-announcement/similar-announcement.component';

@NgModule({
  declarations: [
    AppComponent,
    AnnouncementComponent,
    AnnouncementPreviewComponent,
    AnnouncementCreateComponent,
    AnnouncementDetailsComponent,
    AnnouncementEditComponent,
    SimilarAnnouncementComponent
  ],
  imports: [
    FlexLayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: AnnouncementComponent, pathMatch: 'full' },
      { path: 'create', component: AnnouncementCreateComponent },
      { path: 'details/:id', component: AnnouncementDetailsComponent },
      { path: 'edit/:id', component: AnnouncementEditComponent }
    ])
  ],
  providers: [
    StyleUtils, StylesheetMap, MediaMarshaller, ɵMatchMedia, BreakPointRegistry,
    PrintHook, LayoutStyleBuilder,
    FlexAlignStyleBuilder,
    LayoutAlignStyleBuilder,
    FlexStyleBuilder
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
