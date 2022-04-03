jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ICerbacWho, CerbacWho } from '../cerbac-who.model';
import { CerbacWhoService } from '../service/cerbac-who.service';

import { CerbacWhoRoutingResolveService } from './cerbac-who-routing-resolve.service';

describe('Service Tests', () => {
  describe('CerbacWho routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: CerbacWhoRoutingResolveService;
    let service: CerbacWhoService;
    let resultCerbacWho: ICerbacWho | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(CerbacWhoRoutingResolveService);
      service = TestBed.inject(CerbacWhoService);
      resultCerbacWho = undefined;
    });

    describe('resolve', () => {
      it('should return ICerbacWho returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCerbacWho = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCerbacWho).toEqual({ id: 123 });
      });

      it('should return new ICerbacWho if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCerbacWho = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultCerbacWho).toEqual(new CerbacWho());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCerbacWho = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCerbacWho).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
