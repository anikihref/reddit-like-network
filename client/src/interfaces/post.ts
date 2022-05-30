export type importance = 1 | 2 | 3 | 4 | 5;

export interface Post {
  title: string;
  content?: string;
  importance?: importance;
  img?: string;
  _id: string;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
  author: string;
  likedBy: string[]
}