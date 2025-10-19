import { route } from '@aurelia/router';

@route({
  routes: [
    {
      path: ['', 'calendar'],
      component: import('./page/calendar-page/calendar-page'),
      title: 'Calendar',
    },
     {
      path: 'vehicles',
      component: import('./page/vehicle-page/vehicle-page'),
      title: 'Vehicles',
    },
    {
      path: 'about',
      component: import('./page/about-page/about-page'),
      title: 'About',
    },
  ],
  fallback: import('./page/missing-page/missing-page'),
})
export class MyApp {
}
