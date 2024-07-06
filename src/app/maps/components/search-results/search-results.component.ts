import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { Feature } from '../../interfaces/places';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent {

  public selectedId: string = '';

  constructor(
    private placesService: PlacesService,
    private mapService: MapService,
  ) {}

  get isLoadingPlaces(): Boolean {
    return this.placesService.isLoadingPlaces;
  }

  get places(): Feature[] {
    return this.placesService.places;
  }

  flyTo(place: Feature) {
    this.selectedId = place.id;

    const lat = place.properties.coordinates.latitude;
    const lng = place.properties.coordinates.longitude;
    this.mapService.flyTo([lng, lat]);
  }

  getDirections( place: Feature ) {
    if ( !this.placesService.useLocation ) throw Error('No hay userLocation');

    this.placesService.deletePlaces();

    const start = this.placesService.useLocation;

    const lng = place.properties.coordinates.longitude;
    const lat = place.properties.coordinates.latitude;
    const end = [lng, lat] as [number, number];

    this.mapService.getRouteBetweenPoints(start, end);
  }

}
