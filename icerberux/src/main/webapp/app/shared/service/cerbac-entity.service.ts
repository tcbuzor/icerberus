import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import {getCerbacEntityIdentifier, ICerbacEntity} from "app/shared/model/cerbac-entity.model";


export type EntityResponseType = HttpResponse<ICerbacEntity>;
export type EntityArrayResponseType = HttpResponse<ICerbacEntity[]>;

@Injectable({ providedIn: 'root' })
export class CerbacEntityService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/cerbac-entities');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(cerbacEntity: ICerbacEntity): Observable<EntityResponseType> {
    return this.http.post<ICerbacEntity>(this.resourceUrl, cerbacEntity, { observe: 'response' });
  }

  update(cerbacEntity: ICerbacEntity): Observable<EntityResponseType> {
    return this.http.put<ICerbacEntity>(`${this.resourceUrl}/${getCerbacEntityIdentifier(cerbacEntity) as number}`, cerbacEntity, {
      observe: 'response',
    });
  }

  partialUpdate(cerbacEntity: ICerbacEntity): Observable<EntityResponseType> {
    return this.http.patch<ICerbacEntity>(`${this.resourceUrl}/${getCerbacEntityIdentifier(cerbacEntity) as number}`, cerbacEntity, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICerbacEntity>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICerbacEntity[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCerbacEntityToCollectionIfMissing(
    cerbacEntityCollection: ICerbacEntity[],
    ...cerbacEntitiesToCheck: (ICerbacEntity | null | undefined)[]
  ): ICerbacEntity[] {
    const cerbacEntities: ICerbacEntity[] = cerbacEntitiesToCheck.filter(isPresent);
    if (cerbacEntities.length > 0) {
      const cerbacEntityCollectionIdentifiers = cerbacEntityCollection.map(
        cerbacEntityItem => getCerbacEntityIdentifier(cerbacEntityItem)!
      );
      const cerbacEntitiesToAdd = cerbacEntities.filter(cerbacEntityItem => {
        const cerbacEntityIdentifier = getCerbacEntityIdentifier(cerbacEntityItem);
        if (cerbacEntityIdentifier == null || cerbacEntityCollectionIdentifiers.includes(cerbacEntityIdentifier)) {
          return false;
        }
        cerbacEntityCollectionIdentifiers.push(cerbacEntityIdentifier);
        return true;
      });
      return [...cerbacEntitiesToAdd, ...cerbacEntityCollection];
    }
    return cerbacEntityCollection;
  }
}
