import { RouterConfiguration } from '@aurelia/router';
import Aurelia from 'aurelia';
import { OpenAPI } from './api';
import { MyApp } from './my-app';

OpenAPI.BASE = import.meta.env.VITE_API_URL;

Aurelia
  .register(RouterConfiguration)
  // To use HTML5 pushState routes, replace previous line with the following
  // customized router config.
  // .register(RouterConfiguration.customize({ useUrlFragmentHash: false }))
  .app(MyApp)
  .start();
