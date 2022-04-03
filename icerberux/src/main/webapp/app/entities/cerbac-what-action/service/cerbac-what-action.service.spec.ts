import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICerbacWhatAction, CerbacWhatAction } from '../cerbac-what-action.model';

import { CerbacWhatActionService } from './cerbac-what-action.service';

describe('Service Tests', () => {
  describe('CerbacWhatAction Service', () => {
    let service: CerbacWhatActionService;
    let httpMock: HttpTestingController;
    let elemDefault: ICerbacWhatAction;
    let expectedResult: ICerbacWhatAction | ICerbacWhatAction[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(CerbacWhatActionService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
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

      it('should create a CerbacWhatAction', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new CerbacWhatAction()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a CerbacWhatAction', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a CerbacWhatAction', () => {
        const patchObject = Object.assign({}, new CerbacWhatAction());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of CerbacWhatAction', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
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

      it('should delete a CerbacWhatAction', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addCerbacWhatActionToCollectionIfMissing', () => {
        it('should add a CerbacWhatAction to an empty array', () => {
          const cerbacWhatAction: ICerbacWhatAction = { id: 123 };
          expectedResult = service.addCerbacWhatActionToCollectionIfMissing([], cerbacWhatAction);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cerbacWhatAction);
        });

        it('should not add a CerbacWhatAction to an array that contains it', () => {
          const cerbacWhatAction: ICerbacWhatAction = { id: 123 };
          const cerbacWhatActionCollection: ICerbacWhatAction[] = [
            {
              ...cerbacWhatAction,
            },
            { id: 456 },
          ];
          expectedResult = service.addCerbacWhatActionToCollectionIfMissing(cerbacWhatActionCollection, cerbacWhatAction);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a CerbacWhatAction to an array that doesn't contain it", () => {
          const cerbacWhatAction: ICerbacWhatAction = { id: 123 };
          const cerbacWhatActionCollection: ICerbacWhatAction[] = [{ id: 456 }];
          expectedResult = service.addCerbacWhatActionToCollectionIfMissing(cerbacWhatActionCollection, cerbacWhatAction);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cerbacWhatAction);
        });

        it('should add only unique CerbacWhatAction to an array', () => {
          const cerbacWhatActionArray: ICerbacWhatAction[] = [{ id: 123 }, { id: 456 }, { id: 5516 }];
          const cerbacWhatActionCollection: ICerbacWhatAction[] = [{ id: 123 }];
          expectedResult = service.addCerbacWhatActionToCollectionIfMissing(cerbacWhatActionCollection, ...cerbacWhatActionArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const cerbacWhatAction: ICerbacWhatAction = { id: 123 };
          const cerbacWhatAction2: ICerbacWhatAction = { id: 456 };
          expectedResult = service.addCerbacWhatActionToCollectionIfMissing([], cerbacWhatAction, cerbacWhatAction2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cerbacWhatAction);
          expect(expectedResult).toContain(cerbacWhatAction2);
        });

        it('should accept null and undefined values', () => {
          const cerbacWhatAction: ICerbacWhatAction = { id: 123 };
          expectedResult = service.addCerbacWhatActionToCollectionIfMissing([], null, cerbacWhatAction, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cerbacWhatAction);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
