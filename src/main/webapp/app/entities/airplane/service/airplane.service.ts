import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAirplane, NewAirplane } from '../airplane.model';

export type PartialUpdateAirplane = Partial<IAirplane> & Pick<IAirplane, 'id'>;

export type EntityResponseType = HttpResponse<IAirplane>;
export type EntityArrayResponseType = HttpResponse<IAirplane[]>;

@Injectable({ providedIn: 'root' })
export class AirplaneService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/airplanes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(airplane: NewAirplane): Observable<EntityResponseType> {
    return this.http.post<IAirplane>(this.resourceUrl, airplane, { observe: 'response' });
  }

  update(airplane: IAirplane): Observable<EntityResponseType> {
    return this.http.put<IAirplane>(`${this.resourceUrl}/${this.getAirplaneIdentifier(airplane)}`, airplane, { observe: 'response' });
  }

  partialUpdate(airplane: PartialUpdateAirplane): Observable<EntityResponseType> {
    return this.http.patch<IAirplane>(`${this.resourceUrl}/${this.getAirplaneIdentifier(airplane)}`, airplane, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAirplane>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAirplane[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAirplaneIdentifier(airplane: Pick<IAirplane, 'id'>): number {
    return airplane.id;
  }

  compareAirplane(o1: Pick<IAirplane, 'id'> | null, o2: Pick<IAirplane, 'id'> | null): boolean {
    return o1 && o2 ? this.getAirplaneIdentifier(o1) === this.getAirplaneIdentifier(o2) : o1 === o2;
  }

  addAirplaneToCollectionIfMissing<Type extends Pick<IAirplane, 'id'>>(
    airplaneCollection: Type[],
    ...airplanesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const airplanes: Type[] = airplanesToCheck.filter(isPresent);
    if (airplanes.length > 0) {
      const airplaneCollectionIdentifiers = airplaneCollection.map(airplaneItem => this.getAirplaneIdentifier(airplaneItem)!);
      const airplanesToAdd = airplanes.filter(airplaneItem => {
        const airplaneIdentifier = this.getAirplaneIdentifier(airplaneItem);
        if (airplaneCollectionIdentifiers.includes(airplaneIdentifier)) {
          return false;
        }
        airplaneCollectionIdentifiers.push(airplaneIdentifier);
        return true;
      });
      return [...airplanesToAdd, ...airplaneCollection];
    }
    return airplaneCollection;
  }
}
