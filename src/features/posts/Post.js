import React, { useState, useEffect } from "react";
import './Post.css';

export default function Post({title,author,subreddit,ups,comments,time,key,media,permalink,selftext,video}) {
    const limit = 300;
    const [body, setBody] = useState(selftext);
    
    useEffect(() => {
        if (selftext.length > limit) {
            setBody(selftext.substring(0,limit) + '...');
        } else {
            return;
        }
    }, [setBody, selftext]);

    const handleHover = () => {
        setBody(selftext);
    }

    const handleMouseOut = () => {
        setBody(selftext.substring(0,limit) + '...');
    }
    
    return (
        <>
        <div className="post-body" onMouseOver={handleHover} onMouseOut={handleMouseOut}>
            <a className="title" href={`https://reddit.com${permalink}`}>{title ? title : 'title'}</a>
            {media ? <img alt={title} src={media} /> : ''}
            {video ? <video controls type="video/mp4" src={video}></video> : ''}
            <p className="post-text">{body}</p>
            <div className="post-metadata">
                <p className="user">{author ? 'u/' + author : 'u/username'}</p>
                <p className="time-posted">{time ? time : ''}</p>
                <p className="num-comments">{comments ? comments : 'comments'}</p>
            </div>
        </div>
        </>
    );
}