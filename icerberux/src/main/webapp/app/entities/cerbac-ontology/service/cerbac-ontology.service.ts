import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICerbacOntology, getCerbacOntologyIdentifier } from '../cerbac-ontology.model';

export type EntityResponseType = HttpResponse<ICerbacOntology>;
export type EntityArrayResponseType = HttpResponse<ICerbacOntology[]>;

@Injectable({ providedIn: 'root' })
export class CerbacOntologyService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/cerbac-ontologies');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(cerbacOntology: ICerbacOntology): Observable<EntityResponseType> {
    return this.http.post<ICerbacOntology>(this.resourceUrl, cerbacOntology, { observe: 'response' });
  }

  update(cerbacOntology: ICerbacOntology): Observable<EntityResponseType> {
    return this.http.put<ICerbacOntology>(`${this.resourceUrl}/${getCerbacOntologyIdentifier(cerbacOntology) as number}`, cerbacOntology, {
      observe: 'response',
    });
  }

  partialUpdate(cerbacOntology: ICerbacOntology): Observable<EntityResponseType> {
    return this.http.patch<ICerbacOntology>(
      `${this.resourceUrl}/${getCerbacOntologyIdentifier(cerbacOntology) as number}`,
      cerbacOntology,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICerbacOntology>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICerbacOntology[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCerbacOntologyToCollectionIfMissing(
    cerbacOntologyCollection: ICerbacOntology[],
    ...cerbacOntologiesToCheck: (ICerbacOntology | null | undefined)[]
  ): ICerbacOntology[] {
    const cerbacOntologies: ICerbacOntology[] = cerbacOntologiesToCheck.filter(isPresent);
    if (cerbacOntologies.length > 0) {
      const cerbacOntologyCollectionIdentifiers = cerbacOntologyCollection.map(
        cerbacOntologyItem => getCerbacOntologyIdentifier(cerbacOntologyItem)!
      );
      const cerbacOntologiesToAdd = cerbacOntologies.filter(cerbacOntologyItem => {
        const cerbacOntologyIdentifier = getCerbacOntologyIdentifier(cerbacOntologyItem);
        if (cerbacOntologyIdentifier == null || cerbacOntologyCollectionIdentifiers.includes(cerbacOntologyIdentifier)) {
          return false;
        }
        cerbacOntologyCollectionIdentifiers.push(cerbacOntologyIdentifier);
        return true;
      });
      return [...cerbacOntologiesToAdd, ...cerbacOntologyCollection];
    }
    return cerbacOntologyCollection;
  }
}
