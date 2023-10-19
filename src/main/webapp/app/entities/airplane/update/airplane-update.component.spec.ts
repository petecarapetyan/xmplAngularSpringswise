import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AirplaneFormService } from './airplane-form.service';
import { AirplaneService } from '../service/airplane.service';
import { IAirplane } from '../airplane.model';

import { AirplaneUpdateComponent } from './airplane-update.component';

describe('Airplane Management Update Component', () => {
  let comp: AirplaneUpdateComponent;
  let fixture: ComponentFixture<AirplaneUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let airplaneFormService: AirplaneFormService;
  let airplaneService: AirplaneService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AirplaneUpdateComponent],
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
      .overrideTemplate(AirplaneUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AirplaneUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    airplaneFormService = TestBed.inject(AirplaneFormService);
    airplaneService = TestBed.inject(AirplaneService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const airplane: IAirplane = { id: 456 };

      activatedRoute.data = of({ airplane });
      comp.ngOnInit();

      expect(comp.airplane).toEqual(airplane);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAirplane>>();
      const airplane = { id: 123 };
      jest.spyOn(airplaneFormService, 'getAirplane').mockReturnValue(airplane);
      jest.spyOn(airplaneService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ airplane });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: airplane }));
      saveSubject.complete();

      // THEN
      expect(airplaneFormService.getAirplane).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(airplaneService.update).toHaveBeenCalledWith(expect.objectContaining(airplane));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAirplane>>();
      const airplane = { id: 123 };
      jest.spyOn(airplaneFormService, 'getAirplane').mockReturnValue({ id: null });
      jest.spyOn(airplaneService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ airplane: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: airplane }));
      saveSubject.complete();

      // THEN
      expect(airplaneFormService.getAirplane).toHaveBeenCalled();
      expect(airplaneService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAirplane>>();
      const airplane = { id: 123 };
      jest.spyOn(airplaneService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ airplane });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(airplaneService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
