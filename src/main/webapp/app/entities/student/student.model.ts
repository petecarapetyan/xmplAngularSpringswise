export interface IStudent {
  id: number;
  name?: string | null;
  initials?: string | null;
}

export type NewStudent = Omit<IStudent, 'id'> & { id: null };
