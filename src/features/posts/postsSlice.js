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
            const myRequest = new Request(`https://www.reddit.com${permalink}.json`);
            let response = await fetch(myRequest);
            let postData = await response.json();                   // returns an array of two objects, the first containing data about
            return postData;                                        // the post, the second containing data about the discussion thread
        } catch(e) {
            console.log(e);
        }
    }
);

export const searchByActive = createAsyncThunk(
    'posts/searchByActive',
    async(obj) => {
        const { sub, term } = obj;
        try {
            let fulfilledResponse;
            const myRequest = new Request(`https://www.reddit.com/${sub}/search.json?q=${term}&restrict_sr=1&sr_nsfw=`);
            let response = await fetch(myRequest);
            if (response.ok) {
                let searchData = await response.json();
                fulfilledResponse = searchData;
            }
            return fulfilledResponse;

        } catch(e) {
            console.log(e);
        }
    }
)

export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        activeComments: [],
        searchResults: [],
        requestsPending: false,
        requestDenied: false,
    },
    reducers: {
        filterPosts(state,action) {             // Expects action.payload to be the searchterm imported from the state of searchBar
            state.posts.filter(post => (post.data.title !== action.payload) && (post.data.selftext !== action.payload));
        },
        updatePosts(state,action) {
            state.posts = action.payload;
        }
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

        builder.addCase(fetchComments.pending, (state,action) => {
            state.requestsPending = true;
            state.requestDenied = false;
        })
        builder.addCase(fetchComments.rejected, (state,action) => {
            state.requestsPending = false;
            state.requestDenied = true;
        })
        builder.addCase(fetchComments.fulfilled, (state,action) => {
            state.requestsPending = false;
            state.requestDenied = false;
            state.activeComments.push(action.payload);
        })

        builder.addCase(searchByActive.pending, (state,action) => {
            state.requestsPending = true;
            state.requestDenied = false;
        })
        builder.addCase(searchByActive.rejected, (state,action) => {
            state.requestsPending = false;
            state.requestDenied = true;
        })
        builder.addCase(searchByActive.fulfilled, (state,action) => {
            state.requestsPending = false;
            state.requestDenied = false;
            state.searchResults = action.payload;
        })
    }
});

export default postsSlice.reducer;
export const selectPosts = state => state.postsSlice.posts;
export const isPending = state => state.postsSlice.requestsPending;
export const selectSearchResults = state => state.postsSlice.searchResults;
export const { filterPosts, updatePosts } = postsSlice.actions;
// exports also includes fetchBySub (takes argument of a sub)
// exports also includes fetchComments (takes argument of a post permalink)
// exports also includes searchByActive