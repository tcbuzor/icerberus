jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ICerbacEntityProp, CerbacEntityProp } from '../cerbac-entity-prop.model';
import { CerbacEntityPropService } from '../service/cerbac-entity-prop.service';

import { CerbacEntityPropRoutingResolveService } from './cerbac-entity-prop-routing-resolve.service';

describe('Service Tests', () => {
  describe('CerbacEntityProp routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: CerbacEntityPropRoutingResolveService;
    let service: CerbacEntityPropService;
    let resultCerbacEntityProp: ICerbacEntityProp | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(CerbacEntityPropRoutingResolveService);
      service = TestBed.inject(CerbacEntityPropService);
      resultCerbacEntityProp = undefined;
    });

    describe('resolve', () => {
      it('should return ICerbacEntityProp returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCerbacEntityProp = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCerbacEntityProp).toEqual({ id: 123 });
      });

      it('should return new ICerbacEntityProp if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCerbacEntityProp = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultCerbacEntityProp).toEqual(new CerbacEntityProp());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCerbacEntityProp = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCerbacEntityProp).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
