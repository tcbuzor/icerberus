import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CerbacActionDetailComponent } from './cerbac-action-detail.component';

describe('Component Tests', () => {
  describe('CerbacAction Management Detail Component', () => {
    let comp: CerbacActionDetailComponent;
    let fixture: ComponentFixture<CerbacActionDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [CerbacActionDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ cerbacAction: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(CerbacActionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CerbacActionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cerbacAction on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cerbacAction).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
