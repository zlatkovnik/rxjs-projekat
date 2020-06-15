import User from './models.user';
import Comment from './models.comment';

export default class Post {
  id: number;
  imageURL: string;
  title: string;
  postedBy: string;
  upVotedBy: User[];
  downVotedBy: User[];
  comments: Comment[];
}
