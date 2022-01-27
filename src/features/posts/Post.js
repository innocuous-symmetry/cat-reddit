import React from "react";
import './Post.css';

export default function Post({props}) {
    
    return (
        <>
        <div className="post-body">
            <h1 className="title">Post title</h1>
            <div className="image-placeholder"></div>
            <div className="post-metadata">
                <p className="user">u/username</p>
                <p className="time-posted">posted at midnight</p>
                <p className="num-comments">a million comments</p>
            </div>
        </div>
        </>
    );
}