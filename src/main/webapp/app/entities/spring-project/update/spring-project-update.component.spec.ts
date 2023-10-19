import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { SpringProjectFormService } from './spring-project-form.service';
import { SpringProjectService } from '../service/spring-project.service';
import { ISpringProject } from '../spring-project.model';

import { SpringProjectUpdateComponent } from './spring-project-update.component';

describe('SpringProject Management Update Component', () => {
  let comp: SpringProjectUpdateComponent;
  let fixture: ComponentFixture<SpringProjectUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let springProjectFormService: SpringProjectFormService;
  let springProjectService: SpringProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [SpringProjectUpdateComponent],
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
      .overrideTemplate(SpringProjectUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SpringProjectUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    springProjectFormService = TestBed.inject(SpringProjectFormService);
    springProjectService = TestBed.inject(SpringProjectService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const springProject: ISpringProject = { id: 456 };

      activatedRoute.data = of({ springProject });
      comp.ngOnInit();

      expect(comp.springProject).toEqual(springProject);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISpringProject>>();
      const springProject = { id: 123 };
      jest.spyOn(springProjectFormService, 'getSpringProject').mockReturnValue(springProject);
      jest.spyOn(springProjectService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ springProject });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: springProject }));
      saveSubject.complete();

      // THEN
      expect(springProjectFormService.getSpringProject).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(springProjectService.update).toHaveBeenCalledWith(expect.objectContaining(springProject));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISpringProject>>();
      const springProject = { id: 123 };
      jest.spyOn(springProjectFormService, 'getSpringProject').mockReturnValue({ id: null });
      jest.spyOn(springProjectService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ springProject: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: springProject }));
      saveSubject.complete();

      // THEN
      expect(springProjectFormService.getSpringProject).toHaveBeenCalled();
      expect(springProjectService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISpringProject>>();
      const springProject = { id: 123 };
      jest.spyOn(springProjectService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ springProject });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(springProjectService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
