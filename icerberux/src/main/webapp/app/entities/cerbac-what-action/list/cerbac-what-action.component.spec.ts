import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CerbacWhatActionService } from '../service/cerbac-what-action.service';

import { CerbacWhatActionComponent } from './cerbac-what-action.component';

describe('Component Tests', () => {
  describe('CerbacWhatAction Management Component', () => {
    let comp: CerbacWhatActionComponent;
    let fixture: ComponentFixture<CerbacWhatActionComponent>;
    let service: CerbacWhatActionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CerbacWhatActionComponent],
      })
        .overrideTemplate(CerbacWhatActionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CerbacWhatActionComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(CerbacWhatActionService);

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
      expect(comp.cerbacWhatActions?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
