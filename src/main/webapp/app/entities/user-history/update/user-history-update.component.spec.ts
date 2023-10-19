import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { UserHistoryFormService } from './user-history-form.service';
import { UserHistoryService } from '../service/user-history.service';
import { IUserHistory } from '../user-history.model';

import { UserHistoryUpdateComponent } from './user-history-update.component';

describe('UserHistory Management Update Component', () => {
  let comp: UserHistoryUpdateComponent;
  let fixture: ComponentFixture<UserHistoryUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let userHistoryFormService: UserHistoryFormService;
  let userHistoryService: UserHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [UserHistoryUpdateComponent],
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
      .overrideTemplate(UserHistoryUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(UserHistoryUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    userHistoryFormService = TestBed.inject(UserHistoryFormService);
    userHistoryService = TestBed.inject(UserHistoryService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const userHistory: IUserHistory = { id: 456 };

      activatedRoute.data = of({ userHistory });
      comp.ngOnInit();

      expect(comp.userHistory).toEqual(userHistory);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUserHistory>>();
      const userHistory = { id: 123 };
      jest.spyOn(userHistoryFormService, 'getUserHistory').mockReturnValue(userHistory);
      jest.spyOn(userHistoryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ userHistory });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: userHistory }));
      saveSubject.complete();

      // THEN
      expect(userHistoryFormService.getUserHistory).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(userHistoryService.update).toHaveBeenCalledWith(expect.objectContaining(userHistory));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUserHistory>>();
      const userHistory = { id: 123 };
      jest.spyOn(userHistoryFormService, 'getUserHistory').mockReturnValue({ id: null });
      jest.spyOn(userHistoryService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ userHistory: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: userHistory }));
      saveSubject.complete();

      // THEN
      expect(userHistoryFormService.getUserHistory).toHaveBeenCalled();
      expect(userHistoryService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUserHistory>>();
      const userHistory = { id: 123 };
      jest.spyOn(userHistoryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ userHistory });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(userHistoryService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
