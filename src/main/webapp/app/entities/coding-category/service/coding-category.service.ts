import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICodingCategory, NewCodingCategory } from '../coding-category.model';

export type PartialUpdateCodingCategory = Partial<ICodingCategory> & Pick<ICodingCategory, 'id'>;

export type EntityResponseType = HttpResponse<ICodingCategory>;
export type EntityArrayResponseType = HttpResponse<ICodingCategory[]>;

@Injectable({ providedIn: 'root' })
export class CodingCategoryService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/coding-categories');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(codingCategory: NewCodingCategory): Observable<EntityResponseType> {
    return this.http.post<ICodingCategory>(this.resourceUrl, codingCategory, { observe: 'response' });
  }

  update(codingCategory: ICodingCategory): Observable<EntityResponseType> {
    return this.http.put<ICodingCategory>(`${this.resourceUrl}/${this.getCodingCategoryIdentifier(codingCategory)}`, codingCategory, {
      observe: 'response',
    });
  }

  partialUpdate(codingCategory: PartialUpdateCodingCategory): Observable<EntityResponseType> {
    return this.http.patch<ICodingCategory>(`${this.resourceUrl}/${this.getCodingCategoryIdentifier(codingCategory)}`, codingCategory, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICodingCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICodingCategory[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCodingCategoryIdentifier(codingCategory: Pick<ICodingCategory, 'id'>): number {
    return codingCategory.id;
  }

  compareCodingCategory(o1: Pick<ICodingCategory, 'id'> | null, o2: Pick<ICodingCategory, 'id'> | null): boolean {
    return o1 && o2 ? this.getCodingCategoryIdentifier(o1) === this.getCodingCategoryIdentifier(o2) : o1 === o2;
  }

  addCodingCategoryToCollectionIfMissing<Type extends Pick<ICodingCategory, 'id'>>(
    codingCategoryCollection: Type[],
    ...codingCategoriesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const codingCategories: Type[] = codingCategoriesToCheck.filter(isPresent);
    if (codingCategories.length > 0) {
      const codingCategoryCollectionIdentifiers = codingCategoryCollection.map(
        codingCategoryItem => this.getCodingCategoryIdentifier(codingCategoryItem)!
      );
      const codingCategoriesToAdd = codingCategories.filter(codingCategoryItem => {
        const codingCategoryIdentifier = this.getCodingCategoryIdentifier(codingCategoryItem);
        if (codingCategoryCollectionIdentifiers.includes(codingCategoryIdentifier)) {
          return false;
        }
        codingCategoryCollectionIdentifiers.push(codingCategoryIdentifier);
        return true;
      });
      return [...codingCategoriesToAdd, ...codingCategoryCollection];
    }
    return codingCategoryCollection;
  }
}
