export interface ISpringProject {
  id: number;
  title?: string | null;
  description?: string | null;
  imagePath?: string | null;
  url?: string | null;
}

export type NewSpringProject = Omit<ISpringProject, 'id'> & { id: null };
