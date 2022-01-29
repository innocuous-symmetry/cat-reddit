import React, { useState, useEffect } from "react";
import './Post.css';

export default function Post({data, key}) {
    
    let title = data.title;                 // imports from data passed in from Feed
    let author = data.author;
    let subreddit = data.subreddit;
    let ups = data.ups;
    let comments = data.num_comments;
    let time = data.created_utc;
    let media = data.post_hint === 'image' && data.url;
    let permalink = data.permalink;
    let selftext= data.selftext;
    let video = data.is_video ? data.media.reddit_video.fallback_url : null;       // to do: handle media edge cases, especially video

    const limit = 300;
    const [body, setBody] = useState(selftext);


    const postDate = new Date(time * 1000);                 // handles conversion from unix timestamp to local time and date strings
    const localTime = postDate.toLocaleTimeString();
    const localDate = postDate.toLocaleDateString();
    
    useEffect(() => {
        if (selftext.length === 0) {            // in the case that the post body is empty, it does not include an ellipsis on mouseout
            return;
        } else if (selftext.length > limit) {
            setBody(selftext.substring(0,limit) + '...');
        } else {
            return;
        }
    }, [setBody, selftext]);

    const handleHover = () => {
        setBody(selftext);
    }

    const handleMouseOut = () => {
        if (selftext.length === 0) {        // ...and then doesn't add it in after a mouseover/out
            return;
        }

        setBody(selftext.substring(0,limit) + '...');
    }
    
    return (
        <>
        <div className="post-body" key={key}>

            {title ?
                <a className="title" href={`https://reddit.com${permalink}`}>{title}</a>
            : <p>[untitled]</p>}

            {media ? <img alt={title} src={media} /> : ''}

            {video ? 
                <video controls type="video/mp4" src={video}></video>
            : ''}

            {body ?
                <p onMouseOver={handleHover} onMouseOut={handleMouseOut}>{body}</p>
            : ''}

            <div className="post-metadata">
                <a href={`https://www.reddit.com${permalink}`}>
                    {subreddit ? 'r/' + subreddit  : ''}
                </a>
                
                <p className="user">{author ? 'u/' + author : 'u/username'}</p>
                <p className="time-posted">posted at {time ? (localTime + ' on ' + localDate) : '...?'}</p>
                <p className="num-comments">{comments ? comments : 'no'} comments</p>
            </div>

            <div className="comment-section">
            </div>

        </div>
        </>
    );
}