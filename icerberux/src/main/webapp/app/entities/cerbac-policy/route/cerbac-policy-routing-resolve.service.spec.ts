jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ICerbacPolicy, CerbacPolicy } from '../cerbac-policy.model';
import { CerbacPolicyService } from '../service/cerbac-policy.service';

import { CerbacPolicyRoutingResolveService } from './cerbac-policy-routing-resolve.service';

describe('Service Tests', () => {
  describe('CerbacPolicy routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: CerbacPolicyRoutingResolveService;
    let service: CerbacPolicyService;
    let resultCerbacPolicy: ICerbacPolicy | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(CerbacPolicyRoutingResolveService);
      service = TestBed.inject(CerbacPolicyService);
      resultCerbacPolicy = undefined;
    });

    describe('resolve', () => {
      it('should return ICerbacPolicy returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCerbacPolicy = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCerbacPolicy).toEqual({ id: 123 });
      });

      it('should return new ICerbacPolicy if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCerbacPolicy = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultCerbacPolicy).toEqual(new CerbacPolicy());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCerbacPolicy = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCerbacPolicy).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
