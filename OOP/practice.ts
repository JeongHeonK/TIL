// creating Posts
// commenting Posts
// sharing Posts

// Admin, Regular user

interface Post {
  title: string;
  content: string;
}

interface Comment {
  title: string;
  content: string;
}

interface CreatingPosts {
  creatingPost(post: Post): void;
}

interface CommentingPosts {
  commentingPost(comment: Comment): void;
}

interface SharingPosts {
  sharingPosts(post: Post): void;
}

class Admin implements CreatingPosts, CommentingPosts, SharingPosts {
  creatingPost(post: Post): void {
    console.log("creating");
  }

  commentingPost(comment: Comment): void {
    console.log("commenting");
  }

  sharingPosts(post: Post): void {
    console.log("sharing....");
  }
}
class Regular implements CommentingPosts, SharingPosts {
  commentingPost(comment: Comment): void {
    console.log("commenting");
  }

  sharingPosts(post: Post): void {
    console.log("sharing....");
  }
}
