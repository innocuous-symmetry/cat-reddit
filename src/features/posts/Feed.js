import React, { useState, useEffect } from "react";
import { fetchBySub, selectPosts } from "./postsSlice";
import { selectAllSubs } from "../reddit/redditSlice";
import { useSelector, useDispatch } from "react-redux";
import { updatePosts } from "./postsSlice";
import { v4 } from "uuid";
import Post from "./Post";

export default function Feed() {
    const [endpoints, setEndpoints] = useState(null);           // Expects to receive an array of endpoints from which to fetch the posts
    const [data, setData] = useState(null);                     // Receives data from getPosts and them maps it onto Post components
    const [feed, setFeed] = useState(null);                     // Expects to receive an array of Post components mapped with data from fetchBySub
    const dispatch = useDispatch();

    const posts = useSelector(selectPosts);
    const subs = useSelector(selectAllSubs);                    // Selects subreddits from redditSlice
    
    useEffect(() => {                                // this useEffect loop pulls the endpoints from the selected subreddits and stores them as an array in "endpoints"
        const subArray = Object.values(subs);        // extracts values from selected subs

        const prepareData = () => {
            let myEndpoints = [];
            for (let sub of subArray) {             // this loop filters subs which are set to isSelected in state
                if (sub.isSelected) {
                    myEndpoints.push(sub.access);
                } else {
                    continue;
                }
            }
            setEndpoints(myEndpoints);
        }

        if (subArray) {
            prepareData();
        }
    }, [setEndpoints, subs]);

    
    
    useEffect(() => {               // once this is done, this loop pulls posts from each endpoint
        let isActive = true;

        const getPosts = async(arr) => {
            if (endpoints) {
                const mappedResults = arr.map(each => dispatch(fetchBySub(each)));      // maps each endpoint into a call to dispatch fetchBySub
                return Promise.all([
                    ...mappedResults                            // ...then promises each of the calls within this array,
                ]).then((results) => setData(results));         // and stores the returned promises in state as data
            }
        }

        getPosts(endpoints);

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

                console.log(extractedPosts);

                const comparePosts = (a,b) => {                                 // sorting function: compares time posted within each object in array
                    if (a.data.created_utc > b.data.created_utc) {
                        return -1;
                    } else if (a.data.created_utc < b.data.created_utc) {
                        return 1;
                    } else {
                        return 0;
                    }
                }

                let sortedPosts = extractedPosts.sort(comparePosts);        // implements sorting function

                let newFeed = sortedPosts.map((post) => {
                    return (
                        <Post 
                            data={post.data}
                            key={v4()}
                        />
                    );
                })
                // dispatch(updatePosts(newFeed));    // stores current feed in state of postsSlice
                setFeed(newFeed);
            }

        }

        if (isActive) {
            mapPosts();
        }

        return () => {
            isActive = false;
        }

    }, [data, setFeed, dispatch]);

    return (
        <>
        {feed ? feed : <h1>Loading cats for you...</h1>}
        </>
    );
}