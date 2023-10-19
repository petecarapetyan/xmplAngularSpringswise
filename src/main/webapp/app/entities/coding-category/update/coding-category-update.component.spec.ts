import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CodingCategoryFormService } from './coding-category-form.service';
import { CodingCategoryService } from '../service/coding-category.service';
import { ICodingCategory } from '../coding-category.model';

import { CodingCategoryUpdateComponent } from './coding-category-update.component';

describe('CodingCategory Management Update Component', () => {
  let comp: CodingCategoryUpdateComponent;
  let fixture: ComponentFixture<CodingCategoryUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let codingCategoryFormService: CodingCategoryFormService;
  let codingCategoryService: CodingCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CodingCategoryUpdateComponent],
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
      .overrideTemplate(CodingCategoryUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CodingCategoryUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    codingCategoryFormService = TestBed.inject(CodingCategoryFormService);
    codingCategoryService = TestBed.inject(CodingCategoryService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const codingCategory: ICodingCategory = { id: 456 };

      activatedRoute.data = of({ codingCategory });
      comp.ngOnInit();

      expect(comp.codingCategory).toEqual(codingCategory);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICodingCategory>>();
      const codingCategory = { id: 123 };
      jest.spyOn(codingCategoryFormService, 'getCodingCategory').mockReturnValue(codingCategory);
      jest.spyOn(codingCategoryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ codingCategory });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: codingCategory }));
      saveSubject.complete();

      // THEN
      expect(codingCategoryFormService.getCodingCategory).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(codingCategoryService.update).toHaveBeenCalledWith(expect.objectContaining(codingCategory));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICodingCategory>>();
      const codingCategory = { id: 123 };
      jest.spyOn(codingCategoryFormService, 'getCodingCategory').mockReturnValue({ id: null });
      jest.spyOn(codingCategoryService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ codingCategory: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: codingCategory }));
      saveSubject.complete();

      // THEN
      expect(codingCategoryFormService.getCodingCategory).toHaveBeenCalled();
      expect(codingCategoryService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICodingCategory>>();
      const codingCategory = { id: 123 };
      jest.spyOn(codingCategoryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ codingCategory });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(codingCategoryService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
