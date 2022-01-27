import React, { useState } from "react";
import { fetchBySub, updatePosts, selectPosts } from "./postsSlice";
import { selectAllSubs } from "../reddit/redditSlice";
import { useSelector, useDispatch } from "react-redux";
import { v4 } from "uuid";
import Post from "./Post";

export default function Feed() {
    const [feed, setFeed] = useState(null);
    const dispatch = useDispatch();
    const allSubs = useSelector(selectAllSubs);
    
    const doTheThing = async() => {
        try {
            let myPromises = [];
            for (let sub in allSubs) {
                myPromises.push(dispatch(fetchBySub(sub)));
            }
            let response = await Promise.all([...myPromises]).then((response) => dispatch(updatePosts(response)));
            console.log(response);
        } catch(e) {
            console.log(e);
        }
    }

    doTheThing();

    const allPosts = useSelector(selectPosts);

    const handlePosts = () => {
        if (allPosts) {
            try {
                allPosts.forEach((post) => {
                    setFeed((prev) => [
                        ...prev,
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
                    ])
                })
            } catch(e) {
                console.log(e);
            }
        }
    }

    handlePosts();

    return (
        <div className="all-posts">
            {feed}
        </div>
    );
}