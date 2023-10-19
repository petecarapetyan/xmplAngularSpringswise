import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IScoreType, NewScoreType } from '../score-type.model';

export type PartialUpdateScoreType = Partial<IScoreType> & Pick<IScoreType, 'id'>;

export type EntityResponseType = HttpResponse<IScoreType>;
export type EntityArrayResponseType = HttpResponse<IScoreType[]>;

@Injectable({ providedIn: 'root' })
export class ScoreTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/score-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(scoreType: NewScoreType): Observable<EntityResponseType> {
    return this.http.post<IScoreType>(this.resourceUrl, scoreType, { observe: 'response' });
  }

  update(scoreType: IScoreType): Observable<EntityResponseType> {
    return this.http.put<IScoreType>(`${this.resourceUrl}/${this.getScoreTypeIdentifier(scoreType)}`, scoreType, { observe: 'response' });
  }

  partialUpdate(scoreType: PartialUpdateScoreType): Observable<EntityResponseType> {
    return this.http.patch<IScoreType>(`${this.resourceUrl}/${this.getScoreTypeIdentifier(scoreType)}`, scoreType, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IScoreType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IScoreType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getScoreTypeIdentifier(scoreType: Pick<IScoreType, 'id'>): number {
    return scoreType.id;
  }

  compareScoreType(o1: Pick<IScoreType, 'id'> | null, o2: Pick<IScoreType, 'id'> | null): boolean {
    return o1 && o2 ? this.getScoreTypeIdentifier(o1) === this.getScoreTypeIdentifier(o2) : o1 === o2;
  }

  addScoreTypeToCollectionIfMissing<Type extends Pick<IScoreType, 'id'>>(
    scoreTypeCollection: Type[],
    ...scoreTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const scoreTypes: Type[] = scoreTypesToCheck.filter(isPresent);
    if (scoreTypes.length > 0) {
      const scoreTypeCollectionIdentifiers = scoreTypeCollection.map(scoreTypeItem => this.getScoreTypeIdentifier(scoreTypeItem)!);
      const scoreTypesToAdd = scoreTypes.filter(scoreTypeItem => {
        const scoreTypeIdentifier = this.getScoreTypeIdentifier(scoreTypeItem);
        if (scoreTypeCollectionIdentifiers.includes(scoreTypeIdentifier)) {
          return false;
        }
        scoreTypeCollectionIdentifiers.push(scoreTypeIdentifier);
        return true;
      });
      return [...scoreTypesToAdd, ...scoreTypeCollection];
    }
    return scoreTypeCollection;
  }
}
