import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

Mapboxgl.accessToken = 'pk.eyJ1IjoianVhbnVycXVpemEiLCJhIjoiY2x3Y2puYzQ4MHl6azJpbml2emNlcXJ0cyJ9.LJHP1EFX6xB4eM4lZLBEIQ';

if ( !navigator.geolocation ) {
  alert('Navegador no soporta la Geolocalización');
  throw new Error('Navegador no soporta la Geolocalización');
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
