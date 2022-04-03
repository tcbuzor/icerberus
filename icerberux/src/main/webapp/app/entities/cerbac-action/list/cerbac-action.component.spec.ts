import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CerbacActionService } from '../service/cerbac-action.service';

import { CerbacActionComponent } from './cerbac-action.component';

describe('Component Tests', () => {
  describe('CerbacAction Management Component', () => {
    let comp: CerbacActionComponent;
    let fixture: ComponentFixture<CerbacActionComponent>;
    let service: CerbacActionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CerbacActionComponent],
      })
        .overrideTemplate(CerbacActionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CerbacActionComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(CerbacActionService);

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
      expect(comp.cerbacActions?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
