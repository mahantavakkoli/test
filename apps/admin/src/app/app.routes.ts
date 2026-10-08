import { Route } from '@angular/router';
import { AppLayout } from './layout/app.layout';

export const appRoutes: Route[] = [
  {
    path: '',
    component: AppLayout,
    // children: [
    //   { path: '', component: Dashboard },
    //   { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
    //   { path: 'documentation', component: Documentation },
    //   { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') },
    // ],
  },
];
