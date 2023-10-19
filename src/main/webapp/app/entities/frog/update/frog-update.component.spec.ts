import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { FrogFormService } from './frog-form.service';
import { FrogService } from '../service/frog.service';
import { IFrog } from '../frog.model';

import { FrogUpdateComponent } from './frog-update.component';

describe('Frog Management Update Component', () => {
  let comp: FrogUpdateComponent;
  let fixture: ComponentFixture<FrogUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let frogFormService: FrogFormService;
  let frogService: FrogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FrogUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(FrogUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FrogUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    frogFormService = TestBed.inject(FrogFormService);
    frogService = TestBed.inject(FrogService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const frog: IFrog = { id: 456 };

      activatedRoute.data = of({ frog });
      comp.ngOnInit();

      expect(comp.frog).toEqual(frog);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFrog>>();
      const frog = { id: 123 };
      jest.spyOn(frogFormService, 'getFrog').mockReturnValue(frog);
      jest.spyOn(frogService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ frog });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: frog }));
      saveSubject.complete();

      // THEN
      expect(frogFormService.getFrog).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(frogService.update).toHaveBeenCalledWith(expect.objectContaining(frog));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFrog>>();
      const frog = { id: 123 };
      jest.spyOn(frogFormService, 'getFrog').mockReturnValue({ id: null });
      jest.spyOn(frogService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ frog: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: frog }));
      saveSubject.complete();

      // THEN
      expect(frogFormService.getFrog).toHaveBeenCalled();
      expect(frogService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFrog>>();
      const frog = { id: 123 };
      jest.spyOn(frogService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ frog });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(frogService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
