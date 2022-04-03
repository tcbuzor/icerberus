import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CerbacHowDetailComponent } from './cerbac-how-detail.component';

describe('Component Tests', () => {
  describe('CerbacHow Management Detail Component', () => {
    let comp: CerbacHowDetailComponent;
    let fixture: ComponentFixture<CerbacHowDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [CerbacHowDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ cerbacHow: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(CerbacHowDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CerbacHowDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cerbacHow on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cerbacHow).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
