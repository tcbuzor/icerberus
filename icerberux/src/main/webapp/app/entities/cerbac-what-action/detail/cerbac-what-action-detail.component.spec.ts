import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CerbacWhatActionDetailComponent } from './cerbac-what-action-detail.component';

describe('Component Tests', () => {
  describe('CerbacWhatAction Management Detail Component', () => {
    let comp: CerbacWhatActionDetailComponent;
    let fixture: ComponentFixture<CerbacWhatActionDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [CerbacWhatActionDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ cerbacWhatAction: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(CerbacWhatActionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CerbacWhatActionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cerbacWhatAction on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cerbacWhatAction).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
