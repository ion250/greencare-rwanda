export interface Activity {
  id: number;
  action: string;
  details: string;
  time: string;
  type: 'article' | 'user' | 'product';
}