import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICerbacEntity, CerbacEntity } from '../../../shared/model/cerbac-entity.model';

import { CerbacEntityService } from '../../../shared/service/cerbac-entity.service';

describe('Service Tests', () => {
  describe('CerbacEntity Service', () => {
    let service: CerbacEntityService;
    let httpMock: HttpTestingController;
    let elemDefault: ICerbacEntity;
    let expectedResult: ICerbacEntity | ICerbacEntity[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(CerbacEntityService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        name: 'AAAAAAA',
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a CerbacEntity', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new CerbacEntity()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a CerbacEntity', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            name: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a CerbacEntity', () => {
        const patchObject = Object.assign({}, new CerbacEntity());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of CerbacEntity', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            name: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a CerbacEntity', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addCerbacEntityToCollectionIfMissing', () => {
        it('should add a CerbacEntity to an empty array', () => {
          const cerbacEntity: ICerbacEntity = { id: 123 };
          expectedResult = service.addCerbacEntityToCollectionIfMissing([], cerbacEntity);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cerbacEntity);
        });

        it('should not add a CerbacEntity to an array that contains it', () => {
          const cerbacEntity: ICerbacEntity = { id: 123 };
          const cerbacEntityCollection: ICerbacEntity[] = [
            {
              ...cerbacEntity,
            },
            { id: 456 },
          ];
          expectedResult = service.addCerbacEntityToCollectionIfMissing(cerbacEntityCollection, cerbacEntity);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a CerbacEntity to an array that doesn't contain it", () => {
          const cerbacEntity: ICerbacEntity = { id: 123 };
          const cerbacEntityCollection: ICerbacEntity[] = [{ id: 456 }];
          expectedResult = service.addCerbacEntityToCollectionIfMissing(cerbacEntityCollection, cerbacEntity);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cerbacEntity);
        });

        it('should add only unique CerbacEntity to an array', () => {
          const cerbacEntityArray: ICerbacEntity[] = [{ id: 123 }, { id: 456 }, { id: 84594 }];
          const cerbacEntityCollection: ICerbacEntity[] = [{ id: 123 }];
          expectedResult = service.addCerbacEntityToCollectionIfMissing(cerbacEntityCollection, ...cerbacEntityArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const cerbacEntity: ICerbacEntity = { id: 123 };
          const cerbacEntity2: ICerbacEntity = { id: 456 };
          expectedResult = service.addCerbacEntityToCollectionIfMissing([], cerbacEntity, cerbacEntity2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cerbacEntity);
          expect(expectedResult).toContain(cerbacEntity2);
        });

        it('should accept null and undefined values', () => {
          const cerbacEntity: ICerbacEntity = { id: 123 };
          expectedResult = service.addCerbacEntityToCollectionIfMissing([], null, cerbacEntity, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cerbacEntity);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
