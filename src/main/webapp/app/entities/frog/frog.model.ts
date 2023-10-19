export interface IFrog {
  id: number;
  name?: string | null;
  age?: number | null;
  species?: string | null;
}

export type NewFrog = Omit<IFrog, 'id'> & { id: null };
