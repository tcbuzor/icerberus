jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ICerbacPolicyRule, CerbacPolicyRule } from '../cerbac-policy-rule.model';
import { CerbacPolicyRuleService } from '../service/cerbac-policy-rule.service';

import { CerbacPolicyRuleRoutingResolveService } from './cerbac-policy-rule-routing-resolve.service';

describe('Service Tests', () => {
  describe('CerbacPolicyRule routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: CerbacPolicyRuleRoutingResolveService;
    let service: CerbacPolicyRuleService;
    let resultCerbacPolicyRule: ICerbacPolicyRule | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(CerbacPolicyRuleRoutingResolveService);
      service = TestBed.inject(CerbacPolicyRuleService);
      resultCerbacPolicyRule = undefined;
    });

    describe('resolve', () => {
      it('should return ICerbacPolicyRule returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCerbacPolicyRule = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCerbacPolicyRule).toEqual({ id: 123 });
      });

      it('should return new ICerbacPolicyRule if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCerbacPolicyRule = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultCerbacPolicyRule).toEqual(new CerbacPolicyRule());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCerbacPolicyRule = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCerbacPolicyRule).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
