import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CerbacWhenService } from '../service/cerbac-when.service';

import { CerbacWhenComponent } from './cerbac-when.component';

describe('Component Tests', () => {
  describe('CerbacWhen Management Component', () => {
    let comp: CerbacWhenComponent;
    let fixture: ComponentFixture<CerbacWhenComponent>;
    let service: CerbacWhenService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CerbacWhenComponent],
      })
        .overrideTemplate(CerbacWhenComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CerbacWhenComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(CerbacWhenService);

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
      expect(comp.cerbacWhens?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
