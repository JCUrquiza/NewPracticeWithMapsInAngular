import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places';
import { PlacesApiClient } from '../api/placesApiClient';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public useLocation?: [number, number];

  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return !!this.useLocation;
  }

  constructor(
    private placesApi: PlacesApiClient,
    private mapServie: MapService,
  ) {
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number, number]> {

    return new Promise( (resolve, reject) => {

      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.useLocation = [ coords.longitude, coords.latitude ];
          resolve( this.useLocation )
        },
        ( error ) => {
          alert('No se pudo obtener la geolocalización');
          console.log(error);
          reject();
        }
      )

    });

  }

  getPlacesByQuery( query: string = '' ) {
    // TODO: Evaluar cuando el query es nulo
    if ( query.length === 0 ) {
      this.places = [];
      this.isLoadingPlaces = false;
      return;
    }

    if ( !this.useLocation ) throw Error('No hay userlocation');

    this.isLoadingPlaces = true;

    this.placesApi.get<PlacesResponse>(`/forward?q=${query}%20park&`, {
      params: {
        proximity: this.useLocation.join(',')
      }
    })
      .subscribe( resp => {
        console.log(resp.features);
        this.isLoadingPlaces = false;
        this.places = resp.features;
        this.mapServie.createMarkersFromPlaces( this.places, this.useLocation! );
      });


  }

}
