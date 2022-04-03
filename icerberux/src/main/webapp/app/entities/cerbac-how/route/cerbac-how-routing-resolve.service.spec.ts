jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ICerbacHow, CerbacHow } from '../cerbac-how.model';
import { CerbacHowService } from '../service/cerbac-how.service';

import { CerbacHowRoutingResolveService } from './cerbac-how-routing-resolve.service';

describe('Service Tests', () => {
  describe('CerbacHow routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: CerbacHowRoutingResolveService;
    let service: CerbacHowService;
    let resultCerbacHow: ICerbacHow | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(CerbacHowRoutingResolveService);
      service = TestBed.inject(CerbacHowService);
      resultCerbacHow = undefined;
    });

    describe('resolve', () => {
      it('should return ICerbacHow returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCerbacHow = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCerbacHow).toEqual({ id: 123 });
      });

      it('should return new ICerbacHow if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCerbacHow = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultCerbacHow).toEqual(new CerbacHow());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCerbacHow = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCerbacHow).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
