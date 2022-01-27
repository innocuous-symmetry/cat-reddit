import React, { useState, useEffect } from "react";
import { fetchBySub } from "./postsSlice";
import { selectAllSubs } from "../reddit/redditSlice";
import { useSelector, useDispatch } from "react-redux";
import { v4 } from "uuid";
import Post from "./Post";

export default function Feed() {
    const [feed, setFeed] = useState(null);                     // Expects to receive an array of Post components mapped with data from fetchBySub
    const [endpoints, setEndpoints] = useState(null);           // Expects to receive an array of endpoints from which to fetch the posts
    const dispatch = useDispatch();
    
    const subs = useSelector(selectAllSubs);                    // Selects subreddits from redditSlice
    const subArray = Object.values(subs);                       // Places the values within an array
    
    useEffect(() => {
        let isActive = true;

        const getPosts = async(subreddit) => {
            let myPosts = await dispatch(fetchBySub(subreddit));
            myPosts = myPosts.payload;                                  // sets myPosts to be the array of post objects fetched from the subreddit argument

            if (typeof myPosts === 'object' && isActive) {
                let newFeed = [];
                for (let post of myPosts) {                         // maps the data retrieved from fetchBySub onto Post components,
                    newFeed.push(                                   // then stores them in localized array
                        <Post 
                            title={post.data.title}
                            author={post.data.author}
                            subreddit={post.data.subreddit}
                            ups={post.data.ups}
                            comments={post.data.num_comments}
                            time={post.data.created_utc}
                            key={v4()}
                            media={post.data.post_hint === 'image' && post.data.url}
                            permalink={post.data.permalink}
                            selftext={post.data.selftext}
                            video={post.data.is_video ? post.data.media.reddit_video.fallback_url : null}
                        />
                    );
                }
                setFeed(newFeed);                // once populated, this array is sent to state as "feed" and rendered in this function's return method
            }
        };
        
        getPosts('https://www.reddit.com/r/cats.json');

        return () => {
            isActive = false;
        }

    }, [dispatch])

    return (
        <>
        {feed ? feed : <h1>Loading cats for you...</h1>}
        </>
    );
}