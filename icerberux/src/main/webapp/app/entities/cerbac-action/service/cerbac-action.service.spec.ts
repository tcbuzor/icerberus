import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICerbacAction, CerbacAction } from '../cerbac-action.model';

import { CerbacActionService } from './cerbac-action.service';

describe('Service Tests', () => {
  describe('CerbacAction Service', () => {
    let service: CerbacActionService;
    let httpMock: HttpTestingController;
    let elemDefault: ICerbacAction;
    let expectedResult: ICerbacAction | ICerbacAction[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(CerbacActionService);
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

      it('should create a CerbacAction', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new CerbacAction()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a CerbacAction', () => {
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

      it('should partial update a CerbacAction', () => {
        const patchObject = Object.assign({}, new CerbacAction());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of CerbacAction', () => {
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

      it('should delete a CerbacAction', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addCerbacActionToCollectionIfMissing', () => {
        it('should add a CerbacAction to an empty array', () => {
          const cerbacAction: ICerbacAction = { id: 123 };
          expectedResult = service.addCerbacActionToCollectionIfMissing([], cerbacAction);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cerbacAction);
        });

        it('should not add a CerbacAction to an array that contains it', () => {
          const cerbacAction: ICerbacAction = { id: 123 };
          const cerbacActionCollection: ICerbacAction[] = [
            {
              ...cerbacAction,
            },
            { id: 456 },
          ];
          expectedResult = service.addCerbacActionToCollectionIfMissing(cerbacActionCollection, cerbacAction);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a CerbacAction to an array that doesn't contain it", () => {
          const cerbacAction: ICerbacAction = { id: 123 };
          const cerbacActionCollection: ICerbacAction[] = [{ id: 456 }];
          expectedResult = service.addCerbacActionToCollectionIfMissing(cerbacActionCollection, cerbacAction);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cerbacAction);
        });

        it('should add only unique CerbacAction to an array', () => {
          const cerbacActionArray: ICerbacAction[] = [{ id: 123 }, { id: 456 }, { id: 81803 }];
          const cerbacActionCollection: ICerbacAction[] = [{ id: 123 }];
          expectedResult = service.addCerbacActionToCollectionIfMissing(cerbacActionCollection, ...cerbacActionArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const cerbacAction: ICerbacAction = { id: 123 };
          const cerbacAction2: ICerbacAction = { id: 456 };
          expectedResult = service.addCerbacActionToCollectionIfMissing([], cerbacAction, cerbacAction2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cerbacAction);
          expect(expectedResult).toContain(cerbacAction2);
        });

        it('should accept null and undefined values', () => {
          const cerbacAction: ICerbacAction = { id: 123 };
          expectedResult = service.addCerbacActionToCollectionIfMissing([], null, cerbacAction, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cerbacAction);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
