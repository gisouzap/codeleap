const selectUsername = state => state.user.username;

const selectIsLoggedIn = state => state.user.isLoggedIn;

const selectPosts = state => state.posts.items;

export { selectIsLoggedIn, selectUsername, selectPosts };
