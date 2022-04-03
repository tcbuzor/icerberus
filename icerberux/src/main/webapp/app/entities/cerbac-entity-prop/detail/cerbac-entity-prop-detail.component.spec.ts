import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CerbacEntityPropDetailComponent } from './cerbac-entity-prop-detail.component';

describe('Component Tests', () => {
  describe('CerbacEntityProp Management Detail Component', () => {
    let comp: CerbacEntityPropDetailComponent;
    let fixture: ComponentFixture<CerbacEntityPropDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [CerbacEntityPropDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ cerbacEntityProp: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(CerbacEntityPropDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CerbacEntityPropDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cerbacEntityProp on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cerbacEntityProp).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
