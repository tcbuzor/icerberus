import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CerbacHowService } from '../service/cerbac-how.service';

import { CerbacHowComponent } from './cerbac-how.component';

describe('Component Tests', () => {
  describe('CerbacHow Management Component', () => {
    let comp: CerbacHowComponent;
    let fixture: ComponentFixture<CerbacHowComponent>;
    let service: CerbacHowService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CerbacHowComponent],
      })
        .overrideTemplate(CerbacHowComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CerbacHowComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(CerbacHowService);

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
      expect(comp.cerbacHows?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
