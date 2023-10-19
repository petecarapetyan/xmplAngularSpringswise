import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../coding-category.test-samples';

import { CodingCategoryFormService } from './coding-category-form.service';

describe('CodingCategory Form Service', () => {
  let service: CodingCategoryFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodingCategoryFormService);
  });

  describe('Service methods', () => {
    describe('createCodingCategoryFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCodingCategoryFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
          })
        );
      });

      it('passing ICodingCategory should create a new form with FormGroup', () => {
        const formGroup = service.createCodingCategoryFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
          })
        );
      });
    });

    describe('getCodingCategory', () => {
      it('should return NewCodingCategory for default CodingCategory initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCodingCategoryFormGroup(sampleWithNewData);

        const codingCategory = service.getCodingCategory(formGroup) as any;

        expect(codingCategory).toMatchObject(sampleWithNewData);
      });

      it('should return NewCodingCategory for empty CodingCategory initial value', () => {
        const formGroup = service.createCodingCategoryFormGroup();

        const codingCategory = service.getCodingCategory(formGroup) as any;

        expect(codingCategory).toMatchObject({});
      });

      it('should return ICodingCategory', () => {
        const formGroup = service.createCodingCategoryFormGroup(sampleWithRequiredData);

        const codingCategory = service.getCodingCategory(formGroup) as any;

        expect(codingCategory).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICodingCategory should not enable id FormControl', () => {
        const formGroup = service.createCodingCategoryFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCodingCategory should disable id FormControl', () => {
        const formGroup = service.createCodingCategoryFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
