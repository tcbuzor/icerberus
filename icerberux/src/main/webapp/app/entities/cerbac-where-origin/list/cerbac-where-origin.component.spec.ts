import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CerbacWhereOriginService } from '../service/cerbac-where-origin.service';

import { CerbacWhereOriginComponent } from './cerbac-where-origin.component';

describe('Component Tests', () => {
  describe('CerbacWhereOrigin Management Component', () => {
    let comp: CerbacWhereOriginComponent;
    let fixture: ComponentFixture<CerbacWhereOriginComponent>;
    let service: CerbacWhereOriginService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CerbacWhereOriginComponent],
      })
        .overrideTemplate(CerbacWhereOriginComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CerbacWhereOriginComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(CerbacWhereOriginService);

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
      expect(comp.cerbacWhereOrigins?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
