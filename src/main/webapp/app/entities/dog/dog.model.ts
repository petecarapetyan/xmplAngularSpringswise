export interface IDog {
  id: number;
  name?: string | null;
  age?: number | null;
  breed?: string | null;
}

export type NewDog = Omit<IDog, 'id'> & { id: null };
