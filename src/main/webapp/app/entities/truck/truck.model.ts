export interface ITruck {
  id: number;
  modelName?: string | null;
  make?: string | null;
  motorSize?: number | null;
  color?: string | null;
}

export type NewTruck = Omit<ITruck, 'id'> & { id: null };
