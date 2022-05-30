import { Post } from '../interfaces/post';

export interface User {
  username: string;
  email: string;
  password: string;
  _id: string;
  name: string;
  age: number;
  pfp?: string | ArrayBuffer | null | undefined;
  city?: string;
  posts: Post[];
}