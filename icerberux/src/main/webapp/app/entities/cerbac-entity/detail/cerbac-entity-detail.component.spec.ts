import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CerbacEntityDetailComponent } from './cerbac-entity-detail.component';

describe('Component Tests', () => {
  describe('CerbacEntity Management Detail Component', () => {
    let comp: CerbacEntityDetailComponent;
    let fixture: ComponentFixture<CerbacEntityDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [CerbacEntityDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ cerbacEntity: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(CerbacEntityDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CerbacEntityDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cerbacEntity on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cerbacEntity).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
