import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StandardComponent } from './standard/standard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";

import {ClipboardModule} from '@angular/cdk/clipboard';



@NgModule({
  declarations: [
    AppComponent,
    StandardComponent,
    
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    ClipboardModule,
    MatSelectModule,
    MatSnackBarModule,
    AppRoutingModule,
    MatOptionModule,
    FormsModule      ,
    MatButtonModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
