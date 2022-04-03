import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CerbacPolicyRuleService } from '../service/cerbac-policy-rule.service';

import { CerbacPolicyRuleComponent } from './cerbac-policy-rule.component';

describe('Component Tests', () => {
  describe('CerbacPolicyRule Management Component', () => {
    let comp: CerbacPolicyRuleComponent;
    let fixture: ComponentFixture<CerbacPolicyRuleComponent>;
    let service: CerbacPolicyRuleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CerbacPolicyRuleComponent],
      })
        .overrideTemplate(CerbacPolicyRuleComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CerbacPolicyRuleComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(CerbacPolicyRuleService);

      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [{ id: 123 }],
            headers,
          })
        )
      );
    });

    it('Should call load all on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.cerbacPolicyRules?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
