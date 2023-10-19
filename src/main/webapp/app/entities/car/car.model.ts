export interface ICar {
  id: number;
  motorSize?: string | null;
  modelName?: string | null;
  wheelSize?: string | null;
  transmission?: string | null;
  color?: string | null;
  yearOf?: number | null;
  price?: number | null;
}

export type NewCar = Omit<ICar, 'id'> & { id: null };
