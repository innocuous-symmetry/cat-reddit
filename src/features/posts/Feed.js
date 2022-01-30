import React, { useState, useEffect } from "react";
import { fetchBySub, /* selectPosts */ } from "./postsSlice";
import { selectAllSubs } from "../reddit/redditSlice";
import { useSelector, useDispatch } from "react-redux";
// import { updatePosts } from "./postsSlice";
import { v4 } from "uuid";
import Post from "./Post";

export default function Feed() {
    const [endpoints, setEndpoints] = useState(null);           // Expects to receive an array of endpoints from which to fetch the posts
    const [data, setData] = useState(null);                     // Receives data from getPosts and them maps it onto Post components
    const [feed, setFeed] = useState(null);                     // Expects to receive an array of Post components mapped with data from fetchBySub

    const [feedPages, setFeedPages] = useState(null);             // Expects an array of arrays (pages of feed posts)
    const [currentPage, setCurrentPage] = useState(0);          // Determines current feed page; corresponds to index of feedPage array
    const dispatch = useDispatch();

    // const posts = useSelector(selectPosts);
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
        const getPosts = async(arr) => {
            if (endpoints) {
                const mappedResults = arr.map(each => dispatch(fetchBySub(each)));      // maps each endpoint into a call to dispatch fetchBySub
                return Promise.all([
                    ...mappedResults                            // ...then promises each of the calls within this array,
                ]).then((results) => setData(results));         // and stores the returned promises in state as data
            }
        }

        getPosts(endpoints);
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
                    )
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


    useEffect(() => {
        let isActive = false;

        if (!feed) {
            isActive = false;
        } else if (feed) {
            isActive = true;
        }

        if (isActive) {
            try {
                let allPages = [];
                for (let i = 0; i < feed.length; i += 10) {
                    let indivPage = [];
                    indivPage = feed.slice(i,i+10);
                    allPages.push(indivPage);
                }
                setFeedPages(allPages);
            } catch(e) {
                console.log(e);
            }
        }

        return () => {
            isActive = false;
        }
    },[feed, setFeedPages]);


    // useEffect(() => {                   // this loops handles mapping the feed onto individual pages,
    //     let isActive = true;            // allowing the application to render subsets of the whole feed at once, reducing render times

    //     const doPages = async () => {
    //         try {
    //             let localFeed = await feed;

    //             if (localFeed) {
    //                 for (let i = 0; i < feed.length; i += 10) {
    //                     let allPages = [];
    //                     for (let j = 0; j < 10; j++) {
    //                         let indivPage = [];
    //                         if (feed[i+j]) {
    //                             indivPage.push(feed[i+j])
    //                         } else {
    //                             return;
    //                         }
    //                         allPages.push(indivPage);
    //                     }
    //                     setFeedPages(allPages);
    //                 }
    //             }
    //         } catch(e) {
    //             console.log(e);
    //         }
    //     }

    //     if (isActive && feed) {
    //         doPages();
    //     }

    //     return () => {
    //         isActive = false;
    //     }

    // }, [feed, feedPages]);

    const handleIncrement = () => {
        if (currentPage + 1 > feedPages.length) {
            return;
        } else {
            setCurrentPage((prev) => prev+1);
            window.scrollTo(0,0);
        }
    }

    const handleDecrement = () => {
        if (currentPage - 1 < 0) {
            return;
        } else {
            setCurrentPage((prev) => prev-1);
            window.scrollTo(0,0);
        }
    }

    return (
        <>
        {feedPages ? 

        <div className="page-handling" id="top-page-handling">
            <button className="decrement" onClick={handleDecrement}>-</button>
            <p>Page {currentPage} of {feedPages.length ? feedPages.length : 'unknown'}</p>
            <button className="increment" onClick={handleIncrement}>+</button>
        </div>

        : null }

        {feedPages ? feedPages[currentPage] : <h1 className="loading-message">Loading cats for you...</h1>}
        {feedPages ? 

        <div className="page-handling" id="bottom-page-handling">
            <button className="decrement" onClick={handleDecrement}>-</button>
            <p>Page {currentPage} of {feedPages.length ? feedPages.length : 'unknown'}</p>
            <button className="increment" onClick={handleIncrement}>+</button>
        </div>

        : null }
        </>
    );
}