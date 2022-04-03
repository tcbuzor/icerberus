import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CerbacWhatPropService } from '../service/cerbac-what-prop.service';

import { CerbacWhatPropComponent } from './cerbac-what-prop.component';

describe('Component Tests', () => {
  describe('CerbacWhatProp Management Component', () => {
    let comp: CerbacWhatPropComponent;
    let fixture: ComponentFixture<CerbacWhatPropComponent>;
    let service: CerbacWhatPropService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CerbacWhatPropComponent],
      })
        .overrideTemplate(CerbacWhatPropComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CerbacWhatPropComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(CerbacWhatPropService);

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
      expect(comp.cerbacWhatProps?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
