import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CerbacWhatService } from '../service/cerbac-what.service';

import { CerbacWhatComponent } from './cerbac-what.component';

describe('Component Tests', () => {
  describe('CerbacWhat Management Component', () => {
    let comp: CerbacWhatComponent;
    let fixture: ComponentFixture<CerbacWhatComponent>;
    let service: CerbacWhatService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CerbacWhatComponent],
      })
        .overrideTemplate(CerbacWhatComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CerbacWhatComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(CerbacWhatService);

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
      expect(comp.cerbacWhats?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
