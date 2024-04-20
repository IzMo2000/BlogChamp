// Facades.js

// userFacade class

export class UserFacade {
    constructor(username, password, email, age, bio) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.age = age;
        this.bio = bio;
    }
  
    static async createUser(userData) {
        try {
            const response = await fetch(`http://localhost:4000/api/users/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
  
            if (response.ok) {
                const user = await response.json();
                return user;
            } else {
                throw new Error('Error saving user data. Please try again later.');
            }
        } catch (error) {
            throw new Error('An error occurred. Please try again later.');
        }
    }
  
    static async fetchUserByUsername(username) {
        try {
            const response = await fetch(`http://localhost:4000/api/users/username/${username}`);
            return response;
        } catch (error) {
            throw new Error('An error occurred. Please try again later.');
        }
    }
  }
  

export class PostFacade {
  constructor(like_count, num_comments, date_created, user_id, content, title, blog_id) {
      this.like_count = like_count;
      this.num_comments = num_comments;
      this.date_created = date_created;
      this.user_id = user_id;
      this.content = content;
      this.title = title;
      this.blog_id = blog_id;
  }

  static async createPost(postData) {
      try {
          const response = await fetch(`http://localhost:4000/api/posts/`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(postData)
          });

          if (response.ok) {
              const post = await response.json();
              return post;
          } else {
              throw new Error('Error saving post data. Please try again later.');
          }
      } catch (error) {
          throw new Error('An error occurred. Please try again later.');
      }
  }
}

// blogFacade class
export class BlogFacade {
  constructor(user, title, contents, creation_date) {
      this.user = user;
      this.title = title;
      this.contents = contents;
      this.creation_date = creation_date;
  }

  static async createBlog(blogData) {
      try {
          const response = await fetch(`http://localhost:4000/api/blogs/`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(blogData)
          });

          if (response.ok) {
              const blog = await response.json();
              return blog;
          } else {
              throw new Error('Error saving blog data. Please try again later.');
          }
      } catch (error) {
          throw new Error('An error occurred. Please try again later.');
      }
  }
}