import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ICerbacOntology, CerbacOntology } from '../cerbac-ontology.model';
import { CerbacOntologyService } from '../service/cerbac-ontology.service';

import { CerbacOntologyRoutingResolveService } from './cerbac-ontology-routing-resolve.service';

describe('CerbacOntology routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: CerbacOntologyRoutingResolveService;
  let service: CerbacOntologyService;
  let resultCerbacOntology: ICerbacOntology | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(CerbacOntologyRoutingResolveService);
    service = TestBed.inject(CerbacOntologyService);
    resultCerbacOntology = undefined;
  });

  describe('resolve', () => {
    it('should return ICerbacOntology returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCerbacOntology = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultCerbacOntology).toEqual({ id: 123 });
    });

    it('should return new ICerbacOntology if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCerbacOntology = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultCerbacOntology).toEqual(new CerbacOntology());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as CerbacOntology })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCerbacOntology = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultCerbacOntology).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
