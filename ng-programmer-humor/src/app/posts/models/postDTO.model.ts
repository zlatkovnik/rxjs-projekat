import Comment from './comment.model';

export default class PostDTO {
  id?: number;
  imageURL: string;
  title: string;
  date: string;
  postedBy: number;
  likedBy: number[];
  comments: Comment[];
}
