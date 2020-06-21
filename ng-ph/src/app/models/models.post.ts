import User from './models.user';
import Comment from './models.comment';

export default class Post {
  id?: number;
  imageURL: string;
  title: string;
  date: string;
  postedBy: string;
  likedBy: User[];
  comments: Comment[];
}
