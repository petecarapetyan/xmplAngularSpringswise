import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFrog, NewFrog } from '../frog.model';

export type PartialUpdateFrog = Partial<IFrog> & Pick<IFrog, 'id'>;

export type EntityResponseType = HttpResponse<IFrog>;
export type EntityArrayResponseType = HttpResponse<IFrog[]>;

@Injectable({ providedIn: 'root' })
export class FrogService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/frogs');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(frog: NewFrog): Observable<EntityResponseType> {
    return this.http.post<IFrog>(this.resourceUrl, frog, { observe: 'response' });
  }

  update(frog: IFrog): Observable<EntityResponseType> {
    return this.http.put<IFrog>(`${this.resourceUrl}/${this.getFrogIdentifier(frog)}`, frog, { observe: 'response' });
  }

  partialUpdate(frog: PartialUpdateFrog): Observable<EntityResponseType> {
    return this.http.patch<IFrog>(`${this.resourceUrl}/${this.getFrogIdentifier(frog)}`, frog, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFrog>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFrog[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getFrogIdentifier(frog: Pick<IFrog, 'id'>): number {
    return frog.id;
  }

  compareFrog(o1: Pick<IFrog, 'id'> | null, o2: Pick<IFrog, 'id'> | null): boolean {
    return o1 && o2 ? this.getFrogIdentifier(o1) === this.getFrogIdentifier(o2) : o1 === o2;
  }

  addFrogToCollectionIfMissing<Type extends Pick<IFrog, 'id'>>(
    frogCollection: Type[],
    ...frogsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const frogs: Type[] = frogsToCheck.filter(isPresent);
    if (frogs.length > 0) {
      const frogCollectionIdentifiers = frogCollection.map(frogItem => this.getFrogIdentifier(frogItem)!);
      const frogsToAdd = frogs.filter(frogItem => {
        const frogIdentifier = this.getFrogIdentifier(frogItem);
        if (frogCollectionIdentifiers.includes(frogIdentifier)) {
          return false;
        }
        frogCollectionIdentifiers.push(frogIdentifier);
        return true;
      });
      return [...frogsToAdd, ...frogCollection];
    }
    return frogCollection;
  }
}
