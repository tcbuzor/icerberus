jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ICerbacWhereTarget, CerbacWhereTarget } from '../cerbac-where-target.model';
import { CerbacWhereTargetService } from '../service/cerbac-where-target.service';

import { CerbacWhereTargetRoutingResolveService } from './cerbac-where-target-routing-resolve.service';

describe('Service Tests', () => {
  describe('CerbacWhereTarget routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: CerbacWhereTargetRoutingResolveService;
    let service: CerbacWhereTargetService;
    let resultCerbacWhereTarget: ICerbacWhereTarget | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(CerbacWhereTargetRoutingResolveService);
      service = TestBed.inject(CerbacWhereTargetService);
      resultCerbacWhereTarget = undefined;
    });

    describe('resolve', () => {
      it('should return ICerbacWhereTarget returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCerbacWhereTarget = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCerbacWhereTarget).toEqual({ id: 123 });
      });

      it('should return new ICerbacWhereTarget if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCerbacWhereTarget = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultCerbacWhereTarget).toEqual(new CerbacWhereTarget());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCerbacWhereTarget = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCerbacWhereTarget).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
