jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { CerbacWhoPropService } from '../service/cerbac-who-prop.service';

import { CerbacWhoPropDeleteDialogComponent } from './cerbac-who-prop-delete-dialog.component';

describe('Component Tests', () => {
  describe('CerbacWhoProp Management Delete Component', () => {
    let comp: CerbacWhoPropDeleteDialogComponent;
    let fixture: ComponentFixture<CerbacWhoPropDeleteDialogComponent>;
    let service: CerbacWhoPropService;
    let mockActiveModal: NgbActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CerbacWhoPropDeleteDialogComponent],
        providers: [NgbActiveModal],
      })
        .overrideTemplate(CerbacWhoPropDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CerbacWhoPropDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(CerbacWhoPropService);
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
