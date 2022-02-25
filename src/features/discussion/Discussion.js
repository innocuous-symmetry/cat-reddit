import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { fetchComments } from '../posts/postsSlice';
import { v4 } from 'uuid';

export default function Discussion({permalink, isVisible}) {
    const [thread, setThread] = useState(null);
    const [data, setData] = useState(null);
    const dispatch = useDispatch();

    const formattedLink = permalink.substring(0,(permalink.length-1));

    useEffect(() => {
        let isActive = true;
        if (isActive) {
            if (isVisible === 'hide ') {
                dispatch(fetchComments(formattedLink))
                .then(unwrapResult)
                .then((result) => setData(result));
            }
        }

        return () => {
            isActive = false;
        }

    }, [dispatch, formattedLink, isVisible, setData]);

    useEffect(() => {
        if (data) {
            let commentData = data[1];
            let comments = commentData.data.children;

            const getReplies = (comment) => {
                if (comment.data.replies) {
                    return (
                        <div className={comment.data.replies.data.children ? `indiv-comment nested` : "indiv-comment"}>
                            <p className="comment-author">
                                u/{comment.data.replies.data.children[0].data.author}
                                {comment.data.replies.data.children[0].data.is_submitter ? ' (OP)' : ''}
                                {comment.data.replies.data.children ? ' replied:' : ''}
                            </p>
                            <p className="comment-body">{comment.data.replies.data.children[0].data.body}</p>
                        </div>
                    )
                } else {
                    return;
                }
            }

            setThread(comments.map((comment) => {
                return (
                    <>
                    <div className="indiv-comment" key={v4()}>
                        <p>u/{comment.data.author}</p>
                        <p>{comment.data.body}</p>
                    </div>
                    {getReplies(comment)}
                    </>
                )
            }))
        }
    }, [data, setThread]);

    return (
        <div className="discussion-thread">
            {thread}
        </div>
    )
}