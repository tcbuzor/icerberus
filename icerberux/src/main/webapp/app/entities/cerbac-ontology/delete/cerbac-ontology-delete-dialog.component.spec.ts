jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { CerbacOntologyService } from '../service/cerbac-ontology.service';

import { CerbacOntologyDeleteDialogComponent } from './cerbac-ontology-delete-dialog.component';

describe('CerbacOntology Management Delete Component', () => {
  let comp: CerbacOntologyDeleteDialogComponent;
  let fixture: ComponentFixture<CerbacOntologyDeleteDialogComponent>;
  let service: CerbacOntologyService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CerbacOntologyDeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(CerbacOntologyDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CerbacOntologyDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(CerbacOntologyService);
    mockActiveModal = TestBed.inject(NgbActiveModal);
  });

  describe('confirmDelete', () => {
    it('Should call delete service on confirmDelete', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({ body: {} })));

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
      jest.spyOn(service, 'delete');

      // WHEN
      comp.cancel();

      // THEN
      expect(service.delete).not.toHaveBeenCalled();
      expect(mockActiveModal.close).not.toHaveBeenCalled();
      expect(mockActiveModal.dismiss).toHaveBeenCalled();
    });
  });
});
