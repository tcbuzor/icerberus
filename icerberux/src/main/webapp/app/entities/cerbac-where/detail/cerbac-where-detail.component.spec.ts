import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CerbacWhereDetailComponent } from './cerbac-where-detail.component';

describe('Component Tests', () => {
  describe('CerbacWhere Management Detail Component', () => {
    let comp: CerbacWhereDetailComponent;
    let fixture: ComponentFixture<CerbacWhereDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [CerbacWhereDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ cerbacWhere: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(CerbacWhereDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CerbacWhereDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cerbacWhere on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cerbacWhere).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
