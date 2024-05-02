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
        // api call to create user 
        try {
            const response = await fetch(`http://localhost:4000/api/users/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            // check for good response 
            if (response.ok) {
                const user = await response.json();

                // return new user 
                return user;

            // else, bad response and send error moessage 
            } else {
                throw new Error('Error saving user data. Please try again later.');
            }
        } catch (error) {
            throw new Error('An error occurred. Please try again later.');
        }
    }
  
    // fetch user by username 
    static async fetchUserByUsername(username) {
        // api call to get user 
        try {
            const response = await fetch(`http://localhost:4000/api/users/username/${username}`);
            const user = await response.json(); // Wait for response data
            return user;

        // failed to get user 
        } catch (error) {
            throw new Error('An error occurred. Grabbing username.');
        }
    }

    // fetch user by id 
    static async fetchUserByUserid(user_id) {
        // api call 
        try {
            const response = await fetch(`http://localhost:4000/api/users/id/${user_id}`);
            const userData = await response.json();
            return userData;
        } catch (error) {
            throw new Error('An error occurred. Please try again later.');
        }
    }

    // update user 
    static async updateUser(user) {
        console.log(user)
        // api call to update user 
        try {
            const response = await fetch(`http://localhost:4000/api/users/${user._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            // check for good response 
            if (response.ok) {
                const user = await response.json();
                return user;
            // else, bad response so throw error 
            } else {
                throw new Error('Error saving user data. Please try again later.');
            }
        } catch (error) {
            throw new Error('An error occurred. Please try again later.');
        }
    }
  }
  
// post facade to handle post functinos 
export class PostFacade {
    // constructor for post 
    constructor(like_count, num_comments, date_created, user_id, content, title, blog_id) {
        this.like_count = like_count;
        this.num_comments = num_comments;
        this.date_created = date_created;
        this.user_id = user_id;
        this.content = content;
        this.title = title;
        this.blog_id = blog_id;
    }
  
    // create post function 
    static async createPost(postData) {
        // post api call to create a post 
        try {
            const response = await fetch(`http://localhost:4000/api/posts/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });

            // check for good response 
            if (response.ok) {
                const post = await response.json();
                return post;
            // else, bad response so throw error 
            } else {
                throw new Error('Error saving post data. Please try again later.');
            }
        // catch error 
        } catch (error) {
            throw new Error('An error occurred. Please try again later.');
        }
    }
  
    // update post's like count 
    static async updatePostLikeCount(postId, newLikeCount) {
        // patch api call for relevant post 
        try {
            const response = await fetch(`http://localhost:4000/api/posts/${postId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    like_count: newLikeCount
                })
            });
            // check for bad response and throw error 
            if (!response.ok) {
                throw new Error('Failed to update like count');
            }
        } catch (error) {
            throw new Error('An error occurred while updating like count');
        }
    }

    // fetch posts by user id 
    static async fetchPostsByUserID(userID) {
        try {
            // fetch api for user 
            const posts_response = await fetch(`http://localhost:4000/api/posts/user_id/${userID}`);
            console.log('Fetch Friends Response: ', posts_response);
            // get posts for user 
            const posts = await posts_response.json(); // Wait for response data
            return posts;
        } catch (error) {
            throw new Error('An error occurred while fetching posts.');
        }
    }

    // get all posts 
    static async fetchAllPosts(){
        try {
            const response = await fetch('http://localhost:4000/api/posts');
            const posts = await response.json();
            return posts;
        } catch (error) {
            throw new Error('An Error occured white fetching all post.');
        }
    }


    // update post's comment count 
    static async updatePostCommentCount(postId, newCommentCount) {
        // api patch call 
        try {
            const response = await fetch(`http://localhost:4000/api/comments/${postId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                // update comment count with new value 
                body: JSON.stringify({
                    num_comments: newCommentCount
                })
            });
  
            // check for bad response 
            if (!response.ok) {
                throw new Error('Failed to update comment count');
            }
        } catch (error) {
            throw new Error('An error occurred while updating comment count');
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
  // create blog 
  static async createBlog(blogData) {
      console.log(blogData)
      // api post call to create a blog in db
      try {
          const response = await fetch(`http://localhost:4000/api/blogs/`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(blogData)
          });
          // check for good response 
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
  // fetch blog by user's id 
  static async fetchBlogByUserid(user_id){
    // call api to fetch blog 
      try {
          const blog_response = await fetch(`http://localhost:4000/api/blogs/userid/${user_id}`);
          const blog = await blog_response.json(); // Wait for response data
          console.log(blog)

          // return blog 
          return blog;

      } catch (error) {
          throw new Error('An error occurred while fetching blog by user id.');
      }
}
}

// friend facade 
export class FriendFacade {
    // constructor
    constructor(user_one, user_two){
        this.user_one = user_one;
        this.user_two = user_two;
    }

    // fetch friends by user id 
    static async fetchFriendsByUserid(user_one){
        try {
            // fetch user one's friends 
            const friends_response = await fetch(`http://localhost:4000/api/friends/user_id/${user_one}`);
            console.log('Fetch Friends Response: ', friends_response);
            const friends = await friends_response.json(); // Wait for response data
            // return friends
            return friends;
        } catch (error) {
            throw new Error('An error occurred while fetching friends.');
        }
    }

    // add friend
    static async addFriend(user_one, user_two) {
        // api post call to add a friend
        try {
            const response = await fetch('http://localhost:4000/api/friends', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_one, user_two }),
            });
            // check for bad response and throw error
            if (!response.ok) {
                throw new Error('Failed to add friend');
            }
            return await response.json();
        } catch (error) {
            throw new Error('An error occurred while adding friend.');
        }
    }
}

// comment facade 
export class CommentFacade {
    // constructor
    constructor(date_posted, post_id, content, user_id){
        this.date_posted = date_posted;
        this.post_id = post_id;
        this.content = content;
        this.user_id = user_id;
    }
    // create comment
    static async createComment(post_id, commentData) {
        // post api call to create a comment 
        try {
            const response = await fetch(`http://localhost:4000/api/comments/${post_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // use comment's data
                body: JSON.stringify(commentData)
            });

            // check for good response 
            if (response.ok) {
                const comment = await response.json();
                return comment;
            // else, bad response so throw error 
            } else {
                throw new Error('Error saving comment data. Please try again later.');
            }
        } catch (error) {
            throw new Error('An error occurred while creating comment');
        }
    }

    // fetch comments 
    static async fetchComments(postId) {
        try {
          const response = await fetch(`http://localhost:4000/api/comments/${postId}`);
          const comments = await response.json();
          return comments;
        } catch (error) {
          throw new Error('An error occurred while fetching comments');
        }
      }
    
}

