import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CerbacWhenDetailComponent } from './cerbac-when-detail.component';

describe('Component Tests', () => {
  describe('CerbacWhen Management Detail Component', () => {
    let comp: CerbacWhenDetailComponent;
    let fixture: ComponentFixture<CerbacWhenDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [CerbacWhenDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ cerbacWhen: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(CerbacWhenDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CerbacWhenDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cerbacWhen on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cerbacWhen).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
