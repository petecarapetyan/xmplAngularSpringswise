import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ISpringProject, NewSpringProject } from '../spring-project.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISpringProject for edit and NewSpringProjectFormGroupInput for create.
 */
type SpringProjectFormGroupInput = ISpringProject | PartialWithRequiredKeyOf<NewSpringProject>;

type SpringProjectFormDefaults = Pick<NewSpringProject, 'id'>;

type SpringProjectFormGroupContent = {
  id: FormControl<ISpringProject['id'] | NewSpringProject['id']>;
  title: FormControl<ISpringProject['title']>;
  description: FormControl<ISpringProject['description']>;
  imagePath: FormControl<ISpringProject['imagePath']>;
  url: FormControl<ISpringProject['url']>;
};

export type SpringProjectFormGroup = FormGroup<SpringProjectFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SpringProjectFormService {
  createSpringProjectFormGroup(springProject: SpringProjectFormGroupInput = { id: null }): SpringProjectFormGroup {
    const springProjectRawValue = {
      ...this.getFormDefaults(),
      ...springProject,
    };
    return new FormGroup<SpringProjectFormGroupContent>({
      id: new FormControl(
        { value: springProjectRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      title: new FormControl(springProjectRawValue.title),
      description: new FormControl(springProjectRawValue.description),
      imagePath: new FormControl(springProjectRawValue.imagePath),
      url: new FormControl(springProjectRawValue.url),
    });
  }

  getSpringProject(form: SpringProjectFormGroup): ISpringProject | NewSpringProject {
    return form.getRawValue() as ISpringProject | NewSpringProject;
  }

  resetForm(form: SpringProjectFormGroup, springProject: SpringProjectFormGroupInput): void {
    const springProjectRawValue = { ...this.getFormDefaults(), ...springProject };
    form.reset(
      {
        ...springProjectRawValue,
        id: { value: springProjectRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): SpringProjectFormDefaults {
    return {
      id: null,
    };
  }
}
