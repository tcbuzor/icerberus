import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CerbacWhyDetailComponent } from './cerbac-why-detail.component';

describe('Component Tests', () => {
  describe('CerbacWhy Management Detail Component', () => {
    let comp: CerbacWhyDetailComponent;
    let fixture: ComponentFixture<CerbacWhyDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [CerbacWhyDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ cerbacWhy: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(CerbacWhyDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CerbacWhyDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cerbacWhy on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cerbacWhy).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
