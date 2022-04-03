import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICerbacOntology, CerbacOntology } from '../cerbac-ontology.model';

import { CerbacOntologyService } from './cerbac-ontology.service';

describe('CerbacOntology Service', () => {
  let service: CerbacOntologyService;
  let httpMock: HttpTestingController;
  let elemDefault: ICerbacOntology;
  let expectedResult: ICerbacOntology | ICerbacOntology[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CerbacOntologyService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      source: 'AAAAAAA',
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

    it('should create a CerbacOntology', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new CerbacOntology()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CerbacOntology', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          source: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CerbacOntology', () => {
      const patchObject = Object.assign({}, new CerbacOntology());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CerbacOntology', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          source: 'BBBBBB',
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

    it('should delete a CerbacOntology', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addCerbacOntologyToCollectionIfMissing', () => {
      it('should add a CerbacOntology to an empty array', () => {
        const cerbacOntology: ICerbacOntology = { id: 123 };
        expectedResult = service.addCerbacOntologyToCollectionIfMissing([], cerbacOntology);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cerbacOntology);
      });

      it('should not add a CerbacOntology to an array that contains it', () => {
        const cerbacOntology: ICerbacOntology = { id: 123 };
        const cerbacOntologyCollection: ICerbacOntology[] = [
          {
            ...cerbacOntology,
          },
          { id: 456 },
        ];
        expectedResult = service.addCerbacOntologyToCollectionIfMissing(cerbacOntologyCollection, cerbacOntology);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CerbacOntology to an array that doesn't contain it", () => {
        const cerbacOntology: ICerbacOntology = { id: 123 };
        const cerbacOntologyCollection: ICerbacOntology[] = [{ id: 456 }];
        expectedResult = service.addCerbacOntologyToCollectionIfMissing(cerbacOntologyCollection, cerbacOntology);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cerbacOntology);
      });

      it('should add only unique CerbacOntology to an array', () => {
        const cerbacOntologyArray: ICerbacOntology[] = [{ id: 123 }, { id: 456 }, { id: 5498 }];
        const cerbacOntologyCollection: ICerbacOntology[] = [{ id: 123 }];
        expectedResult = service.addCerbacOntologyToCollectionIfMissing(cerbacOntologyCollection, ...cerbacOntologyArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const cerbacOntology: ICerbacOntology = { id: 123 };
        const cerbacOntology2: ICerbacOntology = { id: 456 };
        expectedResult = service.addCerbacOntologyToCollectionIfMissing([], cerbacOntology, cerbacOntology2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cerbacOntology);
        expect(expectedResult).toContain(cerbacOntology2);
      });

      it('should accept null and undefined values', () => {
        const cerbacOntology: ICerbacOntology = { id: 123 };
        expectedResult = service.addCerbacOntologyToCollectionIfMissing([], null, cerbacOntology, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cerbacOntology);
      });

      it('should return initial array if no CerbacOntology is added', () => {
        const cerbacOntologyCollection: ICerbacOntology[] = [{ id: 123 }];
        expectedResult = service.addCerbacOntologyToCollectionIfMissing(cerbacOntologyCollection, undefined, null);
        expect(expectedResult).toEqual(cerbacOntologyCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
