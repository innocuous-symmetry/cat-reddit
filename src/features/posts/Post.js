import React, { useState, useEffect } from "react";
import Discussion from "../discussion/Discussion";
import VideoPlayer from "../video/VideoPlayer";
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
    let selftext = data.selftext;

    const limit = 300;
    const [body, setBody] = useState(selftext);
    const [visible, setVisible] = useState('show ');
    const [commentStyle, setCommentStyle] = useState('comments-hidden');

    const postDate = new Date(time * 1000);                 // handles conversion from unix timestamp to local time and date strings
    const localTime = postDate.toLocaleTimeString();
    const localDate = postDate.toLocaleDateString();

    /*********
     * Handles hiding/showing comment threads. When this is clicked, the thread is fetched, parsed, and displayed.
     * Doing so for all posts at once would reduce rendering times.
    *********/

    const handleClick = () => {
        if (visible === 'hide ') {
            setVisible('show ');
            setCommentStyle('comments-hidden');
        } else if (visible === 'show ') {
            setVisible('hide ');
            setCommentStyle('comments-visible');
        } else {
            throw new Error('error in button handling in Post.js');
        }
    }

    /*********
     * Functions below to handle post body so as not to clog visual space
    *********/
    
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

    const handleCrosspost = () => {
        if (data.crosspost_parent_list[0].is_video) {
            return (
                <>
                <VideoPlayer data={data} src={data.crosspost_parent_list[0].url} />
                <p className="crosspost-from">Crosspost from {data.crosspost_parent_list[0].subreddit_name_prefixed}</p>
                </>
            );
        } else if (data.crosspost_parent_list[0].url && !data.url) {
            return (
                <>
                <img alt={title} src={data.crosspost_parent_list[0].url} />
                <p className="crosspost-from">Crosspost from {data.crosspost_parent_list[0].subreddit_name_prefixed}</p>
                </>
            )
        } else {
            return;
        }
    }

    // Render function below:
    // Each is preceded by a conditional so the program does not throw an error
    // before the fetch requests' promises are fulfilled.
    
    return (
        <>
        <div className="post-body" key={key}>

            {title ?
                <a className="title" href={`https://reddit.com${permalink}`}>{title}</a>
            : <p>[untitled]</p>}

            {media ? <img alt={title} src={media} /> : null}

            {data.crosspost_parent_list ? handleCrosspost() : null}

            {data.gallery_data ?
                <p className="gallery-statement">View the gallery of photos corresponding to this post <a href={data.url}>here</a>.</p>
            : null}

            {data.is_video ?
                <VideoPlayer data={data} />
            : null}

            {body ?
                <p onMouseOver={handleHover} onMouseOut={handleMouseOut}>{body}</p>
            : ''}

            <div className="post-metadata">
                <p className="user">{author ? 'u/' + author : 'u/username'}</p>
                <a className="post-subreddit" href={`https://www.reddit.com/r/${subreddit}`}>
                    {subreddit ? 'r/' + subreddit  : ''}
                </a>
                {ups ? <p className="hide-mobile">{ups} upvotes</p> : null}
                <p className="time-posted hide-mobile">posted at {time ? (localTime + ' on ' + localDate) : '...?'}</p>
                <button className="num-comments" onClick={handleClick}>
                    {comments ? visible + comments + ' comments' : 'no comments'}
                </button>
            </div>

            <div className={commentStyle}>
                <Discussion permalink={permalink} isVisible={visible} />
            </div>

        </div>
        </>
    );
}