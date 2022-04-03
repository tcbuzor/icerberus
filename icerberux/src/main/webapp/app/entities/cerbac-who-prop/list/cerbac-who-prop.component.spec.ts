import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CerbacWhoPropService } from '../service/cerbac-who-prop.service';

import { CerbacWhoPropComponent } from './cerbac-who-prop.component';

describe('Component Tests', () => {
  describe('CerbacWhoProp Management Component', () => {
    let comp: CerbacWhoPropComponent;
    let fixture: ComponentFixture<CerbacWhoPropComponent>;
    let service: CerbacWhoPropService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CerbacWhoPropComponent],
      })
        .overrideTemplate(CerbacWhoPropComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CerbacWhoPropComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(CerbacWhoPropService);

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
      expect(comp.cerbacWhoProps?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
