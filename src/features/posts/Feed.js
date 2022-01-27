import React, { useState, useEffect } from "react";
import { fetchBySub, updatePosts, selectPosts } from "./postsSlice";
import { selectAllSubs } from "../reddit/redditSlice";
import { useSelector, useDispatch } from "react-redux";
import { v4 } from "uuid";
import Post from "./Post";

export default function Feed() {
    const [feed, setFeed] = useState(null);
    const dispatch = useDispatch();
    
    useEffect(() => {
        let isActive = true;

        const getPosts = async() => {
            let myPosts = await dispatch(fetchBySub('https://www.reddit.com/r/cats.json'));
            myPosts = myPosts.payload;

            if (typeof myPosts === 'object' && isActive) {
                let newFeed = [];
                for (let post of myPosts) {
                    newFeed.push(
                        <Post 
                            title={post.data.title}
                            author={post.data.author}
                            subreddit={post.data.subreddit}
                            ups={post.data.ups}
                            comments={post.data.num_comments}
                            time={post.data.created_utc}
                            id={v4()}
                            media={post.data.post_hint === 'image' && post.data.url}
                        />
                    );
                }
                setFeed(newFeed);
            }
        };
        getPosts();

        return () => {
            isActive = false;
        }

    }, [dispatch])

    useEffect(() => {
        console.log(feed);
    }, [feed])

    return (
        <>
        {feed}
        </>
    );
}