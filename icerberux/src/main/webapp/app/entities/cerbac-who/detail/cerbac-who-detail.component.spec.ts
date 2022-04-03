import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CerbacWhoDetailComponent } from './cerbac-who-detail.component';

describe('Component Tests', () => {
  describe('CerbacWho Management Detail Component', () => {
    let comp: CerbacWhoDetailComponent;
    let fixture: ComponentFixture<CerbacWhoDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [CerbacWhoDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ cerbacWho: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(CerbacWhoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CerbacWhoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cerbacWho on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cerbacWho).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
