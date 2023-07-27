import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './components/table/table.component';
import {MatTableModule} from "@angular/material/table";
import {MatToolbarModule} from "@angular/material/toolbar";
import {HttpClientModule} from "@angular/common/http";
import {MatIconModule} from "@angular/material/icon";
import { QuotesInputComponent } from './components/quotes-input/quotes-input.component';
import { NavComponent } from './components/nav/nav.component';
import {MatButtonModule} from "@angular/material/button";
import {NgOptimizedImage} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from '@angular/material/input';
import {NgFor} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReplaceComponent } from './components/replace/replace.component';
import { SqlgeneratorComponent } from './components/sqlgenerator/sqlgenerator.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatProgressBarModule} from "@angular/material/progress-bar";


@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    QuotesInputComponent,
    NavComponent,
    ReplaceComponent,
    SqlgeneratorComponent,
  ],
    imports: [
        MatFormFieldModule,
        MatSelectModule,
        NgFor,
        MatInputModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatToolbarModule,
        HttpClientModule,
        MatIconModule,
        MatButtonModule,
        NgOptimizedImage,
        ReactiveFormsModule,
        FormsModule,
        MatCheckboxModule,
        MatProgressBarModule,
        MatProgressSpinnerModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
