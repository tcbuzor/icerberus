import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICerbacWhatAction, getCerbacWhatActionIdentifier } from '../cerbac-what-action.model';

export type EntityResponseType = HttpResponse<ICerbacWhatAction>;
export type EntityArrayResponseType = HttpResponse<ICerbacWhatAction[]>;

@Injectable({ providedIn: 'root' })
export class CerbacWhatActionService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/cerbac-what-actions');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(cerbacWhatAction: ICerbacWhatAction): Observable<EntityResponseType> {
    return this.http.post<ICerbacWhatAction>(this.resourceUrl, cerbacWhatAction, { observe: 'response' });
  }

  update(cerbacWhatAction: ICerbacWhatAction): Observable<EntityResponseType> {
    return this.http.put<ICerbacWhatAction>(
      `${this.resourceUrl}/${getCerbacWhatActionIdentifier(cerbacWhatAction) as number}`,
      cerbacWhatAction,
      { observe: 'response' }
    );
  }

  partialUpdate(cerbacWhatAction: ICerbacWhatAction): Observable<EntityResponseType> {
    return this.http.patch<ICerbacWhatAction>(
      `${this.resourceUrl}/${getCerbacWhatActionIdentifier(cerbacWhatAction) as number}`,
      cerbacWhatAction,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICerbacWhatAction>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICerbacWhatAction[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCerbacWhatActionToCollectionIfMissing(
    cerbacWhatActionCollection: ICerbacWhatAction[],
    ...cerbacWhatActionsToCheck: (ICerbacWhatAction | null | undefined)[]
  ): ICerbacWhatAction[] {
    const cerbacWhatActions: ICerbacWhatAction[] = cerbacWhatActionsToCheck.filter(isPresent);
    if (cerbacWhatActions.length > 0) {
      const cerbacWhatActionCollectionIdentifiers = cerbacWhatActionCollection.map(
        cerbacWhatActionItem => getCerbacWhatActionIdentifier(cerbacWhatActionItem)!
      );
      const cerbacWhatActionsToAdd = cerbacWhatActions.filter(cerbacWhatActionItem => {
        const cerbacWhatActionIdentifier = getCerbacWhatActionIdentifier(cerbacWhatActionItem);
        if (cerbacWhatActionIdentifier == null || cerbacWhatActionCollectionIdentifiers.includes(cerbacWhatActionIdentifier)) {
          return false;
        }
        cerbacWhatActionCollectionIdentifiers.push(cerbacWhatActionIdentifier);
        return true;
      });
      return [...cerbacWhatActionsToAdd, ...cerbacWhatActionCollection];
    }
    return cerbacWhatActionCollection;
  }
}
