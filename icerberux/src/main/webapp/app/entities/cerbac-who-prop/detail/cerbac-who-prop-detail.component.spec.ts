import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CerbacWhoPropDetailComponent } from './cerbac-who-prop-detail.component';

describe('Component Tests', () => {
  describe('CerbacWhoProp Management Detail Component', () => {
    let comp: CerbacWhoPropDetailComponent;
    let fixture: ComponentFixture<CerbacWhoPropDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [CerbacWhoPropDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ cerbacWhoProp: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(CerbacWhoPropDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CerbacWhoPropDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cerbacWhoProp on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cerbacWhoProp).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
