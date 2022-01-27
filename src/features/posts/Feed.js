import React, { useState, useEffect } from "react";
import { fetchBySub, fetchFromAll } from "./postsSlice";
import { selectAllSubs } from "../reddit/redditSlice";
import { useSelector, useDispatch } from "react-redux";
import { v4 } from "uuid";
import Post from "./Post";

export default function Feed() {
    const [endpoints, setEndpoints] = useState(null);           // Expects to receive an array of endpoints from which to fetch the posts
    const [data, setData] = useState(null);                     // Receives data from getPosts and them maps it onto Post components
    const [feed, setFeed] = useState(null);                     // Expects to receive an array of Post components mapped with data from fetchBySub
    const dispatch = useDispatch();
    
    const subs = useSelector(selectAllSubs);                    // Selects subreddits from redditSlice
    const subArray = Object.values(subs);                       // Places the values within an array

    
    
    useEffect(() => {                           // this useEffect loop pulls the endpoints from the selected subreddits and stores them as an array in "endpoints"
        const prepareData = () => {
            let myEndpoints = [];
            for (let sub of subArray) {
                myEndpoints.push(sub.access);
            }
            setEndpoints(myEndpoints);
        }

        if (subArray) {
            prepareData();
        }
    }, [setEndpoints]);

    
    
    useEffect(() => {               // once this is done, this loop pulls posts from each endpoint
        let isActive = true;

        const getPosts = async(arr) => {
            if (endpoints) {
                const mappedResults = arr.map(each => dispatch(fetchBySub(each)));
                return Promise.all([
                    ...mappedResults
                ]).then((results) => setData(results));         // data is now set to an object (returned promise)
            }
        }

        getPosts(endpoints);        // calls this logic on the current value of endpoints

        return () => {
            isActive = false;
        }

    }, [dispatch, setData, endpoints]);

    useEffect(() => {
        let isActive = true;

        const mapPosts = () => {            // the logic for extracting post data from the promise responses
            if (data) {
                let allPosts = [];
                for (let each of data) {
                    allPosts.push(each.payload);
                }

                let extractedPosts = [];               // logic for flattening arrays and reducing complex variable to a layer of post objects
                for (let each of allPosts) {
                    for (let indiv of each) {
                        extractedPosts.push(indiv);
                    }
                };

                extractedPosts = extractedPosts.sort((x,y) => x.created_utc > y.created_utc);     // sorts posts by sort time (to do: fix this)

                let newFeed = extractedPosts.map((post) => {
                    return (
                        <Post 
                            title={post.data.title}         // each variable passed in as props
                            author={post.data.author}
                            subreddit={post.data.subreddit}
                            ups={post.data.ups}
                            comments={post.data.num_comments}
                            time={post.data.created_utc}
                            key={v4()}
                            media={post.data.post_hint === 'image' && post.url}
                            permalink={post.data.permalink}
                            selftext={post.data.selftext}
                            video={post.data.is_video ? post.data.media.reddit_video.fallback_url : null}
                        />
                    );
                })

                setFeed(newFeed);
            }

        }

        mapPosts();

        return () => {
            isActive = false;
        }

    }, [data, setFeed])
    
    // useEffect(() => {
    //     let isActive = true;

    //     const getPosts = async() => {
    //         let myPosts = await dispatch(fetchBySub('https://www.reddit.com/r/cats.json'));
    //         myPosts = myPosts.payload;                                  // sets myPosts to be the array of post objects fetched from the subreddit argument

    //         if (typeof myPosts === 'object' && isActive) {
    //             let newFeed = [];
    //             for (let post of myPosts) {                         // maps the data retrieved from fetchBySub onto Post components,
    //                 newFeed.push(                                   // then stores them in localized array
    //                     <Post 
    //                         title={post.data.title}
    //                         author={post.data.author}
    //                         subreddit={post.data.subreddit}
    //                         ups={post.data.ups}
    //                         comments={post.data.num_comments}
    //                         time={post.data.created_utc}
    //                         key={v4()}
    //                         media={post.data.post_hint === 'image' && post.data.url}
    //                         permalink={post.data.permalink}
    //                         selftext={post.data.selftext}
    //                         video={post.data.is_video ? post.data.media.reddit_video.fallback_url : null}
    //                     />
    //                 );
    //             }
    //             setFeed(newFeed);                // once populated, this array is sent to state as "feed" and rendered in this function's return method
    //         }
    //     };
        
    //     getPosts();

    //     return () => {
    //         isActive = false;
    //     }

    // }, [dispatch])

    return (
        <>
        {feed ? feed : <h1>Loading cats for you...</h1>}
        </>
    );
}