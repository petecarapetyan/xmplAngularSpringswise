import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../airplane.test-samples';

import { AirplaneFormService } from './airplane-form.service';

describe('Airplane Form Service', () => {
  let service: AirplaneFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirplaneFormService);
  });

  describe('Service methods', () => {
    describe('createAirplaneFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAirplaneFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            model: expect.any(Object),
            make: expect.any(Object),
            color: expect.any(Object),
          })
        );
      });

      it('passing IAirplane should create a new form with FormGroup', () => {
        const formGroup = service.createAirplaneFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            model: expect.any(Object),
            make: expect.any(Object),
            color: expect.any(Object),
          })
        );
      });
    });

    describe('getAirplane', () => {
      it('should return NewAirplane for default Airplane initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAirplaneFormGroup(sampleWithNewData);

        const airplane = service.getAirplane(formGroup) as any;

        expect(airplane).toMatchObject(sampleWithNewData);
      });

      it('should return NewAirplane for empty Airplane initial value', () => {
        const formGroup = service.createAirplaneFormGroup();

        const airplane = service.getAirplane(formGroup) as any;

        expect(airplane).toMatchObject({});
      });

      it('should return IAirplane', () => {
        const formGroup = service.createAirplaneFormGroup(sampleWithRequiredData);

        const airplane = service.getAirplane(formGroup) as any;

        expect(airplane).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAirplane should not enable id FormControl', () => {
        const formGroup = service.createAirplaneFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAirplane should disable id FormControl', () => {
        const formGroup = service.createAirplaneFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
