import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IUserHistory, NewUserHistory } from '../user-history.model';

export type PartialUpdateUserHistory = Partial<IUserHistory> & Pick<IUserHistory, 'id'>;

type RestOf<T extends IUserHistory | NewUserHistory> = Omit<T, 'issueDate'> & {
  issueDate?: string | null;
};

export type RestUserHistory = RestOf<IUserHistory>;

export type NewRestUserHistory = RestOf<NewUserHistory>;

export type PartialUpdateRestUserHistory = RestOf<PartialUpdateUserHistory>;

export type EntityResponseType = HttpResponse<IUserHistory>;
export type EntityArrayResponseType = HttpResponse<IUserHistory[]>;

@Injectable({ providedIn: 'root' })
export class UserHistoryService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/user-histories');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(userHistory: NewUserHistory): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(userHistory);
    return this.http
      .post<RestUserHistory>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(userHistory: IUserHistory): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(userHistory);
    return this.http
      .put<RestUserHistory>(`${this.resourceUrl}/${this.getUserHistoryIdentifier(userHistory)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(userHistory: PartialUpdateUserHistory): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(userHistory);
    return this.http
      .patch<RestUserHistory>(`${this.resourceUrl}/${this.getUserHistoryIdentifier(userHistory)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestUserHistory>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestUserHistory[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getUserHistoryIdentifier(userHistory: Pick<IUserHistory, 'id'>): number {
    return userHistory.id;
  }

  compareUserHistory(o1: Pick<IUserHistory, 'id'> | null, o2: Pick<IUserHistory, 'id'> | null): boolean {
    return o1 && o2 ? this.getUserHistoryIdentifier(o1) === this.getUserHistoryIdentifier(o2) : o1 === o2;
  }

  addUserHistoryToCollectionIfMissing<Type extends Pick<IUserHistory, 'id'>>(
    userHistoryCollection: Type[],
    ...userHistoriesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const userHistories: Type[] = userHistoriesToCheck.filter(isPresent);
    if (userHistories.length > 0) {
      const userHistoryCollectionIdentifiers = userHistoryCollection.map(
        userHistoryItem => this.getUserHistoryIdentifier(userHistoryItem)!
      );
      const userHistoriesToAdd = userHistories.filter(userHistoryItem => {
        const userHistoryIdentifier = this.getUserHistoryIdentifier(userHistoryItem);
        if (userHistoryCollectionIdentifiers.includes(userHistoryIdentifier)) {
          return false;
        }
        userHistoryCollectionIdentifiers.push(userHistoryIdentifier);
        return true;
      });
      return [...userHistoriesToAdd, ...userHistoryCollection];
    }
    return userHistoryCollection;
  }

  protected convertDateFromClient<T extends IUserHistory | NewUserHistory | PartialUpdateUserHistory>(userHistory: T): RestOf<T> {
    return {
      ...userHistory,
      issueDate: userHistory.issueDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restUserHistory: RestUserHistory): IUserHistory {
    return {
      ...restUserHistory,
      issueDate: restUserHistory.issueDate ? dayjs(restUserHistory.issueDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestUserHistory>): HttpResponse<IUserHistory> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestUserHistory[]>): HttpResponse<IUserHistory[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
