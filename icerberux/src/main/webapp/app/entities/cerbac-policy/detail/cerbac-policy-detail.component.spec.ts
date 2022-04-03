import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CerbacPolicyDetailComponent } from './cerbac-policy-detail.component';

describe('Component Tests', () => {
  describe('CerbacPolicy Management Detail Component', () => {
    let comp: CerbacPolicyDetailComponent;
    let fixture: ComponentFixture<CerbacPolicyDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [CerbacPolicyDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ cerbacPolicy: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(CerbacPolicyDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CerbacPolicyDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cerbacPolicy on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cerbacPolicy).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
