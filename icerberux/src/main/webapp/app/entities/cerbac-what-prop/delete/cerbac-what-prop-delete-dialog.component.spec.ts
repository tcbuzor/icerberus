jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { CerbacWhatPropService } from '../service/cerbac-what-prop.service';

import { CerbacWhatPropDeleteDialogComponent } from './cerbac-what-prop-delete-dialog.component';

describe('Component Tests', () => {
  describe('CerbacWhatProp Management Delete Component', () => {
    let comp: CerbacWhatPropDeleteDialogComponent;
    let fixture: ComponentFixture<CerbacWhatPropDeleteDialogComponent>;
    let service: CerbacWhatPropService;
    let mockActiveModal: NgbActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CerbacWhatPropDeleteDialogComponent],
        providers: [NgbActiveModal],
      })
        .overrideTemplate(CerbacWhatPropDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CerbacWhatPropDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(CerbacWhatPropService);
      mockActiveModal = TestBed.inject(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.close).not.toHaveBeenCalled();
        expect(mockActiveModal.dismiss).toHaveBeenCalled();
      });
    });
  });
});
