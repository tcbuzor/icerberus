import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CerbacWhatPropDetailComponent } from './cerbac-what-prop-detail.component';

describe('Component Tests', () => {
  describe('CerbacWhatProp Management Detail Component', () => {
    let comp: CerbacWhatPropDetailComponent;
    let fixture: ComponentFixture<CerbacWhatPropDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [CerbacWhatPropDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ cerbacWhatProp: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(CerbacWhatPropDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CerbacWhatPropDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cerbacWhatProp on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cerbacWhatProp).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
