export interface Domain {
  id: number;
  url: string;
  title?: string;
  description?: string;
  created_at: Date;
  updated_at: Date;

  expanded?: boolean;
  selected?: boolean;
}
