export default class PostDetail {
  id?: number;
  imageURL: string;
  title: string;
  date: string;
  postedBy: string;
  likedBy: number[];
  comments: Comment[];
}
