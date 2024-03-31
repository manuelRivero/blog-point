import { Category } from "./categories";

export interface Blog {
  _id: string;
  user: BlogUser | BlogUser[];
  title: string;
  description: string;
  content: string;
  likes: [];
  slug: string;
  image: string;
  createdAt: string;
  category: Category;
  targetLike: boolean;
}

export interface BlogUser {
  _id: string,
  email: string,
  avatar: string,
  createdAt: string,
  updatedAt: string,
  slug: string,
  lastName: string,
  name: string

}
