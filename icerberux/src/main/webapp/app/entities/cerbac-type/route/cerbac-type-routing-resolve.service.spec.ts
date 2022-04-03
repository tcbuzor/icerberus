jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ICerbacType, CerbacType } from '../cerbac-type.model';
import { CerbacTypeService } from '../service/cerbac-type.service';

import { CerbacTypeRoutingResolveService } from './cerbac-type-routing-resolve.service';

describe('Service Tests', () => {
  describe('CerbacType routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: CerbacTypeRoutingResolveService;
    let service: CerbacTypeService;
    let resultCerbacType: ICerbacType | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(CerbacTypeRoutingResolveService);
      service = TestBed.inject(CerbacTypeService);
      resultCerbacType = undefined;
    });

    describe('resolve', () => {
      it('should return ICerbacType returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCerbacType = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCerbacType).toEqual({ id: 123 });
      });

      it('should return new ICerbacType if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCerbacType = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultCerbacType).toEqual(new CerbacType());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCerbacType = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCerbacType).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
