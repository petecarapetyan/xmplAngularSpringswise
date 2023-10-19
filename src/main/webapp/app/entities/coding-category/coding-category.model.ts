export interface ICodingCategory {
  id: number;
  name?: string | null;
}

export type NewCodingCategory = Omit<ICodingCategory, 'id'> & { id: null };
