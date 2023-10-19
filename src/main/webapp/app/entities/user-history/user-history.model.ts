import dayjs from 'dayjs/esm';

export interface IUserHistory {
  id: number;
  name?: string | null;
  issue?: string | null;
  issueDate?: dayjs.Dayjs | null;
}

export type NewUserHistory = Omit<IUserHistory, 'id'> & { id: null };
