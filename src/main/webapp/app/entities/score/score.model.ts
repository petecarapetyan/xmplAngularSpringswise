export interface IScore {
  id: number;
  points?: string | null;
}

export type NewScore = Omit<IScore, 'id'> & { id: null };
