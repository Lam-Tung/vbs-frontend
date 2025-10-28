import { route } from '@aurelia/router';

@route({
  routes: [
    {
      path: ['', 'bookings'],
      component: import('./page/booking-page/booking-page'),
      title: 'Bookings',
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
