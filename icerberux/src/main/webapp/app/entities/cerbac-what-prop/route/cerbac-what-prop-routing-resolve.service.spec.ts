jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ICerbacWhatProp, CerbacWhatProp } from '../cerbac-what-prop.model';
import { CerbacWhatPropService } from '../service/cerbac-what-prop.service';

import { CerbacWhatPropRoutingResolveService } from './cerbac-what-prop-routing-resolve.service';

describe('Service Tests', () => {
  describe('CerbacWhatProp routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: CerbacWhatPropRoutingResolveService;
    let service: CerbacWhatPropService;
    let resultCerbacWhatProp: ICerbacWhatProp | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(CerbacWhatPropRoutingResolveService);
      service = TestBed.inject(CerbacWhatPropService);
      resultCerbacWhatProp = undefined;
    });

    describe('resolve', () => {
      it('should return ICerbacWhatProp returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCerbacWhatProp = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCerbacWhatProp).toEqual({ id: 123 });
      });

      it('should return new ICerbacWhatProp if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCerbacWhatProp = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultCerbacWhatProp).toEqual(new CerbacWhatProp());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCerbacWhatProp = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCerbacWhatProp).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
