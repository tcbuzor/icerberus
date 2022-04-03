import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CerbacWhereOriginDetailComponent } from './cerbac-where-origin-detail.component';

describe('Component Tests', () => {
  describe('CerbacWhereOrigin Management Detail Component', () => {
    let comp: CerbacWhereOriginDetailComponent;
    let fixture: ComponentFixture<CerbacWhereOriginDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [CerbacWhereOriginDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ cerbacWhereOrigin: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(CerbacWhereOriginDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CerbacWhereOriginDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cerbacWhereOrigin on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cerbacWhereOrigin).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
