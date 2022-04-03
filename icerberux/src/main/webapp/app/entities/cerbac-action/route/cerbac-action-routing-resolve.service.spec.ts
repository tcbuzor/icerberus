jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ICerbacAction, CerbacAction } from '../cerbac-action.model';
import { CerbacActionService } from '../service/cerbac-action.service';

import { CerbacActionRoutingResolveService } from './cerbac-action-routing-resolve.service';

describe('Service Tests', () => {
  describe('CerbacAction routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: CerbacActionRoutingResolveService;
    let service: CerbacActionService;
    let resultCerbacAction: ICerbacAction | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(CerbacActionRoutingResolveService);
      service = TestBed.inject(CerbacActionService);
      resultCerbacAction = undefined;
    });

    describe('resolve', () => {
      it('should return ICerbacAction returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCerbacAction = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCerbacAction).toEqual({ id: 123 });
      });

      it('should return new ICerbacAction if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCerbacAction = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultCerbacAction).toEqual(new CerbacAction());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCerbacAction = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCerbacAction).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
