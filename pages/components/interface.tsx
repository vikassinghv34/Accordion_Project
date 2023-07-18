interface commentData {
    data:comment[];
  }
  
interface comment{
  id: number;
  body: string;
  postId: string;
  user: userData[];
}

  interface userData {
    id: number;
    username: string;
  }