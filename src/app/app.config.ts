import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { routes } from './app.routes';
import { LoginModule } from './components/login/login.module';
import { HomeModule } from './components/home/home.module';
import { SharedModule } from './shared/shared.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      BrowserModule,
      CommonModule,
      LoginModule,
      HomeModule,
      SharedModule
    ), provideAnimationsAsync(), provideAnimationsAsync()
  ]
};
