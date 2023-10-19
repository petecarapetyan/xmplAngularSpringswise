import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISpringProject, NewSpringProject } from '../spring-project.model';

export type PartialUpdateSpringProject = Partial<ISpringProject> & Pick<ISpringProject, 'id'>;

export type EntityResponseType = HttpResponse<ISpringProject>;
export type EntityArrayResponseType = HttpResponse<ISpringProject[]>;

@Injectable({ providedIn: 'root' })
export class SpringProjectService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/spring-projects');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(springProject: NewSpringProject): Observable<EntityResponseType> {
    return this.http.post<ISpringProject>(this.resourceUrl, springProject, { observe: 'response' });
  }

  update(springProject: ISpringProject): Observable<EntityResponseType> {
    return this.http.put<ISpringProject>(`${this.resourceUrl}/${this.getSpringProjectIdentifier(springProject)}`, springProject, {
      observe: 'response',
    });
  }

  partialUpdate(springProject: PartialUpdateSpringProject): Observable<EntityResponseType> {
    return this.http.patch<ISpringProject>(`${this.resourceUrl}/${this.getSpringProjectIdentifier(springProject)}`, springProject, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISpringProject>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISpringProject[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getSpringProjectIdentifier(springProject: Pick<ISpringProject, 'id'>): number {
    return springProject.id;
  }

  compareSpringProject(o1: Pick<ISpringProject, 'id'> | null, o2: Pick<ISpringProject, 'id'> | null): boolean {
    return o1 && o2 ? this.getSpringProjectIdentifier(o1) === this.getSpringProjectIdentifier(o2) : o1 === o2;
  }

  addSpringProjectToCollectionIfMissing<Type extends Pick<ISpringProject, 'id'>>(
    springProjectCollection: Type[],
    ...springProjectsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const springProjects: Type[] = springProjectsToCheck.filter(isPresent);
    if (springProjects.length > 0) {
      const springProjectCollectionIdentifiers = springProjectCollection.map(
        springProjectItem => this.getSpringProjectIdentifier(springProjectItem)!
      );
      const springProjectsToAdd = springProjects.filter(springProjectItem => {
        const springProjectIdentifier = this.getSpringProjectIdentifier(springProjectItem);
        if (springProjectCollectionIdentifiers.includes(springProjectIdentifier)) {
          return false;
        }
        springProjectCollectionIdentifiers.push(springProjectIdentifier);
        return true;
      });
      return [...springProjectsToAdd, ...springProjectCollection];
    }
    return springProjectCollection;
  }
}
