import Profile from 'src/app/profile/models/profile.model';
import Comment from './comment.model';

export default class Post {
  id?: number;
  imageURL: string;
  title: string;
  date: string;
  postedBy: Profile;
  likedBy: number[];
  //comments: Comment[];
}
