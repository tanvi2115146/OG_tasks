 getData()
  .then(data => {
    return processData(data); //returned issue in this as the other promise will recieve undefined in next
  })
  .then(result => {
    displayResult(result);
  });



//
  async function fetchUserData(userId) {
    const [user,posts,comments]=await Promise.all
       fetchUser(userId);
       fetchPosts(userId);
       fetchComments(userId);
  
    return { user, posts, comments };
  }