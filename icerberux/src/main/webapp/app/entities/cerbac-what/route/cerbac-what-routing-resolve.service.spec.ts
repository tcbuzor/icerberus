jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ICerbacWhat, CerbacWhat } from '../cerbac-what.model';
import { CerbacWhatService } from '../service/cerbac-what.service';

import { CerbacWhatRoutingResolveService } from './cerbac-what-routing-resolve.service';

describe('Service Tests', () => {
  describe('CerbacWhat routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: CerbacWhatRoutingResolveService;
    let service: CerbacWhatService;
    let resultCerbacWhat: ICerbacWhat | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(CerbacWhatRoutingResolveService);
      service = TestBed.inject(CerbacWhatService);
      resultCerbacWhat = undefined;
    });

    describe('resolve', () => {
      it('should return ICerbacWhat returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCerbacWhat = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCerbacWhat).toEqual({ id: 123 });
      });

      it('should return new ICerbacWhat if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCerbacWhat = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultCerbacWhat).toEqual(new CerbacWhat());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCerbacWhat = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCerbacWhat).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
