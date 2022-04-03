jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ICerbacWhere, CerbacWhere } from '../cerbac-where.model';
import { CerbacWhereService } from '../service/cerbac-where.service';

import { CerbacWhereRoutingResolveService } from './cerbac-where-routing-resolve.service';

describe('Service Tests', () => {
  describe('CerbacWhere routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: CerbacWhereRoutingResolveService;
    let service: CerbacWhereService;
    let resultCerbacWhere: ICerbacWhere | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(CerbacWhereRoutingResolveService);
      service = TestBed.inject(CerbacWhereService);
      resultCerbacWhere = undefined;
    });

    describe('resolve', () => {
      it('should return ICerbacWhere returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCerbacWhere = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCerbacWhere).toEqual({ id: 123 });
      });

      it('should return new ICerbacWhere if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCerbacWhere = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultCerbacWhere).toEqual(new CerbacWhere());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCerbacWhere = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCerbacWhere).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
