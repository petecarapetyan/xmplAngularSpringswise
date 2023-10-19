import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ScoreTypeFormService } from './score-type-form.service';
import { ScoreTypeService } from '../service/score-type.service';
import { IScoreType } from '../score-type.model';

import { ScoreTypeUpdateComponent } from './score-type-update.component';

describe('ScoreType Management Update Component', () => {
  let comp: ScoreTypeUpdateComponent;
  let fixture: ComponentFixture<ScoreTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let scoreTypeFormService: ScoreTypeFormService;
  let scoreTypeService: ScoreTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ScoreTypeUpdateComponent],
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
      .overrideTemplate(ScoreTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ScoreTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    scoreTypeFormService = TestBed.inject(ScoreTypeFormService);
    scoreTypeService = TestBed.inject(ScoreTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const scoreType: IScoreType = { id: 456 };

      activatedRoute.data = of({ scoreType });
      comp.ngOnInit();

      expect(comp.scoreType).toEqual(scoreType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IScoreType>>();
      const scoreType = { id: 123 };
      jest.spyOn(scoreTypeFormService, 'getScoreType').mockReturnValue(scoreType);
      jest.spyOn(scoreTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ scoreType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: scoreType }));
      saveSubject.complete();

      // THEN
      expect(scoreTypeFormService.getScoreType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(scoreTypeService.update).toHaveBeenCalledWith(expect.objectContaining(scoreType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IScoreType>>();
      const scoreType = { id: 123 };
      jest.spyOn(scoreTypeFormService, 'getScoreType').mockReturnValue({ id: null });
      jest.spyOn(scoreTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ scoreType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: scoreType }));
      saveSubject.complete();

      // THEN
      expect(scoreTypeFormService.getScoreType).toHaveBeenCalled();
      expect(scoreTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IScoreType>>();
      const scoreType = { id: 123 };
      jest.spyOn(scoreTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ scoreType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(scoreTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
