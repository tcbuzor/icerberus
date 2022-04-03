jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ICerbacWhoProp, CerbacWhoProp } from '../cerbac-who-prop.model';
import { CerbacWhoPropService } from '../service/cerbac-who-prop.service';

import { CerbacWhoPropRoutingResolveService } from './cerbac-who-prop-routing-resolve.service';

describe('Service Tests', () => {
  describe('CerbacWhoProp routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: CerbacWhoPropRoutingResolveService;
    let service: CerbacWhoPropService;
    let resultCerbacWhoProp: ICerbacWhoProp | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(CerbacWhoPropRoutingResolveService);
      service = TestBed.inject(CerbacWhoPropService);
      resultCerbacWhoProp = undefined;
    });

    describe('resolve', () => {
      it('should return ICerbacWhoProp returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCerbacWhoProp = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCerbacWhoProp).toEqual({ id: 123 });
      });

      it('should return new ICerbacWhoProp if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCerbacWhoProp = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultCerbacWhoProp).toEqual(new CerbacWhoProp());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCerbacWhoProp = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCerbacWhoProp).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
