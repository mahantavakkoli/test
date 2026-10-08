import {
  provideRouter,
  withPreloading,
  PreloadAllModules,
  RouteReuseStrategy,
  withComponentInputBinding,
} from '@angular/router';
import { addIcons } from 'ionicons';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { home, settings, person, search } from 'ionicons/icons';
import { bootstrapApplication } from '@angular/platform-browser';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular';

addIcons({
  home,
  person,
  search,
  settings,
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular({
      useSetInputAPI: true,
      hardwareBackButton: true,
      swipeBackEnabled: false,
    }),
    provideRouter(routes, withPreloading(PreloadAllModules), withComponentInputBinding()),
    provideHttpClient(),
  ],
});
