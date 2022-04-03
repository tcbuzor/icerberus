import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CerbacPolicyRuleDetailComponent } from './cerbac-policy-rule-detail.component';

describe('Component Tests', () => {
  describe('CerbacPolicyRule Management Detail Component', () => {
    let comp: CerbacPolicyRuleDetailComponent;
    let fixture: ComponentFixture<CerbacPolicyRuleDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [CerbacPolicyRuleDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ cerbacPolicyRule: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(CerbacPolicyRuleDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CerbacPolicyRuleDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cerbacPolicyRule on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cerbacPolicyRule).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
