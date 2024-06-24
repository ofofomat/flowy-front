import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
  ],
  imports: [   
    CommonModule,
    HttpClientModule,
    HttpClientXsrfModule
  ],
  exports: [
  ],
  providers: [    
    RouterModule,
    HttpClient
  ]
})
export class CoreModule { }