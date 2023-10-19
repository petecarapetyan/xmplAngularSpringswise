import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IMovie, NewMovie } from '../movie.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IMovie for edit and NewMovieFormGroupInput for create.
 */
type MovieFormGroupInput = IMovie | PartialWithRequiredKeyOf<NewMovie>;

type MovieFormDefaults = Pick<NewMovie, 'id'>;

type MovieFormGroupContent = {
  id: FormControl<IMovie['id'] | NewMovie['id']>;
  name: FormControl<IMovie['name']>;
  yearOf: FormControl<IMovie['yearOf']>;
  genre: FormControl<IMovie['genre']>;
  rating: FormControl<IMovie['rating']>;
};

export type MovieFormGroup = FormGroup<MovieFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class MovieFormService {
  createMovieFormGroup(movie: MovieFormGroupInput = { id: null }): MovieFormGroup {
    const movieRawValue = {
      ...this.getFormDefaults(),
      ...movie,
    };
    return new FormGroup<MovieFormGroupContent>({
      id: new FormControl(
        { value: movieRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(movieRawValue.name),
      yearOf: new FormControl(movieRawValue.yearOf),
      genre: new FormControl(movieRawValue.genre),
      rating: new FormControl(movieRawValue.rating),
    });
  }

  getMovie(form: MovieFormGroup): IMovie | NewMovie {
    return form.getRawValue() as IMovie | NewMovie;
  }

  resetForm(form: MovieFormGroup, movie: MovieFormGroupInput): void {
    const movieRawValue = { ...this.getFormDefaults(), ...movie };
    form.reset(
      {
        ...movieRawValue,
        id: { value: movieRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): MovieFormDefaults {
    return {
      id: null,
    };
  }
}
