import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../frog.test-samples';

import { FrogFormService } from './frog-form.service';

describe('Frog Form Service', () => {
  let service: FrogFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrogFormService);
  });

  describe('Service methods', () => {
    describe('createFrogFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFrogFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            age: expect.any(Object),
            species: expect.any(Object),
          })
        );
      });

      it('passing IFrog should create a new form with FormGroup', () => {
        const formGroup = service.createFrogFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            age: expect.any(Object),
            species: expect.any(Object),
          })
        );
      });
    });

    describe('getFrog', () => {
      it('should return NewFrog for default Frog initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFrogFormGroup(sampleWithNewData);

        const frog = service.getFrog(formGroup) as any;

        expect(frog).toMatchObject(sampleWithNewData);
      });

      it('should return NewFrog for empty Frog initial value', () => {
        const formGroup = service.createFrogFormGroup();

        const frog = service.getFrog(formGroup) as any;

        expect(frog).toMatchObject({});
      });

      it('should return IFrog', () => {
        const formGroup = service.createFrogFormGroup(sampleWithRequiredData);

        const frog = service.getFrog(formGroup) as any;

        expect(frog).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFrog should not enable id FormControl', () => {
        const formGroup = service.createFrogFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFrog should disable id FormControl', () => {
        const formGroup = service.createFrogFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
