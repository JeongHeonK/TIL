class BlogPost {
  title: string;
  content: string;

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }
}

class CreatePost {
  post: BlogPost;
  constructor(blogPost: BlogPost) {
    this.post = blogPost;
  }

  create() {}
}

class UpdatePost {
  post: BlogPost;
  constructor(blogPost: BlogPost) {
    this.post = blogPost;
  }

  update() {}
}

class DeletePost {
  post: BlogPost;
  constructor(blogPost: BlogPost) {
    this.post = blogPost;
  }

  delete() {}
}

class BlogPostDisplay {
  post: BlogPost;
  constructor(blogPost: BlogPost) {
    this.post = blogPost;
  }

  displayHTML(targetNode: HTMLElement) {
    const wrapper = document.createElement("div");

    const title = document.createElement("h1");
    title.textContent = this.post.title;

    const content = document.createElement("p");
    content.textContent = this.post.content;

    wrapper.append(title);
    wrapper.append(content);

    return wrapper;
  }
}

class BlogPostJson {
  blogPost: BlogPost;
  constructor(blogPost: BlogPost) {
    this.blogPost = blogPost;
  }

  returnJSON() {
    return JSON.stringify(this.blogPost);
  }
}
