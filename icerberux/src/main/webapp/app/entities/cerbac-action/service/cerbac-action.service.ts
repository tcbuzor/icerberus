import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICerbacAction, getCerbacActionIdentifier } from '../cerbac-action.model';

export type EntityResponseType = HttpResponse<ICerbacAction>;
export type EntityArrayResponseType = HttpResponse<ICerbacAction[]>;

@Injectable({ providedIn: 'root' })
export class CerbacActionService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/cerbac-actions');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(cerbacAction: ICerbacAction): Observable<EntityResponseType> {
    return this.http.post<ICerbacAction>(this.resourceUrl, cerbacAction, { observe: 'response' });
  }

  update(cerbacAction: ICerbacAction): Observable<EntityResponseType> {
    return this.http.put<ICerbacAction>(`${this.resourceUrl}/${getCerbacActionIdentifier(cerbacAction) as number}`, cerbacAction, {
      observe: 'response',
    });
  }

  partialUpdate(cerbacAction: ICerbacAction): Observable<EntityResponseType> {
    return this.http.patch<ICerbacAction>(`${this.resourceUrl}/${getCerbacActionIdentifier(cerbacAction) as number}`, cerbacAction, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICerbacAction>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICerbacAction[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCerbacActionToCollectionIfMissing(
    cerbacActionCollection: ICerbacAction[],
    ...cerbacActionsToCheck: (ICerbacAction | null | undefined)[]
  ): ICerbacAction[] {
    const cerbacActions: ICerbacAction[] = cerbacActionsToCheck.filter(isPresent);
    if (cerbacActions.length > 0) {
      const cerbacActionCollectionIdentifiers = cerbacActionCollection.map(
        cerbacActionItem => getCerbacActionIdentifier(cerbacActionItem)!
      );
      const cerbacActionsToAdd = cerbacActions.filter(cerbacActionItem => {
        const cerbacActionIdentifier = getCerbacActionIdentifier(cerbacActionItem);
        if (cerbacActionIdentifier == null || cerbacActionCollectionIdentifiers.includes(cerbacActionIdentifier)) {
          return false;
        }
        cerbacActionCollectionIdentifiers.push(cerbacActionIdentifier);
        return true;
      });
      return [...cerbacActionsToAdd, ...cerbacActionCollection];
    }
    return cerbacActionCollection;
  }
}
