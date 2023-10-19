export interface IAirplane {
  id: number;
  model?: string | null;
  make?: string | null;
  color?: string | null;
}

export type NewAirplane = Omit<IAirplane, 'id'> & { id: null };
