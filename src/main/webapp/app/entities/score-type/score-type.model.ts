export interface IScoreType {
  id: number;
  name?: string | null;
}

export type NewScoreType = Omit<IScoreType, 'id'> & { id: null };
