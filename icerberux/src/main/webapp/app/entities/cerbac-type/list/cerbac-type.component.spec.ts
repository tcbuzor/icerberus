import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CerbacTypeService } from '../service/cerbac-type.service';

import { CerbacTypeComponent } from './cerbac-type.component';

describe('Component Tests', () => {
  describe('CerbacType Management Component', () => {
    let comp: CerbacTypeComponent;
    let fixture: ComponentFixture<CerbacTypeComponent>;
    let service: CerbacTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CerbacTypeComponent],
      })
        .overrideTemplate(CerbacTypeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CerbacTypeComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(CerbacTypeService);

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
      expect(comp.cerbacTypes?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
