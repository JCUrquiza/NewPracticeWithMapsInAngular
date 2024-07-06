import { Injectable } from '@angular/core';
import { LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Feature } from '../interfaces/places';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map?: Map;
  private markers: Marker[] = [];

  get isMapReady() {
    return !!this.map;
  }

  setMap( map: Map ) {
    this.map = map;
  }

  flyTo( coords: LngLatLike ) {
    if ( !this.isMapReady ) throw Error('El mapa no está inicializado');

    this.map?.flyTo({
      zoom: 14,
      center: coords
    });

  }


  createMarkersFromPlaces(places: Feature[], userLocation: [number, number]) {

    if ( !this.map ) throw Error('Mapa no inicializado');

    this.markers.forEach( marker => marker.remove() );
    const newMarkers = [];

    for(const place of places) {
      const lat = place.properties.coordinates.latitude;
      const lng = place.properties.coordinates.longitude;

      const popup = new Popup()
        .setHTML(`
          <h6>${ place.properties.name }</h6>
          <span>${ place.properties.name_preferred }</span>
        `);

      const newMarker = new Marker()
        .setLngLat([ lng, lat ])
        .setPopup( popup )
        .addTo( this.map! );

      newMarkers.push( newMarker );
    }

    this.markers = newMarkers;
  }

}
