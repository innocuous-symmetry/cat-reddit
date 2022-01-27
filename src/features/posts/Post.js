import React from "react";
import './Post.css';

export default function Post({title,author,subreddit,ups,comments,time,id,media}) {
    
    return (
        <>
        <div className="post-body">
            <h1 className="title">{title ? title : 'title'}</h1>
            <img alt={title} src={media} />
            <div className="post-metadata">
                <p className="user">{author ? author : 'u/username'}</p>
                <p className="time-posted">{time ? time : ''}</p>
                <p className="num-comments">{comments ? comments : 'comments'}</p>
            </div>
        </div>
        </>
    );
}