import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CerbacTypeDetailComponent } from './cerbac-type-detail.component';

describe('Component Tests', () => {
  describe('CerbacType Management Detail Component', () => {
    let comp: CerbacTypeDetailComponent;
    let fixture: ComponentFixture<CerbacTypeDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [CerbacTypeDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ cerbacType: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(CerbacTypeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CerbacTypeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cerbacType on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cerbacType).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
