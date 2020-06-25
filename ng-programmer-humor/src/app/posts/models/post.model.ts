export default class Post {
  id?: number;
  imageURL: string;
  title: string;
  date: string;
  postedBy: string;
  likedBy: number[];
  //comments: Comment[];
}
