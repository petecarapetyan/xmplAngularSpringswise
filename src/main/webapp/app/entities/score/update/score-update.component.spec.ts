import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ScoreFormService } from './score-form.service';
import { ScoreService } from '../service/score.service';
import { IScore } from '../score.model';

import { ScoreUpdateComponent } from './score-update.component';

describe('Score Management Update Component', () => {
  let comp: ScoreUpdateComponent;
  let fixture: ComponentFixture<ScoreUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let scoreFormService: ScoreFormService;
  let scoreService: ScoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ScoreUpdateComponent],
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
      .overrideTemplate(ScoreUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ScoreUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    scoreFormService = TestBed.inject(ScoreFormService);
    scoreService = TestBed.inject(ScoreService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const score: IScore = { id: 456 };

      activatedRoute.data = of({ score });
      comp.ngOnInit();

      expect(comp.score).toEqual(score);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IScore>>();
      const score = { id: 123 };
      jest.spyOn(scoreFormService, 'getScore').mockReturnValue(score);
      jest.spyOn(scoreService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ score });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: score }));
      saveSubject.complete();

      // THEN
      expect(scoreFormService.getScore).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(scoreService.update).toHaveBeenCalledWith(expect.objectContaining(score));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IScore>>();
      const score = { id: 123 };
      jest.spyOn(scoreFormService, 'getScore').mockReturnValue({ id: null });
      jest.spyOn(scoreService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ score: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: score }));
      saveSubject.complete();

      // THEN
      expect(scoreFormService.getScore).toHaveBeenCalled();
      expect(scoreService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IScore>>();
      const score = { id: 123 };
      jest.spyOn(scoreService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ score });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(scoreService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
