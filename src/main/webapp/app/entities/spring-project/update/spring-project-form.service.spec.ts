import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../spring-project.test-samples';

import { SpringProjectFormService } from './spring-project-form.service';

describe('SpringProject Form Service', () => {
  let service: SpringProjectFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpringProjectFormService);
  });

  describe('Service methods', () => {
    describe('createSpringProjectFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSpringProjectFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            title: expect.any(Object),
            description: expect.any(Object),
            imagePath: expect.any(Object),
            url: expect.any(Object),
          })
        );
      });

      it('passing ISpringProject should create a new form with FormGroup', () => {
        const formGroup = service.createSpringProjectFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            title: expect.any(Object),
            description: expect.any(Object),
            imagePath: expect.any(Object),
            url: expect.any(Object),
          })
        );
      });
    });

    describe('getSpringProject', () => {
      it('should return NewSpringProject for default SpringProject initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createSpringProjectFormGroup(sampleWithNewData);

        const springProject = service.getSpringProject(formGroup) as any;

        expect(springProject).toMatchObject(sampleWithNewData);
      });

      it('should return NewSpringProject for empty SpringProject initial value', () => {
        const formGroup = service.createSpringProjectFormGroup();

        const springProject = service.getSpringProject(formGroup) as any;

        expect(springProject).toMatchObject({});
      });

      it('should return ISpringProject', () => {
        const formGroup = service.createSpringProjectFormGroup(sampleWithRequiredData);

        const springProject = service.getSpringProject(formGroup) as any;

        expect(springProject).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISpringProject should not enable id FormControl', () => {
        const formGroup = service.createSpringProjectFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSpringProject should disable id FormControl', () => {
        const formGroup = service.createSpringProjectFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
