import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppRoutingModule } from './app/app-routing.module';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      CommonModule,
      BrowserModule,
      AppRoutingModule,
      RouterOutlet,
      MatSidenavModule,
      MatListModule,
      MatToolbarModule,
      MatIconModule,
      MatButtonModule,
    ),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
  ],
}).catch((err) => console.error(err));
