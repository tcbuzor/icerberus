import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CerbacWhereTargetDetailComponent } from './cerbac-where-target-detail.component';

describe('Component Tests', () => {
  describe('CerbacWhereTarget Management Detail Component', () => {
    let comp: CerbacWhereTargetDetailComponent;
    let fixture: ComponentFixture<CerbacWhereTargetDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [CerbacWhereTargetDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ cerbacWhereTarget: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(CerbacWhereTargetDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CerbacWhereTargetDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cerbacWhereTarget on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cerbacWhereTarget).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
