import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBySub = createAsyncThunk(
    'posts/fetchBySub',
    async(subreddit) => {    // expects an argument corresponding to the url, in json format, of a given subreddit
        try {
            const myRequest = new Request(subreddit);   // initializes request
            let response = await fetch(myRequest);
            let json = await response.json();
            let postsArray = json.data.children;        // unpacks individual post objects from the subreddit JSON response, as an array
            return postsArray;
        } catch(e) {
            console.log(e);
        }
    }
);

export const fetchComments = createAsyncThunk(
    'posts/fetchComments',
    async(permalink) => {
        try {
            const myRequest = new Request(`${permalink}.json`);
            let response = await fetch(myRequest);
            let json = await response.json();
            let postData = json.data.children;
            return postData;
        } catch(e) {
            console.log(e);
        }
    }
)

export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        requestsPending: false,
        requestDenied: false,
    },
    reducers: {
        filterPosts(state,action) {             // Expects action.payload to be the searchterm imported from the state of searchBar
            state.posts.filter(post => (post.data.title !== action.payload) && (post.data.selftext !== action.payload));
        },
        updatePosts(state,action) {
            state.posts = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBySub.pending, (state,action) => {
            state.requestsPending = true;
            state.requestDenied = false;
        })
        builder.addCase(fetchBySub.rejected, (state,action) => {
            state.requestsPending = false;
            state.requestDenied = true;
        })
        builder.addCase(fetchBySub.fulfilled, (state,action) => {
            state.requestsPending = false;
            state.requestDenied = false;
            for (let sub in action.payload) {       // iterates over postsArray to avoid
                state.posts.push(sub);              // nesting arrays within the state's posts
            }
        })
    }
});

export default postsSlice.reducer;
export const selectPosts = state => state.postsSlice.posts;
export const { filterPosts, updatePosts } = postsSlice.actions;
// exports also includes fetchBySub (takes argument of a sub)