jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ICerbacEntity, CerbacEntity } from '../../../shared/model/cerbac-entity.model';
import { CerbacEntityService } from '../../../shared/service/cerbac-entity.service';

import { CerbacEntityRoutingResolveService } from './cerbac-entity-routing-resolve.service';

describe('Service Tests', () => {
  describe('CerbacEntity routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: CerbacEntityRoutingResolveService;
    let service: CerbacEntityService;
    let resultCerbacEntity: ICerbacEntity | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(CerbacEntityRoutingResolveService);
      service = TestBed.inject(CerbacEntityService);
      resultCerbacEntity = undefined;
    });

    describe('resolve', () => {
      it('should return ICerbacEntity returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCerbacEntity = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCerbacEntity).toEqual({ id: 123 });
      });

      it('should return new ICerbacEntity if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCerbacEntity = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultCerbacEntity).toEqual(new CerbacEntity());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCerbacEntity = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCerbacEntity).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
