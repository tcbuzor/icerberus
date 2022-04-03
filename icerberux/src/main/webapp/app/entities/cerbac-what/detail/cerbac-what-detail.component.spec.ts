import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CerbacWhatDetailComponent } from './cerbac-what-detail.component';

describe('Component Tests', () => {
  describe('CerbacWhat Management Detail Component', () => {
    let comp: CerbacWhatDetailComponent;
    let fixture: ComponentFixture<CerbacWhatDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [CerbacWhatDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ cerbacWhat: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(CerbacWhatDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CerbacWhatDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cerbacWhat on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cerbacWhat).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
