import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CerbacWhyService } from '../service/cerbac-why.service';

import { CerbacWhyComponent } from './cerbac-why.component';

describe('Component Tests', () => {
  describe('CerbacWhy Management Component', () => {
    let comp: CerbacWhyComponent;
    let fixture: ComponentFixture<CerbacWhyComponent>;
    let service: CerbacWhyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CerbacWhyComponent],
      })
        .overrideTemplate(CerbacWhyComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CerbacWhyComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(CerbacWhyService);

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
      expect(comp.cerbacWhies?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
