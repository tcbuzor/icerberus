import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CerbacWhereService } from '../service/cerbac-where.service';

import { CerbacWhereComponent } from './cerbac-where.component';

describe('Component Tests', () => {
  describe('CerbacWhere Management Component', () => {
    let comp: CerbacWhereComponent;
    let fixture: ComponentFixture<CerbacWhereComponent>;
    let service: CerbacWhereService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CerbacWhereComponent],
      })
        .overrideTemplate(CerbacWhereComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CerbacWhereComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(CerbacWhereService);

      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [{ id: 123 }],
            headers,
          })
        )
      );
    });

    it('Should call load all on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.cerbacWheres?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
