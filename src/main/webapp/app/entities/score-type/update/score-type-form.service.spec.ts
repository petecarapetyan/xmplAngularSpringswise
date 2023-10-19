import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../score-type.test-samples';

import { ScoreTypeFormService } from './score-type-form.service';

describe('ScoreType Form Service', () => {
  let service: ScoreTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreTypeFormService);
  });

  describe('Service methods', () => {
    describe('createScoreTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createScoreTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
          })
        );
      });

      it('passing IScoreType should create a new form with FormGroup', () => {
        const formGroup = service.createScoreTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
          })
        );
      });
    });

    describe('getScoreType', () => {
      it('should return NewScoreType for default ScoreType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createScoreTypeFormGroup(sampleWithNewData);

        const scoreType = service.getScoreType(formGroup) as any;

        expect(scoreType).toMatchObject(sampleWithNewData);
      });

      it('should return NewScoreType for empty ScoreType initial value', () => {
        const formGroup = service.createScoreTypeFormGroup();

        const scoreType = service.getScoreType(formGroup) as any;

        expect(scoreType).toMatchObject({});
      });

      it('should return IScoreType', () => {
        const formGroup = service.createScoreTypeFormGroup(sampleWithRequiredData);

        const scoreType = service.getScoreType(formGroup) as any;

        expect(scoreType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IScoreType should not enable id FormControl', () => {
        const formGroup = service.createScoreTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewScoreType should disable id FormControl', () => {
        const formGroup = service.createScoreTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
