import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../user-history.test-samples';

import { UserHistoryFormService } from './user-history-form.service';

describe('UserHistory Form Service', () => {
  let service: UserHistoryFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserHistoryFormService);
  });

  describe('Service methods', () => {
    describe('createUserHistoryFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createUserHistoryFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            issue: expect.any(Object),
            issueDate: expect.any(Object),
          })
        );
      });

      it('passing IUserHistory should create a new form with FormGroup', () => {
        const formGroup = service.createUserHistoryFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            issue: expect.any(Object),
            issueDate: expect.any(Object),
          })
        );
      });
    });

    describe('getUserHistory', () => {
      it('should return NewUserHistory for default UserHistory initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createUserHistoryFormGroup(sampleWithNewData);

        const userHistory = service.getUserHistory(formGroup) as any;

        expect(userHistory).toMatchObject(sampleWithNewData);
      });

      it('should return NewUserHistory for empty UserHistory initial value', () => {
        const formGroup = service.createUserHistoryFormGroup();

        const userHistory = service.getUserHistory(formGroup) as any;

        expect(userHistory).toMatchObject({});
      });

      it('should return IUserHistory', () => {
        const formGroup = service.createUserHistoryFormGroup(sampleWithRequiredData);

        const userHistory = service.getUserHistory(formGroup) as any;

        expect(userHistory).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IUserHistory should not enable id FormControl', () => {
        const formGroup = service.createUserHistoryFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewUserHistory should disable id FormControl', () => {
        const formGroup = service.createUserHistoryFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
