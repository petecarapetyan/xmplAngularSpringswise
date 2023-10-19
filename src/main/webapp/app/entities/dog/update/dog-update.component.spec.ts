import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DogFormService } from './dog-form.service';
import { DogService } from '../service/dog.service';
import { IDog } from '../dog.model';

import { DogUpdateComponent } from './dog-update.component';

describe('Dog Management Update Component', () => {
  let comp: DogUpdateComponent;
  let fixture: ComponentFixture<DogUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let dogFormService: DogFormService;
  let dogService: DogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DogUpdateComponent],
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
      .overrideTemplate(DogUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DogUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    dogFormService = TestBed.inject(DogFormService);
    dogService = TestBed.inject(DogService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const dog: IDog = { id: 456 };

      activatedRoute.data = of({ dog });
      comp.ngOnInit();

      expect(comp.dog).toEqual(dog);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDog>>();
      const dog = { id: 123 };
      jest.spyOn(dogFormService, 'getDog').mockReturnValue(dog);
      jest.spyOn(dogService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dog });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dog }));
      saveSubject.complete();

      // THEN
      expect(dogFormService.getDog).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(dogService.update).toHaveBeenCalledWith(expect.objectContaining(dog));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDog>>();
      const dog = { id: 123 };
      jest.spyOn(dogFormService, 'getDog').mockReturnValue({ id: null });
      jest.spyOn(dogService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dog: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dog }));
      saveSubject.complete();

      // THEN
      expect(dogFormService.getDog).toHaveBeenCalled();
      expect(dogService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDog>>();
      const dog = { id: 123 };
      jest.spyOn(dogService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dog });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(dogService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
