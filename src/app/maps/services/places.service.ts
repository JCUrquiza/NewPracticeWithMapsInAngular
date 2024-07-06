import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Feature, PlacesResponse } from '../interfaces/places';

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
    private http: HttpClient
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

    this.isLoadingPlaces = true;

    this.http.get<PlacesResponse>(`https://api.mapbox.com/search/geocode/v6/forward?q=${query}%20park&proximity=-99.13677199054422%2C19.442285518839626&access_token=pk.eyJ1IjoianVhbnVycXVpemEiLCJhIjoiY2x3Y2puYzQ4MHl6azJpbml2emNlcXJ0cyJ9.LJHP1EFX6xB4eM4lZLBEIQ`)
      .subscribe( resp => {
        console.log(resp.features);
        this.isLoadingPlaces = false;
        this.places = resp.features;
      });


  }

}
