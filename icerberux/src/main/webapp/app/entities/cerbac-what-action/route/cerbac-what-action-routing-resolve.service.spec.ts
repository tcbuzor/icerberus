jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ICerbacWhatAction, CerbacWhatAction } from '../cerbac-what-action.model';
import { CerbacWhatActionService } from '../service/cerbac-what-action.service';

import { CerbacWhatActionRoutingResolveService } from './cerbac-what-action-routing-resolve.service';

describe('Service Tests', () => {
  describe('CerbacWhatAction routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: CerbacWhatActionRoutingResolveService;
    let service: CerbacWhatActionService;
    let resultCerbacWhatAction: ICerbacWhatAction | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(CerbacWhatActionRoutingResolveService);
      service = TestBed.inject(CerbacWhatActionService);
      resultCerbacWhatAction = undefined;
    });

    describe('resolve', () => {
      it('should return ICerbacWhatAction returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCerbacWhatAction = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCerbacWhatAction).toEqual({ id: 123 });
      });

      it('should return new ICerbacWhatAction if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCerbacWhatAction = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultCerbacWhatAction).toEqual(new CerbacWhatAction());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCerbacWhatAction = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCerbacWhatAction).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
