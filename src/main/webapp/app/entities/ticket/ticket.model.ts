import dayjs from 'dayjs/esm';
import { IStudent } from 'app/entities/student/student.model';

export interface ITicket {
  id: number;
  issue?: string | null;
  timeStamp?: dayjs.Dayjs | null;
  student?: Pick<IStudent, 'id'> | null;
}

export type NewTicket = Omit<ITicket, 'id'> & { id: null };
